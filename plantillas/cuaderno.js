// Primera versión de cuaderno_ejercicios.docx: instrucciones y espacios del alumnado para todo el taller.
// Los entregables con plantilla propia (matriz, ficha, documento y presentación) no se repiten: se remite a ellas.
// Como con las diapositivas, el .docx manda: si ya existe, el script no lo sobrescribe.
// Uso: node cuaderno.js [carpeta_salida]
const {
  AMBAR, VERDE, VERDE_CLARO, GRIS, parrafo, numerada, casilla, titulo, apartado, caja, tabla, prompt, cita, espacio, saltoPagina,
  documento, guardar,
} = require("./word_comun");

const CARPETA = process.argv[2] || __dirname;

function portada() {
  return [
    ...titulo("Cuaderno de ejercicios", "Desarrollo de las habilidades creativas e innovadoras con herramientas ofimáticas y de inteligencia artificial"),
    tabla(["Nombre", "Pareja (desde el bloque 2)"], [4819, 4819], [["", ""]], 450),
    apartado("El recorrido del taller"),
    ...numerada([
      [["Generar muchas ideas", { bold: true }], [" con brainstorming, SCAMPER y provocación (bloques 1 y 2)."]],
      [["Seleccionar", { bold: true }], [" las propuestas que realmente interesan y quedarnos con tres (bloque 2)."]],
      [["Compararlas", { bold: true }], [" con una matriz de decisión y elegir la ganadora (bloque 3)."]],
      [["Documentarla y desarrollarla", { bold: true }], [" (bloques 3 y 4)."]],
      [["Presentarla y defenderla", { bold: true }], [" (bloque 5)."]],
    ]),
    apartado("Reglas del cuaderno"),
    ...numerada([
      [["Primero pensáis vosotros y después se pide ayuda a la IA.", { bold: true }], [" Si la IA va primero, os ancla en sus ideas y dejáis de pensar por vuestra cuenta."]],
      [["Lo vuestro va en ámbar", { bold: true, color: AMBAR }], [" y "], ["lo que dice la IA, en verde azulado", { bold: true, color: VERDE }], [". Así se ve qué aporta cada uno."]],
      "Revisad siempre lo que dice la IA: puede inventar cifras, estudios o funciones que no existen.",
      "En los prompts se describe el proceso, nunca a las personas: sin nombres ni datos personales o confidenciales.",
      "Es una simulación formativa: los datos de los casos son supuestos didácticos y no se inventan resultados.",
    ]),
    apartado("Plantillas que usaréis además de este cuaderno"),
    tabla(["Plantilla", "Para qué", "Bloque"], [3400, 4938, 1300], [
      [{ fija: "matriz_decision.xlsx" }, { nota: "Comparar las tres propuestas y elegir la ganadora (Ejercicio 4)" }, { nota: "3" }],
      [{ fija: "ficha_expres.docx" }, { nota: "Ficha de una página de la propuesta ganadora" }, { nota: "3" }],
      [{ fija: "documento_proyecto.docx" }, { nota: "Documento del proyecto, de dos páginas como máximo" }, { nota: "4" }],
      [{ fija: "presentacion_proyecto.pptx" }, { nota: "Presentación en tres diapositivas" }, { nota: "4" }],
    ], 350),
    parrafo([["Se abren también en Google Sheets, Docs y Slides.", { italics: true, color: GRIS, size: 20 }]], { spacing: { before: 80 } }),
  ];
}

function bloque1() {
  return [
    saltoPagina(),
    ...titulo("Bloque 1. Brainstorming", "Activación de la creatividad. Ejercicio 1, entre todo el grupo."),
    apartado("Calentamiento: ¿para qué sirve un clip?"),
    caja("En 90 segundos, en silencio: todos los usos que se os ocurran para un clip. Cuantos más, mejor.", 1300),
    apartado("Ejercicio 1. El reto"),
    cita([[["¿Cómo podríamos conseguir que más personas pidan información sobre los cursos de una academia de formación que recibe pocas solicitudes?", { italics: true }]]]),
    parrafo([["Reglas: ", { bold: true }], ["cantidad antes que calidad; no se critica ninguna idea; se vale construir sobre la idea de otra persona («y además…»); las ideas disparatadas son bienvenidas."]], { spacing: { before: 120, after: 100 } }),
    apartado("Ronda sin IA"),
    caja("Las ideas que habéis aportado y las del grupo que queréis recordar. El docente las apunta todas, numeradas.", 1500),
    apartado("Ronda con IA"),
    caja("Las ideas de la IA (y las combinaciones con las del grupo) que os han llamado la atención.", 1300, VERDE_CLARO),
    apartado("Comparación"),
    tabla(["", "Sin IA", "Con IA"], [4638, 2500, 2500], [
      [{ fija: "Número de ideas" }, "", { ia: "" }],
      [{ fija: "Ideas entre las más votadas" }, "", { ia: "" }],
    ], 400),
    espacio(),
    caja("¿La IA ha dado ideas mejores o solo más ideas? ¿Las combinaciones han mejorado las ideas de partida? ¿Cuáles podrían aplicarse con pocos recursos?", 1100),
  ];
}

const SCAMPER = [
  ["Sustituir", "¿Qué podemos cambiar por otra cosa?"],
  ["Combinar", "¿Qué elementos podemos unir?"],
  ["Adaptar", "¿Qué funciona en otro sector?"],
  ["Modificar", "¿Qué podemos ampliar o reducir?"],
  ["Proponer otros usos", "¿Para qué más puede servir?"],
  ["Eliminar", "¿Qué pasos sobran?"],
  ["Reorganizar", "¿Qué orden podemos cambiar?"],
];

function bloque2() {
  return [
    saltoPagina(),
    ...titulo("Bloque 2. SCAMPER y provocación", "Por parejas, sobre un mismo caso durante todo el bloque. Ejercicios 2 y 3."),
    apartado("Nuestro caso"),
    casilla([["Un comercio que pierde pedidos.", { bold: true }], [" Llegan por teléfono, WhatsApp y en el mostrador; se apuntan en una libreta y a veces se olvidan o se sirven tarde."]]),
    casilla([["Una asociación que pierde tiempo organizando actividades.", { bold: true }], [" Se anuncian por WhatsApp y las inscripciones están en un Excel que solo actualiza una persona; se pierden inscripciones y quedan plazas sin cubrir."]]),
    casilla([["Una oficina que recibe siempre las mismas preguntas.", { bold: true }], [" Por teléfono y por correo llegan a diario las mismas consultas (horarios, documentación, plazos) y se responden una a una."]]),
    apartado("Cómo funciona hoy el proceso"),
    caja("Tres o cuatro líneas: qué pasa, en qué orden y con qué herramientas. Sin nombres ni datos personales.", 1100),
    apartado("Problema"),
    caja("Qué falla y a quién afecta.", 700),

    saltoPagina(),
    ...titulo("Ejercicio 2. SCAMPER", "Siete preguntas para transformar el proceso que ya existe."),
    parrafo([["Ronda sin IA: ", { bold: true }], ["al menos una idea por cada letra en la columna ámbar. "], ["Ronda con IA: ", { bold: true }], ["copiad el prompt y anotad en la columna verde la idea de la IA que más os interese para cada letra."]]),
    tabla(["Letra", "Pregunta", "Nuestra idea (sin IA)", "Idea de la IA que nos interesa"], [1550, 2200, 2944, 2944],
      SCAMPER.map(([letra, pregunta]) => [{ fija: letra }, { nota: pregunta }, "", { ia: "" }]), 560),
    espacio(),
    prompt("Prompt de la ronda con IA", [
      "Actúa como especialista en mejora de procesos de pequeñas empresas",
      "y organizaciones.",
      "Proceso actual: [describir en 3 o 4 líneas cómo se hace hoy, sin",
      "nombres ni datos personales].",
      "Problema: [qué falla y a quién afecta].",
      "Restricciones: sin comprar software caro, sin contratar personal",
      "y que pueda probarse en un mes.",
      "Ya hemos aplicado SCAMPER y tenemos estas ideas:",
      "[pegar las ideas de la pareja, indicando la letra de cada una]",
      "Aplica SCAMPER al proceso: para cada una de las siete letras, propón",
      "dos ideas que no repitan las nuestras.",
      "Preséntalo en una tabla con estas columnas: letra, idea, qué cambia",
      "en el proceso, beneficio principal y dificultad (baja, media o alta).",
      "No inventes cifras de ahorro ni de resultados.",
    ]),
    parrafo([["Iterad con al menos una de estas peticiones: ", { bold: true }], ["«Descarta las ideas que requieran más de 100 € o conocimientos técnicos», «Prioriza las ideas que puedan probarse en una semana» o «Señala los inconvenientes de las tres mejores ideas»."]], { spacing: { before: 120, after: 100 } }),
    apartado("Conclusiones de SCAMPER"),
    tabla(["Nuestra mejor idea sin IA", "La mejor idea de la IA", "Algo que la IA no ha entendido de nuestro caso"], [3212, 3213, 3213],
      [["", { ia: "" }, ""]], 800),

    saltoPagina(),
    ...titulo("Ejercicio 3. Provocación", "Una afirmación absurda que rompe una suposición y, después, el movimiento hasta una idea práctica."),
    parrafo([["Ronda sin IA: ", { bold: true }], ["tres provocaciones de tipos distintos (inversión, exageración, eliminación o deseo «¿Y si…?»). Sin movimiento no hay idea: ¿qué principio útil sacamos del absurdo?"]]),
    tabla(["Tipo", "Provocación", "Movimiento: principio útil", "Idea práctica"], [1600, 2679, 2680, 2679],
      [1, 2, 3].map(() => ["Tipo", "", "", ""]), 1100),
    espacio(),
    prompt("Prompt de la ronda con IA", [
      "Actúa como experto en pensamiento lateral y en la técnica de",
      "provocación de Edward de Bono.",
      "",
      "Situación: [describir el proceso actual y el problema, sin nombres",
      "ni datos personales].",
      "",
      "Paso 1. Escribe 6 provocaciones: afirmaciones deliberadamente absurdas",
      "o imposibles que rompan una suposición sobre esta situación. Incluye",
      "al menos una de cada tipo: inversión, exageración, eliminación y",
      "deseo («¿Y si…?»).",
      "Paso 2. Para cada provocación, haz el movimiento: explica qué",
      "principio útil puede extraerse de ella.",
      "Paso 3. Convierte cada principio en una idea práctica, realista",
      "y de bajo coste.",
      "",
      "Preséntalo en una tabla con cuatro columnas: tipo, provocación,",
      "principio útil e idea práctica.",
      "No repitas estas provocaciones nuestras: [pegar las de la pareja].",
    ]),
    apartado("Revisión de la tabla de la IA"),
    tabla(["Idea práctica de la IA", "¿El principio se deduce de la provocación?", "¿Es aplicable o es un tópico?"], [3638, 3000, 3000],
      [[{ ia: "" }, "", ""], [{ ia: "" }, "", ""]], 800),

    saltoPagina(),
    ...titulo("Las tres mejores propuestas", "Reunid las ideas de SCAMPER y de la provocación, vuestras y de la IA, y quedaos con tres."),
    apartado("Problema"),
    caja("El problema del caso, en una frase.", 600),
    espacio(),
    tabla(["", "Propuesta", "Por qué la elegimos: coste, beneficio y facilidad de aplicación", "Origen"], [500, 3300, 4038, 1800],
      [1, 2, 3].map((n) => [{ fija: String(n) }, "", "", "Pareja, IA o combinación"]), 1300),
    apartado("Puesta en común"),
    caja("¿De dónde han salido las propuestas elegidas? ¿Qué técnica ha dado ideas más aplicables? ¿Y más originales?", 1000),
    apartado("¿Qué falla aquí?"),
    parrafo("Un prompt y la respuesta de una IA sobre la peluquería del ejemplo. Encontrad todos los problemas."),
    cita([
      [["Prompt: ", { bold: true }], ["«Nuestra clienta María García Ruiz, de la calle Mayor 12, falta siempre a sus citas y no paga las anulaciones. ¿Cómo reducimos las ausencias?»"]],
      [["Respuesta de la IA: ", { bold: true }], ["«Según un estudio de la Universidad de Salamanca de 2023, enviar recordatorios reduce las ausencias un 47 %. Os recomiendo activar la función de recordatorios automáticos gratuita que incluye vuestra aplicación de mensajería. También podéis cobrar una fianza del 50 % al reservar; es la práctica habitual en todas las peluquerías»."]],
    ]),
    espacio(),
    caja("Problemas que encontramos.", 1300),
  ];
}

function bloque3() {
  return [
    saltoPagina(),
    ...titulo("Bloque 3. Comparar, decidir y documentar", "Ejercicio 4 y ficha exprés de la propuesta ganadora."),
    apartado("Ejercicio 4. Elegir con criterio"),
    parrafo([["Plantilla: ", { bold: true }], ["matriz_decision.xlsx", { bold: true }], [". Ahí anotáis también la decisión y sus razones."]]),
    ...numerada([
      "Introducid vuestras tres propuestas del bloque 2.",
      "Puntuad cada criterio del 1 al 5: impacto (35 %), viabilidad (30 %), bajo coste (20 %, 5 = muy económica) y originalidad (15 %).",
      "Ordenad las propuestas por resultado y discutid si la primera os parece realmente la más adecuada.",
      "Dad más peso al coste (los pesos siempre suman 100 %) y observad si cambia la clasificación.",
      "Pedid a la IA que revise la matriz y comprobad si sus observaciones son correctas.",
      [["Decidid: «Elegimos… porque…».", { bold: true }], [" No tiene por qué ser la de mayor puntuación, pero si no lo es, explicad por qué."]],
    ]),
    espacio(),
    prompt("Prompt para que la IA revise la matriz", [
      "Te paso una matriz de decisión con tres propuestas, cuatro criterios",
      "puntuados del 1 al 5 y sus pesos: [pegar la tabla con los pesos].",
      "Revísala: comprueba si los cálculos son correctos, si alguna",
      "puntuación parece incoherente con la descripción de la propuesta",
      "y si falta algún criterio importante. Justifica cada observación.",
    ]),
    apartado("Ficha exprés de la propuesta ganadora"),
    parrafo([["Plantilla: ", { bold: true }], ["ficha_expres.docx", { bold: true }], [". La pedís a la IA con el prompt de la plantilla y marcáis tres cosas que cambiaríais: algo que sobra, algo que falta y algo que no es cierto o no está justificado. Esta ficha es el borrador del documento del bloque 4."]]),
    apartado("Síntesis"),
    parrafo([["Detectar → idear → comparar → decidir → documentar", { bold: true }]]),
    caja("¿Qué paso de la secuencia os ha costado más hasta ahora y por qué? Una frase.", 800),
  ];
}

function bloque4() {
  return [
    saltoPagina(),
    ...titulo("Bloque 4. Desarrollo de la propuesta ganadora", "Convertir la propuesta en un proyecto defendible."),
    apartado("Preguntas difíciles antes de seguir"),
    parrafo("Os juntáis con otra pareja. Le explicáis vuestra propuesta en un minuto, con la ficha exprés delante, y os hace dos preguntas difíciles (¿cuánto cuesta?, ¿quién se encarga?, ¿qué pasa si alguien no lo usa?, ¿cómo sabremos si funciona?). Después, al revés."),
    tabla(["Pregunta que nos han hecho", "¿Supimos responder?"], [6638, 3000], [["", "Sí o no"], ["", "Sí o no"]], 600),
    parrafo([["Las que no supisteis responder son lo primero que tiene que resolver el documento: pasadlas a su última página.", { italics: true, color: GRIS, size: 20 }]], { spacing: { before: 80, after: 100 } }),
    apartado("Lo que vais a preparar"),
    tabla(["Qué", "Plantilla", "Clave"], [2600, 2900, 4138], [
      [{ fija: "Documento del proyecto" }, { nota: "documento_proyecto.docx" }, { nota: "Siete apartados, máximo dos páginas. Cada apartado lo revisáis: qué sobra, qué falta y qué no es cierto." }],
      [{ fija: "Dos indicadores" }, { nota: "documento_proyecto.docx, apartado 4" }, { nota: "Primero pensáis los vuestros; después, si queréis, pedís ideas a la IA. Se explica cómo se mide, no qué se conseguirá." }],
      [{ fija: "Presentación" }, { nota: "presentacion_proyecto.pptx" }, { nota: "Tres diapositivas: problema, solución y beneficios. Una idea por diapositiva y poco texto." }],
    ], 500),
    apartado("Revisión cruzada"),
    parrafo("Os intercambiáis la presentación con la pareja de las preguntas difíciles y comprobáis: ¿una idea por diapositiva?, ¿poco texto?, ¿alguna cifra sin justificar?"),
    tabla(["Mejora que nos propone la otra pareja", "Mejora que les proponemos"], [4819, 4819], [["", ""]], 1200),
  ];
}

function bloque5() {
  return [
    saltoPagina(),
    ...titulo("Bloque 5. Comunicar y defender", "Presentar la propuesta, aceptar críticas y llevarlo a la búsqueda de empleo."),
    apartado("La estructura de una defensa"),
    ...numerada([
      "¿Qué problema hemos identificado?",
      "¿Por qué conviene resolverlo?",
      "¿Qué proponemos?",
      "¿Cómo lo pondríamos en práctica?",
      "¿Qué resultados esperaríamos y cómo los mediríamos?",
    ]),
    apartado("Ensayo: la primera frase"),
    caja("El problema en 20 segundos: qué pasa, a quién afecta y por qué importa. Partid del problema, no de las herramientas.", 900),
    apartado("Como observadores"),
    parrafo("Mientras presentan las demás parejas: claridad, originalidad, viabilidad y riesgos, y al menos una propuesta de mejora."),
    tabla(["Pareja", "Claridad y originalidad", "Viabilidad y riesgos", "Una mejora"], [1838, 2600, 2600, 2600],
      [1, 2, 3, 4, 5, 6, 7].map(() => ["", "", "", ""]), 450),
  ];
}

function bloque5b() {
  return [
    saltoPagina(),
    apartado("La IA como evaluador crítico"),
    prompt("Prompt (con un resumen de la propuesta sin información sensible)", [
      "Actúa como responsable de una empresa que debe decidir si implantar",
      "una propuesta de innovación. Voy a presentarte una solución.",
      "Evalúala de forma crítica considerando utilidad, originalidad, coste,",
      "facilidad de implantación y riesgos. Identifica tres debilidades,",
      "formula dos preguntas difíciles y sugiere una mejora concreta.",
      "No des por válidas las cifras que no estén justificadas.",
      "Esta es la propuesta: [insertar descripción].",
    ]),
    espacio(),
    tabla(["Crítica de la IA", "¿La aceptamos? ¿Por qué?", "Qué modificaríamos"], [3638, 3000, 3000],
      [[{ ia: "" }, "", ""], [{ ia: "" }, "", ""], [{ ia: "" }, "", ""]], 800),
    parrafo([["La respuesta de la IA también puede contener errores: aceptad solo las críticas que se sostengan.", { italics: true, color: GRIS, size: 20 }]], { spacing: { before: 80, after: 100 } }),
    apartado("Mi relato para una entrevista"),
    parrafo("Ejemplo:"),
    cita([[["«En una actividad de innovación digital analicé un proceso administrativo, utilicé técnicas creativas e inteligencia artificial para generar alternativas y elaboré una matriz en Excel para evaluarlas. Después documenté una solución y preparé una presentación para defenderla.»", { italics: true }]]]),
    espacio(),
    caja("Vuestro relato, individual, en tres o cuatro líneas: adaptado al trabajo de vuestra pareja y al puesto al que aspiráis. Presentadlo como simulación formativa, no como una mejora implantada en una empresa.", 1500),
    apartado("Para llevarme"),
    caja("Una técnica que quiero aplicar en un futuro empleo, y dónde.", 800),
  ];
}

function cuaderno() {
  return documento([...portada(), ...bloque1(), ...bloque2(), ...bloque3(), ...bloque4(), ...bloque5(), ...bloque5b()], "Cuaderno de ejercicios");
}

guardar(CARPETA, [["cuaderno_ejercicios.docx", cuaderno]]);
