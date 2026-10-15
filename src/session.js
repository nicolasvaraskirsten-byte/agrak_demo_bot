// Orquestador de una reunión: sigue el guion, escucha, deja hablar y responde.
import fs from 'node:fs';
import path from 'node:path';
import { config, guion, fill, ROOT } from './config.js';
import { tts } from './tts.js';
import { decide, summarize } from './brain.js';
import { leaveCall, sendChat } from './recall.js';

const FILLER = /^(ok(ey|a)?|ya|s[ií]|dale|perfecto|bien|claro|aj[aá]|mm+|eh+|ah+|okey|bueno|genial|excelente|entiendo|de acuerdo|gracias|vale|listo|correcto)[\s.,!¡¿?]*$/i;
const words = (t) => (t.trim().match(/\S+/g) || []).length;
const estimateMs = (text) => Math.max(1200, (words(text) / 2.6) * 1000); // ~156 palabras/min
const CLOSE_IDX = Math.max(0, guion.findIndex((p) => p.tipo === 'close'));
const SESSIONS_DIR = path.join(ROOT, 'data/sessions');
fs.mkdirSync(SESSIONS_DIR, { recursive: true });

export class Session {
  constructor(id, { botId = null, meetingUrl = null, log = console.log, playbackScale = 1, onEnd = null, brain = null, headless = false } = {}) {
    Object.assign(this, { id, botId, meetingUrl, log, playbackScale, onEnd, headless });
    this.decide = brain?.decide ?? decide;
    this.summarize = brain?.summarize ?? summarize;
    this.page = null;            // WebSocket de la página del avatar
    this.listeners = new Set();  // observadores (simulador, panel)
    this.humans = new Map();     // id -> nombre
    this.started = false;
    this.ended = false;
    this.stepIdx = -1;
    this.stepNarrated = false;
    this.phase = 'idle';
    this.speaking = null;        // { id, resolve, timer }
    this.uttSeq = 0;
    this.buffer = [];
    this.lastSpeaker = null;
    this.thinking = false;
    this.timers = {};
    this.transcript = [];
    this.captured = {};
    this.pending = [];
    this.lastBotLine = '';
    this.startedAt = new Date().toISOString();
  }

  // ---------- salida hacia la página / observadores ----------
  emit(msg) {
    if (this.page?.readyState === 1) this.page.send(JSON.stringify(msg));
    for (const l of this.listeners) l(msg);
  }

  setTimer(name, ms, fn) {
    clearTimeout(this.timers[name]);
    this.timers[name] = setTimeout(() => { delete this.timers[name]; fn(); }, ms);
  }
  clearTimer(...names) { for (const n of names) { clearTimeout(this.timers[n]); delete this.timers[n]; } }
  clearFlowTimers() { this.clearTimer('advance', 'answer', 'qa', 'wait'); }

  // ---------- entradas ----------
  attachPage(ws) {
    this.page = ws;
    this.log(`[${this.id}] página del avatar conectada`);
    ws.on('message', (raw) => {
      let m; try { m = JSON.parse(raw); } catch { return; }
      if ((m.type === 'ended' || m.type === 'stopped') && this.speaking?.id === m.id) this.finishSpeaking(m.type);
      if (m.type === 'playing' && this.speaking?.id === m.id && m.durMs > 0) Object.assign(this.speaking, { startedAt: Date.now(), dur: m.durMs });
    });
    ws.on('close', () => { if (this.page === ws) this.page = null; });
    if (this.stepIdx >= 0) this.showStep(this.stepIdx); // reconexión: vuelve a mostrar la lámina
    this.setTimer('fallbackStart', config.timing.startFallbackMs, () => this.start());
    this.maybeStart();
  }

  onJoin({ id, name }) {
    if (!name || name === config.botName) return;
    this.humans.set(id ?? name, name);
    this.log(`[${this.id}] entró: ${name}`);
    this.clearTimer('empty');
    this.maybeStart();
  }

  onLeave({ id, name }) {
    this.humans.delete(id ?? name);
    if (this.started && !this.ended && this.humans.size === 0) {
      this.setTimer('empty', 20000, () => this.end('sin participantes'));
    }
  }

  maybeStart() {
    if (this.started || this.timers.start) return;
    if ((this.page || this.headless) && this.humans.size > 0) this.setTimer('start', config.timing.startDelayMs, () => this.start());
  }

  /** Texto de un participante (voz transcrita o chat). */
  onSpeech({ speaker, text, final = true, source = 'voz' }) {
    if (this.ended || !text?.trim() || speaker === config.botName) return;
    if (speaker && !this.humans.size) this.onJoin({ id: speaker, name: speaker });
    const n = words(text);

    // Barge-in: si hablan mientras el asistente habla, se calla.
    if (this.speaking && n >= config.timing.bargeInWords && !FILLER.test(text)) this.stopSpeaking();

    // Mientras alguien habla, nada avanza.
    this.clearFlowTimers();
    if (!final) { this.setTimer('debounce', config.timing.debounceMs + 600, () => this.process()); return; }

    this.transcript.push({ t: new Date().toISOString(), quien: speaker || 'Participante', texto: text, via: source });
    this.emit({ type: 'heard', speaker, text });
    this.buffer.push(text);
    this.lastSpeaker = speaker;
    if (!this.started) { this.maybeStart(); return; }
    this.setTimer('debounce', config.timing.debounceMs, () => this.process());
  }

  // ---------- habla ----------
  async speak(text, { kind = 'reply' } = {}) {
    text = fill(text).trim();
    if (!text) return 'ended';
    this.stopSpeaking(true);
    const id = ++this.uttSeq;
    let audioId = null;
    this.preparing = true;
    try { audioId = await tts(text); } catch (e) { this.log(`[${this.id}] TTS falló: ${e.message}`); }
    finally { this.preparing = false; }
    if (this.ended && kind !== 'close') return 'stopped';
    this.lastBotLine = text;
    this.transcript.push({ t: new Date().toISOString(), quien: config.botName, texto: text });
    this.log(`[${this.id}] 🗣  ${text}`);
    return new Promise((resolve) => {
      const est = estimateMs(text);
      const usesPage = this.page && audioId;
      this.speaking = { id, resolve, startedAt: Date.now(), dur: usesPage ? est : est * this.playbackScale };
      this.emit({
        type: 'say', id, text,
        audio: audioId ? `${config.publicUrl}/audio/${audioId}.mp3` : null,
        estMs: est,
      });
      // Sin página o sin audio: se simula la duración. Con audio: tope de seguridad.
      const ms = usesPage ? est * 2.5 + 8000 : est * this.playbackScale;
      this.speaking.timer = setTimeout(() => this.finishSpeaking('ended'), ms);
    });
  }

  finishSpeaking(how) {
    const s = this.speaking; if (!s) return;
    clearTimeout(s.timer);
    this.speaking = null;
    s.resolve(how);
  }

  stopSpeaking(silent = false) {
    if (!this.speaking) return;
    const sp = this.speaking;
    this.lastStopFraction = sp.dur ? (Date.now() - sp.startedAt) / sp.dur : 0;
    this.emit({ type: 'stop', id: sp.id });
    if (!silent) this.log(`[${this.id}] ✋ interrumpido`);
    this.finishSpeaking('stopped');
  }

  // ---------- guion ----------
  async start() {
    if (this.started || this.ended) return;
    this.started = true;
    this.clearTimer('start', 'fallbackStart');
    this.buffer = []; // el "hola" inicial no se procesa como pregunta
    this.log(`[${this.id}] ▶ comienza la demo`);
    await this.runStep(0);
  }

  showStep(i) {
    const p = guion[i];
    const slides = (p.slides || []).map((s) =>
      typeof s === 'string'
        ? { img: `${config.publicUrl}/${s}` }
        : { card: Object.fromEntries(Object.entries(s.card).map(([k, v]) => [k, Array.isArray(v) ? v.map(fill) : fill(v)])) });
    this.emit({ type: 'show', step: p.id, title: fill(p.titulo), slides, index: i, total: guion.length });
  }

  async runStep(i, { resume = false } = {}) {
    if (this.ended || i >= guion.length) return;
    this.clearFlowTimers();
    this.stepIdx = i;
    this.stepNarrated = false;
    const p = guion[i];
    this.phase = 'speaking';
    this.showStep(i);
    const text = (resume ? 'Retomando: ' : '') + p.decir;
    const r = await this.speak(text, { kind: p.tipo === 'close' ? 'close' : 'step' });
    if (this.stepIdx !== i) return;
    if (r === 'stopped') {
      // Si alcanzó a decir casi todo, no se repite al retomar.
      if (this.lastStopFraction >= 0.7) this.stepNarrated = true;
      return; // la interrupción se encarga de seguir
    }
    this.stepNarrated = true;
    this.afterStep();
  }

  afterStep() {
    const p = guion[this.stepIdx];
    const t = config.timing;
    if (p.tipo === 'talk') {
      this.phase = 'after_talk';
      this.setTimer('advance', t.pauseAfterTalkMs, () => this.runStep(this.stepIdx + 1));
    } else if (p.tipo === 'ask') {
      this.phase = 'awaiting_answer';
      this.setTimer('answer', t.answerTimeoutMs, async () => {
        this.pending.push(`(Sin respuesta en la reunión) ${fill(p.decir)}`);
        await this.speak('No hay problema, lo vemos más adelante. Sigamos.');
        this.runStep(this.stepIdx + 1);
      });
    } else if (p.tipo === 'qa') {
      this.phase = 'qa';
      this.setTimer('qa', t.qaSilenceMs, () => this.runStep(CLOSE_IDX));
    } else if (p.tipo === 'close') {
      this.end('guion terminado');
    }
  }

  resumeScript() {
    if (this.ended) return;
    const p = guion[this.stepIdx];
    if (!this.stepNarrated) return this.runStep(this.stepIdx, { resume: p.tipo === 'talk' });
    if (p.tipo === 'qa') return this.afterStep();
    if (p.tipo === 'close') return this.end('guion terminado');
    return this.runStep(this.stepIdx + 1);
  }

  // ---------- turno del participante ----------
  async process() {
    this.clearTimer('debounce');
    if (this.thinking || this.ended || !this.started) return;
    if (this.preparing) return this.setTimer('debounce', 300, () => this.process()); // generando voz: reintenta
    if (this.speaking) { this.buffer = []; return; } // comentario corto mientras habla: se ignora
    if (!this.buffer.length) return this.kick();      // hubo voz pero sin texto final: retomar
    let said = this.buffer.splice(0).join(' ');
    const p = guion[this.stepIdx] ?? guion[0];

    // Asentimientos sueltos: no vale la pena llamar al modelo.
    if (FILLER.test(said.trim()) && p.tipo !== 'ask' && p.tipo !== 'qa' && this.phase !== 'waiting_reply') {
      return this.resumeScript();
    }

    this.thinking = true;
    this.phase = 'thinking';
    this.emit({ type: 'thinking', on: true });
    let d;
    try {
      for (let round = 0; round < 3; round++) {
        d = await this.decide(this.stateFor(said));
        if (!this.buffer.length) break;          // siguieron hablando mientras pensaba
        said += ' ' + this.buffer.splice(0).join(' ');
      }
    } catch (e) {
      this.log(`[${this.id}] error de Claude: ${e.message}`);
      d = p.tipo === 'ask'
        ? { decir: 'Perfecto, muchas gracias.', accion: 'seguir_guion', captura: { [p.captura || p.id]: said } }
        : { decir: `Buena pregunta. La anoto para que ${config.humanName} se las responda hoy.`, accion: 'seguir_guion', pendiente_para_humano: said };
    } finally {
      this.thinking = false;
      this.emit({ type: 'thinking', on: false });
    }
    this.log(`[${this.id}] 🧠 ${JSON.stringify(d)}`);

    if (d.captura && Object.keys(d.captura).length) {
      Object.assign(this.captured, d.captura);
      if (p.tipo === 'ask') this.stepNarrated = true; // ya respondieron la pregunta del paso
    }
    if (d.pendiente_para_humano?.trim()) this.pending.push(d.pendiente_para_humano.trim());
    if (d.mensaje_chat?.trim() && this.botId) sendChat(this.botId, d.mensaje_chat.trim()).catch(() => {});

    if (d.decir?.trim()) {
      const r = await this.speak(d.decir);
      if (r === 'stopped') return; // los interrumpieron de nuevo; el próximo turno decide
    }
    if (this.buffer.length) return this.process();

    switch (d.accion) {
      case 'esperar':
        this.phase = 'waiting_reply';
        this.setTimer('wait', config.timing.answerTimeoutMs, () => { this.phase = 'speaking'; this.resumeScript(); });
        break;
      case 'ir_a': {
        const idx = guion.findIndex((x) => x.id === d.paso_id);
        this.runStep(idx >= 0 ? idx : this.stepIdx + 1);
        break;
      }
      case 'terminar':
        this.runStep(CLOSE_IDX);
        break;
      default:
        this.resumeScript();
    }
  }

  /** Reactiva el flujo después de una pausa por voz sin contenido útil. */
  kick() {
    if (this.speaking || this.thinking || this.ended) return;
    if (this.phase === 'waiting_reply') {
      return this.setTimer('wait', config.timing.answerTimeoutMs, () => { this.phase = 'speaking'; this.resumeScript(); });
    }
    return this.stepNarrated ? this.afterStep() : this.resumeScript();
  }

  stateFor(said) {
    const p = guion[this.stepIdx] ?? guion[0];
    return {
      paso_actual: { id: p.id, tipo: p.tipo, titulo: p.titulo, narracion_completa: this.stepNarrated, pregunta_del_paso: p.tipo === 'ask' ? fill(p.decir) : undefined },
      estado: this.phase,
      ultimo_dicho_por_asistente: this.lastBotLine,
      historial_reciente: this.transcript.slice(-16).map((x) => `${x.quien}: ${x.texto}`),
      datos_capturados: this.captured,
      pendientes_para_humano: this.pending,
      participante: this.lastSpeaker || 'Participante',
      dijo: said,
    };
  }

  // ---------- cierre ----------
  async end(reason) {
    if (this.ended) return;
    this.ended = true;
    this.phase = 'ended';
    for (const k of Object.keys(this.timers)) this.clearTimer(k);
    this.log(`[${this.id}] ■ fin (${reason})`);
    this.emit({ type: 'end' });
    if (this.botId) setTimeout(() => leaveCall(this.botId).catch((e) => this.log(e.message)), 4000);

    const record = {
      session: this.id, bot_id: this.botId, meeting_url: this.meetingUrl,
      inicio: this.startedAt, fin: new Date().toISOString(), motivo_fin: reason,
      participantes: [...this.humans.values()],
      datos_capturados: this.captured, pendientes: this.pending, transcripcion: this.transcript,
      resumen: null,
    };
    try {
      record.resumen = await this.summarize({ transcript: this.transcript, captured: this.captured, pending: this.pending, prospect: record.participantes });
    } catch (e) { this.log(`[${this.id}] no se pudo resumir: ${e.message}`); }
    const file = path.join(SESSIONS_DIR, `${this.id}.json`);
    fs.writeFileSync(file, JSON.stringify(record, null, 2));
    this.log(`[${this.id}] resumen guardado en ${file}`);
    if (config.summaryWebhookUrl) {
      fetch(config.summaryWebhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) })
        .catch((e) => this.log(`[${this.id}] webhook de resumen falló: ${e.message}`));
    }
    this.emit({ type: 'summary', record });
    this.onEnd?.(record);
  }
}
