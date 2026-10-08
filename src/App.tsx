import React, { useState, useEffect } from 'react';
import { PageRoute, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { ResearchView } from './views/ResearchView';
import { ContactsView } from './views/ContactsView';
import { AnimatePresence } from 'framer-motion';

function parseRouteFromLocation(): PageRoute {
  // Check query parameter redirect first (e.g. from 404.html redirect /?p=/about)
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get('p');
  if (p) {
    const cleaned = p.replace(/^\//, '').replace(/\/$/, '');
    if (['about', 'projects', 'research', 'contacts'].includes(cleaned)) {
      window.history.replaceState(null, '', `/${cleaned}/`);
      return cleaned as PageRoute;
    }
  }

  // Check hash fallback
  if (window.location.hash) {
    const hashRoute = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    if (['about', 'projects', 'research', 'contacts'].includes(hashRoute)) {
      return hashRoute as PageRoute;
    }
  }

  // Check pathname
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (path.startsWith('about')) return 'about';
  if (path.startsWith('projects')) return 'projects';
  if (path.startsWith('research')) return 'research';
  if (path.startsWith('contacts')) return 'contacts';
  return 'welcome';
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseRouteFromLocation());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Theme synchronization
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // History Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    const targetPath = route === 'welcome' ? '/' : `/${route}/`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {currentRoute === 'welcome' && (
            <HomeView key="welcome" onNavigate={navigateTo} />
          )}
          {currentRoute === 'about' && <AboutView key="about" />}
          {currentRoute === 'projects' && (
            <ProjectsView
              key="projects"
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}
          {currentRoute === 'research' && <ResearchView key="research" />}
          {currentRoute === 'contacts' && <ContactsView key="contacts" />}
        </AnimatePresence>
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default App;
