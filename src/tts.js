// Texto a voz con caché en disco: el guion se genera una sola vez y queda listo.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { config, ROOT } from './config.js';

const CACHE_DIR = path.join(ROOT, 'data/audio');
fs.mkdirSync(CACHE_DIR, { recursive: true });

const key = (text) =>
  crypto.createHash('sha1')
    .update([config.tts.provider, config.tts.elevenVoiceId, config.tts.openaiVoice, text].join('|'))
    .digest('hex').slice(0, 20);

export const audioPath = (id) => path.join(CACHE_DIR, `${id}.mp3`);

async function synthElevenLabs(text) {
  const { elevenApiKey, elevenVoiceId, elevenModel } = config.tts;
  if (!elevenApiKey || !elevenVoiceId) throw new Error('Faltan ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID');
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${elevenVoiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': elevenApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: elevenModel, language_code: 'es' }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function synthOpenAI(text) {
  const { openaiApiKey, openaiModel, openaiVoice } = config.tts;
  if (!openaiApiKey) throw new Error('Falta OPENAI_API_KEY');
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${openaiApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: openaiModel, voice: openaiVoice, input: text, response_format: 'mp3',
      instructions: 'Habla en español de Chile, tono cercano y profesional, ritmo natural.',
    }),
  });
  if (!res.ok) throw new Error(`OpenAI TTS ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

const inflight = new Map();

/** Devuelve el id del audio (o null si TTS está desactivado). */
export async function tts(text) {
  if (config.tts.provider === 'none' || !text?.trim()) return null;
  const id = key(text);
  if (fs.existsSync(audioPath(id))) return id;
  if (inflight.has(id)) return inflight.get(id);
  const p = (async () => {
    const buf = config.tts.provider === 'openai' ? await synthOpenAI(text) : await synthElevenLabs(text);
    fs.writeFileSync(audioPath(id), buf);
    return id;
  })().finally(() => inflight.delete(id));
  inflight.set(id, p);
  return p;
}
