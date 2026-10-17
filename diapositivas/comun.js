// Tema, layouts y piezas comunes a las presentaciones de todos los bloques.
// Código de color del curso: ámbar = trabajo de las personas, verde azulado = IA.

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");

const THEME = {
  name: "Creatividad, ofimática e IA",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F2A44", // tinta: texto y fondos oscuros
    lt1: "FFFFFF",
    dk2: "3A4664",
    lt2: "F2F4F8", // tarjetas
    accent1: "F4A300", // ámbar: personas
    accent2: "0F7C70", // verde azulado: IA
    accent3: "D64933", // coral: innovación, avisos
    accent4: "6C5CE7", // violeta: competencia digital
    accent5: "8A94A6", // gris: textos secundarios
    accent6: "2D6A4F",
    hlink: "0F7C70",
    folHlink: "6C5CE7",
  },
};
const HEX = THEME.colors;

const W = 13.333;
const H = 7.5;
const M = 0.6;

const cacheIconos = new Map();
async function icono(Icon, hex, size = 256) {
  const clave = `${Icon.name}-${hex}`;
  if (!cacheIconos.has(clave)) {
    const svg = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Icon, { color: "#" + hex, size: String(size) })
    );
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    cacheIconos.set(clave, "image/png;base64," + png.toString("base64"));
  }
  return cacheIconos.get(clave);
}

function crearPresentacion({ bloque, tituloBloque, pie: pieFijo, titulo }) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = titulo || `Bloque ${bloque}. ${tituloBloque}`;
  pres.subject = "Desarrollo de las habilidades creativas e innovadoras con herramientas ofimáticas y de inteligencia artificial";
  const C = pres.SchemeColor;
  const pie = pieFijo || `Bloque ${bloque} · ${tituloBloque}`;

  pres.defineSlideMaster({
    title: "PORTADA",
    background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 1.9, w: 8.4, h: 2.0, fontSize: 44, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: M, y: 4.15, w: 8.4, h: 1.5, fontSize: 20, color: C.accent1, valign: "top", margin: 0 }, text: "" } },
    ],
  });

  pres.defineSlideMaster({
    title: "SECCION",
    background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 3.4, y: 2.3, w: 9.3, h: 1.6, fontSize: 40, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 3.4, y: 4.1, w: 9.3, h: 0.8, fontSize: 22, color: C.accent1, valign: "top", margin: 0 }, text: "" } },
    ],
  });

  pres.defineSlideMaster({
    title: "CONTENIDO",
    background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.45, w: W - 2 * M, h: 0.85, fontSize: 32, bold: true, color: C.text1, align: "left", valign: "middle", margin: 0 }, text: "" } },
      { text: { text: pie, options: { x: M, y: 6.95, w: 9, h: 0.35, fontSize: 11, color: C.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 12.13, y: 6.95, w: 0.6, h: 0.35, fontSize: 11, color: HEX.accent5, align: "right" },
  });

  pres.defineSlideMaster({
    title: "DESTACADO",
    background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "body", type: "body", x: 1.2, y: 1.7, w: 10.9, h: 3.4, fontSize: 34, color: C.background1, valign: "middle", margin: 0 }, text: "" } },
      { text: { text: pie, options: { x: M, y: 6.95, w: 9, h: 0.35, fontSize: 11, color: C.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 12.13, y: 6.95, w: 0.6, h: 0.35, fontSize: 11, color: HEX.accent5, align: "right" },
  });

  return { pres, C };
}

// Etiqueta de la esquina superior derecha: minutos del guion y modalidad.
// tipo: "personas" (ámbar), "ia" (verde azulado) o "neutro".
function etiqueta(slide, C, texto, tipo = "neutro") {
  const relleno = { personas: C.accent1, ia: C.accent2, neutro: C.background2 }[tipo];
  const color = { personas: C.text1, ia: C.background1, neutro: C.text1 }[tipo];
  const w = Math.max(1.6, 0.115 * texto.length + 0.5);
  slide.addShape("roundRect", { x: W - M - w, y: 0.6, w, h: 0.5, rectRadius: 0.25, fill: { color: relleno }, line: { type: "none" }, objectName: "Etiqueta de tiempo" });
  slide.addText(texto, { x: W - M - w, y: 0.6, w, h: 0.5, fontSize: 14, bold: true, color, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

// Icono dentro de un círculo de color: el motivo visual del curso.
async function iconoEnCirculo(slide, { x, y, d, Icon, relleno, iconoHex, nombre = "Icono" }) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });
  const pad = d * 0.24;
  slide.addImage({ data: await icono(Icon, iconoHex), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, altText: nombre });
}

// Línea recta entre dos puntos (pptxgenjs solo dibuja líneas dentro de una caja).
function linea(slide, x1, y1, x2, y2, opciones) {
  const flipV = y2 < y1;
  slide.addShape("line", { x: x1, y: Math.min(y1, y2), w: Math.max(x2 - x1, 0.001), h: Math.abs(y2 - y1), flipV, line: opciones });
}

async function guardar(pres, nombreArchivo) {
  const { applyTheme } = require(process.env.APPLY_THEME || path.join(__dirname, "apply_theme.js"));
  // SALIDA permite generar en otra ruta (por ejemplo, si el .pptx está abierto en PowerPoint).
  const destino = process.env.SALIDA || path.join(__dirname, nombreArchivo);
  // El .pptx que ya existe puede tener ediciones hechas a mano en PowerPoint: nunca se sobrescribe.
  // Para generar una versión nueva sin tocarlo, usar SALIDA con otra ruta.
  if (require("fs").existsSync(destino)) {
    throw new Error(`${destino} ya existe y puede tener ediciones manuales: no se sobrescribe. Edita el .pptx en el sitio o genera en otra ruta con SALIDA.`);
  }
  await pres.writeFile({ fileName: destino });
  await applyTheme(destino, THEME);
  return destino;
}

module.exports = { THEME, HEX, W, H, M, crearPresentacion, etiqueta, iconoEnCirculo, icono, linea, guardar };
