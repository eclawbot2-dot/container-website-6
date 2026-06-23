# The Container — Site 6 (Shipping-Manifest / Terminal edition)

Bilingual (EN/AR) static site for **The Container**, Jeddah's industrial techno & house
venue at Shams Container Terminal on the Red Sea port.

Design: a cargo-manifest / bill-of-lading / port-departures-board data aesthetic —
monospace type, amber/green phosphor on near-black, container ID codes, stencil stamps,
dotted leaders, and the event lineup framed as a vessel manifest (VESSEL/ARTIST · ETD ·
BAY/STAGE · STATUS: BOARDING).

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Static export (`output: 'export'`)
- Self-hosted imagery; no runtime APIs

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Bilingual
EN (LTR) / AR (RTL, IBM Plex Sans Arabic). Toggle persists to `localStorage` and sets
`<html lang/dir>`. The manifest table mirrors correctly in RTL.

Content (lineup, translations, handle, contact) is reused from the original
`container-website` repo — no fabrication.
