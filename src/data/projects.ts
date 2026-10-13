import { Project } from '../types';

export const projects: Project[] = [
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
    github: 'https://github.com/Yaroslav-K-V/PyGlow'
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
  }
];
