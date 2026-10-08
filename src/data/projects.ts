import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 8,
    title: 'meetbadi.com',
    subtitle: 'Live Meeting Transcription, Translation, and AI Summary Service',
    description: 'AI-powered service providing live transcription, translation, and automated summaries for Google Meet, Zoom, and Teams.',
    categories: ['ai', 'fullstack', 'desktop'],
    badge: 'Live Service',
    features: [
      'Website and Chrome extension frontend built with TypeScript and React',
      'Desktop application layer developed with Go and Wails',
      'Backend services, authentication, and database architecture with Supabase',
      'LLM integration via OpenRouter for real-time translation and meeting summaries',
      'Core technical contributor to product features and architecture decisions'
    ],
    architecture: [
      'Frontend: React + TypeScript Chrome extension & web app',
      'Desktop client: Go runtime paired with Wails for native OS bindings',
      'Backend & Storage: Supabase (PostgreSQL, Auth, Realtime)',
      'AI Pipeline: OpenRouter multi-model LLM inference for low-latency translation and structured meeting minutes'
    ],
    tech: ['TypeScript', 'React', 'Go', 'Wails', 'Supabase', 'OpenRouter'],
    url: 'https://meetbadi.com'
  },
  {
    id: 4,
    title: 'Unitra',
    subtitle: 'AI-powered Python Unit Test Generator — Fullstack Desktop App',
    description: 'Desktop application for generating and running Python unit tests with a web-based UI embedded in a native window.',
    categories: ['ai', 'desktop'],
    badge: 'Open Source',
    features: [
      'Fullstack architecture: Flask backend + HTML/CSS/JavaScript frontend via pywebview',
      'AST-based parsing for analyzing Python source code structure',
      'Automatic test generation for individual functions or entire projects',
      'AI-assisted mode using LangChain + OpenAI-compatible API',
      'Built-in pytest runner with real-time output displayed in UI',
      'Interactive UI with dark mode, keyboard shortcuts, and project history'
    ],
    architecture: [
      'Modular separation: routes / core logic / agent / UI',
      'Flask serves the frontend inside a native desktop window via pywebview',
      'LangChain agent handles AI-assisted test generation'
    ],
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'pywebview', 'pytest', 'LangChain'],
    github: 'https://github.com/Yaroslav-K-V/Unitra'
  },
  {
    id: 1,
    title: 'PyGlow',
    subtitle: 'Minimal Python Code Editor with Local AI Autocomplete',
    description: 'Lightweight desktop code editor focused on productivity and simplicity.',
    categories: ['desktop', 'ai'],
    badge: 'Open Source',
    features: [
      'Syntax highlighting using Pygments',
      'Smart editing: auto-indent, bracket matching, duplicate lines',
      'File handling: drag & drop, CLI opening, last session restore',
      'Theme system with dark/light mode and OS detection',
      'Optional local AI autocomplete using transformer models'
    ],
    tech: ['Python', 'PySide6', 'Pygments', 'Transformers'],
    github: 'https://github.com/Yaroslav-K-V/PyGlow'
  },
  {
    id: 7,
    title: 'Applied Data Science',
    subtitle: 'Exploratory Data Analysis with Python — Jupyter Notebook',
    description: 'Collection of EDA exercises across multiple datasets, focusing on data interpretation and visualization.',
    categories: ['ai'],
    badge: 'Open Source',
    features: [
      'London Housing Dataset — price per m² and per room, neighborhood comparison (Kensington vs Chelsea), market segmentation (budget / mid / premium)',
      'Retail Business Dataset (10K orders) — revenue, profit margins, ROI, regional performance, customer segmentation, time series trends',
      'Computer Science Students Dataset — GPA vs programming skills (Python, SQL, Java), gender-based distribution, domain to career pathway analysis'
    ],
    note: 'seaborn, matplotlib heatmaps, distributions, trends. Focus on extracting insights, not just plotting.',
    tech: ['Python', 'pandas', 'numpy', 'matplotlib', 'seaborn'],
    github: 'https://github.com/Yaroslav-K-V/applied-data-science'
  },
  {
    id: 2,
    title: 'Car Managing Book',
    subtitle: 'Desktop Application for Vehicle Maintenance Tracking',
    description: 'Windows desktop app for managing and analyzing car maintenance history.',
    categories: ['desktop'],
    badge: 'Open Source',
    features: [
      'Full CRUD system for maintenance records',
      'Advanced filtering by date, mileage, cost, and service type',
      'Cost tracking with aggregated statistics',
      'Input validation (email, phone, structured fields)',
      'Persistent local storage'
    ],
    architecture: [
      'MVVM (Model-View-ViewModel)',
      'Repository pattern for data access'
    ],
    tech: ['C#', '.NET', 'WinForms'],
    github: 'https://github.com/Yaroslav-K-V/Car-Managing-Book'
  },
  {
    id: 9,
    title: 'Expense Tracker',
    subtitle: 'Personal Expense Tracker — Python & FastAPI Backend',
    description: 'Early-stage personal expense tracker backend built with Python and FastAPI.',
    categories: ['fullstack'],
    badge: 'In Progress',
    features: [
      'RESTful API for tracking personal expenses, income, and categories',
      'Request validation and serialization using FastAPI and Pydantic',
      'Lightweight backend architecture for personal financial tracking'
    ],
    tech: ['Python', 'FastAPI']
  }
];
