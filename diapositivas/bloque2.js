// Diapositivas del bloque 2: SCAMPER y provocación con IA (minutos 45–105).
// Uso: node bloque2.js  →  genera bloque2.pptx (solo si no existe todavía).

const {
  FaStore, FaUsers, FaBuilding, FaRobot, FaPen, FaListOl, FaCut, FaBolt, FaArrowRight, FaLightbulb,
  FaSyncAlt, FaSearch, FaCoins, FaChartLine, FaTools, FaUserSecret, FaQuestionCircle, FaCogs, FaBalanceScale,
  FaExclamationTriangle, FaHandPointer,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 2, tituloBloque: "SCAMPER y provocación con IA" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });

  // Caja oscura con un prompt en tipografía monoespaciada. Lo que va entre corchetes (lo que hay que rellenar) sale en ámbar.
  const cajaPrompt = (s, lineas, { x, y, w, h, fontSize = 14 }) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Prompt" });
    const runs = [];
    let dentro = false;
    lineas.forEach((l, i) => {
      const trozos = l === "" ? [" "] : l.split(/(\[|\])/).filter((t) => t !== "");
      let pendientes = [];
      for (const t of trozos) {
        if (t === "[") { dentro = true; pendientes.push({ t, marca: true }); continue; }
        if (t === "]") { pendientes.push({ t, marca: true }); dentro = false; continue; }
        pendientes.push({ t, marca: dentro });
      }
      pendientes.forEach((p, j) => {
        const ultimoDeLinea = j === pendientes.length - 1;
        runs.push({ text: p.t, options: { color: p.marca ? C.accent1 : C.background1, bold: p.marca, breakLine: ultimoDeLinea && i < lineas.length - 1 } });
      });
    });
    s.addText(runs, { ...T, x: x + 0.3, y: y + 0.2, w: w - 0.6, h: h - 0.4, fontSize, fontFace: "Courier New", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
  };

  const porQueFunciona = (s, razones, xr) => {
    const wr = W - M - xr;
    s.addText("Por qué funciona", { ...T, x: xr, y: 1.5, w: wr, h: 0.55, fontSize: 22, bold: true, color: C.text1, margin: 0 });
    razones.forEach((txt, i) => {
      const y = 2.25 + i * 1.12;
      s.addShape("ellipse", { x: xr, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: C.accent2 }, line: { type: "none" }, objectName: `Razón ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: xr, y: y + 0.05, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: xr + 0.7, y, w: wr - 0.7, h: 1.0, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    });
  };

  const filasIcono = async (s, filas, { y0, paso = 0.95, relleno = C.accent1, iconoHex = HEX.dk1, x = M, w = 11 }) => {
    for (const [i, [Icon, txt]] of filas.entries()) {
      const y = y0 + i * paso;
      await iconoEnCirculo(s, { x, y, d: 0.75, Icon, relleno, iconoHex, nombre: "Instrucción" });
      s.addText(txt, { ...T, x: x + 1.0, y, w, h: 0.75, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
  };

  // ── Portada del bloque ──────────────────────────────────────────────────
  pres.addSection({ title: "Bloque 2" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Bloque 2" });
    s.addText("2", { ...T, x: M, y: 1.9, w: 2.4, h: 3.0, fontSize: 200, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText("SCAMPER y provocación con IA", { placeholder: "title" });
    s.addText("60 minutos · por parejas", { placeholder: "body" });
    s.addNotes("Objetivo del bloque: aplicar dos técnicas estructuradas, primero sin IA y después con IA, sobre un mismo caso profesional, y seleccionar las tres mejores propuestas, que se evaluarán en la matriz del bloque 3.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 2" });
    s.addText("Qué vamos a hacer en este bloque", { placeholder: "title" });
    const pasos = [
      ["45–50", "SCAMPER: qué es", "neutro"],
      ["50–62", "Ejercicio 2: ideas de la pareja", "personas"],
      ["62–72", "Ejercicio 2: ideas con IA", "ia"],
      ["72–77", "Provocación: qué es", "neutro"],
      ["77–85", "Ejercicio 3: ideas de la pareja", "personas"],
      ["85–92", "Ejercicio 3: ideas con IA", "ia"],
      ["92–100", "Elegimos tres propuestas", "personas"],
      ["100–105", "¿Qué falla aquí?", "neutro"],
    ];
    const ancho = (W - 2 * M) / pasos.length;
    const d = 1.15;
    const yc = 2.55;
    linea(s, M + ancho / 2, yc, W - M - ancho / 2, yc, { color: HEX.lt2, width: 4 });
    pasos.forEach(([min, txt, tipo], i) => {
      const cx = M + ancho * i + ancho / 2;
      const relleno = { personas: C.accent1, ia: C.accent2, neutro: C.text2 }[tipo];
      const color = tipo === "personas" ? C.text1 : C.background1;
      s.addShape("ellipse", { x: cx - d / 2, y: yc - d / 2, w: d, h: d, fill: { color: relleno }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(min, { ...T, x: cx - d / 2, y: yc - d / 2, w: d, h: d, fontSize: 15, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: cx - ancho / 2 + 0.05, y: yc + d / 2 + 0.25, w: ancho - 0.1, h: 1.3, fontSize: 15, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    await iconoEnCirculo(s, { x: M, y: 5.3, d: 0.6, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Personas" });
    s.addText("Ámbar: piensa la pareja", { ...T, x: M + 0.75, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    await iconoEnCirculo(s, { x: 5.9, y: 5.3, d: 0.6, Icon: FaRobot, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "IA" });
    s.addText("Verde: trabajamos con la IA", { ...T, x: 6.65, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Recorrido del bloque. Se mantiene la regla del curso: en cada técnica, primero piensa la pareja y después se pide ayuda a la IA.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 2" });
    s.addText("Por parejas: elegid un caso", { placeholder: "title" });
    etiqueta(s, C, "Min. 45 · Parejas", "personas");
    const casos = [
      [FaStore, "Un comercio que pierde pedidos", "Los pedidos llegan por teléfono, WhatsApp y en el mostrador; se apuntan en una libreta y a veces se olvidan o se sirven tarde."],
      [FaUsers, "Una asociación que pierde tiempo", "Las actividades se anuncian por WhatsApp y las inscripciones se apuntan en un Excel que solo actualiza una persona; se pierden inscripciones y quedan plazas libres."],
      [FaBuilding, "Una oficina con las mismas preguntas", "Por teléfono y por correo llegan a diario las mismas consultas (horarios, documentación, plazos) y se responden una a una."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, titulo, txt]] of casos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.6, w, 4.1);
      s.addText(String(i + 1), { ...T, x: x + w - 0.85, y: 1.75, w: 0.6, h: 0.6, fontSize: 28, bold: true, color: C.accent5, align: "right", margin: 0 });
      await iconoEnCirculo(s, { x: x + 0.35, y: 1.9, d: 1.0, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: titulo });
      s.addText(titulo, { ...T, x: x + 0.35, y: 3.05, w: w - 0.7, h: 0.85, fontSize: 21, bold: true, color: C.text1, valign: "top", margin: 0 });
      s.addText(txt, { ...T, x: x + 0.35, y: 3.9, w: w - 0.7, h: 1.7, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    }
    s.addText("Trabajaréis con el mismo caso todo el bloque. Vuestras tres mejores propuestas pasarán a la matriz del bloque 3.", { ...T, x: M, y: 5.95, w: W - 2 * M, h: 0.6, fontSize: 18, bold: true, color: C.text2, margin: 0 });
    s.addNotes("Cada pareja elige uno de los tres casos y trabaja con él durante todo el bloque: SCAMPER, provocación y selección de propuestas. Conviene que los tres casos queden repartidos entre las parejas.");
  }

  // ── SCAMPER ─────────────────────────────────────────────────────────────
  pres.addSection({ title: "SCAMPER" });
  const LETRAS = [
    ["S", "Sustituir", "¿Qué podemos cambiar por otra cosa?", "Sustituir la llamada por una reserva por internet sencilla."],
    ["C", "Combinar", "¿Qué elementos podemos unir?", "Combinar la confirmación de la cita con un recordatorio el día anterior."],
    ["A", "Adaptar", "¿Qué funciona en otro sector?", "Adaptar la lista de espera de los restaurantes: avisar si queda un hueco libre."],
    ["M", "Modificar", "¿Qué podemos ampliar o reducir?", "Reducir la llamada a tres preguntas fijas: servicio, día y hora."],
    ["P", "Proponer otros usos", "¿Para qué más puede servir?", "Usar el recordatorio también para pedir una valoración del servicio."],
    ["E", "Eliminar", "¿Qué pasos sobran?", "Eliminar la llamada para confirmar la cita."],
    ["R", "Reorganizar", "¿Qué orden podemos cambiar?", "Preguntar el servicio al reservar, para preparar el material antes de que llegue el cliente."],
  ];
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "SCAMPER" });
    s.addText("SCAMPER: siete preguntas", { placeholder: "title" });
    etiqueta(s, C, "Min. 45–50");
    s.addText("Para transformar algo que ya existe, mirándolo desde siete ángulos.", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.55, fontSize: 21, color: C.text2, margin: 0 });
    const gap = 0.2;
    const w = (W - 2 * M - 6 * gap) / 7;
    LETRAS.forEach(([l, palabra, pregunta], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y: 2.3, w, h: w, rectRadius: 0.15, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Letra ${l}` });
      s.addText(l, { ...T, x, y: 2.3, w, h: w, fontSize: 60, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
      s.addText(palabra, { ...T, x: x - 0.05, y: 2.4 + w, w: w + 0.1, h: 0.75, fontSize: 16, bold: true, color: C.text1, align: "center", valign: "top", margin: 0 });
      s.addText(pregunta, { ...T, x: x - 0.05, y: 3.15 + w, w: w + 0.1, h: 1.0, fontSize: 14, color: C.text2, align: "center", valign: "top", margin: 0 });
    });
    tarjeta(s, M, 5.85, W - 2 * M, 0.8);
    s.addText([{ text: "El brainstorming parte de cero. ", options: { bold: false } }, { text: "SCAMPER parte de cómo se hace hoy.", options: { bold: true } }],
      { ...T, x: M + 0.35, y: 5.85, w: W - 2 * M - 0.7, h: 0.8, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 45–50. SCAMPER es una lista de siete preguntas para transformar un proceso o producto que ya existe. A diferencia del brainstorming, no parte de cero: obliga a mirar el proceso actual desde siete ángulos.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "SCAMPER" });
    s.addText("SCAMPER en la peluquería", { placeholder: "title" });
    etiqueta(s, C, "Min. 45–50");
    await iconoEnCirculo(s, { x: M, y: 1.45, d: 0.6, Icon: FaCut, relleno: C.text1, iconoHex: HEX.accent1, nombre: "Peluquería" });
    s.addText([{ text: "Proceso actual: ", options: { bold: true } }, { text: "los clientes llaman por teléfono para pedir cita." }], { ...T, x: M + 0.8, y: 1.45, w: 11, h: 0.6, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    const filas = [[
      { text: "", options: { fill: { color: C.text1 } } },
      { text: "Pregunta", options: { bold: true, color: C.background1, fill: { color: C.text1 } } },
      { text: "Ejemplo en la peluquería", options: { bold: true, color: C.background1, fill: { color: C.text1 } } },
    ]];
    LETRAS.forEach(([l, palabra, pregunta, ejemplo]) => {
      filas.push([
        { text: [{ text: l, options: { bold: true, fontSize: 20 } }, { text: "  " + palabra, options: { fontSize: 13, bold: true } }], options: { fill: { color: C.accent1 }, color: C.text1, align: "left" } },
        { text: pregunta, options: { color: C.text1 } },
        { text: ejemplo, options: { color: C.text1 } },
      ]);
    });
    s.addTable(filas, { x: M, y: 2.15, w: W - 2 * M, colW: [2.45, 3.25, 6.433], rowH: [0.42, ...Array(7).fill(0.5)], fontSize: 14, valign: "middle", border: { type: "solid", pt: 1, color: HEX.lt2 }, margin: 0.08 });
    s.addNotes("Recorrer la tabla rápido, letra a letra: cada pregunta mira el mismo proceso desde un ángulo distinto. Es el mismo ejemplo de la peluquería del bloque 1, para comparar qué tipo de ideas da cada técnica.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "SCAMPER" });
    s.addText("Ejercicio 2: SCAMPER en vuestro caso", { placeholder: "title" });
    etiqueta(s, C, "Min. 50–62 · Sin IA", "personas");
    await filasIcono(s, [
      [FaPen, "Describid en tres o cuatro líneas cómo funciona hoy el proceso."],
      [FaListOl, "Escribid al menos una idea por cada letra de SCAMPER."],
    ], { y0: 1.65, paso: 1.05 });
    const gap = 0.2;
    const w = (W - 2 * M - 6 * gap) / 7;
    LETRAS.forEach(([l, palabra], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y: 3.95, w, h: 1.7, rectRadius: 0.15, fill: { color: C.background2 }, line: { color: HEX.accent1, width: 2 }, objectName: `Letra ${l}` });
      s.addText(l, { ...T, x, y: 4.05, w, h: 0.9, fontSize: 44, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
      s.addText(palabra, { ...T, x: x + 0.05, y: 4.95, w: w - 0.1, h: 0.6, fontSize: 13, bold: true, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    s.addText("Guardad vuestras ideas: las usaréis en el prompt.", { ...T, x: M, y: 6.0, w: W - 2 * M, h: 0.5, fontSize: 18, italic: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 50–62. Por parejas, sin IA, sobre el caso elegido. Pasar por las mesas: si una pareja se atasca en una letra, que pase a la siguiente y vuelva después. Conviene que anoten las ideas en un documento, porque las pegarán en el prompt de la ronda con IA.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "SCAMPER" });
    s.addText("Ronda con IA: el prompt", { placeholder: "title" });
    etiqueta(s, C, "Min. 62–72 · Con IA", "ia");
    cajaPrompt(s, [
      "Actúa como especialista en mejora de procesos de",
      "pequeñas empresas y organizaciones.",
      "",
      "Proceso actual: [describir en 3 o 4 líneas cómo se",
      "hace hoy, sin nombres ni datos personales].",
      "Problema: [qué falla y a quién afecta].",
      "Restricciones: sin comprar software caro, sin",
      "contratar personal y que pueda probarse en un mes.",
      "",
      "Ya hemos aplicado SCAMPER y tenemos estas ideas:",
      "[pegar las ideas de la pareja, indicando la",
      "letra de cada una]",
      "",
      "Aplica SCAMPER al proceso: para cada una de las siete",
      "letras, propón dos ideas que no repitan las nuestras.",
      "Preséntalo en una tabla con estas columnas: letra,",
      "idea, qué cambia en el proceso, beneficio principal y",
      "dificultad (baja, media o alta).",
      "No inventes cifras de ahorro ni de resultados.",
    ], { x: M, y: 1.45, w: 7.5, h: 5.0 });
    porQueFunciona(s, [
      "Describe el proceso actual: la materia prima de SCAMPER.",
      "Incluye vuestras ideas para que la IA no las repita.",
      "Las restricciones evitan soluciones caras o irreales.",
      "La tabla obliga a concretar cada idea y facilita compararla con las vuestras.",
    ], 8.5);
    s.addNotes("Minutos 62–72. Cada pareja copia el prompt (está en el guion) y rellena lo que va entre corchetes. Insistir: describir el proceso, nunca a las personas.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "SCAMPER" });
    s.addText("No os quedéis en el primer prompt", { placeholder: "title" });
    etiqueta(s, C, "Min. 62–72 · Con IA", "ia");
    s.addText("Seguid la conversación con al menos una de estas peticiones:", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontSize: 20, color: C.text2, margin: 0 });
    const peticiones = [
      [FaCoins, "Descarta las ideas que requieran más de 100 € o conocimientos técnicos."],
      [FaBolt, "Prioriza las ideas que puedan probarse en una semana."],
      [FaExclamationTriangle, "Señala los inconvenientes de las tres mejores ideas."],
    ];
    for (const [i, [Icon, txt]] of peticiones.entries()) {
      const y = 2.25 + i * 1.15;
      await iconoEnCirculo(s, { x: M, y: y + 0.05, d: 0.8, Icon, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "Petición" });
      s.addShape("roundRect", { x: M + 1.1, y, w: W - 2 * M - 1.1, h: 0.9, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Petición" });
      s.addText(txt, { ...T, x: M + 1.4, y, w: W - 2 * M - 1.7, h: 0.9, fontSize: 18, fontFace: "Courier New", color: C.background1, valign: "middle", margin: 0 });
    }
    await iconoEnCirculo(s, { x: M, y: 5.85, d: 0.7, Icon: FaSyncAlt, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Iterar" });
    s.addText("Un buen trabajo con IA es iterativo: no termina en el primer prompt.", { ...T, x: M + 0.95, y: 5.85, w: 11, h: 0.7, fontSize: 21, bold: true, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Las peticiones se escriben en la misma conversación, a continuación de la respuesta de la IA. Al terminar, cada pareja compara las ideas de la IA con las suyas: ¿qué ha aportado que no se les hubiera ocurrido? ¿Qué no ha entendido del caso?");
  }

  // ── Provocación ─────────────────────────────────────────────────────────
  pres.addSection({ title: "Provocación" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Provocación" });
    s.addText("Provocación: salir de lo de siempre", { placeholder: "title" });
    etiqueta(s, C, "Min. 72–77");
    s.addText("Una técnica de pensamiento lateral de Edward de Bono, en tres pasos:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.55, fontSize: 20, color: C.text2, margin: 0 });
    const pasos = [
      [FaBolt, C.accent3, HEX.lt1, "1. Provocación", "Una afirmación deliberadamente absurda o imposible, que rompe algo que damos por hecho."],
      [FaSearch, C.text2, HEX.lt1, "2. Movimiento", "Buscar qué principio útil se esconde en ese absurdo."],
      [FaLightbulb, C.accent1, HEX.dk1, "3. Idea práctica", "Convertir ese principio en algo que se pueda hacer de verdad."],
    ];
    const gap = 0.6;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, relleno, iconoHex, titulo, txt]] of pasos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.2, w, 3.15);
      await iconoEnCirculo(s, { x: x + 0.35, y: 2.45, d: 1.0, Icon, relleno, iconoHex, nombre: titulo });
      s.addText(titulo, { ...T, x: x + 0.35, y: 3.6, w: w - 0.7, h: 0.55, fontSize: 22, bold: true, color: C.text1, margin: 0 });
      s.addText(txt, { ...T, x: x + 0.35, y: 4.15, w: w - 0.7, h: 1.1, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
      if (i < 2) linea(s, x + w + 0.1, 3.75, x + w + gap - 0.1, 3.75, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    }
    tarjeta(s, M, 5.7, W - 2 * M, 0.85);
    s.addText([{ text: "SCAMPER mejora lo que existe. ", options: {} }, { text: "La provocación rompe lo que damos por hecho.", options: { bold: true } }],
      { ...T, x: M + 0.35, y: 5.7, w: W - 2 * M - 0.7, h: 0.85, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 72–77. La provocación (técnica de pensamiento lateral de Edward de Bono) consiste en lanzar una afirmación deliberadamente absurda que rompe una suposición que nadie cuestiona y después hacer el movimiento: extraer del absurdo un principio útil y convertirlo en una idea práctica.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Provocación" });
    s.addText("Cuatro tipos de provocación, en la peluquería", { placeholder: "title" });
    etiqueta(s, C, "Min. 72–77");
    const cab = (txt, relleno, color) => ({ text: txt, options: { bold: true, fill: { color: relleno }, color } });
    const tipo = (t, d) => ({ text: [{ text: t, options: { bold: true, breakLine: true } }, { text: d, options: { fontSize: 12, italic: true } }], options: { fill: { color: C.background2 }, color: C.text1 } });
    const c = (t, opts = {}) => ({ text: t, options: { color: C.text1, ...opts } });
    s.addTable([
      [cab("Tipo", C.text1, C.background1), cab("Provocación", C.accent3, C.background1), cab("Movimiento: principio útil", C.text2, C.background1), cab("Idea práctica", C.accent1, C.text1)],
      [tipo("Inversión", "darle la vuelta"), c("«La peluquería llama a los clientes, y no al revés».", { italic: true }), c("La peluquería puede tomar la iniciativa."), c("Al terminar cada servicio, proponer ya la fecha de la siguiente cita.")],
      [tipo("Exageración", "llevarlo al extremo"), c("«Cada cliente viene todos los días».", { italic: true }), c("Clientes con citas fijas y recurrentes."), c("Abono mensual con cita fija para clientes habituales.")],
      [tipo("Eliminación", "quitar lo imprescindible"), c("«La peluquería no tiene teléfono».", { italic: true }), c("El teléfono no tiene por qué ser el canal principal."), c("Reservas por otros canales; el teléfono, solo para imprevistos.")],
      [tipo("Deseo", "¿y si…? imposible"), c("«¿Y si el cliente supiera exactamente cuándo le toca, aunque llegue sin cita?».", { italic: true }), c("Hacer visible la espera."), c("Turno visible en el móvil o en una pantalla en la puerta.")],
    ], { x: M, y: 1.55, w: W - 2 * M, colW: [2.1, 3.5, 3.0, 3.533], rowH: [0.5, 1.05, 1.0, 1.0, 1.05], fontSize: 15, valign: "middle", border: { type: "solid", pt: 1, color: HEX.lt2 }, margin: 0.1 });
    s.addNotes("Leer cada fila de izquierda a derecha: provocación absurda → principio útil → idea práctica. Así se ve que el absurdo no es el final, sino el trampolín.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Provocación" });
    s.addText("El error típico", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "Quedarse en la provocación y reírse.", options: { breakLine: true } },
      { text: "Sin movimiento no hay idea: ¿qué principio útil sacamos de esto?", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Advertencia para el docente: el error típico es quedarse en la provocación y reírse. Insistir siempre en «¿y qué principio útil sacamos de esto?».");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Provocación" });
    s.addText("Ejercicio 3: provocación en vuestro caso", { placeholder: "title" });
    etiqueta(s, C, "Min. 77–85 · Sin IA", "personas");
    s.addText("Tres provocaciones de tipos distintos, sobre el mismo caso. Para cada una, llegad hasta la idea práctica:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 19, color: C.text2, margin: 0 });
    const cols = [["Provocación", C.accent3, C.background1], ["Principio útil", C.text2, C.background1], ["Idea práctica", C.accent1, C.text1]];
    const gap = 0.55;
    const w = (W - 2 * M - 2 * gap) / 3;
    cols.forEach(([t, relleno, color], j) => {
      const x = M + j * (w + gap);
      s.addShape("roundRect", { x, y: 2.25, w, h: 0.6, rectRadius: 0.1, fill: { color: relleno }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x, y: 2.25, w, h: 0.6, fontSize: 18, bold: true, color, align: "center", valign: "middle", margin: 0 });
      for (let i = 0; i < 3; i++) {
        const y = 3.05 + i * 1.15;
        s.addShape("roundRect", { x, y, w, h: 0.95, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });
        if (j < 2) linea(s, x + w + 0.08, y + 0.47, x + w + gap - 0.08, y + 0.47, { color: HEX.dk2, width: 2.5, endArrowType: "triangle" });
      }
    });
    s.addNotes("Minutos 77–85. Por parejas, sin IA. Que cada provocación sea de un tipo distinto (inversión, exageración, eliminación o deseo). Pasar por las mesas comprobando que no se quedan en la provocación: tienen que llegar hasta una idea práctica.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Provocación" });
    s.addText("Ronda con IA: el prompt", { placeholder: "title" });
    etiqueta(s, C, "Min. 85–92 · Con IA", "ia");
    cajaPrompt(s, [
      "Actúa como experto en pensamiento lateral y en la",
      "técnica de provocación de Edward de Bono.",
      "",
      "Situación: [describir el proceso actual y el",
      "problema, sin nombres ni datos personales].",
      "",
      "Paso 1. Escribe 6 provocaciones: afirmaciones",
      "deliberadamente absurdas o imposibles que rompan",
      "una suposición sobre esta situación. Incluye al",
      "menos una de cada tipo: inversión, exageración,",
      "eliminación y deseo («¿Y si…?»).",
      "Paso 2. Para cada provocación, haz el movimiento:",
      "explica qué principio útil puede extraerse de ella.",
      "Paso 3. Convierte cada principio en una idea",
      "práctica, realista y de bajo coste.",
      "",
      "Preséntalo en una tabla con cuatro columnas: tipo,",
      "provocación, principio útil e idea práctica.",
      "No repitas estas provocaciones nuestras:",
      "[pegar las de la pareja].",
    ], { x: M, y: 1.45, w: 7.5, h: 5.2 });
    porQueFunciona(s, [
      "Separa los tres pasos de la técnica: la IA no salta directamente a una idea convencional.",
      "Exige los cuatro tipos para forzar la variedad.",
      "La tabla permite comprobar si el movimiento tiene sentido o solo suena bien.",
      "Incluye vuestras provocaciones para que no las repita.",
    ], 8.5);
    s.addNotes("Minutos 85–92. Cada pareja copia el prompt (está en el guion) y rellena lo que va entre corchetes.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Provocación" });
    s.addText("Revisad lo que dice la IA", { placeholder: "title" });
    etiqueta(s, C, "Min. 85–92 · Con IA", "ia");
    const preguntas = [
      [FaSearch, "¿El principio útil se deduce de verdad de la provocación?", "¿O la IA se ha inventado la conexión?"],
      [FaTools, "¿La idea práctica es aplicable, o es un tópico?", "¿Se podría probar en vuestro caso con pocos recursos?"],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - gap) / 2;
    for (const [i, [Icon, t, sub]] of preguntas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.7, w, 3.6);
      await iconoEnCirculo(s, { x: x + 0.4, y: 2.0, d: 1.2, Icon, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "Pregunta" });
      s.addText(t, { ...T, x: x + 0.4, y: 3.4, w: w - 0.8, h: 1.0, fontSize: 22, bold: true, color: C.text1, valign: "top", margin: 0 });
      s.addText(sub, { ...T, x: x + 0.4, y: 4.45, w: w - 0.8, h: 0.7, fontSize: 17, color: C.text2, valign: "top", margin: 0 });
    }
    s.addText("La IA es muy atrevida provocando. Lo difícil es el movimiento: ahí, vuestro criterio.", { ...T, x: M, y: 5.7, w: W - 2 * M, h: 0.6, fontSize: 19, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Cada pareja revisa la tabla de la IA con estas dos preguntas. La frase final es una hipótesis para comprobar, no una conclusión: si en el grupo sale lo contrario, mejor todavía.");
  }

  // ── Selección ───────────────────────────────────────────────────────────
  pres.addSection({ title: "Selección" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Selección" });
    s.addText("Elegid vuestras tres mejores propuestas", { placeholder: "title" });
    etiqueta(s, C, "Min. 92–100 · Parejas", "personas");
    s.addText("Juntad las ideas de SCAMPER y de la provocación, vuestras y de la IA. Justificad cada elección:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 19, color: C.text2, margin: 0 });
    const criterios = [[FaCoins, "Coste"], [FaChartLine, "Beneficio"], [FaHandPointer, "Facilidad de aplicación"]];
    for (const [i, [Icon, t]] of criterios.entries()) {
      const x = M + i * 3.2;
      await iconoEnCirculo(s, { x, y: 2.2, d: 0.7, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.85, y: 2.2, w: 2.3, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    const cab = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text1 } } });
    const vacia = (t = "") => ({ text: t, options: { color: C.text1 } });
    s.addTable([
      [cab("Propuesta"), cab("Por qué la elegimos"), cab("Origen")],
      [vacia("1."), vacia(), vacia()],
      [vacia("2."), vacia(), vacia()],
      [vacia("3."), vacia(), vacia()],
    ], { x: M, y: 3.25, w: W - 2 * M, colW: [4.2, 5.433, 2.5], rowH: [0.5, 0.8, 0.8, 0.8], fontSize: 16, valign: "middle", border: { type: "solid", pt: 1, color: HEX.accent5 }, margin: 0.1 });
    s.addText("Origen: pareja, IA o combinación de las dos.", { ...T, x: M, y: 6.25, w: W - 2 * M, h: 0.45, fontSize: 16, italic: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 92–100. Entregable: tabla sencilla con el problema, las tres propuestas, las razones de su selección y el origen de cada una. Estas tres propuestas se puntuarán en la matriz de decisión del bloque 3.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Selección" });
    s.addText("Puesta en común", { placeholder: "title" });
    etiqueta(s, C, "Min. 92–100 · Todo el grupo", "personas");
    const preguntas = [
      [FaQuestionCircle, "¿De dónde han salido las propuestas elegidas: de la pareja, de la IA o de una combinación?"],
      [FaTools, "¿Qué técnica ha dado ideas más aplicables?"],
      [FaLightbulb, "¿Y más originales?"],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, txt]] of preguntas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.75, w, 3.9);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.65, y: 2.15, d: 1.3, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Pregunta" });
      s.addText(txt, { ...T, x: x + 0.35, y: 3.75, w: w - 0.7, h: 1.7, fontSize: 22, color: C.text1, align: "center", valign: "top", margin: 0 });
    }
    s.addNotes("Puesta en común rápida, a mano alzada. Igual que en el bloque 1, no adelantar conclusiones: que salgan de lo que ha pasado en las parejas.");
  }

  // ── Pensamiento crítico ─────────────────────────────────────────────────
  pres.addSection({ title: "Pensamiento crítico" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Pensamiento crítico" });
    s.addText("¿Qué falla aquí?", { placeholder: "title" });
    etiqueta(s, C, "Min. 100–103 · Parejas", "personas");
    const gap = 0.4;
    const w = (W - 2 * M - gap) / 2;
    s.addShape("roundRect", { x: M, y: 1.6, w, h: 4.4, rectRadius: 0.15, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Prompt" });
    await iconoEnCirculo(s, { x: M + 0.35, y: 1.85, d: 0.7, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Prompt" });
    s.addText("El prompt", { ...T, x: M + 1.25, y: 1.85, w: w - 1.6, h: 0.7, fontSize: 20, bold: true, color: C.accent1, valign: "middle", margin: 0 });
    s.addText("«Nuestra clienta María García Ruiz, de la calle Mayor 12, falta siempre a sus citas y no paga las anulaciones. ¿Cómo reducimos las ausencias?»",
      { ...T, x: M + 0.35, y: 2.75, w: w - 0.7, h: 3.0, fontSize: 19, italic: true, color: C.background1, valign: "top", margin: 0 });
    const x2 = M + w + gap;
    tarjeta(s, x2, 1.6, w, 4.4);
    await iconoEnCirculo(s, { x: x2 + 0.35, y: 1.85, d: 0.7, Icon: FaRobot, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "IA" });
    s.addText("La respuesta de la IA", { ...T, x: x2 + 1.25, y: 1.85, w: w - 1.6, h: 0.7, fontSize: 20, bold: true, color: C.accent2, valign: "middle", margin: 0 });
    s.addText("«Según un estudio de la Universidad de Salamanca de 2023, enviar recordatorios reduce las ausencias un 47 %. Os recomiendo activar la función de recordatorios automáticos gratuita que incluye vuestra aplicación de mensajería. También podéis cobrar una fianza del 50 % al reservar; es la práctica habitual en todas las peluquerías».",
      { ...T, x: x2 + 0.35, y: 2.75, w: w - 0.7, h: 3.1, fontSize: 16, italic: true, color: C.text1, valign: "top", margin: 0 });
    s.addText("Por parejas: encontrad todos los problemas.", { ...T, x: M, y: 6.2, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    s.addNotes("Minutos 100–103. Proyectar y dar tres minutos. Hay cuatro problemas: datos personales en el prompt, un estudio y una cifra sin verificar, una función que puede no existir y una generalización falsa. La corrección está en la diapositiva siguiente.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Pensamiento crítico" });
    s.addText("Cuatro problemas", { placeholder: "title" });
    etiqueta(s, C, "Min. 103–105");
    const problemas = [
      [FaUserSecret, "Datos personales en el prompt", "Nombre, apellidos y dirección de una clienta. Bastaba con «algunos clientes faltan a sus citas»."],
      [FaQuestionCircle, "Estudio y cifra sin verificar", "Pueden ser inventados. Hay que comprobar la fuente antes de usarlos."],
      [FaCogs, "Una función que puede no existir", "Antes de proponerla, comprobar que la herramienta la tiene y que es gratuita."],
      [FaBalanceScale, "Una generalización falsa", "«La práctica habitual en todas las peluquerías» no está demostrado, y una fianza puede ahuyentar clientes."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - gap) / 2;
    for (const [i, [Icon, t, d]] of problemas.entries()) {
      const x = M + (i % 2) * (w + gap);
      const y = 1.6 + Math.floor(i / 2) * 2.15;
      tarjeta(s, x, y, w, 1.9);
      await iconoEnCirculo(s, { x: x + 0.3, y: y + 0.3, d: 0.85, Icon, relleno: C.accent3, iconoHex: HEX.lt1, nombre: t });
      s.addText(t, { ...T, x: x + 1.4, y: y + 0.25, w: w - 1.65, h: 0.55, fontSize: 20, bold: true, color: C.text1, valign: "middle", margin: 0 });
      s.addText(d, { ...T, x: x + 1.4, y: y + 0.8, w: w - 1.65, h: 1.0, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    }
    s.addNotes("Minutos 103–105. Corregir en común: preguntar qué problemas han encontrado las parejas antes de mostrar cada uno.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Pensamiento crítico" });
    s.addText("Idea clave del bloque 2", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "La IA puede inventar funciones, cifras o estudios: cada idea se revisa antes de aceptarla.", options: { breakLine: true } },
      { text: "En los prompts se describe el proceso, nunca a las personas.", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Cierre del bloque. Enlazar con el bloque 3: las tres propuestas de cada pareja se van a documentar y a comparar con una matriz de decisión.");
  }

  const destino = await guardar(pres, "bloque2.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
