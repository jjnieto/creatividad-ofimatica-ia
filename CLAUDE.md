# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

No es un proyecto de software: no hay build, lint ni tests. Contiene material docente en Markdown, escrito en español, para un taller de 5 horas (300 minutos) titulado «Desarrollo de las habilidades creativas e innovadoras con herramientas ofimáticas y de inteligencia artificial», dirigido a personas desempleadas con nivel intermedio en ofimática e IA.

El único documento actual es `guion_docente_creatividad_ofimatica_ia_5_horas.md`.

## Flujo de trabajo con git

Tras cada cambio, hacer commit (mensaje en español) y `git push origin main` sin pedir confirmación. Se trabaja directamente en `main`; el remoto es `https://github.com/jjnieto/creatividad-ofimatica-ia`.

## Estructura del guion

1. Enfoque y objetivos. Tres decisiones de diseño que no deben romperse: un único caso de principio a fin, primero personas y después IA en cada técnica, y «la IA produce, la persona decide» (no se enseñan funciones de ofimática que la IA ya resuelve).
2. El caso: Comunidad de propietarios Los Almendros, 14. El enunciado da solo datos base, sin listar problemas (los aporta el alumnado). Incluye la lista de respaldo, el reto de referencia y la tabla de los cuatro giros.
3. Cronograma general: bloques, descanso de 15 minutos y margen final, con minutos acumulados.
4. Desarrollo por bloques. Cada bloque tiene un **Objetivo** y subsecciones `#### Minutos X–Y. Título` (o `#####` dentro de las técnicas del bloque 2) que deben encadenarse sin huecos ni solapes.
5. Rúbrica de evaluación (suma 100 puntos).
6. Ejercicios de reserva: cuatro, independientes entre sí, de 20–30 minutos con la corrección incluida, cada uno con «Qué buscar al corregir».
7. Materiales. 8. Orientaciones metodológicas (incluye el orden de recortes si se va con retraso).
Anexos A (circular con errores, bloque 3) y B (matriz con errores, reserva 3), cada uno con su solución.

Hilo conductor: el reto común se formula en el bloque 1; cada técnica del bloque 2 se practica sin IA y con IA sobre él y se anota en la tabla de registro, que se retoma en el cierre del bloque 5; cada pareja elige una idea principal distinta y la convierte en ficha, matriz y tres diapositivas que defiende ante «la junta». Los ejemplos que ilustran cada técnica son ajenos al caso; la práctica siempre es sobre el caso.

## Coherencias que hay que mantener al editar

- **Tiempos:** si cambia la duración de una actividad, actualizar los rangos `Minutos X–Y`, la tabla del cronograma, el momento de cada giro en la tabla de giros y el total de 300 minutos.
- **Giros:** el contenido de cada giro aparece en la tabla de giros y en el bloque donde se introduce; deben coincidir. Los prompts y materiales posteriores a un giro deben respetarlo (p. ej., tras el giro 1 nada puede depender solo de WhatsApp o smartphone).
- **Cálculos:** las matrices usan pesos 35/30/20/15 (Bajo coste: 5 = muy económica); recalcular los resultados si cambian puntuaciones o pesos. Los anexos tienen errores intencionados: si se toca el texto, actualizar la tabla de solución y comprobar las cifras corregidas. Decimales con coma (4,35).
- **Rúbrica:** los máximos deben sumar 100.
- **Referencias cruzadas:** número de giros, ejercicios de reserva, diapositivas, parejas (16 personas → 8 parejas) y la lista de materiales deben concordar con el desarrollo.
- **Herramientas:** por pares equivalentes (Word / Google Docs, Excel / Google Sheets, PowerPoint / Google Slides) y la IA de forma genérica; se asume IA de chat gratuita, no IA integrada en la suite.

## Convenciones de contenido

- Español de España con ortografía y tildes completas; tratamiento de «vosotros» al dirigirse al grupo.
- Los prompts para proyectar van en bloques ```` ```text ````.
- Mensajes recurrentes que no deben perderse: no inventar cifras, normas ni resultados; no introducir datos personales en IA no autorizada; verificar siempre lo que entrega la IA; presentar el proyecto como simulación formativa; no adelantar la conclusión sobre el binomio persona + IA (la saca el grupo de sus datos).
- Afirmaciones legales (Ley de Propiedad Horizontal, protección de datos): no afirmar reglas concretas; remitir a comprobar en fuentes oficiales.
- El caso es neutro a propósito: se descartó usar la oficina de empleo para evitar que el curso se convierta en una sesión de quejas de un alumnado desempleado.
