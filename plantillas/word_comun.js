// Estilo y piezas comunes a las plantillas Word del alumnado.
// Código de color del curso: ámbar = trabajo de las personas, verde azulado = IA.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, HeightRule, AlignmentType, Header, Footer, PageNumber, PageBreak, VerticalAlign,
} = require("docx");

const AMBAR = "F4A300", AMBAR_CLARO = "FDEFCC";
const VERDE = "0F7C70", VERDE_CLARO = "D5ECE9";
const OSCURO = "1F2A30", GRIS = "6B7780", GRIS_CLARO = "F2F4F8", BORDE_COLOR = "BFC5C9";

const ANCHO = 9638; // A4 con márgenes de 2 cm, en DXA
const fino = { style: BorderStyle.SINGLE, size: 4, color: BORDE_COLOR };
const BORDES = { top: fino, bottom: fino, left: fino, right: fino };
const relleno = (fill) => ({ shading: { fill, type: ShadingType.CLEAR, color: "auto" } });

const texto = (t, o = {}) => new TextRun({ text: t, font: "Calibri", size: 22, ...o });
const pista = (t) => new Paragraph({ children: [texto(t, { italics: true, color: GRIS, size: 20 })] });

// Párrafo de texto corrido: una cadena o una lista de [texto, opciones] para mezclar estilos.
function parrafo(contenido, o = {}) {
  const trozos = typeof contenido === "string" ? [[contenido]] : contenido;
  return new Paragraph({ spacing: { after: 100 }, ...o, children: trozos.map(([t, op]) => texto(t, op)) });
}

// Lista numerada o de casillas con sangría francesa, sin viñetas literales.
const item = (marca, contenido) =>
  parrafo(typeof contenido === "string" ? [[marca + "\t"], [contenido]] : [[marca + "\t"], ...contenido],
    { spacing: { after: 80 }, indent: { left: 360, hanging: 360 } });
const numerada = (lineas) => lineas.map((l, i) => item(`${i + 1}.`, l));
const casilla = (t) => item("☐", t);

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
function caja(textoPista, alto, fondo = AMBAR_CLARO) {
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({
      height: { value: alto, rule: HeightRule.ATLEAST },
      children: [celda([pista(textoPista)], ANCHO, relleno(fondo))],
    })],
  });
}

// Tabla con cabecera oscura y filas para rellenar. Cada celda del cuerpo es:
//   "pista"          → para rellenar (ámbar claro), con la pista en gris ("" = vacía)
//   { ia: "pista" }  → para rellenar con lo que dice la IA (verde azulado claro)
//   { fija: "..." }  → texto de la plantilla en negrita; { nota: "..." } → texto de la plantilla normal
function tabla(cabeceras, anchos, filas, alto) {
  const cab = new TableRow({
    tableHeader: true,
    children: cabeceras.map((c, i) => celda(
      [new Paragraph({ children: [texto(c, { bold: true, color: "FFFFFF", size: 20 })] })], anchos[i],
      { ...relleno(OSCURO), verticalAlign: VerticalAlign.CENTER })),
  });
  const cuerpo = filas.map((fila) => new TableRow({
    height: { value: alto, rule: HeightRule.ATLEAST },
    children: fila.map((c, i) => {
      if (typeof c === "string") return celda([pista(c)], anchos[i], relleno(AMBAR_CLARO));
      if ("ia" in c) return celda([pista(c.ia)], anchos[i], relleno(VERDE_CLARO));
      const fija = "fija" in c;
      return celda([new Paragraph({ children: [texto(fija ? c.fija : c.nota, { bold: fija, size: 20 })] })], anchos[i]);
    }),
  }));
  return new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: anchos, rows: [cab, ...cuerpo] });
}

function datosPareja() {
  return tabla(["Pareja", "Caso"], [4819, 4819], [["Nombres", "Caso elegido en el bloque 2"]], 400);
}

// Prompt para copiar en la IA, en el recuadro verde azulado.
function prompt(etiqueta, lineas) {
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({
      children: [celda([
        new Paragraph({ spacing: { after: 80 }, children: [texto(etiqueta, { bold: true, color: VERDE, size: 20 })] }),
        ...lineas.map((l) => new Paragraph({ children: [new TextRun({ text: l, font: "Consolas", size: 18 })] })),
      ], ANCHO, {
        ...relleno(VERDE_CLARO),
        borders: { top: fino, bottom: fino, right: fino, left: { style: BorderStyle.SINGLE, size: 24, color: VERDE } },
      })],
    })],
  });
}

// Texto citado (un ejemplo o un caso para analizar), en un recuadro gris.
function cita(parrafos) {
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    rows: [new TableRow({ children: [celda(parrafos.map((p) => parrafo(p, { spacing: { after: 60 } })), ANCHO, relleno(GRIS_CLARO))] })],
  });
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

// Escribe cada documento en la carpeta, sin sobrescribir nunca uno que ya exista.
async function guardar(carpeta, documentos) {
  for (const [nombre, crear] of documentos) {
    const salida = path.join(carpeta, nombre);
    if (fs.existsSync(salida)) {
      console.error(`${salida} ya existe: no se sobrescribe. Pasa otra carpeta como argumento.`);
      process.exitCode = 1;
      continue;
    }
    fs.writeFileSync(salida, await Packer.toBuffer(crear()));
    console.log(`Guardado ${salida}`);
  }
}

module.exports = {
  AMBAR, AMBAR_CLARO, VERDE, VERDE_CLARO, OSCURO, GRIS, ANCHO,
  texto, pista, parrafo, numerada, casilla, titulo, apartado, caja, tabla, datosPareja, prompt, cita,
  espacio, saltoPagina, documento, guardar,
};
