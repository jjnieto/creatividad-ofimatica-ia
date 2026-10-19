// Primera versión de las plantillas Word: ficha_expres.docx (bloque 3) y documento_proyecto.docx (bloque 4).
// Como con las diapositivas, el .docx manda: si ya existe, el script no lo sobrescribe.
// Uso: node plantillas_word.js [carpeta_salida]
const { titulo, apartado, caja, tabla, datosPareja, prompt, casilla, espacio, saltoPagina, documento, guardar } = require("./word_comun");

const CARPETA = process.argv[2] || __dirname;

function ficha() {
  return documento([
    ...titulo("Ficha exprés de la propuesta", "Una página con la propuesta ganadora del Ejercicio 4. Será el borrador del documento del proyecto."),
    datosPareja(),
    apartado("Nombre de la propuesta"),
    caja("Un nombre corto que diga qué es. Por ejemplo: Sistema de seguimiento de solicitudes.", 450),
    apartado("Problema"),
    caja("Qué no funciona y a quién afecta, en una o dos frases.", 1100),
    apartado("Solución"),
    caja("Qué proponéis y con qué herramientas.", 1100),
    apartado("Beneficios esperados"),
    caja("Qué mejoraría. Sin cifras inventadas.", 1100),
    apartado("Recursos"),
    caja("Herramientas, personas y formación necesarias.", 1100),
    apartado("Riesgos"),
    caja("Qué podría salir mal: errores, accesos inadecuados, resistencia al cambio…", 1100),
    saltoPagina(),
    ...titulo("Revisión de la ficha", "Esta página no forma parte de la ficha: sirve para trabajarla."),
    prompt("Prompt para pedir la ficha a la IA", [
      "Redacta una ficha de una página con estos apartados: nombre de la",
      "propuesta, problema, solución, beneficios esperados, recursos y riesgos.",
      "La propuesta es: [describir la propuesta sin datos personales].",
      "Usa frases cortas y no inventes cifras ni resultados.",
    ]),
    apartado("Tres cosas que cambiaríamos de la versión de la IA"),
    tabla(["", "Qué hemos encontrado", "Cómo lo hemos corregido"], [2200, 3719, 3719], [
      [{ fija: "Algo que sobra" }, "", ""],
      [{ fija: "Algo que falta" }, "", ""],
      [{ fija: "Algo que no es cierto o no está justificado" }, "", ""],
    ], 1300),
  ], "Bloque 3 · Ficha exprés");
}

function proyecto() {
  return documento([
    ...titulo("Documento del proyecto", "La ficha exprés, ampliada. Máximo dos páginas."),
    datosPareja(),
    apartado("1. Nombre de la propuesta"),
    caja("El de la ficha exprés, o uno mejor.", 450),
    apartado("2. Problema"),
    caja("Situación actual, a quién afecta y por qué importa.", 1000),
    apartado("3. Solución: cómo funciona"),
    caja("Paso a paso: quién hace qué, con qué herramienta y en qué momento. Qué parte hace la IA y qué revisa siempre una persona.", 1400),
    apartado("4. Beneficios esperados"),
    caja("Qué mejoraría y para quién.", 700),
    espacio(),
    tabla(["Indicador", "Cómo se mide antes", "Cómo se mide después de un mes de prueba"], [3000, 3319, 3319], [
      ["Indicador 1", "", ""],
      ["Indicador 2", "", ""],
    ], 600),
    apartado("5. Recursos"),
    tabla(["Herramientas ofimáticas y de IA", "Personas", "Coste"], [3600, 3019, 3019], [
      ["", "Quién se encarga y qué formación necesita", "Aproximado y justificado, o «sin coste adicional»"],
    ], 1000),
    apartado("6. Riesgos"),
    tabla(["Riesgo", "Medida preventiva"], [4819, 4819], [["", ""], ["", ""], ["", ""]], 500),
    apartado("7. Tres pasos para ponerla en práctica"),
    tabla(["", "Paso", "Responsable", "Plazo"], [500, 5338, 2200, 1600], [
      [{ fija: "1" }, "", "", ""],
      [{ fija: "2" }, "", "", ""],
      [{ fija: "3" }, "", "", ""],
    ], 450),
    saltoPagina(),
    ...titulo("Antes de entregar", "Esta página no forma parte del documento: sirve para revisarlo."),
    apartado("Preguntas difíciles del intercambio"),
    tabla(["Pregunta que no supimos responder", "Dónde la respondemos (apartado)"], [6138, 3500], [["", ""], ["", ""]], 500),
    apartado("Comprobación"),
    casilla("Hemos respondido a las preguntas que no supimos contestar en el intercambio."),
    casilla("Hemos revisado cada apartado: qué sobra, qué falta y qué no es cierto."),
    casilla("Los dos indicadores explican cómo se mide, no qué resultado se conseguirá."),
    casilla("Cada riesgo tiene su medida preventiva."),
    casilla("Está claro qué actividades requieren supervisión humana."),
    casilla("No hay datos personales ni confidenciales."),
    casilla("El documento ocupa como máximo dos páginas."),
    espacio(),
    prompt("Prompt para pedir ideas de indicadores a la IA (después de pensar los vuestros)", [
      "Esta es nuestra propuesta: [resumen sin datos personales].",
      "Propón cinco indicadores medibles para comprobar si funciona durante",
      "una prueba de un mes. Para cada uno, explica cómo medirlo antes y",
      "después de la prueba con herramientas sencillas. No inventes",
      "resultados ni cifras de mejora.",
    ]),
  ], "Bloque 4 · Documento del proyecto");
}

guardar(CARPETA, [["ficha_expres.docx", ficha], ["documento_proyecto.docx", proyecto]]);
