// Diapositivas del prólogo del curso: qué vamos a hacer y por qué.
// Uso: node prologo.js  →  genera prologo.pptx (solo si no existe todavía).

const { FaLightbulb, FaFilter, FaBalanceScale, FaFileAlt, FaBullhorn, FaBrain, FaBriefcase } = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ titulo: "Prólogo: qué vamos a hacer y por qué", pie: "Prólogo · Qué vamos a hacer y por qué" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });

  pres.addSection({ title: "Prólogo" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Prólogo" });
    await iconoEnCirculo(s, { x: M + 0.2, y: 2.3, d: 2.2, Icon: FaLightbulb, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Prólogo" });
    s.addText("Qué vamos a hacer y por qué", { placeholder: "title" });
    s.addText("Prólogo", { placeholder: "body" });
    s.addNotes("Antes del bloque 1: explicar a nivel general qué se va a hacer durante el curso y para qué.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Prólogo" });
    s.addText("Qué vamos a hacer", { placeholder: "title" });
    const pasos = [
      [FaLightbulb, "Generar muchas ideas", "Brainstorming, SCAMPER y provocación"],
      [FaFilter, "Seleccionar", "Nos quedamos con las tres que realmente interesan"],
      [FaBalanceScale, "Comparar y elegir", "Una matriz de decisión para elegir la ganadora"],
      [FaFileAlt, "Documentar y desarrollar", "La propuesta ganadora, por escrito"],
      [FaBullhorn, "Presentar y defender", "Ante el grupo"],
    ];
    const gap = 0.35;
    const w = (W - 2 * M - 4 * gap) / 5;
    for (const [i, [Icon, t, d]] of pasos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.8, w, 3.9);
      s.addText(String(i + 1), { ...T, x: x + w - 0.6, y: 1.9, w: 0.45, h: 0.5, fontSize: 22, bold: true, color: C.accent5, align: "right", margin: 0 });
      await iconoEnCirculo(s, { x: x + 0.3, y: 2.1, d: 0.95, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.3, y: 3.25, w: w - 0.6, h: 0.9, fontSize: 19, bold: true, color: C.text1, valign: "top", margin: 0 });
      s.addText(d, { ...T, x: x + 0.3, y: 4.2, w: w - 0.6, h: 1.3, fontSize: 15, color: C.text2, valign: "top", margin: 0 });
      if (i < 4) linea(s, x + w + 0.04, 3.75, x + w + gap - 0.04, 3.75, { color: HEX.dk2, width: 2.5, endArrowType: "triangle" });
    }
    s.addNotes("Contar el recorrido del curso a nivel muy general: generar muchas ideas con brainstorming, SCAMPER y provocación; seleccionar las que realmente interesan y quedarnos con tres; compararlas con una matriz y elegir la ganadora; documentarla y desarrollarla; presentarla y defenderla.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Prólogo" });
    s.addText("El objetivo", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "Aprender a modelizar un proceso de innovación —ideación, selección y decisión— de una manera estructurada,", options: { breakLine: true } },
      { text: "para poder presentarlo.", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("El objeto del curso: enseñar cómo modelizar un proceso de innovación, con ideación, selección y decisión, de una manera más estructurada para poder presentarlo.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Prólogo" });
    s.addText("¿Por qué hacerlo así?", { placeholder: "title" });
    const gap = 0.5;
    const w = (W - 2 * M - gap) / 2;
    const cols = [
      [FaBrain, C.text2, "Cuando lo hacéis vosotros", "No escribís una sola línea: lo hacéis todo en la cabeza, en menos de un minuto. Veis las opciones y elegís."],
      [FaBriefcase, C.accent1, "En un entorno profesional", "Para poder comunicarlo, hay que hacerlo de esta otra manera: visible y por pasos."],
    ];
    for (const [i, [Icon, relleno, t, d]] of cols.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.7, w, 3.6);
      await iconoEnCirculo(s, { x: x + 0.4, y: 2.0, d: 1.2, Icon, relleno, iconoHex: i ? HEX.dk1 : HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 1.85, y: 2.0, w: w - 2.15, h: 1.2, fontSize: 24, bold: true, color: C.text1, valign: "middle", margin: 0 });
      s.addText(d, { ...T, x: x + 0.4, y: 3.45, w: w - 0.8, h: 1.7, fontSize: 20, color: C.text1, valign: "top", margin: 0 });
    }
    linea(s, M + w + 0.06, 3.5, M + w + gap - 0.06, 3.5, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    s.addText("Hay muchas maneras de hacerlo. Esta es una de ellas.", { ...T, x: M, y: 5.7, w: W - 2 * M, h: 0.6, fontSize: 22, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Normalmente, cuando hacemos este proceso nosotros mismos, no escribimos una sola línea y lo hacemos todo en la cabeza, en menos de un minuto: vemos las opciones y elegimos. Pero para poder comunicarlo en un entorno más profesional hay que hacerlo de esta otra manera. Hay muchas; esta sería una de ellas.");
  }

  const destino = await guardar(pres, "prologo.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
