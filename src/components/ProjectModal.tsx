import React, { useEffect, useState } from 'react';
import { Project, ProjectBadge } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Layers,
  CheckCircle2,
  Cpu,
  Terminal,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Boxes
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type ModalTab = 'all' | 'overview' | 'architecture' | 'tech' | 'metrics';

interface ProjectDossierData {
  problemStatement: string;
  scopeObjectives: string[];
  keyDecisions: { title: string; reasoning: string }[];
  stackMatrix: { category: string; items: string[] }[];
  metrics: { label: string; value: string }[];
  architectureLayers: { name: string; detail: string }[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('all');

  // Reset tab to 'all' whenever a new project is selected
  useEffect(() => {
    if (project) {
      setActiveTab('all');
    }
  }, [project]);

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const getStatusBadge = (badge: ProjectBadge) => {
    switch (badge) {
      case 'Live Service':
        return {
          label: 'PRODUCTION',
          className:
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dotClass: 'bg-emerald-500'
        };
      case 'In Progress':
        return {
          label: 'ACTIVE DEVELOPMENT',
          className:
            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          dotClass: 'bg-amber-500'
        };
      case 'Open Source':
        return {
          label: 'OPEN SOURCE',
          className:
            'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
          dotClass: 'bg-zinc-400'
        };
      default:
        return {
          label: String(badge).toUpperCase(),
          className:
            'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
          dotClass: 'bg-zinc-400'
        };
    }
  };

  const getProjectDossier = (p: Project): ProjectDossierData => {
    if (p.id === 8) {
      // meetbadi.com
      return {
        problemStatement:
          'Virtual meetings across Google Meet, Zoom, and Microsoft Teams generate extensive verbal conversations without persistent, real-time structured retention or immediate cross-language transcription. Meeting participants often miss action items or face language comprehension hurdles.',
        scopeObjectives: [
          'Sub-200ms real-time audio capture and streaming transcription pipeline.',
          'Unified system spanning browser extension (DOM injection) and native desktop client (Wails + Go).',
          'Secure PostgreSQL persistence with Row-Level Security for authenticated meeting participants.',
          'Low-latency AI inference via OpenRouter streaming for instantaneous multilingual summaries.'
        ],
        keyDecisions: [
          {
            title: 'Go + Wails Desktop Layer vs Electron',
            reasoning:
              'Selected Go paired with Wails over Electron to cut idle memory consumption by ~80% (<60MB vs 300MB+ in Electron) while retaining direct low-level OS audio access.'
          },
          {
            title: 'Supabase Realtime vs Custom WebSocket Fleet',
            reasoning:
              'Utilized Supabase PostgreSQL real-time replication channels to syndicate transcript deltas across clients with zero infrastructure maintenance overhead.'
          },
          {
            title: 'Multi-Model Fallback via OpenRouter',
            reasoning:
              'Architected the AI pipeline on OpenRouter to achieve dynamic model routing (GPT-4o, Claude 3.5, Llama 3) ensuring low-latency streaming and zero service downtime.'
          }
        ],
        stackMatrix: [
          { category: 'Frontend / Client', items: ['TypeScript', 'React', 'Chrome Extension MV3'] },
          { category: 'Desktop Engine', items: ['Go 1.22+', 'Wails v2', 'Native OS Bindings'] },
          { category: 'Backend & Database', items: ['Supabase', 'PostgreSQL', 'Realtime WebSockets', 'Auth'] },
          { category: 'AI Pipeline', items: ['OpenRouter', 'Streaming LLM APIs', 'Multi-Model Routing'] }
        ],
        metrics: [
          { label: 'Streaming Latency', value: '<200ms TTFT' },
          { label: 'Desktop Memory Footprint', value: '<60 MB' },
          { label: 'Conferencing Support', value: 'Meet · Zoom · Teams' }
        ],
        architectureLayers: [
          { name: 'Client Layer', detail: 'React + TypeScript Chrome extension & web dashboard' },
          { name: 'Desktop Client', detail: 'Go runtime paired with Wails for native OS bindings' },
          { name: 'Backend & Storage', detail: 'Supabase (PostgreSQL, Auth, Realtime channels)' },
          { name: 'AI Pipeline', detail: 'OpenRouter multi-model LLM inference for low-latency translation and structured meeting minutes' }
        ]
      };
    }

    if (p.id === 4) {
      // Unitra
      return {
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
            title: 'LangChain AI Agent Integration',
            reasoning:
              'Supplied the LLM with parsed AST signatures and docstrings, allowing the agent to generate idiomatic, fixture-driven pytest suites rather than generic hallucinations.'
          }
        ],
        stackMatrix: [
          { category: 'Core Analysis', items: ['Python 3.10+', 'AST Module', 'Static Analysis Engine'] },
          { category: 'Desktop GUI', items: ['Flask', 'pywebview', 'HTML5/CSS3', 'JavaScript'] },
          { category: 'Test Automation', items: ['pytest', 'Subprocess Runner', 'Live Output Stream'] },
          { category: 'AI Layer', items: ['LangChain', 'OpenAI-Compatible APIs'] }
        ],
        metrics: [
          { label: 'AST Traversal', value: '100% Offline' },
          { label: 'Test Execution', value: 'Live Pytest Stream' },
          { label: 'Application Shell', value: 'pywebview (No Node)' }
        ],
        architectureLayers: [
          { name: 'Modular Separation', detail: 'routes / core logic / agent / UI' },
          { name: 'Desktop Host', detail: 'Flask serves the frontend inside a native desktop window via pywebview' },
          { name: 'AI Agent', detail: 'LangChain agent handles AI-assisted test generation' },
          { name: 'Test Runner', detail: 'Subprocess-based pytest runner streaming stdout/stderr directly into GUI' }
        ]
      };
    }

    if (p.id === 1) {
      // PyGlow
      return {
        problemStatement:
          'Modern code editors (VS Code, JetBrains) consume substantial CPU and RAM, creating noticeable lag and battery drain for quick Python scripts or on low-spec hardware. Developers need a lightweight, instantaneous editor with smart features and zero telemetry.',
        scopeObjectives: [
          'Sub-second application launch time and minimal resident memory usage (<80MB).',
          'Syntax highlighting with customizable theme engine and automatic OS theme detection.',
          'Smart editing ergonomics: auto-indent, bracket matching, line duplication, drag & drop.',
          'Optional offline AI autocomplete without sending source code to third-party clouds.'
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
            title: 'Local Transformer Inference',
            reasoning:
              'Embedded local transformer models for private code completion, guaranteeing zero code telemetry and 100% air-gapped functionality.'
          }
        ],
        stackMatrix: [
          { category: 'GUI Engine', items: ['PySide6 (Qt for Python)', 'Hardware Accelerated'] },
          { category: 'Syntax Highlighter', items: ['Pygments'] },
          { category: 'Machine Learning', items: ['Transformers', 'PyTorch / ONNX Local Inference'] },
          { category: 'Operating System', items: ['OS Theme Detection', 'Session Serialization'] }
        ],
        metrics: [
          { label: 'Launch Latency', value: '<1.0s' },
          { label: 'Code Privacy', value: '100% Local / Zero Telemetry' },
          { label: 'GUI Runtime', value: 'Native Qt' }
        ],
        architectureLayers: [
          { name: 'Editor Viewport', detail: 'PySide6 QPlainTextEdit with custom syntax highlighter' },
          { name: 'Lexical Analysis', detail: 'Pygments tokenization with custom high-contrast color scheme' },
          { name: 'Inference Layer', detail: 'Background thread local transformer model for non-blocking autocomplete' }
        ]
      };
    }

    if (p.id === 7) {
      // Applied Data Science
      return {
        problemStatement:
          'Multidimensional real-world datasets in housing economics, retail transactions, and student career paths contain hidden relationships, non-linear pricing effects, and operational bottlenecks that require rigorous exploratory data analysis to surface.',
        scopeObjectives: [
          'Detailed statistical evaluation across three distinct domains (10,000+ commercial records).',
          'Price per m² and neighborhood premium modeling (London Housing dataset).',
          'Cohort analysis, profit margin distributions, and time series trends (Retail Commerce).',
          'Correlation analysis between academic GPA, programming skillsets, and career paths.'
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
          { label: 'Retail Dataset', value: '10,000+ Orders Analyzed' },
          { label: 'Domains', value: 'Housing · Retail · Education' },
          { label: 'Methodology', value: 'Multivariate EDA' }
        ],
        architectureLayers: [
          { name: 'Ingestion & Cleaning', detail: 'Pandas data frame normalization, outlier handling, and missing data imputation' },
          { name: 'Statistical Modeling', detail: 'Vectorized aggregations, quantile cuts, and correlation matrices' },
          { name: 'Visualization', detail: 'Seaborn correlation heatmaps and distribution histograms' }
        ]
      };
    }

    if (p.id === 2) {
      // Car Managing Book
      return {
        problemStatement:
          'Vehicle owners and fleet managers frequently struggle with fragmented physical maintenance receipts, missed service milestones, and lack of historical cost analytics, leading to costly vehicle breakdowns.',
        scopeObjectives: [
          'Type-safe desktop application for logging and analyzing automotive maintenance history.',
          'Multi-criteria filtering by service date range, mileage thresholds, cost, and service type.',
          'Cost aggregation and expense forecasting engine.',
          'Reliable persistent local storage with input validation.'
        ],
        keyDecisions: [
          {
            title: 'C# & .NET Platform',
            reasoning:
              'Selected .NET for strong static typing, compiled execution speed, and seamless integration with Windows desktop components.'
          },
          {
            title: 'MVVM Architectural Pattern',
            reasoning:
              'Separated View logic from ViewModel business logic and data models, establishing testable and maintainable code architecture.'
          },
          {
            title: 'Repository Data Pattern',
            reasoning:
              'Decoupled data access from domain logic using the Repository pattern to ensure consistent data transactions and persistence.'
          }
        ],
        stackMatrix: [
          { category: 'Platform', items: ['C#', '.NET Framework', 'WinForms'] },
          { category: 'Architecture', items: ['MVVM Pattern', 'Repository Pattern'] },
          { category: 'Storage', items: ['Persistent Local Storage', 'Structured Schema'] }
        ],
        metrics: [
          { label: 'Architecture', value: 'MVVM Pattern' },
          { label: 'Runtime', value: 'Type-Safe C# / .NET' },
          { label: 'Data Integrity', value: 'Strict Input Validation' }
        ],
        architectureLayers: [
          { name: 'View Layer', detail: 'WinForms UI with responsive controls and event dispatchers' },
          { name: 'ViewModel Layer', detail: 'Business logic, record aggregation, and state manipulation' },
          { name: 'Repository Layer', detail: 'Data persistence abstraction with structured validation' }
        ]
      };
    }

    // Default / Generic fallback (e.g. Expense Tracker)
    return {
      problemStatement: p.description,
      scopeObjectives: p.features,
      keyDecisions: [
        {
          title: 'Modular Systems Design',
          reasoning:
            'Strict separation of concerns between presentation, service layer, and data storage guarantees predictable maintenance.'
        },
        {
          title: 'Type Safety & Validation',
          reasoning:
            'Comprehensive type definitions and validation prevent runtime exceptions across component boundaries.'
        }
      ],
      stackMatrix: [
        { category: 'Technologies', items: p.tech }
      ],
      metrics: [
        { label: 'Status', value: p.badge },
        { label: 'Tech Stack', value: `${p.tech.length} Technologies` }
      ],
      architectureLayers: p.architecture
        ? p.architecture.map((a, i) => ({ name: `Layer 0${i + 1}`, detail: a }))
        : [
            { name: 'Core Architecture', detail: 'Structured modular codebase with isolated service responsibilities.' }
          ]
    };
  };

  const dossier = project ? getProjectDossier(project) : null;
  const status = project ? getStatusBadge(project.badge) : null;
  const specNumber = project ? `SYS-SPEC-${String(project.id).padStart(2, '0')}` : '';

  const tabs: { id: ModalTab; label: string }[] = [
    { id: 'all', label: 'All Spec Sections' },
    { id: 'overview', label: '01 // Overview & Problem' },
    { id: 'architecture', label: '02 // Architecture' },
    { id: 'tech', label: '03 // Tech Matrix' },
    { id: 'metrics', label: '04 // Results & Metrics' }
  ];

  return (
    <AnimatePresence>
      {project && dossier && status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with Deep Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
          />

          {/* Modal Window: Engineering Spec Sheet Dossier */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white/95 dark:bg-black/90 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top Dossier Metadata Ribbon */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-zinc-200/80 dark:border-white/10 bg-zinc-100/60 dark:bg-zinc-950/60 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-wider text-zinc-900 dark:text-white">
                {specNumber}
              </span>
              <span className="hidden sm:inline text-zinc-400">|</span>
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] ${status.className}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
                <span>{status.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-[11px] text-zinc-500 dark:text-zinc-400">
                REV: 2024.Q4 // SPEC VERIFIED
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-colors text-xs font-mono"
                aria-label="Close specification sheet"
              >
                <span>[ESC]</span>
                <X className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Dossier Header Info & Primary Actions */}
          <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-zinc-200/80 dark:border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  ENGINEERING SYSTEM DOSSIER
                </span>
                <h2
                  id="dossier-title"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5"
                >
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Action Triggers in Header */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    <span>Visit Live Service</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/60 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-medium hover:bg-zinc-200/80 dark:hover:bg-white/10 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {dossier.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 font-mono"
                >
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none border-t border-zinc-200/60 dark:border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all border ${
                    activeTab === tab.id
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white font-semibold'
                      : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dossier Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8">
            {/* SECTION 1: PROBLEM STATEMENT & ENGINEERING SCOPE */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Section 01 // Problem Statement & Engineering Scope</span>
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400">[SPEC-01]</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/5 space-y-3">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Core Engineering Challenge
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {dossier.problemStatement}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Architectural Objectives & Scope
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {dossier.scopeObjectives.map((obj, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 2: TECHNICAL ARCHITECTURE & KEY DECISIONS */}
            {(activeTab === 'all' || activeTab === 'architecture') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Section 02 // Technical Architecture & Key Decisions</span>
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400">[SPEC-02]</span>
                </div>

                {/* Layered System Topology */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Layered System Topology
                  </div>
                  <div className="space-y-2 font-mono">
                    {dossier.architectureLayers.map((layer, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                          <span className="text-emerald-500">[{String(lIdx + 1).padStart(2, '0')}]</span>
                          <span>{layer.name}</span>
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-400 font-sans sm:font-mono text-xs">
                          {layer.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Technical Decisions & Tradeoffs */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Key Technical Decisions & Trade-offs
                  </div>
                  <div className="space-y-2.5">
                    {dossier.keyDecisions.map((dec, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/5 space-y-1.5"
                      >
                        <div className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{dec.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-5">
                          {dec.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 3: TECH STACK MATRIX */}
            {(activeTab === 'all' || activeTab === 'tech') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Boxes className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Section 03 // Tech Stack Matrix</span>
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400">[SPEC-03]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dossier.stackMatrix.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200/80 dark:border-white/5 space-y-2.5"
                    >
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{group.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 4: RESULTS, CAPABILITIES & METRICS */}
            {(activeTab === 'all' || activeTab === 'metrics') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Section 04 // Verified Capabilities & Outcomes</span>
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400">[SPEC-04]</span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Verified Capabilities Checklist
                  </div>
                  <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                    {project.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="font-sans sm:font-mono leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.note && (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 font-mono text-xs space-y-1">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      SYSTEM ANNOTATION // NOTES
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 italic">{project.note}</p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Dossier Footer Toolbar */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-100/60 dark:bg-zinc-950/60 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>SPECIFICATION DOSSIER: COMPLETE // ALL VERIFICATIONS NOMINAL</span>
            </div>

            <div className="flex items-center gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Live Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:underline"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors font-medium"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
