// Diapositivas del bloque 3: comparar, decidir y documentar (minutos 105–165).
// Uso: node bloque3.js  →  genera bloque3.pptx (solo si no existe todavía).

const {
  FaFileWord, FaRobot, FaUsers, FaCheck, FaTimes, FaCut, FaPlus, FaExclamationTriangle, FaTable, FaCalculator,
  FaBalanceScale, FaSortAmountDown, FaComments, FaSlidersH, FaSearch, FaLightbulb, FaFileAlt, FaChartBar, FaFlagCheckered,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 3, tituloBloque: "Comparar, decidir y documentar" });
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

  // Hueco con cabecera de color, para que las parejas presenten sus conclusiones (como en el bloque 2).
  const columnasHueco = (s, columnas, { y = 2.25, h = 2.65 } = {}) => {
    const gap = 0.4;
    const w = (W - 2 * M - (columnas.length - 1) * gap) / columnas.length;
    columnas.forEach(([t, relleno, color], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y, w, h: 0.6, rectRadius: 0.1, fill: { color: relleno }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x: x + 0.1, y, w: w - 0.2, h: 0.6, fontSize: 18, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addShape("roundRect", { x, y: y + 0.8, w, h, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });
    });
  };

  // ── Portada y recorrido ─────────────────────────────────────────────────
  pres.addSection({ title: "Bloque 3" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Bloque 3" });
    s.addText("3", { ...T, x: M, y: 1.9, w: 2.4, h: 3.0, fontSize: 200, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText("Comparar, decidir y documentar", { placeholder: "title" });
    s.addText("60 minutos · por parejas", { placeholder: "body" });
    s.addNotes("Objetivo del bloque: que cada pareja compare con criterio sus tres propuestas del bloque 2, elija la ganadora con argumentos y la ponga por escrito en una ficha de una página. Excel y Word son el soporte, no el contenido: no explicar funciones básicas. La propuesta ganadora es la que cada pareja desarrollará en el bloque 4 y defenderá en el bloque 5.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 3" });
    s.addText("Qué vamos a hacer en este bloque", { placeholder: "title" });
    const pasos = [
      ["105–113", "La matriz de decisión", "neutro"],
      ["113–140", "Ejercicio 4: elegir la ganadora", "personas"],
      ["140–145", "Una propuesta en una página", "neutro"],
      ["145–160", "Ficha exprés de la ganadora", "ia"],
      ["160–165", "Síntesis", "neutro"],
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
    await iconoEnCirculo(s, { x: M, y: 5.3, d: 0.6, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Personas" });
    s.addText("Ámbar: piensa la pareja", { ...T, x: M + 0.75, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    await iconoEnCirculo(s, { x: 5.9, y: 5.3, d: 0.6, Icon: FaRobot, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "IA" });
    s.addText("Verde: trabajamos con la IA", { ...T, x: 6.65, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Recorrido del bloque: primero comparar las tres propuestas de cada pareja y decidir la ganadora (Excel o Google Sheets); después, ponerla por escrito (Word o Google Docs). Primero se decide y luego se documenta.");
  }

  // ── Excel: la matriz de decisión ────────────────────────────────────────
  pres.addSection({ title: "Comparar" });
  const CRITERIOS = [["Impacto", 35, C.accent1, C.text1], ["Viabilidad", 30, C.accent2, C.background1], ["Bajo coste", 20, C.accent4, C.background1], ["Originalidad", 15, C.accent3, C.background1]];
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("La matriz de decisión", { placeholder: "title" });
    etiqueta(s, C, "Min. 105–113");
    s.addText("Cada propuesta se puntúa del 1 al 5 en cuatro criterios. Cada criterio pesa distinto:", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    let x = M;
    const total = W - 2 * M;
    CRITERIOS.forEach(([t, p, relleno, color]) => {
      const w = (total * p) / 100;
      s.addShape("rect", { x, y: 2.35, w, h: 1.6, fill: { color: relleno }, line: { color: HEX.lt1, width: 2 }, objectName: t });
      s.addText([{ text: `${p} %`, options: { fontSize: 40, bold: true, breakLine: true } }, { text: t, options: { fontSize: 19, bold: true } }], { ...T, x: x + 0.1, y: 2.35, w: w - 0.2, h: 1.6, color, align: "center", valign: "middle", margin: 0 });
      x += w;
    });
    s.addText("Total: 100 %", { ...T, x: M, y: 4.1, w: W - 2 * M, h: 0.45, fontSize: 16, italic: true, color: C.text2, align: "right", margin: 0 });
    tarjeta(s, M, 4.75, W - 2 * M, 1.05);
    await iconoEnCirculo(s, { x: M + 0.3, y: 4.92, d: 0.7, Icon: FaExclamationTriangle, relleno: C.accent4, iconoHex: HEX.lt1, nombre: "Atención" });
    s.addText([{ text: "Ojo con «Bajo coste»: ", options: { bold: true } }, { text: "un 5 significa muy económica, no muy cara." }], { ...T, x: M + 1.2, y: 4.75, w: W - 2 * M - 1.5, h: 1.05, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    s.addText("La matriz es una ayuda para razonar, no una prueba objetiva.", { ...T, x: M, y: 6.05, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Minutos 105–113. Explicar los cuatro criterios y sus pesos. Los resultados dependen de las puntuaciones y los pesos que se elijan: la matriz es una ayuda para razonar, no una prueba objetiva.");
  }

  const filasMatriz = [["Formulario digital", 4, 5, 5, 3, "4,35"], ["Chatbot informativo", 4, 3, 2, 4, "3,30"], ["Panel de seguimiento", 5, 4, 4, 3, "4,20"]];
  const tablaMatriz = (s, conResultado, y) => {
    const cab = (t, relleno = C.text1, color = C.background1) => ({ text: t, options: { bold: true, fill: { color: relleno }, color, align: "center" } });
    const filas = [[cab("Propuesta"), ...CRITERIOS.map(([t, p, relleno, color]) => cab(`${t}\n${p} %`, relleno, color)), cab("Resultado")]];
    filasMatriz.forEach(([n, ...v]) => {
      const res = v.pop();
      filas.push([
        { text: n, options: { bold: true, color: C.text1 } },
        ...v.map((x) => ({ text: String(x), options: { color: C.text1, align: "center" } })),
        { text: conResultado ? res : "?", options: { bold: true, color: conResultado ? C.accent3 : C.accent5, align: "center", fontSize: 22 } },
      ]);
    });
    s.addTable(filas, { x: M, y, w: W - 2 * M, colW: [3.333, 1.8, 1.8, 1.8, 1.8, 1.6], rowH: [0.85, 0.7, 0.7, 0.7], fontSize: 18, valign: "middle", border: { type: "solid", pt: 1, color: HEX.lt2 }, margin: 0.1 });
  };

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Calculadlo vosotros", { placeholder: "title" });
    etiqueta(s, C, "Min. 105–113 · Parejas", "personas");
    s.addText("Con la calculadora del móvil, calculad el resultado de la propuesta que os toque:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    tablaMatriz(s, false, 2.15);
    tarjeta(s, M, 5.45, W - 2 * M, 1.05);
    await iconoEnCirculo(s, { x: M + 0.3, y: 5.62, d: 0.7, Icon: FaCalculator, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Calculadora" });
    s.addText("Impacto × 0,35  +  Viabilidad × 0,30  +  Bajo coste × 0,20  +  Originalidad × 0,15", { ...T, x: M + 1.2, y: 5.45, w: W - 2 * M - 1.5, h: 1.05, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 105–113, actividad de 3 minutos. Asignar a cada pareja una de las tres propuestas. Una vez hecho a mano, se entiende lo que hace la fórmula. Resultados: formulario digital 4,35; chatbot informativo 3,30; panel de seguimiento 4,20.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Los resultados", { placeholder: "title" });
    etiqueta(s, C, "Min. 105–113");
    tablaMatriz(s, true, 1.55);
    s.addText("Ejemplo, el formulario digital:", { ...T, x: M, y: 4.85, w: W - 2 * M, h: 0.45, fontSize: 17, bold: true, color: C.text2, margin: 0 });
    const pasos = [["4 × 0,35", "1,40"], ["5 × 0,30", "1,50"], ["5 × 0,20", "1,00"], ["3 × 0,15", "0,45"]];
    const w = 2.15;
    pasos.forEach(([op, r], i) => {
      const x = M + i * (w + 0.45);
      tarjeta(s, x, 5.4, w, 0.95);
      s.addText([{ text: op + " = ", options: {} }, { text: r, options: { bold: true } }], { ...T, x, y: 5.4, w, h: 0.95, fontSize: 18, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(i < 3 ? "+" : "=", { ...T, x: x + w, y: 5.4, w: 0.45, h: 0.95, fontSize: 24, bold: true, color: C.text2, align: "center", valign: "middle", margin: 0 });
    });
    s.addShape("roundRect", { x: M + 4 * (w + 0.45), y: 5.4, w: W - M - (M + 4 * (w + 0.45)), h: 0.95, rectRadius: 0.15, fill: { color: C.accent3 }, line: { type: "none" }, objectName: "Resultado" });
    s.addText("4,35", { ...T, x: M + 4 * (w + 0.45), y: 5.4, w: W - M - (M + 4 * (w + 0.45)), h: 0.95, fontSize: 26, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    s.addNotes("Corregir con el grupo. Si alguna pareja ha obtenido otro resultado, revisar juntos la operación.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("La fórmula en Excel o Google Sheets", { placeholder: "title" });
    etiqueta(s, C, "Min. 105–113");
    s.addText("Si las puntuaciones están en las columnas B a E, en la celda F2:", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    s.addShape("roundRect", { x: M, y: 2.2, w: W - 2 * M, h: 1.3, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Fórmula" });
    s.addText("=B2*35%+C2*30%+D2*20%+E2*15%", { ...T, x: M, y: 2.2, w: W - 2 * M, h: 1.3, fontSize: 36, bold: true, fontFace: "Courier New", color: C.accent1, align: "center", valign: "middle", margin: 0 });
    const columnas = [["B", "Impacto", C.accent1, C.text1], ["C", "Viabilidad", C.accent2, C.background1], ["D", "Bajo coste", C.accent4, C.background1], ["E", "Originalidad", C.accent3, C.background1]];
    const gap = 0.3;
    const w = (W - 2 * M - 3 * gap) / 4;
    columnas.forEach(([l, t, relleno, color], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y: 3.8, w, h: 0.9, rectRadius: 0.12, fill: { color: relleno }, line: { type: "none" }, objectName: `Columna ${l}` });
      s.addText([{ text: `Columna ${l}  `, options: { bold: true } }, { text: t }], { ...T, x, y: 3.8, w, h: 0.9, fontSize: 18, color, align: "center", valign: "middle", margin: 0 });
    });
    const pasos = [[FaTable, "Copiadla hacia abajo para el resto de propuestas."], [FaSortAmountDown, "Ordenad las propuestas por resultado."]];
    for (const [i, [Icon, t]] of pasos.entries()) {
      const y = 5.0 + i * 0.85;
      await iconoEnCirculo(s, { x: M, y, d: 0.65, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: M + 0.9, y, w: 11, h: 0.65, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addNotes("Mostrar la fórmula en directo en una hoja de cálculo y copiarla hacia abajo. Aviso: con esta fórmula los pesos están escritos dentro. Si en el Ejercicio 4 se cambian los pesos, hay que cambiar también los porcentajes de la fórmula en todas las filas.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Ejercicio 4: elegir con criterio", { placeholder: "title" });
    etiqueta(s, C, "Min. 113–140 · Parejas", "personas");
    const pasos = [
      [FaTable, "Introducid vuestras tres propuestas del bloque 2 en Excel o Sheets."],
      [FaCalculator, "Puntuad cada criterio y calculad el total ponderado."],
      [FaSortAmountDown, "Ordenad las propuestas por resultado."],
      [FaComments, "Discutid: ¿la primera os parece de verdad la más adecuada?"],
      [FaSlidersH, "Cambiad los pesos (sin pasar del 100 %), dando más importancia al coste. ¿Cambia la clasificación?"],
    ];
    for (const [i, [Icon, t]] of pasos.entries()) {
      const y = 1.6 + i * 0.95;
      s.addShape("ellipse", { x: M, y: y + 0.1, w: 0.55, h: 0.55, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: M, y: y + 0.1, w: 0.55, h: 0.55, fontSize: 18, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      await iconoEnCirculo(s, { x: M + 0.8, y, d: 0.75, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: `Paso ${i + 1}` });
      s.addText(t, { ...T, x: M + 1.8, y, w: W - 2 * M - 1.8, h: 0.75, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addText([{ text: "6 y 7  ", options: { bold: true, color: C.accent2, fontSize: 22 } }, { text: "Después, la IA revisa vuestra matriz y vosotros decidís →", options: { bold: true } }], { ...T, x: M, y: 6.3, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.accent2, margin: 0 });
    s.addNotes("Minutos 113–140. Por parejas, con las tres propuestas seleccionadas al final del bloque 2. Recordar al cambiar los pesos (paso 5) que hay que cambiar los porcentajes en la fórmula de todas las filas, y que los pesos deben seguir sumando 100 %. Entregable: hoja de cálculo con decisiones argumentadas.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Paso 6: que la IA revise la matriz", { placeholder: "title" });
    etiqueta(s, C, "Min. 113–140 · Con IA", "ia");
    cajaPrompt(s, [
      "Te paso una matriz de decisión con tres propuestas, cuatro criterios",
      "puntuados del 1 al 5 y sus pesos: [pegar la tabla con los pesos].",
      "Revísala: comprueba si los cálculos son correctos, si alguna",
      "puntuación parece incoherente con la descripción de la propuesta",
      "y si falta algún criterio importante. Justifica cada observación.",
    ], { x: M, y: 1.55, w: W - 2 * M, h: 2.0, fontSize: 17 });
    const preguntas = [[FaSearch, "¿Son correctas sus observaciones?", "Comprobad cada una: la IA también se equivoca con los números."], [FaBalanceScale, "¿Cambiaríais algo por lo que dice?", "Solo si os convence el argumento, no porque lo diga la IA."]];
    const gap = 0.4;
    const w = (W - 2 * M - gap) / 2;
    for (const [i, [Icon, t, d]] of preguntas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 3.9, w, 2.45);
      await iconoEnCirculo(s, { x: x + 0.35, y: 4.15, d: 0.9, Icon, relleno: C.accent2, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 1.5, y: 4.15, w: w - 1.8, h: 0.9, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
      s.addText(d, { ...T, x: x + 0.35, y: 5.25, w: w - 0.7, h: 0.95, fontSize: 17, color: C.text1, valign: "top", margin: 0 });
    }
    s.addNotes("El prompt está en el guion para copiarlo. Lo interesante es contrastar: ¿tenía razón la IA en sus observaciones o se ha equivocado en algo?");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Paso 7: decidid", { placeholder: "title" });
    etiqueta(s, C, "Min. 113–140 · Parejas", "personas");
    s.addText("Elegid vuestra propuesta ganadora y justificadla en una frase:", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    tarjeta(s, M, 2.25, W - 2 * M, 2.6);
    await iconoEnCirculo(s, { x: M + 0.4, y: 2.85, d: 1.4, Icon: FaFlagCheckered, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Decisión" });
    [["Elegimos", 2.55], ["porque", 3.65]].forEach(([t, y]) => {
      s.addText(t, { ...T, x: M + 2.2, y, w: 1.7, h: 0.8, fontSize: 26, bold: true, color: C.text1, valign: "middle", margin: 0 });
      s.addShape("roundRect", { x: M + 4.0, y, w: W - 2 * M - 4.4, h: 0.8, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });
    });
    tarjeta(s, M, 5.15, W - 2 * M, 1.15);
    await iconoEnCirculo(s, { x: M + 0.3, y: 5.35, d: 0.75, Icon: FaBalanceScale, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Criterio" });
    s.addText("No tiene por qué ser la de mayor puntuación. Pero si no lo es, tenéis que explicar por qué.", { ...T, x: M + 1.3, y: 5.15, w: W - 2 * M - 1.6, h: 1.15, fontSize: 19, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Último paso del Ejercicio 4. La matriz ayuda a razonar, pero la decisión es de la pareja. Esta propuesta ganadora es la que redactarán en la ficha exprés, desarrollarán en el bloque 4 y defenderán en el bloque 5.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparar" });
    s.addText("Ejercicio 4: vuestras conclusiones", { placeholder: "title" });
    etiqueta(s, C, "Min. 136–140 · Parejas", "personas");
    s.addText("Cada pareja cuenta en 30 segundos:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    columnasHueco(s, [["Nuestra propuesta ganadora", C.accent1, C.text1], ["¿Cambió al mover los pesos?", C.text2, C.background1], ["¿Tenía razón la IA?", C.accent2, C.background1]]);
    s.addText("Entregable: la hoja de cálculo con la decisión argumentada. Ahora, a ponerla por escrito.", { ...T, x: M, y: 5.95, w: W - 2 * M, h: 0.55, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    s.addNotes("Puesta en común en los últimos 4 minutos del ejercicio. Preguntas clave: ¿ha cambiado la clasificación al modificar los pesos? ¿Tenía razón la IA en sus observaciones o se ha equivocado en algo?");
  }

  // ── Word: una propuesta en una página ───────────────────────────────────
  pres.addSection({ title: "Documentar" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documentar" });
    s.addText("Una propuesta en una página", { placeholder: "title" });
    etiqueta(s, C, "Min. 140–145");
    const apartados = ["Título del proyecto", "Problema", "Solución", "Destinatarios", "Recursos", "Beneficios", "Riesgos"];
    s.addText("Siete apartados, en Word o Google Docs:", { ...T, x: M, y: 1.5, w: 5.4, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    apartados.forEach((t, i) => {
      const y = 2.15 + i * 0.6;
      s.addShape("ellipse", { x: M, y, w: 0.45, h: 0.45, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Apartado ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: M, y, w: 0.45, h: 0.45, fontSize: 15, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(t, { ...T, x: M + 0.65, y, w: 4.5, h: 0.45, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    });
    // Página de ejemplo
    const px = 6.4, py = 1.45, pw = W - M - px, ph = 5.25;
    s.addShape("rect", { x: px, y: py, w: pw, h: ph, fill: { color: C.background1 }, line: { color: HEX.accent5, width: 1 }, shadow: { type: "outer", color: "8A94A6", opacity: 0.35, blur: 8, offset: 3, angle: 90 }, objectName: "Página" });
    await iconoEnCirculo(s, { x: px + 0.35, y: py + 0.3, d: 0.6, Icon: FaFileWord, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Documento" });
    s.addText([{ text: "EJEMPLO · PROYECTO", options: { fontSize: 12, bold: true, color: C.accent5, breakLine: true } }, { text: "Sistema de seguimiento de solicitudes", options: { fontSize: 19, bold: true } }],
      { ...T, x: px + 1.1, y: py + 0.25, w: pw - 1.4, h: 0.75, color: C.text1, valign: "middle", margin: 0 });
    const campos = [
      ["Problema", "una pequeña empresa pierde peticiones entre correos dispersos."],
      ["Solución", "centralizar las solicitudes en un formulario y una hoja compartida."],
      ["Beneficios esperados", "menos olvidos y un seguimiento más fácil."],
      ["Recursos", "herramientas ya disponibles y una breve formación interna."],
      ["Riesgos", "errores de registro, accesos indebidos y resistencia al cambio."],
    ];
    const runs = [];
    campos.forEach(([k, v], i) => {
      runs.push({ text: k + ": ", options: { bold: true } });
      runs.push({ text: v, options: { breakLine: i < campos.length - 1 } });
    });
    s.addText(runs, { ...T, x: px + 0.35, y: py + 1.25, w: pw - 0.7, h: ph - 1.5, fontSize: 16, color: C.text1, valign: "top", margin: 0, paraSpaceAfter: 10 });
    s.addNotes("Minutos 140–145. Demostración: crear en directo un documento profesional de una página con estos apartados. El ejemplo de la derecha es el que se usa en la demostración.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documentar" });
    s.addText("La IA propone, vosotros decidís", { placeholder: "title" });
    etiqueta(s, C, "Min. 140–145");
    s.addText("Demostración: pedir a la IA una versión más clara y concisa del documento.", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const gap = 0.5;
    const w = (W - 2 * M - gap) / 2;
    tarjeta(s, M, 2.25, w, 3.4);
    await iconoEnCirculo(s, { x: M + 0.35, y: 2.55, d: 1.0, Icon: FaRobot, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "IA" });
    s.addText("La IA propone cambios", { ...T, x: M + 1.6, y: 2.55, w: w - 1.9, h: 1.0, fontSize: 22, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addText("Frases más cortas, otro orden, otras palabras… y a veces datos o afirmaciones que no estaban.", { ...T, x: M + 0.35, y: 3.8, w: w - 0.7, h: 1.6, fontSize: 18, color: C.text1, valign: "top", margin: 0 });
    const x2 = M + w + gap;
    tarjeta(s, x2, 2.25, w, 3.4);
    await iconoEnCirculo(s, { x: x2 + 0.35, y: 2.55, d: 1.0, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Personas" });
    s.addText("Vosotros decidís", { ...T, x: x2 + 1.6, y: 2.55, w: w - 1.9, h: 1.0, fontSize: 22, bold: true, color: C.text1, valign: "middle", margin: 0 });
    const decisiones = [[FaCheck, C.accent6, "Aceptar lo que mejora el texto."], [FaTimes, C.accent3, "Rechazar lo que cambia el sentido o no es cierto."]];
    for (const [i, [Icon, relleno, t]] of decisiones.entries()) {
      const y = 3.85 + i * 0.8;
      await iconoEnCirculo(s, { x: x2 + 0.35, y, d: 0.6, Icon, relleno, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x2 + 1.15, y, w: w - 1.5, h: 0.6, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    }
    linea(s, M + w + 0.05, 3.95, M + w + gap - 0.05, 3.95, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    s.addText("El documento es vuestro: la IA no firma la propuesta.", { ...T, x: M, y: 5.95, w: W - 2 * M, h: 0.55, fontSize: 20, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Minutos 140–145. Pedir a la IA una versión más clara y concisa del documento de ejemplo y revisar en voz alta cada cambio: cuál aceptamos, cuál rechazamos y por qué.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documentar" });
    s.addText("Ficha exprés con IA", { placeholder: "title" });
    etiqueta(s, C, "Min. 145–160 · Con IA", "ia");
    s.addText("Con la propuesta ganadora que acabáis de elegir:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    s.addText("1", { ...T, x: M, y: 2.1, w: 0.5, h: 0.5, fontSize: 26, bold: true, color: C.accent2, margin: 0 });
    cajaPrompt(s, [
      "Redacta una ficha de propuesta de una página con estos apartados:",
      "proyecto, problema, solución, beneficios esperados, recursos y riesgos.",
      "La propuesta es: [describir la propuesta sin datos personales].",
      "Usa frases cortas y no inventes cifras ni resultados.",
    ], { x: M + 0.6, y: 2.05, w: W - 2 * M - 0.6, h: 1.55, fontSize: 16 });
    s.addText([{ text: "2  ", options: { bold: true, color: C.accent1, fontSize: 26 } }, { text: "Pasadla a Word o Google Docs y marcad tres cosas que cambiaríais:" }], { ...T, x: M, y: 3.85, w: W - 2 * M, h: 0.55, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    const marcas = [[FaCut, "Algo que sobra"], [FaPlus, "Algo que falta"], [FaExclamationTriangle, "Algo que no es cierto o no está justificado"]];
    const gap = 0.4;
    const w = (W - 2 * M - 0.6 - 2 * gap) / 3;
    for (const [i, [Icon, t]] of marcas.entries()) {
      const x = M + 0.6 + i * (w + gap);
      tarjeta(s, x, 4.55, w, 1.1);
      await iconoEnCirculo(s, { x: x + 0.25, y: 4.75, d: 0.7, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 1.1, y: 4.55, w: w - 1.3, h: 1.1, fontSize: 17, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addText([{ text: "3  ", options: { bold: true, color: C.accent1, fontSize: 26 } }, { text: "Corregidlas." }], { ...T, x: M, y: 5.9, w: W - 2 * M, h: 0.55, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 145–160. Por parejas, con la propuesta ganadora que acaban de elegir. El prompt está en el guion para copiarlo. Pasar por las mesas: lo habitual es que la IA escriba de más o meta afirmaciones que nadie le ha dado. Esta ficha servirá de borrador para el documento del bloque 4.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Documentar" });
    s.addText("Ficha exprés: ¿qué habéis cambiado?", { placeholder: "title" });
    etiqueta(s, C, "Min. 156–160 · Parejas", "personas");
    s.addText("Dos o tres parejas cuentan qué han corregido y por qué:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    columnasHueco(s, [["Lo que sobraba", C.accent1, C.text1], ["Lo que faltaba", C.accent2, C.background1], ["Lo que no era cierto", C.accent3, C.background1]]);
    s.addText("Guardad la ficha: será el borrador del documento del bloque 4.", { ...T, x: M, y: 5.95, w: W - 2 * M, h: 0.55, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    s.addNotes("Puesta en común en los últimos 4 minutos del tramo: dos o tres parejas. Buscar ejemplos concretos de cosas que la IA añadió sin que nadie se las diera.");
  }

  // ── Síntesis ────────────────────────────────────────────────────────────
  pres.addSection({ title: "Síntesis" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Síntesis" });
    s.addText("Lo que llevamos hecho", { placeholder: "title" });
    etiqueta(s, C, "Min. 160–165 · Todo el grupo", "personas");
    const pasos = [[FaSearch, "Detectar"], [FaLightbulb, "Idear"], [FaChartBar, "Comparar"], [FaFlagCheckered, "Decidir"], [FaFileAlt, "Documentar"]];
    const w = (W - 2 * M) / 5;
    for (const [i, [Icon, t]] of pasos.entries()) {
      const x = M + i * w;
      s.addShape("chevron", { x: x + 0.05, y: 1.8, w: w - 0.1, h: 1.6, fill: { color: i % 2 ? C.text2 : C.text1 }, line: { type: "none" }, objectName: t });
      await iconoEnCirculo(s, { x: x + w / 2 - 0.35, y: 1.95, d: 0.7, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.3, y: 2.7, w: w - 0.6, h: 0.55, fontSize: 19, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    }
    tarjeta(s, M, 4.0, W - 2 * M, 2.0);
    await iconoEnCirculo(s, { x: M + 0.4, y: 4.4, d: 1.2, Icon: FaComments, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Ronda" });
    s.addText([{ text: "Ronda rápida", options: { bold: true, fontSize: 24, breakLine: true } }, { text: "Cada pareja, en una frase: ¿qué paso os ha costado más hasta ahora y por qué?" }],
      { ...T, x: M + 1.9, y: 4.0, w: W - 2 * M - 2.2, h: 2.0, fontSize: 21, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 160–165. Anotar las respuestas: indican en qué insistir durante el bloque 4.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Síntesis" });
    s.addText("Idea clave del bloque 3", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "Un documento de la IA no está terminado hasta que lo revisáis.", options: { breakLine: true } },
      { text: "Y la matriz no decide por vosotros: os ayuda a razonar.", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Enlazar con el bloque 4: cada pareja va a desarrollar su propuesta ganadora hasta convertirla en un proyecto defendible.");
  }

  const destino = await guardar(pres, "bloque3.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
