# Asistente de demo Agrak para Google Meet

Un asistente virtual que entra a un Google Meet y hace la **primera reunión de venta (demo kickoff)** de Agrak:

- Presenta la plataforma con las capturas del manual, paso a paso, con voz y subtítulos.
- Hace las preguntas de descubrimiento (campos, especies, hectáreas, quién crea las labores, cómo calculan costos).
- Se calla si alguien lo interrumpe y responde preguntas usando **solo el manual** como fuente (Claude).
- Lo comercial (precios, plazos, compromisos) no lo responde: lo anota para Nicolás.
- Al terminar guarda la transcripción y un **resumen para el seguimiento** (interés, datos del cliente, preguntas pendientes) y lo puede enviar a un webhook.

```
Google Meet ──► Recall.ai (bot + transcripción Deepgram en español)
                    │  webhooks con lo que dicen
                    ▼
              este servidor ──► Claude (decide qué responder)
                    │       └─► ElevenLabs / OpenAI (voz)
                    ▼
              página del avatar (láminas + voz) ──► se transmite al Meet como cámara del bot
```

## Qué necesitas

| Servicio | Para qué | Costo aproximado |
|---|---|---|
| [Recall.ai](https://recall.ai) | Bot que entra al Meet | US$0,50 por hora de bot |
| [Deepgram](https://deepgram.com) | Transcripción en español en vivo (se conecta desde el dashboard de Recall) | ~US$0,46 por hora |
| [Anthropic](https://console.anthropic.com) | Claude: respuestas y resumen | centavos por reunión |
| [ElevenLabs](https://elevenlabs.io) u OpenAI | Voz | ~US$0,10–0,50 por reunión |
| Un servidor con URL pública | Render, Railway, Fly.io, o tu servidor actual del bot de WhatsApp | desde US$0–7/mes |

> Por qué Deepgram: la transcripción propia de Recall en baja latencia hoy solo funciona en inglés.

## Publicarlo en Render (recomendado)

1. Sube esta carpeta a un repositorio **privado** de GitHub.
2. En [render.com](https://render.com) → **New → Blueprint** → elige el repositorio. Render lee `render.yaml` y te pide las llaves (`RECALL_API_KEY`, `ANTHROPIC_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `SUMMARY_WEBHOOK_URL`).
3. `APP_SECRET` se genera solo: cópialo desde **Environment** del servicio; es la clave para lanzar el asistente.
4. La URL pública (`https://agrak-demo-bot-xxxx.onrender.com`) se configura sola.
5. Entra a `https://TU-URL/lanzar.html`, pega la clave y el link del Meet.

Plan gratis vs. pagado: el gratis se "duerme" tras 15 minutos sin uso y tarda ~1 minuto en despertar (lanza el bot un par de minutos antes de la reunión), y su disco se borra en cada reinicio, así que los resúmenes guardados en `data/sessions/` se pierden: usa `SUMMARY_WEBHOOK_URL`. El plan de US$7/mes no se duerme.

## Puesta en marcha (otro servidor)

1. `npm install`
2. Copia `.env.example` a `.env` y completa las llaves.
3. En el dashboard de Recall (Transcription → Deepgram) carga la API key y el Project ID de Deepgram. La key debe tener rol **Member** o superior.
4. Despliega el servidor en una URL pública (`npm start`) y pon esa URL en `PUBLIC_URL`. Para probar desde tu computador sirve `ngrok http 3000`.
5. Al arrancar, el servidor genera el audio de todo el guion una sola vez (queda en `data/audio/`).

## Usarlo en una reunión

Lo más simple: abre `https://TU-URL/lanzar.html`, pega la clave y el link del Meet. También puedes ensayar desde ahí.

Por terminal:

```bash
npm run bot -- https://meet.google.com/abc-defg-hij
```

o desde cualquier sistema (por ejemplo, cuando el cliente agenda la reunión):

```bash
curl -X POST "$PUBLIC_URL/api/sessions" -H "x-app-token: $APP_SECRET" \
     -H "Content-Type: application/json" -d '{"meeting_url":"https://meet.google.com/abc-defg-hij"}'
```

- El bot entra como invitado: **alguien tiene que admitirlo** en el Meet (o crea la reunión con acceso abierto).
- Saluda unos segundos después de que entre alguien. Si no detecta a nadie, parte igual a los 30 segundos.
- Al terminar, el resumen queda en `data/sessions/<sesión>.json` y, si configuraste `SUMMARY_WEBHOOK_URL`, se envía ahí.
- Durante la reunión puedes ver el estado en `GET /api/sessions/<sesión>?token=APP_SECRET`.

## Ensayar antes de usarlo con clientes

**En el navegador, con voz y láminas, sin Meet:**

```bash
curl -X POST "$PUBLIC_URL/api/preview" -H "x-app-token: $APP_SECRET"
```

Abre la `url` que devuelve, presiona "Comenzar ensayo" y escribe en el recuadro como si fueras el cliente (interrumpe, pregunta precios, pide ir a la reportería…).

**En la terminal, solo texto:**

```bash
npm run simular            # ritmo real
npm run simular -- --rapido
```

## Cambiar el guion

Todo el contenido está en `data/guion.json` (puedes leerlo cómodo en `GUION.md`). Cada paso tiene:

- `tipo`: `talk` (habla y sigue), `ask` (pregunta y espera respuesta), `qa` (ronda de preguntas), `close` (despedida).
- `decir`: lo que dice. `{humano}` se reemplaza por `HUMAN_NAME`.
- `slides`: capturas (`slides/figNN.jpg` = figura NN del manual) o tarjetas de texto `{ "card": { "titulo", "subtitulo", "bullets" } }`. Si hay varias, se reparten durante la narración.

La base de conocimiento para responder preguntas es `data/manual.md`. Si actualizan el manual, reemplaza ese archivo.

## Comportamiento y ajustes

- **Interrupciones:** si alguien dice 3 palabras o más mientras habla (`BARGE_IN_WORDS`), se calla y responde. "Ok", "sí", "ya" no lo interrumpen.
- **Retomar:** después de responder, sigue la demo donde iba. Si lo interrumpieron antes de terminar un paso, lo repite con "Retomando:".
- **Preguntas sin respuesta:** si nadie responde una pregunta de descubrimiento en 20 s, sigue y la deja anotada como pendiente.
- **Ronda final:** tras 25 s de silencio en la ronda de preguntas, se despide y sale del Meet.
- **Chat del Meet:** lo que escriban en el chat también le llega como pregunta.
- **Latencia:** entre que el cliente termina de hablar y el asistente responde pasan ~2–4 s (transcripción + Claude Haiku + voz). El guion no tiene espera porque su audio ya está generado.

## Límites conocidos

- La "cámara" del bot muestra las láminas (1280×720). Con `RECALL_OUTPUT_SLOT=screenshare` se ven más grandes, como pantalla compartida; pruébalo en tu Meet antes de usarlo con clientes.
- Recall no graba el video del bot; la transcripción sí queda guardada aquí.
- No navega la plataforma en vivo: muestra capturas. Si piden ver algo que no está en el guion, lo explica de palabra y lo anota para la siguiente reunión.
