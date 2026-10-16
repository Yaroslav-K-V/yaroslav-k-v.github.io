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
      indexTag: 'Experience',
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
      indexTag: 'Education',
      type: 'education',
      role: 'BSc Software Engineering',
      organization: 'Varna University of Management',
      location: 'Varna, Bulgaria',
      program: 'Undergraduate Degree Program',
      period: 'Sep 2025 – Present',
      statusText: 'In progress',
      statusType: 'ongoing',
      highlights: [
        'Relevant coursework: Object-Oriented Programming, Data Structures & Algorithms, Software Design, SDLC, Agile.'
      ],
      techBadges: ['OOP', 'Data Structures & Algorithms', 'Software Design', 'SDLC', 'Agile']
    },
    {
      id: 'projects-track',
      indexTag: 'Projects',
      type: 'engineering',
      role: 'Independent Projects & Open Source',
      organization: 'Unitra · PyGlow · HotspotGuard · Data Science',
      location: 'Varna, Bulgaria / Remote',
      program: 'Project Track',
      period: '2025 – Present',
      statusText: 'Ongoing',
      statusType: 'ongoing',
      highlights: [
        'Unitra — AI-powered desktop application that automatically generates Python unit tests from source code (AST analysis, LLM prompt construction, Flask + pywebview, pytest).',
        'PyGlow — lightweight Python code editor built from scratch (Pygments highlighting, local LLM autocomplete, plugin-style architecture).',
        'Applied Data Science — exploratory data analysis on real estate, retail, and student datasets with pandas, seaborn, and reproducible Jupyter Notebook reports.',
        'HotspotGuard — macOS Wi-Fi watchdog built as an agentic-development exercise (Swift, self-tested, CI).'
      ],
      techBadges: ['Python', 'Flask', 'pywebview', 'PySide6', 'Pygments', 'pytest', 'pandas', 'Jupyter Notebook']
    }
  ];

  const engineeringPillars = [
    {
      index: '01',
      tag: 'Production',
      title: 'Keep live systems running',
      description:
        'Update layouts and features, fix bugs, and debug data and integration issues reported by users — on the web app, Chrome extension, and Supabase backend.'
    },
    {
      index: '02',
      tag: 'AI workflow',
      title: 'AI-assisted, human-reviewed',
      description:
        'Daily Claude Code and agentic workflows to explore codebases, plan changes, write code, and debug — with AI output reviewed for correctness before shipping.'
    },
    {
      index: '03',
      tag: 'Workflow',
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
      {/* Overview Header */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[#ee6018]/20 bg-[#ee6018]/10 text-[11px] font-mono text-[#ee6018] dark:text-[#ee6018]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-[3px] bg-[#ee6018] opacity-75" />
              <span className="relative inline-flex rounded-[3px] h-2 w-2 bg-[#ee6018]" />
            </span>
            <span>Open to junior roles</span>
          </div>

          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            Yaroslav Krupoder
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-[#eeeeee] mb-4">
            Junior Web Developer — AI Automation
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            Software Engineering student and Junior Web Developer with production experience maintaining a live web platform (web app, Chrome extension, Supabase backend). Daily user of Claude Code and agentic AI workflows for exploring codebases, planning changes, writing code, and debugging. JavaScript · React · TypeScript · Node.js · Python · REST APIs.
          </p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Education
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee] block">
              BSc Software Eng.
            </span>
            <span className="text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380] block">
              VUM · Sep 2025 – Present
            </span>
          </div>

          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Experience
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee] block">
              AI Agent Intern
            </span>
            <span className="text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380] block">
              Grenergy LLC · Jun–Aug 2026
            </span>
          </div>

          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Languages
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee] block">
              JS, TS, Python
            </span>
            <span className="text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380] block">
              React · REST APIs
            </span>
          </div>

          <div className="glass-panel p-4 rounded-[10px] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
              Location
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-[#eeeeee] block">
              Varna, Bulgaria
            </span>
            <span className="text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380] block">
              Open to remote
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Milestone Timeline */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#3d3a39] dark:border-[#3d3a39]">
          <div>
            <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] uppercase tracking-widest block mb-1">
              Experience & education
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            2025 — present
          </span>
        </div>

        {/* Vertical Timeline Pipeline */}
        <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-zinc-200 dark:before:bg-[#3d3a39]">
          {milestones.map((item) => (
            <div key={item.id} className="relative group">
              {/* Telemetry Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {item.statusType === 'active' ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-[3px] bg-[#ee6018] opacity-75" />
                      <span className="relative inline-flex rounded-[3px] h-3 w-3 bg-[#ee6018] ring-4 ring-[#eeeeee] dark:ring-zinc-950" />
                    </>
                  ) : item.statusType === 'ongoing' ? (
                    <span className="relative inline-flex rounded-[3px] h-3 w-3 bg-[#1d1a18] dark:bg-zinc-200 ring-4 ring-[#eeeeee] dark:ring-zinc-950" />
                  ) : (
                    <span className="relative inline-flex rounded-[3px] h-3 w-3 bg-zinc-400 dark:bg-zinc-600 ring-4 ring-[#eeeeee] dark:ring-zinc-950" />
                  )}
                </span>
              </div>

              {/* Node Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-[10px] space-y-5 hover:border-zinc-300 dark:hover:border-[#3d3a39] transition-colors">
                {/* Node Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] font-semibold">
                        {item.indexTag}
                      </span>
                      {item.program && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-[#3d3a39] text-zinc-700 dark:text-zinc-300 border border-[#3d3a39] dark:border-[#3d3a39]">
                          {item.program}
                        </span>
                      )}
                      {item.statusText && (
                        <span className="text-[11px] font-mono text-[#ee6018] dark:text-[#ee6018] font-medium">
                          · {item.statusText}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-[#eeeeee] flex flex-wrap items-baseline gap-2">
                      <span className="inline-flex items-center gap-2">
                        {item.type === 'experience' && <Briefcase className="w-4 h-4 text-[#ee6018] dark:text-[#ee6018] inline-block" />}
                        {item.type === 'education' && <GraduationCap className="w-4 h-4 text-zinc-600 dark:text-[#8a8380] inline-block" />}
                        {item.type === 'engineering' && <Terminal className="w-4 h-4 text-zinc-600 dark:text-[#8a8380] inline-block" />}
                        <span>{item.role}</span>
                      </span>
                      <span className="text-[#8a8380] dark:text-[#8a8380] font-medium text-base">
                        @ {item.organization}
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
                    <span className="font-semibold text-zinc-800 dark:text-[#eeeeee]">
                      {item.period}
                    </span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Highlights list with telemetry indicators */}
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ee6018] dark:text-[#ee6018] mt-1 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Badges and Links */}
                <div className="pt-3 border-t border-zinc-100 dark:border-[#3d3a39]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techBadges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border border-[#3d3a39] dark:border-[#3d3a39] bg-zinc-50/50 dark:bg-[#1d1a18]/50 text-zinc-700 dark:text-zinc-300"
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-900 dark:text-[#eeeeee] hover:text-[#ee6018] dark:hover:text-[#ee6018] transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>{item.link.text} →</span>
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#3d3a39] dark:border-[#3d3a39]">
          <div>
            <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] uppercase tracking-widest block mb-1">
              Skills
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
              Skills
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            Languages & tools I use
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {competencyMatrices.map((matrix) => (
            <div
              key={matrix.id}
              className="glass-panel p-6 sm:p-7 rounded-[10px] flex flex-col justify-between space-y-6 hover:border-zinc-300 dark:hover:border-[#3d3a39] transition-colors"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#8a8380] dark:text-[#8a8380] font-semibold">
                      0{matrix.index}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380]">
                      {matrix.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {matrix.id === 'frontend' && <Cpu className="w-5 h-5 text-zinc-600 dark:text-[#8a8380]" />}
                    {matrix.id === 'backend' && <Activity className="w-5 h-5 text-[#ee6018] dark:text-[#ee6018]" />}
                    {matrix.id === 'ai-workflow' && <Layers className="w-5 h-5 text-zinc-600 dark:text-[#8a8380]" />}
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-[#eeeeee]">
                      {matrix.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-[#8a8380] leading-relaxed">
                  {matrix.summary}
                </p>

                {/* Primary Competencies */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block font-semibold">
                    Main tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.primarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded border border-zinc-300 dark:border-[#3d3a39] bg-zinc-100 dark:bg-[#3d3a39]/80 text-zinc-900 dark:text-[#eeeeee] shadow-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Skills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block font-semibold">
                    Also used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.secondarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded border border-[#3d3a39] dark:border-[#3d3a39] bg-[#eeeeee]/50 dark:bg-[#1d1a18]/40 text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks & Specifications */}
              <div className="pt-4 border-t border-zinc-100 dark:border-[#3d3a39]/80 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] block">
                  Tools &amp; services
                </span>
                <div className="flex flex-wrap gap-1">
                  {matrix.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100/70 dark:bg-[#3d3a39]/50 text-zinc-600 dark:text-[#8a8380] border border-[#3d3a39]/50 dark:border-[#3d3a39]/50"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#3d3a39] dark:border-[#3d3a39]">
          <div>
            <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] uppercase tracking-widest block mb-1">
              From my CV
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
              Certifications
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            5 certificates · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="glass-panel px-5 py-4 rounded-[10px] border border-[#3d3a39] dark:border-[#3d3a39]/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
            >
              <div>
                <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
                  {cert.provider}
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-[#eeeeee]">
                  {cert.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-[#8a8380] leading-relaxed mt-1">
                  {cert.detail}
                </p>
              </div>
              <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] shrink-0">
                {cert.date}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-panel p-5 rounded-[10px] border border-[#3d3a39] dark:border-[#3d3a39]/80 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-semibold">Spoken Languages: </span>
          Ukrainian — Native · English — B2 (C1 Reading)
        </div>
      </section>

      {/* Engineering Philosophy & Rigor Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#3d3a39] dark:border-[#3d3a39]">
          <div>
            <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380] uppercase tracking-widest block mb-1">
              My approach
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ee6018] dark:text-[#ee6018]" />
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee]">
                How I work
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            3 notes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engineeringPillars.map((pillar) => (
            <div
              key={pillar.index}
              className="glass-panel p-6 rounded-[10px] space-y-3 border border-[#3d3a39] dark:border-[#3d3a39]/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
                  {pillar.tag}
                </span>
                <span className="text-xs font-mono text-[#8a8380] dark:text-zinc-600 font-bold">
                  {pillar.index}
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-[#eeeeee]">
                {pillar.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-[#8a8380] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
