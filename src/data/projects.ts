import { Project } from "../types";
import type { Locale } from "../i18n/translations";

export const projects: Project[] = [
  {
    id: 1,
    slug: "meetbadi",
    title: "meetbadi.com",
    subtitle:
      "Production meeting platform — full-stack internship contribution",
    description:
      "Live web platform I helped maintain and extend during my Grenergy internship: web app, Chrome extension, and Supabase backend.",
    categories: ["fullstack", "ai"],
    badge: "Live Service",
    features: [
      "Updated web app layouts and features, fixed bugs, and kept existing pages and tools running.",
      "Worked across the stack: TypeScript/JavaScript frontend and Chrome extension, Supabase/PostgreSQL data views.",
      "Helped connect third-party services (OpenRouter, Stripe, Resend) via REST APIs with authentication and error handling.",
      "Debugged data and integration issues reported by users; wrote docs for handover.",
    ],
    architecture: [
      "Frontend: web app + Chrome extension (TypeScript/JavaScript)",
      "Backend & data: Supabase / PostgreSQL dashboards and tooling views",
      "Integrations: REST APIs (OpenRouter, Stripe, Resend)",
    ],
    note: "Internship contribution at Grenergy LLC (Jun–Aug 2026) — not a solo project.",
    tech: [
      "TypeScript",
      "JavaScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "OpenRouter",
    ],
    url: "https://meetbadi.com",
    video: "/meetbadi-tour.mp4",
    webm: "/meetbadi-tour.webm",
    image: "/meetbadi-poster.jpg",
    dossier: {
      problemStatement:
        "Modern video meetings and async team collaboration produce high volumes of conversational data that are easily lost or siloed. Teams require an end-to-end platform with browser-integrated context capture, reliable transcript and AI note generation, secure multi-tenant storage, and seamless billing with transactional notifications.",
      scopeObjectives: [
        "Production web platform & Chrome extension (MV3) development during internship at Grenergy LLC.",
        "End-to-end full-stack feature delivery using TypeScript, React, and Supabase / PostgreSQL.",
        "Resilient integrations with external services: OpenRouter (multi-LLM orchestration), Stripe (subscriptions), and Resend (transactional email).",
        "Active bug triage, live data view optimizations, and engineering handover documentation.",
      ],
      keyDecisions: [
        {
          title: "Manifest V3 Chrome Extension",
          reasoning:
            "Architected background service workers and content scripts adhering to Chrome MV3 security constraints, enabling low-overhead tab context and meeting capture.",
        },
        {
          title: "Supabase & PostgreSQL Row Level Security (RLS)",
          reasoning:
            "Enforced strict data isolation and audit controls directly in the database engine via declarative RLS policies across organization workspaces.",
        },
        {
          title: "Multi-LLM Gateway via OpenRouter",
          reasoning:
            "Standardized model interactions through a resilient gateway, allowing dynamic routing between Claude, GPT, and open-source models with automated retries.",
        },
      ],
      stackMatrix: [
        {
          category: "Frontend & Extension",
          items: ["TypeScript", "JavaScript", "React", "Chrome MV3 Extension"],
        },
        {
          category: "Backend & Database",
          items: [
            "Supabase",
            "PostgreSQL",
            "Row-Level Security (RLS)",
            "Edge Functions",
          ],
        },
        {
          category: "Cloud Integrations",
          items: ["OpenRouter (LLMs)", "Stripe Billing", "Resend Email"],
        },
        {
          category: "Engineering Practices",
          items: [
            "Production Bug Triage",
            "REST API Design",
            "Handover Documentation",
          ],
        },
      ],
      metrics: [
        { label: "Status", value: "Production live service" },
        { label: "Architecture", value: "Web app + Chrome MV3" },
        { label: "Backend", value: "Supabase / PostgreSQL" },
      ],
      architectureLayers: [
        {
          name: "Client & Extension",
          detail:
            "React web application paired with Chrome MV3 extension for context capture",
        },
        {
          name: "API & Orchestration",
          detail:
            "Edge functions and REST gateways routing requests with robust error boundaries",
        },
        {
          name: "Data & Auth Layer",
          detail:
            "Supabase Auth with PostgreSQL tables protected by Row Level Security policies",
        },
        {
          name: "External Integrations",
          detail:
            "Secure connectors to OpenRouter, Stripe webhooks, and Resend transactional email",
        },
      ],
    },
  },
  {
    id: 2,
    slug: "unitra",
    title: "Unitra",
    subtitle: "AI-powered Python Unit Test Generator — Desktop App",
    description:
      "AI-powered desktop application that automatically generates Python unit tests from source code.",
    categories: ["ai", "desktop"],
    badge: "Open Source",
    features: [
      "Built an AST-based analysis engine to extract function signatures, docstrings, and type hints for structured prompt construction.",
      "Designed the LLM integration layer with prompt engineering to produce syntactically valid, runnable pytest test cases.",
      "Packaged as a desktop app using pywebview with a Flask backend and a custom HTML/CSS/JS frontend.",
    ],
    architecture: [
      "Analysis: Python AST parsing of function signatures, docstrings, and type hints",
      "AI layer: LLM APIs with structured prompt construction for pytest generation",
      "Desktop shell: Flask backend + custom HTML/CSS/JS frontend via pywebview",
    ],
    tech: [
      "Python",
      "Flask",
      "pywebview",
      "HTML",
      "CSS",
      "JavaScript",
      "LLM APIs",
      "pytest",
    ],
    github: "https://github.com/Yaroslav-K-V/Unitra",
    dossier: {
      problemStatement:
        "Writing comprehensive unit test suites for complex Python codebases is repetitive, time-intensive, and prone to blind spots in branch coverage. Existing test generation tools often require heavy cloud dependencies or struggle with project-specific function contracts.",
      scopeObjectives: [
        "Deterministic static AST analysis without executing untrusted code.",
        "Automated generation of robust pytest test cases for single functions or entire modules.",
        "Native desktop application interface with live test runner output and history tracking.",
        "Zero Node.js runtime overhead by leveraging Python pywebview.",
      ],
      keyDecisions: [
        {
          title: "Python AST Parser vs Regex Matching",
          reasoning:
            "Employed Python’s native ast module to deterministically walk the Abstract Syntax Tree, accurately extracting function signatures, type annotations, and control branches.",
        },
        {
          title: "pywebview + Flask vs Electron",
          reasoning:
            "Served the modern HTML/JS interface from a local Flask server rendered in a native pywebview window, eliminating Node.js runtime bloat and reducing distribution complexity.",
        },
        {
          title: "LLM Integration Layer",
          reasoning:
            "Supplied the LLM with parsed AST signatures and docstrings, allowing prompt-engineered generation of syntactically valid, runnable pytest suites.",
        },
      ],
      stackMatrix: [
        {
          category: "Core Analysis",
          items: ["Python 3.10+", "AST Module", "Static Analysis Engine"],
        },
        {
          category: "Desktop GUI",
          items: ["Flask", "pywebview", "HTML5/CSS3", "JavaScript"],
        },
        {
          category: "Test Automation",
          items: ["pytest", "Subprocess Runner", "Live Output Stream"],
        },
        { category: "AI Layer", items: ["LLM APIs", "Prompt Engineering"] },
      ],
      metrics: [
        { label: "Analysis", value: "AST, no code execution" },
        { label: "Test runner", value: "pytest subprocess" },
        { label: "Desktop shell", value: "pywebview + Flask" },
      ],
      architectureLayers: [
        {
          name: "Modular Separation",
          detail: "routes / core logic / agent / UI",
        },
        {
          name: "Desktop Host",
          detail:
            "Flask serves the frontend inside a native desktop window via pywebview",
        },
        {
          name: "AI Layer",
          detail:
            "LLM integration layer with prompt engineering for pytest generation",
        },
        {
          name: "Test Runner",
          detail:
            "Subprocess-based pytest runner streaming stdout/stderr directly into GUI",
        },
      ],
    },
  },
  {
    id: 3,
    slug: "pyglow",
    title: "PyGlow",
    subtitle: "Minimal Python Code Editor with Local AI Autocomplete",
    description:
      "Lightweight Python code editor built from scratch with syntax highlighting, search/replace, auto-indent, and multiple themes.",
    categories: ["desktop", "ai"],
    badge: "Open Source",
    features: [
      "Lightweight Python code editor built from scratch with syntax highlighting (Pygments), search/replace, auto-indent, and multiple themes.",
      "Integrated optional local LLM-based code autocomplete triggered inline while editing.",
      "Designed a modular plugin-style architecture with persistent user settings across sessions.",
    ],
    architecture: [
      "Editor: Python + PySide6 with Pygments syntax highlighting",
      "AI layer: optional local LLM-based inline autocomplete",
      "Architecture: modular plugin-style with persistent user settings",
    ],
    tech: ["Python", "PySide6", "Pygments", "Local LLM"],
    github: "https://github.com/Yaroslav-K-V/PyGlow",
    image: "/pyglow-poster.jpg",
    video: "/pyglow-demo.mp4",
    webm: "/pyglow-demo.webm",
    dossier: {
      problemStatement:
        "Modern code editors (VS Code, JetBrains) consume substantial CPU and RAM, creating noticeable lag and battery drain for quick Python scripts or on low-spec hardware. Developers need a lightweight, instantaneous editor with smart features and zero telemetry.",
      scopeObjectives: [
        "Fast launch and low memory footprint for quick edits and low-spec hardware.",
        "Syntax highlighting with customizable theme engine and automatic OS theme detection.",
        "Smart editing ergonomics: auto-indent, bracket matching, line duplication, drag & drop.",
        "Optional local AI autocomplete that keeps code on the machine.",
      ],
      keyDecisions: [
        {
          title: "PySide6 (Qt) vs Web-Based Frameworks",
          reasoning:
            "Selected Qt for Python for hardware-accelerated text rendering, native OS integration, and responsive keystroke latency.",
        },
        {
          title: "Pygments Tokenizer vs Language Servers",
          reasoning:
            "Utilized Pygments for fast, lightweight lexical tokenization, avoiding the heavy memory footprint of full language server protocols for simple edits.",
        },
        {
          title: "Local LLM Autocomplete",
          reasoning:
            "Embedded optional local LLM-based inline autocomplete for private code completion while editing.",
        },
      ],
      stackMatrix: [
        {
          category: "GUI Engine",
          items: ["PySide6 (Qt for Python)", "Hardware Accelerated"],
        },
        { category: "Syntax Highlighter", items: ["Pygments"] },
        {
          category: "Machine Learning",
          items: ["Local LLM", "Inline Autocomplete"],
        },
        {
          category: "Operating System",
          items: ["OS Theme Detection", "Session Serialization"],
        },
      ],
      metrics: [
        { label: "GUI Runtime", value: "Native Qt (PySide6)" },
        { label: "Highlighting", value: "Pygments" },
        { label: "Autocomplete", value: "Optional local LLM" },
      ],
      architectureLayers: [
        {
          name: "Editor Viewport",
          detail: "PySide6 QPlainTextEdit with custom syntax highlighter",
        },
        {
          name: "Lexical Analysis",
          detail:
            "Pygments tokenization with custom high-contrast color scheme",
        },
        {
          name: "Inference Layer",
          detail:
            "Optional local LLM autocomplete triggered inline while editing",
        },
      ],
    },
  },
  {
    id: 4,
    slug: "applied-data-science",
    title: "Applied Data Science",
    subtitle: "Exploratory Data Analysis with Python — Jupyter Notebook",
    description:
      "Conducted exploratory data analysis on real estate pricing, retail sales, and student performance datasets.",
    categories: ["ai"],
    badge: "Open Source",
    features: [
      "Conducted exploratory data analysis on real estate pricing, retail sales, and student performance datasets.",
      "Cleaned and transformed raw datasets; built visualizations to surface key trends and correlations.",
      "Delivered structured Jupyter Notebook reports with reproducible analysis and documented findings.",
    ],
    architecture: [
      "Analysis: pandas data cleaning and transformation",
      "Visualization: seaborn charts for trends and correlations",
      "Delivery: structured Jupyter Notebook reports with documented findings",
    ],
    note: "pandas, seaborn, reproducible analysis with documented findings.",
    tech: ["Python", "pandas", "seaborn", "Jupyter Notebook"],
    github: "https://github.com/Yaroslav-K-V/applied-data-science",
    dossier: {
      problemStatement:
        "Multidimensional real-world datasets in housing economics, retail transactions, and student career paths contain hidden relationships, non-linear pricing effects, and operational bottlenecks that require rigorous exploratory data analysis to surface.",
      scopeObjectives: [
        "Exploratory analysis of three real-world datasets: real estate pricing, retail sales, student performance.",
        "Cleaning and transformation of raw data before visualization.",
        "Charts and summaries that surface trends and correlations.",
        "Reproducible Jupyter Notebook reports with documented findings.",
      ],
      keyDecisions: [
        {
          title: "Vectorized NumPy/Pandas Operations",
          reasoning:
            "Leveraged vectorized matrix computations to ensure high performance on large datasets without iterative Python loop bottlenecks.",
        },
        {
          title: "High-Density Statistical Visualizations",
          reasoning:
            "Utilized Seaborn and Matplotlib for publication-grade heatmaps, density plots, and regression lines engineered for clear interpretation.",
        },
        {
          title: "Focus on Insights over Generic Plotting",
          reasoning:
            "Structured the notebook to extract verifiable conclusions, isolating socioeconomic and commercial drivers.",
        },
      ],
      stackMatrix: [
        { category: "Data Analysis", items: ["Python", "pandas", "numpy"] },
        { category: "Visualization", items: ["seaborn", "matplotlib"] },
        {
          category: "Environment",
          items: ["Jupyter Notebook", "Interactive Python"],
        },
      ],
      metrics: [
        { label: "Datasets", value: "Real estate · Retail · Students" },
        { label: "Tools", value: "pandas · seaborn" },
        { label: "Output", value: "Jupyter reports" },
      ],
      architectureLayers: [
        {
          name: "Ingestion & Cleaning",
          detail:
            "Pandas data frame normalization, outlier handling, and missing data imputation",
        },
        {
          name: "Statistical Modeling",
          detail:
            "Vectorized aggregations, quantile cuts, and correlation matrices",
        },
        {
          name: "Visualization",
          detail: "Seaborn correlation heatmaps and distribution histograms",
        },
      ],
    },
  },
  {
    id: 5,
    slug: "hotspotguard",
    title: "HotspotGuard",
    subtitle: "macOS Wi-Fi watchdog — built with AI agents (Swift)",
    description:
      "An exercise in agentic development: a macOS menu bar app that monitors internet reachability and reconnects Wi-Fi hotspots — specced and directed by me, implemented with AI coding agents.",
    categories: ["desktop"],
    badge: "Open Source",
    features: [
      "Built agentically: architecture and specs first, code via AI agents, everything reviewed and verified by me.",
      "Menu bar status icon: green (online), yellow (reconnecting), red (offline), gray (paused).",
      "Real TCP handshake probing — catches captive portals and dead uplinks that look “connected”.",
      "Self-test suite (192 checks), SwiftLint / Periphery / jscpd gates, and GitHub Actions CI — same quality bar as hand-written code.",
    ],
    architecture: [
      "Process: spec → agent implementation → review → tests → docs",
      "Core: Swift package with protocol-based managers, no UI dependencies in core",
      "Delivery: script-built .app bundle with versioned tag releases",
    ],
    tech: [
      "Swift",
      "SwiftUI",
      "CoreWLAN",
      "Keychain",
      "SwiftPM",
      "GitHub Actions",
    ],
    github: "https://github.com/Yaroslav-K-V/hotspot-guard",
    image: "/hotspot-poster.jpg",
    video: "/hotspot-demo.mp4",
    webm: "/hotspot-demo.webm",
    dossier: {
      problemStatement:
        "macOS built-in network status frequently reports active Wi-Fi association even when captive portals, DHCP stalls, or cellular hotspot drops silently halt all traffic. Developers and remote engineers suffer broken long-running commands and stale sessions without immediate visual alerts or automated recovery.",
      scopeObjectives: [
        "Autonomous macOS menu bar watchdog monitoring true end-to-end internet reachability with zero perceptible CPU or memory overhead.",
        "Active TCP handshake probing against known endpoints to detect silent gateway drops and captive portals.",
        "Automatic Wi-Fi cycle and reconnection routines leveraging CoreWLAN and macOS Keychain for credential storage.",
        "Rigorous agentic engineering pipeline: spec-first architecture, AI-agent code generation, manual review, 192 self-tests, and CI automation.",
      ],
      keyDecisions: [
        {
          title: "Active TCP Handshake vs ICMP Ping",
          reasoning:
            "Implemented non-blocking TCP handshakes on standard ports rather than ICMP pings to avoid ISP rate-limiting and catch portal captive redirects immediately.",
        },
        {
          title: "Protocol-Driven Core with Zero UI Coupling",
          reasoning:
            "Isolated the network monitor and reconnection logic into a standalone Swift package, enabling comprehensive headless verification (192 checks) without running SwiftUI.",
        },
        {
          title: "Agentic Development Methodology",
          reasoning:
            "Defined formal architecture contracts and constraints, delegated implementation to AI coding agents, and enforced quality via SwiftLint, Periphery, and GitHub Actions CI.",
        },
      ],
      stackMatrix: [
        {
          category: "Language & UI",
          items: ["Swift 5.9+", "SwiftUI Menu Bar", "Swift Package Manager"],
        },
        {
          category: "macOS Frameworks",
          items: ["CoreWLAN", "SystemConfiguration", "Keychain Services"],
        },
        {
          category: "Quality & Testing",
          items: ["192 Self-Tests", "SwiftLint", "Periphery", "GitHub Actions"],
        },
        {
          category: "Engineering Pattern",
          items: [
            "Agentic Development",
            "Protocol-Oriented Design",
            "Zero Memory Overhead",
          ],
        },
      ],
      metrics: [
        { label: "Memory Footprint", value: "< 15MB zero overhead" },
        { label: "Verification", value: "192 automated checks" },
        { label: "Platform", value: "macOS native menu bar" },
      ],
      architectureLayers: [
        {
          name: "Status Presentation",
          detail:
            "Lightweight SwiftUI menu bar item reflecting live connection states (green/yellow/red/gray)",
        },
        {
          name: "Reachability Engine",
          detail:
            "Background watchdog performing periodic asynchronous TCP handshake verification",
        },
        {
          name: "Reconnection Manager",
          detail:
            "CoreWLAN integration orchestrating interface cycle and known hotspot association",
        },
        {
          name: "Security & Credentials",
          detail:
            "macOS Keychain Services integration for safe hotspot credential retrieval",
        },
      ],
    },
  },
];

type ProjectTranslation = Pick<
  Project,
  "subtitle" | "description" | "features" | "architecture" | "note" | "dossier"
>;

const projectTranslations: Record<
  Exclude<Locale, "en">,
  Record<string, ProjectTranslation>
> = {
  ua: {
    meetbadi: {
      subtitle:
        "Продакшн-платформа для зустрічей — full-stack внесок під час стажування",
      description:
        "Жива веб-платформа, яку я допомагав підтримувати й розвивати під час стажування в Grenergy LLC: веб-застосунок, розширення Chrome та бекенд на Supabase.",
      features: [
        "Оновлював верстку та функціональність веб-застосунку, виправляв баги та підтримував стабільну роботу сервісів.",
        "Працював на всіх рівнях стеку: фронтенд і розширення Chrome на TypeScript/JavaScript, подання даних у Supabase/PostgreSQL.",
        "Допомагав інтегрувати сторонні сервіси (OpenRouter, Stripe, Resend) через REST API з автентифікацією та обробкою помилок.",
        "Налагоджував проблеми з даними та інтеграціями за зверненнями користувачів; писав технічну документацію для передачі справ.",
      ],
      architecture: [
        "Фронтенд: веб-застосунок + розширення Chrome (TypeScript/JavaScript)",
        "Бекенд і дані: дашборди та службові подання Supabase / PostgreSQL",
        "Інтеграції: REST API (OpenRouter, Stripe, Resend)",
      ],
      note: "Внесок під час стажування у Grenergy LLC (червень–серпень 2026) — командний продакшн-проєкт.",
      dossier: {
        problemStatement:
          "Сучасні відеозустрічі та асинхронна командна робота генерують великі обсяги розмовних даних, які легко губляться. Командам потрібна цілісна платформа із захопленням контексту в браузері, надійною генерацією транскриптів та AI-нотаток, безпечним мульти-тенантним сховищем та прозорим білінгом.",
        scopeObjectives: [
          "Розробка продакшн веб-платформи та розширення Chrome (MV3) під час стажування в Grenergy LLC.",
          "Наскрізна доставка full-stack функціональності на TypeScript, React та Supabase / PostgreSQL.",
          "Надійні інтеграції зі сторонніми сервісами: OpenRouter (оркестрація LLM), Stripe (підписки) та Resend (транзакційні листи).",
          "Оперативний розбір багів, оптимізація подань даних та підготовка документації для команди.",
        ],
        keyDecisions: [
          {
            title: "Розширення Chrome на Manifest V3",
            reasoning:
              "Побудовано фонові service workers та content scripts згідно з вимогами безпеки Chrome MV3 для легкого захоплення контексту зустрічей.",
          },
          {
            title: "Ізоляція даних через Supabase та PostgreSQL RLS",
            reasoning:
              "Забезпечено сувору ізоляцію даних між робочими просторами організацій безпосередньо на рівні СУБД через політики Row Level Security (RLS).",
          },
          {
            title: "Мульти-LLM шлюз через OpenRouter",
            reasoning:
              "Стандартизовано взаємодію з моделями через єдиний шлюз із динамічною маршрутизацією між Claude, GPT та відкритими моделями й автоматичними повторами.",
          },
        ],
        stackMatrix: [
          {
            category: "Фронтенд і Розширення",
            items: [
              "TypeScript",
              "JavaScript",
              "React",
              "Chrome MV3 Extension",
            ],
          },
          {
            category: "Бекенд і База даних",
            items: [
              "Supabase",
              "PostgreSQL",
              "Row-Level Security (RLS)",
              "Edge Functions",
            ],
          },
          {
            category: "Хмарні інтеграції",
            items: ["OpenRouter (LLMs)", "Stripe Billing", "Resend Email"],
          },
          {
            category: "Інженерні практики",
            items: [
              "Тріаж продакшн-багів",
              "Проєктування REST API",
              "Документація передачі",
            ],
          },
        ],
        metrics: [
          { label: "Статус", value: "Живий продакшн-сервіс" },
          { label: "Архітектура", value: "Веб-апп + Chrome MV3" },
          { label: "Бекенд", value: "Supabase / PostgreSQL" },
        ],
        architectureLayers: [
          {
            name: "Клієнт і Розширення",
            detail:
              "Веб-застосунок React у парі з розширенням Chrome MV3 для захоплення контексту",
          },
          {
            name: "API та Оркестрація",
            detail:
              "Edge-функції та REST-шлюзи з чіткою обробкою помилок і таймаутів",
          },
          {
            name: "Рівень даних та авторизації",
            detail:
              "Supabase Auth і таблиці PostgreSQL, захищені політиками Row Level Security",
          },
          {
            name: "Зовнішні інтеграції",
            detail:
              "Безпечні конектори до OpenRouter, вебхуків Stripe та поштового сервісу Resend",
          },
        ],
      },
    },
    unitra: {
      subtitle: "AI-генератор модульних тестів Python — десктопний застосунок",
      description:
        "Десктопний застосунок зі штучним інтелектом, який автоматично генерує модульні тести pytest із вихідного коду Python.",
      features: [
        "Створив рушій статичного аналізу на базі AST для вилучення сигнатур функцій, докстрінгів та анотацій типів.",
        "Спроєктував шар інтеграції з LLM та промпт-інжинірингом для генерації синтаксично валідних, готових до запуску тестів pytest.",
        "Запакував у кросплатформний десктопний застосунок на pywebview з бекендом Flask і кастомним інтерфейсом HTML/CSS/JS.",
      ],
      architecture: [
        "Аналіз: парсинг Python AST для вилучення сигнатур, докстрінгів і типів",
        "AI-рівень: LLM API зі структурованою побудовою промптів для генерації pytest",
        "Десктопна оболонка: бекенд Flask + інтерфейс HTML/CSS/JS через pywebview",
      ],
      dossier: {
        problemStatement:
          "Написання повних наборів модульних тестів для складного коду Python забирає багато часу та часто пропускає граничні гілки виконання. Існуючі інструменти або вимагають важких залежностей, або погано враховують контракти функцій.",
        scopeObjectives: [
          "Детермінований статичний аналіз AST без виконання недовіреного коду.",
          "Автоматична генерація надійних тестів pytest для окремих функцій або цілих модулів.",
          "Нативний десктопний інтерфейс із живим виводом результатів запуску тестів та історією.",
          "Відсутність накладних витрат Node.js завдяки використанню pywebview.",
        ],
        keyDecisions: [
          {
            title: "Парсер Python AST замість регулярних виразів",
            reasoning:
              "Використано вбудований модуль ast у Python для точного обходу абстрактного синтаксичного дерева, вилучення сигнатур, анотацій типів і гілок розгалуження.",
          },
          {
            title: "pywebview + Flask замість Electron",
            reasoning:
              "Інтерфейс HTML/JS обслуговується локальним сервером Flask у нативному вікні pywebview, що усуває важкий рантайм Chromium/Node.js.",
          },
          {
            title: "Шар інтеграції з LLM",
            reasoning:
              "Передача в LLM структурованих AST-метаданих та докстрінгів забезпечує генерацію синтаксично коректних наборів pytest.",
          },
        ],
        stackMatrix: [
          {
            category: "Ядро аналізу",
            items: ["Python 3.10+", "Модуль AST", "Статичний аналізатор"],
          },
          {
            category: "Десктопний GUI",
            items: ["Flask", "pywebview", "HTML5/CSS3", "JavaScript"],
          },
          {
            category: "Автоматизація тестів",
            items: ["pytest", "Subprocess Runner", "Потоковий вивід"],
          },
          { category: "AI-рівень", items: ["LLM APIs", "Prompt Engineering"] },
        ],
        metrics: [
          { label: "Аналіз", value: "AST, без виконання коду" },
          { label: "Тест-раннер", value: "Підпроцес pytest" },
          { label: "Оболонка", value: "pywebview + Flask" },
        ],
        architectureLayers: [
          {
            name: "Модульний поділ",
            detail: "Маршрути / ядро аналізу / AI-агент / інтерфейс",
          },
          {
            name: "Десктопний хост",
            detail:
              "Flask обслуговує фронтенд всередині нативного десктопного вікна pywebview",
          },
          {
            name: "AI-рівень",
            detail:
              "Шар інтеграції з LLM та інжинірингом промптів для генерації pytest",
          },
          {
            name: "Тест-раннер",
            detail:
              "Запуск pytest у підпроцесі з прямою трансляцією stdout/stderr в інтерфейс",
          },
        ],
      },
    },
    pyglow: {
      subtitle:
        "Мінімалістичний редактор коду Python з локальним AI-автодоповненням",
      description:
        "Легкий редактор коду Python, створений з нуля: підсвічування синтаксису, пошук і заміна, автовідступи та підтримка тем.",
      features: [
        "Легкий редактор коду Python із підсвічуванням синтаксису (Pygments), пошуком/заміною, автовідступами та кількома темами оформлення.",
        "Інтегровано опціональне локальне AI-автодоповнення коду на базі LLM прямо під час набору.",
        "Спроєктовано модульну плагін-архітектуру зі збереженням користувацьких налаштувань між сесіями.",
      ],
      architecture: [
        "Редактор: Python + PySide6 із підсвічуванням синтаксису Pygments",
        "AI-рівень: опціональне локальне інлайн-автодоповнення на базі LLM",
        "Архітектура: модульна структура зі збереженням стану сесії",
      ],
      dossier: {
        problemStatement:
          "Сучасні IDE (VS Code, JetBrains) споживають значні обсяги CPU та оперативної пам'яті, що створює затримки під час швидкого редагування скриптів або на слабкому залізі. Розробникам потрібен миттєвий редактор із розумними функціями та без телеметрії.",
        scopeObjectives: [
          "Миттєвий запуск і мінімальне споживання пам'яті для швидких правок коду.",
          "Підсвічування синтаксису з кастомними темами та автоматичним визначенням теми ОС.",
          "Зручна ергономіка: автовідступи, парні дужки, дублювання рядків, drag & drop.",
          "Опціональне локальне AI-автодоповнення, яке не передає код за межі комп'ютера.",
        ],
        keyDecisions: [
          {
            title: "PySide6 (Qt) замість веб-фреймворків",
            reasoning:
              "Обрано Qt для Python заради апаратного прискорення рендерингу тексту, нативної інтеграції з ОС та мінімальної затримки вводу.",
          },
          {
            title: "Токенізатор Pygments замість важких LSP",
            reasoning:
              "Використано Pygments для швидкої лексичної токенізації без витрат пам'яті повноцінного мовного сервера.",
          },
          {
            title: "Локальне LLM-автодоповнення",
            reasoning:
              "Вбудовано опціональне локальне автодоповнення коду для приватної роботи без хмарних API.",
          },
        ],
        stackMatrix: [
          {
            category: "Графічний рушій",
            items: ["PySide6 (Qt for Python)", "Апаратне прискорення"],
          },
          { category: "Підсвічування синтаксису", items: ["Pygments"] },
          {
            category: "Машинне навчання",
            items: ["Локальна LLM", "Інлайн-автодоповнення"],
          },
          {
            category: "Операційна система",
            items: ["Визначення теми ОС", "Серіалізація сесій"],
          },
        ],
        metrics: [
          { label: "GUI рантайм", value: "Нативний Qt (PySide6)" },
          { label: "Підсвічування", value: "Pygments" },
          { label: "Автодоповнення", value: "Опціональна локальна LLM" },
        ],
        architectureLayers: [
          {
            name: "Вікно редактора",
            detail:
              "PySide6 QPlainTextEdit із кастомним підсвічувачем синтаксису",
          },
          {
            name: "Лексичний аналіз",
            detail:
              "Токенізація Pygments із висококонтрастною палітрою кольорів",
          },
          {
            name: "Рівень інференсу",
            detail:
              "Опціональне локальне автодоповнення LLM під час редагування",
          },
        ],
      },
    },
    "applied-data-science": {
      subtitle:
        "Розвідувальний аналіз даних (EDA) на Python — Jupyter Notebook",
      description:
        "Дослідницький аналіз реальних наборів даних: ціноутворення нерухомості, роздрібні продажі та успішність студентів.",
      features: [
        "Провів розвідувальний аналіз даних (EDA) для датасетів ринку нерухомості, роздрібної торгівлі та успішності студентів.",
        "Очистив і трансформував сирі дані; побудував інформативні візуалізації для виявлення трендів і кореляцій.",
        "Оформив відтворювані звіти у Jupyter Notebook із задокументованими висновками.",
      ],
      architecture: [
        "Аналіз: очищення й трансформація даних у pandas",
        "Візуалізація: графіки seaborn для трендів і кореляцій",
        "Результат: структуровані звіти Jupyter Notebook із висновками",
      ],
      note: "pandas, seaborn, відтворюваний аналіз із задокументованими висновками.",
      dossier: {
        problemStatement:
          "Багатовимірні реальні дані у сферах нерухомості, ритейлу та освіти містять приховані залежності, нелінійні ефекти та викиди, для виявлення яких потрібен систематичний розвідувальний аналіз даних.",
        scopeObjectives: [
          "Дослідницький аналіз трьох реальних датасетів: ціни на нерухомість, роздрібні продажі, успішність студентів.",
          "Очищення, нормалізація та трансформація сирих даних перед візуалізацією.",
          "Побудова графіків та зведених таблиць, що підсвічують ключові тренди й кореляції.",
          "Відтворювані звіти у Jupyter Notebook з описаними висновками.",
        ],
        keyDecisions: [
          {
            title: "Векторизовані операції NumPy/Pandas",
            reasoning:
              "Використано векторизовані матричні обчислення для швидкої обробки масивів даних без повільних циклів Python.",
          },
          {
            title: "Статистичні візуалізації високої щільності",
            reasoning:
              "Застосовано Seaborn і Matplotlib для побудови теплових карт кореляцій, розподілів щільності та ліній регресії.",
          },
          {
            title: "Фокус на практичних висновках",
            reasoning:
              "Структуровано ноутбуки навколо перевірених гіпотез і виявлення соціально-економічних та комерційних факторів впливу.",
          },
        ],
        stackMatrix: [
          { category: "Аналіз даних", items: ["Python", "pandas", "numpy"] },
          { category: "Візуалізація", items: ["seaborn", "matplotlib"] },
          {
            category: "Середовище",
            items: ["Jupyter Notebook", "Interactive Python"],
          },
        ],
        metrics: [
          { label: "Датасети", value: "Нерухомість · Ритейл · Студенти" },
          { label: "Інструменти", value: "pandas · seaborn" },
          { label: "Результат", value: "Звіти Jupyter" },
        ],
        architectureLayers: [
          {
            name: "Завантаження та очищення",
            detail:
              "Нормалізація таблиць pandas, обробка викидів і заповнення пропусків",
          },
          {
            name: "Статистичне моделювання",
            detail:
              "Векторизовані агрегації, квантильний поділ та матриці кореляцій",
          },
          {
            name: "Візуалізація",
            detail: "Теплові карти кореляцій Seaborn та гістограми розподілів",
          },
        ],
      },
    },
    hotspotguard: {
      subtitle: "macOS Wi-Fi watchdog — створений з AI-агентами (Swift)",
      description:
        "Практика агентної розробки: застосунок у меню-барі macOS, який моніторить реальну доступність інтернету та автоматично перепідключає хотспоти — спроєктований мною та реалізований з AI-агентами.",
      features: [
        "Агентна розробка: спочатку архітектура й специфікації, код через AI-агентів, повне рев'ю та верифікація мною.",
        "Іконка статусу в меню-барі: зелена (онлайн), жовта (перепідключення), червона (офлайн), сіра (пауза).",
        "Перевірка реальним TCP-рукостисканням — виявляє captive-портали та «завислі» з'єднання.",
        "192 автоматичні перевірки, гейти SwiftLint / Periphery / jscpd та GitHub Actions CI — такий самий стандарт якості, як для ручного коду.",
      ],
      architecture: [
        "Процес: специфікація → реалізація агентом → рев'ю → тести → документація",
        "Ядро: Swift-пакет із протокольними менеджерами без UI-залежностей",
        "Доставка: скриптове збирання .app бандла з версіонованими релізами",
      ],
      dossier: {
        problemStatement:
          "Стандартний індикатор Wi-Fi у macOS часто показує активне з'єднання навіть тоді, коли captive-портал, збій DHCP або втрата мобільного хотспоту повністю блокують трафік. Розробники втрачають активні сесії без миттєвого сповіщення чи авто-відновлення.",
        scopeObjectives: [
          "Автономний watchdog у меню-барі macOS для перевірки реального доступу до мережі з нульовим навантаженням на CPU та пам'ять.",
          "Активні TCP-рукостискання до перевірених вузлів для виявлення тихих обривів шлюзу та captive-порталів.",
          "Автоматичний перезапуск Wi-Fi та перепідключення до хотспоту через CoreWLAN та macOS Keychain.",
          "Суворий агентний інженерний пайплайн: spec-first архітектура, генерація коду AI-агентами, ручне рев'ю, 192 тести та CI.",
        ],
        keyDecisions: [
          {
            title: "Активний TCP Handshake замість ICMP Ping",
            reasoning:
              "Реалізовано неблокуючі TCP-з'єднання на стандартних портах замість ICMP-пінгів, щоб уникати блокувань провайдерів і миттєво ловити captive-портали.",
          },
          {
            title: "Протокольне ядро без прив'язки до UI",
            reasoning:
              "Логіку моніторингу мережі та перепідключення винесено в окремий Swift-пакет, що дозволило покрити її 192 headless-тестами без запуску SwiftUI.",
          },
          {
            title: "Методологія агентної розробки",
            reasoning:
              "Зафіксовано формальні архітектурні контракти, делеговано написання коду AI-агентам і забезпечено контроль якості через SwiftLint, Periphery та GitHub Actions CI.",
          },
        ],
        stackMatrix: [
          {
            category: "Мова та Інтерфейс",
            items: ["Swift 5.9+", "SwiftUI Menu Bar", "Swift Package Manager"],
          },
          {
            category: "Фреймворки macOS",
            items: ["CoreWLAN", "SystemConfiguration", "Keychain Services"],
          },
          {
            category: "Якість і Тестування",
            items: [
              "192 автотести",
              "SwiftLint",
              "Periphery",
              "GitHub Actions",
            ],
          },
          {
            category: "Інженерні патерни",
            items: [
              "Агентна розробка",
              "Протокольно-орієнтований дизайн",
              "Мінімальне споживання пам'яті",
            ],
          },
        ],
        metrics: [
          { label: "Пам'ять", value: "< 15 МБ без навантаження" },
          { label: "Верифікація", value: "192 автоматичні перевірки" },
          { label: "Платформа", value: "Нативний меню-бар macOS" },
        ],
        architectureLayers: [
          {
            name: "Індикація статусу",
            detail:
              "Легкий елемент меню-бару SwiftUI, що відображає стан мережі (зелений/жовтий/червоний/сірий)",
          },
          {
            name: "Рушій доступності",
            detail:
              "Фоновий watchdog, який виконує періодичні асинхронні перевірки TCP-рукостискань",
          },
          {
            name: "Менеджер перепідключення",
            detail:
              "Інтеграція з CoreWLAN для перезапуску інтерфейсу та підключення до відомого хотспоту",
          },
          {
            name: "Безпека та облікові дані",
            detail:
              "Робота з macOS Keychain Services для безпечного отримання паролів хотспоту",
          },
        ],
      },
    },
  },
  bg: {
    meetbadi: {
      subtitle:
        "Продуктова платформа за срещи — full-stack принос по време на стаж",
      description:
        "Работеща уеб платформа, която помагах да се поддържа и развива по време на стажа ми в Grenergy LLC: уеб приложение, Chrome разширение и Supabase бекенд.",
      features: [
        "Обновявах дизайни и функционалности в уеб приложението, отстранявах бъгове и поддържах съществуващите страници и инструменти.",
        "Работих в целия стек: TypeScript/JavaScript фронтенд и Chrome разширение, както и изгледи за данни в Supabase/PostgreSQL.",
        "Помогнах за свързването на външни услуги (OpenRouter, Stripe, Resend) чрез REST API с автентикация и обработка на грешки.",
        "Отстранявах проблеми с данни и интеграции, докладвани от потребители; подготвих документация за предаване на проекта.",
      ],
      architecture: [
        "Фронтенд: уеб приложение + Chrome разширение (TypeScript/JavaScript)",
        "Бекенд и данни: табла и инструментални изгледи в Supabase / PostgreSQL",
        "Интеграции: REST API (OpenRouter, Stripe, Resend)",
      ],
      note: "Принос по време на стаж в Grenergy LLC (юни–август 2026) — екипен проект.",
      dossier: {
        problemStatement:
          "Съвременните видео срещи и асинхронната екипна работа генерират голям обем разговорни данни, които лесно се губят. Екипите се нуждаят от цялостна платформа с улавяне на контекст в браузъра, надеждна транскрипция и AI бележки, сигурно мулти-тенант съхранение и автоматизирано таксуване.",
        scopeObjectives: [
          "Разработка на продуктова уеб платформа и Chrome разширение (MV3) по време на стаж в Grenergy LLC.",
          "Цялостна full-stack разработка с TypeScript, React и Supabase / PostgreSQL.",
          "Надеждни интеграции с външни услуги: OpenRouter (мулти-LLM оркестрация), Stripe (абонаменти) и Resend (транзакционни имейли).",
          "Оперативно отстраняване на бъгове, оптимизация на изгледи за данни и техническа документация.",
        ],
        keyDecisions: [
          {
            title: "Manifest V3 Chrome разширение",
            reasoning:
              "Проектирани фонови service workers и content scripts според изискванията за сигурност на Chrome MV3 за улавяне на контекст с минимален разход на ресурси.",
          },
          {
            title: "Supabase и PostgreSQL Row Level Security (RLS)",
            reasoning:
              "Наложена стриктна изолация на данните директно в базата данни чрез декларативни RLS политики между различните организации.",
          },
          {
            title: "Мулти-LLM шлюз чрез OpenRouter",
            reasoning:
              "Стандартизирани заявки към моделите чрез устойчив шлюз с динамично насочване между Claude, GPT и отворени модели.",
          },
        ],
        stackMatrix: [
          {
            category: "Фронтенд и Разширение",
            items: [
              "TypeScript",
              "JavaScript",
              "React",
              "Chrome MV3 Extension",
            ],
          },
          {
            category: "Бекенд и База данни",
            items: [
              "Supabase",
              "PostgreSQL",
              "Row-Level Security (RLS)",
              "Edge Functions",
            ],
          },
          {
            category: "Облачни интеграции",
            items: ["OpenRouter (LLMs)", "Stripe Billing", "Resend Email"],
          },
          {
            category: "Инженерни практики",
            items: [
              "Анализ на продукционни бъгове",
              "REST API дизайн",
              "Техническа документация",
            ],
          },
        ],
        metrics: [
          { label: "Статус", value: "Работеща продукционна услуга" },
          { label: "Архитектура", value: "Уеб апп + Chrome MV3" },
          { label: "Бекенд", value: "Supabase / PostgreSQL" },
        ],
        architectureLayers: [
          {
            name: "Клиент и Разширение",
            detail:
              "React уеб приложение в комбинация с Chrome MV3 разширение за улавяне на контекст",
          },
          {
            name: "API и Оркестрация",
            detail:
              "Edge функции и REST шлюзове с надеждна обработка на грешки",
          },
          {
            name: "Данни и Автентикация",
            detail:
              "Supabase Auth и PostgreSQL таблици, защитени с Row Level Security политики",
          },
          {
            name: "Външни интеграции",
            detail:
              "Сигурни конектори към OpenRouter, Stripe уебхукове и Resend имейли",
          },
        ],
      },
    },
    unitra: {
      subtitle: "AI генератор на Python модулни тестове — десктоп приложение",
      description:
        "Десктоп приложение с изкуствен интелект, което автоматично генерира модулни тестове pytest от изходен код на Python.",
      features: [
        "Изградих AST базиран анализатор за извличане на сигнатури на функции, docstrings и типова информация за структурирани промптове.",
        "Проектирах слоя за LLM интеграция и промпт инженеринг за генериране на валидни и изпълними pytest тестове.",
        "Пакетирах приложението за десктоп чрез pywebview с Flask бекенд и собствен HTML/CSS/JS интерфейс.",
      ],
      architecture: [
        "Анализ: Python AST парсване на сигнатури, docstrings и типове",
        "AI слой: LLM API със структурирани промптове за pytest генериране",
        "Десктоп обвивка: Flask бекенд + HTML/CSS/JS фронтенд чрез pywebview",
      ],
      dossier: {
        problemStatement:
          "Писането на пълни модулни тестове за сложни Python проекти отнема много време и често пропуска гранични случаи. Съществуващите инструменти често изискват тежки зависимости или не разбират специфичните договори на функциите.",
        scopeObjectives: [
          "Детерминиран статичен AST анализ без изпълнение на непознат код.",
          "Автоматично генериране на pytest тестове за отделни функции или цели модули.",
          "Нативен десктоп интерфейс с изпълнение на тестовете в реално време и история.",
          "Нулев Node.js разход благодарение на Python pywebview.",
        ],
        keyDecisions: [
          {
            title: "Python AST парсър вместо регулярни изрази",
            reasoning:
              "Използван е вграденият ast модул на Python за точно обхождане на синтактичното дърво и извличане на сигнатури, анотации и разклонения.",
          },
          {
            title: "pywebview + Flask вместо Electron",
            reasoning:
              "HTML/JS интерфейсът се обслужва от локален Flask сървър в нативен pywebview прозорец, елиминирайки тежкия Node.js/Chromium пакет.",
          },
          {
            title: "LLM интеграционен слой",
            reasoning:
              "Подаването на парснати AST сигнатури и docstrings към LLM позволява генериране на синтактично валидни pytest тестове.",
          },
        ],
        stackMatrix: [
          {
            category: "Ядро за анализ",
            items: ["Python 3.10+", "AST модул", "Статичен анализатор"],
          },
          {
            category: "Десктоп GUI",
            items: ["Flask", "pywebview", "HTML5/CSS3", "JavaScript"],
          },
          {
            category: "Тестова автоматизация",
            items: ["pytest", "Subprocess Runner", "Поток на резултатите"],
          },
          { category: "AI слой", items: ["LLM APIs", "Prompt Engineering"] },
        ],
        metrics: [
          { label: "Анализ", value: "AST, без изпълнение на код" },
          { label: "Тест рънър", value: "pytest подпроцес" },
          { label: "Десктоп среда", value: "pywebview + Flask" },
        ],
        architectureLayers: [
          {
            name: "Модулно разделение",
            detail: "маршрути / основна логика / агент / интерфейс",
          },
          {
            name: "Десктоп хост",
            detail:
              "Flask обслужва фронтенда в нативен десктоп прозорец чрез pywebview",
          },
          {
            name: "AI слой",
            detail:
              "LLM интеграционен слой с промпт инженеринг за генериране на pytest",
          },
          {
            name: "Тест рънър",
            detail:
              "Подпроцесен pytest рънър, предаващ stdout/stderr директно в интерфейса",
          },
        ],
      },
    },
    pyglow: {
      subtitle: "Минималистичен Python редактор с локално AI автодовършване",
      description:
        "Лек редактор за Python код, изграден от нулата, с оцветяване на синтаксиса, търсене/замяна, автоматичен отстъп и теми.",
      features: [
        "Лек редактор за Python код, създаден от нулата, с оцветяване на синтаксиса (Pygments), търсене/замяна, авто-отстъп и множество теми.",
        "Интегрирано опционално локално LLM автодовършване на код директно при писане.",
        "Модулна плъгин архитектура със запазване на потребителските настройки между сесиите.",
      ],
      architecture: [
        "Редактор: Python + PySide6 с Pygments оцветяване на синтаксиса",
        "AI слой: опционално локално LLM автодовършване при писане",
        "Архитектура: модулна плъгин система с постоянни настройки",
      ],
      dossier: {
        problemStatement:
          "Съвременните редактори (VS Code, JetBrains) консумират значително количество CPU и RAM при бързи редакции на Python скриптове или на по-слаб хардуер. Разработчиците се нуждаят от мигновен редактор с умни функции и нулева телеметрия.",
        scopeObjectives: [
          "Бързо стартиране и нисък разход на памет за бързи редакции.",
          "Оцветяване на синтаксиса със система за теми и автоматично разпознаване на темата на ОС.",
          "Удобна ергономика: авто-отстъп, съвпадение на скоби, дублиране на редове, drag & drop.",
          "Опционално локално AI автодовършване, което запазва кода изцяло на машината.",
        ],
        keyDecisions: [
          {
            title: "PySide6 (Qt) вместо уеб базирани рамки",
            reasoning:
              "Избран е Qt за Python заради хардуерно ускорения рендеринг на текст, нативната интеграция с ОС и минималното забавяне при писане.",
          },
          {
            title: "Pygments токенизатор вместо тежки езикови сървъри",
            reasoning:
              "Използван е Pygments за бърза лексикална токенизация без тежкия разход на памет на пълните LSP сървъри.",
          },
          {
            title: "Локално LLM автодовършване",
            reasoning:
              "Вградено опционално локално LLM автодовършване за поверителна работа с код.",
          },
        ],
        stackMatrix: [
          {
            category: "GUI двигател",
            items: ["PySide6 (Qt for Python)", "Хардуерно ускорение"],
          },
          { category: "Синтактичен маркер", items: ["Pygments"] },
          {
            category: "Машинно обучение",
            items: ["Локален LLM", "Инлайн автодовършване"],
          },
          {
            category: "Операционна система",
            items: ["Разпознаване на ОС тема", "Сериализация на сесии"],
          },
        ],
        metrics: [
          { label: "GUI среда", value: "Нативен Qt (PySide6)" },
          { label: "Оцветяване", value: "Pygments" },
          { label: "Автодовършване", value: "Опционален локален LLM" },
        ],
        architectureLayers: [
          {
            name: "Редакторски изглед",
            detail: "PySide6 QPlainTextEdit със собствен синтактичен маркер",
          },
          {
            name: "Лексикален анализ",
            detail: "Pygments токенизация с висококонтрастна цветова схема",
          },
          {
            name: "Слой за изводи",
            detail:
              "Опционално локално LLM автодовършване при редактиране на код",
          },
        ],
      },
    },
    "applied-data-science": {
      subtitle:
        "Проучвателен анализ на данни (EDA) с Python — Jupyter Notebook",
      description:
        "Проучвателен анализ на реални набори от данни за цени на недвижими имоти, продажби на дребно и представяне на студенти.",
      features: [
        "Проведен проучвателен анализ на данни (EDA) върху набори за недвижими имоти, търговия на дребно и студентски резултати.",
        "Почистване и трансформация на сурови данни; изграждане на визуализации за откриване на тенденции и корелации.",
        "Структурирани Jupyter Notebook доклади с възпроизводим анализ и документирани изводи.",
      ],
      architecture: [
        "Анализ: почистване и трансформация на данни с pandas",
        "Визуализация: seaborn графики за тенденции и кореляции",
        "Резултат: структурирани Jupyter Notebook доклади с изводи",
      ],
      note: "pandas, seaborn, възпроизводим анализ с документирани изводи.",
      dossier: {
        problemStatement:
          "Многомерните реални данни в икономиката на жилищата, търговията на дребно и образованието съдържат скрити зависимости и нелинейни ефекти, които изискват систематичен проучвателен анализ.",
        scopeObjectives: [
          "Проучвателен анализ на три реални набора от данни: недвижими имоти, продажби на дребно, студентско представяне.",
          "Почистване и трансформация на суровите данни преди визуализация.",
          "Графики и обобщения, които разкриват основни тенденции и корелации.",
          "Възпроизводими Jupyter Notebook доклади с документирани заключения.",
        ],
        keyDecisions: [
          {
            title: "Векторизирани операции с NumPy/Pandas",
            reasoning:
              "Използвани са векторизирани матрични изчисления за висока производителност без бавни Python цикли.",
          },
          {
            title: "Статистически визуализации с висока плътност",
            reasoning:
              "Приложени са Seaborn и Matplotlib за топлинни карти, разпределения на плътността и регресионни линии.",
          },
          {
            title: "Фокус върху изводите пред общите графики",
            reasoning:
              "Докладите са структурирани около проверими заключения и изолиране на ключовите социално-икономически фактори.",
          },
        ],
        stackMatrix: [
          { category: "Анализ на данни", items: ["Python", "pandas", "numpy"] },
          { category: "Визуализация", items: ["seaborn", "matplotlib"] },
          {
            category: "Среда",
            items: ["Jupyter Notebook", "Interactive Python"],
          },
        ],
        metrics: [
          { label: "Данни", value: "Имоти · Ритейл · Студенти" },
          { label: "Инструменти", value: "pandas · seaborn" },
          { label: "Резултат", value: "Jupyter доклади" },
        ],
        architectureLayers: [
          {
            name: "Зареждане и почистване",
            detail:
              "Нормализация на pandas таблици, обработка на отклонения и липсващи стойности",
          },
          {
            name: "Статистическо моделиране",
            detail:
              "Векторизирани агрегации, квантилни разрези и корелационни матрици",
          },
          {
            name: "Визуализация",
            detail: "Корелационни топлинни карти и хистограми със Seaborn",
          },
        ],
      },
    },
    hotspotguard: {
      subtitle: "macOS Wi-Fi watchdog — изграден с AI агенти (Swift)",
      description:
        "Практика в агентната разработка: macOS приложение в меню лентата, което следи реалната интернет свързаност и презакача Wi-Fi хотспотове — специфицирано и ръководено от мен, реализирано с AI агенти.",
      features: [
        "Агентна разработка: първо архитектура и спецификации, код чрез AI агенти, пълен преглед и верификация от мен.",
        "Икона за статус в меню лентата: зелена (онлайн), жълта (свързване), червена (офлайн), сива (пауза).",
        "Реални TCP handshake проверки — улавя captive портали и увиснали връзки, които изглеждат активни.",
        "Набор от 192 автоматични теста, SwiftLint / Periphery / jscpd проверки и GitHub Actions CI.",
      ],
      architecture: [
        "Процес: спецификация → имплементация с агент → преглед → тестове → документация",
        "Ядро: Swift пакет с протоколни мениджъри без UI зависимости",
        "Доставка: скриптово изграден .app пакет с версионирани релийзи",
      ],
      dossier: {
        problemStatement:
          "Вграденият мрежов индикатор на macOS често отчита активна Wi-Fi връзка дори когато captive портали, DHCP блокажи или разпадане на мобилен хотспот спират целия трафик. Разработчиците губят активни сесии без незабавен сигнал или автоматично възстановяване.",
        scopeObjectives: [
          "Автономен macOS watchdog в меню лентата, следящ реалната интернет свързаност с нулево натоварване на CPU и паметта.",
          "Активни TCP handshake проверки към известни сървъри за откриване на тихи прекъсвания и captive портали.",
          "Автоматично рестартиране на Wi-Fi и повторно свързване чрез CoreWLAN и macOS Keychain.",
          "Стриктен агентен инженерен процес: spec-first архитектура, AI генериране на код, ръчен одит, 192 теста и CI автоматизация.",
        ],
        keyDecisions: [
          {
            title: "Активен TCP Handshake вместо ICMP Ping",
            reasoning:
              "Имплементирани са неблокиращи TCP връзки на стандартни портове вместо ICMP пингове, за да се избегнат ограниченията на доставчиците и да се хващат captive портали веднага.",
          },
          {
            title: "Протоколно ядро без UI зависимости",
            reasoning:
              "Логиката за мрежов мониторинг и повторно свързване е изолирана в отделен Swift пакет, позволяващ 192 автоматични проверки без стартиране на SwiftUI.",
          },
          {
            title: "Методология за агентна разработка",
            reasoning:
              "Дефинирани са формални архитектурни договори, имплементацията е делегирана на AI агенти, а качеството е гарантирано чрез SwiftLint, Periphery и GitHub Actions CI.",
          },
        ],
        stackMatrix: [
          {
            category: "Език и Интерфейс",
            items: ["Swift 5.9+", "SwiftUI Menu Bar", "Swift Package Manager"],
          },
          {
            category: "macOS Рамки",
            items: ["CoreWLAN", "SystemConfiguration", "Keychain Services"],
          },
          {
            category: "Качество и Тестване",
            items: [
              "192 автотеста",
              "SwiftLint",
              "Periphery",
              "GitHub Actions",
            ],
          },
          {
            category: "Инженерен модел",
            items: [
              "Агентна разработка",
              "Протоколно-ориентиран дизайн",
              "Минимален разход на памет",
            ],
          },
        ],
        metrics: [
          { label: "Памет", value: "< 15MB нулев разход" },
          { label: "Верификация", value: "192 автоматични проверки" },
          { label: "Платформа", value: "Нативна macOS меню лента" },
        ],
        architectureLayers: [
          {
            name: "Визуализация на статус",
            detail:
              "Лек SwiftUI елемент в меню лентата, отразяващ състоянието на връзката (зелено/жълто/червено/сиво)",
          },
          {
            name: "Двигател за достъпност",
            detail:
              "Фонов watchdog, извършващ периодични асинхронни TCP handshake проверки",
          },
          {
            name: "Мениджър за презакачане",
            detail:
              "CoreWLAN интеграция за рестартиране на интерфейса и свързване към познат хотспот",
          },
          {
            name: "Сигурност и Пароли",
            detail:
              "Интеграция с macOS Keychain Services за сигурно извличане на данни за достъп",
          },
        ],
      },
    },
  },
};

export function getLocalizedProjects(locale: Locale): Project[] {
  if (locale === "en") return projects;
  const dict = projectTranslations[locale];
  if (!dict) return projects;
  return projects.map((project) => {
    const localized = dict[project.slug];
    if (!localized) return project;
    return {
      ...project,
      ...localized,
    };
  });
}
