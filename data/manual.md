**MANUAL DE USUARIO**

**Manual funcional**

Plataforma Agrak

**Versión:** 1.0 -- septiembre 2026

Índice

1\. Introducción

Este manual describe el funcionamiento de la plataforma de gestión
agrícola **Agrak** (app.agrak.com y app móvil): cómo se organiza la
información (empresas, campos, cuarteles y plantaciones), cómo se
planifican y controlan las labores, cómo se analizan los costos y cómo
se administran los usuarios y sus accesos.

Está pensado como guía de referencia para equipos que inician una
implementación: explica cada módulo con capturas de pantalla, entrega
pasos concretos para las tareas más frecuentes e incluye recomendaciones
de configuración. Las capturas corresponden a un ambiente de
demostración (empresa "JJ S.A.", campo "Los Niches"); los datos que
aparecen en ellas son solo ejemplos.

1.1 Glosario básico

  -----------------------------------------------------------------------
  **Término**        **Significado en Agrak**
  ------------------ ----------------------------------------------------
  Empresa (entidad)  Nivel superior de la plataforma. Agrupa campos,
                     plantillas, encuestas y usuarios. Se cambia de
                     empresa desde el selector superior izquierdo.

  Campo              Unidad física de producción (predio).

  Cuartel            Subdivisión del campo; es la unidad más pequeña que
                     se maneja en Agrak.

  Plantación         Especie + variedad plantada en un cuartel, con su
                     superficie y densidad.

  Labor              Tarea o trabajo a realizar (poda, raleo, riego,
                     aplicación, etc.).

  Plantilla          Labor pre-configurada que se reutiliza, como un
                     "guardar como" de Excel.

  Proyecto           Agrupación de labores que abarca varios campos.
                     Puede usarse como centro de costo.

  Centro de costo    Código contable asociado a campos y cuarteles, usado
                     para cuadrar la reportería con la contabilidad.

  Etiqueta           Agrupador libre (ej. "Bajo techo") aplicable a
                     cuarteles, labores, personas, plantaciones, etc.

  Tarja / Trabajo    Registro de producción de cada trabajador (plantas,
  por pieza          árboles, hectáreas) con su avance.

  Widget             Componente que se agrega a una labor: descripción,
                     cuarteles, agroquímicos, trabajadores, evidencia,
                     etc.
  -----------------------------------------------------------------------

2\. Estructura de empresa y campos

Agrak es una plataforma flexible: se puede organizar de distintas
maneras. Antes de cargar información conviene resolver dos definiciones
de base, porque todo lo demás depende de ellas.

2.1 Definir qué es un campo

La pregunta "¿cuántos campos hay?" no siempre es simple. Una empresa
puede decir que tiene cinco campos cuando en realidad es un solo campo
con cinco sectores. Criterios para decidir:

-   Un campo es una unidad **físicamente separada** de las demás.

-   Si dos predios están contiguos y en la práctica se trabajan como una
    unidad (por ejemplo, el mismo tractor recorre ambos con la misma
    orden de aplicación), probablemente son **un campo con varios
    sectores o cuarteles**.

-   Si cada predio tiene sus propias órdenes de trabajo, son campos
    distintos.

**Figura 1.** *Inicio > Mapas: vista satelital del campo con sus
cuarteles dibujados.*

2.2 Una empresa o varias

En Agrak se pueden tener todas las empresas que se requiera y, dentro de
cada una, todos los campos necesarios. Tener los campos bajo **una misma
empresa** tiene ventajas prácticas:

-   Ver la lista, la carta Gantt o el calendario de **todos los campos
    juntos** o de uno en particular.

-   Crear **proyectos** que abarcan varios campos (por ejemplo, pedir
    evidencias fotográficas a todos los campos).

-   Crear una **plantilla una sola vez** y definir qué campos y qué
    personas la ven.

-   Crear un **formulario / encuesta** (calicata, conteo, mantención)
    una vez y dejarlo disponible para todos los campos.

El motivo principal para separar en varias empresas es el **precio de
valorización**. Si cada campo pertenece a una sociedad distinta que
compra agroquímicos e insumos a precios distintos, la reportería
financiera necesita precios distintos por campo y conviene una empresa
por campo. Si la compra es centralizada y se usa un **precio promedio
común**, lo recomendable es una sola empresa con todos los campos
(pueden existir diferencias puntuales, por ejemplo compras de emergencia
ante quiebres de stock).

> **Consideración:** con varias empresas no se puede ver todo junto sin
> cambiar de empresa, y las plantillas y formularios deben replicarse en
> cada una.

: permite cambiar entre las entidades a las que el usuario tiene acceso."){width="6.25in"
height="3.2291666666666665in"}

**Figura 2.** *Selector de empresa (esquina superior izquierda): permite
cambiar entre las entidades a las que el usuario tiene acceso.*

2.3 Integración contable

Agrak puede integrarse con el ERP contable o generar archivos para
subirlos a él. Por eso es importante que la valorización y los centros
de costo estén definidos de forma coherente con la contabilidad desde el
inicio.

3\. Recorrido general de la plataforma

3.1 Pantalla de Inicio

Al ingresar, la portada ("Inicio") muestra un resumen personalizado
para el usuario:

-   Indicadores superiores: fecha de hoy, labores de **Mi gestión**,
    **Todas las labores** y **Total de campos**.

-   Tarjetas por estado: **Por aprobar, No aprobada, En progreso,
    Atrasada, Por validar, Planificada**. Cada tarjeta lleva al listado
    filtrado.

-   **Agenda semanal** por fecha de inicio o de finalización, y
    **Accesos rápidos** a sitios de uso frecuente.

-   Menú lateral con los módulos: Proyectos, Agrak Harvest, Labores,
    Aplicaciones, Empresa, Finanzas, Encuestas, Mantenedores y
    Configuraciones.

**Figura 3.** *Pantalla de Inicio con los contadores por estado y la
agenda semanal.*

3.2 Formas de ver lo que está pasando en el campo

Agrak ofrece varias vistas de la misma información (también disponibles
en la app móvil). Se accede desde **Labores > Lista de labores**,
seleccionando el campo y la vista en los botones **Lista / Gantt /
Tablero / Calendario**.

Selección de campos

En el filtro "Campo" se puede marcar uno, varios o "Seleccionar
todos" para ver las labores de todos los campos juntos.

**Figura 4.** *Filtro de campos: se pueden seleccionar varios campos a
la vez.*

Vista Lista

Muestra las labores agrupadas por estado (En progreso, Atrasada, etc.),
con campo, responsables, roles, widgets activos y fechas. La pestaña
**Mi gestión** muestra solo las labores en que participa el usuario;
**Todas** muestra todas.

**Figura 5.** *Lista de labores agrupada por estado.*

Vista Gantt y colores de estado

La carta Gantt se puede ver por día, semana, mes o año. Los colores
representan el estado (por aprobar, en progreso, atrasada, terminada,
etc.). Con el botón **Estados** se filtran los estados a mostrar.

**Figura 6.** *Vista Gantt con el filtro de estados desplegado.*

Vista Calendario

**Figura 7.** *Vista Calendario mensual de las labores.*

Filtros avanzados

El ícono de embudo abre el panel **Filtrar**, que permite filtrar por
prioridad, usuarios, etiquetas, rol, widgets, checklists/encuestas,
estado de subtareas, fechas y número de tarea.

**Figura 8.** *Panel de filtros avanzados de la lista de labores.*

Notificaciones

La campana superior muestra las notificaciones (también llegan al
celular): labores creadas, menciones en comentarios, atrasos, etc.

3.3 Proyectos

Un proyecto permite gestionar labores masivas para muchos campos al
mismo tiempo, con su avance, porcentaje de visualización y finalización.
Por ejemplo, un proyecto "Pre-harvest control" que pide evidencias
fotográficas a cada campo y muestra su estado.

**Figura 9.** *Lista de proyectos con fechas, campos, % visualizadas, %
finalizadas y prioridad.*

**Figura 10.** *Detalle de un proyecto: evidencias fotográficas por
campo y estado de cada uno.*

3.4 Trabajos por pieza (tarjas) y barra de avance

En **Labores > Trabajos por pieza** se ve el avance de las labores
pagadas por producción (poda, raleo, etc.): tipo de pieza y precio,
avance total y porcentaje, responsables y número de trabajadores. Al
pinchar el ojo se abre el **Avance** desglosado por cuartel.

**Figura 11.** *Trabajos por pieza: avance de cada labor con su barra de
progreso.*

, desglosada por cuartel."){width="6.25in"
height="3.2291666666666665in"}

**Figura 12.** *Panel de avance: una aplicación de 81 ha con 23 ha
aplicadas (28,4 %), desglosada por cuartel.*

3.5 Mapa con trabajadores y costos

Desde **Inicio > Mapas** se ve el campo con sus cuarteles. Cuando se
registran trabajadores en una labor, el mapa muestra cuántos están
trabajando en cada cuartel; al pinchar el cuartel se ve el detalle
(labor, trabajador, contratista, hora de ingreso y usuario que
registró). El mapa también puede mostrar capas de aplicaciones de
agroquímicos y costos.

**Figura 13.** *Mapa: cuartel resaltado con 4 trabajadores activos.*

**Figura 14.** *Detalle del cuartel desde el mapa: trabajadores
registrados, contratista y hora de ingreso.*

**Figura 15.** *Mapa con la capa de costos por cuartel.*

3.6 Plantillas

Crear una labor desde plantilla es la forma recomendada: igual que en
Excel, en lugar de partir desde una hoja en blanco se toma un
"borrador" existente y se modifica. En **Lista de labores > Crear
labor** hay dos opciones: **Crear nueva labor** (desde cero) o **Crear
nueva labor desde plantilla**.

**Figura 16.** *Lista de labores: botón Crear labor.*

**Figura 17.** *Crear nueva labor desde plantilla: plantillas
compartidas y privadas con sus etiquetas.*

**Figura 18.** *Labor creada desde la plantilla "Poda de invierno",
lista para ajustar y crear.*

En **Empresa > Plantillas** está el mantenedor de plantillas. Para cada
plantilla se define **qué campos** la pueden usar y **qué usuarios**
(por persona, cargo o etiqueta) tienen acceso. Así puede haber
plantillas genéricas para todos y plantillas específicas (por ejemplo,
solo para un campo de mandarinas o solo para mantención de tractores).

**Figura 19.** *Mantenedor de plantillas: creador, usuarios con acceso,
campos y etiquetas.*

**Figura 20.** *Configuración de los campos en que se puede usar una
plantilla.*

**Figura 21.** *Configuración de los usuarios con acceso a una
plantilla.*

3.7 Reportería financiera

En **Finanzas > Informes** se ve el resultado económico: ingresos,
costo total, margen, trabajadores y agroquímicos. Se filtra por campo,
período y unidad (por hectárea, por kilo, en pesos) y se puede incluir o
no los costos fijos. La información se puede **agrupar (pivotear) por
cuartel, especie o variedad**, y exportar con "Enviar excel".

**Figura 22.** *Reportería agrupada por cuartel.*

 que componen su resultado."){width="6.25in"
height="3.2291666666666665in"}

**Figura 23.** *Al expandir un cuartel se ven los movimientos (tareas,
costos e ingresos) que componen su resultado.*

**Figura 24.** *La misma reportería agrupada por variedad.*

4\. Modelos de trabajo para crear labores

Una definición clave de cada implementación es **quién crea las
labores**. Existen tres modelos habituales:

  -----------------------------------------------------------------------
  **Modelo**      **Descripción**                  **Ventajas / riesgos**
  --------------- -------------------------------- ----------------------
  1\. Creación en Cada administrador de campo      Descentraliza la
  terreno         tiene acceso a las plantillas.   carga, pero hay que
                  La gerencia le solicita la labor verificar que la labor
                  (ej. "crea una poda") y él la  efectivamente se haya
                  crea.                            creado.

  2\. Creación    La gerencia crea las labores     Más control, pero no
  centralizada    para todos los campos; el        se sabe si el
                  administrador recibe una alerta. administrador vio o
                                                   tomó la labor.

  3\.             La gerencia crea las labores     Toda labor pendiente
  Centralizada    importantes y asigna al          de aprobación indica
  con aprobación  administrador como **aprobador** que no ha sido tomada.
                  (y opcionalmente editor). El     Es el modelo más
                  administrador debe aprobar       trazable.
                  ("tomar") la labor; puede      
                  crear labores puntuales por su   
                  cuenta.                          
  -----------------------------------------------------------------------

4.1 Crear una labor desde plantilla

1.  Ir a **Labores > Lista de labores** y seleccionar el campo.

2.  Pinchar **Crear labor > Crear nueva labor desde plantilla**.

3.  Buscar la plantilla por nombre (ej. "pod" para podas) en la
    pestaña **Plantillas compartidas** o **Mis plantillas**, y pinchar
    **Usar**.

4.  Revisar los datos precargados (fechas, responsables, etiquetas,
    código de labor, cuarteles, widgets), ajustar lo necesario y pinchar
    **Crear labor**.

**Figura 25.** *Búsqueda de plantillas por nombre.*

**Figura 26.** *Labor "Aplicación Enrique Foliar OA: 45" creada desde
plantilla, con costo y código de labor ya cargados.*

5\. Crear una labor paso a paso

5.1 Datos básicos

1.  En **Lista de labores** pinchar **Crear labor > Crear nueva
    labor**.

2.  Escribir el **nombre de la labor** (ej. "Poda ramas gruesas").

3.  Definir la **duración**: fecha y hora de inicio y fin, y la fecha
    desde la cual la labor es visible.

4.  Seleccionar el **campo** y la **prioridad**.

5.  Opcional: **Definir recurrencia** si la labor se repite.

**Figura 27.** *Formulario Crear labor: nombre, fechas, campo, roles,
tipo de asignación y widgets.*

**Figura 28.** *Selección de la duración de la labor.*

5.2 Notificaciones

Con el ícono de campana se configura **Notificar labor**: avisar cuando
se crea la labor, cuando cambia de estado, un número de días antes del
vencimiento y cuando está atrasada; indicando a qué trabajadores o roles
se notifica.

**Figura 29.** *Configuración de notificaciones de la labor.*

5.3 Roles en la labor

Cada persona invitada a una labor tiene un rol que determina lo que
puede hacer en ella:

  -----------------------------------------------------------------------
  **Rol**          **Qué hace**
  ---------------- ------------------------------------------------------
  Creador          Quien crea la labor.

  Responsable      Quien ejecuta y puede **terminar** la labor (ej. jefe
                   de campo).

  Aprobador        Debe **aprobar** la labor antes de que avance. En el
                   modelo centralizado con aprobación suele ser el
                   administrador del campo: aprobar = "tomar" la labor.

  Validador        Valida la labor terminada. Es opcional; muchas
                   empresas lo dejan vacío.

  Visualizador     Solo ve la labor (ej. un grupo "Agronomía").

  Trabajador       Persona que trabaja en la labor.
  -----------------------------------------------------------------------

Para agregar a cada rol se pincha el signo **+** junto a Responsables,
Aprobadores, Validadores o Visualizadores y se seleccionan personas,
cargos o etiquetas.

**Figura 30.** *Agregar responsable: búsqueda por persona, cargo o
etiqueta.*

**Figura 31.** *Agregar aprobador a la labor.*

En la barra azul superior **"Pueden editar"** se marca qué roles
pueden modificar la labor (creador, aprobador, validador, visualizador,
responsable, trabajador). Por ejemplo, se puede permitir que el
aprobador también edite su labor.

**Figura 32.** *Barra "Pueden editar": roles con permiso de edición.*

**Figura 33.** *Labor con responsable, aprobador, validador y
visualizadores definidos, lista para crear.*

5.4 Aprobación de la labor

Una vez creada, la labor queda en estado **Por aprobar** (color amarillo
en la Gantt). El aprobador recibe una alerta y puede aprobarla desde la
web o desde la app móvil. Quien la creó puede filtrar las labores "Por
aprobar" para ver cuáles no han sido tomadas.

**Figura 34.** *Filtro por estado "Por aprobar" en la vista Gantt.*

**Figura 35.** *Detalle de la labor con el botón Aprobar.*

1.  El aprobador abre la notificación o busca la labor en **Por
    aprobar**.

2.  Entra al **Detalle labor**, revisa la información y pincha
    **Aprobar**.

3.  La labor pasa a **En progreso**; con eso se sabe que el aprobador la
    tomó y se hace responsable.

5.5 Menú de opciones

El botón **⋯** junto a Guardar/Crear permite: **Guardar como plantilla
privada**, **Guardar como plantilla**, **Editar**, **Archivar** o
**Eliminar** la labor.

**Figura 36.** *Menú de opciones de la labor.*

5.6 Widgets

En el panel derecho **Widgets** se activan los componentes que necesita
la labor: Descripción, Subtareas, Evidencia, Trabajadores, Cuarteles y
sectores de riego, Agroquímicos, Materiales, Maquinaria, Trabajos por
pieza, Geolocalización, Checklists/Encuestas, Cosecha, Árboles/Semillas
y Prestadores de servicios. Por ejemplo, la **Descripción** puede
incluir texto, imágenes o un video explicativo (ej. cómo hacer un raleo)
y guardarse en la plantilla.

**Figura 37.** *Widget Descripción activado en la labor.*

5.7 Chat de la labor (comentarios)

Cada labor tiene su propio chat en la pestaña **Comentarios** (arriba a
la derecha). Se puede mencionar a una persona con **@**, quien recibe
una notificación en el celular que la lleva directamente a la labor.
Esto reemplaza las conversaciones por WhatsApp y deja trazabilidad:
quién pidió qué, cuándo y por qué se cambió algo.

**Figura 38.** *Escribir un comentario mencionando a un usuario con @.*

**Figura 39.** *Comentario publicado en la labor.*

**Figura 40.** *Historial de comentarios de una labor.*

> **Buena práctica:** si alguien con permiso de edición cambia algo de
> la labor, debe explicar en el chat por qué lo cambió. Si un
> responsable no está de acuerdo con una labor, lo comenta en el chat
> mencionando a quien la creó.

La trazabilidad también sirve desde la reportería financiera: al revisar
un costo se pincha la labor y se accede a todas las conversaciones que
hubo sobre ella, aunque hayan pasado meses.

**Figura 41.** *Desde la reportería se puede abrir cada labor y revisar
su historial.*

6\. Campos, cuarteles y plantaciones

6.1 Crear un campo

Los campos se pueden crear uno a uno o por carga masiva (recomendada
cuando son muchos). Para crearlos manualmente:

1.  Ir a **Empresa > Campos** y pinchar **+ Campo**.

2.  Completar **Nombre**, **Ubicación**, **Empresa contable**, **Centro
    de costo**, **Superficie** y **Etiquetas**.

3.  Opcional: datos del **administrador del campo** (nombre, email,
    teléfono).

4.  Pinchar **Crear campo**.

**Figura 42.** *Formulario Crear Campo.*

**Figura 43.** *Listado de campos con superficie, ubicación, centro de
costo y etiquetas.*

6.2 Crear cuarteles

Los cuarteles normalmente se cargan de forma masiva desde Excel con
**nombre y superficie**. Manualmente el proceso es:

1.  Entrar al campo (**Detalles del campo**) y, en la pestaña
    **Cuarteles**, pinchar **+ Cuartel**.

2.  Ingresar **Nombre** (ej. "AAA"), **Superficie** (ej. 20 ha),
    **Centro de costo** y **Etiquetas**.

3.  Pinchar **Crear**.

**Figura 44.** *Detalle del campo: cuarteles, plantaciones, sectores de
riego, etiquetas y geofencing.*

**Figura 45.** *Formulario Crear cuartel.*

6.3 Plantar un cuartel

1.  Abrir el cuartel y en **Plantaciones** pinchar **+ Frutal** (o
    Cultivo anual / Hortalizas).

2.  Elegir **Especie** (ej. Cereza) y **Variedad** (ej. Regina), año de
    plantación y etiquetas.

3.  Indicar la **superficie** de esa variedad (ej. 14 ha) y la
    **densidad de plantas**; la población total se calcula sola.

4.  Opcional: estructura de la plantación (distancia sobre hilera, entre
    hilera, sistema de conducción y de riego).

5.  Repetir para cada variedad del cuartel (ej. Kordia 3 ha y Skeena 2
    ha como polinizantes) hasta completar la superficie disponible.

**Figura 46.** *Cuartel sin plantaciones: botón + Frutal.*

**Figura 47.** *Crear plantación de frutal: especie, variedad,
superficie y densidad.*

."){width="6.25in"
height="3.2291666666666665in"}

**Figura 48.** *Cuartel AAA con tres plantaciones (Regina 14 ha, Kordia
3 ha, Skeena 2 ha).*

Con las variedades plantadas, Agrak distribuye el costo de cada labor
por **campo, cuartel, especie y variedad**, lo que permite todos los
cruces en la reportería.

> **Importante:** no es posible partir la operación ni las
> capacitaciones si los cuarteles no están plantados y los accesos
> entregados.

6.4 Centros de costo

En Agrak las dimensiones se cruzan: un cuartel es un lugar físico que
puede cambiar de plantación en el tiempo (arrancar cerezos y plantar
manzanos) sin cambiar su centro de costo. Cada cuartel tiene un centro
de costo, y **varios cuarteles pueden compartir el mismo** (por ejemplo,
cuando el centro de costo contable corresponde a un proyecto que abarca
varios cuarteles). El centro de costo aparece como columna en las
descargas para la contabilidad.

**Figura 49.** *Asignación del centro de costo en el detalle del
cuartel.*

6.5 Etiquetas en cuarteles

Además del centro de costo, los cuarteles pueden tener **etiquetas**,
que son agrupadores libres (especie y variedad ya se cruzan
automáticamente). Sirven para analizar un subgrupo de cuarteles, por
ejemplo **"Bajo techo"**.

1.  En el detalle del cuartel pinchar **Editar**.

2.  En **Etiquetas** buscar o crear la etiqueta (ej. "Bajo techo") y
    seleccionarla.

3.  Pinchar **Guardar cambios**.

**Figura 50.** *Asignación de una etiqueta a un cuartel.*

Luego, en la reportería financiera, se usa **Más filtros > Etiqueta de
cuartel** para ver el resultado solo de los cuarteles con esa etiqueta.

**Figura 51.** *Reportería filtrada por etiqueta de cuartel.*

6.6 Avance por hectáreas

Si un cuartel es grande y la labor se hace por partes, no es necesario
subdividirlo: basta registrar cuántas hectáreas se trabajaron cada día y
Agrak muestra la barra de avance en hectáreas por cuartel (ver el panel
de avance en la sección 3.4). El cuartel es la unidad mínima de la
plataforma.

**Figura 52.** *Detalle de una labor terminada con cuarteles, costo y
comentarios.*

7\. Labores parciales y acción masiva

Al crear una labor y seleccionar cuarteles, la labor no tiene por qué
abarcar todo el cuartel. Agrak permite labores **parciales**, costeadas
al nivel que se defina.

7.1 Seleccionar cuarteles

1.  En Crear labor activar el widget **Cuarteles y sectores de riego**.

2.  Pinchar **+ Cuarteles** y elegirlos desde la **Lista** o el **Mapa**
    (se puede buscar por cuartel, variedad o etiqueta).

3.  Pinchar **Listo**.

**Figura 53.** *Labor con el widget de cuarteles activo, antes de
seleccionar.*

**Figura 54.** *Seleccionar cuarteles desde la lista o el mapa.*

7.2 Labor parcial en un cuartel

En la tabla de cuarteles se activa el switch **Labor parcial** del
cuartel. Se despliegan sus plantaciones y se marca en cuáles se hace la
labor y en qué superficie o número de plantas. Ejemplo: un replante de
solo 200 plantas de una variedad; Agrak costea a ese nivel y además usa
ese valor como **tope** (no se pueden registrar más plantas que las
pedidas).

**Figura 55.** *Switch "Labor parcial" en el cuartel.*

**Figura 56.** *Labor parcial: selección de variedades y número de
plantas.*

7.3 Acción masiva

Para aplicar un criterio a muchos cuarteles a la vez (ej. aplicación de
herbicida al 70 % de la superficie), se usa **Acción masiva > Aplicar
labor parcial**: se filtra por especie, variedad, año de plantación,
etiqueta de plantación o sector de riego y se define el porcentaje a
aplicar.

**Figura 57.** *Aplicar labor parcial con criterios de búsqueda y
porcentaje.*

> **Resumen:** un centro de costo puede tener varios cuarteles y cada
> cuartel varias variedades; al crear la labor se puede acotar a un
> cuartel, a una variedad o a un porcentaje de la superficie.

8\. Etiquetas y agrupadores

La estructura mínima de Agrak (empresa, campo, cuartel, especie,
variedad y centro de costo) puede complementarse con **agrupaciones
adicionales** mediante etiquetas. Las etiquetas permiten agrupar
prácticamente cualquier cosa y luego filtrar y costear por ellas:

  -----------------------------------------------------------------------
  **Se puede etiquetar** **Ejemplo**
  ---------------------- ------------------------------------------------
  Cuarteles              "Bajo techo", "Norte", "Grupo 1"

  Labores                "Fuera de presupuesto", "Interna", "25%
                         flor"

  Personas               Grupo "Agronomía" que reúne a distintos cargos

  Plantaciones           Grupos de plantaciones para acciones masivas
  -----------------------------------------------------------------------

> **Recomendación:** si la empresa mantiene una base de datos propia de
> cuarteles (código, campo, zona, proyecto, etc.), conviene que al
> cargar la información en Agrak se indique para cada cuartel su centro
> de costo, proyecto y etiquetas, de modo que ambas fuentes cuadren.

**Figura 58.** *Cuarteles de una labor con sus etiquetas.*

9\. Usuarios y accesos

9.1 ¿Quién es usuario?

Un **usuario** es cualquier persona que interactúa con la plataforma
(web o celular): administradores, supervisores, anotadores de cosecha,
personal de mantención, quien registra calicatas, etc. La cantidad de
usuarios disponibles depende de la licencia contratada.

> **Recomendación:** evitar que una persona digite lo que otros anotan
> en papel. Lo ideal es que cada persona ingrese la información
> directamente en terreno desde su celular (con foto y geolocalización).

9.2 Los accesos definen lo que se ve

Si a un usuario se le quita el acceso a un módulo, **no es que no pueda
entrar: el módulo desaparece del menú**. Así, quien tiene pocos accesos
ve una plataforma simple y enfocada en lo suyo.

**Figura 59.** *Usuario con acceso completo: todos los módulos activos.*

**Figura 60.** *El mismo usuario tras quitarle accesos: el menú solo
muestra Inicio y Configuraciones.*

9.3 Crear un usuario en 3 pasos

Paso 1: crear el usuario y asignar módulos

1.  Ir a **Configuraciones > Usuarios** y pinchar **Agregar usuario**.

2.  Completar **Nombres, Apellidos, Identificación (RUT)** y **Correo
    electrónico**.

3.  En **Módulos con acceso** abrir el selector y activar los módulos y
    permisos (Leer, Actualizar, Crear, Eliminar). Ver tabla 9.4.

4.  En **Empresas con acceso** elegir la o las empresas.

5.  Pinchar **Guardar cambios**. El sistema confirma que el usuario fue
    creado y le envía un correo.

**Figura 61.** *Configuraciones > Usuarios de sistema.*

**Figura 62.** *Formulario de usuario: nombres, identificación, correo,
módulos y empresas con acceso.*

."){width="6.25in"
height="5.260416666666667in"}

**Figura 63.** *Seleccionar módulos y permisos (Leer / Actualizar /
Crear / Eliminar).*

También existe **Configuraciones > Carga masiva** para usuarios,
trabajadores, etiquetas y otros, aunque los accesos se asignan uno a
uno.

Paso 2: dar la contraseña

Hay dos formas: que el usuario ingrese con su correo y defina su clave
(poco práctico, especialmente para supervisores y jefes de huerto), o
que el administrador le asigne una. Se recomienda la segunda:

1.  En la lista de usuarios pinchar el ícono de **llave** del usuario.

2.  Escribir la contraseña y su confirmación.

3.  Activar **Temporal** para que el sistema le pida cambiarla en su
    próximo ingreso.

4.  Pinchar **Guardar cambios**.

**Figura 64.** *Restablecer contraseña con la opción Temporal.*

Paso 3: asociarlo como trabajador

Ser usuario no lo crea como trabajador. Hay que ir a **Empresa > Lista
de trabajadores** y verificar que la persona esté creada; si no,
agregarla (también se puede hacer por carga masiva).

**Figura 65.** *Lista de trabajadores.*

> **Baja de un usuario:** si alguien deja la empresa o está con licencia
> médica, no se elimina: se entra a su perfil y se le quitan todos los
> accesos. Se pueden restituir después.

9.4 Significado de cada módulo y permiso

  ------------------------------------------------------------------------
  **Módulo**          **Qué controla**              **Perfil sugerido**
  ------------------- ----------------------------- ----------------------
  Inicio              La portada. Todos deben       Todos.
                      tenerlo.                      

  Proyectos           Crear labores/proyectos       Gerencia.
                      masivos a muchos campos.      

  Labores             Ver, crear, editar y eliminar Supervisor/jefe de
                      labores.                      huerto: solo lectura
                                                    (ingresa datos).
                                                    Gerencia: completo.

  Roles de editor     Habilita la barra azul        Quienes crean labores.
  Labores/Proyectos   "Pueden editar" para dejar  
                      que otros editen una labor.   

  Código de labor /   Asignar códigos de labor, que Gerencia / RR.HH.
  proyectos           normalmente alimentan el      
                      sistema de remuneraciones.    

  Plantillas de       Leer = usar plantillas;       Gerencia de
  Labores/Proyectos   Crear/Eliminar = mantener     operaciones: completo.
                      plantillas. Sin acceso ni     Administradores: solo
                      siquiera se ven.              lectura.

  Plantillas privadas Plantillas personales del     Según perfil.
                      usuario.                      

  Trabajos por pieza  Leer = ver barras de avance y Restringido.
                      tarjas. Actualizar/Crear =    
                      modificar valores de tarjas y 
                      trabajadores.                 

  Empresas /          Crear empresas y empleados.   Administración.
  Empleados                                         

  Campos/Cuarteles    Crear y editar campos y       Restringido.
                      cuarteles.                    

  Especies /          Crear especies o variedades   Restringido.
  Variedades          que no estén precargadas.     

  Finanzas            Reportería financiera.        Gerencia / finanzas.

  Encuestas           Crear formularios, checklists Bien acotado.
                      y calicatas (motor de         
                      encuestas).                   

  Mantenedores /      Mantenedores y administración Administración.
  Usuarios            de usuarios.                  

  Carga masiva        Cargas masivas; un error      Muy pocas personas.
                      puede afectar mucha           
                      información.                  

  Etiquetas           Mantenedor de etiquetas       Acotado.
                      (evita duplicados como        
                      "poda/podas").              

  Aplicaciones /      Aplicaciones de agroquímicos  Según rol.
  Agrak Harvest       y cosecha.                    
  ------------------------------------------------------------------------

**Figura 66.** *Perfil de supervisor: solo Inicio y lectura de Labores.*

**Figura 67.** *Permisos de plantillas: leer, usar o mantener.*

**Figura 68.** *Perfil con acceso completo a módulos y widgets.*

> **Regla general:** ante la duda, entregar menos accesos. La carga
> masiva y la creación de plantillas y etiquetas deben quedar en pocas
> manos.

Widgets

En la misma ventana se habilitan los **widgets** que el usuario puede
usar en las labores: Descripción, Subtareas, Evidencia, Trabajadores,
Agroquímicos, Maquinaria, Trabajos por pieza, Geolocalización, Cosecha,
Árboles/Semillas, Proveedores de servicios, Encuestas, Cuarteles,
Materiales y Configuración de widgets.

**Figura 69.** *Selección de widgets habilitados para el usuario.*

9.5 Otros elementos relacionados

Detalle de trabajador en trabajos por pieza

Con permiso de actualización sobre Trabajos por pieza se puede entrar al
detalle de un trabajador, ver sus horas, piezas y costo, y modificar o
agregar registros.

**Figura 70.** *Detalle de un trabajo por pieza con la lista de
trabajadores, horas, piezas y rendimiento.*

Encuestas (formularios)

En **Encuestas** se crean formularios de cualquier tipo (calicatas,
conteos, mantenciones): preguntas de foto (con cantidad de archivos y
restricción a celular), selección única o múltiple, texto, número,
fecha, etc. Se pueden condicionar preguntas según respuestas, configurar
notificaciones y tareas. Estos formularios quedan disponibles para todos
los campos de la empresa.

**Figura 71.** *Detalle de una encuesta de calicata con sus preguntas.*

Mantenedor de etiquetas

En **Configuraciones > Etiquetas** se administran todas las etiquetas
de la empresa por tipo (trabajadores, labores y proyectos, encuestas,
productos, campos, cuarteles, sectores de riego, plantaciones). Conviene
restringir su creación para mantener nombres predefinidos.

**Figura 72.** *Mantenedor de etiquetas.*

10\. Recomendaciones para la puesta en marcha

10.1 Definiciones previas

1.  Definir cuántos campos hay realmente y si irán bajo una o varias
    empresas (sección 2).

2.  Definir el modelo de creación de labores (sección 4).

3.  Definir qué representa el centro de costo (cuartel, proyecto, etc.)
    y qué etiquetas se usarán como agrupadores.

4.  Definir los perfiles de acceso por cargo.

10.2 Información a preparar para la carga inicial

  -----------------------------------------------------------------------
  **Nivel**           **Datos requeridos**
  ------------------- ---------------------------------------------------
  Campos              Nombre, superficie, ubicación, centro de costo.

  Cuarteles           Nombre, superficie, centro de costo / proyecto,
                      etiquetas.

  Plantaciones (por   Especie, variedad, superficie por variedad,
  cuartel)            densidad de plantas (y año de plantación,
                      distancias y sistema de conducción si se tienen).

  Usuarios /          Nombre, RUT, correo, cargo y accesos a entregar.
  trabajadores        
  -----------------------------------------------------------------------

10.3 Orden sugerido de implementación

-   Partir con las labores diarias y más sencillas: **riegos** y labores
    de campo.

-   En paralelo, las **aplicaciones** de agroquímicos (uno de los puntos
    críticos).

-   Con labores de campo y aplicaciones funcionando, seguir con
    **mantenimientos, calicatas, maquinaria** y demás módulos.

-   Capacitar en terreno (uso del celular y la app) una vez que estén
    creados los campos, plantados los cuarteles y entregados los
    accesos.
