import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import {
  ExternalLink,
  Filter,
  ArrowUpRight,
  Layers,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = 'all' | 'fullstack' | 'ai' | 'desktop' | 'systems';

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filterOptions: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'ai', label: 'AI / ML' },
    { id: 'desktop', label: 'Desktop / Tools' },
    { id: 'systems', label: 'Systems' }
  ];

  const matchesCategory = (project: Project, category: FilterCategory): boolean => {
    if (category === 'all') return true;
    if (category === 'systems') {
      return (
        project.categories.includes('desktop') &&
        (project.tech.some((t) => ['C#', '.NET', 'Go', 'Wails', 'pywebview'].includes(t)) ||
          project.id === 4 ||
          project.id === 8 ||
          project.id === 2)
      );
    }
    return project.categories.includes(category as ProjectCategory);
  };

  const filteredProjects = projects.filter((project) => matchesCategory(project, activeFilter));

  const getFilterCount = (category: FilterCategory): number => {
    return projects.filter((p) => matchesCategory(p, category)).length;
  };

  const getStatusBadge = (badge: string) => {
    switch (badge) {
      case 'Live Service':
        return {
          label: 'PRODUCTION',
          className:
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/30',
          dotClass: 'bg-emerald-500'
        };
      case 'In Progress':
        return {
          label: 'ACTIVE DEVELOPMENT',
          className:
            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 dark:border-amber-500/30',
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
          label: badge.toUpperCase(),
          className:
            'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
          dotClass: 'bg-zinc-400'
        };
    }
  };

  // Flagship projects get prominent wide cards in the engineering grid
  const isFlagship = (project: Project): boolean => {
    return project.id === 8 || project.id === 4; // meetbadi.com or Unitra
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-10"
    >
      {/* Header Section */}
      <section className="space-y-4 pt-2">
        {/* System Registry Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 dark:border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wider uppercase">
              SYSTEM REGISTRY // ALL PROJECTS
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="hidden sm:inline">
              REGISTRY COUNT: [{String(projects.length).padStart(2, '0')} ARCHITECTURES]
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>STATUS: PRODUCTION OPERATIONAL</span>
            </span>
          </div>
        </div>

        {/* Title and Engineering Description */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Software Systems & Architectures
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Desktop engines, AI-powered automation pipelines, and fullstack services. Each module is
            built with strict modular boundaries, deterministic performance, and production reliability.
            Click any architecture card to inspect the full engineering specification sheet.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 mr-1 flex-shrink-0" />
          {filterOptions.map((opt) => {
            const count = getFilterCount(opt.id);
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white font-semibold shadow-sm'
                    : 'bg-zinc-100/70 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                      : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Asymmetric Engineering Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isFeatured = isFlagship(project);
            const status = getStatusBadge(project.badge);
            const projectTag = `[PRJ // ${String(index + 1).padStart(2, '0')}]`;

            if (isFeatured) {
              // FLAGSHIP PROMINENT WIDE CARD
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectProject(project)}
                  className="group md:col-span-2 glass-panel rounded-2xl border border-zinc-200/80 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 p-6 sm:p-8 transition-all cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden"
                >
                  {/* Subtle Top Ambient Lighting Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
                        FLAGSHIP SYSTEM
                      </span>
                      <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        {projectTag}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${status.className}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
                        <span>{status.label}</span>
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200/60 dark:border-white/10"
                          title="Visit live production service"
                        >
                          <span>Live Service</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200/60 dark:border-white/10"
                          title="View source code on GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
                      >
                        <span>Inspect Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Asymmetric 2-Column Specs Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    {/* Left Column: Scope & Capabilities */}
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Key Engineering Highlights
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                          {project.features.slice(0, 4).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-zinc-400 font-mono text-xs mt-0.5">▸</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Architecture Breakdown Plate */}
                    <div className="lg:col-span-5 bg-zinc-100/70 dark:bg-black/50 border border-zinc-200/80 dark:border-white/10 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200/60 dark:border-white/5">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-500" />
                            System Topology
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            SPEC VERIFIED
                          </span>
                        </div>

                        {project.architecture ? (
                          <div className="space-y-2">
                            {project.architecture.map((arch, aIdx) => (
                              <div
                                key={aIdx}
                                className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300 flex items-start gap-2 bg-white/60 dark:bg-zinc-900/40 p-2 rounded border border-zinc-200/40 dark:border-white/5"
                              >
                                <span className="text-emerald-500 font-bold">0{aIdx + 1}</span>
                                <span className="leading-tight">{arch}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-zinc-500 space-y-2">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Modular Component Architecture</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                              <span>Strict Separation of Concerns</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Flagship Metrics Badge */}
                      <div className="pt-2 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                        <span>CORE ENGINE: NATIVE</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          INSPECT SPEC SHEET →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tech Pills Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200/60 dark:border-white/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-zinc-400 mr-1">TECH:</span>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Full Technical Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            }

            // COMPACT STRUCTURED CARDS FOR ALL OTHER PROJECTS
            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectProject(project)}
                className="group glass-panel rounded-2xl border border-zinc-200/80 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 p-5 sm:p-6 transition-all cursor-pointer shadow-sm hover:shadow-lg flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      {projectTag}
                    </span>
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full border ${status.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
                      <span>{status.label}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                    {project.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-zinc-400 font-mono">▸</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Tech & Actions */}
                <div className="space-y-3 pt-3 border-t border-zinc-200/60 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between pt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Visit live link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="View GitHub repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                    >
                      <span>Inspect Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
