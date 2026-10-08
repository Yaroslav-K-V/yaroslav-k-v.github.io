import React, { useState } from 'react';
import { PageRoute } from '../types';
import { contactsData } from '../data/contacts';
import { Moon, Sun, FileText, Menu, X, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'welcome', label: 'Welcome' },
    { route: 'about', label: 'About Me' },
    { route: 'projects', label: 'Projects' },
    { route: 'research', label: 'Research' },
    { route: 'contacts', label: 'Contacts' }
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-zinc-200/80 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Monogram & Live Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleNavClick('welcome')}
            className="group flex items-center gap-2 text-left font-mono hover:opacity-80 transition-opacity"
          >
            <span className="font-bold tracking-widest text-sm sm:text-base text-zinc-900 dark:text-white">
              YK // 01
            </span>
            <span className="hidden sm:inline-block text-zinc-300 dark:text-zinc-700">|</span>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              YAROSLAV KRUPODER
            </span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline tracking-wide">SYS: ONLINE</span>
            <span className="sm:hidden tracking-wide">ONLINE</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-zinc-200/80 dark:border-white/10 bg-zinc-100/70 dark:bg-white/[0.03] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`px-3 py-1 text-xs font-mono transition-all rounded-full ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={contactsData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-zinc-100" /> : <Moon className="w-4 h-4 text-zinc-800" />}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 space-y-3 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
