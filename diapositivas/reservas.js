// Diapositivas de los tres ejercicios de reserva: el proceso completo del curso, en 30 minutos.
// Uso: node reservas.js  →  genera reserva1_comunidad.pptx, reserva2_oficina_futuro.pptx y
// reserva3_atencion_telefonica.pptx (solo los que no existan todavía).

const fs = require("fs");
const path = require("path");
const {
  FaBuilding, FaUsers, FaUserFriends, FaHome, FaRobot, FaLightbulb, FaFilter, FaBalanceScale, FaFileAlt, FaBullhorn,
  FaPhoneVolume, FaListOl, FaHourglassHalf, FaRandom, FaInbox, FaFolderOpen, FaUserTie, FaWifi, FaExclamationTriangle,
  FaFlagCheckered, FaCalculator, FaQuestion, FaComments,
} = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, linea, guardar } = require("./comun");

const T = { isTextBox: true };

const EJERCICIOS = [
  {
    archivo: "reserva1_comunidad.pptx",
    numero: 1,
    titulo: "La comunidad de vecinos que no funciona",
    tecnica: "Brainstorming",
    rol: "Carmen, la presidenta",
    escenaDefensa: "La junta",
    caso: {
      intro: "Comunidad de propietarios Los Almendros, 14. Sois el equipo del pequeño despacho de administración de fincas que la gestiona.",
      datos: [
        [FaBuilding, "32 viviendas, un bar en el bajo y un ascensor de 25 años."],
        [FaUsers, "Un tercio de mayores de 70 años, familias, 8 pisos de alquiler con inquilinos que cambian y 3 propietarios que viven fuera."],
        [FaUserFriends, "La presidenta de este año es Carmen, de 74 años."],
      ],
      mensaje: "«Esto no funciona. Ayudadnos».",
      actividad: "Entre todos: ¿qué suele fallar en una comunidad de vecinos? Elegimos un problema y lo convertimos en reto: «¿Cómo podríamos…?».",
      notas: "Minutos 0–3. Leer los datos base. Los problemas los aporta el grupo: casi todo el mundo vive o ha vivido en una comunidad de vecinos. Elegir entre todos un problema común y formularlo como reto «¿Cómo podríamos…?», sin que contenga ya la solución.",
    },
    sinIA: ["Por parejas, todas las ideas que se os ocurran sobre el reto.", "Cantidad antes que calidad, sin criticar, construyendo sobre otras ideas. Las disparatadas, bienvenidas."],
    prompt: [
      "Somos el despacho de administración de una comunidad de 32 viviendas",
      "con vecinos mayores, inquilinos que cambian a menudo y propietarios",
      "que viven fuera. Este es nuestro reto: [reto].",
      "Ya tenemos estas ideas: [ideas de la pareja].",
      "Propón diez ideas nuevas que no se parezcan a las nuestras,",
      "de bajo coste y que puedan probarse en un mes. Una línea por idea.",
    ],
    giro: "Carmen, la presidenta, no tiene WhatsApp ni smartphone. Un tercio de los propietarios tampoco.",
    corregir: [
      "El reto está bien formulado: no contiene ya la solución y se centra en las personas.",
      "La propuesta se ha adaptado al giro: funciona para quien no usa WhatsApp ni smartphone.",
      "La elección se justifica con la matriz, no solo con «nos gusta».",
      "El indicador es medible y no viene acompañado de resultados inventados.",
      "No aparecen datos personales de vecinos en lo que se ha introducido en la IA.",
    ],
  },
  {
    archivo: "reserva2_oficina_futuro.pptx",
    numero: 2,
    titulo: "Oficina Futuro",
    tecnica: "SCAMPER",
    rol: "la gerencia de Oficina Futuro",
    escenaDefensa: "Ante la gerencia",
    caso: {
      intro: "Oficina Futuro: empresa ficticia de servicios formativos, con ocho trabajadores. Las cifras son supuestos didácticos.",
      datos: [
        [FaInbox, "Unas 40 consultas diarias por teléfono, correo, WhatsApp y en persona."],
        [FaRandom, "Mucho tiempo respondiendo preguntas repetidas; nadie tiene asignada esa tarea."],
        [FaFolderOpen, "Datos de clientes dispersos en varios archivos y errores al pasarlos de un documento a otro."],
      ],
      mensaje: "Encargo: una mejora de bajo coste, sin contratar personal.",
      actividad: "Antes de proponer nada: tres o cuatro preguntas a la gerencia para entender el problema.",
      notas: "Minutos 0–3. Leer el caso. El docente hace de gerente y responde a tres o cuatro preguntas del grupo. Respuestas preparadas: canales, teléfono, correo, WhatsApp y algunas en persona; qué preguntan más, fechas de inicio, precios, requisitos de acceso y si quedan plazas; quién las responde, quien esté libre, no hay nadie asignado; dónde están los datos, en varias hojas de Excel, en el correo y en una libreta de recepción; herramientas, paquete ofimático con correo, hojas de cálculo compartidas y un móvil de empresa; presupuesto, muy pequeño. Si preguntan algo no previsto, responder con coherencia o decir «no lo sabemos».",
    },
    sinIA: ["Por parejas, SCAMPER sobre cómo se atiende hoy una consulta.", "Al menos una idea en cuatro de las siete letras: sustituir, combinar, adaptar, modificar, proponer otros usos, eliminar, reorganizar."],
    prompt: [
      "Actúa como especialista en mejora de procesos de pequeñas empresas.",
      "Proceso actual: en Oficina Futuro, ocho trabajadores responden unas",
      "40 consultas diarias que llegan por teléfono, correo, WhatsApp y en",
      "persona; nadie tiene asignada esa tarea y los datos de los clientes",
      "están dispersos en varios archivos.",
      "Ya tenemos estas ideas: [ideas de la pareja, con su letra].",
      "Aplica SCAMPER y propón una idea nueva por cada letra que no repita",
      "las nuestras. Bajo coste, sin contratar personal y que pueda probarse",
      "en un mes. No inventes cifras de ahorro.",
    ],
    corregir: [
      "Las preguntas a la gerencia buscan entender el problema, no confirmar una solución que ya traían pensada.",
      "La propuesta respeta las restricciones: bajo coste y sin contratar a nadie.",
      "La elección se justifica con la matriz, no solo con «nos gusta».",
      "El indicador es medible y no viene acompañado de resultados inventados.",
      "La pareja distingue qué parte de la idea es suya y qué aportó la IA.",
    ],
  },
  {
    archivo: "reserva3_atencion_telefonica.pptx",
    numero: 3,
    titulo: "La atención telefónica que nadie soporta",
    tecnica: "Provocación",
    rol: "la dirección de atención al cliente",
    escenaDefensa: "Ante la dirección",
    caso: {
      intro: "Una compañía de luz y gas (ficticia) con una atención telefónica de la que todo el mundo se queja.",
      datos: [
        [FaListOl, "Un menú automático con muchas opciones."],
        [FaRobot, "Un asistente virtual que no entiende lo que se le pide."],
        [FaHourglassHalf, "Esperas largas y llamadas que se cortan o pasan de departamento en departamento sin resolverse."],
      ],
      mensaje: "Encargo: una mejora que pueda probarse en un mes, sin contratar más personal.",
      actividad: "Entre todos: ¿qué es lo peor de llamar a una compañía así? Elegimos un problema y lo convertimos en reto: «¿Cómo podríamos…?».",
      notas: "Minutos 0–3. Casi todo el mundo ha vivido una llamada así: los problemas los aporta el grupo. Interés añadido para el curso: parte del problema es un asistente automático mal planteado. La pregunta de fondo es cómo usar bien la tecnología para arreglar lo que una tecnología mal usada ha estropeado. No nombrar compañías reales.",
    },
    sinIA: ["Por parejas, dos provocaciones de tipos distintos, cada una con su movimiento y su idea práctica.", "Para desbloquear: «La compañía llama al cliente antes de que el cliente llame», «No hay menú de opciones»."],
    prompt: [
      "Actúa como experto en pensamiento lateral y en la técnica de",
      "provocación de Edward de Bono.",
      "Situación: la atención telefónica de una compañía de luz y gas tiene",
      "un menú automático largo, un asistente virtual que no entiende a los",
      "clientes, esperas largas y llamadas que no se resuelven.",
      "Reto: [reto del grupo].",
      "Escribe 4 provocaciones (inversión, exageración, eliminación y deseo)",
      "y, para cada una, el principio útil y una idea práctica que pueda",
      "probarse en un mes sin contratar personal.",
      "No repitas estas provocaciones nuestras: [provocaciones de la pareja].",
    ],
    corregir: [
      "Las provocaciones llegan hasta una idea práctica: no se quedan en la ocurrencia.",
      "La propuesta mejora la experiencia de quien llama, no solo ahorra costes a la compañía.",
      "Si usa IA o automatización, explica qué hace una persona y qué hace la máquina.",
      "La elección se justifica con la matriz, no solo con «nos gusta».",
      "El indicador es medible (por ejemplo, llamadas resueltas en el primer contacto) y no viene acompañado de resultados inventados.",
    ],
  },
];

const FASES = [
  [FaLightbulb, "1. Generar ideas", "3–10"],
  [FaFilter, "2. Seleccionar", "10–12"],
  [FaBalanceScale, "3. Comparar y elegir", "12–17"],
  [FaFileAlt, "4. Documentar", "17–22"],
  [FaBullhorn, "5. Defender", "22–30"],
];

async function generar(ej) {
  const titulo = `Ejercicio de reserva ${ej.numero}. ${ej.titulo}`;
  const { pres, C } = crearPresentacion({ titulo, pie: `Ejercicio de reserva ${ej.numero} · ${ej.titulo}` });
  const tarjeta = (s, x, y, w, h, relleno = C.background2, nombre = "Tarjeta") =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: relleno }, line: { type: "none" }, objectName: nombre });
  const hueco = (s, x, y, w, h) =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: HEX.accent5, width: 1, dashType: "dash" }, objectName: "Hueco" });
  const cajaPrompt = (s, lineas, { x, y, w, h, fontSize = 14 }) => {
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Prompt" });
    const runs = [];
    let dentro = false;
    lineas.forEach((l, i) => {
      const trozos = l.split(/(\[|\])/).filter((t) => t !== "");
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
  // Indicador de la fase actual: cinco puntos, el activo en ámbar.
  const fase = (s, n) => {
    FASES.forEach(([, , ], i) => {
      s.addShape("ellipse", { x: M + i * 0.32, y: 6.32, w: 0.2, h: 0.2, fill: { color: i + 1 === n ? C.accent1 : C.background2 }, line: { type: "none" }, objectName: `Fase ${i + 1}` });
    });
    s.addText(FASES[n - 1][1], { ...T, x: M + 1.75, y: 6.22, w: 5, h: 0.4, fontSize: 13, bold: true, color: C.accent5, valign: "middle", margin: 0 });
  };

  pres.addSection({ title: `Reserva ${ej.numero}` });
  const sec = `Reserva ${ej.numero}`;

  // Portada
  {
    const s = pres.addSlide({ masterName: "SECCION", sectionTitle: sec });
    s.addText(`R${ej.numero}`, { ...T, x: M, y: 1.9, w: 2.6, h: 3.0, fontSize: 140, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, fontFace: "Arial" });
    s.addText(ej.titulo, { placeholder: "title" });
    s.addText(`Ejercicio de reserva ${ej.numero} · 30 minutos · técnica: ${ej.tecnica.toLowerCase()}`, { placeholder: "body" });
    s.addNotes("Ejercicio de reserva: solo si sobra tiempo al final. Recorre entero, de forma continua y rápida, el proceso del curso sobre un caso nuevo y por parejas.");
  }

  // El proceso en 30 minutos
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("Todo el proceso, en 30 minutos", { placeholder: "title" });
    s.addText("Lo mismo que hemos hecho durante el curso, pero seguido y rápido:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const gap = 0.35;
    const w = (W - 2 * M - 4 * gap) / 5;
    for (const [i, [Icon, t, min]] of FASES.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.2, w, 3.0);
      await iconoEnCirculo(s, { x: x + w / 2 - 0.55, y: 2.5, d: 1.1, Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: t });
      s.addText(t, { ...T, x: x + 0.15, y: 3.8, w: w - 0.3, h: 0.75, fontSize: 18, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(`Min. ${min}`, { ...T, x: x + 0.15, y: 4.55, w: w - 0.3, h: 0.45, fontSize: 15, color: C.text2, align: "center", margin: 0 });
      if (i < 4) linea(s, x + w + 0.04, 3.7, x + w + gap - 0.04, 3.7, { color: HEX.dk2, width: 2.5, endArrowType: "triangle" });
    }
    s.addText(`Técnica de este ejercicio: ${ej.tecnica}.`, { ...T, x: M, y: 5.6, w: W - 2 * M, h: 0.55, fontSize: 20, bold: true, color: C.accent3, margin: 0 });
    s.addNotes("Recordar que no hay nada nuevo: es el mismo proceso del curso, en rápido. Llevar el tiempo de forma estricta.");
  }

  // El caso
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("El caso", { placeholder: "title" });
    etiqueta(s, C, "Min. 0–3 · Todo el grupo", "personas");
    s.addText(ej.caso.intro, { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.65, fontSize: 19, color: C.text2, valign: "middle", margin: 0 });
    const gap = 0.35;
    const w = (W - 2 * M - 2 * gap) / 3;
    for (const [i, [Icon, t]] of ej.caso.datos.entries()) {
      const x = M + i * (w + gap);
      tarjeta(s, x, 2.3, w, 2.1);
      await iconoEnCirculo(s, { x: x + 0.3, y: 2.55, d: 0.75, Icon, relleno: C.text2, iconoHex: HEX.lt1, nombre: "Dato" });
      s.addText(t, { ...T, x: x + 0.3, y: 3.4, w: w - 0.6, h: 0.95, fontSize: 16, color: C.text1, valign: "top", margin: 0 });
    }
    s.addShape("roundRect", { x: M, y: 4.65, w: W - 2 * M, h: 0.75, rectRadius: 0.12, fill: { color: C.text1 }, line: { type: "none" }, objectName: "Mensaje" });
    s.addText(ej.caso.mensaje, { ...T, x: M + 0.35, y: 4.65, w: W - 2 * M - 0.7, h: 0.75, fontSize: 20, bold: true, color: C.accent1, valign: "middle", margin: 0 });
    s.addText(ej.caso.actividad, { ...T, x: M, y: 5.6, w: W - 2 * M, h: 0.7, fontSize: 17, color: C.text1, valign: "middle", margin: 0 });
    s.addNotes(ej.caso.notas);
  }

  // Fase 1: sin IA
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText(`Fase 1: ideas con ${ej.tecnica.toLowerCase() === "scamper" ? "SCAMPER" : ej.tecnica.toLowerCase()}`, { placeholder: "title" });
    etiqueta(s, C, "Min. 3–7 · Sin IA", "personas");
    for (const [i, t] of ej.sinIA.entries()) {
      const y = 1.65 + i * 1.25;
      await iconoEnCirculo(s, { x: M, y, d: 0.85, Icon: i ? FaLightbulb : FaUsers, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Instrucción" });
      s.addText(t, { ...T, x: M + 1.1, y: y - 0.1, w: W - 2 * M - 1.1, h: 1.05, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    }
    s.addText("Nuestras ideas:", { ...T, x: M, y: 4.25, w: 5, h: 0.45, fontSize: 18, bold: true, color: C.text1, margin: 0 });
    hueco(s, M, 4.75, W - 2 * M, 1.3);
    fase(s, 1);
    s.addNotes("Cuatro minutos, por parejas y sin IA. Que apunten las ideas: las pegarán en el prompt.");
  }

  // Fase 1: con IA
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("Fase 1: más ideas con la IA", { placeholder: "title" });
    etiqueta(s, C, "Min. 7–10 · Con IA", "ia");
    const alto = Math.min(4.3, 0.25 * ej.prompt.length + 0.55);
    cajaPrompt(s, ej.prompt, { x: M, y: 1.55, w: W - 2 * M, h: alto, fontSize: 17 });
    s.addText("Leed lo que propone la IA y añadid a vuestra lista lo que valga la pena.", { ...T, x: M, y: 1.75 + alto, w: W - 2 * M, h: 0.55, fontSize: 18, color: C.text2, margin: 0 });
    fase(s, 1);
    s.addNotes("Tres minutos. El prompt está en el guion para copiarlo. Primero las personas, después la IA.");
  }

  // Giro (solo si el ejercicio lo tiene)
  if (ej.giro) {
    const s = pres.addSlide({ masterName: "DESTACADO", sectionTitle: sec });
    s.addText("Giro", { ...T, x: 1.2, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0 });
    s.addText([
      { text: ej.giro, options: { breakLine: true } },
      { text: "¿Qué ideas ya no sirven? ¿Cuáles podéis adaptar?", options: { color: C.accent1, bold: true } },
    ], { placeholder: "body" });
    s.addNotes("Al terminar la fase 1. Las parejas descartan o adaptan las ideas que ya no sirven.");
  }

  // Fase 2: seleccionar
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("Fase 2: quedaos con tres", { placeholder: "title" });
    etiqueta(s, C, "Min. 10–12 · Parejas", "personas");
    s.addText("De todas vuestras ideas y las de la IA, las tres que más os interesan:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    [0, 1, 2].forEach((i) => {
      const y = 2.15 + i * 1.3;
      s.addShape("ellipse", { x: M, y: y + 0.22, w: 0.7, h: 0.7, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Propuesta ${i + 1}` });
      s.addText(String.fromCharCode(65 + i), { ...T, x: M, y: y + 0.22, w: 0.7, h: 0.7, fontSize: 24, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      hueco(s, M + 1.0, y, W - 2 * M - 1.0, 1.1);
    });
    fase(s, 2);
    s.addNotes("Dos minutos. Sin matriz todavía: solo quedarse con tres.");
  }

  // Fase 3: matriz rápida
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("Fase 3: comparad y elegid", { placeholder: "title" });
    etiqueta(s, C, "Min. 12–17 · Parejas", "personas");
    const crit = [["Impacto", "35 %", C.accent1, C.text1], ["Viabilidad", "30 %", C.accent2, C.background1], ["Bajo coste", "20 %", C.accent4, C.background1], ["Originalidad", "15 %", C.accent3, C.background1]];
    const cab = (t, relleno, color) => ({ text: t, options: { bold: true, fill: { color: relleno }, color, align: "center" } });
    const v = (t = "") => ({ text: t, options: { color: C.text1, bold: true, align: "center" } });
    s.addTable([
      [cab("Propuesta", C.text1, C.background1), ...crit.map(([t, p, r, c]) => cab(`${t}\n${p}`, r, c)), cab("Resultado", C.text1, C.background1)],
      [v("A"), v(), v(), v(), v(), v()],
      [v("B"), v(), v(), v(), v(), v()],
      [v("C"), v(), v(), v(), v(), v()],
    ], { x: M, y: 1.5, w: W - 2 * M, colW: [2.333, 1.9, 1.9, 1.9, 1.9, 2.3], rowH: [0.8, 0.6, 0.6, 0.6], fontSize: 17, valign: "middle", border: { type: "solid", pt: 1, color: HEX.accent5 }, margin: 0.08 });
    s.addText("Puntuad del 1 al 5 (en «Bajo coste», 5 = muy económica), con la calculadora o en Excel.", { ...T, x: M, y: 4.2, w: W - 2 * M, h: 0.45, fontSize: 16, italic: true, color: C.text2, margin: 0 });
    tarjeta(s, M, 4.8, W - 2 * M, 1.2);
    await iconoEnCirculo(s, { x: M + 0.3, y: 5.02, d: 0.75, Icon: FaFlagCheckered, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Decisión" });
    s.addText("Elegimos _______________ porque _______________________________", { ...T, x: M + 1.3, y: 4.8, w: W - 2 * M - 1.6, h: 1.2, fontSize: 21, bold: true, color: C.text1, valign: "middle", margin: 0 });
    fase(s, 3);
    s.addNotes("Cinco minutos. La misma matriz del bloque 3. La ganadora no tiene por qué ser la de mayor puntuación, pero si no lo es hay que explicar por qué.");
  }

  // Fase 4: ficha en cinco líneas
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText("Fase 4: la ficha, en cinco líneas", { placeholder: "title" });
    etiqueta(s, C, "Min. 17–22 · Parejas", "personas");
    const lineas = ["Problema", "Solución", "Qué necesitamos", "Principal riesgo", "Cómo sabremos si funciona"];
    lineas.forEach((t, i) => {
      const y = 1.55 + i * 0.88;
      s.addShape("roundRect", { x: M, y, w: 3.6, h: 0.72, rectRadius: 0.1, fill: { color: i === 4 ? C.accent2 : C.text1 }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x: M + 0.2, y, w: 3.3, h: 0.72, fontSize: 17, bold: true, color: C.background1, valign: "middle", margin: 0 });
      hueco(s, M + 3.8, y, W - 2 * M - 3.8, 0.72);
    });
    s.addText("En «Cómo sabremos si funciona»: qué mediríais y cómo, antes y después de una prueba. Sin inventar resultados.", { ...T, x: M, y: 6.0 - 0.1, w: W - 2 * M, h: 0.4, fontSize: 15, italic: true, color: C.accent3, margin: 0 });
    fase(s, 4);
    s.addNotes("Cinco minutos. La IA puede ayudar a redactar, pero la ficha la revisa la pareja. El indicador, igual que en el bloque 4: qué se mediría y cómo, no lo que se conseguirá.");
  }

  // Fase 5: defensa
  {
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: sec });
    s.addText(`Fase 5: ${ej.escenaDefensa.toLowerCase().startsWith("la ") ? ej.escenaDefensa.toLowerCase() : ej.escenaDefensa.charAt(0).toLowerCase() + ej.escenaDefensa.slice(1)}`, { placeholder: "title" });
    etiqueta(s, C, "Min. 22–30 · Parejas", "personas");
    s.addText("Un minuto por pareja, con la estructura de la defensa:", { ...T, x: M, y: 1.45, w: W - 2 * M, h: 0.5, fontSize: 19, color: C.text2, margin: 0 });
    const pasos = ["Problema", "Por qué\nimporta", "Qué\nproponemos", "Cómo lo\nharíamos", "Cómo lo\nmediríamos"];
    const w = (W - 2 * M) / 5;
    pasos.forEach((t, i) => {
      const x = M + i * w;
      s.addShape("chevron", { x: x + 0.04, y: 2.15, w: w - 0.08, h: 1.2, fill: { color: i % 2 ? C.text2 : C.text1 }, line: { type: "none" }, objectName: t });
      s.addText(t, { ...T, x: x + 0.6, y: 2.15, w: w - 1.2, h: 1.2, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0 });
    });
    tarjeta(s, M, 3.75, W - 2 * M, 1.6);
    await iconoEnCirculo(s, { x: M + 0.35, y: 4.05, d: 1.0, Icon: FaUserTie, relleno: C.accent3, iconoHex: HEX.lt1, nombre: "Pregunta difícil" });
    s.addText([{ text: "Después, una pregunta difícil.", options: { bold: true, breakLine: true } }, { text: `El docente hace de ${ej.rol}.` }],
      { ...T, x: M + 1.65, y: 3.75, w: W - 2 * M - 1.95, h: 1.6, fontSize: 21, color: C.text1, valign: "middle", margin: 0 });
    fase(s, 5);
    s.addNotes("Ocho minutos: con ocho parejas, un minuto de defensa y la pregunta. Qué buscar al corregir:\n- " + ej.corregir.join("\n- "));
  }

  const destino = path.join(__dirname, ej.archivo);
  if (fs.existsSync(destino)) {
    console.log("Ya existe, no se toca:", ej.archivo);
    return;
  }
  await guardar(pres, ej.archivo);
  console.log("Generado:", ej.archivo);
}

(async () => {
  for (const ej of EJERCICIOS) await generar(ej);
})().catch((e) => { console.error(e); process.exit(1); });
