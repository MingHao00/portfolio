import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "portfolio",
    name: {
      zh: "个人作品集网站",
      en: "Personal Portfolio",
    },
    description: {
      zh: "像素风个人作品集，展示项目、教育与联系方式。",
      en: "A pixel-styled personal portfolio for projects, education, and contact.",
    },
    tech: ["React", "TypeScript", "Tailwind"],
    link: "https://github.com/MingHao00/personal-portfolio",
  },
  {
    id: "nbeats",
    name: {
      zh: "N-BEATS时序预测",
      en: "N-BEATS time series",
    },
    description: {
      zh: "基于 N-BEATS 的时序预测研究与实践。",
      en: "Time-series forecasting research and practice with N-BEATS.",
    },
    tech: ["Python", "N-BEATS", "Time Series"],
    link: "https://doi.org/10.3390/su16188227",
  },
  {
    id: "brain-agent",
    name: {
      zh: "主脑AI智能体",
      en: "Brain AI Agent",
    },
    // Repo URL may need update; temporary link points to GitHub profile.
    description: {
      zh: "基于 Spring AI 与 RAG 的主脑智能体（项目仓库链接待更新）。",
      en: "Brain AI agent with Spring AI and RAG (project repo URL pending update).",
    },
    tech: ["Java", "SpringAI", "AIAgent", "RAG"],
    link: "https://github.com/MingHao00",
  },
];
