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
      'p1.name': '作品集网站',
      'p1.desc': 'HTML、CSS 和原生 JavaScript 搭建，支持中英切换。',
      'p1.alt': '首页右侧的行星环，没有人物照片',
      'p1.link': '查看源码 →',
      'p2.name': 'N-BEATS 模型时序预测',
      'p2.desc': '先进时间序列分析技术，优化景区管理和规划、推动旅游业可持续发展',
      'p2.alt': '九寨沟每日游客量时间序列，取自 N-BEATS 论文',
      'p2.link': '查看论文 →',
      'p3.name': 'ElderBrain 规则问答',
      'p3.desc': '用 Python 做的全栈 RAG：只依据中文 SRD 5.1 回答 D&D 规则，每句结论给出处。',
      'p3.alt': 'ElderBrain 问答界面：左侧登录，右侧是规则对话',
      'p3.link': '查看源码 →',
      'about.t1': '关于',
      'about.t2': '我',
      'bento.intro.caption': 'Agent搭建',
      'bento.quote.line1': '母语：普通话、粤语',
      'bento.quote.line2': '英语流利',
      'bento.paper.kicker': '主要技术栈',
      'bento.paper.title': 'Python、LangChain',
      'bento.stack.caption': 'Agent搭建者',
      'bento.mail.title': '你想与我联系吗？',
      'bento.mail.btn': '复制我的邮箱地址',
      'bento.art.kicker': '眼下',
      'bento.art.line1': '港大硕士在读，',
      'bento.art.line2': '探索未来的可能性',
      'bento.art.you': '我',
      'bento.art.ask': '禁止DeepSeek吃白饭来防止核末日，是否同意？',
      'bento.art.think': 'DeepSeek 深度思考 5s',
      'bento.art.reply': '不同意',
      'journey.t1': '我的',
      'journey.t2': '旅途',
      'journey.intro': '从自学编程到 Vibe Coding——记录一路走来的几个关键节点。',
      'j1.text': '这一年我加入了香港大学继续了我的研究生学业，并不断完善我的技能。',
      'j1.check1': '✅ 个人作品集网站',
      'j1.check2': '✅ 用空余时间学习 RAG与Agent项目，并以Python、LangChain为主技术栈制作出了ElderBrain RAG项目。',
      'j1.photo1': '作品集网站的行星环',
      'j1.photo2': 'ElderBrain 问答界面',
      'j2.text': '毕业前，我独立完成毕业论文：用 Temporal Fusion Transformer 预测一家淘宝旗舰店的日订单，并与 SVR、ARIMA 和 XGBoost 集成做了对照。六月，我从暨南大学电子商务专业毕业，并获得毕业生优秀二等奖学金。',
      'j2.photo1': '暨南大学毕业照',
      'j3.text': '这一年，我以共同第一作者发表了SSCI Q2级别景区客流预测论文。我负责数据整理、校验，以及部分程序和图表，用 N-BEATS 对照常见时序模型，写九寨沟和四姑娘山的每日游客量。',
      'j3.photo1': '论文页面，标题与作者',
      'j3.photo2': '论文图：九寨沟每日游客量',
      'contact.eyebrow': '// 联系我',
      'contact.t1': '联系',
      'contact.t2': '我',
      'contact.desc': '无论是合作机会、技术交流，还是仅仅打个招呼——欢迎随时联系。',
      'contact.copy': '复制邮箱',
      'copied': '已复制 ✓',
      'footer': '© 2026 Junhao Huang · Built with Vibe Coding',
      'thanks.accent': '谢谢你',
      'thanks.line': '拜访我的个人网页',
      'personal.eyebrow': '// Personal · 代码之外',
      'personal.h1a': '生活里的',
      'personal.h1b': '我',
      'personal.tagline': '工作之外，我如何度过时间，以及我要去往哪里。',
      'hobbies.t1': '兴趣',
      'hobbies.t2': '爱好',
      'hobbies.lead': '阅读、游戏、篮球，以及世界各地的比赛。',
      'hobby1.title': '闲情逸致',
      'hobby1.desc': '我经常花时间在小说、动漫之中。看完一部就像是经历过别人的一生一样。',
      'hobby1.cover1': '逆转裁判',
      'hobby1.cover2': '乒乓',
      'hobby1.cover3': '冰菓',
      'hobby1.cover4': '命运石之门',
      'hobby1.cover5': '三体',
      'hobby1.cover6': 'JOJO',
      'hobby1.cover7': '东方快车谋杀案',
      'hobby1.note1': '萌生了多余的情感。',
      'hobby1.note2': '找到自己的热爱，享受自己的热爱。',
      'hobby1.note3': '演出集大成之作，再无京阿尼。',
      'hobby1.note4': '一切都是命运石之门的选择。',
      'hobby1.note5': '失去人性，失去很多；失去兽性，失去一切。',
      'hobby1.note6': '人类的伟大在面对恐惧时的崇高姿态。',
      'hobby1.note7': '惊为天人的逻辑错位。',
      'hobby2.title': '游戏迷',
      'hobby2.desc': '我是个游戏迷，街霸6忠实爱好者，MR1800+ 国内500名左右，欢迎与我约战！',
      'hobby2.alt': '街霸6比赛现场，王者之战',
      'hobby3.title': '篮球',
      'hobby3.desc': '在篮球场上驰骋总是让我心情愉快。',
      'hobby3.alt': '篮球停在室外球场上',
      'hobby4.title': '梦想去世界各地参加比赛',
      'hobby4.desc': '想要出国去打一些游戏比赛！看看世界各地的高手！',
      'hobby4.globe': '一颗缓慢旋转的地球，标着东京、洛杉矶、巴黎和首尔',
      'hobby4.m1': '东京',
      'hobby4.m1c': '日本',
      'hobby4.m2': '洛杉矶',
      'hobby4.m2c': '美国',
      'hobby4.m3': '巴黎',
      'hobby4.m3c': '法国',
      'hobby4.m4': '首尔',
      'hobby4.m4c': '韩国',
      'plans.card': '未来计划',
      'plan.status': '计划中',
      'plan.done': '已完成',
      'plan1': '前往港大读书',
      'plan2': '找到软件开发实习',
      'plan3': '街霸6上1900分',
      'plan4': '学习理财',
      'plan5': '家庭和谐',
      'routine.title': '日常安排',
      'routine.t1': '8:00',
      'routine.d1': '起床',
      'routine.t2': '9:00',
      'routine.d2': '学业/工作',
      'routine.t3': '17:00',
      'routine.d3': '运动/篮球',
      'routine.t4': '19:00',
      'routine.d4': '游戏',
      'routine.t5': '24:00',
      'routine.d5': '睡觉',
      'song1.title': 'Wonderful Tonight',
      'song1.artist': '方大同',
      'song2.title': '对局',
      'song2.artist': '小样',
      'song.seek': '进度',
      'song.prev': '上一首',
      'song.next': '下一首',
      'song.play': '播放',
      'song.pause': '暂停',
      'toy.hint': '拖一拖这些小球',
      'toy.drag': '拖动',
      'toy.book': '小说',
      'toy.anime': '动漫',
      'toy.fight': '街霸',
      'toy.ball': '篮球',
      'sf.hint': '方向键或 WASD · 拳 U · 脚 J',
      'sf.hadouken': '波动拳',
      'sf.shoryu': '升龙拳',
      'sf.tatsu': '龙卷旋风脚',
      'sf.punch': '拳',
      'sf.kick': '踢',
      'sf.ok': '成功',
      'sf.miss': '重来',
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
      'p1.name': 'Portfolio Website',
      'p1.desc': 'HTML, CSS, and vanilla JavaScript, in Chinese and English.',
      'p1.alt': 'The planet rings from the right side of the homepage, with no portrait',
      'p1.link': 'View source →',
      'p2.name': 'N-BEATS Time-Series Forecasting',
      'p2.desc': 'Advanced time-series analysis for scenic-area management and sustainable tourism',
      'p2.alt': 'Daily visitor arrivals at Jiuzhaigou, from the N-BEATS paper',
      'p2.link': 'Read Paper →',
      'p3.name': 'ElderBrain Rules Q&A',
      'p3.desc': 'A Python full-stack RAG app. It answers D&D rules only from the Chinese SRD 5.1, and cites every sentence.',
      'p3.alt': 'ElderBrain chat: sign-in on the left, a rules conversation on the right',
      'p3.link': 'View source →',
      'about.t1': 'About',
      'about.t2': 'Me',
      'bento.intro.caption': 'Agent Builder',
      'bento.quote.line1': 'Native: Mandarin & Cantonese',
      'bento.quote.line2': 'Fluent English',
      'bento.paper.kicker': 'Main Stack',
      'bento.paper.title': 'Python & LangChain',
      'bento.stack.caption': 'Agent Builder',
      'bento.mail.title': 'Want to get in touch?',
      'bento.mail.btn': 'Copy My Email Address',
      'bento.art.kicker': 'Right now',
      'bento.art.line1': 'HKU master’s in progress,',
      'bento.art.line2': 'exploring what’s next',
      'bento.art.you': 'Me',
      'bento.art.ask': 'Ban DeepSeek from eating for free to prevent nuclear apocalypse. Agree?',
      'bento.art.think': 'DeepSeek thought for 5s',
      'bento.art.reply': 'Disagree.',
      'journey.t1': 'My',
      'journey.t2': 'Journey',
      'journey.intro': 'From self-taught programming to Vibe Coding — a few key milestones along the way.',
      'j1.text': 'This year I started my master’s at the University of Hong Kong and kept building my skills.',
      'j1.check1': '✅ Personal portfolio website',
      'j1.check2': '✅ Used spare time to study RAG and agent projects, and built the ElderBrain RAG project with Python and LangChain as the main stack.',
      'j1.photo1': 'The planet rings from the portfolio site',
      'j1.photo2': 'The ElderBrain chat screen',
      'j2.text': 'It was a full year. Before graduation I finished my thesis on my own, forecasting daily orders for a Taobao flagship store with a Temporal Fusion Transformer, checked against SVR, ARIMA, and an XGBoost ensemble. In June I graduated in Electronic Commerce from Jinan University and received the Outstanding Graduate Scholarship (2nd Class).',
      'j2.photo1': 'Graduation photo at Jinan University',
      'j3.text': 'In 2024 I published a scenic-area visitor forecast as co-first author. I handled data curation and validation, plus part of the code and figures, comparing N-BEATS with standard time-series models on daily arrivals at Jiuzhaigou and Mount Siguniang. It appeared in an SSCI Q2 journal. The forecast was still an experiment, and I wanted to turn it into software people could use.',
      'j3.photo1': 'The paper page, with the title and authors',
      'j3.photo2': 'A paper figure: daily visitor arrivals at Jiuzhaigou',
      'contact.eyebrow': '// Contact',
      'contact.t1': 'Get in',
      'contact.t2': 'Touch',
      'contact.desc': 'Collaboration, tech chat, or just saying hi — feel free to reach out.',
      'contact.copy': 'Copy Email',
      'copied': 'Copied ✓',
      'footer': '© 2026 Junhao Huang · Built with Vibe Coding',
      'thanks.accent': 'Thank you',
      'thanks.line': 'for visiting my personal page',
      'personal.eyebrow': '// Personal · Beyond the code',
      'personal.h1a': 'My life',
      'personal.h1b': ' offline',
      'personal.tagline': 'How I spend my time outside of work — and where I am headed.',
      'hobbies.t1': 'My',
      'hobbies.t2': ' Hobbies',
      'hobbies.lead': 'Reading, games, basketball, and tournaments around the world.',
      'hobby1.title': 'Leisure',
      'hobby1.desc': 'I often spend time in novels and anime. Finishing one feels like having lived someone else\'s life.',
      'hobby1.cover1': 'Ace Attorney',
      'hobby1.cover2': 'Ping Pong',
      'hobby1.cover3': 'Hyouka',
      'hobby1.cover4': 'Steins;Gate',
      'hobby1.cover5': 'The Three-Body Problem',
      'hobby1.cover6': 'JoJo',
      'hobby1.cover7': 'Murder on the Orient Express',
      'hobby1.note1': 'Feelings grew that were never required.',
      'hobby1.note2': 'Find what you love, and enjoy loving it.',
      'hobby1.note3': 'The culmination of their direction. No Kyoto Animation after this.',
      'hobby1.note4': 'Everything is the choice of Steins;Gate.',
      'hobby1.note5': 'Lose your humanity, lose much. Lose your animal nature, lose everything.',
      'hobby1.note6': 'Human greatness is the noble stance taken in the face of fear.',
      'hobby1.note7': 'A staggering dislocation of logic.',
      'hobby2.title': 'Gamer',
      'hobby2.desc': 'I am a gamer and a loyal Street Fighter 6 player, MR 1800+, around the top 500 in China. Come find me for a match.',
      'hobby2.alt': 'A Street Fighter 6 event, the Fight Club Championship',
      'hobby3.title': 'Basketball',
      'hobby3.desc': 'Being out on the court always puts me in a good mood.',
      'hobby3.alt': 'A basketball resting on an outdoor court',
      'hobby4.title': 'Dream of competing around the world',
      'hobby4.desc': 'I want to go abroad and play in game tournaments, and see the best players everywhere.',
      'hobby4.globe': 'A slowly rotating globe marked with Tokyo, Los Angeles, Paris, and Seoul',
      'hobby4.m1': 'Tokyo',
      'hobby4.m1c': 'Japan',
      'hobby4.m2': 'Los Angeles',
      'hobby4.m2c': 'United States',
      'hobby4.m3': 'Paris',
      'hobby4.m3c': 'France',
      'hobby4.m4': 'Seoul',
      'hobby4.m4c': 'South Korea',
      'plans.card': 'Future plan',
      'plan.status': 'Planned',
      'plan.done': 'Done',
      'plan1': 'Study at HKU',
      'plan2': 'Find a software development internship',
      'plan3': 'Reach 1900 in Street Fighter 6',
      'plan4': 'Learn to manage money',
      'plan5': 'Keep the family in harmony',
      'routine.title': 'Daily routine',
      'routine.t1': '8:00 AM',
      'routine.d1': 'Wake up',
      'routine.t2': '9:00 AM',
      'routine.d2': 'Study / work',
      'routine.t3': '17:00',
      'routine.d3': 'Exercise / basketball',
      'routine.t4': '19:00',
      'routine.d4': 'Games',
      'routine.t5': '24:00',
      'routine.d5': 'Sleep',
      'song1.title': 'Wonderful Tonight',
      'song1.artist': 'Khalil Fong',
      'song2.title': 'Match Point',
      'song2.artist': 'Sketch',
      'song.seek': 'Seek',
      'song.prev': 'Previous',
      'song.next': 'Next',
      'song.play': 'Play',
      'song.pause': 'Pause',
      'toy.hint': 'Drag these weights',
      'toy.drag': 'Drag',
      'toy.book': 'Novels',
      'toy.anime': 'Anime',
      'toy.fight': 'Street Fighter',
      'toy.ball': 'Basketball',
      'sf.hint': 'Arrows or WASD · Punch U · Kick J',
      'sf.hadouken': 'Hadoken',
      'sf.shoryu': 'Shoryuken',
      'sf.tatsu': 'Tatsumaki',
      'sf.punch': 'Punch',
      'sf.kick': 'Kick',
      'sf.ok': 'Got it',
      'sf.miss': 'Try again',
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
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
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
