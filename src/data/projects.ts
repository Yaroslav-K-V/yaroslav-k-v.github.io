import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'meetbadi',
    title: 'meetbadi.com',
    subtitle: 'Production meeting platform — full-stack internship contribution',
    description: 'Live web platform I helped maintain and extend during my Grenergy internship: web app, Chrome extension, and Supabase backend.',
    categories: ['fullstack', 'ai'],
    badge: 'Live Service',
    features: [
      'Updated web app layouts and features, fixed bugs, and kept existing pages and tools running.',
      'Worked across the stack: TypeScript/JavaScript frontend and Chrome extension, Supabase/PostgreSQL data views.',
      'Helped connect third-party services (OpenRouter, Stripe, Resend) via REST APIs with authentication and error handling.',
      'Debugged data and integration issues reported by users; wrote docs for handover.'
    ],
    architecture: [
      'Frontend: web app + Chrome extension (TypeScript/JavaScript)',
      'Backend & data: Supabase / PostgreSQL dashboards and tooling views',
      'Integrations: REST APIs (OpenRouter, Stripe, Resend)'
    ],
    note: 'Internship contribution at Grenergy LLC (Jun–Aug 2026) — not a solo project.',
    tech: ['TypeScript', 'JavaScript', 'React', 'Supabase', 'PostgreSQL', 'REST APIs', 'OpenRouter'],
    url: 'https://meetbadi.com',
    video: '/meetbadi-tour.mp4',
    image: '/meetbadi-poster.jpg',
    dossier: {
      problemStatement:
        'Modern video meetings and async team collaboration produce high volumes of conversational data that are easily lost or siloed. Teams require an end-to-end platform with browser-integrated context capture, reliable transcript and AI note generation, secure multi-tenant storage, and seamless billing with transactional notifications.',
      scopeObjectives: [
        'Production web platform & Chrome extension (MV3) development during internship at Grenergy LLC.',
        'End-to-end full-stack feature delivery using TypeScript, React, and Supabase / PostgreSQL.',
        'Resilient integrations with external services: OpenRouter (multi-LLM orchestration), Stripe (subscriptions), and Resend (transactional email).',
        'Active bug triage, live data view optimizations, and engineering handover documentation.'
      ],
      keyDecisions: [
        {
          title: 'Manifest V3 Chrome Extension',
          reasoning:
            'Architected background service workers and content scripts adhering to Chrome MV3 security constraints, enabling low-overhead tab context and meeting capture.'
        },
        {
          title: 'Supabase & PostgreSQL Row Level Security (RLS)',
          reasoning:
            'Enforced strict data isolation and audit controls directly in the database engine via declarative RLS policies across organization workspaces.'
        },
        {
          title: 'Multi-LLM Gateway via OpenRouter',
          reasoning:
            'Standardized model interactions through a resilient gateway, allowing dynamic routing between Claude, GPT, and open-source models with automated retries.'
        }
      ],
      stackMatrix: [
        { category: 'Frontend & Extension', items: ['TypeScript', 'JavaScript', 'React', 'Chrome MV3 Extension'] },
        { category: 'Backend & Database', items: ['Supabase', 'PostgreSQL', 'Row-Level Security (RLS)', 'Edge Functions'] },
        { category: 'Cloud Integrations', items: ['OpenRouter (LLMs)', 'Stripe Billing', 'Resend Email'] },
        { category: 'Engineering Practices', items: ['Production Bug Triage', 'REST API Design', 'Handover Documentation'] }
      ],
      metrics: [
        { label: 'Status', value: 'Production live service' },
        { label: 'Architecture', value: 'Web app + Chrome MV3' },
        { label: 'Backend', value: 'Supabase / PostgreSQL' }
      ],
      architectureLayers: [
        { name: 'Client & Extension', detail: 'React web application paired with Chrome MV3 extension for context capture' },
        { name: 'API & Orchestration', detail: 'Edge functions and REST gateways routing requests with robust error boundaries' },
        { name: 'Data & Auth Layer', detail: 'Supabase Auth with PostgreSQL tables protected by Row Level Security policies' },
        { name: 'External Integrations', detail: 'Secure connectors to OpenRouter, Stripe webhooks, and Resend transactional email' }
      ]
    }
  },
  {
    id: 2,
    slug: 'unitra',
    title: 'Unitra',
    subtitle: 'AI-powered Python Unit Test Generator — Desktop App',
    description: 'AI-powered desktop application that automatically generates Python unit tests from source code.',
    categories: ['ai', 'desktop'],
    badge: 'Open Source',
    features: [
      'Built an AST-based analysis engine to extract function signatures, docstrings, and type hints for structured prompt construction.',
      'Designed the LLM integration layer with prompt engineering to produce syntactically valid, runnable pytest test cases.',
      'Packaged as a desktop app using pywebview with a Flask backend and a custom HTML/CSS/JS frontend.'
    ],
    architecture: [
      'Analysis: Python AST parsing of function signatures, docstrings, and type hints',
      'AI layer: LLM APIs with structured prompt construction for pytest generation',
      'Desktop shell: Flask backend + custom HTML/CSS/JS frontend via pywebview'
    ],
    tech: ['Python', 'Flask', 'pywebview', 'HTML', 'CSS', 'JavaScript', 'LLM APIs', 'pytest'],
    github: 'https://github.com/Yaroslav-K-V/Unitra',
    dossier: {
      problemStatement:
        'Writing comprehensive unit test suites for complex Python codebases is repetitive, time-intensive, and prone to blind spots in branch coverage. Existing test generation tools often require heavy cloud dependencies or struggle with project-specific function contracts.',
      scopeObjectives: [
        'Deterministic static AST analysis without executing untrusted code.',
        'Automated generation of robust pytest test cases for single functions or entire modules.',
        'Native desktop application interface with live test runner output and history tracking.',
        'Zero Node.js runtime overhead by leveraging Python pywebview.'
      ],
      keyDecisions: [
        {
          title: 'Python AST Parser vs Regex Matching',
          reasoning:
            'Employed Python’s native ast module to deterministically walk the Abstract Syntax Tree, accurately extracting function signatures, type annotations, and control branches.'
        },
        {
          title: 'pywebview + Flask vs Electron',
          reasoning:
            'Served the modern HTML/JS interface from a local Flask server rendered in a native pywebview window, eliminating Node.js runtime bloat and reducing distribution complexity.'
        },
        {
          title: 'LLM Integration Layer',
          reasoning:
            'Supplied the LLM with parsed AST signatures and docstrings, allowing prompt-engineered generation of syntactically valid, runnable pytest suites.'
        }
      ],
      stackMatrix: [
        { category: 'Core Analysis', items: ['Python 3.10+', 'AST Module', 'Static Analysis Engine'] },
        { category: 'Desktop GUI', items: ['Flask', 'pywebview', 'HTML5/CSS3', 'JavaScript'] },
        { category: 'Test Automation', items: ['pytest', 'Subprocess Runner', 'Live Output Stream'] },
        { category: 'AI Layer', items: ['LLM APIs', 'Prompt Engineering'] }
      ],
      metrics: [
        { label: 'Analysis', value: 'AST, no code execution' },
        { label: 'Test runner', value: 'pytest subprocess' },
        { label: 'Desktop shell', value: 'pywebview + Flask' }
      ],
      architectureLayers: [
        { name: 'Modular Separation', detail: 'routes / core logic / agent / UI' },
        { name: 'Desktop Host', detail: 'Flask serves the frontend inside a native desktop window via pywebview' },
        { name: 'AI Layer', detail: 'LLM integration layer with prompt engineering for pytest generation' },
        { name: 'Test Runner', detail: 'Subprocess-based pytest runner streaming stdout/stderr directly into GUI' }
      ]
    }
  },
  {
    id: 3,
    slug: 'pyglow',
    title: 'PyGlow',
    subtitle: 'Minimal Python Code Editor with Local AI Autocomplete',
    description: 'Lightweight Python code editor built from scratch with syntax highlighting, search/replace, auto-indent, and multiple themes.',
    categories: ['desktop', 'ai'],
    badge: 'Open Source',
    features: [
      'Lightweight Python code editor built from scratch with syntax highlighting (Pygments), search/replace, auto-indent, and multiple themes.',
      'Integrated optional local LLM-based code autocomplete triggered inline while editing.',
      'Designed a modular plugin-style architecture with persistent user settings across sessions.'
    ],
    architecture: [
      'Editor: Python + PySide6 with Pygments syntax highlighting',
      'AI layer: optional local LLM-based inline autocomplete',
      'Architecture: modular plugin-style with persistent user settings'
    ],
    tech: ['Python', 'PySide6', 'Pygments', 'Local LLM'],
    github: 'https://github.com/Yaroslav-K-V/PyGlow',
    image: '/pyglow-poster.jpg',
    video: '/pyglow-demo.mp4',
    dossier: {
      problemStatement:
        'Modern code editors (VS Code, JetBrains) consume substantial CPU and RAM, creating noticeable lag and battery drain for quick Python scripts or on low-spec hardware. Developers need a lightweight, instantaneous editor with smart features and zero telemetry.',
      scopeObjectives: [
        'Fast launch and low memory footprint for quick edits and low-spec hardware.',
        'Syntax highlighting with customizable theme engine and automatic OS theme detection.',
        'Smart editing ergonomics: auto-indent, bracket matching, line duplication, drag & drop.',
        'Optional local AI autocomplete that keeps code on the machine.'
      ],
      keyDecisions: [
        {
          title: 'PySide6 (Qt) vs Web-Based Frameworks',
          reasoning:
            'Selected Qt for Python for hardware-accelerated text rendering, native OS integration, and responsive keystroke latency.'
        },
        {
          title: 'Pygments Tokenizer vs Language Servers',
          reasoning:
            'Utilized Pygments for fast, lightweight lexical tokenization, avoiding the heavy memory footprint of full language server protocols for simple edits.'
        },
        {
          title: 'Local LLM Autocomplete',
          reasoning:
            'Embedded optional local LLM-based inline autocomplete for private code completion while editing.'
        }
      ],
      stackMatrix: [
        { category: 'GUI Engine', items: ['PySide6 (Qt for Python)', 'Hardware Accelerated'] },
        { category: 'Syntax Highlighter', items: ['Pygments'] },
        { category: 'Machine Learning', items: ['Local LLM', 'Inline Autocomplete'] },
        { category: 'Operating System', items: ['OS Theme Detection', 'Session Serialization'] }
      ],
      metrics: [
        { label: 'GUI Runtime', value: 'Native Qt (PySide6)' },
        { label: 'Highlighting', value: 'Pygments' },
        { label: 'Autocomplete', value: 'Optional local LLM' }
      ],
      architectureLayers: [
        { name: 'Editor Viewport', detail: 'PySide6 QPlainTextEdit with custom syntax highlighter' },
        { name: 'Lexical Analysis', detail: 'Pygments tokenization with custom high-contrast color scheme' },
        { name: 'Inference Layer', detail: 'Optional local LLM autocomplete triggered inline while editing' }
      ]
    }
  },
  {
    id: 4,
    slug: 'applied-data-science',
    title: 'Applied Data Science',
    subtitle: 'Exploratory Data Analysis with Python — Jupyter Notebook',
    description: 'Conducted exploratory data analysis on real estate pricing, retail sales, and student performance datasets.',
    categories: ['ai'],
    badge: 'Open Source',
    features: [
      'Conducted exploratory data analysis on real estate pricing, retail sales, and student performance datasets.',
      'Cleaned and transformed raw datasets; built visualizations to surface key trends and correlations.',
      'Delivered structured Jupyter Notebook reports with reproducible analysis and documented findings.'
    ],
    architecture: [
      'Analysis: pandas data cleaning and transformation',
      'Visualization: seaborn charts for trends and correlations',
      'Delivery: structured Jupyter Notebook reports with documented findings'
    ],
    note: 'pandas, seaborn, reproducible analysis with documented findings.',
    tech: ['Python', 'pandas', 'seaborn', 'Jupyter Notebook'],
    github: 'https://github.com/Yaroslav-K-V/applied-data-science',
    dossier: {
      problemStatement:
        'Multidimensional real-world datasets in housing economics, retail transactions, and student career paths contain hidden relationships, non-linear pricing effects, and operational bottlenecks that require rigorous exploratory data analysis to surface.',
      scopeObjectives: [
        'Exploratory analysis of three real-world datasets: real estate pricing, retail sales, student performance.',
        'Cleaning and transformation of raw data before visualization.',
        'Charts and summaries that surface trends and correlations.',
        'Reproducible Jupyter Notebook reports with documented findings.'
      ],
      keyDecisions: [
        {
          title: 'Vectorized NumPy/Pandas Operations',
          reasoning:
            'Leveraged vectorized matrix computations to ensure high performance on large datasets without iterative Python loop bottlenecks.'
        },
        {
          title: 'High-Density Statistical Visualizations',
          reasoning:
            'Utilized Seaborn and Matplotlib for publication-grade heatmaps, density plots, and regression lines engineered for clear interpretation.'
        },
        {
          title: 'Focus on Insights over Generic Plotting',
          reasoning:
            'Structured the notebook to extract verifiable conclusions, isolating socioeconomic and commercial drivers.'
        }
      ],
      stackMatrix: [
        { category: 'Data Analysis', items: ['Python', 'pandas', 'numpy'] },
        { category: 'Visualization', items: ['seaborn', 'matplotlib'] },
        { category: 'Environment', items: ['Jupyter Notebook', 'Interactive Python'] }
      ],
      metrics: [
        { label: 'Datasets', value: 'Real estate · Retail · Students' },
        { label: 'Tools', value: 'pandas · seaborn' },
        { label: 'Output', value: 'Jupyter reports' }
      ],
      architectureLayers: [
        { name: 'Ingestion & Cleaning', detail: 'Pandas data frame normalization, outlier handling, and missing data imputation' },
        { name: 'Statistical Modeling', detail: 'Vectorized aggregations, quantile cuts, and correlation matrices' },
        { name: 'Visualization', detail: 'Seaborn correlation heatmaps and distribution histograms' }
      ]
    }
  },
  {
    id: 5,
    slug: 'hotspotguard',
    title: 'HotspotGuard',
    subtitle: 'macOS Wi-Fi watchdog — built with AI agents (Swift)',
    description: 'An exercise in agentic development: a macOS menu bar app that monitors internet reachability and reconnects Wi-Fi hotspots — specced and directed by me, implemented with AI coding agents.',
    categories: ['desktop'],
    badge: 'Open Source',
    features: [
      'Built agentically: architecture and specs first, code via AI agents, everything reviewed and verified by me.',
      'Menu bar status icon: green (online), yellow (reconnecting), red (offline), gray (paused).',
      'Real TCP handshake probing — catches captive portals and dead uplinks that look “connected”.',
      'Self-test suite (192 checks), SwiftLint / Periphery / jscpd gates, and GitHub Actions CI — same quality bar as hand-written code.'
    ],
    architecture: [
      'Process: spec → agent implementation → review → tests → docs',
      'Core: Swift package with protocol-based managers, no UI dependencies in core',
      'Delivery: script-built .app bundle with versioned tag releases'
    ],
    tech: ['Swift', 'SwiftUI', 'CoreWLAN', 'Keychain', 'SwiftPM', 'GitHub Actions'],
    github: 'https://github.com/Yaroslav-K-V/hotspot-guard',
    image: '/hotspot-poster.jpg',
    video: '/hotspot-demo.mp4',
    dossier: {
      problemStatement:
        'macOS built-in network status frequently reports active Wi-Fi association even when captive portals, DHCP stalls, or cellular hotspot drops silently halt all traffic. Developers and remote engineers suffer broken long-running commands and stale sessions without immediate visual alerts or automated recovery.',
      scopeObjectives: [
        'Autonomous macOS menu bar watchdog monitoring true end-to-end internet reachability with zero perceptible CPU or memory overhead.',
        'Active TCP handshake probing against known endpoints to detect silent gateway drops and captive portals.',
        'Automatic Wi-Fi cycle and reconnection routines leveraging CoreWLAN and macOS Keychain for credential storage.',
        'Rigorous agentic engineering pipeline: spec-first architecture, AI-agent code generation, manual review, 192 self-tests, and CI automation.'
      ],
      keyDecisions: [
        {
          title: 'Active TCP Handshake vs ICMP Ping',
          reasoning:
            'Implemented non-blocking TCP handshakes on standard ports rather than ICMP pings to avoid ISP rate-limiting and catch portal captive redirects immediately.'
        },
        {
          title: 'Protocol-Driven Core with Zero UI Coupling',
          reasoning:
            'Isolated the network monitor and reconnection logic into a standalone Swift package, enabling comprehensive headless verification (192 checks) without running SwiftUI.'
        },
        {
          title: 'Agentic Development Methodology',
          reasoning:
            'Defined formal architecture contracts and constraints, delegated implementation to AI coding agents, and enforced quality via SwiftLint, Periphery, and GitHub Actions CI.'
        }
      ],
      stackMatrix: [
        { category: 'Language & UI', items: ['Swift 5.9+', 'SwiftUI Menu Bar', 'Swift Package Manager'] },
        { category: 'macOS Frameworks', items: ['CoreWLAN', 'SystemConfiguration', 'Keychain Services'] },
        { category: 'Quality & Testing', items: ['192 Self-Tests', 'SwiftLint', 'Periphery', 'GitHub Actions'] },
        { category: 'Engineering Pattern', items: ['Agentic Development', 'Protocol-Oriented Design', 'Zero Memory Overhead'] }
      ],
      metrics: [
        { label: 'Memory Footprint', value: '< 15MB zero overhead' },
        { label: 'Verification', value: '192 automated checks' },
        { label: 'Platform', value: 'macOS native menu bar' }
      ],
      architectureLayers: [
        { name: 'Status Presentation', detail: 'Lightweight SwiftUI menu bar item reflecting live connection states (green/yellow/red/gray)' },
        { name: 'Reachability Engine', detail: 'Background watchdog performing periodic asynchronous TCP handshake verification' },
        { name: 'Reconnection Manager', detail: 'CoreWLAN integration orchestrating interface cycle and known hotspot association' },
        { name: 'Security & Credentials', detail: 'macOS Keychain Services integration for safe hotspot credential retrieval' }
      ]
    }
  }
];
