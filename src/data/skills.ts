import type { Locale } from "../i18n/translations";

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface CompetencyMatrix {
  id: string;
  index: string;
  title: string;
  tag: string;
  summary: string;
  primarySkills: string[];
  secondarySkills: string[];
  frameworks: string[];
}

export interface CertificationItem {
  provider: string;
  title: string;
  date: string;
  detail: string;
}

export const competencyMatrices: CompetencyMatrix[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    tag: "Web · client",
    summary:
      "Web interfaces, layouts, and browser tooling maintained in production.",
    primarySkills: [
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "React (foundational)",
    ],
    secondarySkills: ["Chrome Extensions", "Responsive Layouts", "Bug Fixing"],
    frameworks: ["React", "Chrome Extension MV3", "REST-backed UIs"],
  },
  {
    id: "backend",
    index: "02",
    title: "Scripting & Backend",
    tag: "APIs & integrations",
    summary: "Scripting, REST integrations, and data-backed tooling views.",
    primarySkills: ["Python", "Flask", "REST APIs", "pytest"],
    secondarySkills: [
      "Node.js (foundational)",
      "Third-party Integrations",
      "Auth & Error Handling",
    ],
    frameworks: ["Flask", "Node.js", "OpenRouter", "Stripe", "Resend"],
  },
  {
    id: "ai-workflow",
    index: "03",
    title: "AI-Assisted Development & Hosting",
    tag: "Workflow & delivery",
    summary:
      "Daily agentic AI workflows plus version control and deployment basics.",
    primarySkills: [
      "Claude Code (daily)",
      "Agentic Workflows",
      "MCP",
      "Prompt Engineering",
    ],
    secondarySkills: ["LLM Integration", "RAG", "Cursor (familiar)", "pandas"],
    frameworks: [
      "Git & GitHub (branches, PRs)",
      "CI/CD",
      "Linux/VPS",
      "Supabase",
      "PostgreSQL",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "React (foundational)",
      "Chrome Extensions",
    ],
  },
  {
    title: "Scripting & Backend",
    skills: [
      "Python",
      "Flask",
      "Node.js (foundational)",
      "REST APIs",
      "Third-party integrations",
      "pytest",
    ],
  },
  {
    title: "Data & Tooling",
    skills: [
      "PostgreSQL",
      "Supabase",
      "dashboards",
      "pandas",
      "Jupyter Notebook",
    ],
  },
  {
    title: "AI-Assisted Development (daily)",
    skills: [
      "Claude Code",
      "Cursor (familiar)",
      "Agentic workflows",
      "MCP",
      "LLM Integration",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    title: "Workflow & Hosting",
    skills: [
      "Git",
      "GitHub (branches, commits, pull requests)",
      "CI/CD",
      "Linux/VPS",
      "deployment & hosting basics",
    ],
  },
  {
    title: "Spoken Languages",
    skills: ["Ukrainian — Native", "English — B2 (C1 Reading)"],
  },
];

export const certifications: CertificationItem[] = [
  {
    provider: "Vanderbilt University",
    title: "AI Agents with Model Context Protocol Specialization",
    date: "Sep 2026",
    detail:
      "Credential ID: 7GNJTGZNZJJU • Model Context Protocol (MCP), Agentic AI architectures, tool orchestration, and GenAI workflows",
  },
  {
    provider: "Vanderbilt University",
    title: "Generative AI Software Engineering Specialization",
    date: "Sep 2026",
    detail:
      "Credential ID: 8XRRZ8TGWFKL • Software engineering with LLMs, prompt patterns, software architecture & design",
  },
  {
    provider: "Sooezy Academy",
    title: "Agentic AI Sooezy - Season 1",
    date: "Aug 2026",
    detail:
      "Credential ID: SOOEZY-1E4FAF • Agentic AI development, autonomous coding workflows, Claude Code",
  },
  {
    provider: "IBM",
    title: "Fundamentals of AI Agents Using RAG and LangChain",
    date: "Mar 2026",
    detail:
      "RAG-based systems with LangChain, embeddings, vector stores, and multi-step reasoning agents",
  },
  {
    provider: "IBM",
    title: "Python for Data Science, AI & Development",
    date: "Feb 2026",
    detail:
      "Data analysis and manipulation with pandas & NumPy; REST APIs, JSON data, and Python fundamentals",
  },
];

const competencyMatricesByLocale: Record<Locale, CompetencyMatrix[]> = {
  en: competencyMatrices,
  ua: [
    {
      id: "frontend",
      index: "01",
      title: "Frontend",
      tag: "Веб · клієнт",
      summary:
        "Веб-інтерфейси, верстка та браузерні розширення з досвідом підтримки у продакшні.",
      primarySkills: [
        "JavaScript",
        "TypeScript",
        "HTML/CSS",
        "React (базовий)",
      ],
      secondarySkills: [
        "Розширення Chrome",
        "Адаптивна верстка",
        "Виправлення багів",
      ],
      frameworks: ["React", "Chrome Extension MV3", "REST UI"],
    },
    {
      id: "backend",
      index: "02",
      title: "Скриптинг та Backend",
      tag: "API та інтеграції",
      summary:
        "Автоматизація, інтеграції через REST API та дашборди поверх баз даних.",
      primarySkills: ["Python", "Flask", "REST APIs", "pytest"],
      secondarySkills: [
        "Node.js (базовий)",
        "Сторонні інтеграції",
        "Автентифікація та обробка помилок",
      ],
      frameworks: ["Flask", "Node.js", "OpenRouter", "Stripe", "Resend"],
    },
    {
      id: "ai-workflow",
      index: "03",
      title: "AI-розробка та Хостинг",
      tag: "Процеси та деплой",
      summary:
        "Щоденні агентні AI-воркфлоу, контроль версій у Git та основи деплою.",
      primarySkills: [
        "Claude Code (щодня)",
        "Agentic Workflows",
        "MCP",
        "Prompt Engineering",
      ],
      secondarySkills: ["Інтеграція LLM", "RAG", "Cursor", "pandas"],
      frameworks: [
        "Git & GitHub (гілки, PR)",
        "CI/CD",
        "Linux/VPS",
        "Supabase",
        "PostgreSQL",
      ],
    },
  ],
  bg: [
    {
      id: "frontend",
      index: "01",
      title: "Frontend",
      tag: "Уеб · клиент",
      summary:
        "Уеб интерфейси, адаптивни дизайни и браузър разширения, поддържани в продукция.",
      primarySkills: [
        "JavaScript",
        "TypeScript",
        "HTML/CSS",
        "React (основно ниво)",
      ],
      secondarySkills: [
        "Chrome разширения",
        "Адаптивен дизайн",
        "Отстраняване на бъгове",
      ],
      frameworks: ["React", "Chrome Extension MV3", "REST интерфейси"],
    },
    {
      id: "backend",
      index: "02",
      title: "Скриптиране и Backend",
      tag: "API и интеграции",
      summary:
        "Скриптове за автоматизация, REST интеграции и изгледи за данни.",
      primarySkills: ["Python", "Flask", "REST APIs", "pytest"],
      secondarySkills: [
        "Node.js (основно ниво)",
        "Външни интеграции",
        "Автентикация и обработка на грешки",
      ],
      frameworks: ["Flask", "Node.js", "OpenRouter", "Stripe", "Resend"],
    },
    {
      id: "ai-workflow",
      index: "03",
      title: "AI-асистирана разработка и Хостинг",
      tag: "Процеси и деплой",
      summary:
        "Ежедневни агентни AI работни процеси, контрол на версиите и основи на хостинга.",
      primarySkills: [
        "Claude Code (ежедневно)",
        "Agentic Workflows",
        "MCP",
        "Prompt Engineering",
      ],
      secondarySkills: ["LLM интеграция", "RAG", "Cursor", "pandas"],
      frameworks: [
        "Git & GitHub (клонове, PR)",
        "CI/CD",
        "Linux/VPS",
        "Supabase",
        "PostgreSQL",
      ],
    },
  ],
};

const certificationsByLocale: Record<Locale, CertificationItem[]> = {
  en: certifications,
  ua: [
    {
      provider: "Vanderbilt University",
      title: "AI Agents with Model Context Protocol Specialization",
      date: "Вер 2026",
      detail:
        "Credential ID: 7GNJTGZNZJJU • Model Context Protocol (MCP), архітектури AI-агентів, оркестрація інструментів та GenAI-воркфлоу",
    },
    {
      provider: "Vanderbilt University",
      title: "Generative AI Software Engineering Specialization",
      date: "Вер 2026",
      detail:
        "Credential ID: 8XRRZ8TGWFKL • Програмна інженерія з LLM, патерни промптів, архітектура та проєктування ПЗ",
    },
    {
      provider: "Sooezy Academy",
      title: "Agentic AI Sooezy - Season 1",
      date: "Сер 2026",
      detail:
        "Credential ID: SOOEZY-1E4FAF • Розробка агентних AI-систем, автономні воркфлоу кодування, Claude Code",
    },
    {
      provider: "IBM",
      title: "Fundamentals of AI Agents Using RAG and LangChain",
      date: "Бер 2026",
      detail:
        "RAG-системи з LangChain, ембедінги, векторні сховища та багатокрокові агенти міркувань",
    },
    {
      provider: "IBM",
      title: "Python for Data Science, AI & Development",
      date: "Лют 2026",
      detail:
        "Аналіз і обробка даних у pandas та NumPy; робота з REST API, JSON та основи Python",
    },
  ],
  bg: [
    {
      provider: "Vanderbilt University",
      title: "AI Agents with Model Context Protocol Specialization",
      date: "Сеп 2026",
      detail:
        "Credential ID: 7GNJTGZNZJJU • Model Context Protocol (MCP), агентни AI архитектури, оркестрация на инструменти и GenAI процеси",
    },
    {
      provider: "Vanderbilt University",
      title: "Generative AI Software Engineering Specialization",
      date: "Сеп 2026",
      detail:
        "Credential ID: 8XRRZ8TGWFKL • Софтуерно инженерство с LLM, промпт шаблони, софтуерна архитектура и дизайн",
    },
    {
      provider: "Sooezy Academy",
      title: "Agentic AI Sooezy - Season 1",
      date: "Авг 2026",
      detail:
        "Credential ID: SOOEZY-1E4FAF • Разработка на агентни AI системи, автономни процеси за програмиране, Claude Code",
    },
    {
      provider: "IBM",
      title: "Fundamentals of AI Agents Using RAG and LangChain",
      date: "Мар 2026",
      detail:
        "RAG системи с LangChain, ембединги, векторни бази и многостъпкови агенти",
    },
    {
      provider: "IBM",
      title: "Python for Data Science, AI & Development",
      date: "Фев 2026",
      detail:
        "Анализ и обработка на данни с pandas и NumPy; REST API, JSON данни и основи на Python",
    },
  ],
};

export function getCompetencyMatrices(locale: Locale): CompetencyMatrix[] {
  return competencyMatricesByLocale[locale] || competencyMatrices;
}

export function getCertifications(locale: Locale): CertificationItem[] {
  return certificationsByLocale[locale] || certifications;
}
