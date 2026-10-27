import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { PageRoute, Project } from './types';
import { projects } from './data/projects';
import { parseRoute, parseProjectSlug, getProjectBySlug } from './utils/routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AssembleIntro } from './components/AssembleIntro';
import { LiveGrid } from './components/LiveGrid';
import { RouteLoader, ModalLoader } from './components/RouteLoader';
import { AnimatePresence } from 'framer-motion';

// Code-split page views and modal to optimize initial bundle size
const HomeView = lazy(() => import('./views/HomeView'));
const AboutView = lazy(() => import('./views/AboutView'));
const ProjectsView = lazy(() => import('./views/ProjectsView'));
const ContactsView = lazy(() => import('./views/ContactsView'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

function parseRouteFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'welcome';

  // Check query parameter redirect first (e.g. from 404.html redirect /?p=/about)
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get('p');
  if (p) {
    const cleaned = p.replace(/^\//, '').replace(/\/$/, '');
    if (['about', 'projects', 'contacts'].includes(cleaned)) {
      urlParams.delete('p');
      const remaining = urlParams.toString();
      const target = `/${cleaned}/${remaining ? `?${remaining}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', target);
      return cleaned as PageRoute;
    }
    // If ?p=slug where slug matches one of our projects
    if (projects.some((proj) => proj.slug.toLowerCase() === cleaned.toLowerCase())) {
      urlParams.delete('p');
      urlParams.set('project', cleaned);
      const remaining = urlParams.toString();
      const target = `/projects/${remaining ? `?${remaining}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', target);
      return 'projects';
    }
  }

  return parseRoute({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });
}

function parseProjectFromLocation(): Project | null {
  if (typeof window === 'undefined') return null;
  const slug = parseProjectSlug({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });
  return slug ? getProjectBySlug(slug) ?? null : null;
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseRouteFromLocation);
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    const route = parseRouteFromLocation();
    if (route === 'projects') {
      return parseProjectFromLocation();
    }
    return null;
  });
  const [assembleDone, setAssembleDone] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const userPref = localStorage.getItem('yk:animations:user');
    if (userPref !== null) {
      return localStorage.getItem('yk:animations:enabled') !== '0';
    }
    // Auto-detect: disable on reduced motion, low-end devices, or data-saver.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean };
    };
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 2) return false;
    if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 2) return false;
    if (nav.connection && nav.connection.saveData) return false;
    return true;
  });
  const [assembleReplayKey, setAssembleReplayKey] = useState(0);
  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('yk:animations:user', '1');
      localStorage.setItem('yk:animations:enabled', next ? '1' : '0');
      // When turning animations back on, replay the assemble intro.
      if (next) {
        sessionStorage.removeItem('yk:assemble:played:v1');
        setAssembleReplayKey((k) => k + 1);
      }
      return next;
    });
  }, []);
  const [modalLoaded, setModalLoaded] = useState<boolean>(() => {
    const route = parseRouteFromLocation();
    if (route === 'projects') {
      return parseProjectFromLocation() !== null;
    }
    return false;
  });

  // Theme synchronization: always dark.
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  // History Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation();
      setCurrentRoute(route);
      if (route === 'projects') {
        const proj = parseProjectFromLocation();
        setSelectedProject(proj);
        if (proj) {
          setModalLoaded(true);
        }
      } else {
        setSelectedProject(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAssembleComplete = useCallback(() => setAssembleDone(true), []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    const targetPath = route === 'welcome' ? '/' : `/${route}/`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    if (route !== 'projects' && selectedProject) {
      setSelectedProject(null);
    }
  };

  const handleSelectProject = (project: Project) => {
    setModalLoaded(true);
    setSelectedProject(project);

    const url = new URL(window.location.href);
    url.searchParams.set('project', project.slug);
    url.searchParams.delete('p');
    window.history.pushState({ projectSlug: project.slug }, '', url.pathname + (url.search || '') + (url.hash || ''));
  };

  const handleCloseModal = () => {
    setSelectedProject(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    url.searchParams.delete('p');
    const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    if (projects.some((p) => p.slug.toLowerCase() === hash.toLowerCase())) {
      url.hash = '';
    }
    window.history.pushState(null, '', url.pathname + (url.search || '') + (url.hash || ''));
  };

  useEffect(() => {
    if (selectedProject) {
      setModalLoaded(true);
    }
  }, [selectedProject]);

  // Enable live grid once assemble has completed (or when not on home).
  useEffect(() => {
    if (sessionStorage.getItem('yk:assemble:played:v1') === '1') {
      setAssembleDone(true);
    }
  }, []);

  useEffect(() => {
    if (currentRoute !== 'welcome') {
      setAssembleDone(true);
    }
  }, [currentRoute]);

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

  // Prefetch remaining views on idle so subsequent clicks transition instantly
  useEffect(() => {
    const prefetchRoutes = () => {
      import('./views/HomeView');
      import('./views/AboutView');
      import('./views/ProjectsView');
      import('./views/ContactsView');
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleWindow = window as unknown as {
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback: (id: number) => void;
      };
      const handle = idleWindow.requestIdleCallback(prefetchRoutes, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(prefetchRoutes, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // When user is on projects view, prefetch ProjectModal chunk so card clicks are instant
  useEffect(() => {
    if (currentRoute === 'projects') {
      import('./components/ProjectModal');
    }
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#101010] text-[#eeeeee] tech-grid transition-colors">
      <LiveGrid enabled={assembleDone && animationsEnabled} />
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        animationsEnabled={animationsEnabled}
        onToggleAnimations={toggleAnimations}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <Suspense fallback={<RouteLoader />}>
          <AnimatePresence mode="wait">
            {currentRoute === 'welcome' && (
              <HomeView key="welcome" onNavigate={navigateTo} />
            )}
            {currentRoute === 'about' && <AboutView key="about" />}
            {currentRoute === 'projects' && (
              <ProjectsView
                key="projects"
                onSelectProject={handleSelectProject}
                initialProjectSlug={selectedProject?.slug}
              />
            )}
            {currentRoute === 'contacts' && <ContactsView key="contacts" />}
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />

      <AssembleIntro
        key={`${assembleReplayKey}-${currentRoute}`}
        enabled={animationsEnabled}
        onComplete={handleAssembleComplete}
      />

      {modalLoaded && (
        <Suspense fallback={<ModalLoader />}>
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
