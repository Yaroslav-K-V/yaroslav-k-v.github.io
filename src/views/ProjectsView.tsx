import React, { useState, useEffect } from 'react';
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
  Terminal
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { VideoPreview } from '../components/VideoPreview';

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
  initialProjectSlug?: string | null;
}

type FilterCategory = 'all' | 'fullstack' | 'ai' | 'desktop' | 'systems';

const VALID_FILTERS: FilterCategory[] = ['all', 'fullstack', 'ai', 'desktop', 'systems'];

const getInitialFilter = (): FilterCategory => {
  if (typeof window === 'undefined') return 'all';
  const params = new URLSearchParams(window.location.search);
  const filterParam = params.get('filter');
  if (filterParam && VALID_FILTERS.includes(filterParam as FilterCategory)) {
    return filterParam as FilterCategory;
  }
  return 'all';
};

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject, initialProjectSlug }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(getInitialFilter);

  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (category === 'all') {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', category);
    }
    window.history.pushState(null, '', url.pathname + (url.search || '') + (url.hash || ''));
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get('filter');
      if (filterParam && VALID_FILTERS.includes(filterParam as FilterCategory)) {
        setActiveFilter(filterParam as FilterCategory);
      } else {
        setActiveFilter('all');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (initialProjectSlug) {
      const found = projects.find((p) => p.slug.toLowerCase() === initialProjectSlug.toLowerCase());
      if (found) {
        onSelectProject(found);
        return;
      }
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const projectParam = params.get('project') || params.get('p');
      const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
      const slug = projectParam || (hash && projects.some((p) => p.slug.toLowerCase() === hash.toLowerCase()) ? hash : null);
      if (slug) {
        const found = projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
        if (found) {
          onSelectProject(found);
        }
      }
    }
  }, [initialProjectSlug, onSelectProject]);

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
      return project.tech.some((t) => ['pytest', 'Flask', 'pywebview'].includes(t));
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
          label: 'Live',
          className:
            'bg-[#ee6018]/10 text-[#ee6018] dark:text-[#ee6018] border-[#ee6018]/30 dark:border-[#ee6018]/30',
          dotClass: 'bg-[#ee6018]'
        };
      case 'In Progress':
        return {
          label: 'In progress',
          className:
            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 dark:border-amber-500/30',
          dotClass: 'bg-amber-500'
        };
      case 'Open Source':
        return {
          label: 'Open source',
          className:
            'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-[#3d3a39]',
          dotClass: 'bg-zinc-400'
        };
      default:
        return {
          label: badge.toUpperCase(),
          className:
            'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-[#3d3a39]',
          dotClass: 'bg-zinc-400'
        };
    }
  };

  // Wide cards only on 'all' — filters always render a uniform grid with no holes.
  const isFlagship = (project: Project): boolean => {
    if (activeFilter !== 'all') return false;
    return project.id === 1 || project.id === 2 || project.id === 5;
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
      <section data-assemble="1" className="space-y-4 pt-2">
        {/* System Registry Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3d3a39]/80 dark:border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[#ee6018]/20 bg-[#ee6018]/10 text-[11px] font-mono text-[#ee6018] dark:text-[#ee6018]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-[3px] bg-[#ee6018] opacity-75" />
              <span className="relative inline-flex rounded-[3px] h-2 w-2 bg-[#ee6018]" />
            </span>
            <span className="font-semibold tracking-wider uppercase">
              Projects
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#8a8380] dark:text-[#8a8380]">
            <span className="hidden sm:inline">
              {projects.length} projects
            </span>
          </div>
        </div>

        {/* Title and Engineering Description */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Things I built or helped build: internship work, open-source tools, and data
            notebooks. Click any card for details.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-[#8a8380] dark:text-[#8a8380] mr-1 flex-shrink-0" />
          {filterOptions.map((opt) => {
            const count = getFilterCount(opt.id);
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleFilterChange(opt.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-xs font-mono transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#1d1a18] dark:bg-[#eeeeee] text-white dark:text-zinc-950 border-zinc-900 dark:border-white font-semibold shadow-none'
                    : 'bg-zinc-100/70 dark:bg-[#1d1a18]/60 text-zinc-600 dark:text-[#8a8380] border-[#3d3a39]/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:text-zinc-900 dark:hover:text-[#eeeeee]'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#3d3a39] text-[#eeeeee] dark:bg-zinc-200 dark:text-zinc-900'
                      : 'bg-zinc-200/60 dark:bg-[#3d3a39] text-[#8a8380] dark:text-[#8a8380]'
                  }`}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-[10px] p-12 text-center space-y-3">
          <p className="text-base font-semibold text-zinc-900 dark:text-[#eeeeee]">
            Nothing here yet
          </p>
          <p className="text-xs font-mono text-[#8a8380] max-w-sm mx-auto">
            No projects in this category — try another filter.
          </p>
          <button
            onClick={() => handleFilterChange('all')}
            className="mt-2 text-xs font-mono px-3 py-1.5 rounded-[3px] border border-[#3d3a39] text-zinc-800 dark:text-[#eeeeee] hover:bg-zinc-100 dark:hover:bg-[#eeeeee]/10 transition-colors"
          >
            Show all
          </button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isFeatured = isFlagship(project);
            const status = getStatusBadge(project.badge);
            const projectTag = `[PRJ // ${String(project.id).padStart(2, '0')}]`;

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
                  className="group md:col-span-2 glass-panel rounded-[10px] border border-[#3d3a39]/80 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 p-6 sm:p-8 transition-all cursor-pointer shadow-none hover:shadow-none relative overflow-hidden"
                >
                  {/* Subtle Top Ambient Lighting Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ee6018]/50 to-transparent" />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#1d1a18] text-white dark:bg-[#eeeeee] dark:text-zinc-950">
                        Featured
                      </span>
                      <span className="font-mono text-xs text-[#8a8380] dark:text-[#8a8380]">
                        {projectTag}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-[3px] border ${status.className}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-[3px] ${status.dotClass}`} />
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
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-[3px] bg-zinc-100 dark:bg-[#1d1a18] text-zinc-800 dark:text-[#eeeeee] hover:bg-zinc-200 dark:hover:bg-[#3d3a39] transition-colors border border-[#3d3a39]/60 dark:border-white/10"
                          title="Visit live production service"
                        >
                          <span>Live Service</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#8a8380]" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-[3px] bg-zinc-100 dark:bg-[#1d1a18] text-zinc-800 dark:text-[#eeeeee] hover:bg-zinc-200 dark:hover:bg-[#3d3a39] transition-colors border border-[#3d3a39]/60 dark:border-white/10"
                          title="View source code on GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium px-3 py-1.5 rounded-[3px] bg-[#1d1a18] dark:bg-[#eeeeee] text-white dark:text-zinc-950 hover:bg-[#3d3a39] dark:hover:bg-zinc-200 transition-colors shadow-none"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-[#ee6018] dark:group-hover:text-[#ee6018] transition-colors">
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

                      {(project.video || project.image) && (
                        <VideoPreview
                          src={project.video ?? project.image ?? ''}
                          poster={project.image}
                          alt={`${project.title} screenshot`}
                        />
                      )}
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8380] dark:text-[#8a8380] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ee6018]" />
                          Highlights
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                          {project.features.slice(0, 4).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#8a8380] font-mono text-xs mt-0.5">▸</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Architecture Breakdown Plate */}
                    <div className="lg:col-span-5 bg-zinc-100/70 dark:bg-[#101010]/50 border border-[#3d3a39]/80 dark:border-white/10 rounded-[10px] p-4 sm:p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#3d3a39]/60 dark:border-white/5">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#ee6018]" />
                            Stack Overview
                          </span>
                          <span className="font-mono text-[10px] text-[#8a8380]">
                            {project.architecture ? `${project.architecture.length} layers` : ''}
                          </span>
                        </div>

                        {project.architecture ? (
                          <div className="space-y-2">
                            {project.architecture.map((arch, aIdx) => (
                              <div
                                key={aIdx}
                                className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300 flex items-start gap-2 bg-[#eeeeee]/60 dark:bg-[#1d1a18]/40 p-2 rounded border border-[#3d3a39]/40 dark:border-white/5"
                              >
                                <span className="text-[#ee6018] font-bold">0{aIdx + 1}</span>
                                <span className="leading-tight">{arch}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-[#8a8380] space-y-2">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-3.5 h-3.5 text-[#ee6018]" />
                              <span>Modular Component Architecture</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-[#8a8380]" />
                              <span>Strict Separation of Concerns</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Flagship Marker */}
                      <div className="pt-2 border-t border-[#3d3a39]/60 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-[#8a8380] dark:text-[#8a8380]">
                        <span>FEATURED PROJECT</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tech Pills Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#3d3a39]/60 dark:border-white/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-[#8a8380] mr-1">Stack:</span>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-[#eeeeee]/5 border border-[#3d3a39]/60 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-[#8a8380] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Open details</span>
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
                className="group glass-panel rounded-[10px] border border-[#3d3a39]/80 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 p-5 sm:p-6 transition-all cursor-pointer shadow-none hover:shadow-none flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#8a8380] dark:text-[#8a8380]">
                      {projectTag}
                    </span>
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-[3px] border ${status.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-[3px] ${status.dotClass}`} />
                      <span>{status.label}</span>
                    </div>
                  </div>

                  {(project.video || project.image) && (
                    <VideoPreview
                      src={project.video ?? project.image ?? ''}
                      poster={project.image}
                      alt={`${project.title} demo`}
                    />
                  )}

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-[#eeeeee] group-hover:text-[#ee6018] dark:group-hover:text-[#ee6018] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-[#8a8380] mt-1 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-[#8a8380] pt-1">
                    {project.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-[#8a8380] font-mono">▸</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Tech & Actions */}
                <div className="space-y-3 pt-3 border-t border-[#3d3a39]/60 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-[#eeeeee]/5 border border-[#3d3a39]/60 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
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
                          className="p-1.5 rounded text-[#8a8380] hover:text-zinc-900 dark:hover:text-[#eeeeee] hover:bg-zinc-100 dark:hover:bg-[#3d3a39] transition-colors"
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
                          className="p-1.5 rounded text-[#8a8380] hover:text-zinc-900 dark:hover:text-[#eeeeee] hover:bg-zinc-100 dark:hover:bg-[#3d3a39] transition-colors"
                          title="View GitHub repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 dark:text-[#8a8380] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
      )}
    </motion.div>
  );
};

export default ProjectsView;
