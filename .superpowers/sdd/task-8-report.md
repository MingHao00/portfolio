# Task 8 Report: 验证与交付说明

## Status
DONE

## Verification
- `npm run lint` — exit 0；仅 `HeroSection` `@next/next/no-img-element` 警告（可接受，静态像素资源）
- `npm run build` — success；`out/index.html` 存在

## Manual checklist
| 项 | 结果 |
|----|------|
| 默认中文 | ✅ `DEFAULT_LOCALE='zh'`，`html lang=zh-CN` |
| 语言下拉切英文 | ✅ `LanguageSwitcher` listbox zh↔en |
| 三项目外链 | ✅ portfolio / DOI / GitHub 均为 `https://` |
| Education/Journey 占位 | ✅ 文案含「待补充/占位」 |
| 移动导航 | ✅ `SiteHeader` hamburger + `#site-mobile-nav` |
| 无详情路由 | ✅ 仅 `/`（及 `/_not-found`） |

## Delivery
- README 已补：本地命令、`src/content` 编辑入口、`public/resume.pdf`、部署 `out/` 至港区静态托管
