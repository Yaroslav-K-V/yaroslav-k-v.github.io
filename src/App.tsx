import React, { useState, useEffect } from 'react';
import { PageRoute, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { ContactsView } from './views/ContactsView';
import { AnimatePresence } from 'framer-motion';

function parseRouteFromLocation(): PageRoute {
  // Check query parameter redirect first (e.g. from 404.html redirect /?p=/about)
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get('p');
  if (p) {
    const cleaned = p.replace(/^\//, '').replace(/\/$/, '');
    if (['about', 'projects', 'contacts'].includes(cleaned)) {
      window.history.replaceState(null, '', `/${cleaned}/`);
      return cleaned as PageRoute;
    }
  }

  // Check hash fallback
  if (window.location.hash) {
    const hashRoute = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    if (['about', 'projects', 'contacts'].includes(hashRoute)) {
      return hashRoute as PageRoute;
    }
  }

  // Check pathname
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (path.startsWith('about')) return 'about';
  if (path.startsWith('projects')) return 'projects';
  if (path.startsWith('contacts')) return 'contacts';
  return 'welcome';
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseRouteFromLocation());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Factory theme is dark-only.
  const [isDark] = useState<boolean>(true);

  // Theme synchronization: always dark.
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

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

  // Per-route document titles.
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      welcome: 'Yaroslav Krupoder — Junior Web Developer',
      about: 'About — Yaroslav Krupoder',
      projects: 'Projects — Yaroslav Krupoder',
      contacts: 'Contacts — Yaroslav Krupoder'
    };
    document.title = titles[currentRoute];
  }, [currentRoute]);

  const toggleTheme = () => {
    // No-op: Factory theme is dark-only.
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101010] text-[#eeeeee] tech-grid transition-colors">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
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
