import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { competencyMatrices, certifications } from '../data/skills';
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
      location: experience[0]?.location || 'Hybrid, Istanbul',
      program: 'Internship',
      period: 'Jun 2026 – Aug 2026',
      highlights: experience[0]?.highlights || [],
      link: experience[0]?.link,
      techBadges: ['Python', 'TypeScript/JavaScript', 'REST APIs', 'OpenRouter', 'Stripe', 'Resend', 'Supabase', 'PostgreSQL', 'Chrome Extension', 'Linux/VPS', 'CI/CD', 'Claude Code']
    },
    {
      id: 'university',
      indexTag: '[EDU // 01]',
      type: 'education',
      role: 'BSc Software Engineering',
      organization: 'Varna University of Management',
      location: 'Varna, Bulgaria',
      program: 'Undergraduate Degree Program',
      period: 'Sep 2025 – Present',
      statusText: 'In Progress // Active Enrollment',
      statusType: 'ongoing',
      highlights: [
        'Relevant coursework: Object-Oriented Programming, Data Structures & Algorithms, Software Design, SDLC, Agile.'
      ],
      techBadges: ['OOP', 'Data Structures & Algorithms', 'Software Design', 'SDLC', 'Agile']
    },
    {
      id: 'projects-track',
      indexTag: '[PRJ // 01]',
      type: 'engineering',
      role: 'Independent Projects & Open Source',
      organization: 'Unitra · PyGlow · Applied Data Science',
      location: 'Varna, Bulgaria / Remote',
      program: 'Project Track',
      period: '2025 – Present',
      statusText: 'Active Development',
      statusType: 'ongoing',
      highlights: [
        'Unitra — AI-powered desktop application that automatically generates Python unit tests from source code (AST analysis, LLM prompt construction, Flask + pywebview, pytest).',
        'PyGlow — lightweight Python code editor built from scratch (Pygments highlighting, local LLM autocomplete, plugin-style architecture).',
        'Applied Data Science — exploratory data analysis on real estate, retail, and student datasets with pandas, seaborn, and reproducible Jupyter Notebook reports.'
      ],
      techBadges: ['Python', 'Flask', 'pywebview', 'PySide6', 'Pygments', 'pytest', 'pandas', 'Jupyter Notebook']
    }
  ];

  const engineeringPillars = [
    {
      index: '01',
      tag: '[SPEC // PRODUCTION]',
      title: 'Keep live systems running',
      description:
        'Update layouts and features, fix bugs, and debug data and integration issues reported by users — on the web app, Chrome extension, and Supabase backend.'
    },
    {
      index: '02',
      tag: '[SPEC // AI WORKFLOW]',
      title: 'AI-assisted, human-reviewed',
      description:
        'Daily Claude Code and agentic workflows to explore codebases, plan changes, write code, and debug — with AI output reviewed for correctness before shipping.'
    },
    {
      index: '03',
      tag: '[SPEC // WORKFLOW]',
      title: 'Organized GitHub delivery',
      description:
        'Organized branches, commits, and pull requests, clear task communication, technical documentation, and CI/CD + Linux/VPS basics to deliver fixes reliably.'
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
            Junior Web Developer — AI Automation
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            Software Engineering student and Junior Web Developer with production experience maintaining a live web platform (web app, Chrome extension, Supabase backend). Daily user of Claude Code and agentic AI workflows for exploring codebases, planning changes, writing code, and debugging. JavaScript · React · TypeScript · Node.js · Python · REST APIs.
          </p>
        </div>

        {/* Telemetry metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Academic Track
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              BSc Software Eng.
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              VUM · Sep 2025 – Present
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Industry Experience
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              AI Agent Intern
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              Grenergy LLC · Jun–Aug 2026
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Core Languages
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              JS, TS, Python
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 block">
              React · REST APIs
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Geographic Base
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
              Varna, Bulgaria
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
            CHRONOLOGICAL NODES · 2025 — PRESENT
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
                    {matrix.id === 'frontend' && <Cpu className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
                    {matrix.id === 'backend' && <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                    {matrix.id === 'ai-workflow' && <Layers className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
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

      {/* Certifications */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
              [CERTS // CV] · VERIFIED CREDENTIALS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Certifications
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
            5 CREDENTIALS · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="glass-panel p-5 rounded-2xl space-y-2 border border-zinc-200 dark:border-zinc-800/80"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                    {cert.provider}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {cert.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                  {cert.date}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {cert.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-semibold">Spoken Languages: </span>
          Ukrainian — Native · English — B2 (C1 Reading)
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
