# HANDTRIX — Arcade Neon

Juego de bloques con gestos de mano. Se publica con GitHub Pages desde la rama `main`.

- `index.html`: el juego completo.
- `manifest.webmanifest`, `sw.js`, íconos: lo que lo hace instalable como app.
- `vendor/mediapipe/` y `three.module.js`: librerías locales para jugar sin conexión (ver más abajo).

## Archivos que hay que agregar a mano
El juego busca estos archivos en el mismo repo. Sin ellos, three.js se descarga de internet, pero el seguimiento de manos no arranca:

- `three.module.js` (three@0.160.0, `build/three.module.js`)
- `vendor/mediapipe/vision_bundle.mjs`
- `vendor/mediapipe/wasm/` (los archivos `vision_wasm_internal.*` de `@mediapipe/tasks-vision`)
- `vendor/mediapipe/hand_landmarker.task`
