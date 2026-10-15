// Uso: npm run bot -- https://meet.google.com/abc-defg-hij
// Envía el asistente a la reunión a través del servidor ya desplegado.
import { config } from '../src/config.js';

const meetingUrl = process.argv[2];
if (!meetingUrl) {
  console.error('Uso: npm run bot -- <link del Meet>');
  process.exit(1);
}
const res = await fetch(`${config.publicUrl}/api/sessions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-app-token': config.secret },
  body: JSON.stringify({ meeting_url: meetingUrl }),
});
const out = await res.json().catch(() => ({}));
if (!res.ok) { console.error('No se pudo enviar el bot:', out.error || res.status); process.exit(1); }
console.log(`Listo. Sesión ${out.session}, bot ${out.bot_id}.`);
console.log('Recuerda admitir a "' + config.botName + '" en el Meet si queda en la sala de espera.');
