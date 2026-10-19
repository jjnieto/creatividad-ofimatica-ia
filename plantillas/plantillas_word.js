// Primera versión de las plantillas Word: ficha_expres.docx (bloque 3) y documento_proyecto.docx (bloque 4).
// Como con las diapositivas, el .docx manda: si ya existe, el script no lo sobrescribe.
// Uso: node plantillas_word.js [carpeta_salida]
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, HeightRule, AlignmentType, Header, Footer, PageNumber, PageBreak, VerticalAlign,
} = require("docx");

const CARPETA = process.argv[2] || __dirname;

// Código de color del curso: ámbar = trabajo de las personas, verde azulado = IA.
const AMBAR = "F4A300", AMBAR_CLARO = "FDEFCC";
const VERDE = "0F7C70", VERDE_CLARO = "D5ECE9";
const OSCURO = "1F2A30", GRIS = "6B7780", BORDE_COLOR = "BFC5C9";

const ANCHO = 9638; // A4 con márgenes de 2 cm, en DXA
const fino = { style: BorderStyle.SINGLE, size: 4, color: BORDE_COLOR };
const BORDES = { top: fino, bottom: fino, left: fino, right: fino };

const texto = (t, o = {}) => new TextRun({ text: t, font: "Calibri", size: 22, ...o });
const pista = (t) => new Paragraph({ children: [texto(t, { italics: true, color: GRIS, size: 20 })] });

function titulo(t, subtitulo) {
  return [
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: t, font: "Arial", size: 36, bold: true, color: OSCURO })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: AMBAR, space: 6 } },
      children: [texto(subtitulo, { color: GRIS, size: 20 })],
    }),
  ];
}

function apartado(t) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    keepNext: true,
    children: [new TextRun({ text: t, font: "Arial", size: 24, bold: true, color: OSCURO })],
  });
}

function celda(hijos, ancho, o = {}) {
  return new TableCell({
    width: { size: ancho, type: WidthType.DXA },
    borders: BORDES,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: hijos,
    ...o,
  });
}

// Recuadro para escribir, con una pista en gris que se sustituye.
function caja(textoPista, alto, relleno = AMBAR_CLARO) {
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({
      height: { value: alto, rule: HeightRule.ATLEAST },
      children: [celda([pista(textoPista)], ANCHO, { shading: { fill: relleno, type: ShadingType.CLEAR, color: "auto" } })],
    })],
  });
}

// Tabla con cabecera oscura y filas para rellenar; `filas` son pistas por celda ("" = vacía).
function tabla(cabeceras, anchos, filas, alto) {
  const cab = new TableRow({
    tableHeader: true,
    children: cabeceras.map((c, i) => celda(
      [new Paragraph({ children: [texto(c, { bold: true, color: "FFFFFF", size: 20 })] })], anchos[i],
      { shading: { fill: OSCURO, type: ShadingType.CLEAR, color: "auto" }, verticalAlign: VerticalAlign.CENTER })),
  });
  const cuerpo = filas.map((fila) => new TableRow({
    height: { value: alto, rule: HeightRule.ATLEAST },
    children: fila.map((c, i) => {
      const fija = typeof c === "object"; // { fija: "..." }: texto de la plantilla, en blanco y negrita
      return celda(
        [fija ? new Paragraph({ children: [texto(c.fija, { bold: true, size: 20 })] }) : pista(c)], anchos[i],
        fija ? {} : { shading: { fill: AMBAR_CLARO, type: ShadingType.CLEAR, color: "auto" } });
    }),
  }));
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: anchos, rows: [cab, ...cuerpo] });
}

function datosPareja() {
  return tabla(["Pareja", "Caso"], [4819, 4819], [["Nombres", "Caso elegido en el bloque 2"]], 400);
}

// Prompt para proyectar o copiar, en el recuadro verde azulado de la IA.
function prompt(etiqueta, lineas) {
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({
      children: [celda([
        new Paragraph({ spacing: { after: 80 }, children: [texto(etiqueta, { bold: true, color: VERDE, size: 20 })] }),
        ...lineas.map((l) => new Paragraph({ children: [new TextRun({ text: l, font: "Consolas", size: 18 })] })),
      ], ANCHO, {
        shading: { fill: VERDE_CLARO, type: ShadingType.CLEAR, color: "auto" },
        borders: { top: fino, bottom: fino, right: fino, left: { style: BorderStyle.SINGLE, size: 24, color: VERDE } },
      })],
    })],
  });
}

function casilla(t) {
  return new Paragraph({ spacing: { after: 80 }, indent: { left: 360, hanging: 360 }, children: [texto("☐\t" + t)] });
}

const espacio = () => new Paragraph({ spacing: { after: 0 }, children: [] });
const saltoPagina = () => new Paragraph({ children: [new PageBreak()] });

function documento(cuerpo, cabecera) {
  return new Document({
    creator: "Taller de creatividad con herramientas ofimáticas e IA",
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [texto(cabecera, { color: GRIS, size: 16 })] })] }) },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              texto("Simulación formativa: sin datos personales ni confidenciales, y sin cifras ni resultados inventados.", { color: GRIS, size: 16 }),
              texto("\t", { size: 16 }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: GRIS }),
            ],
            tabStops: [{ type: "right", position: ANCHO }],
          })],
        }),
      },
      children: cuerpo,
    }],
  });
}

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

(async () => {
  for (const [nombre, doc] of [["ficha_expres.docx", ficha], ["documento_proyecto.docx", proyecto]]) {
    const salida = path.join(CARPETA, nombre);
    if (fs.existsSync(salida)) {
      console.error(`${salida} ya existe: no se sobrescribe. Pasa otra carpeta como argumento.`);
      process.exitCode = 1;
      continue;
    }
    fs.writeFileSync(salida, await Packer.toBuffer(doc()));
    console.log(`Guardado ${salida}`);
  }
})();
