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
