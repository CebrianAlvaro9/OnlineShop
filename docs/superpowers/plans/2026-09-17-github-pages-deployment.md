# Automated GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every push to `main` build the Vite storefront and deploy the current static output to GitHub Pages automatically.

**Architecture:** Keep `main` as the only source branch. Vite writes the deployable site to `docs/`, preserving the existing `docs/superpowers` documentation, and the official GitHub Pages Actions upload and deploy that directory. The generated HTML uses the repository base path `/OnlineShop/` so asset URLs work on the project site.

**Tech Stack:** React 18, Vite 5, TypeScript, npm lockfile, Node test runner, GitHub Actions Pages deployment.

## Global Constraints

- Publish under the repository path `/OnlineShop/`.
- Use `npm ci` in CI for reproducible dependency installation.
- Use the official `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4` actions.
- Keep Pages permissions minimal: `contents: read`, `pages: write`, and `id-token: write`.
- Preserve `docs/superpowers` while regenerating the site under `docs/`.
- Do not keep a second active manual deployment path through `gh-pages`.

## File Map

- Create: `tests/deploy-workflow.test.mjs` — static contract tests for the build base path, scripts, and Pages workflow.
- Modify: `vite.config.ts` — set the project base path and `docs` output directory.
- Modify: `package.json` — remove the obsolete `gh-pages` deployment script and dependency.
- Modify: `package-lock.json` — regenerate the lockfile after removing `gh-pages`.
- Create: `.github/workflows/deploy-pages.yml` — build and deploy on pushes to `main` and manual dispatches.
- Regenerate: `docs/index.html` and `docs/assets/*` — current production output produced by `npm run build`.

### Task 1: Add the failing deployment contract test

**Files:**
- Create: `tests/deploy-workflow.test.mjs`

**Interfaces:**
- Consumes: `vite.config.ts`, `package.json`, and `.github/workflows/deploy-pages.yml` as text.
- Produces: named tests proving the expected deployment contract before configuration changes are made.

- [ ] **Step 1: Write the failing test**

Create `tests/deploy-workflow.test.mjs` with these checks:

```js
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const read = (file) => {
  const path = resolve(root, file)
  return existsSync(path) ? readFileSync(path, "utf8") : ""
}

test("Vite builds the project site under the GitHub Pages path", () => {
  const config = read("vite.config.ts")

  assert.match(config, /base:\s*["']\/OnlineShop\/["']/)
  assert.match(config, /outDir:\s*["']docs["']/)
})

test("the package no longer exposes the manual gh-pages deployment", () => {
  const packageJson = JSON.parse(read("package.json"))

  assert.equal(packageJson.scripts.deploy, undefined)
  assert.equal(packageJson.scripts.predeploy, undefined)
  assert.equal(packageJson.devDependencies["gh-pages"], undefined)
})

test("GitHub Actions builds and deploys docs on main", () => {
  const workflow = read(".github/workflows/deploy-pages.yml")

  assert.match(workflow, /branches:\s*\[main\]/)
  assert.match(workflow, /npm ci/)
  assert.match(workflow, /npm run build/)
  assert.match(workflow, /actions\/upload-pages-artifact@v3/)
  assert.match(workflow, /path:\s*docs/)
  assert.match(workflow, /actions\/deploy-pages@v4/)
  assert.match(workflow, /pages:\s*write/)
  assert.match(workflow, /id-token:\s*write/)
})
```

- [ ] **Step 2: Run the test to verify it fails for the missing contract**

Run: `node --test tests/deploy-workflow.test.mjs`

Expected: FAIL because the current base is a full URL, `package.json` still contains `deploy`/`predeploy` and `gh-pages`, and `.github/workflows/deploy-pages.yml` does not exist.

- [ ] **Step 3: Commit the red test**

```bash
git add tests/deploy-workflow.test.mjs
git commit -m "test: define GitHub Pages deployment contract"
```

### Task 2: Configure Vite and npm for the tracked Pages output

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: the existing TypeScript/Vite build command.
- Produces: `npm run build` that writes the deployable site to `docs/` and uses `/OnlineShop/` for assets.

- [ ] **Step 1: Set the minimal Vite configuration**

Update `vite.config.ts` to:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/OnlineShop/",
  build: {
    outDir: "docs",
    emptyOutDir: false,
  },
});
```

`emptyOutDir: false` is required because `docs/superpowers` contains the committed design and implementation documentation that must survive a site build.

- [ ] **Step 2: Remove the obsolete manual deployment entries**

Update the `scripts` and `devDependencies` in `package.json` so they become:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Remove only `predeploy`, `deploy`, and the `gh-pages` dev dependency. Keep the remaining dependencies and versions unchanged.

- [ ] **Step 3: Regenerate the lockfile**

Run: `npm uninstall --package-lock-only gh-pages`

Expected: `package-lock.json` no longer contains the `gh-pages` package while the rest of the dependency graph remains intact.

- [ ] **Step 4: Run the focused contract test**

Run: `node --test tests/deploy-workflow.test.mjs`

Expected: the Vite and npm tests pass; the workflow test remains the only failing test until Task 3 creates the workflow.

- [ ] **Step 5: Commit the build configuration**

```bash
git add vite.config.ts package.json package-lock.json
git commit -m "build: target tracked GitHub Pages output"
```

### Task 3: Add the official GitHub Pages workflow

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- Consumes: `npm ci`, `npm run build`, and the generated `docs/` directory.
- Produces: a Pages deployment for each push to `main` and each manual workflow dispatch.

- [ ] **Step 1: Create the workflow**

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Run all static tests**

Run: `node --test tests/*.test.mjs`

Expected: all existing UI contract tests and the three deployment contract tests pass.

- [ ] **Step 3: Commit the workflow**

```bash
git add .github/workflows/deploy-pages.yml
git commit -m "ci: automate GitHub Pages deployment"
```

### Task 4: Generate and verify the deployable site

**Files:**
- Regenerate: `docs/index.html`
- Regenerate: `docs/assets/*`
- Preserve: `docs/superpowers/*`

**Interfaces:**
- Consumes: the configured Vite build.
- Produces: a current `docs` artifact whose referenced JavaScript and CSS files exist.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: exit code 0, a Vite success line, and updated files under `docs/`.

- [ ] **Step 2: Verify generated asset paths and files**

Run:

```bash
node -e 'const fs=require("node:fs"); const html=fs.readFileSync("docs/index.html","utf8"); const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(([,ref])=>ref).filter((ref)=>ref.includes("assets/")); if (!html.includes("/OnlineShop/")) throw new Error("missing /OnlineShop/ base path"); for (const ref of refs) { const path=ref.startsWith("/") ? ref.replace(/^\/OnlineShop\//, "docs/") : `docs/${ref.replace(/^\.\//, "")}`; if (!fs.existsSync(path)) throw new Error(`missing asset: ${path}`); } console.log(`verified ${refs.length} generated asset references`);'
```

Expected: the command prints `verified 2 generated asset references` and exits 0.

- [ ] **Step 3: Run the full verification suite**

Run: `node --test tests/*.test.mjs && npm run lint && npm run build`

Expected: all tests pass, ESLint exits 0, and the final build exits 0.

- [ ] **Step 4: Review the final diff**

Run: `git status --short` and `git diff --stat HEAD~3..HEAD`.

Expected: only the deployment test, Vite/package configuration, workflow, and regenerated `docs` build are changed; `docs/superpowers` remains present.

- [ ] **Step 5: Commit the generated site**

```bash
git add docs
git commit -m "build: refresh GitHub Pages artifact"
```

