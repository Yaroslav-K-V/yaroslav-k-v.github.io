export type Locale = 'en' | 'ua' | 'bg';

export interface Translations {
  nav: {
    welcome: string;
    about: string;
    projects: string;
    contacts: string;
    resume: string;
    copyEmail: string;
    emailCopied: string;
    animationsOn: string;
    animationsOff: string;
    toggleMenu: string;
  };
  home: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    btnAbout: string;
    btnProjects: string;
    btnContacts: string;
    btnCopyEmail: string;
    btnCopied: string;
    directoryTag: string;
    dirAboutTitle: string;
    dirAboutDesc: string;
    dirProjectsTitle: string;
    dirProjectsDesc: string;
    dirContactsTitle: string;
    dirContactsDesc: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    tabsAll: string;
    tabExperience: string;
    tabEducation: string;
    tabProjects: string;
    tabSkills: string;
    tabCertificates: string;
    statusActive: string;
    statusOngoing: string;
    statusCompleted: string;
    coreStack: string;
    toolsPractices: string;
    credentialId: string;
    viewCredential: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFullstack: string;
    filterAi: string;
    filterDesktop: string;
    filterSystems: string;
    viewDossier: string;
    liveService: string;
    sourceCode: string;
    keyFeatures: string;
    architectureOverview: string;
  };
  modal: {
    tabAll: string;
    tabOverview: string;
    tabArchitecture: string;
    tabTech: string;
    tabMetrics: string;
    problemStatement: string;
    scopeObjectives: string;
    keyDecisions: string;
    techStackMatrix: string;
    metricsResults: string;
    openService: string;
    openGithub: string;
    close: string;
  };
  contacts: {
    badge: string;
    title: string;
    subtitle: string;
    statusAvailable: string;
    cvTitle: string;
    cvDesc: string;
    downloadCv: string;
    copyLink: string;
    linkCopied: string;
    scheduleTitle: string;
    scheduleTag: string;
    scheduleDesc: string;
    scheduleBtn: string;
    writeDirectly: string;
    noEmailApp: string;
    formName: string;
    formEmail: string;
    formTopic: string;
    formTopicJob: string;
    formTopicInternship: string;
    formTopicCollab: string;
    formTopicQuestion: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSentSuccess: string;
    formSendAnother: string;
    channelsTitle: string;
    copy: string;
    copied: string;
  };
  footer: {
    rights: string;
    backToTop: string;
    replayIntro: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      welcome: 'Welcome',
      about: 'About',
      projects: 'Projects',
      contacts: 'Contacts',
      resume: 'Resume',
      copyEmail: 'Copy Email',
      emailCopied: 'Copied!',
      animationsOn: 'Animations: On',
      animationsOff: 'Animations: Off',
      toggleMenu: 'Toggle menu'
    },
    home: {
      badge: 'JUNIOR WEB DEVELOPER // AI AUTOMATION',
      titleStart: 'Junior Web Developer building with ',
      titleHighlight: 'JavaScript, React, and Applied AI.',
      description:
        'Software Engineering student with production experience maintaining a live web platform (web app, Chrome extension, Supabase backend). Daily user of Claude Code and agentic AI workflows for exploring codebases, writing code, and debugging.',
      btnAbout: 'About Me',
      btnProjects: 'Projects',
      btnContacts: 'Contacts',
      btnCopyEmail: 'Copy email',
      btnCopied: 'Copied!',
      directoryTag: 'INDEX DIRECTORY',
      dirAboutTitle: 'About Me',
      dirAboutDesc: 'Software Engineering student, Grenergy LLC internship, skills, and certifications.',
      dirProjectsTitle: 'Projects',
      dirProjectsDesc:
        'meetbadi internship work, Unitra test generator, HotspotGuard macOS utility, PyGlow editor, and data notebooks.',
      dirContactsTitle: 'Contacts',
      dirContactsDesc: 'Direct email, LinkedIn profile, GitHub, and PDF resume download.'
    },
    about: {
      badge: 'About Me',
      title: 'Background & Competencies',
      subtitle: 'Software engineering student with hands-on production experience in web platforms and AI-assisted workflows.',
      tabsAll: 'All',
      tabExperience: 'Experience',
      tabEducation: 'Education',
      tabProjects: 'Projects Track',
      tabSkills: 'Competencies',
      tabCertificates: 'Certifications',
      statusActive: 'Active',
      statusOngoing: 'In progress',
      statusCompleted: 'Completed',
      coreStack: 'Core Stack',
      toolsPractices: 'Tools & Practices',
      credentialId: 'Credential ID',
      viewCredential: 'Verify Credential'
    },
    projects: {
      badge: 'Portfolio',
      title: 'Selected Engineering Works',
      subtitle: 'Production platforms, desktop utilities, AST developer tooling, and applied data science.',
      filterAll: 'All Projects',
      filterFullstack: 'Full-stack',
      filterAi: 'AI & Agents',
      filterDesktop: 'Desktop Apps',
      filterSystems: 'Systems / Swift',
      viewDossier: 'View Dossier',
      liveService: 'Live Service',
      sourceCode: 'Source Code',
      keyFeatures: 'Key Features',
      architectureOverview: 'Architecture Overview'
    },
    modal: {
      tabAll: 'All Sections',
      tabOverview: 'Overview',
      tabArchitecture: 'Architecture',
      tabTech: 'Tech Stack',
      tabMetrics: 'Metrics',
      problemStatement: 'Problem Statement',
      scopeObjectives: 'Scope & Objectives',
      keyDecisions: 'Key Architectural Decisions',
      techStackMatrix: 'Technology Stack Matrix',
      metricsResults: 'Engineering Metrics & Verification',
      openService: 'Open Live Service',
      openGithub: 'View on GitHub',
      close: 'Close (Esc)'
    },
    contacts: {
      badge: 'Contacts',
      title: 'Get in Touch',
      subtitle: 'Direct channels, schedule a call, or send a message directly through the form.',
      statusAvailable: 'Open to internship & junior opportunities',
      cvTitle: 'Curriculum Vitae',
      cvDesc: 'My CV: background, Grenergy internship, skills, projects, and contact info.',
      downloadCv: 'Download CV',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      scheduleTitle: 'Schedule a 15-Minute Intro Chat',
      scheduleTag: 'DIRECT CALENDAR',
      scheduleDesc: 'Choose a suitable time on Google Meet or Zoom for a quick intro or interview chat.',
      scheduleBtn: 'Book 15-min call',
      writeDirectly: 'Write me directly',
      noEmailApp: 'No email app needed',
      formName: 'Your name',
      formEmail: 'Your email',
      formTopic: 'Topic',
      formTopicJob: 'Job offer',
      formTopicInternship: 'Internship',
      formTopicCollab: 'Collaboration',
      formTopicQuestion: 'Question',
      formMessage: 'Hi Yaroslav, …',
      formSend: 'Send message',
      formSending: 'Sending…',
      formSentSuccess: 'Message sent — I usually reply within a day.',
      formSendAnother: 'Send another message',
      channelsTitle: 'Direct Channels',
      copy: 'Copy',
      copied: 'Copied!'
    },
    footer: {
      rights: 'All rights reserved',
      backToTop: 'Back to top',
      replayIntro: 'Replay intro'
    }
  },
  ua: {
    nav: {
      welcome: 'Головна',
      about: 'Про мене',
      projects: 'Проєкти',
      contacts: 'Контакти',
      resume: 'Резюме',
      copyEmail: 'Скопіювати Email',
      emailCopied: 'Скопійовано!',
      animationsOn: 'Анімації: Увімкнено',
      animationsOff: 'Анімації: Вимкнено',
      toggleMenu: 'Перемкнути меню'
    },
    home: {
      badge: 'JUNIOR WEB DEVELOPER // AI AUTOMATION',
      titleStart: 'Junior Web Developer, який розробляє на ',
      titleHighlight: 'JavaScript, React та Applied AI.',
      description:
        'Студент програмної інженерії з практичним досвідом підтримки веб-платформи у Grenergy LLC (веб-застосунок, розширення Chrome MV3, бекенд на Supabase/PostgreSQL). Щоденний користувач Claude Code та агентних AI-воркфлоу для дослідження коду, тестування та налагодження.',
      btnAbout: 'Про мене',
      btnProjects: 'Проєкти',
      btnContacts: 'Контакти',
      btnCopyEmail: 'Скопіювати email',
      btnCopied: 'Скопійовано!',
      directoryTag: 'НАВІГАЦІЙНИЙ ДОВІДНИК',
      dirAboutTitle: 'Про мене',
      dirAboutDesc: 'Студент інженерії ПЗ, стажування в Grenergy LLC, навички та сертифікації.',
      dirProjectsTitle: 'Проєкти',
      dirProjectsDesc:
        'Стажування meetbadi, генератор тестів Unitra, macOS утиліта HotspotGuard, редактор PyGlow та дата-ноутбуки.',
      dirContactsTitle: 'Контакти',
      dirContactsDesc: 'Прямий email, профіль LinkedIn, репозиторії GitHub та завантаження резюме.'
    },
    about: {
      badge: 'Про мене',
      title: 'Досвід та Компетенції',
      subtitle: 'Студент програмної інженерії з реальним досвідом у веб-платформах та сучасних AI-процесах розробки.',
      tabsAll: 'Усе',
      tabExperience: 'Досвід',
      tabEducation: 'Освіта',
      tabProjects: 'Власні проєкти',
      tabSkills: 'Компетенції',
      tabCertificates: 'Сертифікати',
      statusActive: 'Активно',
      statusOngoing: 'В процесі',
      statusCompleted: 'Завершено',
      coreStack: 'Основний стек',
      toolsPractices: 'Інструменти та практики',
      credentialId: 'ID сертифіката',
      viewCredential: 'Перевірити сертифікат'
    },
    projects: {
      badge: 'Портфоліо',
      title: 'Вибрані інженерні роботи',
      subtitle: 'Продакшн-платформи, десктопні утиліти, розробницькі інструменти на AST та прикладна наука про дані.',
      filterAll: 'Усі проєкти',
      filterFullstack: 'Full-stack',
      filterAi: 'AI та Агенти',
      filterDesktop: 'Десктопні застосунки',
      filterSystems: 'Системні / Swift',
      viewDossier: 'Відкрити досьє',
      liveService: 'Живий сервіс',
      sourceCode: 'Вихідний код',
      keyFeatures: 'Ключові можливості',
      architectureOverview: 'Огляд архітектури'
    },
    modal: {
      tabAll: 'Усі розділи',
      tabOverview: 'Огляд',
      tabArchitecture: 'Архітектура',
      tabTech: 'Стек технологій',
      tabMetrics: 'Метрики',
      problemStatement: 'Опис проблеми',
      scopeObjectives: 'Цілі та обсяг роботи',
      keyDecisions: 'Ключові архітектурні рішення',
      techStackMatrix: 'Матриця технологічного стеку',
      metricsResults: 'Інженерні метрики та верифікація',
      openService: 'Відкрити живий сервіс',
      openGithub: 'Переглянути на GitHub',
      close: 'Закрити (Esc)'
    },
    contacts: {
      badge: 'Контакти',
      title: 'Зв’язатися зі мною',
      subtitle: 'Прямі канали зв’язку, запис на дзвінок або швидке повідомлення через форму.',
      statusAvailable: 'Відкритий до стажувань та Junior позицій',
      cvTitle: 'Curriculum Vitae',
      cvDesc: 'Моє резюме: освіта, досвід у Grenergy LLC, навички, проєкти та контакти.',
      downloadCv: 'Завантажити CV',
      copyLink: 'Скопіювати лінк',
      linkCopied: 'Лінк скопійовано!',
      scheduleTitle: 'Запланувати 15-хвилинний дзвінок',
      scheduleTag: 'ОНЛАЙН КАЛЕНДАР',
      scheduleDesc: 'Оберіть зручний час для знайомства чи інтерв’ю в Google Meet або Zoom.',
      scheduleBtn: 'Записатися на дзвінок',
      writeDirectly: 'Написати напряму',
      noEmailApp: 'Без поштового клієнта',
      formName: 'Ваше ім’я',
      formEmail: 'Ваш email',
      formTopic: 'Тема повідомлення',
      formTopicJob: 'Пропозиція роботи',
      formTopicInternship: 'Стажування',
      formTopicCollab: 'Співпраця',
      formTopicQuestion: 'Запитання',
      formMessage: 'Привіт, Ярославе, …',
      formSend: 'Надіслати повідомлення',
      formSending: 'Надсилання…',
      formSentSuccess: 'Повідомлення надіслано — зазвичай відповідаю протягом дня.',
      formSendAnother: 'Надіслати ще одне',
      channelsTitle: 'Прямі канали',
      copy: 'Скопіювати',
      copied: 'Скопійовано!'
    },
    footer: {
      rights: 'Усі права захищено',
      backToTop: 'Нагору',
      replayIntro: 'Повторити інтро'
    }
  },
  bg: {
    nav: {
      welcome: 'Начало',
      about: 'За мен',
      projects: 'Проекти',
      contacts: 'Контакти',
      resume: 'Автобиография',
      copyEmail: 'Копирай Email',
      emailCopied: 'Копирано!',
      animationsOn: 'Анимации: Вкл',
      animationsOff: 'Анимации: Изкл',
      toggleMenu: 'Меню'
    },
    home: {
      badge: 'JUNIOR WEB DEVELOPER // AI AUTOMATION',
      titleStart: 'Junior Web Developer разработващ с ',
      titleHighlight: 'JavaScript, React и Applied AI.',
      description:
        'Студент по софтуерно инженерство с производствен опит в поддръжката на уеб платформа в Grenergy LLC (уеб приложение, разширение за Chrome MV3, Supabase/PostgreSQL бекенд). Ежедневен потребител на Claude Code и агентни AI работни процеси за код, тестове и дебъгване.',
      btnAbout: 'За мен',
      btnProjects: 'Проекти',
      btnContacts: 'Контакти',
      btnCopyEmail: 'Копирай email',
      btnCopied: 'Копирано!',
      directoryTag: 'ИНДЕКС ДИРЕКТОРИЯ',
      dirAboutTitle: 'За мен',
      dirAboutDesc: 'Студент по софтуерно инженерство, стаж в Grenergy LLC, умения и сертификати.',
      dirProjectsTitle: 'Проекти',
      dirProjectsDesc:
        'Стаж meetbadi, генератор на тестове Unitra, macOS помощна програма HotspotGuard, редактор PyGlow и анализи на данни.',
      dirContactsTitle: 'Контакти',
      dirContactsDesc: 'Директен имейл, LinkedIn профил, GitHub код и изтегляне на CV.'
    },
    about: {
      badge: 'За мен',
      title: 'Опит и Компетенции',
      subtitle: 'Студент по софтуерно инженерство с практически опит в уеб платформи и съвременни AI работни процеси.',
      tabsAll: 'Всички',
      tabExperience: 'Опит',
      tabEducation: 'Образование',
      tabProjects: 'Проекти',
      tabSkills: 'Компетенции',
      tabCertificates: 'Сертификати',
      statusActive: 'Активно',
      statusOngoing: 'В процес',
      statusCompleted: 'Завършено',
      coreStack: 'Основен стек',
      toolsPractices: 'Инструменти и практики',
      credentialId: 'ID на сертификат',
      viewCredential: 'Провери сертификат'
    },
    projects: {
      badge: 'Портфолио',
      title: 'Избрани инженерни проекти',
      subtitle: 'Продуктови платформи, десктоп приложения, AST инструменти за разработчици и приложни анализи на данни.',
      filterAll: 'Всички проекти',
      filterFullstack: 'Full-stack',
      filterAi: 'AI & Агенти',
      filterDesktop: 'Десктоп приложения',
      filterSystems: 'Системни / Swift',
      viewDossier: 'Преглед на досие',
      liveService: 'Работеща услуга',
      sourceCode: 'Изходен код',
      keyFeatures: 'Ключови функционалности',
      architectureOverview: 'Архитектурен преглед'
    },
    modal: {
      tabAll: 'Всички раздели',
      tabOverview: 'Преглед',
      tabArchitecture: 'Архитектура',
      tabTech: 'Технологичен стек',
      tabMetrics: 'Метрики',
      problemStatement: 'Формулировка на проблема',
      scopeObjectives: 'Обхват и цели',
      keyDecisions: 'Ключови архитектурни решения',
      techStackMatrix: 'Матрица на технологичния стек',
      metricsResults: 'Инженерни метрики и верификация',
      openService: 'Отвори услугата',
      openGithub: 'Преглед в GitHub',
      close: 'Затвори (Esc)'
    },
    contacts: {
      badge: 'Контакти',
      title: 'Свържете се с мен',
      subtitle: 'Директни канали, запазване на разговор или съобщение директно през формата.',
      statusAvailable: 'Отворен за стажове и Junior позиции',
      cvTitle: 'Curriculum Vitae',
      cvDesc: 'Моята автобиография: образование, опит в Grenergy LLC, умения, проекти и контакти.',
      downloadCv: 'Изтегли CV',
      copyLink: 'Копирай линк',
      linkCopied: 'Линкът е копиран!',
      scheduleTitle: 'Запазете 15-минутен разговор',
      scheduleTag: 'ОНЛАЙН КАЛЕНДАР',
      scheduleDesc: 'Изберете удобно време в Google Meet или Zoom за кратък опознавателен разговор.',
      scheduleBtn: 'Запази час',
      writeDirectly: 'Пишете ми директно',
      noEmailApp: 'Не изисква имейл клиент',
      formName: 'Вашето име',
      formEmail: 'Вашият имейл',
      formTopic: 'Тема',
      formTopicJob: 'Предложение за работа',
      formTopicInternship: 'Стаж',
      formTopicCollab: 'Сътрудничество',
      formTopicQuestion: 'Въпрос',
      formMessage: 'Здравей, Ярослав, …',
      formSend: 'Изпрати съобщение',
      formSending: 'Изпращане…',
      formSentSuccess: 'Съобщението е изпратено — обикновено отговарям в рамките на деня.',
      formSendAnother: 'Изпрати друго',
      channelsTitle: 'Директни канали',
      copy: 'Копирай',
      copied: 'Копирано!'
    },
    footer: {
      rights: 'Всички права запазени',
      backToTop: 'Към началото',
      replayIntro: 'Повтори интрото'
    }
  }
};
