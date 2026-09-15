# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `D:\Portfolio` 新建可静态导出的 Next.js 个人档案站：中英双语、16-bit RPG 菜单视觉、项目外链、香港托管友好。

**Architecture:** App Router + 客户端 Locale Context（避免 i18n 与 `output: 'export'` 冲突）+ `src/content` 数据驱动板块 + 可复用像素 UI 组件（双线框、按钮、顶栏）。首发纯 CSS 天空草地背景，角色与简历为占位路径。

**Tech Stack:** Next.js 15 App Router、React 19、TypeScript、Tailwind CSS 4、npm。动效优先 CSS；需要时再加 `framer-motion`。

## Global Constraints

- 工作区：`D:\Portfolio`；旧站只读参考，不改造
- 静态导出：`output: 'export'`；无 SSR 专属 API
- 默认语言：`zh`；另支持 `en`
- 不做项目详情页；项目只外链
- 无 CRT/扫描线、无自定义光标、首发无声音
- 约定式提交信息若用户要求 commit 再用；**默认不自动 commit**（用户规则优先）
- 敏感信息：不硬编码密钥；公开邮箱/GitHub 可写在 content 数据中
- 单文件尽量 < 300 行；组件职责单一

## File Map

```
D:\Portfolio\
├── package.json
├── next.config.ts          # output: 'export'
├── postcss.config.mjs
├── tsconfig.json
├── README.md
├── public/
│   ├── resume.pdf          # 用户后补（可不存在）
│   └── characters/
│       └── hero-placeholder.svg
├── docs/superpowers/...    # 已有规格与本计划
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── ui/
    │   │   ├── PixelPanel.tsx
    │   │   ├── PixelButton.tsx
    │   │   └── SectionTitle.tsx
    │   ├── layout/
    │   │   ├── SiteHeader.tsx
    │   │   ├── LanguageSwitcher.tsx
    │   │   └── SkyGrassBackground.tsx
    │   └── sections/
    │       ├── HeroSection.tsx
    │       ├── EducationSection.tsx
    │       ├── ProfileSection.tsx
    │       ├── ProjectsSection.tsx
    │       ├── JourneySection.tsx
    │       └── ContactSection.tsx
    ├── content/
    │   ├── types.ts
    │   ├── profile.ts
    │   ├── education.ts
    │   ├── projects.ts
    │   ├── journey.ts
    │   ├── skills.ts
    │   └── contacts.ts
    ├── i18n/
    │   ├── dictionaries.ts
    │   ├── LocaleProvider.tsx
    │   └── useLocale.ts
    └── lib/
        └── cn.ts
```

---

### Task 1: 脚手架与静态导出

**Files:**
- Create: `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`, `README.md`

**Interfaces:**
- Produces: 可运行的 Next 应用；`next build` 产出 `out/`

- [ ] **Step 1: 用 create-next-app 初始化（在 D:\Portfolio）**

若目录非空（已有 docs），在当前目录初始化并保留 docs：

```bash
cd D:\Portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack
```

若因非空目录失败：手动创建上述配置文件，依赖对齐 Next 15 + React 19 + Tailwind 4。

- [ ] **Step 2: 配置静态导出**

`next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 3: 验证 dev 与 build**

```bash
npm run dev
npm run build
```

Expected: dev 可打开；build 生成 `out/` 且无错误。

- [ ] **Step 4: README 写明简历放置与香港静态托管**

说明：将 PDF 放到 `public/resume.pdf`；`out/` 上传香港静态托管。

---

### Task 2: 设计 token 与基础 UI

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/cn.ts`, `src/components/ui/PixelPanel.tsx`, `src/components/ui/PixelButton.tsx`, `src/components/ui/SectionTitle.tsx`

**Interfaces:**
- Produces:
  - `cn(...inputs: Array<string | false | undefined>): string`
  - `PixelPanel({ children, className?, thick?: boolean })`
  - `PixelButton({ children, href?, onClick?, className?, variant?: 'primary' | 'secondary' })`
  - `SectionTitle({ children })`
- CSS variables:
  - `--color-sky`, `--color-sky-light`, `--color-grass`, `--color-grass-dark`, `--color-accent`, `--color-panel`, `--color-ink`, `--color-border-light`, `--color-border-dark`

- [ ] **Step 1: 在 globals.css 定义色板与像素字体**

```css
:root {
  --color-sky: #5ec8f0;
  --color-sky-light: #9fdcf7;
  --color-grass: #3cb043;
  --color-grass-dark: #2a7a32;
  --color-accent: #f0c040;
  --color-panel: #f5e6c8;
  --color-ink: #1a1a1a;
  --color-border-light: #fff6d8;
  --color-border-dark: #5a3e1b;
}

body {
  color: var(--color-ink);
  background: var(--color-sky);
}

.font-pixel {
  font-family: "Press Start 2P", "Zpix", monospace;
  image-rendering: pixelated;
}
```

在 `layout.tsx` 用 `next/font` 或 link 引入可读正文（如 `Noto Sans SC` + `Geist`/`Source Sans`）与像素标题字体（Press Start 2P；中文短标题可用「得意黑」或系统回退，短标签优先英文像素字）。

- [ ] **Step 2: 实现 PixelPanel（双线浮雕框）**

外框深色、内缘浅色、填充 `--color-panel`；`thick` 时边框加宽用于 Hero 标题窗。

- [ ] **Step 3: 实现 PixelButton**

主按钮暖黄底；次按钮面板色；支持 `href`（外链 `target="_blank" rel="noopener noreferrer"`）。

- [ ] **Step 4: 浏览器目视** — 临时在 `page.tsx` 渲染 Panel/Button，确认对比度可读。

---

### Task 3: i18n（Locale Context）

**Files:**
- Create: `src/i18n/dictionaries.ts`, `src/i18n/LocaleProvider.tsx`, `src/i18n/useLocale.ts`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Produces:
  - `type Locale = 'zh' | 'en'`
  - `dictionaries: Record<Locale, Dict>`（含 nav、hero、sections 标题、通用文案）
  - `LocaleProvider({ children, defaultLocale?: Locale })`
  - `useLocale(): { locale, setLocale, t: Dict }`
- 持久化：`localStorage` key `portfolio-locale`；首访默认 `zh`

- [ ] **Step 1: 写 dictionaries（中英键完整对齐）**

至少包含：`nav.home|education|profile|projects|journey|contact`，`hero.greeting`，`sections.*`，`language.label`，`contact.resumeMissing`（可选）。

- [ ] **Step 2: LocaleProvider + useLocale**

`'use client'`；`setLocale` 更新 state 并写入 localStorage。

- [ ] **Step 3: layout 包裹 Provider；page 用 `t` 显示一段标题验证切换。**

---

### Task 4: 布局壳 — 背景、顶栏、语言下拉

**Files:**
- Create: `src/components/layout/SkyGrassBackground.tsx`, `src/components/layout/LanguageSwitcher.tsx`, `src/components/layout/SiteHeader.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- `LanguageSwitcher`: 按钮显示当前语种文案（`中文` / `English`），点击展开下拉选另一语言；点击外侧关闭
- `SiteHeader`: 锚点链接 `#hero` `#education` `#profile` `#projects` `#journey` `#contact`；移动端汉堡 + 抽屉/下拉
- `SkyGrassBackground`: fixed/absolute 全视口，上天空下草地，`pointer-events-none`；注释 `/* swap to tile/art later */`

- [ ] **Step 1: SkyGrassBackground CSS 分层**

上 62% 天空渐变；下 38% 草绿；草顶用 repeating-linear-gradient 做锯齿草线。

- [ ] **Step 2: LanguageSwitcher 下拉**

无障碍：`aria-expanded`、`aria-haspopup="listbox"`。

- [ ] **Step 3: SiteHeader 像素顶栏 + 移动端菜单**

- [ ] **Step 4: 验证锚点滚动与语言切换**

---

### Task 5: Content 数据层

**Files:**
- Create: `src/content/types.ts`, `profile.ts`, `education.ts`, `projects.ts`, `journey.ts`, `skills.ts`, `contacts.ts`
- Create: `public/characters/hero-placeholder.svg`

**Interfaces:**
- `LocalizedString = { zh: string; en: string }`
- `Project = { id: string; name: LocalizedString; description: LocalizedString; tech: string[]; link: string; image?: string }`
- `EducationItem = { id: string; school: LocalizedString; program: LocalizedString; period: LocalizedString; highlight?: LocalizedString }`
- `JourneyNode = { id: string; year: string; body: LocalizedString }`
- `SkillTag = { id: string; label: string }`
- `Contacts = { email: string; github: string; resumePath: string; linkedin?: string }`

- [ ] **Step 1: 写入 projects（旧站三项 + 真实链接）**

```ts
// 个人作品集 → https://github.com/MingHao00/personal-portfolio
// N-BEATS → https://doi.org/10.3390/su16188227
// 主脑 AI → 使用旧站链接；若仍指向 portfolio 仓库，description 标明待更新，link 暂用 GitHub 主页或原值并在 README 提示用户改正
```

- [ ] **Step 2: education / journey 占位中英**

大学、研究生两块；Journey 2–3 年节点，文案含「占位，待补充」。

- [ ] **Step 3: profile 短简介起草 + skills 扁平标签**

- [ ] **Step 4: contacts 使用旧站邮箱与 GitHub；`resumePath: '/resume.pdf'`**

- [ ] **Step 5: 简单 SVG 角色占位（可后换）**

---

### Task 6: 各内容板块

**Files:**
- Create: 全部 `src/components/sections/*.tsx`
- Modify: `src/app/page.tsx` 按 IA 组装

**Interfaces:**
- 各 Section 接收 `locale` 或内部 `useLocale()`，从 content 取 `LocalizedString[locale]`
- Hero：角色图 + PixelPanel 对话框（`t.hero.greeting`）+ 略厚标题窗（姓名）
- Education：两块 PixelPanel
- Profile：普通 PixelPanel 简介 + 技术标签 chip
- Projects：`grid` 2 列 md:3 列像素卡；整卡 `<a href={link}>`
- Journey：年份 + 正文占位
- Contact：mailto、GitHub、简历按钮；若预留 LinkedIn 字段存在则渲染，否则不渲染空链

- [ ] **Step 1: HeroSection**
- [ ] **Step 2: EducationSection**
- [ ] **Step 3: ProfileSection**
- [ ] **Step 4: ProjectsSection**
- [ ] **Step 5: JourneySection**
- [ ] **Step 6: ContactSection**
- [ ] **Step 7: page.tsx 组装顺序固定为 Hero → Education → Profile → Projects → Journey → Contact**

---

### Task 7: 动效与打磨

**Files:**
- Modify: `globals.css`, section/header 组件

- [ ] **Step 1: 角色待机** — CSS `@keyframes` 轻微上下浮动
- [ ] **Step 2: 区块切入** — `animation` + `prefers-reduced-motion: reduce` 时禁用
- [ ] **Step 3: 语言切换** — 主内容区短 fade（150–250ms）
- [ ] **Step 4: hover** — 卡片/按钮边框高亮暖黄，触摸设备不依赖 hover

---

### Task 8: 验证与交付说明

- [ ] **Step 1: `npm run lint` 无错**
- [ ] **Step 2: `npm run build` 成功且存在 `out/index.html`**
- [ ] **Step 3: 手动检查清单**
  - 默认中文
  - 语言按钮下拉可切英文
  - 三项目外链可开
  - Education/Journey 占位可见
  - 移动端导航可用
  - 无详情路由
- [ ] **Step 4: README 补充本地命令、内容修改入口（`src/content`）、简历路径、部署 `out/` 到香港静态托管**

---

## Spec Coverage Self-Review

| Spec 项 | Task |
|---------|------|
| 双语默认中文 | Task 3–4 |
| IA 各板块 | Task 6 |
| 无详情页、项目外链 | Task 5–6 |
| 16-bit RPG、色板、双线框、米黄窗 | Task 2, 4, 6 |
| CSS 天空草地可替换 | Task 4 |
| 顶栏导航、语言下拉按钮 | Task 4 |
| 像素标题+可读正文 | Task 2 |
| 对话框招呼 + Profile 普通窗 | Task 6 |
| 项目栅格 | Task 6 |
| 中等动效 | Task 7 |
| 无扫描线/自定义光标/声音 | 全局不实现 |
| 静态导出、香港托管说明 | Task 1, 8 |
| 简历路径预留、LinkedIn 插槽 | Task 5–6 |
| 角色占位 | Task 5–6 |

## Placeholder Scan

无 TBD 步骤；主脑项目链接若仍错误，在 Task 5 用 README 提示用户更新，不静默伪造。

---

**Plan complete and saved to `docs/superpowers/plans/2026-09-15-personal-portfolio.md`.**

**两种执行方式：**

1. **Subagent-Driven（推荐）** — 每任务派生子代理，任务间回顾  
2. **Inline Execution** — 本会话按计划连续执行，关键节点停顿确认  

你选哪一种？
