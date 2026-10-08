import React from 'react';
import { PageRoute } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Code, User, BookOpen, Mail } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const cards = [
    {
      route: 'about' as PageRoute,
      icon: User,
      title: 'About Me',
      description: 'Education, Erasmus+ internship at Grenergy LLC, and tech stack.'
    },
    {
      route: 'projects' as PageRoute,
      icon: Code,
      title: 'Projects',
      description: 'meetbadi.com, Unitra, PyGlow, and data engineering systems.'
    },
    {
      route: 'research' as PageRoute,
      icon: BookOpen,
      title: 'Research / Writing',
      description: 'Technical notes, deep dives, and upcoming articles.'
    },
    {
      route: 'contacts' as PageRoute,
      icon: Mail,
      title: 'Contacts',
      description: 'Direct email, phone, LinkedIn, and resume download.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-4">
        <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 mb-3">
          Software Engineering Student
        </p>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
          Building real tools <br />
          <span className="text-emerald-700 dark:text-emerald-400">with Python, C#, and AI.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          I design and build desktop apps, automation tools, and data projects — focused on clean architecture, verifiable engineering, and practical outcomes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 dark:bg-emerald-500 text-white dark:text-gray-950 font-medium text-sm hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-all shadow-sm group"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('contacts')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </section>

      {/* Directory Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.route}
              onClick={() => onNavigate(card.route)}
              className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0f172a]/50 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {card.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-normal">
                {card.description}
              </p>
            </div>
          );
        })}
      </section>
    </motion.div>
  );
};
