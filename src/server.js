// Servidor: recibe los eventos de Recall, sirve la página del avatar y orquesta las sesiones.
import http from 'node:http';
import crypto from 'node:crypto';
import express from 'express';
import { WebSocketServer } from 'ws';
import { config, guion, fill, ROOT } from './config.js';
import { Session } from './session.js';
import { createBot } from './recall.js';
import { tts, audioPath } from './tts.js';
import { brainAvailable } from './brain.js';

const app = express();
app.use(express.json({ limit: '2mb' }));
const sessions = new Map();

const authed = (req) =>
  (req.query.token || req.get('x-app-token') || '') === config.secret;
const guard = (req, res, next) => (authed(req) ? next() : res.status(401).json({ error: 'token inválido' }));

app.use(express.static(`${ROOT}/public`, { maxAge: '1h' }));
app.get('/audio/:file', (req, res) => {
  const id = req.params.file.replace(/\.mp3$/, '');
  if (!/^[a-f0-9]{20}$/.test(id)) return res.sendStatus(404);
  res.type('audio/mpeg').sendFile(audioPath(id), (err) => err && !res.headersSent && res.sendStatus(404));
});
app.get('/health', (_req, res) => res.json({ ok: true, sesiones: sessions.size, claude: brainAvailable() }));

function newSession(opts) {
  const id = crypto.randomBytes(6).toString('hex');
  const s = new Session(id, { ...opts, onEnd: () => setTimeout(() => sessions.delete(id), 10 * 60 * 1000) });
  sessions.set(id, s);
  return s;
}

/** Envía el asistente a una reunión: POST /api/sessions { "meeting_url": "https://meet.google.com/..." } */
app.post('/api/sessions', guard, async (req, res) => {
  const meetingUrl = req.body?.meeting_url;
  if (!meetingUrl) return res.status(400).json({ error: 'falta meeting_url' });
  const s = newSession({ meetingUrl });
  try {
    const bot = await createBot({ meetingUrl, sessionId: s.id });
    s.botId = bot.id;
    console.log(`[${s.id}] bot ${bot.id} enviado a ${meetingUrl}`);
    res.json({ session: s.id, bot_id: bot.id });
  } catch (e) {
    sessions.delete(s.id);
    console.error(e);
    res.status(502).json({ error: e.message });
  }
});

/** Ensayo en el navegador, sin Meet: POST /api/preview → abre la URL que devuelve. */
app.post('/api/preview', guard, (_req, res) => {
  const s = newSession({});
  s.onJoin({ id: 'preview', name: 'Ensayo' });
  const pagePath = `/avatar.html?session=${s.id}&token=${encodeURIComponent(config.secret)}&preview=1`;
  res.json({ session: s.id, url: config.publicUrl + pagePath, path: pagePath });
});

app.get('/api/sessions/:id', guard, (req, res) => {
  const s = sessions.get(req.params.id);
  if (!s) return res.sendStatus(404);
  res.json({ id: s.id, bot_id: s.botId, paso: guion[s.stepIdx]?.id, fase: s.phase, datos: s.captured, pendientes: s.pending, transcripcion: s.transcript });
});

/** Eventos en tiempo real de Recall (transcripción, participantes, chat). */
app.post('/recall/events', guard, (req, res) => {
  res.sendStatus(200);
  const s = sessions.get(req.query.session);
  if (!s) return;
  const ev = req.body?.event;
  const d = req.body?.data?.data ?? {};
  const who = d.participant ?? {};
  switch (ev) {
    case 'transcript.data':
    case 'transcript.partial_data': {
      const text = (d.words ?? []).map((w) => w.text).join(' ').replace(/\s+([.,!?;:])/g, '$1');
      s.onSpeech({ speaker: who.name, text, final: ev === 'transcript.data' });
      break;
    }
    case 'participant_events.join':
      s.onJoin({ id: who.id, name: who.name });
      break;
    case 'participant_events.leave':
      s.onLeave({ id: who.id, name: who.name });
      break;
    case 'participant_events.chat_message': {
      const text = d.data?.text ?? d.text;
      s.onSpeech({ speaker: who.name, text, final: true, source: 'chat' });
      break;
    }
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, 'http://x');
  if (url.searchParams.get('token') !== config.secret) return ws.close(4001, 'token');
  const s = sessions.get(url.searchParams.get('session'));
  if (!s) return ws.close(4004, 'sesión no existe');
  s.attachPage(ws);
  // En modo ensayo, lo que se escribe en la página entra como si alguien hablara.
  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (m.type === 'text' && m.text) s.onSpeech({ speaker: 'Ensayo', text: m.text, final: true, source: 'chat' });
  });
});

server.listen(config.port, async () => {
  console.log(`Asistente de demo escuchando en ${config.publicUrl} (puerto ${config.port})`);
  if (!brainAvailable()) console.warn('⚠ Falta ANTHROPIC_API_KEY: el asistente no podrá responder preguntas.');
  if (config.tts.provider !== 'none') {
    // Pre-genera el audio del guion para que la demo no tenga esperas.
    let ok = 0;
    for (const p of guion) {
      try { await tts(fill(p.decir)); if (p.tipo === 'talk') await tts('Retomando: ' + fill(p.decir)); ok++; } catch (e) { console.warn(`TTS (${p.id}): ${e.message}`); break; }
    }
    console.log(`Audio del guion listo: ${ok}/${guion.length} pasos`);
  }
});
