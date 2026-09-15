# Portfolio

个人作品集站点（Next.js 静态导出，像素风格单页）。

## 本地命令

```bash
npm install          # 安装依赖
npm run dev          # 本地开发（Turbopack）
npm run lint         # ESLint
npm run build        # 静态导出到 out/
```

开发服务器默认：http://localhost:3000

## 内容修改入口

文案与结构化内容在 `src/content/`，按文件改即可，无需改页面布局：

| 文件 | 内容 |
|------|------|
| `projects.ts` | 项目列表（名称、描述、技术栈、外链） |
| `education.ts` | 教育经历 |
| `journey.ts` | 成长旅程节点 |
| `profile.ts` | 个人简介 |
| `skills.ts` | 技能标签 |
| `contacts.ts` | 邮箱、GitHub、LinkedIn、简历路径 |

中英文文案并存于各条目的 `zh` / `en` 字段。导航与区块标题词典在 `src/i18n/dictionaries.ts`。

## 简历

将 PDF 放到 `public/resume.pdf`。站点联系区通过该路径提供下载（见 `src/content/contacts.ts` 中的 `resumePath`）。

## 部署

```bash
npm run build
```

产物在 `out/`。将 **整个 `out/` 目录** 上传至香港静态托管（任意静态文件托管即可）完成部署。站点为纯静态导出，无需 Node 运行时。

## 项目链接说明

「主脑 AI 智能体」（`brain-agent`）在内容数据中暂链到 GitHub 主页
`https://github.com/MingHao00`。若已有独立仓库，请更新
`src/content/projects.ts` 中对应 `link`。
