# Task 6 Report: 各内容板块

## Status
DONE

## Summary
- 新建 `src/components/sections/`：Hero / Education / Profile / Projects / Journey / Contact
- Hero：角色图 + thick 姓名窗（黄俊皓 / Junhao Huang）+ 对话框 `t.hero.greeting`
- Projects：`grid-cols-1 md:2 lg:3`，整卡外链 `<a>`；无详情路由
- Contact：mailto / GitHub / `/resume.pdf`；`linkedin` 未设则不渲染
- `page.tsx` 顺序：Hero → Education → Profile → Projects → Journey → Contact
- 词典扩展：`hero.name|role`、`contact.email|github|resume|linkedin`

## Build
- `npm run build` — success

## Concerns
- Hero 使用 `<img>` 有 next/no-img-element 警告（SVG 占位可接受）
- 简历 PDF 文件仍待用户放入 `public/resume.pdf`
