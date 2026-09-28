#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const distBlocks = resolve(import.meta.dirname, '..', 'dist', 'blocks')

// Blocks that use hooks / event handlers / browser APIs and MUST be client.
const clientBlocks = ['theme-toggle', 'navbar', 'testimonials', 'reveal']

for (const name of clientBlocks) {
  const file = join(distBlocks, `${name}.js`)
  if (!existsSync(file)) continue
  const content = readFileSync(file, 'utf-8')
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, '"use client";\n' + content)
    console.log(`✅ Added "use client" to dist/blocks/${name}.js`)
  }
}
