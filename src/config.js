import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const env = (k, d) => (process.env[k] ?? '').trim() || d;
const num = (k, d) => Number(env(k, String(d)));

export const config = {
  port: num('PORT', 3000),
  // En Render se completa sola con RENDER_EXTERNAL_URL.
  publicUrl: env('PUBLIC_URL', env('RENDER_EXTERNAL_URL', 'http://localhost:3000')).replace(/\/$/, ''),
  // Token secreto que protege los webhooks y la API de inicio
  secret: env('APP_SECRET', 'cambia-esto'),

  humanName: env('HUMAN_NAME', 'Nicolás'),
  botName: env('BOT_NAME', 'Asistente Agrak'),
  companyName: env('COMPANY_NAME', 'Agrak'),

  recall: {
    apiKey: env('RECALL_API_KEY', ''),
    region: env('RECALL_REGION', 'us-west-2'),
    // 'camera' (recuadro del bot) o 'screenshare' (pantalla compartida, se ve más grande)
    outputSlot: env('RECALL_OUTPUT_SLOT', 'camera'),
    // Transcripción en español en tiempo real vía Deepgram (configurar la llave en el dashboard de Recall)
    deepgramModel: env('DEEPGRAM_MODEL', 'nova-3'),
    deepgramLanguage: env('DEEPGRAM_LANGUAGE', 'es'),
  },

  anthropic: {
    apiKey: env('ANTHROPIC_API_KEY', ''),
    turnModel: env('CLAUDE_TURN_MODEL', 'claude-haiku-5-5'),
    summaryModel: env('CLAUDE_SUMMARY_MODEL', 'claude-sonnet-5-5'),
  },

  tts: {
    provider: env('TTS_PROVIDER', 'elevenlabs'), // elevenlabs | openai | none
    elevenApiKey: env('ELEVENLABS_API_KEY', ''),
    elevenVoiceId: env('ELEVENLABS_VOICE_ID', ''),
    elevenModel: env('ELEVENLABS_MODEL', 'eleven_flash_v2_5'),
    openaiApiKey: env('OPENAI_API_KEY', ''),
    openaiModel: env('OPENAI_TTS_MODEL', 'gpt-4o-mini-tts'),
    openaiVoice: env('OPENAI_TTS_VOICE', 'ash'),
  },

  timing: {
    startDelayMs: num('START_DELAY_MS', 4000),        // espera tras detectar a alguien antes de saludar
    startFallbackMs: num('START_FALLBACK_MS', 30000), // si no detecta a nadie, parte igual
    pauseAfterTalkMs: num('PAUSE_AFTER_TALK_MS', 1500),
    answerTimeoutMs: num('ANSWER_TIMEOUT_MS', 20000),
    qaSilenceMs: num('QA_SILENCE_MS', 25000),
    debounceMs: num('DEBOUNCE_MS', 1000),
    bargeInWords: num('BARGE_IN_WORDS', 3),
  },

  summaryWebhookUrl: env('SUMMARY_WEBHOOK_URL', ''),
};

export const guion = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/guion.json'), 'utf8')).pasos;
export const manual = fs.readFileSync(path.join(ROOT, 'data/manual.md'), 'utf8');

export const fill = (s) => String(s ?? '').replaceAll('{humano}', config.humanName);
