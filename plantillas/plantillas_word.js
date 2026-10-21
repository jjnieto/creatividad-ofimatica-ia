// Primera versión de documento_proyecto.docx: un solo archivo que crece. En el bloque 3 es la ficha exprés
// (una o dos frases por apartado) y en el bloque 4 se amplía, en el mismo archivo, hasta el documento del proyecto.
// Como con las diapositivas, el .docx manda: si ya existe, el script no lo sobrescribe.
// Uso: node plantillas_word.js [carpeta_salida]
const { ANCHO, parrafo, titulo, apartado, caja, tabla, prompt, casilla, espacio, saltoPagina, documento, guardar } = require("./word_comun");

const CARPETA = process.argv[2] || __dirname;

function proyecto() {
  return documento([
    ...titulo("Documento del proyecto", "Un solo archivo que crece: en el bloque 3 es la ficha exprés y en el bloque 4 lo ampliáis. Máximo dos páginas."),
    tabla(["Pareja"], [ANCHO], [["Nombres"]], 400),
    parrafo([["Bloque 3: ", { bold: true, size: 20 }], ["una o dos frases por apartado, del 1 al 6 (la ficha exprés). ", { size: 20 }],
      ["Bloque 4: ", { bold: true, size: 20 }], ["ampliáis cada apartado y rellenáis lo marcado «bloque 4».", { size: 20 }]],
      { spacing: { before: 120, after: 0 } }),
    apartado("1. Nombre de la propuesta"),
    caja("Un nombre corto que diga qué es. Por ejemplo: Sistema de seguimiento de solicitudes.", 450),
    apartado("2. Problema"),
    caja("Bloque 3: qué no funciona y a quién afecta. Bloque 4: añadid por qué importa.", 1000),
    apartado("3. Solución: cómo funciona"),
    caja("Bloque 3: qué proponéis y con qué herramientas. Bloque 4: paso a paso, quién hace qué y en qué momento; qué hace la IA y qué revisa siempre una persona.", 1300),
    apartado("4. Beneficios esperados"),
    caja("Bloque 3: qué mejoraría, sin cifras inventadas. Bloque 4: para quién.", 700),
    espacio(),
    tabla(["Indicador (bloque 4)", "Cómo se mide antes", "Cómo se mide después de un mes de prueba"], [3000, 3319, 3319], [
      ["Indicador 1", "", ""],
      ["Indicador 2", "", ""],
    ], 550),
    apartado("5. Recursos"),
    tabla(["Herramientas ofimáticas y de IA", "Personas y formación", "Coste (bloque 4)"], [3600, 3019, 3019], [
      ["", "Quién se encarga y qué formación necesita", "Aproximado y justificado, o «sin coste adicional»"],
    ], 900),
    apartado("6. Riesgos"),
    tabla(["Riesgo", "Medida preventiva (bloque 4)"], [4819, 4819], [["Qué podría salir mal", ""], ["", ""], ["", ""]], 450),
    apartado("7. Tres pasos para ponerla en práctica (bloque 4)"),
    tabla(["", "Paso", "Responsable", "Plazo"], [500, 5338, 2200, 1600], [
      [{ fija: "1" }, "", "", ""],
      [{ fija: "2" }, "", "", ""],
      [{ fija: "3" }, "", "", ""],
    ], 420),

    saltoPagina(),
    ...titulo("Páginas de trabajo", "No forman parte del documento: sirven para hacerlo y revisarlo."),
    apartado("Bloque 3. La ficha exprés con la IA"),
    parrafo("Pedid la ficha a la IA con este prompt, pegad su respuesta en los apartados 1 a 6 y corregid tres cosas."),
    prompt("Prompt para pedir la ficha a la IA", [
      "Redacta una ficha de una página con estos apartados: nombre de la",
      "propuesta, problema, solución, beneficios esperados, recursos y riesgos.",
      "La propuesta es: [describir la propuesta sin datos personales].",
      "Usa frases cortas y no inventes cifras ni resultados.",
    ]),
    espacio(),
    tabla(["Tres cosas que cambiamos", "Qué hemos encontrado", "Cómo lo hemos corregido"], [2200, 3719, 3719], [
      [{ fija: "Algo que sobra" }, "", ""],
      [{ fija: "Algo que falta" }, "", ""],
      [{ fija: "Algo que no es cierto o no está justificado" }, "", ""],
    ], 560),
    apartado("Bloque 4. Preguntas difíciles del intercambio"),
    tabla(["Pregunta que no supimos responder", "Dónde la respondemos (apartado)"], [6138, 3500],
      [["Lo primero que tiene que resolver el documento", ""], ["", ""]], 380),
    apartado("Bloque 4. Indicadores"),
    prompt("Primero pensad los vuestros; después, si queréis, pedid ideas a la IA y elegid los dos mejores", [
      "Esta es nuestra propuesta: [resumen sin datos personales].",
      "Propón cinco indicadores medibles para comprobar si funciona durante",
      "una prueba de un mes. Para cada uno, explica cómo medirlo antes y",
      "después de la prueba con herramientas sencillas. No inventes",
      "resultados ni cifras de mejora.",
    ]),
    apartado("Bloque 4. Antes de entregar"),
    casilla("Hemos respondido a las preguntas que no supimos contestar en el intercambio."),
    casilla("Hemos revisado cada apartado: qué sobra, qué falta y qué no es cierto."),
    casilla("Los dos indicadores explican cómo se mide, no qué resultado se conseguirá."),
    casilla("Cada riesgo tiene su medida preventiva."),
    casilla("Está claro qué actividades requieren supervisión humana."),
    casilla("No hay datos personales ni confidenciales."),
    casilla("El documento ocupa como máximo dos páginas."),
  ], "Documento del proyecto · Bloques 3 y 4");
}

guardar(CARPETA, [["documento_proyecto.docx", proyecto]]);
