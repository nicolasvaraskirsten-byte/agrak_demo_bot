// Ensayo en la terminal, sin Meet ni voz: tú escribes como el cliente y ves qué responde.
// Uso: npm run simular            (usa Claude de verdad; necesita ANTHROPIC_API_KEY)
//      npm run simular -- --rapido (narraciones aceleradas)
import readline from 'node:readline';
import { config } from '../src/config.js';
config.tts.provider = 'none';
const { Session } = await import('../src/session.js');

const fast = process.argv.includes('--rapido');
const s = new Session('ensayo-terminal', {
  headless: true,
  playbackScale: fast ? 0.15 : 1,
  log: (l) => { if (!l.includes('🗣')) console.log('\x1b[2m' + l + '\x1b[0m'); },
  onEnd: (r) => {
    console.log('\n=== RESUMEN PARA ' + config.humanName.toUpperCase() + ' ===');
    console.log(JSON.stringify(r.resumen ?? { datos: r.datos_capturados, pendientes: r.pendientes }, null, 2));
    process.exit(0);
  },
});
s.listeners.add((m) => {
  if (m.type === 'show') console.log(`\n\x1b[36m── [${m.index + 1}/${m.total}] ${m.title} ──\x1b[0m`);
  if (m.type === 'say') console.log(`\x1b[32m${config.botName}:\x1b[0m ${m.text}`);
  if (m.type === 'stop') console.log('\x1b[33m(se detiene para escuchar)\x1b[0m');
});

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => line.trim() && s.onSpeech({ speaker: 'Cliente', text: line.trim(), final: true }));
console.log('Escribe lo que diría el cliente y presiona Enter. Ctrl+C para salir.');
s.onJoin({ id: 'cliente', name: 'Cliente' });
