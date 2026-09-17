import { rmSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")

for (const generatedPath of ["docs/assets", "docs/index.html", "docs/vite.svg"]) {
  rmSync(resolve(projectRoot, generatedPath), { force: true, recursive: true })
}
