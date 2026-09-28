#!/usr/bin/env node
/**
 * Builds the shadcn registry (public/r) and mirrors the registry source +
 * built items to the public GitHub registry repo.
 *
 * Usage:
 *   node scripts/publish-registry.mjs            # build only
 *   REGISTRY_REPO_DIR=/path/to/ziwako-blocks node scripts/publish-registry.mjs
 *
 * The mirror target (REGISTRY_REPO_DIR) is a clone of the public repo
 * (e.g. github.com/tbjac225/ziwako-blocks). After mirroring, commit + tag + push
 * from that working copy.
 */
import { execSync } from "node:child_process"
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")

console.log("→ Building registry (public/r)…")
execSync("npx --yes shadcn@latest build registry.json --output public/r", {
  cwd: root,
  stdio: "inherit",
})

const repoDir = process.env.REGISTRY_REPO_DIR
if (!repoDir) {
  console.log("✓ Registry built. Set REGISTRY_REPO_DIR to mirror it to the public repo.")
  process.exit(0)
}

const target = resolve(repoDir)
if (!existsSync(target)) {
  console.error(`✗ REGISTRY_REPO_DIR does not exist: ${target}`)
  process.exit(1)
}

const includes = [
  "registry.json",
  "public",
  "src",
  "package.json",
  "README.md",
]
for (const entry of includes) {
  const src = join(root, entry)
  if (!existsSync(src)) continue
  const dest = join(target, entry)
  mkdirSync(dirname(dest), { recursive: true })
  rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, { recursive: true })
  console.log(`  mirrored ${entry}`)
}
console.log(`✓ Mirrored registry to ${target}. Commit, tag and push from there.`)
