import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { skillGroups } from '../data/skills';
import { Briefcase, ExternalLink, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-10"
    >
      {/* Intro */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          About Me
        </h2>
        <div className="space-y-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Second-year Software Engineering student with practical experience in Python, TypeScript, and C#. I build real projects such as desktop applications, automation agents, and fullstack services, apply solid object-oriented design and version control, and actively sharpen my engineering rigor through hands-on practice.
          </p>
          <p>
            Seeking software engineering internship opportunities where I can contribute to production-grade software, collaborate with experienced engineers, and grow technically.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Work Experience
          </h2>
        </div>

        <div className="space-y-4">
          {experience.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#111c30]/50 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.role} <span className="text-emerald-700 dark:text-emerald-400 font-normal">· {item.company}</span>
                </h3>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  {item.period}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{item.location}</span>
                <span>•</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.program}</span>
                {item.note && (
                  <>
                    <span>•</span>
                    <span className="italic">{item.note}</span>
                  </>
                )}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {item.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.link && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    <span>Visit {item.link.text}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Groups */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Skills &amp; Technologies
          </h2>
        </div>

        {skillGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-sm font-medium px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  );
};
