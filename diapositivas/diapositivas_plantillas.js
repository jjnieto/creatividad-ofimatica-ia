// Diapositivas «Abrid…» de Curso.pptx: una cada vez que el alumnado empieza a usar una plantilla, con el
// nombre del archivo y tres instrucciones mínimas. Se generan en un .pptx aparte y después se insertan
// en Curso.pptx sin regenerarlo (Curso.pptx manda). Este script queda como registro de su contenido.
// Uso: SALIDA=/ruta/plantillas_curso.pptx node diapositivas_plantillas.js
const { FaFileWord, FaFileExcel, FaFilePowerpoint } = require("react-icons/fa");
const { HEX, W, M, crearPresentacion, etiqueta, iconoEnCirculo, guardar } = require("./comun");

const T = { isTextBox: true };

const ARCHIVOS = {
  cuaderno: { nombre: "cuaderno_ejercicios.docx", app: "Word o Google Docs", Icon: FaFileWord },
  matriz: { nombre: "matriz_decision.xlsx", app: "Excel o Google Sheets", Icon: FaFileExcel },
  documento: { nombre: "documento_proyecto.docx", app: "Word o Google Docs", Icon: FaFileWord },
  presentacion: { nombre: "presentacion_proyecto.pptx", app: "PowerPoint o Google Slides", Icon: FaFilePowerpoint },
};

// antes: título de la diapositiva de Curso.pptx delante de la que va cada una.
const DIAPOSITIVAS = [
  {
    antes: "¿Para qué se podría usar un clip?", titulo: "Abrid el cuaderno de ejercicios", archivo: "cuaderno", tiempo: "Min. 10 · Cada persona",
    pasos: [
      "Escribid vuestro nombre en la portada.",
      "Id al «Bloque 1»: el clip y el Ejercicio 1 se anotan ahí.",
      "Lo vuestro va en los recuadros ámbar; lo que diga la IA, en los verdes.",
    ],
    notas: "Primer uso de una plantilla. Si es posible, que tengan el cuaderno abierto antes de empezar el bloque, para no perder tiempo del clip. El cuaderno es para pensar: no se entrega. Se usa en los bloques 1, 2 y 5.",
  },
  {
    antes: "Por parejas: elegid un caso", titulo: "Seguimos en el cuaderno", archivo: "cuaderno", tiempo: "Min. 45 · Parejas",
    pasos: [
      "Por parejas: un solo cuaderno para los dos.",
      "Id al «Bloque 2» y marcad vuestro caso.",
      "Los prompts están en el cuaderno: copiadlos y completad lo que va entre corchetes.",
    ],
    notas: "Todo el bloque 2 se trabaja en el cuaderno: el caso, SCAMPER, la provocación y las tres mejores propuestas. Esas tres propuestas pasan a la matriz en el bloque 3.",
  },
  {
    antes: "Ejercicio 4: elegir con criterio", titulo: "Abrid la matriz de decisión", archivo: "matriz", tiempo: "Min. 113 · Parejas",
    pasos: [
      "Copiad vuestras tres propuestas del cuaderno en la columna «Propuesta».",
      "Puntuad del 1 al 5 en las celdas ámbar: el «Resultado» se calcula solo.",
      "Abajo, en «Nuestra decisión», escribid la ganadora y por qué.",
    ],
    notas: "La hoja «Ejemplo» tiene las tres propuestas de la explicación con sus resultados (4,35; 3,30; 4,20), por si alguien quiere comprobar el formato. Los pesos están escritos dentro de la fórmula: en el paso 5 del ejercicio hay que cambiarlos en las tres filas.",
  },
  {
    antes: "Ficha exprés con IA", titulo: "Abrid el documento del proyecto", archivo: "documento", tiempo: "Min. 145 · Parejas",
    pasos: [
      "El prompt está en la página de trabajo: pedid la ficha a la IA.",
      "Pegad la respuesta en los apartados 1 a 6, en versión corta.",
      "Corregid tres cosas y anotadlas en la página de trabajo. Guardad el archivo.",
    ],
    notas: "La ficha exprés ya no es un archivo aparte: es la primera versión del documento del proyecto. En el bloque 4 se amplía en este mismo archivo, así que tienen que guardarlo bien (nombre de la pareja en el nombre del archivo).",
  },
  {
    antes: "Antes de seguir, ponedla a prueba", titulo: "Seguimos en el documento del proyecto", archivo: "documento", tiempo: "Min. 165 · Parejas",
    pasos: [
      "En el intercambio, apuntad en la página de trabajo las preguntas que no sepáis responder.",
      "Después, ampliad cada apartado y rellenad lo marcado «bloque 4».",
      "Antes de entregar, repasad la lista de la página de trabajo. Máximo dos páginas.",
    ],
    notas: "Es el mismo archivo del bloque 3. Lo marcado «bloque 4» son los indicadores, el coste, las medidas preventivas y los tres pasos. La página de trabajo no cuenta en las dos páginas.",
  },
  {
    antes: "Presentación en tres diapositivas", titulo: "Abrid la plantilla de la presentación", archivo: "presentacion", tiempo: "Min. 210 · Parejas",
    pasos: [
      "Haced clic en cada recuadro y escribid: la pista desaparece.",
      "Una idea por diapositiva: llevad del documento solo lo esencial.",
      "Los indicadores, los mismos que en el documento.",
    ],
    notas: "Las pistas son el texto de ayuda de PowerPoint: se ven al editar y no al proyectar, así que no hay que borrarlas. Los criterios de la revisión cruzada están en las notas del orador de la plantilla.",
  },
  {
    antes: "Ensayo: el problema en 20 segundos", titulo: "Volvemos al cuaderno", archivo: "cuaderno", tiempo: "Min. 244 · Parejas",
    pasos: [
      "Id al «Bloque 5»: la primera frase de vuestra presentación va en «Ensayo».",
      "Mientras presentan las demás parejas, rellenad la tabla de observadores.",
      "Al final, la crítica de la IA y vuestro relato para una entrevista.",
    ],
    notas: "El bloque 5 vuelve al cuaderno: el ensayo, la observación de las otras parejas, la IA como evaluadora crítica y el relato individual para una entrevista.",
  },
];

async function main() {
  const { pres, C } = crearPresentacion({ bloque: 0, tituloBloque: "Plantillas", titulo: "Diapositivas de las plantillas" });
  const tarjeta = (s, x, y, w, h, nombre) =>
    s.addShape("roundRect", { x, y, w, h, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: nombre });

  pres.addSection({ title: "Plantillas" });
  for (const d of DIAPOSITIVAS) {
    const a = ARCHIVOS[d.archivo];
    const s = pres.addSlide({ masterName: "CONTENIDO", sectionTitle: "Plantillas" });
    s.addText(d.titulo, { placeholder: "title" });
    etiqueta(s, C, d.tiempo, "personas");

    // Tarjeta del archivo: el motivo del curso (icono en círculo) y el nombre exacto del archivo.
    const tx = M, ty = 1.7, tw = 5.0, th = 4.6;
    tarjeta(s, tx, ty, tw, th, "Archivo");
    await iconoEnCirculo(s, { x: tx + (tw - 1.6) / 2, y: ty + 0.5, d: 1.6, Icon: a.Icon, relleno: C.accent1, iconoHex: HEX.dk1, nombre: "Icono del archivo" });
    s.addText(a.nombre, { ...T, x: tx + 0.2, y: ty + 2.4, w: tw - 0.4, h: 0.8, fontSize: 22, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0, fit: "shrink" });
    s.addText(a.app, { ...T, x: tx + 0.2, y: ty + 3.25, w: tw - 0.4, h: 0.5, fontSize: 16, color: C.accent5, align: "center", valign: "middle", margin: 0 });

    // Tres pasos numerados.
    const px = tx + tw + 0.5, pw = W - M - px;
    d.pasos.forEach((p, i) => {
      const py = ty + 0.2 + i * 1.5;
      s.addShape("ellipse", { x: px, y: py, w: 0.7, h: 0.7, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Paso ${i + 1}` });
      s.addText(String(i + 1), { ...T, x: px, y: py, w: 0.7, h: 0.7, fontSize: 22, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0 });
      s.addText(p, { ...T, x: px + 0.95, y: py - 0.15, w: pw - 0.95, h: 1.0, fontSize: 20, color: C.text1, valign: "middle", margin: 0 });
    });
    s.addNotes(d.notas);
  }
  console.log(await guardar(pres, "plantillas_curso.pptx"));
}

main().catch((e) => { console.error(e); process.exit(1); });

