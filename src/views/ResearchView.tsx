import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Terminal } from 'lucide-react';

export const ResearchView: React.FC = () => {
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
          Research / Writing
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Notes, technical post-mortems, and collected thoughts on software engineering.
        </p>
      </div>

      <div className="p-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 bg-white/40 dark:bg-[#111c30]/30 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Coming soon.
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Technical writing and architecture breakdowns are being prepared and will appear here shortly.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Status: Drafts in progress</span>
        </div>
      </div>

      {/* Topics Teaser */}
      <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#111c30]/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Upcoming Topics</span>
        </div>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
            <span>Building cross-platform desktop companion apps with Go, Wails, and React.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
            <span>AST-driven static analysis for automated test generation in Python.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
            <span>Integrating multi-model LLM pipelines with Supabase realtime backends.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};
