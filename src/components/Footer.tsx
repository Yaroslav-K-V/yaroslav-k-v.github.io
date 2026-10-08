import React, { useState, useEffect } from 'react';
import { contactsData } from '../data/contacts';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().slice(11, 19) + ' UTC');
      setLocalTime(
        now.toLocaleTimeString([], {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-white/10 py-10 text-xs font-mono text-zinc-500 dark:text-zinc-400">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Live System Status & Telemetry Clock */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="tracking-wider">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">|</span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              UTC {utcTime || '--:--:-- UTC'}
            </span>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">/</span>
            <span className="hidden sm:inline text-[11px] text-zinc-500 dark:text-zinc-400">
              LOCAL {localTime || '--:--:--'}
            </span>
          </div>

          {/* Social and Utility Actions */}
          <div className="flex items-center gap-5 text-xs text-zinc-600 dark:text-zinc-400">
            <a
              href={contactsData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={contactsData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Telemetry & Copyright */}
        <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400 dark:text-zinc-600">
          <p>© {new Date().getFullYear()} YAROSLAV KRUPODER // PORTFOLIO</p>
          <p>TELEMETRY // LAST DEPLOY: {contactsData.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
};
