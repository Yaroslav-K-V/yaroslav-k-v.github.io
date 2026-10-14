import React from 'react';
import { PageRoute } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
}

interface DirectoryModule {
  index: string;
  route: PageRoute;
  title: string;
  tag: string;
  description: string;
  meta: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const directoryModules: DirectoryModule[] = [
    {
      index: '01',
      route: 'about',
      title: 'About Me',
      tag: 'Bio',
      description: 'Software Engineering student, Grenergy LLC internship, skills, and certifications.',
      meta: 'JS · React · TS · Python · REST APIs'
    },
    {
      index: '02',
      route: 'projects',
      title: 'Projects',
      tag: 'Work & code',
      description: 'meetbadi internship work, Unitra test generator, HotspotGuard macOS utility, PyGlow editor, and data notebooks.',
      meta: 'Full-stack · Python · Swift · pandas'
    },
    {
      index: '03',
      route: 'contacts',
      title: 'Contacts',
      tag: 'Get in touch',
      description: 'Direct email, phone, LinkedIn profile, GitHub, and PDF resume download.',
      meta: 'Varna, Bulgaria · Fast Response'
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
      {/* Hero Section */}
      <section className="pt-4 sm:pt-10 pb-2 space-y-6">
        {/* Eyebrow badge with live pulse */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-[3px] border border-[#ee6018]/20 bg-[#ee6018]/10 text-[11px] font-mono text-[#ee6018] dark:text-[#ee6018]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-[3px] bg-[#ee6018] opacity-75" />
            <span className="relative inline-flex rounded-[3px] h-2 w-2 bg-[#ee6018]" />
          </span>
          <span className="font-semibold tracking-wider uppercase">
            JUNIOR WEB DEVELOPER // AI AUTOMATION
          </span>
        </div>

        {/* Monochromatic Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12] max-w-4xl">
          Junior Web Developer building with{' '}
          <span className="text-[#8a8380] dark:text-[#8a8380]">
            JavaScript, React, and Applied AI.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
          Software Engineering student with production experience maintaining a live web platform (web app, Chrome extension, Supabase backend). Daily user of Claude Code and agentic AI workflows for exploring codebases, writing code, and debugging.
        </p>

        {/* Quick Navigation CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              onNavigate('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#1d1a18] dark:bg-[#eeeeee] text-white dark:text-zinc-950 font-mono text-xs sm:text-sm font-semibold hover:bg-[#3d3a39] dark:hover:bg-zinc-200 transition-all shadow-none group"
          >
            <span>About Me</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              onNavigate('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] border border-[#3d3a39] dark:border-white/10 bg-zinc-100/60 dark:bg-[#1d1a18]/60 text-zinc-800 dark:text-[#eeeeee] font-mono text-xs sm:text-sm font-medium hover:bg-zinc-200/80 dark:hover:bg-[#eeeeee]/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all group"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 text-[#8a8380] group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Engineering Stack / Meta-spec Row */}
        <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380] border-t border-[#3d3a39]/60 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[3px] bg-[#ee6018]" />
            <span>JavaScript · React · TypeScript · Python</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[3px] bg-[#ee6018]" />
            <span>REST APIs · Supabase · PostgreSQL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[3px] bg-[#ee6018]" />
            <span>Open to work</span>
          </div>
        </div>
      </section>

      {/* Directory Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#3d3a39]/80 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-[#eeeeee]">
              Sections
            </span>
            <span className="font-mono text-[10px] text-[#8a8380] dark:text-[#8a8380]">
              // 03 pages
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {directoryModules.map((card) => (
            <div
              key={card.route}
              role="button"
              tabIndex={0}
              onClick={() => {
                onNavigate(card.route);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(card.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="glass-panel group relative p-5 sm:p-6 rounded-[10px] hover:border-zinc-400 dark:hover:border-white/30 hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee6018] transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#ee6018] dark:text-[#ee6018]">
                      [{card.index}]
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#8a8380] dark:text-[#8a8380]">
                      {card.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a8380] group-hover:text-[#ee6018] dark:group-hover:text-[#ee6018] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-[#eeeeee] group-hover:text-[#ee6018] dark:group-hover:text-[#ee6018] transition-colors">
                  {card.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-[#8a8380] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#3d3a39]/70 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8a8380] dark:text-[#8a8380]">
                <span className="truncate">{card.meta}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ee6018] dark:text-[#ee6018] shrink-0 ml-2 font-medium">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
