import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { contactsData } from '../data/contacts';
import { FileText, Menu, X, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Overlay mode: lock background scroll + close on Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'welcome', label: 'Welcome' },
    { route: 'about', label: 'About Me' },
    { route: 'projects', label: 'Projects' },
    { route: 'contacts', label: 'Contacts' }
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#eeeeee]/70 dark:bg-[#101010]/70 border-b border-[#3d3a39]/80 dark:border-white/10 transition-colors">
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
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#8a8380] dark:text-[#8a8380]">
              YAROSLAV KRUPODER
            </span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[#3d3a39] dark:border-white/10 text-[10px] font-mono text-zinc-600 dark:text-[#8a8380]">
            <span className="tracking-wide">Varna · UTC+2</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-[3px] border border-[#3d3a39]/80 dark:border-white/10 bg-zinc-100/70 dark:bg-[#eeeeee]/[0.03] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`px-3 py-1 text-xs font-mono transition-all rounded-[3px] ${
                  isActive
                    ? 'bg-[#1d1a18] text-white dark:bg-[#eeeeee] dark:text-black font-semibold shadow-none'
                    : 'text-zinc-600 dark:text-[#8a8380] hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#eeeeee]/5'
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[3px] border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30 hover:bg-zinc-100 dark:hover:bg-[#eeeeee]/5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[3px] border border-[#3d3a39] dark:border-white/10 text-zinc-600 dark:text-[#8a8380] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#eeeeee]/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — overlay: floats above content, never pushes it */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 z-30 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed top-16 left-0 right-0 z-40 px-4 pt-3 pb-5 space-y-3 bg-[#101010] border-b border-[#3d3a39]">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3 py-2 rounded-[3px] text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-[#1d1a18] text-white dark:bg-[#eeeeee] dark:text-black font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#eeeeee]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#3d3a39] dark:border-white/10 flex items-center justify-between">
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[3px] border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#eeeeee]/5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] border border-[#ee6018]/20 bg-[#ee6018]/10 text-[10px] font-mono text-[#ee6018] dark:text-[#ee6018]">
              <span className="w-1.5 h-1.5 rounded-[3px] bg-[#ee6018] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>
        </>
      )}
    </header>
  );
};
