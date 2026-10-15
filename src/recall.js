// Cliente mínimo de la API de Recall.ai (bot que entra al Meet).
import { config } from './config.js';

const base = () => `https://${config.recall.region}.recall.ai/api/v1`;

async function call(method, path, body) {
  if (!config.recall.apiKey) throw new Error('Falta RECALL_API_KEY');
  const res = await fetch(base() + path, {
    method,
    headers: { Authorization: `Token ${config.recall.apiKey}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Recall ${method} ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

export function createBot({ meetingUrl, sessionId }) {
  const q = `session=${encodeURIComponent(sessionId)}&token=${encodeURIComponent(config.secret)}`;
  return call('POST', '/bot/', {
    meeting_url: meetingUrl,
    bot_name: config.botName,
    metadata: { session_id: sessionId },
    output_media: {
      [config.recall.outputSlot]: {
        kind: 'webpage',
        config: { url: `${config.publicUrl}/avatar.html?${q}` },
      },
    },
    recording_config: {
      transcript: {
        provider: {
          deepgram_streaming: {
            model: config.recall.deepgramModel,
            language: config.recall.deepgramLanguage,
          },
        },
      },
      realtime_endpoints: [
        {
          type: 'webhook',
          url: `${config.publicUrl}/recall/events?${q}`,
          events: [
            'transcript.data',
            'transcript.partial_data',
            'participant_events.join',
            'participant_events.leave',
            'participant_events.chat_message',
          ],
        },
      ],
    },
  });
}

export const leaveCall = (botId) => call('POST', `/bot/${botId}/leave_call/`);
export const sendChat = (botId, message) => call('POST', `/bot/${botId}/send_chat_message/`, { message });
