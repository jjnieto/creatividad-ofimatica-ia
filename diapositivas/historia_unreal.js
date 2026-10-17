// Presentación independiente: «Historia Unreal». Apoyo a la regla «primero las personas, después la IA» (bloque 1).
// Uso: node historia_unreal.js  →  genera historia_unreal.pptx (solo si no existe todavía).

const {
  FaLightbulb, FaSun, FaCubes, FaMountain, FaUsers, FaRobot, FaQuoteLeft, FaCopy, FaSlidersH, FaForward,
  FaTrophy, FaPalette, FaFlask, FaBookOpen, FaImage, FaBalanceScale, FaGamepad, FaFileAlt,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

async function main() {
  const { pres, C } = crearPresentacion({ titulo: "Historia Unreal: misma herramienta, mismo resultado", pie: "Historia Unreal · Misma herramienta, mismo resultado" });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });

  // Miniatura estilizada de un «juego»: cielo, sol, montaña y suelo. Dibujo propio, sin capturas con derechos.
  const miniatura = (s, x, y, w, h, colores) => {
    const [cielo, sol, montana, suelo] = colores;
    s.addShape("rect", { x, y, w, h, fill: { color: cielo }, line: { type: "none" }, objectName: "Miniatura" });
    s.addShape("ellipse", { x: x + w * 0.68, y: y + h * 0.12, w: w * 0.16, h: w * 0.16, fill: { color: sol }, line: { type: "none" }, objectName: "Sol" });
    s.addShape("triangle", { x: x + w * 0.08, y: y + h * 0.3, w: w * 0.62, h: h * 0.52, fill: { color: montana }, line: { type: "none" }, objectName: "Montaña" });
    s.addShape("rect", { x, y: y + h * 0.78, w, h: h * 0.22, fill: { color: suelo }, line: { type: "none" }, objectName: "Suelo" });
  };
  const GRIS = [C.text2, C.accent5, C.background2, C.text1];
  const PROPIO = [C.accent4, C.accent1, C.accent3, C.text1];

  // Hueco para que el docente pegue una captura (no se incluyen imágenes con derechos de autor).
  const hueco = async (s, x, y, w, h, texto) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1.5, dashType: "dash" }, objectName: "Hueco para captura" });
    await iconoEnCirculo(s, { x: x + w / 2 - 0.4, y: y + h / 2 - 0.85, d: 0.8, Icon: FaImage, relleno: C.accent5, iconoHex: HEX.lt1, nombre: "Captura" });
    s.addText(texto, { ...T, x: x + 0.25, y: y + h / 2 + 0.1, w: w - 0.5, h: h / 2 - 0.25, fontSize: 14, italic: true, color: C.text2, align: "center", valign: "top", margin: 0 });
  };

  const cita = (s, x, y, w, h, texto, autor, oscuro = false) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: oscuro ? C.text1 : C.background2 }, line: { type: "none" }, objectName: "Cita" });
    s.addText([
      { text: `«${texto}»`, options: { italic: true, breakLine: true } },
      { text: autor, options: { fontSize: 13, italic: false, bold: true, color: oscuro ? C.accent1 : C.text2 } },
    ], { ...T, x: x + 0.35, y, w: w - 0.7, h, fontSize: 19, color: oscuro ? C.background1 : C.text1, valign: "middle", margin: 0, paraSpaceAfter: 6 });
  };

  pres.addSection({ title: "Historia Unreal" });

  // 1. Portada
  {
    const s = pres.addSlide({ masterName: "PORTADA", sectionTitle: "Historia Unreal" });
    s.addText("Misma herramienta, mismo resultado", { placeholder: "title" });
    s.addText("Lo que Unreal Engine 5 nos enseña sobre la IA y la creatividad", { placeholder: "body" });
    await iconoEnCirculo(s, { x: 9.7, y: 2.0, d: 3.0, Icon: FaGamepad, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Mando" });
    s.addNotes("Historia de apoyo para la regla del curso «primero las personas, después la IA» (bloque 1, minutos 15–20). Duración orientativa: 8–10 minutos. Si no hay tiempo, usar solo la diapositiva resumen del bloque 1.");
  }

  // 2. Gancho
  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Historia Unreal" });
    s.addText([
      { text: "¿Y si la mejor herramienta del mercado", options: { breakLine: true } },
      { text: "hiciera que todos los resultados se parecieran?", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Lanzar la pregunta y dejarla abierta. Se responde al final de la historia.");
  }

  // 3. El motor
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("Unreal Engine 5: un salto enorme", { placeholder: "title" });
    s.addText("El programa con el que se hacen muchos videojuegos actuales. Tres novedades lo cambiaron todo:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const piezas = [
      [FaSun, C.accent1, HEX.dk1, "Lumen", "La luz, las sombras y los reflejos se calculan solos y en tiempo real."],
      [FaMountain, C.accent3, HEX.lt1, "Nanite", "Objetos con un detalle casi ilimitado, incluso escaneados del mundo real."],
      [FaCubes, C.accent4, HEX.lt1, "Megascans", "Una biblioteca enorme de rocas, árboles y texturas escaneadas, lista para usar."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, relleno, iconoHex, titulo, txt]] of piezas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.2, w, 2.7);
      await iconoEnCirculo(s, { x: x + 0.35, y: 2.5, d: 1.0, Icon, relleno, iconoHex, nombre: titulo });
      s.addText(titulo, { ...T, x: x + 1.55, y: 2.5, w: w - 1.8, h: 1.0, fontSize: 26, bold: true, color: C.text1, valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: x + 0.35, y: 3.7, w: w - 0.7, h: 1.05, fontSize: 18, color: C.text1, valign: "top", margin: 0 });
    }
    // Línea de tiempo
    const hitos = [["Mayo 2020", "Presentación"], ["Mayo 2021", "Acceso anticipado"], ["Dic. 2021", "Demo «The Matrix Awakens»"], ["Abril 2022", "Lanzamiento"]];
    const y = 5.55;
    linea(s, M + 0.2, y, W - M - 0.2, y, { color: HEX.lt2, width: 4 });
    const paso = (W - 2 * M) / hitos.length;
    hitos.forEach(([fecha, txt], i) => {
      const cx = M + paso * i + paso / 2;
      s.addShape("ellipse", { x: cx - 0.13, y: y - 0.13, w: 0.26, h: 0.26, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Hito" });
      s.addText([{ text: fecha, options: { bold: true, breakLine: true } }, { text: txt }], { ...T, x: cx - paso / 2, y: y + 0.22, w: paso, h: 0.75, fontSize: 14, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    s.addNotes("Contar sin tecnicismos: antes, la luz y el detalle de cada escena había que prepararlos a mano, objeto a objeto. Con Unreal Engine 5, el programa lo hace solo.\n\nLumen: iluminación global y reflejos que se actualizan en tiempo real. Nanite: geometría virtualizada que permite usar modelos de altísimo detalle, como escaneos fotogramétricos. Megascans: la mayor biblioteca de fotogrametría del mundo en 2019, de Quixel, empresa que compró Epic Games; durante años fue gratuita para quien usaba Unreal (desde 2025 parte es de pago, en la tienda Fab).\n\nFechas según Wikipedia (artículo «Unreal Engine 5»).");
  }

  // 4. La promesa
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("La promesa: calidad de gran estudio para cualquiera", { placeholder: "title" });
    cita(s, M, 1.6, 6.3, 2.6, "Esas tecnologías estaban reservadas a estudios más grandes, con grandes equipos dedicados al motor.", "Tom Guillermin, director técnico de Sandfall Interactive (equipo de unas 30 personas)", true);
    const puntos = [
      [FaUsers, "Un equipo pequeño, o una sola persona en su casa, puede conseguir imágenes casi fotorrealistas."],
      [FaForward, "Lo que antes costaba meses de trabajo especializado, ahora viene hecho."],
    ];
    for (const [i, [Icon, txt]] of puntos.entries()) {
      const y = 4.55 + i * 1.0;
      await iconoEnCirculo(s, { x: M, y, d: 0.75, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Punto" });
      s.addText(txt, { ...T, x: M + 1.0, y, w: 5.3, h: 0.75, fontSize: 17, color: C.text1, valign: "middle", margin: 0 });
    }
    await hueco(s, 7.3, 1.6, W - M - 7.3, 4.75, "Captura sugerida: la demo «The Matrix Awakens» (Epic Games, 2021) o cualquier escena fotorrealista hecha con Unreal Engine 5. Enlaces en las notas.");
    s.addNotes("La cita es de Tom Guillermin, director técnico de Sandfall Interactive, recogida por Creative Bloq: con Lumen y Nanite, un equipo de unas 30 personas alcanzó un nivel gráfico comparable al de estudios con cientos de desarrolladores.\n\nPara la captura (el repositorio del curso es público, por eso no se incluyen imágenes con derechos de autor): buscar «The Matrix Awakens Unreal Engine 5» en el canal oficial de Unreal Engine en YouTube o en unrealengine.com, y pegar una captura en el hueco.");
  }

  // 5. Lo que pasó
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("Lo que pasó después", { placeholder: "title" });
    s.addText("Muchísimos juegos dejaron que el motor decidiera la luz y el aspecto… y los jugadores empezaron a notarlo:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    // Seis «juegos» idénticos
    const mw = 1.7, mh = 1.05;
    for (let i = 0; i < 6; i++) {
      const x = M + (i % 3) * (mw + 0.2);
      const y = 2.25 + Math.floor(i / 3) * (mh + 0.2);
      miniatura(s, x, y, mw, mh, GRIS);
    }
    s.addText("Seis juegos distintos, el mismo aire", { ...T, x: M, y: 4.85, w: 3 * mw + 0.4, h: 0.4, fontSize: 14, italic: true, color: C.text2, align: "center", margin: 0 });
    const xq = 6.6, wq = W - M - xq;
    const citas = [
      ["Veo MUCHÍSIMOS juegos nuevos que… se parecen todos.", "Foro ResetEra, abril de 2026"],
      ["Muchos más juegos, porque es más fácil hacerlos, pero una sensación de homogeneidad, porque todos usan las mismas herramientas.", "Foro ResetEra"],
    ];
    citas.forEach(([t, a], i) => cita(s, xq, 2.25 + i * 1.7, wq, 1.5, t, a));
    s.addText("Son opiniones de jugadores, no un estudio: hay quien no está de acuerdo. Pero la sensación es muy común.", { ...T, x: M, y: 5.75, w: W - 2 * M, h: 0.7, fontSize: 16, italic: true, color: C.accent3, margin: 0 });
    s.addNotes("Citas traducidas del hilo «I'm already starting to feel tired of Unreal Engine 5» de ResetEra (abril de 2026). En Steam hay hilos con títulos como «Why does every Unreal Engine game look the same?».\n\nSer honestos: es una percepción de parte de la comunidad, no un hecho medido. En el mismo hilo hay quien responde que no todos los juegos de Unreal Engine 5 se parecen. El debate es justamente lo interesante: ¿la culpa es de la herramienta o de cómo se usa?\n\nOpcional: pegar encima de las miniaturas capturas de dos o tres juegos de Unreal Engine 5 con paisajes realistas, para que el grupo juzgue si se parecen.");
  }

  // 6. Por qué
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("¿Por qué se parecían?", { placeholder: "title" });
    const causas = [
      [FaSlidersH, "Los mismos ajustes", "La misma luz automática y el mismo tono «de cine», si nadie los cambia."],
      [FaCopy, "Los mismos materiales", "Las mismas rocas, árboles y texturas escaneadas, disponibles para todos."],
      [FaForward, "El atajo", "Si la herramienta ya lo hace bien, dejamos de decidir nosotros."],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, titulo, txt]] of causas.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 1.65, w, 3.1);
      await iconoEnCirculo(s, { x: x + 0.35, y: 1.95, d: 1.0, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: titulo });
      s.addText(titulo, { ...T, x: x + 0.35, y: 3.1, w: w - 0.7, h: 0.6, fontSize: 21, bold: true, color: C.text1, margin: 0 });
      s.addText(txt, { ...T, x: x + 0.35, y: 3.7, w: w - 0.7, h: 0.95, fontSize: 17, color: C.text1, valign: "top", margin: 0 });
    }
    cita(s, M, 5.05, W - 2 * M, 1.4, "Los motores no deciden la dirección artística.", "Respuesta de otro jugador en el mismo foro", true);
    s.addNotes("Las tres causas son las que más se repiten en los foros: los ajustes por defecto (iluminación automática, el mismo mapeo de tonos «cinematográfico»), los recursos compartidos (bibliotecas como Megascans) y la comodidad.\n\nLa frase de abajo es la clave de toda la historia: la herramienta no tiene la culpa. Decide quien la usa… o quien deja de decidir.");
  }

  // 7. El contraejemplo
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("El contraejemplo: Clair Obscur: Expedition 33", { placeholder: "title" });
    s.addText("El mismo motor. Un estilo propio: un mundo surrealista inspirado en la Belle Époque francesa.", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    // Cinco grises y uno propio
    const mw = 1.15, mh = 0.75;
    for (let i = 0; i < 6; i++) {
      const x = M + i * (mw + 0.15);
      miniatura(s, x, 2.25, mw, mh, i === 3 ? PROPIO : GRIS);
    }
    const datos = [["~30", "personas en el equipo"], ["9", "premios en The Game Awards 2025"], ["1.º", "Juego del Año 2025"]];
    datos.forEach(([n, txt], i) => {
      const y = 3.3 + i * 1.0;
      s.addText(n, { ...T, x: M, y, w: 1.6, h: 0.85, fontSize: 40, bold: true, color: C.accent3, valign: "middle", margin: 0 });
      s.addText(txt, { ...T, x: M + 1.7, y, w: 5.2, h: 0.85, fontSize: 19, color: C.text1, valign: "middle", margin: 0 });
    });
    await iconoEnCirculo(s, { x: M, y: 6.25, d: 0.5, Icon: FaTrophy, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Premio" });
    s.addText("Entre sus premios: mejor dirección artística.", { ...T, x: M + 0.65, y: 6.25, w: 6.2, h: 0.5, fontSize: 16, bold: true, color: C.text1, valign: "middle", margin: 0 });
    await hueco(s, 8.6, 2.25, W - M - 8.6, 4.5, "Captura sugerida: una escena de Clair Obscur: Expedition 33 (kit de prensa oficial o página del juego). Enlaces en las notas.");
    s.addNotes("Clair Obscur: Expedition 33 (Sandfall Interactive, 2025) usa Unreal Engine 5, Lumen y Nanite, como tantos otros. La diferencia: una dirección artística muy personal, de inspiración surrealista y Belle Époque.\n\nResultado: Juego del Año en The Game Awards 2025, con 9 premios de 13 nominaciones (récord), entre ellos mejor dirección artística, mejor dirección de juego y mejor narrativa.\n\nEl propio director técnico avisó de que usar Unreal Engine 5 «puede ser una trampa» (titular de Creative Bloq): la gente espera calidad de gran estudio en todo. La herramienta da el acabado; lo que hace único al juego lo pone el equipo.\n\nPara la captura: kit de prensa oficial de Sandfall Interactive o la página del juego en Steam o PlayStation Store.");
  }

  // 8. Puente
  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Historia Unreal" });
    s.addText([
      { text: "¿Y qué tiene que ver esto", options: { breakLine: true } },
      { text: "con la inteligencia artificial?", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Pregunta puente. Dejar que alguien del grupo intente responderla antes de pasar.");
  }

  // 9. El experimento
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("Un experimento con 293 escritores", { placeholder: "title" });
    await iconoEnCirculo(s, { x: M, y: 1.55, d: 0.75, Icon: FaFlask, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Experimento" });
    s.addText("Escribieron un relato corto: unos solos y otros con ideas de una IA. Después, 600 personas valoraron los relatos sin saber quién había usado IA.", { ...T, x: M + 1.0, y: 1.5, w: W - 2 * M - 1.0, h: 0.85, fontSize: 18, color: C.text1, valign: "middle", margin: 0 });
    const cifras = [
      ["+8 %", "más originales", "con ideas de la IA", C.accent2],
      ["+9 %", "más útiles", "con ideas de la IA", C.accent2],
      ["+11 %", "más parecidos entre sí", "los relatos hechos con IA", C.accent3],
    ];
    const gap = 0.4;
    const w = (W - 2 * M - 2 * gap) / 3;
    cifras.forEach(([n, a, b, color], i) => {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.7, w, 2.9);
      s.addText(n, { ...T, x: x + 0.3, y: 2.9, w: w - 0.6, h: 1.3, fontSize: 60, bold: true, color, align: "center", valign: "middle", margin: 0 });
      s.addText([{ text: a, options: { bold: true, breakLine: true } }, { text: b, options: { fontSize: 15, color: C.text2 } }], { ...T, x: x + 0.3, y: 4.25, w: w - 0.6, h: 1.15, fontSize: 20, color: C.text1, align: "center", valign: "top", margin: 0 });
    });
    s.addText("Doshi y Hauser (2024), Science Advances", { ...T, x: M, y: 5.9, w: W - 2 * M, h: 0.4, fontSize: 13, italic: true, color: C.accent5, margin: 0 });
    s.addNotes("Estudio: Anil R. Doshi y Oliver P. Hauser, «Generative AI enhances individual creativity but reduces the collective diversity of novel content», Science Advances, 12 de julio de 2024. 293 escritores y 600 evaluadores.\n\nCifras exactas: con cinco ideas de la IA, los relatos fueron un 8,1 % más novedosos y un 9,0 % más útiles que los escritos sin ayuda. Las mejoras fueron mayores en las personas menos creativas (hasta +10,7 % en novedad y +11,5 % en utilidad). Pero los relatos hechos con ayuda de la IA se parecían más entre sí: un 10,7 % del rango de similitud con una idea de la IA (8,9 % con cinco).\n\nOjo: la IA no lo hizo peor. Ayudó a cada persona. El problema aparece al mirar el conjunto.");
  }

  // 10. El dilema
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("El dilema", { placeholder: "title" });
    const cols = [
      [FaUsers, C.accent2, "Cada persona", "sale ganando: su resultado es mejor."],
      [FaBalanceScale, C.accent3, "El conjunto", "sale perdiendo: todo se parece más."],
    ];
    for (const [i, [Icon, relleno, t, d]] of cols.entries()) {
      const x = M + i * 6.25;
      tarjeta(s, x, 1.65, 5.85, 2.1);
      await iconoEnCirculo(s, { x: x + 0.35, y: 1.95, d: 1.5, Icon, relleno, iconoHex: HEX.lt1, nombre: t });
      s.addText([{ text: t, options: { bold: true, fontSize: 28, breakLine: true } }, { text: d }], { ...T, x: x + 2.1, y: 1.65, w: 3.55, h: 2.1, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
    cita(s, M, 4.1, W - 2 * M, 1.5, "Individualmente, los escritores salen ganando; colectivamente, se produce un abanico más estrecho de contenido nuevo.", "Doshi y Hauser (2024), Science Advances", true);
    s.addText("Exactamente lo que pasó con Unreal Engine 5: cada juego, más bonito; todos, más parecidos.", { ...T, x: M, y: 5.85, w: W - 2 * M, h: 0.5, fontSize: 19, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Los autores lo llaman un dilema social: a cada uno le conviene usar la IA, pero si todos la usamos igual, el conjunto se empobrece.");
  }

  // 11. El paralelo
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("La misma historia, dos herramientas", { placeholder: "title" });
    const cab = (txt, relleno, color) => ({ text: txt, options: { bold: true, fill: { color: relleno }, color, fontSize: 19 } });
    const c = (txt, opts = {}) => ({ text: txt, options: { color: C.text1, ...opts } });
    s.addTable([
      [cab("", C.background1, C.text1), cab("Unreal Engine 5", C.text1, C.background1), cab("La IA", C.accent2, C.background1)],
      [c("Lo que ofrece", { bold: true }), c("Luz, detalle y materiales de gran estudio, automáticamente."), c("Ideas, textos y resúmenes de calidad, en segundos.")],
      [c("El atajo", { bold: true }), c("Aceptar los ajustes por defecto."), c("Aceptar la primera respuesta.")],
      [c("El resultado", { bold: true }), c("Juegos que se parecen."), c("Cartas de presentación, propuestas e ideas que se parecen.")],
      [c("Quién destaca", { bold: true }), c("Quien pone un estilo propio."), c("Quien pone ideas propias.")],
    ], { x: M, y: 1.6, w: W - 2 * M, colW: [2.4, 4.865, 4.865], rowH: [0.65, 0.95, 0.8, 0.95, 0.8], fontSize: 17, valign: "middle", border: { type: "solid", pt: 1, color: HEX.lt2 }, margin: 0.12 });
    s.addNotes("Recorrer la tabla fila a fila. Conectar con la búsqueda de empleo: si todo el mundo escribe su carta de presentación con la misma IA y el mismo prompt, todas suenan igual. Lo que diferencia es lo que pone cada persona.");
  }

  // 12. Cierre
  {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: "Historia Unreal" });
    s.addText("La moraleja", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: "La herramienta es el lienzo, no el pintor.", options: { breakLine: true } },
      { text: "Primero pensamos las personas; después, la IA amplía lo nuestro.", options: { color: C.accent1 } },
    ], { placeholder: "body" });
    s.addNotes("Enlazar con la regla del curso y con el Ejercicio 1: lo comprobaremos comparando las ideas del grupo con las de la IA. No adelantar quién gana: lo dirán los datos del propio grupo.");
  }

  // 13. Fuentes
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Historia Unreal" });
    s.addText("Fuentes", { placeholder: "title" });
    await iconoEnCirculo(s, { x: M, y: 1.55, d: 0.75, Icon: FaBookOpen, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Fuentes" });
    const fuentes = [
      ["Doshi, A. R. y Hauser, O. P. (2024). Generative AI enhances individual creativity but reduces the collective diversity of novel content. Science Advances, 10(28).", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532"],
      ["«Unreal Engine 5». Wikipedia.", "https://en.wikipedia.org/wiki/Unreal_Engine_5"],
      ["Creative Bloq. «Using Unreal Engine 5 “can be a trap”, says the dev behind Clair Obscur: Expedition 33».", "https://creativebloq.com/3d/video-game-design/using-unreal-engine-5-can-be-a-trap-says-the-dev-behind-clair-obscur-expedition-33"],
      ["Windows Central. Ganadores de The Game Awards 2025.", "https://www.windowscentral.com/gaming/the-game-awards-2025-winners"],
      ["ResetEra. «I'm already starting to feel tired of Unreal Engine 5» (abril de 2026).", "https://www.resetera.com/threads/im-already-starting-to-feel-tired-of-unreal-engine-5.1487680/"],
    ];
    const runs = [];
    fuentes.forEach(([t, url], i) => {
      runs.push({ text: t, options: { breakLine: true } });
      runs.push({ text: url, options: { hyperlink: { url }, color: C.accent2, fontSize: 12, breakLine: i < fuentes.length - 1, paraSpaceAfter: 10 } });
    });
    s.addText(runs, { ...T, x: M + 1.0, y: 1.55, w: W - 2 * M - 1.0, h: 5.0, fontSize: 15, color: C.text1, valign: "top", margin: 0 });
    s.addNotes("Las opiniones de foros (ResetEra, Steam) reflejan la percepción de jugadores, no un estudio. El estudio de Science Advances sí es una investigación revisada por pares.");
  }

  const destino = await guardar(pres, "historia_unreal.pptx");
  console.log("Generado:", destino);
}

main().catch((e) => { console.error(e); process.exit(1); });
