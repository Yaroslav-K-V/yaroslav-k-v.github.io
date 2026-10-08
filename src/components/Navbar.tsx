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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#0f172a]/85 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Name / Brand */}
        <button
          onClick={() => handleNavClick('welcome')}
          className="text-left font-semibold text-base sm:text-lg tracking-tight text-gray-900 dark:text-gray-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          Yaroslav Krupoder
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`text-sm transition-colors py-1 ${
                  isActive
                    ? 'font-semibold text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-700 dark:border-emerald-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Theme */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href={contactsData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-emerald-700 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-400 dark:hover:text-gray-950 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-emerald-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNavClick(item.route)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentRoute === item.route
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium rounded-md border border-emerald-700 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
