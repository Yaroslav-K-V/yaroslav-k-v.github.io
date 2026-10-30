export type Locale = "en" | "ua" | "bg";

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
  workflow: {
    badge: string;
    title: string;
    subtitle: string;
    auto: string;
    pause: string;
    prevStep: string;
    nextStep: string;
    stagePrefix: string;
    myRule: string;
    inPractice: string;
    chipHint: string;
    steps: {
      number: string;
      tag: string;
      shortTitle: string;
      title: string;
      lead: string;
      humanTakeaway: string;
      projectExample: string;
    }[];
    ring: {
      chips: string[];
      chipAriaPrefix: string;
      center: string[];
      meta: {
        headL: string;
        headR: string;
        footL: string;
        footR: string;
      }[];
    };
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      welcome: "Welcome",
      about: "About",
      projects: "Projects",
      contacts: "Contacts",
      resume: "Resume",
      copyEmail: "Copy Email",
      emailCopied: "Copied!",
      animationsOn: "Animations: On",
      animationsOff: "Animations: Off",
      toggleMenu: "Toggle menu",
    },
    home: {
      badge: "JUNIOR WEB DEVELOPER // AI AUTOMATION",
      titleStart: "Junior Web Developer building with ",
      titleHighlight: "JavaScript, React, and Applied AI.",
      description:
        "Software Engineering student with production experience maintaining a live web platform (web app, Chrome extension, Supabase backend). Daily user of Claude Code and agentic AI workflows for exploring codebases, writing code, and debugging.",
      btnAbout: "About Me",
      btnProjects: "Projects",
      btnContacts: "Contacts",
      btnCopyEmail: "Copy email",
      btnCopied: "Copied!",
      directoryTag: "INDEX DIRECTORY",
      dirAboutTitle: "About Me",
      dirAboutDesc:
        "Software Engineering student, Grenergy LLC internship, skills, and certifications.",
      dirProjectsTitle: "Projects",
      dirProjectsDesc:
        "meetbadi internship work, Unitra test generator, HotspotGuard macOS utility, PyGlow editor, and data notebooks.",
      dirContactsTitle: "Contacts",
      dirContactsDesc:
        "Direct email, LinkedIn profile, GitHub, and PDF resume download.",
    },
    about: {
      badge: "About Me",
      title: "Background & Competencies",
      subtitle:
        "Software engineering student with hands-on production experience in web platforms and AI-assisted workflows.",
      tabsAll: "All",
      tabExperience: "Experience",
      tabEducation: "Education",
      tabProjects: "Projects Track",
      tabSkills: "Competencies",
      tabCertificates: "Certifications",
      statusActive: "Active",
      statusOngoing: "In progress",
      statusCompleted: "Completed",
      coreStack: "Core Stack",
      toolsPractices: "Tools & Practices",
      credentialId: "Credential ID",
      viewCredential: "Verify Credential",
    },
    projects: {
      badge: "Portfolio",
      title: "Selected Engineering Works",
      subtitle:
        "Production platforms, desktop utilities, AST developer tooling, and applied data science.",
      filterAll: "All Projects",
      filterFullstack: "Full-stack",
      filterAi: "AI & Agents",
      filterDesktop: "Desktop Apps",
      filterSystems: "Systems / Swift",
      viewDossier: "View Dossier",
      liveService: "Live Service",
      sourceCode: "Source Code",
      keyFeatures: "Key Features",
      architectureOverview: "Architecture Overview",
    },
    modal: {
      tabAll: "All Sections",
      tabOverview: "Overview",
      tabArchitecture: "Architecture",
      tabTech: "Tech Stack",
      tabMetrics: "Metrics",
      problemStatement: "Problem Statement",
      scopeObjectives: "Scope & Objectives",
      keyDecisions: "Key Architectural Decisions",
      techStackMatrix: "Technology Stack Matrix",
      metricsResults: "Engineering Metrics & Verification",
      openService: "Open Live Service",
      openGithub: "View on GitHub",
      close: "Close (Esc)",
    },
    contacts: {
      badge: "Contacts",
      title: "Get in Touch",
      subtitle:
        "Direct channels, schedule a call, or send a message directly through the form.",
      statusAvailable: "Open to internship & junior opportunities",
      cvTitle: "Curriculum Vitae",
      cvDesc:
        "My CV: background, Grenergy internship, skills, projects, and contact info.",
      downloadCv: "Download CV",
      copyLink: "Copy Link",
      linkCopied: "Link Copied!",
      scheduleTitle: "Schedule a 15-Minute Intro Chat",
      scheduleTag: "DIRECT CALENDAR",
      scheduleDesc:
        "Choose a suitable time on Google Meet or Zoom for a quick intro or interview chat.",
      scheduleBtn: "Book 15-min call",
      writeDirectly: "Write me directly",
      noEmailApp: "No email app needed",
      formName: "Your name",
      formEmail: "Your email",
      formTopic: "Topic",
      formTopicJob: "Job offer",
      formTopicInternship: "Internship",
      formTopicCollab: "Collaboration",
      formTopicQuestion: "Question",
      formMessage: "Hi Yaroslav, …",
      formSend: "Send message",
      formSending: "Sending…",
      formSentSuccess: "Message sent — I usually reply within a day.",
      formSendAnother: "Send another message",
      channelsTitle: "Direct Channels",
      copy: "Copy",
      copied: "Copied!",
    },
    footer: {
      rights: "All rights reserved",
      backToTop: "Back to top",
      replayIntro: "Replay intro",
    },
    workflow: {
      badge: "Engineering Workflow",
      title: "How I Build with AI Acceleration",
      subtitle:
        "I use Claude Code and modern AI tools to accelerate routine tasks, while keeping strict personal ownership of architecture, test coverage, and code review.",
      auto: "Auto",
      pause: "Pause",
      prevStep: "Previous step",
      nextStep: "Next step",
      stagePrefix: "STAGE",
      myRule: "My Engineering Rule",
      inPractice: "IN PRACTICE:",
      chipHint: "Click any phase on the ring to jump",
      steps: [
        {
          number: "01",
          tag: "SPECIFICATION & BOUNDARIES",
          shortTitle: "SPEC & TYPES",
          title: "Thinking in types before writing code",
          lead: "I define TypeScript interfaces, data models, and security rules first. AI accelerates implementation, but clear constraints keep the code deterministic.",
          humanTakeaway:
            "I establish strict contracts and boundary limits so no assumptions slip into production.",
          projectExample:
            "meetbadi — Locked Supabase RLS isolation policies and MV3 service worker boundaries prior to coding.",
        },
        {
          number: "02",
          tag: "TEST-DRIVEN HARNESS",
          shortTitle: "FAIL-SAFE TESTS",
          title: "Edge-case tests before implementation",
          lead: "I design tests for failure states, permission leaks, and malformed inputs first. Code only ships when every test suite turns green.",
          humanTakeaway:
            "Tests act as the contract. If failure scenarios are not covered by automated tests, the feature is not done.",
          projectExample:
            "HotspotGuard — 192 automated unit checks covering TCP timeouts, captive portals, and recovery routines.",
        },
        {
          number: "03",
          tag: "TASK DECOMPOSITION",
          shortTitle: "ISOLATED SCOPES",
          title: "Breaking features into isolated scopes",
          lead: "Rather than large, risky code changes, I decompose features into small independent tasks (types, UI, translations). Smaller scopes prevent regressions and Git conflicts.",
          humanTakeaway:
            "Small, focused branches are easy to reason about, verify independently, and safely merge.",
          projectExample:
            "Site_YK — Parallel scopes for i18n dictionaries, route prefetching, and video encoding.",
        },
        {
          number: "04",
          tag: "HUMAN VERIFICATION",
          shortTitle: "LINE-BY-LINE AUDIT",
          title: "Line-by-line manual code audit",
          lead: "Every diff undergoes human review for security, responsive behavior, and performance. If I cannot explain why a line of code is there, it does not ship.",
          humanTakeaway:
            "The AI assists with rapid drafting, but I personally audit and verify every commit before release.",
          projectExample:
            "meetbadi — Manual audit of Chrome extension MV3 permissions, rate limits, and Stripe webhook security.",
        },
      ],
      ring: {
        chips: [
          "Plan",
          "Spec",
          "Index",
          "Lock",
          "Test",
          "Execute",
          "Merge",
          "Review",
          "Ship",
          "Monitor",
        ],
        chipAriaPrefix: "Stage",
        center: [
          "SHARED CONTEXT",
          "TEST HARNESS",
          "ORCHESTRATOR",
          "SIGNED COMMIT",
        ],
        meta: [
          {
            headL: "Spec Lock · Context Ring",
            headR: "meetbadi / main",
            footL: "BOUNDARY LOCK · 100%",
            footR: "STEP 01",
          },
          {
            headL: "Harness · Context Ring",
            headR: "HotspotGuard / CI",
            footL: "192 CHECKS PASSING",
            footR: "STEP 02",
          },
          {
            headL: "Tasks · Context Ring",
            headR: "Site_YK / main",
            footL: "3 ISOLATED SCOPES",
            footR: "STEP 03",
          },
          {
            headL: "Review · Context Ring",
            headR: "PR #142 · GPG",
            footL: "DIFF · VERIFIED",
            footR: "STEP 04",
          },
        ],
      },
    },
  },
  ua: {
    nav: {
      welcome: "Головна",
      about: "Про мене",
      projects: "Проєкти",
      contacts: "Контакти",
      resume: "Резюме",
      copyEmail: "Скопіювати Email",
      emailCopied: "Скопійовано!",
      animationsOn: "Анімації: Увімкнено",
      animationsOff: "Анімації: Вимкнено",
      toggleMenu: "Перемкнути меню",
    },
    home: {
      badge: "JUNIOR WEB DEVELOPER // AI AUTOMATION",
      titleStart: "Junior Web Developer, який розробляє на ",
      titleHighlight: "JavaScript, React та Applied AI.",
      description:
        "Студент програмної інженерії з практичним досвідом підтримки веб-платформи у Grenergy LLC (веб-застосунок, розширення Chrome MV3, бекенд на Supabase/PostgreSQL). Щоденний користувач Claude Code та агентних AI-воркфлоу для дослідження коду, тестування та налагодження.",
      btnAbout: "Про мене",
      btnProjects: "Проєкти",
      btnContacts: "Контакти",
      btnCopyEmail: "Скопіювати email",
      btnCopied: "Скопійовано!",
      directoryTag: "НАВІГАЦІЙНИЙ ДОВІДНИК",
      dirAboutTitle: "Про мене",
      dirAboutDesc:
        "Студент інженерії ПЗ, стажування в Grenergy LLC, навички та сертифікації.",
      dirProjectsTitle: "Проєкти",
      dirProjectsDesc:
        "Стажування meetbadi, генератор тестів Unitra, macOS утиліта HotspotGuard, редактор PyGlow та дата-ноутбуки.",
      dirContactsTitle: "Контакти",
      dirContactsDesc:
        "Прямий email, профіль LinkedIn, репозиторії GitHub та завантаження резюме.",
    },
    about: {
      badge: "Про мене",
      title: "Досвід та Компетенції",
      subtitle:
        "Студент програмної інженерії з реальним досвідом у веб-платформах та сучасних AI-процесах розробки.",
      tabsAll: "Усе",
      tabExperience: "Досвід",
      tabEducation: "Освіта",
      tabProjects: "Власні проєкти",
      tabSkills: "Компетенції",
      tabCertificates: "Сертифікати",
      statusActive: "Активно",
      statusOngoing: "В процесі",
      statusCompleted: "Завершено",
      coreStack: "Основний стек",
      toolsPractices: "Інструменти та практики",
      credentialId: "ID сертифіката",
      viewCredential: "Перевірити сертифікат",
    },
    projects: {
      badge: "Портфоліо",
      title: "Вибрані інженерні роботи",
      subtitle:
        "Продакшн-платформи, десктопні утиліти, розробницькі інструменти на AST та прикладна наука про дані.",
      filterAll: "Усі проєкти",
      filterFullstack: "Full-stack",
      filterAi: "AI та Агенти",
      filterDesktop: "Десктопні застосунки",
      filterSystems: "Системні / Swift",
      viewDossier: "Відкрити досьє",
      liveService: "Живий сервіс",
      sourceCode: "Вихідний код",
      keyFeatures: "Ключові можливості",
      architectureOverview: "Огляд архітектури",
    },
    modal: {
      tabAll: "Усі розділи",
      tabOverview: "Огляд",
      tabArchitecture: "Архітектура",
      tabTech: "Стек технологій",
      tabMetrics: "Метрики",
      problemStatement: "Опис проблеми",
      scopeObjectives: "Цілі та обсяг роботи",
      keyDecisions: "Ключові архітектурні рішення",
      techStackMatrix: "Матриця технологічного стеку",
      metricsResults: "Інженерні метрики та верифікація",
      openService: "Відкрити живий сервіс",
      openGithub: "Переглянути на GitHub",
      close: "Закрити (Esc)",
    },
    contacts: {
      badge: "Контакти",
      title: "Зв’язатися зі мною",
      subtitle:
        "Прямі канали зв’язку, запис на дзвінок або швидке повідомлення через форму.",
      statusAvailable: "Відкритий до стажувань та Junior позицій",
      cvTitle: "Curriculum Vitae",
      cvDesc:
        "Моє резюме: освіта, досвід у Grenergy LLC, навички, проєкти та контакти.",
      downloadCv: "Завантажити CV",
      copyLink: "Скопіювати лінк",
      linkCopied: "Лінк скопійовано!",
      scheduleTitle: "Запланувати 15-хвилинний дзвінок",
      scheduleTag: "ОНЛАЙН КАЛЕНДАР",
      scheduleDesc:
        "Оберіть зручний час для знайомства чи інтерв’ю в Google Meet або Zoom.",
      scheduleBtn: "Записатися на дзвінок",
      writeDirectly: "Написати напряму",
      noEmailApp: "Без поштового клієнта",
      formName: "Ваше ім’я",
      formEmail: "Ваш email",
      formTopic: "Тема повідомлення",
      formTopicJob: "Пропозиція роботи",
      formTopicInternship: "Стажування",
      formTopicCollab: "Співпраця",
      formTopicQuestion: "Запитання",
      formMessage: "Привіт, Ярославе, …",
      formSend: "Надіслати повідомлення",
      formSending: "Надсилання…",
      formSentSuccess:
        "Повідомлення надіслано — зазвичай відповідаю протягом дня.",
      formSendAnother: "Надіслати ще одне",
      channelsTitle: "Прямі канали",
      copy: "Скопіювати",
      copied: "Скопійовано!",
    },
    footer: {
      rights: "Усі права захищено",
      backToTop: "Нагору",
      replayIntro: "Повторити інтро",
    },
    workflow: {
      badge: "Інженерний процес",
      title: "Як я розробляю з прискоренням ШІ",
      subtitle:
        "Використовую Claude Code та сучасні AI-інструменти для прискорення рутини, зберігаючи повний особистий контроль над архітектурою, тестами та ревʼю.",
      auto: "Авто",
      pause: "Пауза",
      prevStep: "Попередній крок",
      nextStep: "Наступний крок",
      stagePrefix: "ЕТАП",
      myRule: "Моє інженерне правило",
      inPractice: "НА ПРАКТИЦІ:",
      chipHint: "Клікніть на будь-який етап кільця для переходу",
      steps: [
        {
          number: "01",
          tag: "СПЕЦИФІКАЦІЯ ТА МЕЖІ",
          shortTitle: "СПЕЦИФІКАЦІЯ Й ТИПИ",
          title: "Мислення типами до написання коду",
          lead: "Спершу визначаю TypeScript-інтерфейси, моделі даних та правила безпеки. ШІ прискорює імплементацію, але чіткі межі роблять код детермінованим.",
          humanTakeaway:
            "Фіксую суворі контракти та межі вхідних даних, щоб у продакшн не потрапляли випадкові припущення.",
          projectExample:
            "meetbadi — Зафіксував політики ізоляції Supabase RLS та межі MV3 service worker до написання коду.",
        },
        {
          number: "02",
          tag: "ТЕСТОВИЙ КАРКАС (TDD)",
          shortTitle: "ТЕСТИ НА ЗБІЙ",
          title: "Тести на граничні випадки — до коду",
          lead: "Проєктую тести на збої, витоки прав доступу та некоректні вхідні дані до імплементації. Код релізиться лише тоді, коли всі тести зелені.",
          humanTakeaway:
            "Тести слугують контрактом. Якщо граничні сценарії не покриті автоматичними тестами — фіча не готова.",
          projectExample:
            "HotspotGuard — 192 автоматичні перевірки: TCP таймаути, captive portals та алгоритми відновлення.",
        },
        {
          number: "03",
          tag: "ДЕКОМПОЗИЦІЯ ЗАДАЧ",
          shortTitle: "ІЗОЛЬОВАНІ ГІЛКИ",
          title: "Розбиття фіч на незалежні частини",
          lead: "Замість великих ризикованих правок, розділяю задачу на малі автономні підзадачі (типи, інтерфейс, переклади). Це запобігає багам і конфліктам у Git.",
          humanTakeaway:
            "Невеликі сфокусовані гілки легко аналізувати, окремо тестувати та безпечно зливати.",
          projectExample:
            "Site_YK — Окремі ізольовані задачі для словників i18n, префетчингу маршрутів та оптимізації відео.",
        },
        {
          number: "04",
          tag: "ОСОБИСТИЙ АУДИТ",
          shortTitle: "ПОСТРІЧКОВИЙ АУДИТ",
          title: "Пострічковий ручний аудит коду",
          lead: "Кожен diff особисто перевіряю на безпеку, адаптивність та продуктивність. Якщо я не можу пояснити кожен рядок — він не потрапляє у реліз.",
          humanTakeaway:
            "ШІ допомагає швидко писати чернетки, але фінальний аудит і відповідальність за реліз — завжди за мною.",
          projectExample:
            "meetbadi — Ручний аудит дозволів Chrome extension MV3, лімітів запитів та безпеки Stripe вебхуків.",
        },
      ],
      ring: {
        chips: [
          "План",
          "Спека",
          "Індекс",
          "Межі",
          "Тест",
          "Код",
          "Мердж",
          "Рев’ю",
          "Реліз",
          "Монітор",
        ],
        chipAriaPrefix: "Етап",
        center: [
          "СПІЛЬНИЙ КОНТЕКСТ",
          "ТЕСТОВИЙ КАРКАС",
          "ОРКЕСТРАТОР",
          "ПІДПИСАНИЙ КОМІТ",
        ],
        meta: [
          {
            headL: "Фіксація меж · Context Ring",
            headR: "meetbadi / main",
            footL: "ФІКСАЦІЯ МЕЖ · 100%",
            footR: "КРОК 01",
          },
          {
            headL: "Тести · Context Ring",
            headR: "HotspotGuard / CI",
            footL: "192 ТЕСТИ ПРОЙДЕНО",
            footR: "КРОК 02",
          },
          {
            headL: "Задачі · Context Ring",
            headR: "Site_YK / main",
            footL: "3 ІЗОЛЬОВАНІ ГІЛКИ",
            footR: "КРОК 03",
          },
          {
            headL: "Рев’ю · Context Ring",
            headR: "PR #142 · GPG",
            footL: "DIFF · ПЕРЕВІРЕНО",
            footR: "КРОК 04",
          },
        ],
      },
    },
  },
  bg: {
    nav: {
      welcome: "Начало",
      about: "За мен",
      projects: "Проекти",
      contacts: "Контакти",
      resume: "Автобиография",
      copyEmail: "Копирай Email",
      emailCopied: "Копирано!",
      animationsOn: "Анимации: Вкл",
      animationsOff: "Анимации: Изкл",
      toggleMenu: "Меню",
    },
    home: {
      badge: "JUNIOR WEB DEVELOPER // AI AUTOMATION",
      titleStart: "Junior Web Developer разработващ с ",
      titleHighlight: "JavaScript, React и Applied AI.",
      description:
        "Студент по софтуерно инженерство с производствен опит в поддръжката на уеб платформа в Grenergy LLC (уеб приложение, разширение за Chrome MV3, Supabase/PostgreSQL бекенд). Ежедневен потребител на Claude Code и агентни AI работни процеси за код, тестове и дебъгване.",
      btnAbout: "За мен",
      btnProjects: "Проекти",
      btnContacts: "Контакти",
      btnCopyEmail: "Копирай email",
      btnCopied: "Копирано!",
      directoryTag: "ИНДЕКС ДИРЕКТОРИЯ",
      dirAboutTitle: "За мен",
      dirAboutDesc:
        "Студент по софтуерно инженерство, стаж в Grenergy LLC, умения и сертификати.",
      dirProjectsTitle: "Проекти",
      dirProjectsDesc:
        "Стаж meetbadi, генератор на тестове Unitra, macOS помощна програма HotspotGuard, редактор PyGlow и анализи на данни.",
      dirContactsTitle: "Контакти",
      dirContactsDesc:
        "Директен имейл, LinkedIn профил, GitHub код и изтегляне на CV.",
    },
    about: {
      badge: "За мен",
      title: "Опит и Компетенции",
      subtitle:
        "Студент по софтуерно инженерство с практически опит в уеб платформи и съвременни AI работни процеси.",
      tabsAll: "Всички",
      tabExperience: "Опит",
      tabEducation: "Образование",
      tabProjects: "Проекти",
      tabSkills: "Компетенции",
      tabCertificates: "Сертификати",
      statusActive: "Активно",
      statusOngoing: "В процес",
      statusCompleted: "Завършено",
      coreStack: "Основен стек",
      toolsPractices: "Инструменти и практики",
      credentialId: "ID на сертификат",
      viewCredential: "Провери сертификат",
    },
    projects: {
      badge: "Портфолио",
      title: "Избрани инженерни проекти",
      subtitle:
        "Продуктови платформи, десктоп приложения, AST инструменти за разработчици и приложни анализи на данни.",
      filterAll: "Всички проекти",
      filterFullstack: "Full-stack",
      filterAi: "AI & Агенти",
      filterDesktop: "Десктоп приложения",
      filterSystems: "Системни / Swift",
      viewDossier: "Преглед на досие",
      liveService: "Работеща услуга",
      sourceCode: "Изходен код",
      keyFeatures: "Ключови функционалности",
      architectureOverview: "Архитектурен преглед",
    },
    modal: {
      tabAll: "Всички раздели",
      tabOverview: "Преглед",
      tabArchitecture: "Архитектура",
      tabTech: "Технологичен стек",
      tabMetrics: "Метрики",
      problemStatement: "Формулировка на проблема",
      scopeObjectives: "Обхват и цели",
      keyDecisions: "Ключови архитектурни решения",
      techStackMatrix: "Матрица на технологичния стек",
      metricsResults: "Инженерни метрики и верификация",
      openService: "Отвори услугата",
      openGithub: "Преглед в GitHub",
      close: "Затвори (Esc)",
    },
    contacts: {
      badge: "Контакти",
      title: "Свържете се с мен",
      subtitle:
        "Директни канали, запазване на разговор или съобщение директно през формата.",
      statusAvailable: "Отворен за стажове и Junior позиции",
      cvTitle: "Curriculum Vitae",
      cvDesc:
        "Моята автобиография: образование, опит в Grenergy LLC, умения, проекти и контакти.",
      downloadCv: "Изтегли CV",
      copyLink: "Копирай линк",
      linkCopied: "Линкът е копиран!",
      scheduleTitle: "Запазете 15-минутен разговор",
      scheduleTag: "ОНЛАЙН КАЛЕНДАР",
      scheduleDesc:
        "Изберете удобно време в Google Meet или Zoom за кратък опознавателен разговор.",
      scheduleBtn: "Запази час",
      writeDirectly: "Пишете ми директно",
      noEmailApp: "Не изисква имейл клиент",
      formName: "Вашето име",
      formEmail: "Вашият имейл",
      formTopic: "Тема",
      formTopicJob: "Предложение за работа",
      formTopicInternship: "Стаж",
      formTopicCollab: "Сътрудничество",
      formTopicQuestion: "Въпрос",
      formMessage: "Здравей, Ярослав, …",
      formSend: "Изпрати съобщение",
      formSending: "Изпращане…",
      formSentSuccess:
        "Съобщението е изпратено — обикновено отговарям в рамките на деня.",
      formSendAnother: "Изпрати друго",
      channelsTitle: "Директни канали",
      copy: "Копирай",
      copied: "Копирано!",
    },
    footer: {
      rights: "Всички права запазени",
      backToTop: "Към началото",
      replayIntro: "Повтори интрото",
    },
    workflow: {
      badge: "Инженерен процес",
      title: "Как разработвам с AI ускорение",
      subtitle:
        "Използвам Claude Code и съвременни AI инструменти за рутинни задачи, запазвайки строг личен контрол върху архитектурата, тестовете и прегледа на кода.",
      auto: "Авто",
      pause: "Пауза",
      prevStep: "Предишна стъпка",
      nextStep: "Следваща стъпка",
      stagePrefix: "ЕТАП",
      myRule: "Моето инженерно правило",
      inPractice: "НА ПРАКТИКА:",
      chipHint: "Кликнете върху фаза от пръстена за преглед",
      steps: [
        {
          number: "01",
          tag: "СПЕЦИФИКАЦИЯ И ГРАНИЦИ",
          shortTitle: "СПЕЦИФИКАЦИЯ И ТИПОВЕ",
          title: "Мислене в типове преди писане на код",
          lead: "Първо дефинирам TypeScript интерфейси, модели на данни и правила за сигурност. AI ускорява разработката, но ясните граници правят кода предвидим.",
          humanTakeaway:
            "Задавам стриктни договори и граници на данните, за да не допускам неочаквани грешки в продукция.",
          projectExample:
            "meetbadi — Фиксирах Supabase RLS политики и граници на MV3 service worker преди разработката.",
        },
        {
          number: "02",
          tag: "ТЕСТОВА СРЕДА (TDD)",
          shortTitle: "ТЕСТВАНЕ ЗА ГРЕШКИ",
          title: "Тестове за крайни случаи преди код",
          lead: "Проектирам тестове за грешки, права за достъп и невалидни данни преди имплементацията. Кодът се пуска само когато всички тестове са зелени.",
          humanTakeaway:
            "Тестовете служат като договор. Ако крайните случаи не са покрити от автоматични тестове — функционалността не е завършена.",
          projectExample:
            "HotspotGuard — 192 автоматични проверки за TCP таймаути, captive portals и възстановяване на връзка.",
        },
        {
          number: "03",
          tag: "ДЕКОМПОЗИЦИЯ НА ЗАДАЧИ",
          shortTitle: "ИЗОЛИРАНИ КЛОНОВЕ",
          title: "Разделяне на задачите на малки части",
          lead: "Вместо големи рискови промени, разделям задачата на независими модули (типове, интерфейс, преводи). Това предотвратява конфликти в Git.",
          humanTakeaway:
            "Малките изолирани клонове се анализират, тестват и обединяват сигурно и лесно.",
          projectExample:
            "Site_YK — Паралелни изолирани задачи за i18n речници, презареждане на маршрути и видео оптимизация.",
        },
        {
          number: "04",
          tag: "ПРОВЕРКА ОТ ЧОВЕК",
          shortTitle: "ПРЕГЛЕД РЕД ПО РЕД",
          title: "Ръчен одит на кода ред по ред",
          lead: "Всеки diff се проверява ръчно за сигурност, адаптивност и бързина. Ако не мога да обясня даден ред код, той не стига до продукция.",
          humanTakeaway:
            "AI помага за бързи чернови, но крайният преглед и отговорността за релийза са изцяло мои.",
          projectExample:
            "meetbadi — Ръчен одит на правата в Chrome extension MV3, лимитите на заявките и сигурността на Stripe webhooks.",
        },
      ],
      ring: {
        chips: [
          "План",
          "Спека",
          "Индекс",
          "Граници",
          "Тест",
          "Код",
          "Мърдж",
          "Преглед",
          "Релийз",
          "Монитор",
        ],
        chipAriaPrefix: "Етап",
        center: [
          "ОБЩ КОНТЕКСТ",
          "ТЕСТОВА СРЕДА",
          "ОРКЕСТРАТОР",
          "ПОДПИСАН КОМИТ",
        ],
        meta: [
          {
            headL: "Фиксиране · Context Ring",
            headR: "meetbadi / main",
            footL: "ГРАНИЧЕН КОНТРОЛ · 100%",
            footR: "СТЪПКА 01",
          },
          {
            headL: "Тестове · Context Ring",
            headR: "HotspotGuard / CI",
            footL: "192 ТЕСТА УСПЕШНИ",
            footR: "СТЪПКА 02",
          },
          {
            headL: "Задачи · Context Ring",
            headR: "Site_YK / main",
            footL: "3 ИЗОЛИРАНИ КЛОНА",
            footR: "СТЪПКА 03",
          },
          {
            headL: "Преглед · Context Ring",
            headR: "PR #142 · GPG",
            footL: "DIFF · ПРОВЕРЕН",
            footR: "СТЪПКА 04",
          },
        ],
      },
    },
  },
};
