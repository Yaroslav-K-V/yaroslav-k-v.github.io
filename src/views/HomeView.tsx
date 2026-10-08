import React from 'react';
import { PageRoute } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SystemArchitecture } from '../components/SystemArchitecture';

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
      tag: 'BACKGROUND // BIO',
      description: 'Education, Erasmus+ software engineering internship at Grenergy LLC, and core principles.',
      meta: 'C# · Python · TypeScript · Systems Design'
    },
    {
      index: '02',
      route: 'projects',
      title: 'Projects',
      tag: 'PRODUCTION SYSTEMS',
      description: 'meetbadi.com, Unitra desktop test station, PyGlow vision pipeline, and data engineering.',
      meta: 'FastAPI · WPF · Qdrant · React · SIMD'
    },
    {
      index: '03',
      route: 'research',
      title: 'Research / Writing',
      tag: 'SPECIFICATIONS // NOTES',
      description: 'Technical notes on event loops, RAG pipelines, microsecond hardware IO, and modular architecture.',
      meta: 'Deterministic Systems · Vector Embeddings'
    },
    {
      index: '04',
      route: 'contacts',
      title: 'Contacts',
      tag: 'COMMS // CHANNELS',
      description: 'Direct email, phone, LinkedIn profile, verified public channels, and PDF resume download.',
      meta: 'Kyiv / Remote · UTC+2 · Fast Response'
    }
  ];

  const scrollToArchitecture = () => {
    const el = document.getElementById('architecture-canvas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wider uppercase">
            SYSTEM ARCHITECTURE // SOFTWARE ENGINEERING
          </span>
        </div>

        {/* Monochromatic Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12] max-w-4xl">
          Architecting reliable systems with{' '}
          <span className="text-zinc-500 dark:text-zinc-400">
            Python, C#, and Applied AI.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
          Specialized in resilient desktop engines, high-throughput data automation, and context-augmented AI systems. Focused on clean modular architecture, verifiable engineering, and production reliability.
        </p>

        {/* Quick Navigation CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={scrollToArchitecture}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs sm:text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm group"
          >
            <span>Explore Systems</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              onNavigate('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/60 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 font-mono text-xs sm:text-sm font-medium hover:bg-zinc-200/80 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all group"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Engineering Stack / Meta-spec Row */}
        <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>STACK: C# (.NET) / PYTHON / TS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>PATTERN: CLEAN ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>STATUS: OPEN FOR INTERNSHIPS</span>
          </div>
        </div>
      </section>

      {/* Embedded System Architecture Centerpiece */}
      <section id="architecture-canvas" className="scroll-mt-20">
        <SystemArchitecture />
      </section>

      {/* Directory Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              DIRECTORY INDEX
            </span>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              // 04 MODULES AVAILABLE
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
            SELECT MODULE TO INITIALIZE VIEW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {directoryModules.map((card) => (
            <div
              key={card.route}
              onClick={() => {
                onNavigate(card.route);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-panel group relative p-5 sm:p-6 rounded-xl hover:border-zinc-400 dark:hover:border-white/30 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      [{card.index}]
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                      {card.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span className="truncate">{card.meta}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 dark:text-emerald-400 shrink-0 ml-2 font-medium">
                  ACCESS &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
