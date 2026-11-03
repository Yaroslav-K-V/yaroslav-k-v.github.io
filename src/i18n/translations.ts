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
    openToWork: string;
    directoryTag: string;
    sectionsTitle: string;
    sectionsCount: string;
    openSection: string;
    dirAboutTag: string;
    dirAboutTitle: string;
    dirAboutDesc: string;
    dirProjectsTag: string;
    dirProjectsTitle: string;
    dirProjectsDesc: string;
    dirContactsTag: string;
    dirContactsTitle: string;
    dirContactsDesc: string;
    dirContactsMeta: string;
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
    infoEducationLabel: string;
    infoEducationValue: string;
    infoEducationSub: string;
    infoExperienceLabel: string;
    infoExperienceValue: string;
    infoExperienceSub: string;
    infoLanguagesLabel: string;
    infoLanguagesValue: string;
    infoLanguagesSub: string;
    infoLocationLabel: string;
    infoLocationValue: string;
    infoLocationSub: string;
    timelineEyebrow: string;
    timelineTitle: string;
    timelinePeriod: string;
    skillsEyebrow: string;
    skillsTitle: string;
    skillsSubtitle: string;
    mainToolsLabel: string;
    alsoUsedLabel: string;
    toolsServicesLabel: string;
    certsEyebrow: string;
    certsTitle: string;
    certsSubtitle: string;
    spokenLanguagesLabel: string;
    spokenLanguagesValue: string;
    approachEyebrow: string;
    approachTitle: string;
    approachSubtitle: string;
    milestones: {
      grenergy: {
        indexTag: string;
        role: string;
        organization: string;
        location: string;
        program: string;
        period: string;
        highlights: string[];
      };
      university: {
        indexTag: string;
        role: string;
        organization: string;
        location: string;
        program: string;
        period: string;
        statusText: string;
        highlights: string[];
      };
      projectsTrack: {
        indexTag: string;
        role: string;
        organization: string;
        location: string;
        program: string;
        period: string;
        statusText: string;
        highlights: string[];
      };
    };
    pillars: {
      index: string;
      tag: string;
      title: string;
      description: string;
    }[];
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    projectsCount: string;
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
    featuredBadge: string;
    featuredMarker: string;
    statusLive: string;
    statusInProgress: string;
    statusOpenSource: string;
    highlightsLabel: string;
    stackOverviewLabel: string;
    layersSuffix: string;
    stackPrefix: string;
    liveDemoBtn: string;
    demoBtn: string;
    codeBtn: string;
    detailsBtn: string;
    emptyTitle: string;
    emptySubtitle: string;
    showAllBtn: string;
  };
  modal: {
    tabAll: string;
    tabOverview: string;
    tabArchitecture: string;
    tabTech: string;
    tabMetrics: string;
    projectDetailsEyebrow: string;
    section01Title: string;
    problemStatement: string;
    scopeObjectives: string;
    section02Title: string;
    howItsBuilt: string;
    keyDecisions: string;
    section03Title: string;
    techStackMatrix: string;
    section04Title: string;
    checklistLabel: string;
    notesLabel: string;
    metricsResults: string;
    openService: string;
    openGithub: string;
    footerEnd: string;
    liveServiceLink: string;
    repositoryLink: string;
    close: string;
    closeBtn: string;
  };
  contacts: {
    badge: string;
    title: string;
    subtitle: string;
    statusAvailable: string;
    infoRepliesLabel: string;
    infoRepliesValue: string;
    infoRepliesSub: string;
    infoLocationLabel: string;
    infoLocationValue: string;
    infoLocationSub: string;
    infoAvailabilityLabel: string;
    infoAvailabilityValue: string;
    infoAvailabilitySub: string;
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
    formErrInvalidEmail: string;
    formErrCheckFields: string;
    formErrBlocked: string;
    formErrGeneric: string;
    formErrNoConnection: string;
    channelsTitle: string;
    copy: string;
    copied: string;
    toastCopiedPrefix: string;
    channels: {
      email: {
        indexTag: string;
        title: string;
        status: string;
        description: string;
        actionLabel: string;
      };
      telegram: {
        indexTag: string;
        title: string;
        status: string;
        description: string;
        actionLabel: string;
      };
      linkedin: {
        indexTag: string;
        title: string;
        status: string;
        description: string;
        actionLabel: string;
      };
      github: {
        indexTag: string;
        title: string;
        status: string;
        description: string;
        actionLabel: string;
      };
    };
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
      openToWork: "Open to work",
      directoryTag: "INDEX DIRECTORY",
      sectionsTitle: "Sections",
      sectionsCount: "// 03 pages",
      openSection: "Open →",
      dirAboutTag: "Bio",
      dirAboutTitle: "About Me",
      dirAboutDesc:
        "Software Engineering student, Grenergy LLC internship, skills, and certifications.",
      dirProjectsTag: "Work & code",
      dirProjectsTitle: "Projects",
      dirProjectsDesc:
        "meetbadi internship work, Unitra test generator, HotspotGuard macOS utility, PyGlow editor, and data notebooks.",
      dirContactsTag: "Get in touch",
      dirContactsTitle: "Contacts",
      dirContactsDesc:
        "Direct email, LinkedIn profile, GitHub, and PDF resume download.",
      dirContactsMeta: "Varna, Bulgaria · Fast Response",
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
      infoEducationLabel: "Education",
      infoEducationValue: "BSc Software Eng.",
      infoEducationSub: "VUM · Sep 2025 – Present",
      infoExperienceLabel: "Experience",
      infoExperienceValue: "AI Agent Intern",
      infoExperienceSub: "Grenergy LLC · Jun–Aug 2026",
      infoLanguagesLabel: "Languages",
      infoLanguagesValue: "JS, TS, Python",
      infoLanguagesSub: "React · REST APIs",
      infoLocationLabel: "Location",
      infoLocationValue: "Varna, Bulgaria",
      infoLocationSub: "Open to remote",
      timelineEyebrow: "Experience & education",
      timelineTitle: "Experience",
      timelinePeriod: "2025 — present",
      skillsEyebrow: "Skills",
      skillsTitle: "Skills",
      skillsSubtitle: "Languages & tools I use",
      mainToolsLabel: "Main tools",
      alsoUsedLabel: "Also used",
      toolsServicesLabel: "Tools & services",
      certsEyebrow: "From my CV",
      certsTitle: "Certifications",
      certsSubtitle: "5 certificates · 2026",
      spokenLanguagesLabel: "Spoken Languages: ",
      spokenLanguagesValue: "Ukrainian — Native · English — B2 (C1 Reading)",
      approachEyebrow: "My approach",
      approachTitle: "How I work",
      approachSubtitle: "3 notes",
      milestones: {
        grenergy: {
          indexTag: "Experience",
          role: "AI Agent Developer Intern",
          organization: "Grenergy LLC",
          location: "Istanbul",
          program: "Internship",
          period: "Jun 2026 – Aug 2026",
          highlights: [
            "Maintained a production web platform (web app, Chrome extension, Supabase backend): updated layouts and features, fixed bugs, and kept existing sites and tools running reliably.",
            "Wrote Python and TypeScript/JavaScript scripts and integrations that automated routine work, processed data, and connected third-party services (OpenRouter, Stripe, Resend) via REST APIs with authentication and error handling.",
            "Maintained and extended data-backed dashboard and tooling views on top of PostgreSQL/Supabase, including debugging data and integration issues reported by users.",
            "Worked in GitHub with organized branches, commits, and pull requests; wrote technical documentation to support handover and onboarding.",
            "Used Claude Code and agentic AI workflows daily to explore the codebase, plan changes, write code, and debug; reviewed AI output for correctness before shipping.",
            "Supported Linux VPS hosting and CI/CD deployment pipelines, helping deliver fixes and small tools reliably.",
          ],
        },
        university: {
          indexTag: "Education",
          role: "BSc Software Engineering",
          organization: "Varna University of Management",
          location: "Varna, Bulgaria",
          program: "Undergraduate Degree Program",
          period: "Sep 2025 – Present",
          statusText: "In progress",
          highlights: [
            "Relevant coursework: Object-Oriented Programming, Data Structures & Algorithms, Software Design, SDLC, Agile.",
          ],
        },
        projectsTrack: {
          indexTag: "Projects",
          role: "Independent Projects & Open Source",
          organization: "Unitra · PyGlow · HotspotGuard · Data Science",
          location: "Varna, Bulgaria / Remote",
          program: "Project Track",
          period: "2025 – Present",
          statusText: "Ongoing",
          highlights: [
            "Unitra — AI-powered desktop application that automatically generates Python unit tests from source code (AST analysis, LLM prompt construction, Flask + pywebview, pytest).",
            "PyGlow — lightweight Python code editor built from scratch (Pygments highlighting, local LLM autocomplete, plugin-style architecture).",
            "Applied Data Science — exploratory data analysis on real estate, retail, and student datasets with pandas, seaborn, and reproducible Jupyter Notebook reports.",
            "HotspotGuard — macOS Wi-Fi watchdog built as an agentic-development exercise (Swift, self-tested, CI).",
          ],
        },
      },
      pillars: [
        {
          index: "01",
          tag: "Production",
          title: "Keep live systems running",
          description:
            "Update layouts and features, fix bugs, and debug data and integration issues reported by users — on the web app, Chrome extension, and Supabase backend.",
        },
        {
          index: "02",
          tag: "AI workflow",
          title: "AI-assisted, human-reviewed",
          description:
            "Daily Claude Code and agentic workflows to explore codebases, plan changes, write code, and debug — with AI output reviewed for correctness before shipping.",
        },
        {
          index: "03",
          tag: "Workflow",
          title: "Organized GitHub delivery",
          description:
            "Organized branches, commits, and pull requests, clear task communication, technical documentation, and CI/CD + Linux/VPS basics to deliver fixes reliably.",
        },
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Selected Engineering Works",
      subtitle:
        "Production platforms, desktop utilities, AST developer tooling, and applied data science.",
      projectsCount: "projects",
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
      featuredBadge: "Featured",
      featuredMarker: "FEATURED PROJECT",
      statusLive: "Live",
      statusInProgress: "In progress",
      statusOpenSource: "Open source",
      highlightsLabel: "Highlights",
      stackOverviewLabel: "Stack Overview",
      layersSuffix: "layers",
      stackPrefix: "Stack:",
      liveDemoBtn: "Live Demo",
      demoBtn: "Demo",
      codeBtn: "Code",
      detailsBtn: "Details",
      emptyTitle: "Nothing here yet",
      emptySubtitle: "No projects in this category — try another filter.",
      showAllBtn: "Show all",
    },
    modal: {
      tabAll: "All Sections",
      tabOverview: "Overview",
      tabArchitecture: "Architecture",
      tabTech: "Tech Stack",
      tabMetrics: "Metrics",
      projectDetailsEyebrow: "PROJECT DETAILS",
      section01Title: "Section 01 // What & why",
      problemStatement: "Core Challenge",
      scopeObjectives: "Goals & Scope",
      section02Title: "Section 02 // How it’s built",
      howItsBuilt: "How It’s Built",
      keyDecisions: "Key Decisions",
      section03Title: "Section 03 // Tech stack",
      techStackMatrix: "Technology Stack Matrix",
      section04Title: "Section 04 // Notes",
      checklistLabel: "Checklist",
      notesLabel: "NOTES",
      metricsResults: "Engineering Metrics & Verification",
      openService: "Open Live Service",
      openGithub: "View on GitHub",
      footerEnd: "PROJECT DETAILS // END",
      liveServiceLink: "Live Service",
      repositoryLink: "Repository",
      close: "Close (Esc)",
      closeBtn: "Close",
    },
    contacts: {
      badge: "Contacts",
      title: "Get in Touch",
      subtitle:
        "Direct channels, schedule a call, or send a message directly through the form.",
      statusAvailable: "Open to internship & junior opportunities",
      infoRepliesLabel: "Replies",
      infoRepliesValue: "Within a day",
      infoRepliesSub: "I check mail daily",
      infoLocationLabel: "Primary Location & Time",
      infoLocationValue: "Varna, Bulgaria · UTC+2",
      infoLocationSub: "Open to remote",
      infoAvailabilityLabel: "Current Availability",
      infoAvailabilityValue: "Open to Junior roles",
      infoAvailabilitySub: "Full-time / Part-time / Remote",
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
      formErrInvalidEmail: "That email doesn’t look right — double-check it.",
      formErrCheckFields:
        "Something in the form looks off — check and try again.",
      formErrBlocked: "Sending is blocked right now — try email instead.",
      formErrGeneric: "Couldn’t send — try again in a minute.",
      formErrNoConnection: "No connection — check your internet and try again.",
      channelsTitle: "Direct Channels",
      copy: "Copy",
      copied: "Copied!",
      toastCopiedPrefix: "[CLIPBOARD] Copied",
      channels: {
        email: {
          indexTag: "Email",
          title: "Email",
          status: "Replies within a day",
          description:
            "Best way to reach me — jobs, internships, or questions about my work.",
          actionLabel: "Write",
        },
        telegram: {
          indexTag: "Messenger",
          title: "Telegram",
          status: "Replies fast",
          description: "Fastest reply — usually within a few hours.",
          actionLabel: "Open",
        },
        linkedin: {
          indexTag: "Network",
          title: "LinkedIn",
          status: "Profile",
          description: "Work history, education, and background.",
          actionLabel: "Open",
        },
        github: {
          indexTag: "Code",
          title: "GitHub",
          status: "Open source",
          description: "My code — projects, commits, and open source.",
          actionLabel: "Open",
        },
      },
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
      openToWork: "Відкритий до пропозицій",
      directoryTag: "НАВІГАЦІЙНИЙ ДОВІДНИК",
      sectionsTitle: "Розділи",
      sectionsCount: "// 03 сторінки",
      openSection: "Відкрити →",
      dirAboutTag: "Біо",
      dirAboutTitle: "Про мене",
      dirAboutDesc:
        "Студент інженерії ПЗ, стажування в Grenergy LLC, навички та сертифікації.",
      dirProjectsTag: "Роботи й код",
      dirProjectsTitle: "Проєкти",
      dirProjectsDesc:
        "Стажування meetbadi, генератор тестів Unitra, macOS утиліта HotspotGuard, редактор PyGlow та дата-ноутбуки.",
      dirContactsTag: "Зв’язок",
      dirContactsTitle: "Контакти",
      dirContactsDesc:
        "Прямий email, профіль LinkedIn, репозиторії GitHub та завантаження резюме.",
      dirContactsMeta: "Варна, Болгарія · Швидка відповідь",
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
      infoEducationLabel: "Освіта",
      infoEducationValue: "BSc Software Eng.",
      infoEducationSub: "VUM · Вер 2025 – дотепер",
      infoExperienceLabel: "Досвід",
      infoExperienceValue: "AI Agent Intern",
      infoExperienceSub: "Grenergy LLC · Чер–Сер 2026",
      infoLanguagesLabel: "Мови коду",
      infoLanguagesValue: "JS, TS, Python",
      infoLanguagesSub: "React · REST APIs",
      infoLocationLabel: "Локація",
      infoLocationValue: "Варна, Болгарія",
      infoLocationSub: "Відкритий до remote",
      timelineEyebrow: "Досвід та освіта",
      timelineTitle: "Досвід",
      timelinePeriod: "2025 — дотепер",
      skillsEyebrow: "Навички",
      skillsTitle: "Компетенції",
      skillsSubtitle: "Мови програмування та інструменти",
      mainToolsLabel: "Основні інструменти",
      alsoUsedLabel: "Також у роботі",
      toolsServicesLabel: "Інструменти та сервіси",
      certsEyebrow: "З мого CV",
      certsTitle: "Сертифікації",
      certsSubtitle: "5 сертифікатів · 2026",
      spokenLanguagesLabel: "Мови спілкування: ",
      spokenLanguagesValue:
        "Українська — Рідна · Англійська — B2 (C1 читання тех. документації)",
      approachEyebrow: "Мій підхід",
      approachTitle: "Принципи роботи",
      approachSubtitle: "3 фокуси",
      milestones: {
        grenergy: {
          indexTag: "Досвід",
          role: "AI Agent Developer Intern",
          organization: "Grenergy LLC",
          location: "Стамбул",
          program: "Стажування",
          period: "Чер 2026 – Сер 2026",
          highlights: [
            "Підтримував живу веб-платформу (веб-застосунок, розширення Chrome, бекенд Supabase): оновлював інтерфейс і функції, виправляв баги та забезпечував надійну роботу сервісів.",
            "Писав скрипти та інтеграції на Python і TypeScript/JavaScript для автоматизації рутини, обробки даних та підключення сторонніх сервісів (OpenRouter, Stripe, Resend) через REST API з автентифікацією та обробкою помилок.",
            "Підтримував і розширював дашборди та інструменти поверх PostgreSQL/Supabase, включно з налагодженням проблем із даними та інтеграціями за зверненнями користувачів.",
            "Працював у GitHub зі структурованими гілками, комітами та pull request-ами; писав технічну документацію для передачі справ та онбордингу.",
            "Щодня використовував Claude Code та агентні AI-воркфлоу для дослідження кодової бази, планування змін, написання коду й дебагу; перевіряв згенерований код перед релізом.",
            "Допомагав із підтримкою Linux VPS-хостингу та CI/CD пайплайнів для надійної доставки оновлень.",
          ],
        },
        university: {
          indexTag: "Освіта",
          role: "BSc Програмна інженерія",
          organization: "Varna University of Management",
          location: "Варна, Болгарія",
          program: "Бакалаврат",
          period: "Вер 2025 – Дотепер",
          statusText: "В процесі",
          highlights: [
            "Профільні дисципліни: Об'єктно-орієнтоване програмування, Структури даних та алгоритми, Проєктування ПЗ, SDLC, Agile.",
          ],
        },
        projectsTrack: {
          indexTag: "Проєкти",
          role: "Власні проєкти та Open Source",
          organization: "Unitra · PyGlow · HotspotGuard · Data Science",
          location: "Варна, Болгарія / Remote",
          program: "Проєктний трек",
          period: "2025 – Дотепер",
          statusText: "Активно",
          highlights: [
            "Unitra — десктопний застосунок із ШІ для автоматичної генерації модульних тестів Python із вихідного коду (AST-аналіз, конструювання промптів для LLM, Flask + pywebview, pytest).",
            "PyGlow — легкий редактор коду Python, написаний з нуля (підсвічування Pygments, локальне LLM-автодоповнення, плагінна архітектура).",
            "Applied Data Science — розвідувальний аналіз даних (EDA) нерухомості, ритейлу та успішності студентів із pandas, seaborn та відтворюваними звітами Jupyter Notebook.",
            "HotspotGuard — утиліта меню-бару macOS для контролю Wi-Fi з'єднання, побудована за агентною методологією (Swift, 192 тести, CI).",
          ],
        },
      },
      pillars: [
        {
          index: "01",
          tag: "Продакшн",
          title: "Підтримка живих систем",
          description:
            "Оновлення інтерфейсів і функцій, виправлення багів та налагодження проблем із даними й інтеграціями у веб-застосунку, розширенні Chrome та бекенді Supabase.",
        },
        {
          index: "02",
          tag: "AI-процес",
          title: "Прискорення з ШІ під ручним контролем",
          description:
            "Щоденне використання Claude Code та агентних процесів для аналізу коду, планування, розробки й дебагу — з обов'язковою перевіркою кожного рядка перед релізом.",
        },
        {
          index: "03",
          tag: "Процеси",
          title: "Організована робота в GitHub",
          description:
            "Чисті гілки, коміти та pull request-и, зрозуміла комунікація по задачах, технічна документація та базові навички CI/CD і Linux/VPS для стабільних релізів.",
        },
      ],
    },
    projects: {
      badge: "Портфоліо",
      title: "Вибрані інженерні роботи",
      subtitle:
        "Продакшн-платформи, десктопні утиліти, розробницькі інструменти на AST та прикладна наука про дані.",
      projectsCount: "проєктів",
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
      featuredBadge: "Вибране",
      featuredMarker: "КЛЮЧОВИЙ ПРОЄКТ",
      statusLive: "Наживо",
      statusInProgress: "У розробці",
      statusOpenSource: "Open source",
      highlightsLabel: "Ключове",
      stackOverviewLabel: "Огляд архітектури",
      layersSuffix: "рівні",
      stackPrefix: "Стек:",
      liveDemoBtn: "Живий сайт",
      demoBtn: "Демо",
      codeBtn: "Код",
      detailsBtn: "Деталі",
      emptyTitle: "У цій категорії порожньо",
      emptySubtitle: "Немає проєктів за цим фільтром — спробуйте інший.",
      showAllBtn: "Показати всі",
    },
    modal: {
      tabAll: "Усі розділи",
      tabOverview: "Огляд",
      tabArchitecture: "Архітектура",
      tabTech: "Стек технологій",
      tabMetrics: "Метрики",
      projectDetailsEyebrow: "ДОСЬЄ ПРОЄКТУ",
      section01Title: "Розділ 01 // Суть та мета",
      problemStatement: "Ключовий виклик",
      scopeObjectives: "Цілі та обсяг роботи",
      section02Title: "Розділ 02 // Як це побудовано",
      howItsBuilt: "Архітектура системи",
      keyDecisions: "Ключові технічні рішення",
      section03Title: "Розділ 03 // Технологічний стек",
      techStackMatrix: "Матриця технологічного стеку",
      section04Title: "Розділ 04 // Результати та нотатки",
      checklistLabel: "Реалізовано",
      notesLabel: " ПРИМІТКИ",
      metricsResults: "Інженерні метрики та верифікація",
      openService: "Відкрити живий сервіс",
      openGithub: "Переглянути на GitHub",
      footerEnd: "ДОСЬЄ ПРОЄКТУ // КІНЕЦЬ",
      liveServiceLink: "Живий сервіс",
      repositoryLink: "Репозиторій",
      close: "Закрити (Esc)",
      closeBtn: "Закрити",
    },
    contacts: {
      badge: "Контакти",
      title: "Зв’язатися зі мною",
      subtitle:
        "Прямі канали зв’язку, запис на дзвінок або швидке повідомлення через форму.",
      statusAvailable: "Відкритий до стажувань та Junior позицій",
      infoRepliesLabel: "Час відповіді",
      infoRepliesValue: "Протягом дня",
      infoRepliesSub: "Перевіряю пошту щодня",
      infoLocationLabel: "Локація та Часовий пояс",
      infoLocationValue: "Варна, Болгарія · UTC+2",
      infoLocationSub: "Відкритий до remote",
      infoAvailabilityLabel: "Поточна доступність",
      infoAvailabilityValue: "Відкритий до Junior ролей",
      infoAvailabilitySub: "Full-time / Part-time / Remote",
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
      formErrInvalidEmail: "Перевірте правильність адреси email.",
      formErrCheckFields:
        "Перевірте заповнення полів форми та спробуйте ще раз.",
      formErrBlocked:
        "Відправлення тимчасово недоступне — напишіть, будь ласка, на email.",
      formErrGeneric: "Не вдалося надіслати — спробуйте за хвилину.",
      formErrNoConnection:
        "Немає з’єднання — перевірте інтернет і спробуйте ще раз.",
      channelsTitle: "Прямі канали",
      copy: "Скопіювати",
      copied: "Скопійовано!",
      toastCopiedPrefix: "[БУФЕР] Скопійовано:",
      channels: {
        email: {
          indexTag: "Пошта",
          title: "Email",
          status: "Відповідь протягом дня",
          description:
            "Найкращий спосіб зв’язатися — щодо вакансій, стажувань або запитань по проєктах.",
          actionLabel: "Написати",
        },
        telegram: {
          indexTag: "Месенджер",
          title: "Telegram",
          status: "Швидка відповідь",
          description:
            "Найшвидший зв’язок — зазвичай відповідаю за кілька годин.",
          actionLabel: "Відкрити",
        },
        linkedin: {
          indexTag: "Мережа",
          title: "LinkedIn",
          status: "Профіль",
          description: "Досвід роботи, освіта та професійні контакти.",
          actionLabel: "Відкрити",
        },
        github: {
          indexTag: "Код",
          title: "GitHub",
          status: "Open source",
          description: "Мій код — проєкти, коміти та відкриті репозиторії.",
          actionLabel: "Відкрити",
        },
      },
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
      openToWork: "Отворен за предложения",
      directoryTag: "ИНДЕКС ДИРЕКТОРИЯ",
      sectionsTitle: "Раздели",
      sectionsCount: "// 03 страници",
      openSection: "Отвори →",
      dirAboutTag: "Био",
      dirAboutTitle: "За мен",
      dirAboutDesc:
        "Студент по софтуерно инженерство, стаж в Grenergy LLC, умения и сертификати.",
      dirProjectsTag: "Проекти и код",
      dirProjectsTitle: "Проекти",
      dirProjectsDesc:
        "Стаж meetbadi, генератор на тестове Unitra, macOS помощна програма HotspotGuard, редактор PyGlow и анализи на данни.",
      dirContactsTag: "Връзка",
      dirContactsTitle: "Контакти",
      dirContactsDesc:
        "Директен имейл, LinkedIn профил, GitHub код и изтегляне на CV.",
      dirContactsMeta: "Варна, България · Бърз отговор",
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
      infoEducationLabel: "Образование",
      infoEducationValue: "BSc Software Eng.",
      infoEducationSub: "VUM · Сеп 2025 – Настояще",
      infoExperienceLabel: "Опит",
      infoExperienceValue: "AI Agent Intern",
      infoExperienceSub: "Grenergy LLC · Юни–Авг 2026",
      infoLanguagesLabel: "Езици за код",
      infoLanguagesValue: "JS, TS, Python",
      infoLanguagesSub: "React · REST APIs",
      infoLocationLabel: "Локация",
      infoLocationValue: "Варна, България",
      infoLocationSub: "Отворен за дистанционна работа",
      timelineEyebrow: "Опит и образование",
      timelineTitle: "Опит",
      timelinePeriod: "2025 — настояще",
      skillsEyebrow: "Умения",
      skillsTitle: "Компетенции",
      skillsSubtitle: "Езици и инструменти, които използвам",
      mainToolsLabel: "Основни технологии",
      alsoUsedLabel: "Също в практиката",
      toolsServicesLabel: "Инструменти и услуги",
      certsEyebrow: "От моето CV",
      certsTitle: "Сертификати",
      certsSubtitle: "5 сертификата · 2026",
      spokenLanguagesLabel: "Говорими езици: ",
      spokenLanguagesValue: "Украински — Роден · Английски — B2 (C1 четене)",
      approachEyebrow: "Моят подход",
      approachTitle: "Как работя",
      approachSubtitle: "3 принципа",
      milestones: {
        grenergy: {
          indexTag: "Опит",
          role: "AI Agent Developer Intern",
          organization: "Grenergy LLC",
          location: "Истанбул",
          program: "Стаж",
          period: "Юни 2026 – Авг 2026",
          highlights: [
            "Поддържах продуктова уеб платформа (уеб приложение, Chrome разширение, Supabase бекенд): обновявах дизайни и функционалности, отстранявах бъгове и осигурявах стабилна работа.",
            "Писах Python и TypeScript/JavaScript скриптове и интеграции за автоматизация на рутинни задачи, обработка на данни и връзка с външни услуги (OpenRouter, Stripe, Resend) чрез REST API с автентикация и обработка на грешки.",
            "Поддържах и разширявах табла за данни и вътрешни инструменти върху PostgreSQL/Supabase, включително отстраняване на проблеми, докладвани от потребители.",
            "Работих в GitHub с организирани клонове, комити и pull заявки; подготвях техническа документация за предаване на задачи и въвеждане в проекта.",
            "Използвах ежедневно Claude Code и агентни AI процеси за проучване на кода, планиране, писане и дебъгване; преглеждах всеки AI резултат за коректност преди пускане.",
            "Подпомагах Linux VPS хостинг и CI/CD процеси за надеждна доставка на поправки и малки инструменти.",
          ],
        },
        university: {
          indexTag: "Образование",
          role: "BSc Софтуерно инженерство",
          organization: "Varna University of Management",
          location: "Варна, България",
          program: "Бакалавърска програма",
          period: "Сеп 2025 – Настояще",
          statusText: "В процес",
          highlights: [
            "Основни дисциплини: Обектно-ориентирано програмиране, Структури от данни и алгоритми, Софтуерен дизайн, SDLC, Agile.",
          ],
        },
        projectsTrack: {
          indexTag: "Проекти",
          role: "Самостоятелни проекти и Open Source",
          organization: "Unitra · PyGlow · HotspotGuard · Data Science",
          location: "Варна, България / Дистанционно",
          program: "Проектен опит",
          period: "2025 – Настояще",
          statusText: "Активно",
          highlights: [
            "Unitra — AI десктоп приложение за автоматично генериране на Python модулни тестове от изходен код (AST анализ, конструиране на промптове за LLM, Flask + pywebview, pytest).",
            "PyGlow — лек редактор за Python код, създаден от нулата (Pygments оцветяване, локално LLM автодовършване, модулна архитектура).",
            "Applied Data Science — проучвателен анализ на данни (EDA) за недвижими имоти, търговия на дребно и студенти с pandas, seaborn и възпроизводими Jupyter Notebook доклади.",
            "HotspotGuard — macOS Wi-Fi монитор в меню лентата, разработен като упражнение по агентно програмиране (Swift, 192 теста, CI).",
          ],
        },
      },
      pillars: [
        {
          index: "01",
          tag: "Продукция",
          title: "Поддръжка на реални системи",
          description:
            "Обновяване на интерфейси и функционалности, поправка на бъгове и отстраняване на проблеми с данни и интеграции в уеб приложението, Chrome разширението и Supabase бекенда.",
        },
        {
          index: "02",
          tag: "AI процес",
          title: "AI ускорение с човешки преглед",
          description:
            "Ежедневна работа с Claude Code и агентни процеси за анализ на кода, планиране и дебъгване — с лична проверка на всеки ред преди пускане в продукция.",
        },
        {
          index: "03",
          tag: "Работен процес",
          title: "Организирана доставка в GitHub",
          description:
            "Чисти клонове, комити и pull заявки, ясна комуникация, техническа документация и основи на CI/CD + Linux/VPS за надеждни релийзи.",
        },
      ],
    },
    projects: {
      badge: "Портфолио",
      title: "Избрани инженерни проекти",
      subtitle:
        "Продуктови платформи, десктоп приложения, AST инструменти за разработчици и приложни анализи на данни.",
      projectsCount: "проекта",
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
      featuredBadge: "Избрано",
      featuredMarker: "ОСНОВЕН ПРОЕКТ",
      statusLive: "Активно",
      statusInProgress: "В процес",
      statusOpenSource: "Open source",
      highlightsLabel: "Акценти",
      stackOverviewLabel: "Архитектурен преглед",
      layersSuffix: "слоя",
      stackPrefix: "Стек:",
      liveDemoBtn: "Демо на живо",
      demoBtn: "Демо",
      codeBtn: "Код",
      detailsBtn: "Детайли",
      emptyTitle: "Няма проекти в тази категория",
      emptySubtitle: "Опитайте друг филтър от менюто по-горе.",
      showAllBtn: "Покажи всички",
    },
    modal: {
      tabAll: "Всички раздели",
      tabOverview: "Преглед",
      tabArchitecture: "Архитектура",
      tabTech: "Технологичен стек",
      tabMetrics: "Метрики",
      projectDetailsEyebrow: "ДОСИЕ НА ПРОЕКТА",
      section01Title: "Раздел 01 // Цел и обхват",
      problemStatement: "Основно предизвикателство",
      scopeObjectives: "Цели и обхват",
      section02Title: "Раздел 02 // Архитектура",
      howItsBuilt: "Как е изградено",
      keyDecisions: "Ключови архитектурни решения",
      section03Title: "Раздел 03 // Технологичен стек",
      techStackMatrix: "Матрица на технологичния стек",
      section04Title: "Раздел 04 // Бележки и резултати",
      checklistLabel: "Реализирано",
      notesLabel: "БЕЛЕЖКИ",
      metricsResults: "Инженерни метрики и верификация",
      openService: "Отвори услугата",
      openGithub: "Преглед в GitHub",
      footerEnd: "ДОСИЕ НА ПРОЕКТА // КРАЙ",
      liveServiceLink: "Работеща услуга",
      repositoryLink: "Хранилище",
      close: "Затвори (Esc)",
      closeBtn: "Затвори",
    },
    contacts: {
      badge: "Контакти",
      title: "Свържете се с мен",
      subtitle:
        "Директни канали, запазване на разговор или съобщение директно през формата.",
      statusAvailable: "Отворен за стажове и Junior позиции",
      infoRepliesLabel: "Време за отговор",
      infoRepliesValue: "В рамките на деня",
      infoRepliesSub: "Проверявам пощата си ежедневно",
      infoLocationLabel: "Локация и Часова зона",
      infoLocationValue: "Варна, България · UTC+2",
      infoLocationSub: "Отворен за дистанционна работа",
      infoAvailabilityLabel: "Текуща наличност",
      infoAvailabilityValue: "Отворен за Junior позиции",
      infoAvailabilitySub: "Full-time / Part-time / Remote",
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
      formErrInvalidEmail: "Този имейл не изглежда валиден — проверете го.",
      formErrCheckFields: "Проверете полетата във формата и опитайте отново.",
      formErrBlocked:
        "Изпращането е временно блокирано — моля, използвайте директния имейл.",
      formErrGeneric: "Неуспешно изпращане — опитайте отново след минута.",
      formErrNoConnection:
        "Няма връзка — проверете интернета си и опитайте отново.",
      channelsTitle: "Директни канали",
      copy: "Копирай",
      copied: "Копирано!",
      toastCopiedPrefix: "[КЛИПБОРД] Копирано:",
      channels: {
        email: {
          indexTag: "Имейл",
          title: "Email",
          status: "Отговор до ден",
          description:
            "Най-добрият начин за връзка — за работа, стажове или въпроси относно проектите ми.",
          actionLabel: "Пиши",
        },
        telegram: {
          indexTag: "Месинджър",
          title: "Telegram",
          status: "Бърз отговор",
          description:
            "Най-бърза обратна връзка — обикновено в рамките на няколко часа.",
          actionLabel: "Отвори",
        },
        linkedin: {
          indexTag: "Мрежа",
          title: "LinkedIn",
          status: "Профил",
          description: "Професионален опит, образование и контакти.",
          actionLabel: "Отвори",
        },
        github: {
          indexTag: "Код",
          title: "GitHub",
          status: "Open source",
          description: "Моят код — проекти, комити и отворени хранилища.",
          actionLabel: "Отвори",
        },
      },
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
