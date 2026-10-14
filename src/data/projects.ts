import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 8,
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
    url: 'https://meetbadi.com'
  },
  {
    id: 4,
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
    github: 'https://github.com/Yaroslav-K-V/Unitra'
  },
  {
    id: 1,
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
    image: 'https://raw.githubusercontent.com/Yaroslav-K-V/PyGlow/main/assets/gif/demo.gif'
  },
  {
    id: 7,
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
    github: 'https://github.com/Yaroslav-K-V/applied-data-science'
  },
  {
    id: 3,
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
    note: 'Agentic-build exercise, not my core stack: I can walk through every design decision, but Swift isn’t what I’d claim in an interview.',
    tech: ['Swift', 'SwiftUI', 'CoreWLAN', 'Keychain', 'SwiftPM', 'GitHub Actions'],
    github: 'https://github.com/Yaroslav-K-V/hotspot-guard'
  }
];
