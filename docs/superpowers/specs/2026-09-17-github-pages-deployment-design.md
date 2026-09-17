# Diseño: despliegue automatizado en GitHub Pages

## Contexto y causa raíz

El proyecto es una aplicación React/Vite que se publica bajo la ruta `/OnlineShop/`.
El build local actual termina correctamente, pero el sitio público está sirviendo un
`docs/` antiguo. Además, existe un branch `gh-pages` independiente con un `index.html`
que apunta a una URL de assets inválida. No hay un workflow de GitHub Actions que
reconstruya y publique la aplicación cuando cambia `main`.

## Objetivo

Hacer que cada push a `main` publique automáticamente la versión actual de la tienda
en GitHub Pages, usando `main` como fuente y `docs/` como directorio de publicación.
El build debe poder ejecutarse también de forma local para verificar el resultado antes
de subir cambios.

## Enfoques considerados

1. **Recomendado: `main /docs` + GitHub Actions**
   - El workflow instala dependencias, ejecuta `npm run build`, configura Pages y
     publica el contenido generado.
   - Mantiene una única fuente de verdad y elimina el desfase entre `src`, `docs` y
     `gh-pages`.

2. **Branch `gh-pages` manual**
   - Ejecutar el build local y publicar `dist` con `gh-pages`.
   - Requiere recordar el despliegue después de cada cambio y mantiene dos ramas con
     artefactos potencialmente distintos.

3. **Branch `gh-pages` automatizado**
   - Un workflow genera `dist` y fuerza una publicación en `gh-pages`.
   - Funciona, pero añade una rama de artefactos y configuración adicional frente al
     flujo nativo de Pages.

Se selecciona el primer enfoque porque coincide con la configuración solicitada,
permite reproducir el build localmente y evita mantener un artefacto de despliegue
separado.

## Diseño técnico

- `vite.config.ts` usará `base: "/OnlineShop/"`, una ruta relativa al dominio de
  GitHub Pages y válida tanto en el build como en la vista previa local.
- El script `build` ejecutará TypeScript y Vite con `outDir: "docs"`, de modo que el
  HTML y los assets publicados se regeneren en el directorio que Pages consume. Antes
  del build, una limpieza acotada eliminará solo los artefactos generados anteriores y
  conservará `docs/superpowers`.
- El workflow `.github/workflows/deploy-pages.yml` se ejecutará en pushes a `main` y
  manualmente. Sus pasos serán checkout, instalación reproducible con `npm ci`,
  configuración de Pages, build, subida del artefacto `docs` y despliegue mediante
  las acciones oficiales de GitHub Pages (`configure-pages@v5`,
  `upload-pages-artifact@v4` y `deploy-pages@v4`).
- El workflow tendrá permisos mínimos: `contents: read`, `pages: write` e
  `id-token: write`, además de la concurrencia para evitar publicaciones simultáneas.
- Se eliminará el script `deploy` basado en `gh-pages` y la dependencia de `gh-pages`,
  porque ya no será parte del flujo activo.
- La configuración de Pages deberá quedar apuntando a **GitHub Actions** en los
  ajustes del repositorio. El workflow no puede cambiar ese ajuste del repositorio
  desde el código; se dejará indicado como requisito de activación si la configuración
  actual todavía usa una rama.

## Flujo de datos

`push a main` → `npm ci` → `npm run build` → `docs/index.html + docs/assets/*` →
`upload-pages-artifact` → `deploy-pages` → `https://CebrianAlvaro9.github.io/OnlineShop/`.

La aplicación seguirá consumiendo el endpoint de productos desde el navegador; el
despliegue solo empaqueta los archivos estáticos.

## Manejo de errores

- Si TypeScript, ESLint o Vite fallan, el workflow termina antes de publicar un
  artefacto nuevo.
- El build se verificará localmente comprobando que `docs/index.html` exista y que sus
  referencias a JavaScript y CSS apunten a archivos presentes bajo `docs/assets`.
- Se conservará la copia local de `docs` versionada para que el branch `main` sea
  autosuficiente y el sitio no dependa de artefactos ignorados como `dist`.

## Verificación

- Ejecutar las pruebas existentes con `node --test tests/*.test.mjs`.
- Ejecutar `npm run lint`.
- Ejecutar `npm run build` y revisar el contenido de `docs`.
- Comprobar que el HTML generado use `/OnlineShop/` y que cada asset referenciado
  exista.
- Revisar el diff para confirmar que solo se modifican la configuración de build,
  el workflow y los artefactos `docs` regenerados.
