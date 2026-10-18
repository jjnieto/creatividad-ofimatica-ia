// Diapositivas del bloque 4: desarrollo de la propuesta ganadora (minutos 165–240).
// Uso: node bloque4.js  →  genera bloque4.pptx (solo si no existe todavía).

const {
  FaUsers, FaRobot, FaExchangeAlt, FaComments, FaCoins, FaUserTie, FaUserSlash, FaChartLine, FaFileWord,
  FaUserCheck, FaUserSecret, FaQuestionCircle, FaRuler, FaClipboardList, FaCheckSquare, FaHeading, FaAlignLeft,
  FaChartBar, FaBan, FaTable, FaFileAlt, FaDesktop, FaCut, FaPlus, FaExclamationTriangle,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 4, tituloBloque: "Desarrollo de la propuesta ganadora" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });

  const cajaPrompt = (s, lineas, { x, y, w, h, fontSize = 14 }) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Prompt" });
    const runs = [];
    let dentro = false;
    lineas.forEach((l, i) => {
      const trozos = l === "" ? [" "] : l.split(/(\[|\])/).filter((t) => t !== "");
      const piezas = [];
      for (const t of trozos) {
        if (t === "[") { dentro = true; piezas.push({ t, marca: true }); continue; }
        if (t === "]") { piezas.push({ t, marca: true }); dentro = false; continue; }
        piezas.push({ t, marca: dentro });
      }
      piezas.forEach((p, j) => runs.push({ text: p.t, options: { color: p.marca ? C.accent1 : C.background1, bold: p.marca, breakLine: j === piezas.length - 1 && i < lineas.length - 1 } }));
    });
    s.addText(runs, { ...T, x: x + 0.3, y: y + 0.2, w: w - 0.6, h: h - 0.4, fontSize, fontFace: "Courier New", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
  };

  const hueco = (s, x, y, w, h) =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });

  // ── Portada y recorrido ─────────────────────────────────────────────────
  pres.addSection({ title: "Bloque 4" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Bloque 4" });
    s.addText("4", { ...T, x: M, y: 1.9, w: 2.4, h: 3.0, fontSize: 200, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText("Desarrollo de la propuesta ganadora", { placeholder: "title" });
    s.addText("75 minutos · por parejas", { placeholder: "body" });
    s.addNotes("Objetivo del bloque: convertir la propuesta ganadora de cada pareja en un proyecto defendible: bien explicado, con sus riesgos, con una forma de medir si funciona y con una presentación breve.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 4" });
    s.addText("Qué vamos a hacer en este bloque", { placeholder: "title" });
    const pasos = [
      ["165–175", "Preguntas difíciles", "personas"],
      ["175–195", "Documento del proyecto", "personas"],
      ["195–210", "¿Cómo sabremos si funciona?", "ia"],
      ["210–235", "Presentación en tres diapositivas", "personas"],
      ["235–240", "Revisión cruzada", "personas"],
    ];
    const ancho = (W - 2 * M) / pasos.length;
    const d = 1.35;
    const yc = 2.6;
    linea(s, M + ancho / 2, yc, W - M - ancho / 2, yc, { color: HEX.lt2, width: 4 });
    pasos.forEach(([min, txt, tipo], i) => {
      const cx = M + ancho * i + ancho / 2;
      const relleno = { personas: C.accent1, ia: C.accent2, neutro: C.text2 }[tipo];
      const color = tipo === "personas" ? C.text1 : C.background1;
      s.addShape("ellipse", { x: cx - d / 2, y: yc - d / 2, w: d, h: d, fill: { color: relleno }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(min, { ...T, x: cx - d / 2, y: yc - d / 2, w: d, h: d, fontSize: 17, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: cx - ancho / 2 + 0.1, y: yc + d / 2 + 0.25, w: ancho - 0.2, h: 1.0, fontSize: 17, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    tarjeta(s, M, 5.1, W - 2 * M, 1.1);
    s.addText([{ text: "Sin caso nuevo: ", options: { bold: true } }, { text: "cada pareja sigue con su propuesta ganadora del bloque 3 y su ficha exprés." }],
      { ...T, x: M + 0.35, y: 5.1, w: W - 2 * M - 0.7, h: 1.1, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Continuidad: cada pareja trabaja sobre su propia propuesta ganadora del bloque 3 y su ficha exprés. Al final del bloque tendrá su matriz, su documento y su presentación, listos para defenderlos en el bloque 5.");
  }

  // ── Preguntas difíciles ─────────────────────────────────────────────────
  pres.addSection({ title: "Preguntas difíciles" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Preguntas difíciles" });
    s.addText("Antes de seguir, ponedla a prueba", { placeholder: "title" });
    etiqueta(s, C, "Min. 165–175 · Parejas", "personas");
    s.addText("Juntaos con otra pareja:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const pasos = [
      [FaUsers, "La pareja A explica su propuesta en 1 minuto, con la ficha exprés delante."],
      [FaComments, "La pareja B le hace dos preguntas difíciles."],
      [FaExchangeAlt, "Os cambiáis los papeles."],
    ];
    const gap = 0.55;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, t]] of pasos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.1, w, 2.0);
      await iconoEnCirculo(s, { x: x + 0.3, y: 2.35, d: 0.85, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: `Paso ${i + 1}` });
      s.addText(t, { ...T, x: x + 1.35, y: 2.1, w: w - 1.55, h: 2.0, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
      if (i < 2) linea(s, x + w + 0.08, 3.1, x + w + gap - 0.08, 3.1, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    }
    s.addText("Preguntas difíciles, por ejemplo:", { ...T, x: M, y: 4.4, w: W - 2 * M, h: 0.45, fontSize: 18, bold: true, color: C.text1, margin: 0 });
    const preguntas = [[FaCoins, "¿Cuánto cuesta?"], [FaUserTie, "¿Quién se encarga?"], [FaUserSlash, "¿Y si alguien no lo usa?"], [FaChartLine, "¿Cómo sabremos si funciona?"]];
    const wq = (W - 2 * M - 3 * 0.3) / 4;
    for (const [i, [Icon, t]] of preguntas.entries()) {
      const x = M + i * (wq + 0.3);
      s.addShape("roundRect", { x, y: 5.0, w: wq, h: 0.95, rectRadius: 0.47, fill: { color: C.text1 }, line: { type: "none" }, objectName: t });
      await iconoEnCirculo(s, { x: x + 0.15, y: 5.12, d: 0.7, Icon, relleno: C.accent3, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 1.0, y: 5.0, w: wq - 1.15, h: 0.95, fontSize: 16, bold: true, color: C.background1, valign: "middle", margin: 0 });
    }
    s.addNotes("Minutos 165–175. Antes de desarrollar el proyecto, hay que ponerlo a prueba. Las parejas se juntan de dos en dos; la pareja A explica su propuesta en un minuto y la pareja B le hace dos preguntas difíciles. Después se cambian los papeles. Recordad cuál es vuestra pareja: volveréis a juntaros con ella en la revisión cruzada del final.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Preguntas difíciles" });
    s.addText("Lo que no supisteis responder", { placeholder: "title" });
    etiqueta(s, C, "Min. 165–175 · Parejas", "personas");
    s.addText("Apuntad las preguntas que no habéis sabido contestar:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    [0, 1].forEach((i) => {
      const y = 2.15 + i * 1.45;
      s.addShape("ellipse", { x: M, y: y + 0.3, w: 0.65, h: 0.65, fill: { color: C.accent3 }, line: { type: "none" }, objectName: `Pregunta ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: M, y: y + 0.3, w: 0.65, h: 0.65, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
      hueco(s, M + 0.95, y, W - 2 * M - 0.95, 1.25);
    });
    await iconoEnCirculo(s, { x: M, y: 5.25, d: 0.85, Icon: FaFileWord, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Documento" });
    s.addText("Es lo primero que tiene que resolver vuestro documento.", { ...T, x: M + 1.15, y: 5.25, w: W - 2 * M - 1.15, h: 0.85, fontSize: 22, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Cada pareja apunta las preguntas que no ha sabido responder: son lo primero que tiene que resolver el documento del proyecto.");
  }

  // ── Documento del proyecto ──────────────────────────────────────────────
  pres.addSection({ title: "Documento" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documento" });
    s.addText("Documento del proyecto", { placeholder: "title" });
    etiqueta(s, C, "Min. 175–195 · Parejas", "personas");
    s.addText("En Word o Google Docs, ampliad la ficha exprés hasta un máximo de dos páginas:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const apartados = ["Nombre de la propuesta", "Problema concreto", "Funcionamiento de la solución", "Herramientas ofimáticas y de IA", "Beneficios esperados", "Riesgos y medidas preventivas", "Tres pasos para ponerla en práctica"];
    const gap = 0.3;
    const w = (W - 2 * M - gap) / 2;
    apartados.forEach((t, i) => {
      const col = i < 4 ? 0 : 1;
      const fila = i < 4 ? i : i - 4;
      const x = M + col * (w + gap);
      const y = 2.15 + fila * 0.78;
      tarjeta(s, x, y, w, 0.64);
      s.addShape("ellipse", { x: x + 0.15, y: y + 0.1, w: 0.44, h: 0.44, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Apartado ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: x + 0.15, y: y + 0.1, w: 0.44, h: 0.44, fontSize: 15, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(t, { ...T, x: x + 0.8, y, w: w - 1.0, h: 0.64, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    });
    // Revisión de lo que redacte la IA
    const xr = M + w + gap, yr = 2.15 + 3 * 0.78;
    s.addShape("roundRect", { x: xr, y: yr, w, h: 0.64, rectRadius: 0.15, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Revisión" });
    s.addText("La IA ayuda a redactar; vosotros revisáis:", { ...T, x: xr + 0.25, y: yr, w: w - 0.5, h: 0.64, fontSize: 16, bold: true, color: C.background1, valign: "middle", margin: 0 });
    const marcas = [[FaCut, "¿Qué sobra?"], [FaPlus, "¿Qué falta?"], [FaExclamationTriangle, "¿Qué no es cierto?"]];
    const wm = (W - 2 * M - 2 * 0.3) / 3;
    for (const [i, [Icon, t]] of marcas.entries()) {
      const x = M + i * (wm + 0.3);
      await iconoEnCirculo(s, { x, y: 5.45, d: 0.7, Icon, relleno: C.accent2, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 0.9, y: 5.45, w: wm - 1.0, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addNotes("Minutos 175–195. Ampliar la ficha exprés hasta un máximo de dos páginas con los siete apartados. La IA puede ayudar a redactar, pero cada apartado lo revisa la pareja con el mismo criterio de la ficha exprés: qué sobra, qué falta y qué no es cierto.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documento" });
    s.addText("Mientras redactáis, preguntaos…", { placeholder: "title" });
    etiqueta(s, C, "Min. 175–195 · Parejas", "personas");
    const preguntas = [
      [FaQuestionCircle, "¿Habéis respondido a las preguntas que no supisteis contestar en el intercambio?"],
      [FaUserCheck, "¿Qué actividades requieren supervisión humana?"],
      [FaUserSecret, "¿Qué datos no deberíamos introducir en una IA pública?"],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, t]] of preguntas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.7, w, 4.1);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.65, y: 2.1, d: 1.3, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Pregunta" });
      s.addText(t, { ...T, x: x + 0.35, y: 3.7, w: w - 0.7, h: 1.9, fontSize: 21, color: C.text1, align: "center", valign: "top", margin: 0 });
    }
    s.addNotes("Preguntas de acompañamiento docente mientras las parejas redactan. Pasar por las mesas.");
  }

  // ── ¿Cómo sabremos si funciona? ─────────────────────────────────────────
  pres.addSection({ title: "Indicadores" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Indicadores" });
    s.addText("¿Cómo sabremos si funciona?", { placeholder: "title" });
    etiqueta(s, C, "Min. 195–210 · Parejas", "personas");
    s.addText("Dos indicadores medibles, y cómo se recogerían los datos antes y después de una prueba de un mes. Por ejemplo:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 19, color: C.text2, margin: 0 });
    const pasos = [
      [FaRuler, "Qué medimos", "Consultas que se quedan sin respuesta cada semana."],
      [FaClipboardList, "Antes", "Contarlas durante una semana, antes de empezar la prueba."],
      [FaFileAlt, "Durante un mes", "Se prueba la propuesta."],
      [FaChartBar, "Después", "Volver a contarlas al final y comparar."],
    ];
    const gap = 0.45;
    const w = (W - 2 * M - 3 * gap) / 4;
    for (const [i, [Icon, t, d]] of pasos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.3, w, 2.7);
      await iconoEnCirculo(s, { x: x + 0.3, y: 2.55, d: 0.85, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.3, y: 3.5, w: w - 0.6, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0 });
      s.addText(d, { ...T, x: x + 0.3, y: 4.0, w: w - 0.6, h: 0.95, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
      if (i < 3) linea(s, x + w + 0.06, 3.65, x + w + gap - 0.06, 3.65, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    }
    tarjeta(s, M, 5.35, W - 2 * M, 1.05);
    await iconoEnCirculo(s, { x: M + 0.3, y: 5.5, d: 0.75, Icon: FaBan, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Sin inventar" });
    s.addText([{ text: "No inventamos resultados: ", options: { bold: true } }, { text: "explicamos cómo se mediría, no lo que se conseguirá." }],
      { ...T, x: M + 1.3, y: 5.35, w: W - 2 * M - 1.6, h: 1.05, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 195–210. No hay que esperar un mes ni simular nada: las parejas solo diseñan cómo se comprobaría que la propuesta funciona si alguien decidiera probarla. Es un plan de medición, no una medición. Otros ejemplos de indicadores: tiempo de tramitación, pedidos servidos tarde o plazas sin cubrir.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Indicadores" });
    s.addText("Primero vosotros, después la IA", { placeholder: "title" });
    etiqueta(s, C, "Min. 195–210 · Con IA", "ia");
    s.addText("Pensad vuestros indicadores. Después, podéis pedir ideas a la IA:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    cajaPrompt(s, [
      "Esta es nuestra propuesta: [resumen sin datos personales].",
      "Propón cinco indicadores medibles para comprobar si funciona durante",
      "una prueba de un mes. Para cada uno, explica cómo medirlo antes y",
      "después de la prueba con herramientas sencillas. No inventes",
      "resultados ni cifras de mejora.",
    ], { x: M, y: 2.15, w: W - 2 * M, h: 2.15, fontSize: 18 });
    tarjeta(s, M, 4.65, W - 2 * M, 1.5);
    await iconoEnCirculo(s, { x: M + 0.35, y: 4.95, d: 0.9, Icon: FaCheckSquare, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Elegir" });
    s.addText("Elegid los dos indicadores que mejor demuestren si vuestra propuesta resuelve el problema, y añadidlos al documento.",
      { ...T, x: M + 1.55, y: 4.65, w: W - 2 * M - 1.85, h: 1.5, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("El prompt está en el guion para copiarlo. La IA propone; la pareja elige los dos indicadores y decide cómo medirlos.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Indicadores" });
    s.addText("Nuestros dos indicadores", { placeholder: "title" });
    etiqueta(s, C, "Min. 195–210 · Parejas", "personas");
    const cab = (t, relleno, color) => ({ text: t, options: { bold: true, fill: { color: relleno }, color, align: "center" } });
    const vacia = (t = "") => ({ text: t, options: { color: C.text1, bold: true, align: "center" } });
    s.addTable([
      [cab("", C.background1, C.text1), cab("Qué medimos", C.text1, C.background1), cab("Cómo lo medimos", C.text1, C.background1), cab("Antes de la prueba", C.accent1, C.text1), cab("Después de la prueba", C.accent2, C.background1)],
      [vacia("1"), vacia(), vacia(), vacia(), vacia()],
      [vacia("2"), vacia(), vacia(), vacia(), vacia()],
    ], { x: M, y: 1.6, w: W - 2 * M, colW: [0.7, 3.2, 3.2, 2.5, 2.533], rowH: [0.6, 1.5, 1.5], fontSize: 18, valign: "middle", border: { type: "solid", pt: 1, color: HEX.accent5 }, margin: 0.1 });
    s.addText("En las columnas «Antes» y «Después» va cuándo y cómo se recogerían los datos, no los resultados.", { ...T, x: M, y: 5.5, w: W - 2 * M, h: 0.6, fontSize: 18, italic: true, color: C.accent3, margin: 0 });
    s.addNotes("Plantilla para que cada pareja ordene sus dos indicadores antes de pasarlos al documento.");
  }

  // ── Presentación ────────────────────────────────────────────────────────
  pres.addSection({ title: "Presentación" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Presentación" });
    s.addText("Presentación en tres diapositivas", { placeholder: "title" });
    etiqueta(s, C, "Min. 210–235 · Parejas", "personas");
    s.addText("En PowerPoint o Google Slides:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const diapos = [["1", "El problema", "Situación y por qué importa."], ["2", "La solución", "Funcionamiento y herramientas."], ["3", "Los beneficios", "Resultados esperados, indicadores y principales precauciones."]];
    const gap = 0.5;
    const w = (W - 2 * M - 2 * gap) / 3;
    const h = w * 9 / 16;
    diapos.forEach(([n, t, d], i) => {
      const x = M + i * (w + gap);
      s.addShape("rect", { x, y: 2.1, w, h, fill: { color: C.text1 }, line: { type: "none" }, shadow: { type: "outer", color: "8A94A6", opacity: 0.35, blur: 8, offset: 3, angle: 90 }, objectName: `Diapositiva ${n}` });
      s.addText([{ text: n, options: { fontSize: 40, bold: true, color: C.accent1, breakLine: true } }, { text: t, options: { fontSize: 24, bold: true } }],
        { ...T, x: x + 0.3, y: 2.1, w: w - 0.6, h, color: C.background1, valign: "middle", margin: 0 });
      s.addText(d, { ...T, x, y: 2.25 + h, w, h: 1.0, fontSize: 17, color: C.text1, valign: "top", margin: 0 });
    });
    s.addNotes("Minutos 210–235. Tres diapositivas, cada una con una idea central. La tercera incluye los dos indicadores definidos antes.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Presentación" });
    s.addText("Criterios para vuestras diapositivas", { placeholder: "title" });
    etiqueta(s, C, "Min. 210–235 · Parejas", "personas");
    const criterios = [
      [FaDesktop, "Una idea central por diapositiva."],
      [FaAlignLeft, "Poco texto."],
      [FaHeading, "Títulos claros."],
      [FaChartBar, "Gráficos simples."],
      [FaBan, "Ningún resultado sin justificar."],
    ];
    for (const [i, [Icon, t]] of criterios.entries()) {
      const y = 1.65 + i * 0.95;
      await iconoEnCirculo(s, { x: M, y, d: 0.75, Icon, relleno: i === 4 ? C.accent3 : C.text2, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: M + 1.0, y, w: 11, h: 0.75, fontSize: 22, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addNotes("Criterios de la presentación. Son los mismos que se comprobarán en la revisión cruzada.");
  }

  // ── Revisión cruzada ────────────────────────────────────────────────────
  pres.addSection({ title: "Revisión cruzada" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Revisión cruzada" });
    s.addText("Revisión cruzada", { placeholder: "title" });
    etiqueta(s, C, "Min. 235–240 · Parejas", "personas");
    s.addText("Intercambiad la presentación con la pareja del principio del bloque y comprobad:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const checks = ["¿Una idea por diapositiva?", "¿Poco texto?", "¿Alguna cifra sin justificar?"];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, t] of checks.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.15, w, 1.6);
      await iconoEnCirculo(s, { x: x + 0.3, y: 2.55, d: 0.8, Icon: FaCheckSquare, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 1.3, y: 2.15, w: w - 1.5, h: 1.6, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addText("Una mejora concreta para la otra pareja:", { ...T, x: M, y: 4.1, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    hueco(s, M, 4.7, W - 2 * M, 1.4);
    s.addNotes("Minutos 235–240. Cada pareja devuelve a la otra una mejora concreta.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Revisión cruzada" });
    s.addText("Lo que tenéis al terminar", { placeholder: "title" });
    const entregables = [[FaTable, "Matriz de decisión", "Bloque 3"], [FaFileWord, "Documento del proyecto", "Bloque 4"], [FaDesktop, "Presentación", "Bloque 4"]];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, t, b]] of entregables.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.7, w, 3.6);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.75, y: 2.1, d: 1.5, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText([{ text: t, options: { bold: true, fontSize: 24, breakLine: true } }, { text: b, options: { fontSize: 17, color: C.text2 } }],
        { ...T, x: x + 0.3, y: 3.85, w: w - 0.6, h: 1.25, color: C.text1, align: "center", valign: "top", margin: 0 });
    }
    s.addText("Listos para defender vuestra propuesta en el bloque 5.", { ...T, x: M, y: 5.7, w: W - 2 * M, h: 0.6, fontSize: 22, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Entregables del taller: matriz de decisión (bloque 3), documento del proyecto y presentación. Enlazar con el bloque 5: la defensa.");
  }

  const destino = await guardar(pres, "bloque4.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
