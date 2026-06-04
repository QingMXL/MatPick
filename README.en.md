<div align="center">

# 拾材集 · MatPick

**面向酒店 / 商业空间设计师的材料协同 SaaS 平台 · V1.0 MVP**

A material-collaboration SaaS for hotel & commercial-space designers · V1.0 MVP

</div>

---

> 🌐 [切换中文](README.md)

## Overview

MatPick brings the entire *find material → AI region detection → material replacement preview → smart quote → supplier order* loop into one workspace. **For designers**, it eliminates the constant context-switching between spreadsheets, group chats, and supplier calls — from uploading a render to issuing a quote, everything stays on one screen. **For material suppliers**, it provides a structured digital order channel where enquiries, confirmations, shipments, and after-sales status are all visible at a glance, cutting down manual reconciliation.

## Screenshots

<table>
<tr>
<td width="50%">
<b>Dashboard</b><br/>
<img src="docs/screenshots/01-dashboard.png" width="100%">
</td>
<td width="50%">
<b>Plan Upload + AI Recognition</b><br/>
<img src="docs/screenshots/02-upload-ai-recognition.png" width="100%">
</td>
</tr>
<tr>
<td width="50%">
<b>Material Workspace</b><br/>
<img src="docs/screenshots/03-material-workspace.png" width="100%">
</td>
<td width="50%">
<b>Material Library</b><br/>
<img src="docs/screenshots/04-material-library.png" width="100%">
</td>
</tr>
<tr>
<td width="50%">
<b>Smart Quote</b><br/>
<img src="docs/screenshots/06-smart-quote.png" width="100%">
</td>
<td width="50%">
<b>Similar-Material Comparison</b><br/>
<img src="docs/screenshots/07-similar-comparison.png" width="100%">
</td>
</tr>
<tr>
<td width="50%">
<b>Orders</b><br/>
<img src="docs/screenshots/08-orders.png" width="100%">
</td>
<td width="50%">
<b>Material Detail</b><br/>
<img src="docs/screenshots/05-material-detail.png" width="100%">
</td>
</tr>
</table>

## Key Features

| Feature | Description |
| --- | --- |
| 🪄 **AI Region Detection** | Auto-detects walls / floors / ceilings / cabinets / soft furnishings and calculates area after plan upload |
| 🎨 **Material Workspace** | Select a region on the render, replace with one click from the library, and see an A/B preview instantly |
| 📚 **Material Library** | 12,000+ SKUs with category, eco/fire rating, and price-range filters; multi-select for comparison |
| 💰 **Smart Quote** | Auto-generates quotes by region × material × loss rate × tax × shipping, with version history |
| 🔄 **Similar-Material Comparison** | AI-recommended alternatives ranked by similarity, unit price, lead time, and savings |
| 📦 **Supplier Orders** | Grouped by supplier; order status timeline (pending → confirmed → shipped → delivered → after-sales) |
| 👥 **Team Collaboration** | Project activity, todos, messages, and collaborators in one place |

## Quick Start

```bash
# Node.js ≥ 18.18 recommended
npm install
npm run dev          # http://localhost:3000, redirects to /dashboard

# Production build
npm run build && npm start
```

Best viewed at ≥ 1440 px browser width.

## Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) | File routing + RSC, ready for server APIs |
| Types | TypeScript 5 | All domain types in `lib/types.ts` |
| Styling | Tailwind CSS 3 | Brand colors & design tokens in `tailwind.config.ts` |
| Icons | lucide-react | Matches the minimal brand language |
| Mock data | Local TS modules (`lib/mock/*`) | Field names track real-API conventions |
| Visual assets | Procedural SVG + gradients | No external image hosts; runs fully offline |

## Directory Layout

```
app/
  (app)/
    dashboard/          # Dashboard
    projects/[id]/
      upload/           # Plan upload + simulated AI recognition
      workspace/        # Material replacement workspace (core)
      quote/            # Smart quote
    materials/[id]      # Material library + detail
    compare/            # Similar-material comparison
    orders/             # Orders grouped by supplier
components/
  layout/               # Sidebar / Header / Logo / Breadcrumbs
  ui/                   # Button / Card / Badge / Input …
lib/
  types.ts              # Domain entity types
  mock/                 # projects, materials, suppliers, quotes, comparisons, orders, social
```

## Production Roadmap

1. **AI recognition / material replacement** — SAM2 segmentation + Diffusion + ControlNet for texture transfer
2. **File upload** — replace dropzone with S3 / OSS pre-signed PUT
3. **Quote export** — `@react-pdf/renderer` for PDF; `exceljs` for .xlsx
4. **Supplier integration** — quote-request + order-create endpoints; ERP webhook for status updates
5. **Global search** — Meilisearch / Typesense + ⌘ K command palette

## Known Limitations

- Visuals are procedurally generated — fine for flow demos
- Form interactions are mocked and not persisted; state resets on reload
- No unit / e2e tests yet

## License

For internal demo and design review only.
