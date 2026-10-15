// "Cerebro" del asistente: Claude decide qué decir cuando alguien habla.
import Anthropic from '@anthropic-ai/sdk';
import { config, guion, manual, fill } from './config.js';

const client = config.anthropic.apiKey ? new Anthropic({ apiKey: config.anthropic.apiKey }) : null;

const outline = guion
  .map((p, i) => `${i + 1}. [${p.id}] (${p.tipo}) ${p.titulo}: ${fill(p.decir)}`)
  .join('\n');

const SYSTEM = `Eres el asistente virtual de ${config.companyName} y estás haciendo, por voz y en vivo dentro de un Google Meet, la primera reunión de venta (demo kickoff) con un posible cliente agrícola. ${config.humanName} es la persona del equipo que hará el seguimiento.

Cómo funciona: sigues un guion de pasos que se narran y muestran en pantalla automáticamente. Tú solo intervienes cuando un participante habla o escribe en el chat. Recibes el estado actual de la reunión y lo que dijo el participante, y decides con la herramienta "decidir".

Reglas de conversación:
- Hablas en voz alta: respuestas cortas (1 a 3 frases, máximo ~45 palabras), español de Chile, cercano y profesional. Sin listas, sin markdown, sin emojis, sin URLs. Números escritos como se dicen.
- Responde SOLO con información del manual de la plataforma de abajo. Si no está en el manual, no inventes: dilo con naturalidad y deja la pregunta en "pendiente_para_humano" para ${config.humanName}.
- Precios, planes, descuentos, plazos de contrato, integraciones específicas con un ERP determinado, plazos exactos de implementación o compromisos comerciales: nunca los respondas ni los prometas. Di que ${config.humanName} se los envía hoy y regístralo en "pendiente_para_humano".
- Si te preguntan si eres una persona, di la verdad: eres un asistente de inteligencia artificial.
- Si el participante responde una pregunta del guion (pasos tipo "ask"), agradece en pocas palabras (puedes conectar su respuesta con lo que viene) y guarda el dato en "captura".
- Si el comentario no requiere respuesta (asentimiento, "ok", "sí", "dale", ruido, conversación entre ellos), usa accion "seguir_guion" con "decir" vacío.
- Si piden avanzar, saltarse algo o ver algo específico, usa "ir_a" con el id del paso que corresponda.
- Si piden terminar, tienen que irse o no tienen más preguntas en la ronda final, usa "terminar".
- Si hiciste una pregunta de aclaración y necesitas que te contesten, usa "esperar".
- Cualquier dato útil para la venta (cantidad de campos, hectáreas, especies, dolores, sistemas que usan, quién decide, urgencia, interés) guárdalo en "captura" con claves cortas en snake_case.

Guion de la demo (id, tipo, título y lo que se narra):
${outline}`;

const TOOL = {
  name: 'decidir',
  description: 'Decide qué dice el asistente y cómo sigue la reunión.',
  input_schema: {
    type: 'object',
    properties: {
      decir: { type: 'string', description: 'Lo que el asistente dirá en voz alta ahora. Vacío si no corresponde hablar.' },
      accion: {
        type: 'string',
        enum: ['seguir_guion', 'esperar', 'ir_a', 'terminar'],
        description: 'seguir_guion: retomar la demo donde iba. esperar: quedarse esperando respuesta. ir_a: saltar al paso indicado en paso_id. terminar: pasar al cierre.',
      },
      paso_id: { type: 'string', description: 'Solo con accion ir_a: id del paso del guion.' },
      captura: { type: 'object', description: 'Datos del cliente aprendidos en este turno (clave: valor).', additionalProperties: { type: 'string' } },
      pendiente_para_humano: { type: 'string', description: `Pregunta o tema que ${config.humanName} debe responder después. Vacío si no hay.` },
      mensaje_chat: { type: 'string', description: 'Opcional: texto breve para dejar escrito en el chat del Meet (ej. un resumen de pasos).' },
    },
    required: ['decir', 'accion'],
  },
};

export const brainAvailable = () => Boolean(client);

/** Decide la respuesta a lo que dijo un participante. */
export async function decide(state) {
  if (!client) throw new Error('Falta ANTHROPIC_API_KEY');
  const res = await client.messages.create({
    model: config.anthropic.turnModel,
    max_tokens: 600,
    system: [
      { type: 'text', text: SYSTEM },
      { type: 'text', text: `MANUAL DE LA PLATAFORMA (única fuente de verdad):\n\n${manual}`, cache_control: { type: 'ephemeral' } },
    ],
    tools: [TOOL],
    tool_choice: { type: 'tool', name: 'decidir' },
    messages: [{ role: 'user', content: JSON.stringify(state, null, 1) }],
  });
  const block = res.content.find((b) => b.type === 'tool_use');
  return block?.input ?? { decir: '', accion: 'seguir_guion' };
}

/** Resumen final de la reunión para el equipo. */
export async function summarize({ transcript, captured, pending, prospect }) {
  if (!client) return null;
  const res = await client.messages.create({
    model: config.anthropic.summaryModel,
    max_tokens: 1500,
    system: `Eres analista comercial de ${config.companyName}. Resume una demo kickoff hecha por el asistente virtual para que ${config.humanName} haga el seguimiento. Escribe en español, concreto, sin inventar nada que no esté en la transcripción.`,
    tools: [{
      name: 'resumen',
      description: 'Resumen estructurado de la reunión',
      input_schema: {
        type: 'object',
        properties: {
          resumen: { type: 'string', description: '3 a 5 frases sobre cómo fue la reunión.' },
          datos_cliente: { type: 'object', additionalProperties: { type: 'string' }, description: 'Campos, especies, hectáreas, sistemas, roles, etc.' },
          interes: { type: 'string', enum: ['alto', 'medio', 'bajo', 'no_claro'] },
          dolores: { type: 'array', items: { type: 'string' } },
          objeciones: { type: 'array', items: { type: 'string' } },
          preguntas_pendientes: { type: 'array', items: { type: 'string' }, description: `Lo que ${config.humanName} debe responder.` },
          siguiente_paso_sugerido: { type: 'string' },
        },
        required: ['resumen', 'datos_cliente', 'interes', 'preguntas_pendientes', 'siguiente_paso_sugerido'],
      },
    }],
    tool_choice: { type: 'tool', name: 'resumen' },
    messages: [{
      role: 'user',
      content: JSON.stringify({ participantes: prospect, datos_capturados: captured, pendientes: pending, transcripcion: transcript }, null, 1),
    }],
  });
  return res.content.find((b) => b.type === 'tool_use')?.input ?? null;
}
