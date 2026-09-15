export type Locale = 'zh' | 'en'

export type Dict = {
  nav: {
    home: string
    education: string
    profile: string
    projects: string
    journey: string
    contact: string
  }
  hero: {
    greeting: string
  }
  sections: {
    education: string
    profile: string
    projects: string
    journey: string
    contact: string
  }
  language: {
    label: string
  }
  contact: {
    resumeMissing: string
  }
}

export const dictionaries: Record<Locale, Dict> = {
  zh: {
    nav: {
      home: '首页',
      education: '教育',
      profile: '简介',
      projects: '项目',
      journey: '旅程',
      contact: '联系',
    },
    hero: {
      greeting: '你好，欢迎来到我的档案站。',
    },
    sections: {
      education: '教育经历',
      profile: '个人简介',
      projects: '项目作品',
      journey: '成长旅程',
      contact: '联系方式',
    },
    language: {
      label: '语言',
    },
    contact: {
      resumeMissing: '简历暂未上传',
    },
  },
  en: {
    nav: {
      home: 'Home',
      education: 'Education',
      profile: 'Profile',
      projects: 'Projects',
      journey: 'Journey',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hi, welcome to my portfolio.',
    },
    sections: {
      education: 'Education',
      profile: 'Profile',
      projects: 'Projects',
      journey: 'Journey',
      contact: 'Contact',
    },
    language: {
      label: 'Language',
    },
    contact: {
      resumeMissing: 'Resume not available yet',
    },
  },
}

export const DEFAULT_LOCALE: Locale = 'zh'
export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'zh' || value === 'en'
}
