import React, { useEffect } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#131d33] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  {project.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-emerald-700 dark:text-emerald-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {project.description}
            </p>

            {/* Features */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Key Capabilities & Engineering
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Highlights if any */}
            {project.architecture && (
              <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  System Architecture
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {project.architecture.map((arch, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Note if any */}
            {project.note && (
              <p className="mt-4 text-xs italic text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                {project.note}
              </p>
            )}

            {/* Tech Stack Pills */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 dark:bg-emerald-500 text-white dark:text-gray-950 font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-colors shadow-sm"
                >
                  <span>Visit {project.title}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
