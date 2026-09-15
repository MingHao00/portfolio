export type LocalizedString = {
  zh: string;
  en: string;
};

export type Project = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  tech: string[];
  link: string;
  image?: string;
};

export type EducationItem = {
  id: string;
  school: LocalizedString;
  program: LocalizedString;
  period: LocalizedString;
  highlight?: LocalizedString;
};

export type JourneyNode = {
  id: string;
  year: string;
  body: LocalizedString;
};

export type SkillTag = {
  id: string;
  label: string;
};

export type Contacts = {
  email: string;
  github: string;
  resumePath: string;
  linkedin?: string;
};
