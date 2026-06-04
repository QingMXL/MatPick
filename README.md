<div align="center">

[中文版](#简体中文) ｜ [English](#english)

---

# 拾材集 · MatPick

**面向酒店 / 商业空间设计师的材料协同 SaaS 平台 · V1.0 MVP**

A material-collaboration SaaS platform for hotel & commercial-space designers · V1.0 MVP

</div>

---

## 产品截图 · Screenshots

### 工作台 · Dashboard
![工作台](docs/screenshots/01-dashboard.png)

### 方案上传 + AI 区域识别 · Plan Upload + AI Recognition
![方案上传与AI识别](docs/screenshots/02-upload-ai-recognition.png)

### 材质替换工作区 · Material Workspace
![材质替换工作区](docs/screenshots/03-material-workspace.png)

### 材料库 · Material Library
![材料库](docs/screenshots/04-material-library.png)

### 智能报价 · Smart Quote
![智能报价](docs/screenshots/06-smart-quote.png)

### 相似材料比价 · Similar-Material Comparison
![相似材料比价](docs/screenshots/07-similar-comparison.png)

### 订单管理 · Orders
![订单管理](docs/screenshots/08-orders.png)

---

<a id="简体中文"></a>

## 简体中文

**拾材集（MatPick）** 是一个面向酒店设计师、商业空间设计师与设计公司项目负责人的电脑端 SaaS 平台。它把"找材料 → 上方案 → 看效果 → 算报价 → 发订单"这条原本散落在 Excel、聊天群和供应商电话里的流程，整合到一个工作区里完成。

### 核心功能

| 功能 | 说明 |
| --- | --- |
| 🪄 **AI 区域识别** | 上传效果图后自动识别墙面 / 地面 / 顶面 / 柜体 / 软装等区域并测算面积 |
| 🎨 **材质替换工作区** | 在效果图上选区，从材料库一键替换并实时预览替换前后对比 |
| 📚 **材料库** | 12000+ 材料 SKU，支持分类、环保 / 防火等级、价格区间筛选与多选比价 |
| 💰 **智能报价** | 自动按区域 × 材料 × 损耗 × 税费 × 运费生成报价单，带版本历史 |
| 🔄 **相似材料比价** | AI 推荐相似材料，按相似度、单价、交期、节省额度排序，一键替换 |
| 📦 **订货协同** | 按供应商分组下单，订单状态时间线（待确认 / 待发货 / 运输中 / 已完成 / 售后） |
| 👥 **团队协作** | 项目动态、待办、消息、协作成员，多人共同推进方案 |

### 快速开始

```bash
# 建议 Node.js ≥ 18.18
npm install
npm run dev          # http://localhost:3000，默认跳转 /dashboard

# 生产构建
npm run build && npm start
```

建议使用 1440 px 及以上宽度的浏览器窗口体验。

### 技术栈

| 模块 | 选择 | 说明 |
| --- | --- | --- |
| 前端框架 | Next.js 14 (App Router) | 文件路由 + RSC，便于未来接入服务端 API |
| 类型系统 | TypeScript 5 | 全部业务模型集中在 `lib/types.ts` |
| 样式 | Tailwind CSS 3 | `tailwind.config.ts` 内置品牌色与设计 token |
| 图标 | lucide-react | 与品牌的简洁设计语言一致 |
| Mock 数据 | 本地 TS 模块（`lib/mock/*`） | 字段命名贴近真实接口，便于平移到 REST/GraphQL |
| 视觉素材 | 程序化绘制（SVG + 渐变） | 不依赖任何外部图床，完全离线可演示 |

### 目录结构

```
app/
  (app)/
    dashboard/          # 工作台
    projects/           # 项目列表
      [id]/
        upload/         # 方案上传 + AI 识别
        workspace/      # 材质替换工作区（核心）
        quote/          # 智能报价
    materials/[id]      # 材料库 + 详情
    quotes/             # 报价总览
    compare/            # 相似材料比价
    orders/             # 订单
    favorites/ team/ settings/
components/
  layout/               # Sidebar / Header / Logo / 面包屑
  ui/                   # Button / Card / Badge / Input 等
lib/
  types.ts              # 业务实体类型
  mock/                 # 项目、材料、供应商、报价、比价、订单、社交数据
```

### 页面清单

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/dashboard` | 工作台 | 欢迎语、关键指标、最近项目、待办、消息、动态、交付日历 |
| `/projects` | 项目列表 | 状态 / 阶段 / 城市筛选 · 卡片视图 |
| `/projects/[id]` | 项目详情 | 元数据 · 方案空间 · 协作 · 动态 |
| `/projects/[id]/upload` | 方案上传 | 4 步流程 · 拖拽上传 · AI 识别状态条 · 跳转工作区 |
| `/projects/[id]/workspace` | 材质替换工作区 | 区域 SVG 选区 · 材料库 · 替换控制 · 对比预览 · 价格条 |
| `/projects/[id]/quote` | 智能报价 | 区域明细表 · 汇总卡 · 版本历史 · AI 节省提示 |
| `/materials` | 材料库 | 分类 + 等级 + 价格筛选 · 卡片网格 · 多选对比浮动栏 |
| `/materials/[id]` | 材料详情 | 多图、规格属性、供应商档案、应用案例 |
| `/compare` | 相似材料比价 | 当前 vs 推荐对比 · 相似度 · 单价 / 交期 / 节省 · 一键采用 |
| `/orders` | 订单 | 按供应商分组、状态筛选、详情侧边栏、进度时间线 |

### 后续接入建议

1. **AI 识别 / 材质替换** — SAM2 输出多边形掩码 + Diffusion + ControlNet 做纹理替换
2. **文件上传** — dropzone 替换为 S3 / OSS 预签名 PUT
3. **报价导出** — `@react-pdf/renderer` 生成 PDF；`exceljs` 生成 .xlsx
4. **供应商对接** — 开放询价 + 订单创建接口；ERP webhook 回填订单状态
5. **全局搜索** — 接入 Meilisearch / Typesense，⌘ K 命令面板
6. **权限模型** — 路由级别角色校验
7. **国际化** — 引入 `next-intl`，迁移展示字符串到 `messages/zh-CN.json`

### 已知限制

- 视觉素材为程序化绘制，仅用于演示流程
- 表单交互为前端模拟，未持久化，刷新后状态重置
- 暂无单元测试 / e2e

### 许可

仅用于内部演示与设计验收。

---

<a id="english"></a>

## English

**MatPick** is a desktop SaaS that lets hotel and commercial interior designers handle the full *find material → upload plan → preview → quote → order* loop in one workspace, instead of bouncing between spreadsheets, group chats, and supplier calls.

### Key Features

| Feature | Description |
| --- | --- |
| 🪄 **AI Region Detection** | Auto-detects walls / floors / ceilings / cabinets / soft furnishings and calculates area after plan upload |
| 🎨 **Material Workspace** | Select a region on the render, replace with one click from the library, and see an A/B preview instantly |
| 📚 **Material Library** | 12,000+ SKUs with category, eco/fire rating, and price-range filters; multi-select for comparison |
| 💰 **Smart Quote** | Auto-generates quotes by region × material × loss rate × tax × shipping, with version history |
| 🔄 **Similar-Material Comparison** | AI-recommended alternatives ranked by similarity, unit price, lead time, and savings |
| 📦 **Supplier Orders** | Grouped by supplier; order status timeline (pending → confirmed → shipped → delivered → after-sales) |
| 👥 **Team Collaboration** | Project activity, todos, messages, and collaborators in one place |

### Quick Start

```bash
# Node.js ≥ 18.18 recommended
npm install
npm run dev          # http://localhost:3000, redirects to /dashboard

# Production build
npm run build && npm start
```

Best viewed at ≥ 1440 px browser width.

### Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) | File routing + RSC, ready for server APIs |
| Types | TypeScript 5 | All domain types in `lib/types.ts` |
| Styling | Tailwind CSS 3 | Brand colors & design tokens in `tailwind.config.ts` |
| Icons | lucide-react | Matches the minimal brand language |
| Mock data | Local TS modules (`lib/mock/*`) | Field names track real-API conventions |
| Visual assets | Procedural SVG + gradients | No external image hosts; runs fully offline |

### Directory Layout

```
app/
  (app)/
    dashboard/          # Dashboard
    projects/           # Project list
      [id]/
        upload/         # Plan upload + simulated AI recognition
        workspace/      # Material replacement workspace (core)
        quote/          # Smart quote
    materials/[id]      # Material library + detail
    quotes/             # All quotes
    compare/            # Similar-material comparison
    orders/             # Orders grouped by supplier
    favorites/ team/ settings/
components/
  layout/               # Sidebar / Header / Logo / Breadcrumbs
  ui/                   # Button / Card / Badge / Input …
lib/
  types.ts              # Domain entity types
  mock/                 # projects, materials, suppliers, quotes, comparisons, orders, social
```

### Pages

| Route | Page | Description |
| --- | --- | --- |
| `/dashboard` | Dashboard | KPIs, recent projects, todos, messages, activity, calendar |
| `/projects` | Project list | Status / stage / city filters · card view |
| `/projects/[id]` | Project detail | Metadata · scheme spaces · collaborators · activity |
| `/projects/[id]/upload` | Plan upload | 4-step stepper · drag-and-drop · AI status · jumps to workspace |
| `/projects/[id]/workspace` | Material workspace | SVG region picker · library · replace · A/B preview · price bar |
| `/projects/[id]/quote` | Smart quote | Region table · summary · version history · AI savings hint |
| `/materials` | Material library | Category + level + price filters · card grid · floating compare bar |
| `/materials/[id]` | Material detail | Gallery, specs, supplier card, case studies |
| `/compare` | Similar-material comparison | Current vs candidate · similarity · price / lead-time / savings |
| `/orders` | Orders | Supplier-grouped, status filter, detail panel, progress timeline |

### Production Roadmap

1. **AI recognition / material replacement** — SAM2 segmentation + Diffusion + ControlNet for texture transfer
2. **File upload** — replace dropzone with S3 / OSS pre-signed PUT
3. **Quote export** — `@react-pdf/renderer` for PDF; `exceljs` for .xlsx
4. **Supplier integration** — quote-request + order-create endpoints; ERP webhook for status updates
5. **Global search** — Meilisearch / Typesense + ⌘ K command palette
6. **Permissions** — route-level role gates
7. **i18n** — adopt `next-intl`, move strings to `messages/zh-CN.json`

### Known Limitations

- Visuals are procedurally generated — fine for flow demos
- Form interactions are mocked and not persisted; state resets on reload
- No unit / e2e tests yet

### License

For internal demo and design review only.
