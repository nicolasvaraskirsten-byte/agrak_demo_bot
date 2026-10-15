# Guion de la demo kickoff (asistente virtual)

Generado desde `data/guion.json`. {humano} = HUMAN_NAME. Duración estimada de narración: 5 minutos, más preguntas.

## 1. Bienvenida

*Habla y sigue*

> Hola, ¿cómo están? Bienvenidos. Soy el asistente virtual de Agrak y {humano} me pidió que les muestre la plataforma. Les cuento de entrada que soy una inteligencia artificial: si algo no me queda claro, o es un tema comercial, lo anoto y {humano} les responde hoy mismo. La demo dura unos quince minutos y me pueden interrumpir cuando quieran; basta con que hablen y yo me detengo.

En pantalla: tarjeta "Agrak"

## 2. Su operación

*Pregunta y espera respuesta · guarda: operacion*

> Antes de partir, para enfocar la demo: ¿me cuentan brevemente de su operación? Cuántos campos tienen, qué especies producen y más o menos cuántas hectáreas.

En pantalla: tarjeta "Para enfocar la demo"

## 3. Cómo se organiza la información

*Habla y sigue*

> Agrak organiza todo en cuatro niveles: la empresa, los campos, los cuarteles, que son la unidad más pequeña, y las plantaciones, que son la especie y variedad de cada cuartel. Aquí ven el campo de demostración, Los Niches, con sus cuarteles dibujados sobre el mapa. Gracias a esa estructura, cada costo queda asignado por campo, cuartel, especie y variedad.

En pantalla: Figura 01

## 4. Pantalla de inicio

*Habla y sigue*

> Esta es la pantalla de inicio. Cada persona ve un resumen de lo suyo: cuántas labores están por aprobar, en progreso o atrasadas, y una agenda de la semana. Cada tarjeta lleva directo al listado filtrado. Y todo esto también está en la aplicación del celular.

En pantalla: Figura 03

## 5. Lista y carta Gantt

*Habla y sigue*

> Las labores se pueden ver de varias formas: en lista, agrupadas por estado, o en carta Gantt por día, semana o mes, donde cada color es un estado. Y pueden ver todos los campos juntos o uno a la vez.

En pantalla: Figura 05, Figura 06

## 6. Proyectos para varios campos

*Habla y sigue*

> Cuando necesitan pedirle algo a todos los campos a la vez, se usa un proyecto. Por ejemplo, un control de pre-cosecha que pide fotos a cada campo: aquí se ve qué campo ya lo vio, cuál lo terminó, y las evidencias de cada uno.

En pantalla: Figura 09, Figura 10

## 7. Labores desde plantilla

*Habla y sigue*

> Para crear labores, lo recomendado es usar plantillas. Es como el guardar como de Excel: en vez de partir de cero, toman una poda de invierno ya configurada, ajustan fechas y cuarteles, y listo. Además se define qué campos y qué personas pueden usar cada plantilla.

En pantalla: Figura 17, Figura 18

## 8. Roles y aprobación

*Habla y sigue*

> Cada labor tiene roles: el responsable que la ejecuta, el aprobador que la toma, un validador opcional y visualizadores. Cuando la gerencia crea una labor, queda por aprobar hasta que el administrador del campo la acepta. Así saben exactamente qué labores ya fueron tomadas y cuáles no.

En pantalla: Figura 33, Figura 35

## 9. ¿Quién crea las labores?

*Pregunta y espera respuesta · guarda: modelo_labores*

> Una pregunta: hoy en su empresa, ¿quién crea y asigna los trabajos? ¿Lo define la gerencia, o cada administrador de campo organiza lo suyo?

En pantalla: tarjeta "¿Quién crea las labores hoy?"

## 10. El chat de cada labor

*Habla y sigue*

> Algo que les gusta mucho a nuestros clientes: cada labor tiene su propio chat. Mencionan a alguien con arroba, le llega una notificación al celular y lo lleva directo a la labor. Eso reemplaza los grupos de WhatsApp y deja registro de quién pidió qué, cuándo y por qué se cambió algo, incluso meses después.

En pantalla: Figura 38, Figura 40

## 11. Avance en terreno

*Habla y sigue*

> En las labores pagadas por producción, como poda o raleo, ven el avance en vivo. Aquí, por ejemplo, una aplicación de ochenta y una hectáreas lleva veintitrés aplicadas, con el detalle por cuartel. No hace falta subdividir los cuarteles: se registra cuánto se avanzó cada día.

En pantalla: Figura 11, Figura 12

## 12. Mapa de trabajadores y costos

*Habla y sigue*

> En el mapa ven cuántos trabajadores hay en cada cuartel en este momento, con su contratista y hora de ingreso, y pueden activar capas de aplicaciones o de costos.

En pantalla: Figura 13, Figura 15

## 13. Reportería financiera

*Habla y sigue*

> Y todo esto termina en la reportería financiera: ingresos, costos y margen, por hectárea, por kilo o en pesos. Lo pueden agrupar por cuartel, especie o variedad, filtrar por etiquetas, como los cuarteles bajo techo, y exportarlo a Excel. Además, Agrak se puede integrar con el sistema contable.

En pantalla: Figura 22, Figura 24, Figura 51

## 14. Sus costos hoy

*Pregunta y espera respuesta · guarda: costos_actual*

> Les pregunto: ¿cómo están calculando hoy los costos por cuartel o por variedad? ¿Usan algún sistema contable o trabajan con planillas?

En pantalla: tarjeta "¿Cómo calculan sus costos hoy?"

## 15. Usuarios y accesos

*Habla y sigue*

> Sobre los usuarios: cada persona ve solo lo que necesita. Si a un supervisor le quitamos módulos, simplemente desaparecen de su menú y le queda una aplicación simple. La idea es que cada uno registre en terreno desde su celular, con foto y ubicación, en vez de anotar en papel y que otro lo digite.

En pantalla: Figura 59, Figura 60

## 16. Cómo es la implementación

*Habla y sigue*

> Por último, cómo es la implementación. Primero definimos con ustedes cuántos campos hay, el modelo de trabajo y los centros de costo. Luego cargamos campos, cuarteles y plantaciones, y creamos los usuarios. Partimos con las labores diarias, como riegos y labores de campo, en paralelo con las aplicaciones, y después sumamos mantenimiento, calicatas y maquinaria. Las capacitaciones en terreno se hacen cuando ya está todo cargado.

En pantalla: tarjeta "Implementación"

## 17. Preguntas

*Ronda de preguntas*

> Eso es lo principal de Agrak. ¿Qué preguntas tienen?

En pantalla: tarjeta "¿Preguntas?"

## 18. Cierre

*Despedida y sale del Meet*

> Perfecto. Le voy a dejar a {humano} un resumen de esta conversación, con sus respuestas y preguntas, y les va a escribir para coordinar el siguiente paso. ¡Muchas gracias por su tiempo, que estén muy bien!

En pantalla: tarjeta "¡Gracias!"

