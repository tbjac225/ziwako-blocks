# @ziwako/blocks

Prop-ified marketing/layout **blocks** for the Ziwako ecosystem (web-only).

Single source of truth with **dual distribution**:

- **npm** — `npm i @ziwako/blocks` → `import { Hero } from '@ziwako/blocks/hero'`
- **shadcn registry** — `npx shadcn@latest add @ziwako/hero` (copy-in, customisable)

Blocks are self-contained on `@ziwako/ui` + `next`; they carry **no business data**
(datasets come from props).

## Blocks

`theme-toggle`, `logo`, `cta`, `hero`, `features`, `testimonials`, `navbar`,
`footer`, `page-header`, `marquee`, `reveal`, `section`, `stats`.

## Authoring

The block source lives in `src/blocks/*.tsx`. Each block is also declared as a
`registry:block` item in `registry.json`, built with:

```bash
npm run registry   # -> public/r/*.json
```
