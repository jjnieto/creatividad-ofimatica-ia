# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

No es un proyecto de software: no hay build, lint ni tests. Contiene material docente en Markdown, escrito en español, para un taller de 5 horas (300 minutos) titulado «Desarrollo de las habilidades creativas e innovadoras con herramientas ofimáticas y de inteligencia artificial», dirigido a personas desempleadas con nivel intermedio en ofimática e IA.

El único documento actual es `guion_docente_creatividad_ofimatica_ia_5_horas.md`.

## Diapositivas

Las presentaciones de apoyo están en `diapositivas/`, una por bloque (`bloqueN.pptx`). La primera versión de cada una se genera con `pptxgenjs` a partir de un script por bloque (`bloqueN.js`).

**El PowerPoint manda.** El usuario edita los `.pptx` a mano en PowerPoint. Un `.pptx` existente **nunca se regenera**: los cambios se hacen editando el archivo en el sitio (añadir o modificar diapositivas concretas) y conservando todo lo demás. Antes de tocarlo, el usuario debe guardarlo y cerrarlo, y se hace commit de su versión tal cual. `guardar()` en `comun.js` se niega a sobrescribir un `.pptx` que ya existe. Los scripts `bloqueN.js` quedan como registro de la primera versión y ya no reflejan el contenido actual del `.pptx`.

```bash
cd diapositivas
npm install                      # solo la primera vez
node bloqueN.js                  # primera versión de bloqueN.pptx (falla si ya existe)
SALIDA=/ruta/prueba.pptx node bloqueN.js   # generar en otra ruta sin tocar el original
powershell -ExecutionPolicy Bypass -File renderizar.ps1 bloqueN.pptx render   # PNG por diapositiva con PowerPoint, para revisarlas
```

- `comun.js`: tema (colores y fuentes), layouts (`PORTADA`, `SECCION`, `CONTENIDO`, `DESTACADO`) y piezas reutilizables (`etiqueta`, `iconoEnCirculo`, `linea`, `guardar`). `apply_theme.js` escribe los colores del tema en el `.pptx` tras generarlo.
- Código de color fijo en todo el curso: **ámbar = trabajo de las personas (sin IA), verde azulado = IA**. Cada diapositiva de contenido lleva arriba a la derecha una etiqueta con los minutos del guion y la modalidad.
- `historia_unreal.pptx` (script `historia_unreal.js`) es una presentación aparte, de apoyo a la regla «primero las personas»: la historia de Unreal Engine 5 con fuentes. El repositorio es público: no se incluyen capturas con derechos de autor, sino huecos señalados para que el docente las pegue.
- Las indicaciones para el docente (tiempos, respuestas orientativas) van en las notas del orador, no en la diapositiva.
- Al generar, validar con el script `validate.py` de la skill de pptx y revisar las imágenes renderizadas.

## Flujo de trabajo con git

Tras cada cambio, hacer commit (mensaje en español) y `git push origin main` sin pedir confirmación. Se trabaja directamente en `main`; el remoto es `https://github.com/jjnieto/creatividad-ofimatica-ia`.

## Estructura del guion

1. Enfoque y objetivos (resultados de aprendizaje).
2. Cronograma general: tabla de 5 bloques con duración y minutos acumulados.
3. Desarrollo por bloques. Cada bloque tiene un **Objetivo** y subsecciones con el encabezado `#### Minutos X–Y. Título`, que deben encadenarse sin huecos ni solapes.
4. Rúbrica de evaluación (suma 100 puntos).
5. Materiales que debe preparar el docente.
6. Orientaciones metodológicas finales.
7. Ejercicios de reserva: se usan en orden solo si sobra tiempo al final; son independientes, de 20–30 minutos con la corrección incluida, y cada uno lleva «Qué buscar al corregir». El primero es el caso de la comunidad de vecinos.

Hilo conductor entre bloques: los ejercicios se reutilizan (las tres propuestas que cada pareja selecciona al final del bloque 2, a partir de SCAMPER y provocación, se puntúan en la matriz del Ejercicio 4 del bloque 3), y el bloque 4 integra todo en el caso ficticio «Oficina Futuro», cuyos entregables (documento, matriz y tres diapositivas) se presentan en el bloque 5.

## Coherencias que hay que mantener al editar

- **Tiempos:** si se cambia la duración de una actividad, actualizar los rangos `Minutos X–Y` de todo el bloque, la tabla del cronograma (duración y minutos acumulados), el total de 300 minutos y la nota sobre el descanso de 15 minutos.
- **Matriz de decisión (bloque 3):** los pesos deben sumar 100 % y coincidir con la fórmula de Excel (`=B2*35%+C2*30%+D2*20%+E2*15%`); recalcular la columna «Resultado» si cambian puntuaciones o pesos. Los decimales usan coma (4,35).
- **Rúbrica:** los máximos de los criterios deben sumar 100.
- **Referencias cruzadas:** número de ejercicios, de diapositivas, de parejas (16 personas → 8 parejas) y la lista de materiales deben concordar con el desarrollo de los bloques.
- **Herramientas:** se mencionan siempre por pares equivalentes (Word / Google Docs, Excel / Google Sheets, PowerPoint / Google Slides) y la IA de forma genérica.

## Convenciones de contenido

- Cada tramo de minutos debe tener una actividad del alumnado (votación, clasificación, cálculo, ronda, ensayo...), no solo explicación del docente: un tramo que solo es «explicar» no llena el tiempo asignado. Dentro de un tramo largo, se desglosa en sub-tramos en negrita («**Minutos X–Y.** ...»).

- Técnicas creativas: brainstorming (bloque 1, entre todo el grupo), SCAMPER y provocación (bloque 2, por parejas). Cada una sigue el mismo patrón: explicación con el ejemplo común de la peluquería, ronda sin IA, ronda con IA con un prompt optimizado (seguido de «Por qué funciona este prompt») y comparación. Las personas siempre van antes que la IA.

- Español de España con ortografía y tildes completas; tratamiento de «vosotros» al dirigirse al grupo.
- Los prompts para proyectar van en bloques ```` ```text ````; las fórmulas en ```` ```excel ````.
- Mensajes recurrentes que no deben perderse: no inventar cifras ni resultados (los datos del caso son supuestos didácticos), no introducir información personal o confidencial en IA no autorizada, verificar siempre las respuestas de la IA y presentar el proyecto como simulación formativa.
- Orientación metodológica: nivel intermedio (no explicar funciones básicas), ~25 % explicación / ~75 % práctica, casos transferibles a puestos administrativos, comerciales y de atención al cliente.
