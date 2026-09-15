# Task 7 Report: 动效与打磨

## Status
DONE

## Summary
- Hero 角色：`hero-idle-float` 轻上下浮动；`prefers-reduced-motion: reduce` 禁用
- 各 section：`section-enter` 切入（错峰 delay）；reduced-motion 时禁用
- 语言切换：主内容区 `locale-fade` 200ms，不 remount（避免重复切入）
- 卡片/按钮：暖黄边框高亮；`hover` 限 `@media (hover:hover)`，触摸用 `:active` / `:focus-visible`
- 无 CRT、无自定义光标、无声音

## Build
- `npm run build` — success

## Concerns
- Hero `<img>` 仍有 next/no-img-element 警告（既有）

## Post-review fix
- **Important:** `PixelButton` hover 边框与项目卡对齐——移除未 gated 的 Tailwind `hover:border-…`；新增 `.pixel-btn`，在 `globals.css` 的 `@media (hover: hover)` 内设 `:hover` 暖黄边框；`:focus-visible` / `:active` 仍在媒体查询外（触控可用）。
- **Build (re-run):** `npm run build` — success（仅既有 Hero `no-img-element` 警告）
