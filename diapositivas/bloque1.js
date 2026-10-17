// Diapositivas del bloque 1: Activación de la creatividad y brainstorming (minutos 0–45).
// Uso: node bloque1.js  →  genera bloque1.pptx en esta carpeta.

const {
  FaLightbulb, FaRocket, FaLaptop, FaUsers, FaRobot, FaPaperclip, FaRegClock, FaVolumeMute, FaPen,
  FaShoppingCart, FaHandPaper, FaCommentDots, FaStore, FaTable, FaCar, FaBoxOpen, FaLanguage,
  FaCut, FaPhone, FaCalendarTimes, FaChair, FaSyncAlt, FaCalculator, FaAnchor, FaBalanceScale,
  FaPuzzlePiece, FaCoins, FaStar, FaCheck, FaRedoAlt, FaArrowRight,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 1, tituloBloque: "Activación de la creatividad y brainstorming" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });

  // ── Portada ─────────────────────────────────────────────────────────────
  pres.addSection({ title: "Portada" });
  {
    const s = pres.addSlide({ masterName: "PORTADA", sectionTitle: "Portada" });
    s.addText("Creatividad, ofimática e IA", { placeholder: "title" });
    s.addText("Desarrollo de las habilidades creativas e innovadoras con herramientas ofimáticas y de inteligencia artificial", { placeholder: "body" });
    await iconoEnCirculo(s, { x: 9.7, y: 2.0, d: 3.0, Icon: FaLightbulb, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Bombilla" });
    s.addText("Taller práctico · 5 horas", { ...T, x: M, y: 6.3, w: 6, h: 0.5, fontSize: 16, color: C.accent5, margin: 0 });
    s.addNotes("Bienvenida. Presentarse brevemente y explicar que el taller es práctico: se trabaja sobre problemas de pequeñas empresas y organizaciones, no sobre funciones sueltas de los programas.");
  }

  pres.addSection({ title: "Bloque 1" });
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: "Bloque 1" });
    s.addText("1", { ...T, x: M, y: 1.9, w: 2.4, h: 3.0, fontSize: 200, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText("Activación de la creatividad y brainstorming", { placeholder: "title" });
    s.addText("45 minutos", { placeholder: "body" });
    s.addNotes("Objetivo del bloque: entender la diferencia entre creatividad, innovación y competencia digital, y practicar la primera técnica creativa, el brainstorming, primero entre personas y después con IA.");
  }

  // ── Agenda del bloque ───────────────────────────────────────────────────
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Bloque 1" });
    s.addText("Qué vamos a hacer en este bloque", { placeholder: "title" });
    const pasos = [
      ["0–10", "Creatividad, innovación y competencia digital", "neutro"],
      ["10–15", "Abrir y cerrar: divergir y converger", "neutro"],
      ["15–20", "La técnica: brainstorming", "neutro"],
      ["20–30", "Ejercicio 1: ideas del grupo", "personas"],
      ["30–38", "Ejercicio 1: ideas con IA", "ia"],
      ["38–45", "Comparamos y cerramos", "neutro"],
    ];
    const ancho = (W - 2 * M) / pasos.length;
    const d = 1.25;
    const yc = 2.55;
    linea(s, M + ancho / 2, yc, W - M - ancho / 2, yc, { color: HEX.lt2, width: 4 });
    pasos.forEach(([min, txt, tipo], i) => {
      const cx = M + ancho * i + ancho / 2;
      const relleno = { personas: C.accent1, ia: C.accent2, neutro: C.text2 }[tipo];
      const color = tipo === "personas" ? C.text1 : C.background1;
      s.addShape("ellipse", { x: cx - d / 2, y: yc - d / 2, w: d, h: d, fill: { color: relleno }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(min, { ...T, x: cx - d / 2, y: yc - d / 2, w: d, h: d, fontSize: 18, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: cx - ancho / 2 + 0.1, y: yc + d / 2 + 0.25, w: ancho - 0.2, h: 1.3, fontSize: 16, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    // Leyenda del código de color
    await iconoEnCirculo(s, { x: M, y: 5.3, d: 0.6, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Personas" });
    s.addText("Ámbar: pensamos las personas", { ...T, x: M + 0.75, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    await iconoEnCirculo(s, { x: 5.9, y: 5.3, d: 0.6, Icon: FaRobot, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "IA" });
    s.addText("Verde: trabajamos con la IA", { ...T, x: 6.65, y: 5.3, w: 4.2, h: 0.6, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Mostrar el recorrido del bloque. Explicar el código de color que se usará en todo el curso: en ámbar, lo que piensa el grupo sin ayuda; en verde, lo que se hace con la IA. Las etiquetas de la esquina superior derecha indican siempre los minutos del guion.");
  }

  // ── Minutos 0–10. Introducción ──────────────────────────────────────────
  pres.addSection({ title: "Creatividad e innovación" });
  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Creatividad e innovación" });
    s.addText([
      { text: "Mañana empezáis a trabajar en una empresa. Hay un procedimiento que siempre se ha hecho igual, pero que consume muchísimo tiempo.", options: { breakLine: true } },
      { text: "¿Lo repetiríais o buscaríais una manera mejor?", options: { bold: true, color: C.accent1 } },
    ], { placeholder: "body" });
    etiqueta(s, C, "Min. 0–3 · Todo el grupo", "personas");
    s.addText("Votación a mano alzada", { ...T, x: 1.2, y: 5.35, w: 6, h: 0.45, fontSize: 16, color: C.accent5, margin: 0 });
    const opciones = [[FaRedoAlt, "Lo repito tal cual"], [FaLightbulb, "Busco una manera mejor"]];
    for (const [i, [Icon, txt]] of opciones.entries()) {
      const x = 1.2 + i * 5.0;
      s.addShape("roundRect", { x, y: 5.9, w: 4.6, h: 0.75, rectRadius: 0.375, fill: { color: C.text2 }, line: { type: "none" }, objectName: `Opción ${i + 1}` });
      await iconoEnCirculo(s, { x: x + 0.12, y: 5.98, d: 0.6, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: txt });
      s.addText(txt, { ...T, x: x + 0.85, y: 5.9, w: 3.6, h: 0.75, fontSize: 18, color: C.background1, valign: "middle", margin: 0 });
    }
    s.addNotes("Minutos 0–3. Leer la pregunta y pedir votación a mano alzada.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Creatividad e innovación" });
    s.addText("¿Habéis visto alguna mejora?", { placeholder: "title" });
    etiqueta(s, C, "Min. 0–3 · Voluntarios", "personas");
    await iconoEnCirculo(s, { x: M + 0.3, y: 2.2, d: 2.0, Icon: FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Voluntarios" });
    tarjeta(s, 3.4, 1.9, W - M - 3.4, 2.6);
    s.addText([
      { text: "«Antes se hacía así…", options: { breakLine: true } },
      { text: "y alguien lo cambió por…»" },
    ], { ...T, x: 3.8, y: 1.9, w: W - M - 4.2, h: 2.6, fontSize: 36, italic: true, color: C.text1, valign: "middle", margin: 0 });
    s.addText("Dos o tres voluntarios · una frase cada uno", { ...T, x: 3.4, y: 4.85, w: 8, h: 0.5, fontSize: 20, color: C.text2, margin: 0 });
    s.addNotes("Minutos 0–3. Pedir a dos o tres voluntarios que cuenten en una frase alguna mejora que vieran (o hicieran) en un trabajo anterior. Apuntarlas: servirán de ejemplos durante la explicación de los tres conceptos.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Creatividad e innovación" });
    s.addText("Tres conceptos que no son lo mismo", { placeholder: "title" });
    etiqueta(s, C, "Min. 3–5");
    const conceptos = [
      [FaLightbulb, C.accent1, HEX.dk1, "Creatividad", "Producir ideas nuevas y útiles.", "Imaginar nuevas formas de atender a los clientes."],
      [FaRocket, C.accent3, HEX.lt1, "Innovación", "Poner en práctica una mejora que aporta valor.", "Implantar la cita previa para reducir esperas."],
      [FaLaptop, C.accent4, HEX.lt1, "Competencia digital", "Emplear la tecnología para realizar tareas.", "Usar una hoja de cálculo para organizar turnos."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, relleno, iconoHex, titulo, def, ej]] of conceptos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.65, w, 4.1);
      await iconoEnCirculo(s, { x: x + 0.35, y: 1.95, d: 1.0, Icon, relleno, iconoHex, nombre: titulo });
      s.addText(titulo, { ...T, x: x + 0.35, y: 3.1, w: w - 0.7, h: 0.55, fontSize: 24, bold: true, color: C.text1, margin: 0 });
      s.addText(def, { ...T, x: x + 0.35, y: 3.7, w: w - 0.7, h: 0.9, fontSize: 18, color: C.text1, valign: "top", margin: 0 });
      s.addText([{ text: "Ejemplo: ", options: { bold: true } }, { text: ej }], { ...T, x: x + 0.35, y: 4.65, w: w - 0.7, h: 0.9, fontSize: 15, italic: true, color: C.text2, valign: "top", margin: 0 });
    }
    s.addText("La creatividad no es solo arte: también es mejorar tareas y procesos de trabajo.", { ...T, x: M, y: 6.05, w: W - 2 * M, h: 0.55, fontSize: 19, bold: true, color: C.text1, margin: 0 });
    s.addNotes("Minutos 3–5. Explicar los tres conceptos usando, si es posible, los ejemplos que acaban de dar los voluntarios. Subrayar que la creatividad no se limita a ámbitos artísticos: también consiste en mejorar tareas cotidianas y procesos de trabajo.");
  }

  // Actividad de clasificación
  const leyenda = [["1", "Creatividad", C.accent1, C.text1], ["2", "Innovación", C.accent3, C.background1], ["3", "Competencia digital", C.accent4, C.background1]];
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Creatividad e innovación" });
    s.addText("Actividad: ¿qué es cada situación?", { placeholder: "title" });
    etiqueta(s, C, "Min. 5–10 · Todo el grupo", "personas");
    s.addText("Os leeré seis situaciones. Votad con los dedos:", { ...T, x: M, y: 1.55, w: 10, h: 0.55, fontSize: 22, color: C.text1, margin: 0 });
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    leyenda.forEach(([n, txt, relleno, color], i) => {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.4, w, 3.1);
      s.addShape("ellipse", { x: x + w / 2 - 0.85, y: 2.65, w: 1.7, h: 1.7, fill: { color: relleno }, line: { type: "none" }, objectName: `Opción ${n}` });
      s.addText(n, { ...T, x: x + w / 2 - 0.85, y: 2.65, w: 1.7, h: 1.7, fontSize: 66, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: x + 0.2, y: 4.55, w: w - 0.4, h: 0.7, fontSize: 24, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
    });
    await iconoEnCirculo(s, { x: M, y: 5.85, d: 0.6, Icon: FaHandPaper, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Votación" });
    s.addText("Si hay votos repartidos, una persona de cada opción explica por qué.", { ...T, x: M + 0.8, y: 5.85, w: 11, h: 0.6, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 5–10. Explicar la dinámica: un dedo, creatividad; dos, innovación; tres, competencia digital. Leer cada situación, pedir el voto y, si hay votos repartidos, preguntar a una persona de cada opción. Las respuestas orientativas están en las notas de cada situación.");
  }

  const situaciones = [
    [FaCommentDots, "Una dependienta propone en una reunión que los clientes puedan reservar por WhatsApp.", "Creatividad: es una idea, todavía no se ha aplicado."],
    [FaStore, "La tienda pone en marcha las reservas por WhatsApp y las esperas se reducen.", "Innovación: se ha aplicado y aporta valor."],
    [FaTable, "Un administrativo usa una tabla dinámica para resumir las ventas del mes.", "Competencia digital."],
    [FaCar, "Un taller empieza a enviar al cliente una foto del coche reparado y recibe menos llamadas preguntando.", "Innovación."],
    [FaBoxOpen, "A un empleado se le ocurre usar las cajas de los pedidos como expositor en el mostrador.", "Creatividad; si se pone en práctica y funciona, innovación. Situación discutible a propósito: lo importante es el razonamiento, no acertar."],
    [FaLanguage, "Una camarera usa una IA para traducir la carta al inglés.", "Competencia digital; sería innovación si cambiara cómo se atiende a los clientes extranjeros. Situación discutible a propósito: lo importante es el razonamiento, no acertar."],
  ];
  for (const [i, [Icon, txt, respuesta]] of situaciones.entries()) {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Creatividad e innovación" });
    s.addText(`Situación ${i + 1} de 6`, { placeholder: "title" });
    etiqueta(s, C, "Min. 5–10 · Todo el grupo", "personas");
    tarjeta(s, M, 1.7, W - 2 * M, 2.9);
    await iconoEnCirculo(s, { x: M + 0.45, y: 2.4, d: 1.5, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Situación" });
    s.addText(txt, { ...T, x: M + 2.35, y: 1.7, w: W - 2 * M - 2.75, h: 2.9, fontSize: 30, color: C.text1, valign: "middle", margin: 0 });
    const w = 3.6;
    leyenda.forEach(([n, l, relleno, color], j) => {
      const x = M + j * (w + 0.4);
      s.addShape("ellipse", { x, y: 5.15, w: 0.8, h: 0.8, fill: { color: relleno }, line: { type: "none" }, objectName: `Opción ${n}` });
      s.addText(n, { ...T, x, y: 5.15, w: 0.8, h: 0.8, fontSize: 28, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText(l, { ...T, x: x + 0.95, y: 5.15, w: w - 0.95, h: 0.8, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    });
    s.addNotes(`Respuesta orientativa: ${respuesta}\n\nCriterio para resolver las dudas: ¿es solo una idea o ya se ha puesto en práctica? ¿Aporta valor?`);
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Creatividad e innovación" });
    s.addText("Criterio para resolver las dudas", { placeholder: "title" });
    etiqueta(s, C, "Min. 5–10");
    const cajas = [
      ["Una idea nueva", C.accent1, C.text1],
      ["¿Se ha puesto en práctica?", C.background2, C.text1],
      ["¿Aporta valor?", C.background2, C.text1],
      ["Innovación", C.accent3, C.background1],
    ];
    const w = 2.55;
    const gap = (W - 2 * M - 4 * w) / 3;
    cajas.forEach(([txt, relleno, color], i) => {
      const x = M + i * (w + gap);
      s.addShape("roundRect", { x, y: 2.0, w, h: 1.5, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: txt });
      s.addText(txt, { ...T, x: x + 0.15, y: 2.0, w: w - 0.3, h: 1.5, fontSize: 21, bold: true, color, align: "center", valign: "middle", margin: 0 });
      if (i < 3) {
        linea(s, x + w + 0.12, 2.75, x + w + gap - 0.12, 2.75, { color: HEX.dk2, width: 2.5, endArrowType: "triangle" });
        s.addText("Sí", { ...T, x: x + w, y: 2.25, w: gap, h: 0.4, fontSize: 14, bold: true, color: C.text2, align: "center", margin: 0 });
      }
    });
    // Rama «no»
    const x2 = M + (w + gap);
    linea(s, x2 + w / 2, 3.55, x2 + w / 2, 4.15, { color: HEX.dk2, width: 2.5, endArrowType: "triangle" });
    s.addText([{ text: "No: ", options: { bold: true } }, { text: "sigue siendo creatividad" }], { ...T, x: x2 - 0.4, y: 4.2, w: w + 0.8, h: 0.5, fontSize: 17, color: C.text1, align: "center", margin: 0 });
    tarjeta(s, M, 5.0, W - 2 * M, 1.05);
    await iconoEnCirculo(s, { x: M + 0.25, y: 5.17, d: 0.7, Icon: FaLaptop, relleno: C.accent4, iconoHex: HEX.lt1, nombre: "Competencia digital" });
    s.addText("Usar una herramienta digital sin cambiar cómo se trabaja es competencia digital.", { ...T, x: M + 1.2, y: 5.0, w: W - 2 * M - 1.5, h: 1.05, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    s.addText("Lo importante es el razonamiento, no acertar.", { ...T, x: M, y: 6.2, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Usar esta diapositiva cuando haya votos repartidos o al terminar las seis situaciones. Las situaciones 5 y 6 son discutibles a propósito.");
  }

  // ── Minutos 10–15. Divergir y converger ─────────────────────────────────
  pres.addSection({ title: "Divergir y converger" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Divergir y converger" });
    s.addText("¿Para qué sirve un clip?", { placeholder: "title" });
    etiqueta(s, C, "Min. 10–12 · Individual", "personas");
    await iconoEnCirculo(s, { x: 1.0, y: 1.8, d: 3.6, Icon: FaPaperclip, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Clip" });
    const filas = [
      [FaRegClock, "90 segundos"],
      [FaVolumeMute, "En silencio"],
      [FaPen, "Por escrito: todos los usos que se os ocurran"],
    ];
    for (const [i, [Icon, txt]] of filas.entries()) {
      const y = 2.0 + i * 1.15;
      await iconoEnCirculo(s, { x: 5.5, y, d: 0.85, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: txt });
      s.addText(txt, { ...T, x: 6.6, y, w: 6.1, h: 0.85, fontSize: 24, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addText("Después: ¿cuántos usos habéis escrito?", { ...T, x: 5.5, y: 5.65, w: 7.2, h: 0.6, fontSize: 20, bold: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 10–12. Cada persona, en silencio y por escrito, anota en 90 segundos todos los usos que se le ocurran para un clip. Después, cada una dice cuántos ha escrito y quien tenga más lee su lista.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Divergir y converger" });
    s.addText("Y ahora, elegimos uno", { placeholder: "title" });
    etiqueta(s, C, "Min. 12–14 · Todo el grupo", "personas");
    tarjeta(s, M, 1.8, W - 2 * M, 3.0);
    await iconoEnCirculo(s, { x: M + 0.5, y: 2.55, d: 1.5, Icon: FaShoppingCart, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Producto" });
    s.addText("De todos esos usos, ¿cuál podría convertirse en un producto que alguien compraría?", { ...T, x: M + 2.4, y: 1.8, w: W - 2 * M - 2.8, h: 3.0, fontSize: 32, color: C.text1, valign: "middle", margin: 0 });
    await iconoEnCirculo(s, { x: M, y: 5.25, d: 0.6, Icon: FaHandPaper, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Votación" });
    s.addText("Votación a mano alzada", { ...T, x: M + 0.8, y: 5.25, w: 8, h: 0.6, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes("Minutos 12–14. Votar un solo uso. No explicar todavía la teoría: la conclusión viene en la diapositiva siguiente, sobre lo que acaban de hacer.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Divergir y converger" });
    s.addText("Primero abrir, después cerrar", { placeholder: "title" });
    etiqueta(s, C, "Min. 14–15");
    // Diagrama: un reto se abre en muchas ideas y se cierra en una.
    const x0 = 1.1, xm = 4.5, x1 = 7.8, yc = 3.25;
    const ys = [1.85, 2.32, 2.79, 3.25, 3.71, 4.18, 4.65];
    ys.forEach((y) => {
      linea(s, x0, yc, xm, y, { color: HEX.accent5, width: 1.5 });
      linea(s, xm, y, x1, yc, { color: HEX.accent5, width: 1.5 });
    });
    ys.forEach((y) => s.addShape("ellipse", { x: xm - 0.16, y: y - 0.16, w: 0.32, h: 0.32, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Idea" }));
    s.addShape("ellipse", { x: x0 - 0.25, y: yc - 0.25, w: 0.5, h: 0.5, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Reto" });
    await iconoEnCirculo(s, { x: x1 - 0.45, y: yc - 0.45, d: 0.9, Icon: FaStar, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Idea elegida" });
    s.addText("Reto", { ...T, x: x0 - 0.6, y: yc + 0.35, w: 1.2, h: 0.4, fontSize: 15, bold: true, color: C.text1, align: "center", margin: 0 });
    s.addText([{ text: "Divergente", options: { bold: true, fontSize: 21, breakLine: true } }, { text: "Proponer tantas soluciones distintas como sea posible, sin juzgar." }],
      { ...T, x: M, y: 5.05, w: 3.7, h: 1.2, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    s.addText([{ text: "Convergente", options: { bold: true, fontSize: 21, breakLine: true } }, { text: "Comparar coste, viabilidad e impacto para elegir qué probar." }],
      { ...T, x: 4.6, y: 5.05, w: 3.7, h: 1.2, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    tarjeta(s, 8.85, 1.6, W - M - 8.85, 4.65);
    s.addText([
      { text: "En este curso", options: { bold: true, fontSize: 21, breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Abren el abanico:", options: { bold: true, color: C.text2, breakLine: true } },
      { text: "Brainstorming", options: { bullet: true, breakLine: true } },
      { text: "SCAMPER", options: { bullet: true, breakLine: true } },
      { text: "Provocación", options: { bullet: true, breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "Lo cierra:", options: { bold: true, color: C.text2, breakLine: true } },
      { text: "La matriz de decisión (bloque 3)", options: { bullet: true } },
    ], { ...T, x: 9.15, y: 1.85, w: W - M - 9.45, h: 4.2, fontSize: 18, color: C.text1, valign: "top", margin: 0, paraSpaceAfter: 4 });
    s.addText("Si se mezclan los dos pasos, se juzga demasiado pronto y salen pocas ideas.", { ...T, x: M, y: 6.35, w: W - 2 * M, h: 0.5, fontSize: 18, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Minutos 14–15. Lo que acaban de hacer con el clip: primero pensamiento divergente (muchos usos, sin juzgar) y después convergente (elegir uno con criterio). Las tres técnicas del curso sirven para abrir el abanico; la matriz del bloque 3 sirve para cerrarlo.");
  }

  // ── Minutos 15–20. Brainstorming ────────────────────────────────────────
  pres.addSection({ title: "Brainstorming" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Brainstorming" });
    s.addText("La regla de todo el curso", { placeholder: "title" });
    etiqueta(s, C, "Min. 15–20");
    const pasos = [[FaUsers, C.accent1, HEX.dk1, "1", "Primero, las personas"], [FaRobot, C.accent2, HEX.lt1, "2", "Después, la IA"]];
    for (const [i, [Icon, relleno, iconoHex, n, txt]] of pasos.entries()) {
      const x = M + i * 6.4;
      tarjeta(s, x, 1.7, 5.7, 2.0);
      await iconoEnCirculo(s, { x: x + 0.35, y: 2.0, d: 1.4, Icon, relleno, iconoHex, nombre: txt });
      s.addText([{ text: n, options: { color: C.accent5, breakLine: true } }, { text: txt }], { ...T, x: x + 2.0, y: 1.7, w: 3.5, h: 2.0, fontSize: 28, bold: true, color: C.text1, valign: "middle", margin: 0 });
    }
    linea(s, M + 5.8, 2.7, M + 6.3, 2.7, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    const razones = [
      [FaAnchor, "Si la IA va primero, el grupo se «ancla» en sus ideas y deja de pensar por su cuenta."],
      [FaBalanceScale, "Así podemos comparar qué aporta cada uno."],
    ];
    for (const [i, [Icon, txt]] of razones.entries()) {
      const y = 4.3 + i * 1.0;
      await iconoEnCirculo(s, { x: M, y, d: 0.75, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Razón" });
      s.addText(txt, { ...T, x: M + 1.0, y, w: 11, h: 0.75, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addNotes("Regla para todo el curso: en cada técnica, primero piensan las personas y después se pide ayuda a la IA. Si la IA va primero, el grupo se ancla en sus propuestas y deja de pensar por su cuenta. Además, así se puede comparar qué aporta cada uno.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Brainstorming" });
    s.addText("Nuestro ejemplo: una peluquería de barrio", { placeholder: "title" });
    etiqueta(s, C, "Min. 15–20");
    await iconoEnCirculo(s, { x: M, y: 1.7, d: 1.2, Icon: FaCut, relleno: C.text1, iconoHex: HEX.accent1, nombre: "Peluquería" });
    s.addText("Da las citas solo por teléfono", { ...T, x: M + 1.45, y: 1.7, w: 9, h: 1.2, fontSize: 26, bold: true, color: C.text1, valign: "middle", margin: 0 });
    const problemas = [
      [FaPhone, "El teléfono suena mientras se atiende a los clientes."],
      [FaCalendarTimes, "Hay clientes que olvidan su cita."],
      [FaChair, "Los lunes por la mañana está vacía."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, txt]] of problemas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 3.25, w, 2.35);
      await iconoEnCirculo(s, { x: x + 0.35, y: 3.55, d: 0.9, Icon, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Problema" });
      s.addText(txt, { ...T, x: x + 0.35, y: 4.55, w: w - 0.7, h: 0.95, fontSize: 19, color: C.text1, valign: "top", margin: 0 });
    }
    s.addText("La usaremos para explicar las tres técnicas: brainstorming, SCAMPER y provocación.", { ...T, x: M, y: 5.95, w: W - 2 * M, h: 0.5, fontSize: 18, italic: true, color: C.text2, margin: 0 });
    s.addNotes("Ejemplo que acompaña a las tres técnicas del curso. Es ajeno a los ejercicios: usar siempre el mismo ejemplo deja ver qué tipo de ideas produce cada técnica.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Brainstorming" });
    s.addText("Brainstorming: cuatro reglas", { placeholder: "title" });
    etiqueta(s, C, "Min. 15–20");
    s.addText("Generar en grupo el mayor número posible de ideas sobre un reto, dejando el juicio para después.", { ...T, x: M, y: 1.5, w: W - 2 * M, h: 0.6, fontSize: 20, italic: true, color: C.text2, margin: 0 });
    const reglas = [
      "Cantidad antes que calidad.",
      "No se critica ninguna idea durante la sesión.",
      "Se vale construir sobre la idea de otra persona: «y además…».",
      "Las ideas disparatadas son bienvenidas: a menudo llevan a ideas buenas.",
    ];
    const gap = 0.4;
    const w = (W - 2 * M - gap) / 2;
    reglas.forEach((txt, i) => {
      const x = M + (i % 2) * (w + gap);
      const y = 2.4 + Math.floor(i / 2) * 2.0;
      tarjeta(s, x, y, w, 1.7);
      s.addShape("ellipse", { x: x + 0.3, y: y + 0.4, w: 0.9, h: 0.9, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Regla ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: x + 0.3, y: y + 0.4, w: 0.9, h: 0.9, fontSize: 30, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: x + 1.45, y, w: w - 1.7, h: 1.7, fontSize: 21, color: C.text1, valign: "middle", margin: 0 });
    });
    s.addNotes("Minutos 15–20. Qué es el brainstorming y sus cuatro reglas. La regla 3 (construir sobre la idea de otra persona) se aplicará después también a la combinación de ideas del grupo y de la IA.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Brainstorming" });
    s.addText("Ejemplo: brainstorming en la peluquería", { placeholder: "title" });
    etiqueta(s, C, "Min. 15–20");
    s.addText("¿Cómo podríamos conseguir que la peluquería tenga clientes los lunes por la mañana?", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.6, fontSize: 20, italic: true, bold: true, color: C.text2, margin: 0 });
    const ideas = [
      "Descuento para quien reserve los lunes.",
      "Lunes reservado a personas mayores, con café incluido.",
      "Cortes gratis a estudiantes de peluquería, que practican supervisados.",
      "Ofrecer el lunes a domicilio para residencias cercanas.",
      "Sorteo mensual entre los clientes del lunes.",
    ];
    ideas.forEach((txt, i) => {
      const y = 2.3 + i * 0.82;
      tarjeta(s, M, y, 6.5, 0.66, C.background2, "Idea");
      s.addText(txt, { ...T, x: M + 0.25, y, w: 6.1, h: 0.66, fontSize: 16, color: C.text1, valign: "middle", margin: 0 });
    });
    const xr = 7.55, wr = W - M - xr;
    s.addShape("roundRect", { x: xr, y: 2.3, w: wr, h: 1.45, rectRadius: 0.15, fill: { color: C.accent3 }, line: { type: "none" }, objectName: "Idea disparatada" });
    s.addText([{ text: "Idea disparatada", options: { bold: true, fontSize: 15, breakLine: true } }, { text: "Cerrar los sábados y abrir los lunes." }],
      { ...T, x: xr + 0.3, y: 2.3, w: wr - 0.6, h: 1.45, fontSize: 21, color: C.background1, valign: "middle", margin: 0 });
    linea(s, xr + wr / 2, 3.85, xr + wr / 2, 4.35, { color: HEX.dk2, width: 3, endArrowType: "triangle" });
    s.addShape("roundRect", { x: xr, y: 4.45, w: wr, h: 1.81, rectRadius: 0.15, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Idea sensata" });
    s.addText([{ text: "Construyendo sobre ella", options: { bold: true, fontSize: 15, color: C.accent1, breakLine: true } }, { text: "Repartir la demanda: precio más bajo en los días flojos y más alto en los de más demanda." }],
      { ...T, x: xr + 0.3, y: 4.45, w: wr - 0.6, h: 1.81, fontSize: 18, color: C.background1, valign: "middle", margin: 0 });
    s.addNotes("Lanzar las ideas a buen ritmo para mostrar cómo funciona. Terminar con la idea disparatada y mostrar que, construyendo sobre ella, se llega a una idea sensata: por eso las ideas disparatadas son bienvenidas.");
  }

  // ── Minutos 20–38. Ejercicio 1 ──────────────────────────────────────────
  pres.addSection({ title: "Ejercicio 1" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Ejercicio 1" });
    s.addText("Ejercicio 1: brainstorming entre todos", { placeholder: "title" });
    etiqueta(s, C, "Min. 20–30 · Sin IA", "personas");
    s.addShape("roundRect", { x: M, y: 1.6, w: W - 2 * M, h: 1.75, rectRadius: 0.15, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Reto" });
    s.addText([{ text: "El reto", options: { bold: true, fontSize: 15, color: C.accent1, italic: false, breakLine: true } }, { text: "¿Cómo podríamos conseguir que más personas pidan información sobre los cursos de una academia de formación que recibe pocas solicitudes?" }],
      { ...T, x: M + 0.4, y: 1.6, w: W - 2 * M - 0.8, h: 1.75, fontSize: 23, italic: true, color: C.background1, valign: "middle", margin: 0 });
    const filas = [
      [FaSyncAlt, "Turno en rueda: habla todo el mundo. Si no tienes idea, di «paso»."],
      [FaPen, "Se apuntan todas las ideas, numeradas y sin comentarlas."],
      [FaCalculator, "Al final, contamos cuántas ideas hemos generado."],
    ];
    for (const [i, [Icon, txt]] of filas.entries()) {
      const y = 3.75 + i * 0.95;
      await iconoEnCirculo(s, { x: M, y, d: 0.75, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Instrucción" });
      s.addText(txt, { ...T, x: M + 1.0, y, w: 11, h: 0.75, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addNotes("Minutos 20–30. Entre todo el grupo, sin IA. Dar el turno en rueda para que participen todas las personas y no solo las más extrovertidas; quien no tenga idea dice «paso» y se continúa. Apuntar todas las ideas numeradas en la pizarra o en un documento compartido, sin comentarlas. Al final, contar el total: se usará en la comparación.");
  }

  const cajaPrompt = (s, lineas, { x, y, w, h, fontSize = 14 }) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Prompt" });
    const runs = lineas.map((l, i) => {
      const ultimo = i === lineas.length - 1;
      const marcador = /^\[.*\]$/.test(l.trim());
      return { text: l === "" ? " " : l, options: { breakLine: !ultimo, color: marcador ? C.accent1 : C.background1, bold: marcador } };
    });
    s.addText(runs, { ...T, x: x + 0.3, y: y + 0.2, w: w - 0.6, h: h - 0.4, fontSize, fontFace: "Courier New", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
  };

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Ejercicio 1" });
    s.addText("Ronda con IA: el prompt", { placeholder: "title" });
    etiqueta(s, C, "Min. 30–38 · Con IA", "ia");
    cajaPrompt(s, [
      "Actúa como facilitador experto en sesiones de",
      "brainstorming para pequeñas empresas.",
      "",
      "Contexto: una academia de formación con cinco",
      "trabajadores y poco presupuesto recibe pocas",
      "solicitudes de información de posibles alumnos.",
      "",
      "Reto: ¿cómo podríamos conseguir que más personas",
      "pidan información sobre nuestros cursos?",
      "",
      "Nuestro grupo ya ha propuesto estas ideas:",
      "[pegar la lista del grupo]",
      "",
      "Tu tarea:",
      "1. Propón 15 ideas nuevas que no repitan ni",
      "   reformulen las nuestras.",
      "2. Repártelas así: 5 de bajo coste que puedan",
      "   aplicarse esta semana, 5 digitales y 5 poco",
      "   convencionales o atrevidas.",
      "3. Escribe una sola línea por idea, sin explicaciones.",
      "4. No inventes cifras ni resultados.",
    ], { x: M, y: 1.45, w: 7.5, h: 5.3 });
    const xr = 8.5, wr = W - M - xr;
    s.addText("Por qué funciona", { ...T, x: xr, y: 1.5, w: wr, h: 0.55, fontSize: 22, bold: true, color: C.text1, margin: 0 });
    const razones = [
      "Da un rol y un contexto concretos.",
      "Incluye nuestras ideas para que la IA no las repita.",
      "Pide categorías para forzar la variedad: sin ellas, la IA da ideas muy parecidas.",
      "Formato corto, para leerlo en voz alta.",
    ];
    razones.forEach((txt, i) => {
      const y = 2.25 + i * 1.12;
      s.addShape("ellipse", { x: xr, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: C.accent2 }, line: { type: "none" }, objectName: `Razón ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: xr, y: y + 0.05, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: xr + 0.7, y, w: wr - 0.7, h: 1.0, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    });
    s.addNotes("Minutos 30–38. Proyectar la IA y pegar la lista de ideas del grupo en el lugar indicado. Leer en voz alta las propuestas de la IA y comentar cuáles sorprenden y cuáles son genéricas o repiten lo ya dicho con otras palabras. El texto del prompt para copiar está en el guion docente.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Ejercicio 1" });
    s.addText("Segundo prompt: combinar ideas", { placeholder: "title" });
    etiqueta(s, C, "Min. 30–38 · Con IA", "ia");
    const piezas = [
      [FaUsers, C.accent1, HEX.dk1, "Nuestras ideas"],
      [FaRobot, C.accent2, HEX.lt1, "Ideas de la IA"],
      [FaLightbulb, C.accent3, HEX.lt1, "Ideas mejores"],
    ];
    const d = 1.3;
    const xs = [2.2, 5.9, 9.6];
    for (const [i, [Icon, relleno, iconoHex, txt]] of piezas.entries()) {
      await iconoEnCirculo(s, { x: xs[i], y: 1.55, d, Icon, relleno, iconoHex, nombre: txt });
      s.addText(txt, { ...T, x: xs[i] - 0.6, y: 2.95, w: d + 1.2, h: 0.45, fontSize: 17, bold: true, color: C.text1, align: "center", margin: 0 });
    }
    s.addText("+", { ...T, x: xs[0] + d, y: 1.55, w: xs[1] - xs[0] - d, h: d, fontSize: 48, bold: true, color: C.text2, align: "center", valign: "middle", margin: 0 });
    s.addText("=", { ...T, x: xs[1] + d, y: 1.55, w: xs[2] - xs[1] - d, h: d, fontSize: 48, bold: true, color: C.text2, align: "center", valign: "middle", margin: 0 });
    cajaPrompt(s, [
      "Elige tres ideas de nuestro grupo y combina cada una con una de",
      "las tuyas para crear tres ideas mejores que las originales.",
      "Indica de qué dos ideas parte cada combinación y qué mejora aporta.",
    ], { x: M, y: 3.7, w: W - 2 * M, h: 1.85, fontSize: 18 });
    s.addText("Es la regla 3 del brainstorming —construir sobre otras ideas— aplicada a personas + IA.", { ...T, x: M, y: 5.85, w: W - 2 * M, h: 0.5, fontSize: 18, italic: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 30–38. Lanzar este segundo prompt en la misma conversación con la IA, a continuación del primero.");
  }

  // ── Minutos 38–45. Comparación y cierre ─────────────────────────────────
  pres.addSection({ title: "Comparación y cierre" });
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparación y cierre" });
    s.addText("Votad las tres ideas más originales", { placeholder: "title" });
    etiqueta(s, C, "Min. 38–45 · Todo el grupo", "personas");
    const filas = [
      [FaCheck, "Cada persona marca tres ideas."],
      [FaBalanceScale, "Sin fijarse en si vienen del grupo o de la IA."],
    ];
    for (const [i, [Icon, txt]] of filas.entries()) {
      const y = 1.9 + i * 1.2;
      await iconoEnCirculo(s, { x: M, y, d: 0.85, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Instrucción" });
      s.addText(txt, { ...T, x: M + 1.1, y, w: 4.5, h: 0.85, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
    const cab = (txt, relleno, color) => ({ text: txt, options: { bold: true, fill: { color: relleno }, color, align: "center" } });
    const celda = (txt, opts = {}) => ({ text: txt, options: { color: C.text1, ...opts } });
    s.addTable([
      [cab("", C.background1, C.text1), cab("Sin IA", C.accent1, C.text1), cab("Con IA", C.accent2, C.background1)],
      [celda("Número de ideas", { bold: true }), celda(""), celda("")],
      [celda("Ideas entre las más votadas", { bold: true }), celda(""), celda("")],
    ], { x: 6.5, y: 1.9, w: W - M - 6.5, colW: [2.83, 1.6, 1.6], rowH: [0.8, 1.3, 1.3], fontSize: 18, valign: "middle", border: { type: "solid", pt: 1, color: HEX.accent5 }, margin: 0.1 });
    s.addText("Rellenamos la tabla entre todos con el recuento.", { ...T, x: 6.5, y: 5.6, w: W - M - 6.5, h: 0.5, fontSize: 16, italic: true, color: C.text2, margin: 0 });
    s.addNotes("Minutos 38–45. Cada persona marca las tres ideas que le parecen más originales, sin fijarse en si vienen del grupo o de la IA. Después, contar y rellenar la tabla: cuántas ideas salieron sin IA y con IA, y cuántas de las más votadas son de cada origen.");
  }

  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Comparación y cierre" });
    s.addText("¿Qué ha aportado la IA?", { placeholder: "title" });
    etiqueta(s, C, "Min. 38–45 · Todo el grupo", "personas");
    const preguntas = [
      [FaBalanceScale, "¿La IA ha dado ideas mejores o solo más ideas?"],
      [FaPuzzlePiece, "¿Las combinaciones han mejorado las ideas de partida?"],
      [FaCoins, "¿Qué propuestas podrían aplicarse con pocos recursos?"],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, txt]] of preguntas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.75, w, 3.9);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.65, y: 2.15, d: 1.3, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Pregunta" });
      s.addText(txt, { ...T, x: x + 0.35, y: 3.75, w: w - 0.7, h: 1.7, fontSize: 24, color: C.text1, align: "center", valign: "top", margin: 0 });
    }
    s.addNotes("No adelantar la conclusión: puede salir que la IA aporta más cantidad pero menos originalidad, o lo contrario. Lo importante es que el grupo lo compruebe con sus propios datos de la tabla.");
  }

  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Comparación y cierre" });
    s.addText("Idea clave del bloque 1", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "La creatividad produce posibilidades.", options: { breakLine: true } },
      { text: "La innovación exige elegirlas, probarlas y convertirlas en mejoras reales.", options: { color: C.accent1 } },
    ], { placeholder: "body" });
    s.addNotes("Conclusión del bloque. Enlazar con el bloque 2: ahora se aplicarán dos técnicas más estructuradas, SCAMPER y la provocación, por parejas.");
  }

  const destino = await guardar(pres, "bloque1.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
