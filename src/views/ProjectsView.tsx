import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { ExternalLink, Filter, Info } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filterOptions: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'fullstack', label: 'Fullstack & Web' },
    { id: 'desktop', label: 'Desktop Applications' }
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Live Service':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800';
      case 'Desktop App':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950/80 dark:text-blue-400 border-blue-300 dark:border-blue-800';
      case 'Open Source':
        return 'bg-purple-50 text-purple-800 dark:bg-purple-950/80 dark:text-purple-400 border-purple-300 dark:border-purple-800';
      case 'In Progress':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
          Featured Projects
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Desktop apps, AI integrations, and fullstack services. Click any card to inspect architecture details.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveFilter(opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === opt.id
                ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-gray-950 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectProject(project)}
              className="group p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#111c30]/50 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:shadow-md transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(
                      project.badge
                    )}`}
                  >
                    {project.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60"
                      title="Visit live service"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                      title="View GitHub repository"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  )}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="p-1 rounded text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    title="View details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                {project.subtitle}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                {project.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
