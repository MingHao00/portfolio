/* ============================================================
   i18n — 中英双语切换
   优先级：URL ?lang= 参数 > localStorage > 默认中文
   ============================================================ */
(() => {
  'use strict';

  const MESSAGES = {
    zh: {
      'nav.pro': '职业',
      'nav.personal': '个人',
      'nav.contact': '联系我',
      'hero.eyebrow': '// 欢迎来到我的作品集',
      'hero.hello': '你好，我是',
      'hero.name': '黄俊皓',
      'hero.tagline': 'Vibe Coding 实践者 | AI 应用开发',
      'hero.resume': '查看简历',
      'edu.t1': '教育',
      'edu.t2': '经历',
      'edu1.degree': '本科 · 电子商务',
      'edu1.school': '暨南大学 — SSCI Q2 共同第一作者 · 2023年优秀防疫志愿者',
      'edu1.date': '2021.09 - 2025.06',
      'edu1.score': '毕业生优秀二等奖学金',
      'edu2.degree': '硕士 · MSc in Electronic Commerce and Internet Computing',
      'edu2.school': '香港大学 — 在读',
      'edu2.date': '2026.09 - 2027.11',
      'edu2.score': '在读',
      'projects.t1': '精选',
      'projects.t2': '项目',
      'p1.name': '个人作品集网站',
      'p1.desc': '使用 React + TypeScript + Tailwind CSS 构建的现代化作品集网站',
      'p1.link': '访问项目 →',
      'p2.name': 'N-BEATS 模型时序预测',
      'p2.desc': '先进时间序列分析技术，优化景区管理和规划、推动旅游业可持续发展',
      'p2.link': '查看论文 →',
      'p3.name': '主脑 AI 智能体',
      'p3.desc': '基于 Spring AI 的企业级智能体应用，集成 RAG 知识库与工具调用',
      'p3.link': '访问项目 →',
      'about.t1': '关于',
      'about.t2': '我',
      'bento.intro.label': '// 简介',
      'bento.intro.text': '你好，我是黄俊皓。Vibe Coding 实践者——用自然语言驱动 AI 构建产品，这个网站即成果之一。大学期间自学 Python（爬虫 / Pandas / 机器学习），并以共同第一作者身份发表 SSCI Q2 论文。我相信：AI 提供雏形，人负责完善。',
      'bento.quote.label': '// 信条',
      'bento.quote.text': '「人工智能的时代来了，个人的时代也来了。」',
      'bento.paper.label': '// 学术成果',
      'bento.paper.sub': '共同第一作者 · 2024.10',
      'bento.paper.line2': 'N-BEATS 时序预测 × 可持续旅游',
      'bento.stack.label': '// 技术栈',
      'bento.mail.label': '// 邮箱',
      'bento.mail.text': '对我的经历感兴趣？欢迎写信交流。',
      'bento.mail.btn': '复制邮箱地址',
      'journey.t1': '我的',
      'journey.t2': '旅途',
      'journey.intro': '从自学编程到 Vibe Coding——记录一路走来的几个关键节点。',
      'j1.text': '深入 AI 应用开发：学习 Spring AI、RAG 与 MCP，构建「主脑」智能体项目，持续探索 Agent 工程化。',
      'j2.text': '开启 Vibe Coding 之旅：用 Cursor 以自然语言驱动开发，从零构建这个作品集网站。',
      'j3.text': '自学 Python（爬虫 / Pandas / 机器学习），以共同第一作者身份发表 SSCI Q2 论文——N-BEATS 时序预测在可持续旅游中的研究。',
      'contact.eyebrow': '// 联系我',
      'contact.t1': '联系',
      'contact.t2': '我',
      'contact.desc': '无论是合作机会、技术交流，还是仅仅打个招呼——欢迎随时联系。',
      'contact.copy': '复制邮箱',
      'copied': '已复制 ✓',
      'footer': '© 2026 Junhao Huang · Built with Vibe Coding',
      'personal.eyebrow': '// Personal · 代码之外',
      'personal.h1a': '生活里的',
      'personal.h1b': '我',
      'personal.tagline': '工作之外，我如何度过时间，以及我要去往哪里。',
      'hobbies.t1': '兴趣',
      'hobbies.t2': '爱好',
      'hobby1.title': '阅读',
      'hobby1.desc': '小说是最近的主要消遣，也会读技术与设计类书籍——文字是成本最低的远行。',
      'hobby2.title': '音乐',
      'hobby2.desc': '弹吉他放松，歌单以 Lo-fi 和独立摇滚为主，写代码时的最佳背景音。',
      'hobby3.title': '运动',
      'hobby3.desc': '保持晨跑与健身的习惯，运动是让大脑保持清醒的另一种编译。',
      'hobby4.title': '动漫与游戏',
      'hobby4.desc': '在动画与游戏里收集故事与灵感，好的作品总能反哺创作。',
      'plans.t1': '未来',
      'plans.t2': '计划',
      'plan1': '完成港大硕士学业',
      'plan2': '深入 AI Agent 工程化',
      'plan3': '发表下一篇论文',
      'plan4': '来一次长途旅行',
      'plan5': '读完 12 本书',
      'plan6': '保持运动习惯',
    },
    en: {
      'nav.pro': 'Professional',
      'nav.personal': 'Personal',
      'nav.contact': 'Contact',
      'hero.eyebrow': '// Welcome to my portfolio',
      'hero.hello': "Hello, I'm",
      'hero.name': 'Junhao Huang',
      'hero.tagline': 'Vibe Coding Practitioner | AI Application Development',
      'hero.resume': 'View Résumé',
      'edu.t1': 'My',
      'edu.t2': 'Education',
      'edu1.degree': 'Bachelor · Electronic Commerce',
      'edu1.school': 'Jinan University — SSCI Q2 co-first author · 2023 Outstanding Pandemic-Response Volunteer',
      'edu1.date': 'Sep 2021 - Jun 2025',
      'edu1.score': 'Outstanding Graduate Scholarship (2nd Class)',
      'edu2.degree': 'MSc in Electronic Commerce and Internet Computing',
      'edu2.school': 'The University of Hong Kong — In progress',
      'edu2.date': 'Sep 2026 - Nov 2027',
      'edu2.score': 'In Progress',
      'projects.t1': 'Featured',
      'projects.t2': 'Projects',
      'p1.name': 'Personal Portfolio Website',
      'p1.desc': 'A modern portfolio built with React + TypeScript + Tailwind CSS',
      'p1.link': 'Visit →',
      'p2.name': 'N-BEATS Time-Series Forecasting',
      'p2.desc': 'Advanced time-series analysis for scenic-area management and sustainable tourism',
      'p2.link': 'Read Paper →',
      'p3.name': 'Mastermind AI Agent',
      'p3.desc': 'Enterprise-grade agent app built on Spring AI, with RAG knowledge base and tool calling',
      'p3.link': 'Visit →',
      'about.t1': 'About',
      'about.t2': 'Me',
      'bento.intro.label': '// Profile',
      'bento.intro.text': "Hi, I'm Junhao Huang — a Vibe Coding practitioner who builds products by describing intent to AI in natural language; this very site is one of the results. I taught myself Python (web scraping / Pandas / machine learning) in college and published an SSCI Q2 paper as co-first author. I believe AI shapes the clay; people finish the sculpture.",
      'bento.quote.label': '// Motto',
      'bento.quote.text': '"The age of AI has arrived — and so has the age of the individual."',
      'bento.paper.label': '// Publication',
      'bento.paper.sub': 'Co-first author · Oct 2024',
      'bento.paper.line2': 'N-BEATS forecasting × sustainable tourism',
      'bento.stack.label': '// Tech Stack',
      'bento.mail.label': '// Email',
      'bento.mail.text': 'Interested in my journey? Drop me a line.',
      'bento.mail.btn': 'Copy Email Address',
      'journey.t1': 'My',
      'journey.t2': 'Journey',
      'journey.intro': 'From self-taught programming to Vibe Coding — a few key milestones along the way.',
      'j1.text': "Diving deep into AI application development: learning Spring AI, RAG and MCP, building the 'Mastermind' agent project, and exploring agent engineering.",
      'j2.text': 'Began my Vibe Coding journey: driving development with natural language in Cursor and building this portfolio from scratch.',
      'j3.text': 'Taught myself Python (web scraping / Pandas / machine learning) and published an SSCI Q2 paper as co-first author — N-BEATS time-series forecasting for sustainable tourism.',
      'contact.eyebrow': '// Contact',
      'contact.t1': 'Get in',
      'contact.t2': 'Touch',
      'contact.desc': 'Collaboration, tech chat, or just saying hi — feel free to reach out.',
      'contact.copy': 'Copy Email',
      'copied': 'Copied ✓',
      'footer': '© 2026 Junhao Huang · Built with Vibe Coding',
      'personal.eyebrow': '// Personal · Beyond the code',
      'personal.h1a': 'My life',
      'personal.h1b': ' offline',
      'personal.tagline': 'How I spend my time outside of work — and where I am headed.',
      'hobbies.t1': 'My',
      'hobbies.t2': 'Hobbies',
      'hobby1.title': 'Reading',
      'hobby1.desc': 'Novels are my main pastime lately, alongside tech and design books — words are the cheapest way to travel.',
      'hobby2.title': 'Music',
      'hobby2.desc': 'Guitar for relaxation; my playlist is mostly lo-fi and indie rock — the perfect coding soundtrack.',
      'hobby3.title': 'Fitness',
      'hobby3.desc': 'Morning runs and gym sessions — exercise is another kind of compilation for the mind.',
      'hobby4.title': 'Anime & Games',
      'hobby4.desc': 'Collecting stories and inspiration from anime and games; great works always feed back into creation.',
      'plans.t1': 'Future',
      'plans.t2': 'Plans',
      'plan1': 'Complete my MSc at HKU',
      'plan2': 'Dive deeper into AI agent engineering',
      'plan3': 'Publish my next paper',
      'plan4': 'Take a long journey abroad',
      'plan5': 'Read 12 books',
      'plan6': 'Keep my fitness habit',
    },
  };

  const STORAGE_KEY = 'portfolio-lang';
  const SUPPORTED = ['zh', 'en'];

  function detectInitialLang() {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED.includes(urlLang)) return urlLang;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
    return 'zh';
  }

  let currentLang = detectInitialLang();

  function t(key) {
    return MESSAGES[currentLang][key] ?? key;
  }

  function apply() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('.lang-menu li').forEach((li) => {
      li.setAttribute('aria-selected', String(li.dataset.lang === currentLang));
    });
    const label = document.getElementById('langLabel');
    if (label) label.textContent = currentLang === 'zh' ? '中文' : 'English';
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
  }

  // 下拉菜单交互
  function initDropdown() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    if (!btn || !menu) return;

    const close = () => {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hidden ? open() : close();
    });

    menu.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => {
        setLanguage(li.dataset.lang);
        close();
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-switch')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  window.I18N = { t, apply, setLanguage, get lang() { return currentLang; } };

  document.addEventListener('DOMContentLoaded', () => {
    apply();
    initDropdown();
  });
})();
