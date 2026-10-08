import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { competencyMatrices } from '../data/skills';
import {
  ExternalLink,
  Cpu,
  GraduationCap,
  Briefcase,
  Terminal,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Milestone {
  id: string;
  indexTag: string;
  type: 'experience' | 'education' | 'engineering';
  role: string;
  organization: string;
  location: string;
  program?: string;
  period: string;
  statusText?: string;
  statusType?: 'active' | 'completed' | 'ongoing';
  highlights: string[];
  link?: {
    text: string;
    url: string;
  };
  techBadges: string[];
}

export const AboutView: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 'grenergy',
      indexTag: '[EXP // 01]',
      type: 'experience',
      role: 'AI Agent Developer Intern',
      organization: 'Grenergy LLC',
      location: experience[0]?.location || 'Spain / Remote',
      program: 'Erasmus+ Traineeship',
      period: 'Jun 2026 – Sep 2026',
      statusText: 'Continuing Remotely as Contributor',
      statusType: 'active',
      highlights: experience[0]?.highlights || [
        'Contributed to meetbadi.com — live meeting transcription, translation, and AI summary service for Google Meet, Zoom, and Teams.',
        'Developed and maintained the website and Chrome extension frontend using TypeScript and React.',
        'Designed and integrated backend services, authentication flows, and PostgreSQL tables with Supabase.',
        'Engineered desktop application features utilizing Go and Wails.',
        'Implemented LLM inference workflows via OpenRouter for multi-language translation and meeting digest generation.'
      ],
      link: {
        text: 'meetbadi.com',
        url: 'https://meetbadi.com'
      },
      techBadges: ['TypeScript', 'React', 'Go', 'Wails', 'Supabase', 'PostgreSQL', 'OpenRouter', 'Chrome Extension']
    },
    {
      id: 'university',
      indexTag: '[EDU // 01]',
      type: 'education',
      role: 'B.S. in Software Engineering',
      organization: 'University Degree in Software Engineering',
      location: 'Bulgaria',
      program: 'Undergraduate Degree Program',
      period: '2024 – Present (Year 2)',
      statusText: 'In Progress // Active Enrollment',
      statusType: 'ongoing',
      highlights: [
        'Comprehensive curriculum in computer science theory: Algorithms, Data Structures, Relational Database Theory, and Operating Systems.',
        'In-depth study and practical application of Clean Architecture, Object-Oriented Analysis & Design (OOAD), and Design Patterns in C# and Python.',
        'Engineered semester software engineering projects adhering to strict version control standards, automated unit testing, and design documentation.',
        'Consistently applying industrial development workflows (branching, code reviews, continuous integration) into academic laboratory coursework.'
      ],
      techBadges: ['C#', '.NET', 'Python', 'Algorithms & Data Structures', 'SQL / Relational DBs', 'Clean Architecture', 'Git']
    },
    {
      id: 'systems-milestones',
      indexTag: '[SYS // 01]',
      type: 'engineering',
      role: 'Applied Systems & Tooling Engineering',
      organization: 'Independent Projects & Open Source',
      location: 'Kyiv / Remote',
      program: 'Systems & Research Track',
      period: '2025 – Present',
      statusText: 'Active System Deployments',
      statusType: 'ongoing',
      highlights: [
        'Architected Unitra — automated desktop diagnostics station in C# (.NET/WPF) interfacing with industrial hardware rigs with microsecond timing precision.',
        'Developed PyGlow — high-throughput computer vision pipeline with SIMD and GPU acceleration routines for real-time frame analysis.',
        'Implemented Python AST static analysis pipelines for deterministic test scaffolding and automatic unit test generation.',
        'Built fullstack web and desktop applications using FastAPI, React, Supabase, and Wails.'
      ],
      techBadges: ['.NET / WPF', 'Python / AST', 'FastAPI', 'Qdrant / Vector DBs', 'Wails (Go)', 'Docker', 'pytest']
    }
  ];

  const engineeringPillars = [
    {
      index: '01',
      tag: '[SPEC // DETERMINISM]',
      title: 'Deterministic State & Architecture',
      description:
        'Software must yield predictable outcomes under heavy traffic, hardware glitches, or degraded network states. I favor explicit state machines, strict typing, and defensive boundaries over implicit side effects.'
    },
    {
      index: '02',
      tag: '[SPEC // MODULARITY]',
      title: 'Strict Domain Isolation',
      description:
        'Business domain rules must remain decoupled from transport protocols, external APIs, and presentation surfaces. Clean Architecture and Repository abstractions allow swapping persistence or UI with zero core logic changes.'
    },
    {
      index: '03',
      tag: '[SPEC // OBSERVABILITY]',
      title: 'Measurable Telemetry & Verification',
      description:
        'Code is incomplete without automated verification and runtime observability. Every system I build includes test coverage on core workflows, structured telemetry metrics, and clear degradation modes.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-16"
    >
      {/* Overview Dossier Header */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>STATUS // OPEN TO INTERNSHIP (2026-2027)</span>
          </div>

          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            [DOSSIER // 01] · YAROSLAV KRUPODER
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Engineering Profile &amp; Provenance
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            Second-year Software Engineering student specializing in resilient systems, C#, Python, and Applied AI workflows. Demonstrated production experience through an Erasmus+ internship at Grenergy LLC contributing to meetbadi.com, engineering native desktop utilities, and architecting fullstack automated services with clean domain separation.
          </p>
        </div>

        {/* Telemetry metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Academic Track
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              B.S. Software Eng.
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              Year 2 · In Progress
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Industry Experience
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              Erasmus+ Trainee
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              Grenergy LLC · meetbadi
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Core Languages
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              C#, Python, TS, SQL
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              Typed &amp; Compiled
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Geographic Base
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              Bulgaria / Remote
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              Open to Relocation
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Milestone Timeline */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [TIMELINE // 02] · CAREER &amp; ACADEMICS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Engineering Milestones &amp; Telemetry
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            CHRONOLOGICAL NODES · 2024 — PRESENT
          </span>
        </div>

        {/* Vertical Timeline Pipeline */}
        <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
          {milestones.map((item) => (
            <div key={item.id} className="relative group">
              {/* Telemetry Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {item.statusType === 'active' ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-4 ring-white dark:ring-zinc-950" />
                    </>
                  ) : item.statusType === 'ongoing' ? (
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-900 dark:bg-zinc-200 ring-4 ring-white dark:ring-zinc-950" />
                  ) : (
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-400 dark:bg-zinc-600 ring-4 ring-white dark:ring-zinc-950" />
                  )}
                </span>
              </div>

              {/* Node Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl space-y-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                {/* Node Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                        {item.indexTag}
                      </span>
                      {item.program && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                          {item.program}
                        </span>
                      )}
                      {item.statusText && (
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          · {item.statusText}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex flex-wrap items-baseline gap-2">
                      <span className="inline-flex items-center gap-2">
                        {item.type === 'experience' && <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400 inline-block" />}
                        {item.type === 'education' && <GraduationCap className="w-4 h-4 text-zinc-600 dark:text-zinc-400 inline-block" />}
                        {item.type === 'engineering' && <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400 inline-block" />}
                        <span>{item.role}</span>
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium text-base">
                        @ {item.organization}
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {item.period}
                    </span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Highlights list with telemetry indicators */}
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Badges and Links */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techBadges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>SPEC // {item.link.text}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Competencies: Technical Matrices */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [MATRIX // 03] · SYSTEM CAPABILITIES
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Core Competency Matrices
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            ENGINEERING TAXONOMY &amp; TOOLCHAINS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {competencyMatrices.map((matrix) => (
            <div
              key={matrix.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                      [MATRIX // {matrix.index}]
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {matrix.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {matrix.id === 'systems-languages' && <Cpu className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
                    {matrix.id === 'ai-data' && <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                    {matrix.id === 'arch-tools' && <Layers className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {matrix.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {matrix.summary}
                </p>

                {/* Primary Competencies */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-semibold">
                    Primary Production Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.primarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Skills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-semibold">
                    Applied Tools &amp; Paradigms
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.secondarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks & Specifications */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                  Frameworks &amp; Protocols
                </span>
                <div className="flex flex-wrap gap-1">
                  {matrix.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100/70 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Philosophy & Rigor Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [STANDARDS // 04] · PRINCIPLES
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Engineering Operating Principles
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            SYSTEM CRITERIA &amp; HYGIENE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engineeringPillars.map((pillar) => (
            <div
              key={pillar.index}
              className="glass-panel p-6 rounded-2xl space-y-3 border border-zinc-200 dark:border-zinc-800/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {pillar.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 font-bold">
                  {pillar.index}
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {pillar.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
