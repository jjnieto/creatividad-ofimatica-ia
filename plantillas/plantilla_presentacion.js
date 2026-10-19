// Primera versión de presentacion_proyecto.pptx: la plantilla de tres diapositivas del bloque 4
// (problema, solución y beneficios). Usa el tema y las piezas de ../diapositivas/comun.js.
// Como con las diapositivas, el .pptx manda: si ya existe, el script no lo sobrescribe.
// Uso: node plantilla_presentacion.js [ruta_salida]   (requiere npm install en ../diapositivas)
const fs = require("fs");
const path = require("path");

const DIAPOS = path.join(__dirname, "..", "diapositivas");
const requireDiapos = require("module").createRequire(path.join(DIAPOS, "comun.js"));
const { FaExclamationCircle, FaLightbulb, FaChartLine, FaExclamationTriangle, FaTools } = requireDiapos("react-icons/fa");
const { THEME, HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo } = requireDiapos("./comun.js");
const { applyTheme } = requireDiapos("./apply_theme.js");

const SALIDA = process.argv[2] || path.join(__dirname, "presentacion_proyecto.pptx");
const T = { isTextBox: true };
const PIE_Y = 6.95;

const NOTAS_CRITERIOS =
  "Criterios para las tres diapositivas: una idea central por diapositiva, poco texto, títulos claros, " +
  "gráficos simples y ningún resultado sin justificar. Los textos de los recuadros son pistas: desaparecen al escribir " +
  "y no se ven al proyectar. Simulación formativa: sin datos personales ni cifras inventadas.";

async function main() {
  if (fs.existsSync(SALIDA)) {
    console.error(`${SALIDA} ya existe: no se sobrescribe. Pasa otra ruta como argumento.`);
    process.exit(1);
  }
  const { pres, C } = crearPresentacion({ titulo: "Presentación del proyecto", pie: "Simulación formativa" });
  pres.title = "Presentación del proyecto";

  // Placeholders con texto de ayuda: PowerPoint lo muestra en gris al editar y no al proyectar.
  const ph = (name, type, x, y, w, h, prompt, o = {}) => ({
    placeholder: { options: { name, type, x, y, w, h, fontSize: 16, color: C.text1, valign: "top", margin: 0, ...o }, text: prompt },
  });
  const titulo = (prompt) => ph("title", "title", M, 0.45, 9.6, 0.85, prompt, { fontSize: 32, bold: true, align: "left", valign: "middle" });
  const pie = [
    { text: { text: "Simulación formativa", options: { x: M, y: PIE_Y, w: 9, h: 0.35, fontSize: 11, color: C.accent5, margin: 0 } } },
  ];
  const numero = { x: 12.13, y: PIE_Y, w: 0.6, h: 0.35, fontSize: 11, color: HEX.accent5, align: "right" };

  // Geometría compartida entre layout (placeholders) y diapositiva (tarjetas y rótulos).
  const G = {
    problema: { izq: { x: M, y: 1.7, w: 7.6, h: 4.9 }, der: { x: M + 7.6 + 0.4, y: 1.7, w: W - 2 * M - 8.0, h: 4.9 } },
    solucion: { y: 1.7, h: 3.05, gap: 0.4, herr: { y: 5.05, h: 1.55 } },
    beneficios: { y: 1.7, h: 4.9, gap: 0.4 },
  };
  const anchoPaso = (W - 2 * M - 2 * G.solucion.gap) / 3;
  const anchoBen = (W - 2 * M - 2 * G.beneficios.gap) / 3;
  const altoInd = (G.beneficios.h - G.beneficios.gap) / 2;

  pres.defineSlideMaster({
    title: "PROBLEMA",
    background: { color: C.background1 },
    objects: [
      titulo("Título: el problema en una frase"),
      ph("situacion", "body", G.problema.izq.x + 1.35, 2.35, G.problema.izq.w - 1.65, 1.7,
        "Qué pasa y a quién afecta, en una o dos frases. Describid la situación, no la solución."),
      ph("importancia", "body", G.problema.izq.x + 1.35, 4.75, G.problema.izq.w - 1.65, 1.6,
        "Qué se pierde hoy: tiempo, clientes, oportunidades, errores… Sin cifras inventadas."),
      ph("imagen", "obj", G.problema.der.x + 0.25, G.problema.der.y + 0.25, G.problema.der.w - 0.5, G.problema.der.h - 0.5,
        "Opcional: una imagen o un gráfico sencillo que muestre el problema", { fontSize: 14, color: C.accent5, align: "center", valign: "middle" }),
      ...pie,
    ],
    slideNumber: numero,
  });

  pres.defineSlideMaster({
    title: "SOLUCION",
    background: { color: C.background1 },
    objects: [
      titulo("Título: la solución en una frase"),
      ...[1, 2, 3].map((n, i) => ph(`paso${n}`, "body", M + i * (anchoPaso + G.solucion.gap) + 0.3, G.solucion.y + 1.25, anchoPaso - 0.6, G.solucion.h - 1.5,
        n === 1 ? "Paso 1: qué ocurre primero, quién lo hace y con qué herramienta" : `Paso ${n}: qué ocurre después`)),
      ph("herramientas", "body", M + 1.35, G.solucion.herr.y + 0.25, W - 2 * M - 1.65, G.solucion.herr.h - 0.5,
        "Herramientas: ofimáticas y de IA. Qué revisa siempre una persona.", { valign: "middle" }),
      ...pie,
    ],
    slideNumber: numero,
  });

  pres.defineSlideMaster({
    title: "BENEFICIOS",
    background: { color: C.background1 },
    objects: [
      titulo("Título: el beneficio principal en una frase"),
      ph("resultados", "body", M + 0.3, G.beneficios.y + 1.25, anchoBen - 0.6, G.beneficios.h - 1.5,
        "Qué mejoraría y para quién. Lo que esperáis conseguir, no lo que ya ha pasado."),
      ...[1, 2].map((n, i) => ph(`indicador${n}`, "body", M + anchoBen + G.beneficios.gap + 0.3, G.beneficios.y + 0.75 + i * (altoInd + G.beneficios.gap), anchoBen - 0.6, altoInd - 0.95,
        "Qué se mide y cómo: antes y después de un mes de prueba", { fontSize: 14 })),
      ph("precauciones", "body", M + 2 * (anchoBen + G.beneficios.gap) + 0.3, G.beneficios.y + 1.25, anchoBen - 0.6, G.beneficios.h - 1.5,
        "Principal riesgo y cómo se evita. Qué supervisa siempre una persona."),
      ...pie,
    ],
    slideNumber: numero,
  });

  const tarjeta = (s, { x, y, w, h }, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });
  const rotulo = (s, t, x, y, w, color = C.text1) =>
    s.addText(t, { ...T, x, y, w, h: 0.4, fontSize: 18, bold: true, color, valign: "middle", margin: 0 });

  pres.addSection({ title: "Presentación" });

  // ── 1. El problema ────────────────────────────────────────────────────────
  {
    const s = pres.addSlide({ masterName: "PROBLEMA", sectionTitle: "Presentación" });
    etiqueta(s, C, "1 · El problema", "personas");
    const { izq, der } = G.problema;
    tarjeta(s, izq, C.background2, "Tarjeta del problema");
    await iconoEnCirculo(s, { x: izq.x + 0.3, y: 1.95, d: 0.8, Icon: FaExclamationCircle, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Icono problema" });
    rotulo(s, "Qué pasa y a quién afecta", izq.x + 1.35, 1.9, izq.w - 1.65);
    await iconoEnCirculo(s, { x: izq.x + 0.3, y: 4.35, d: 0.8, Icon: FaExclamationTriangle, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Icono importancia" });
    rotulo(s, "Por qué importa", izq.x + 1.35, 4.3, izq.w - 1.65);
    s.addShape("roundRect", { ...der, rectRadius: 0.15, fill: { color: C.background1 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco para imagen" });
    s.addNotes("Diapositiva 1. El problema: la situación y por qué importa. " + NOTAS_CRITERIOS);
  }

  // ── 2. La solución ────────────────────────────────────────────────────────
  {
    const s = pres.addSlide({ masterName: "SOLUCION", sectionTitle: "Presentación" });
    etiqueta(s, C, "2 · La solución", "personas");
    for (let i = 0; i < 3; i++) {
      const x = M + i * (anchoPaso + G.solucion.gap);
      tarjeta(s, { x, y: G.solucion.y, w: anchoPaso, h: G.solucion.h }, C.background2, `Paso ${i + 1}`);
      s.addShape("ellipse", { x: x + 0.3, y: G.solucion.y + 0.3, w: 0.75, h: 0.75, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Número ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: x + 0.3, y: G.solucion.y + 0.3, w: 0.75, h: 0.75, fontSize: 24, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
    }
    const herr = { x: M, y: G.solucion.herr.y, w: W - 2 * M, h: G.solucion.herr.h };
    tarjeta(s, herr, C.background2, "Tarjeta de herramientas");
    await iconoEnCirculo(s, { x: M + 0.3, y: herr.y + (herr.h - 0.8) / 2, d: 0.8, Icon: FaTools, relleno: C.accent2, iconoHex: HEX.lt1, nombre: "Icono herramientas" });
    s.addNotes("Diapositiva 2. La solución: cómo funciona, en tres pasos, y con qué herramientas. " + NOTAS_CRITERIOS);
  }

  // ── 3. Los beneficios ─────────────────────────────────────────────────────
  {
    const s = pres.addSlide({ masterName: "BENEFICIOS", sectionTitle: "Presentación" });
    etiqueta(s, C, "3 · Los beneficios", "personas");
    const { y, h, gap } = G.beneficios;
    const xs = [0, 1, 2].map((i) => M + i * (anchoBen + gap));

    tarjeta(s, { x: xs[0], y, w: anchoBen, h }, C.background2, "Resultados esperados");
    await iconoEnCirculo(s, { x: xs[0] + 0.3, y: y + 0.3, d: 0.75, Icon: FaLightbulb, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Icono resultados" });
    rotulo(s, "Resultados esperados", xs[0] + 1.2, y + 0.47, anchoBen - 1.4);

    for (let i = 0; i < 2; i++) {
      const yi = y + i * (altoInd + gap);
      tarjeta(s, { x: xs[1], y: yi, w: anchoBen, h: altoInd }, C.background2, `Indicador ${i + 1}`);
      await iconoEnCirculo(s, { x: xs[1] + 0.3, y: yi + 0.2, d: 0.5, Icon: FaChartLine, relleno: C.accent1, iconoHex: HEX.dk1, nombre: `Icono indicador ${i + 1}` });
      rotulo(s, `Indicador ${i + 1}`, xs[1] + 0.95, yi + 0.25, anchoBen - 1.2);
    }

    tarjeta(s, { x: xs[2], y, w: anchoBen, h }, C.background2, "Precauciones");
    await iconoEnCirculo(s, { x: xs[2] + 0.3, y: y + 0.3, d: 0.75, Icon: FaExclamationTriangle, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Icono precauciones" });
    rotulo(s, "Precauciones", xs[2] + 1.2, y + 0.47, anchoBen - 1.4);

    s.addNotes("Diapositiva 3. Los beneficios: resultados esperados, los dos indicadores del documento y las principales precauciones. " + NOTAS_CRITERIOS);
  }

  await pres.writeFile({ fileName: SALIDA });
  await applyTheme(SALIDA, THEME);
  console.log(`Guardado ${SALIDA}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
