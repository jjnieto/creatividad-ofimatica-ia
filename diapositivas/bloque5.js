// Diapositivas del bloque 5: comunicación, pensamiento crítico y aplicación profesional (minutos 240–300).
// Uso: node bloque5.js  →  genera bloque5.pptx (solo si no existe todavía).

const {
  FaUsers, FaRobot, FaTools, FaThumbsDown, FaThumbsUp, FaExclamationCircle, FaQuestion, FaLightbulb, FaWrench,
  FaChartLine, FaMicrophone, FaStopwatch, FaEye, FaStar, FaCheckCircle, FaExclamationTriangle, FaSearch,
  FaBrain, FaLaptop, FaComments, FaPen, FaUserGraduate, FaQuestionCircle,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 5, tituloBloque: "Comunicación, pensamiento crítico y aplicación profesional" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });
  const hueco = (s, x, y, w, h) =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });

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

  const columnasHueco = (s, columnas, { y = 2.25, h = 2.65 } = {}) => {
    const gap = 0.4;
    const w = (W - 2 * M - (columnas.length - 1) * gap) / columnas.length;
    columnas.forEach(([t, relleno, color], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y, w, h: 0.6, rectRadius: 0.1, fill: { color: relleno }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x: x + 0.1, y, w: w - 0.2, h: 0.6, fontSize: 18, bold: true, color, align: "center", valign: "middle", margin: 0 });
      hueco(s, x, y + 0.8, w, h);
    });
  };

  // ── Portada y recorrido ─────────────────────────────────────────────────
  pres.addSection({ title: "Bloque 5" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Bloque 5" });
    s.addText("5", { ...T, x: M, y: 1.9, w: 2.4, h: 3.0, fontSize: 200, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText("Comunicación, pensamiento crítico y aplicación profesional", { placeholder: "title" });
    s.addText("60 minutos", { placeholder: "body" });
    s.addNotes("Objetivo del bloque: defender una propuesta, aceptar críticas constructivas y traducir la experiencia en evidencias profesionales.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 5" });
    s.addText("Qué vamos a hacer en este bloque", { placeholder: "title" });
    const pasos = [
      ["240–250", "Cómo defender una idea", "personas"],
      ["250–275", "Presentaciones y comentarios", "personas"],
      ["275–285", "La IA como evaluadora crítica", "ia"],
      ["285–295", "Lo que habéis hecho, en una entrevista", "personas"],
      ["295–300", "Comprobación final", "neutro"],
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
    s.addNotes("Recorrido del bloque: cada pareja defiende su propuesta ganadora ante el grupo y ante la IA, y después se traslada lo aprendido a la búsqueda de empleo.");
  }

  // ── Cómo defender una idea ──────────────────────────────────────────────
  pres.addSection({ title: "Defender una idea" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Defender una idea" });
    s.addText("¿Cuál convence más?", { placeholder: "title" });
    etiqueta(s, C, "Min. 240–244 · Todo el grupo", "personas");
    const versiones = [
      ["Versión A", C.accent3, "«Proponemos usar formularios de Google, una hoja de cálculo compartida y un chatbot con IA. Es muy moderno, es gratis y todas las empresas lo están usando»."],
      ["Versión B", C.accent2, "«Nuestra oficina pierde consultas porque llegan por teléfono y por correo y nadie se encarga de ellas. Proponemos un formulario único que guarde cada consulta en una hoja compartida, con una persona responsable cada día. Lo probaríamos un mes y mediríamos cuántas consultas quedan sin respuesta»."],
    ];
    const gap = 0.45;
    const w = (W - 2 * M - gap) / 2;
    versiones.forEach(([t, relleno, txt], i) => {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.65, w, 4.35);
      s.addShape("roundRect", { x: x + 0.35, y: 1.95, w: 2.2, h: 0.6, rectRadius: 0.3, fill: { color: relleno }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x: x + 0.35, y: 1.95, w: 2.2, h: 0.6, fontSize: 18, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: x + 0.35, y: 2.8, w: w - 0.7, h: 3.0, fontSize: 19, italic: true, color: C.text1, valign: "top", margin: 0 });
    });
    s.addText("¿Cuál aprobaríais? ¿Por qué?", { ...T, x: M, y: 6.2, w: W - 2 * M, h: 0.5, fontSize: 20, bold: true, color: C.text1, margin: 0 });
    s.addNotes("Minutos 240–244. Leer las dos versiones de la misma propuesta y preguntar al grupo cuál aprobaría y por qué.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Defender una idea" });
    s.addText("La estructura de una buena defensa", { placeholder: "title" });
    etiqueta(s, C, "Min. 240–244");
    const comparacion = [
      [FaThumbsDown, C.accent3, "La A habla de herramientas y hace afirmaciones sin justificar."],
      [FaThumbsUp, C.accent2, "La B parte del problema, explica la solución y dice cómo se medirá."],
    ];
    const gap = 0.45;
    const wc = (W - 2 * M - gap) / 2;
    for (const [i, [Icon, relleno, t]] of comparacion.entries()) {
      const x = M + i * (wc + gap);
      tarjeta(s, x, 1.6, wc, 1.15);
      await iconoEnCirculo(s, { x: x + 0.25, y: 1.8, d: 0.75, Icon, relleno, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 1.2, y: 1.6, w: wc - 1.4, h: 1.15, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    }
    const pasos = [
      [FaExclamationCircle, "¿Qué problema hemos identificado?"],
      [FaQuestion, "¿Por qué conviene resolverlo?"],
      [FaLightbulb, "¿Qué proponemos?"],
      [FaWrench, "¿Cómo lo pondríamos en práctica?"],
      [FaChartLine, "¿Qué resultados esperaríamos y cómo los mediríamos?"],
    ];
    const w = (W - 2 * M) / 5;
    for (const [i, [Icon, t]] of pasos.entries()) {
      const x = M + i * w;
      s.addShape("chevron", { x: x + 0.04, y: 3.15, w: w - 0.08, h: 1.15, fill: { color: i % 2 ? C.text2 : C.text1 }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: x + 0.3, y: 3.15, w: w - 0.6, h: 1.15, fontSize: 30, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0 });
      await iconoEnCirculo(s, { x: x + w / 2 - 0.4, y: 4.5, d: 0.8, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.1, y: 5.45, w: w - 0.2, h: 1.1, fontSize: 16, bold: true, color: C.text1, align: "center", valign: "top", margin: 0 });
    }
    s.addNotes("La versión A habla de herramientas y hace afirmaciones sin justificar; la B parte del problema, explica la solución y dice cómo se medirá. De ahí sale la estructura de la defensa.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Defender una idea" });
    s.addText("Ensayo: el problema en 20 segundos", { placeholder: "title" });
    etiqueta(s, C, "Min. 244–250 · Parejas", "personas");
    s.addText("Preparad y ensayad en voz baja la primera frase de vuestra presentación, siguiendo la versión B como modelo:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 19, color: C.text2, margin: 0 });
    tarjeta(s, M, 2.3, W - 2 * M, 1.2);
    await iconoEnCirculo(s, { x: M + 0.3, y: 2.5, d: 0.8, Icon: FaMicrophone, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "Modelo" });
    s.addText("«Nuestra oficina pierde consultas porque llegan por teléfono y por correo y nadie se encarga de ellas…»", { ...T, x: M + 1.35, y: 2.3, w: W - 2 * M - 1.65, h: 1.2, fontSize: 19, italic: true, color: C.text1, valign: "middle", margin: 0 });
    s.addText("Nuestra primera frase:", { ...T, x: M, y: 3.85, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    hueco(s, M, 4.45, W - 2 * M, 1.8);
    s.addNotes("Minutos 244–250. Cada pareja prepara y ensaya en voz baja la primera frase de su presentación: el problema en 20 segundos.");
  }

  // ── Presentaciones ──────────────────────────────────────────────────────
  pres.addSection({ title: "Presentaciones" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Presentaciones" });
    s.addText("Presentaciones", { placeholder: "title" });
    etiqueta(s, C, "Min. 250–275 · Parejas", "personas");
    s.addText("Cada pareja presenta su propuesta:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const tiempos = [["2", "minutos de presentación", C.accent1, C.text1], ["1", "minuto de preguntas", C.text2, C.background1]];
    const gap = 0.5;
    const w = (W - 2 * M - gap) / 2;
    for (const [i, [n, t, relleno, color]] of tiempos.entries()) {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y: 2.2, w, h: 2.6, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: t });
      s.addText([{ text: n, options: { fontSize: 96, bold: true, breakLine: true } }, { text: t, options: { fontSize: 24, bold: true } }], { ...T, x, y: 2.2, w, h: 2.6, color, align: "center", valign: "middle", margin: 0 });
    }
    await iconoEnCirculo(s, { x: M, y: 5.25, d: 0.8, Icon: FaStopwatch, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Tiempo" });
    s.addText("El tiempo se cumple: con ocho parejas, no hay margen.", { ...T, x: M + 1.05, y: 5.25, w: W - 2 * M - 1.05, h: 0.8, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 250–275. Con 16 personas organizadas en ocho parejas, reservar alrededor de dos minutos de presentación y uno de preguntas por equipo. Con grupos más numerosos, organizar mesas paralelas de evaluación.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Presentaciones" });
    s.addText("Mientras tanto, los observadores", { placeholder: "title" });
    etiqueta(s, C, "Min. 250–275 · Todo el grupo", "personas");
    s.addText("Comentad cada presentación según:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const criterios = [[FaEye, "Claridad"], [FaStar, "Originalidad"], [FaCheckCircle, "Viabilidad"], [FaExclamationTriangle, "Posibles riesgos"]];
    const gap = 0.35;
    const w = (W - 2 * M - 3 * gap) / 4;
    for (const [i, [Icon, t]] of criterios.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.15, w, 2.4);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.6, y: 2.4, d: 1.2, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 0.2, y: 3.75, w: w - 0.4, h: 0.6, fontSize: 21, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
    }
    tarjeta(s, M, 4.9, W - 2 * M, 1.2, C.accent1);
    await iconoEnCirculo(s, { x: M + 0.3, y: 5.1, d: 0.8, Icon: FaLightbulb, relleno: C.text1, iconoHex: HEX.accent1, nombre: "Mejora" });
    s.addText("Y siempre, al menos una propuesta de mejora.", { ...T, x: M + 1.35, y: 4.9, w: W - 2 * M - 1.65, h: 1.2, fontSize: 22, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Los observadores comentan claridad, originalidad, viabilidad y posibles riesgos, con al menos una propuesta de mejora.");
  }

  // ── La IA como evaluadora crítica ───────────────────────────────────────
  pres.addSection({ title: "IA evaluadora" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "IA evaluadora" });
    s.addText("La IA como evaluadora crítica", { placeholder: "title" });
    etiqueta(s, C, "Min. 275–285 · Con IA", "ia");
    s.addText("Introducid un resumen de vuestra propuesta, sin información sensible:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    cajaPrompt(s, [
      "Actúa como responsable de una empresa que debe decidir si implantar",
      "una propuesta de innovación. Voy a presentarte una solución.",
      "Evalúala de forma crítica considerando utilidad, originalidad, coste,",
      "facilidad de implantación y riesgos. Identifica tres debilidades,",
      "formula dos preguntas difíciles y sugiere una mejora concreta.",
      "No des por válidas las cifras que no estén justificadas.",
      "Esta es la propuesta: [insertar descripción].",
    ], { x: M, y: 2.1, w: W - 2 * M, h: 3.4, fontSize: 19 });
    s.addNotes("Minutos 275–285. El prompt está en el guion para copiarlo. Recordar: sin información sensible en el resumen.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "IA evaluadora" });
    s.addText("¿Qué críticas aceptáis?", { placeholder: "title" });
    etiqueta(s, C, "Min. 275–285 · Parejas", "personas");
    s.addText("Cada pareja explica:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    columnasHueco(s, [["La crítica que aceptamos", C.accent2, C.background1], ["Qué modificaríamos", C.accent1, C.text1]]);
    await iconoEnCirculo(s, { x: M, y: 5.95, d: 0.65, Icon: FaSearch, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Aviso" });
    s.addText("Ojo: la respuesta de la IA también puede contener errores.", { ...T, x: M + 0.9, y: 5.95, w: W - 2 * M - 0.9, h: 0.65, fontSize: 20, bold: true, color: C.accent3, valign: "middle", margin: 0 });
    s.addNotes("Cada equipo explica cuál de las críticas de la IA acepta y qué modificaría. Recordar que una respuesta de IA también puede contener errores.");
  }

  // ── Transferencia a la búsqueda de empleo ───────────────────────────────
  pres.addSection({ title: "Empleo" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Empleo" });
    s.addText("Lo que habéis demostrado hoy", { placeholder: "title" });
    etiqueta(s, C, "Min. 285–295");
    const comp = [[FaSearch, "Identificar problemas"], [FaBrain, "Análisis"], [FaLightbulb, "Creatividad"], [FaLaptop, "Dominio digital"], [FaComments, "Comunicación"]];
    const gap = 0.3;
    const w = (W - 2 * M - 4 * gap) / 5;
    for (const [i, [Icon, t]] of comp.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.8, w, 3.0);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.65, y: 2.15, d: 1.3, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.15, y: 3.65, w: w - 0.3, h: 0.9, fontSize: 19, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
    }
    s.addText("Competencias que podéis contar en una entrevista de trabajo.", { ...T, x: M, y: 5.3, w: W - 2 * M, h: 0.6, fontSize: 21, bold: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 285–295. Explicar que el trabajo realizado permite demostrar identificación de problemas, análisis, creatividad, dominio digital y comunicación.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Empleo" });
    s.addText("Cómo contarlo en una entrevista", { placeholder: "title" });
    etiqueta(s, C, "Min. 285–295");
    s.addShape("roundRect", { x: M, y: 1.6, w: W - 2 * M, h: 2.6, rectRadius: 0.15, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Ejemplo" });
    await iconoEnCirculo(s, { x: M + 0.35, y: 1.85, d: 0.8, Icon: FaUserGraduate, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Ejemplo" });
    s.addText("Ejemplo de relato", { ...T, x: M + 1.4, y: 1.85, w: 6, h: 0.8, fontSize: 18, bold: true, color: C.accent1, valign: "middle", margin: 0 });
    s.addText("«En una actividad de innovación digital analicé un proceso administrativo, utilicé técnicas creativas e inteligencia artificial para generar alternativas y elaboré una matriz en Excel para evaluarlas. Después documenté una solución y preparé una presentación para defenderla».",
      { ...T, x: M + 0.35, y: 2.75, w: W - 2 * M - 0.7, h: 1.35, fontSize: 19, italic: true, color: C.background1, valign: "top", margin: 0 });
    tarjeta(s, M, 4.55, W - 2 * M, 1.4);
    await iconoEnCirculo(s, { x: M + 0.35, y: 4.8, d: 0.9, Icon: FaExclamationTriangle, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Aviso" });
    s.addText([{ text: "Siempre como simulación formativa, ", options: { bold: true } }, { text: "no como una mejora implantada de verdad en una empresa." }],
      { ...T, x: M + 1.55, y: 4.55, w: W - 2 * M - 1.85, h: 1.4, fontSize: 21, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Aclarar que debe presentarse como simulación formativa, no como mejora realmente implantada en una empresa.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Empleo" });
    s.addText("Actividad: mi relato", { placeholder: "title" });
    etiqueta(s, C, "Min. 285–295 · Individual", "personas");
    s.addText("Escribid vuestro propio relato, de tres o cuatro líneas, adaptado a:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const claves = [[FaUsers, "El trabajo que ha hecho vuestra pareja"], [FaUserGraduate, "El puesto al que aspiráis"]];
    for (const [i, [Icon, t]] of claves.entries()) {
      const x = M + i * 6.2;
      await iconoEnCirculo(s, { x, y: 2.1, d: 0.75, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.95, y: 2.1, w: 5.0, h: 0.75, fontSize: 19, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    hueco(s, M, 3.15, W - 2 * M, 2.4);
    await iconoEnCirculo(s, { x: M, y: 5.85, d: 0.65, Icon: FaPen, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Lectura" });
    s.addText("Después, tres o cuatro voluntarios lo leen y el grupo propone una mejora para cada uno.", { ...T, x: M + 0.9, y: 5.85, w: W - 2 * M - 0.9, h: 0.65, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Cada persona escribe su relato en 5 minutos. Después, tres o cuatro voluntarios lo leen en voz alta y el grupo propone una mejora para cada uno. Comprobar que nadie presenta la simulación como un logro real.");
  }

  // ── Comprobación final ──────────────────────────────────────────────────
  pres.addSection({ title: "Cierre" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Cierre" });
    s.addText("Comprobación final", { placeholder: "title" });
    etiqueta(s, C, "Min. 295–300 · Todo el grupo", "personas");
    const preguntas = [
      "¿En qué se diferencia una idea creativa de una innovación?",
      "¿Qué diferencia hay entre el brainstorming, SCAMPER y la provocación?",
      "¿Qué ventaja ofrece una matriz de decisión?",
      "¿Por qué no conviene aceptar sin revisar las respuestas de una IA?",
      "¿Cómo mediríamos el resultado de una propuesta de mejora?",
    ];
    preguntas.forEach((t, i) => {
      const y = 1.6 + i * 0.95;
      s.addShape("ellipse", { x: M, y: y + 0.05, w: 0.65, h: 0.65, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Pregunta ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: M, y: y + 0.05, w: 0.65, h: 0.65, fontSize: 22, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(t, { ...T, x: M + 0.95, y, w: W - 2 * M - 0.95, h: 0.75, fontSize: 21, color: C.text1, valign: "middle", margin: 0 });
    });
    s.addNotes("Minutos 295–300. Preguntar oralmente.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Cierre" });
    s.addText("Para terminar", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "¿Qué técnica de hoy os gustaría aplicar", options: { breakLine: true } },
      { text: "en vuestro próximo empleo?", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Pedir a cada participante una técnica que quiera aplicar en un futuro empleo.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Cierre" });
    s.addText("El mensaje del curso", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "La IA ayuda a ampliar y acelerar el pensamiento creativo.", options: { breakLine: true } },
      { text: "El valor profesional está en definir bien el problema, elegir una solución sensata y saber cómo comprobar si funciona.", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Mensaje central para cerrar el taller (sección de orientaciones metodológicas del guion).");
  }

  const destino = await guardar(pres, "bloque5.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
