import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { PageRoute, Project } from "./types";
import { projects } from "./data/projects";
import { parseRoute, parseProjectSlug, getProjectBySlug } from "./utils/routes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AssembleIntro } from "./components/AssembleIntro";
import { LiveGrid } from "./components/LiveGrid";
import { RouteLoader, ModalLoader } from "./components/RouteLoader";
import { CommandPalette } from "./components/CommandPalette";
import { CvPreviewModal } from "./components/CvPreviewModal";
import { AnimatePresence } from "framer-motion";

// Code-split page views and modal to optimize initial bundle size
const HomeView = lazy(() => import("./views/HomeView"));
const AboutView = lazy(() => import("./views/AboutView"));
const ProjectsView = lazy(() => import("./views/ProjectsView"));
const ContactsView = lazy(() => import("./views/ContactsView"));
const ProjectModal = lazy(() => import("./components/ProjectModal"));

function parseRouteFromLocation(): PageRoute {
  if (typeof window === "undefined") return "welcome";

  // Check query parameter redirect first (e.g. from 404.html redirect /?p=/about)
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get("p");
  if (p) {
    const cleaned = p.replace(/^\//, "").replace(/\/$/, "");
    if (cleaned === "welcome") {
      urlParams.delete("p");
      const remaining = urlParams.toString();
      const target = `/${remaining ? `?${remaining}` : ""}${window.location.hash}`;
      window.history.replaceState(null, "", target);
      return "welcome";
    }
    if (["about", "projects", "contacts"].includes(cleaned)) {
      urlParams.delete("p");
      const remaining = urlParams.toString();
      const target = `/${cleaned}/${remaining ? `?${remaining}` : ""}${window.location.hash}`;
      window.history.replaceState(null, "", target);
      return cleaned as PageRoute;
    }
    const slugCandidate = cleaned.toLowerCase().startsWith("projects/")
      ? cleaned.slice("projects/".length)
      : cleaned;
    const matchedProject = projects.find(
      (proj) => proj.slug.toLowerCase() === slugCandidate.toLowerCase(),
    );
    // If ?p=slug or ?p=/projects/slug matches one of our projects, use canonical /projects/<slug>/
    if (matchedProject) {
      urlParams.delete("p");
      urlParams.delete("project");
      const remaining = urlParams.toString();
      const target = `/projects/${matchedProject.slug}/${remaining ? `?${remaining}` : ""}${window.location.hash}`;
      window.history.replaceState(null, "", target);
      return "projects";
    }
    // Unknown ?p= value: strip it from address bar so invalid query does not linger
    urlParams.delete("p");
    const remaining = urlParams.toString();
    const cleanTarget = `${window.location.pathname}${remaining ? `?${remaining}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", cleanTarget);
  }

  return parseRoute({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });
}

function parseProjectFromLocation(): Project | null {
  if (typeof window === "undefined") return null;
  const slug = parseProjectSlug({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  });
  return slug ? (getProjectBySlug(slug) ?? null) : null;
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(
    parseRouteFromLocation,
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    const route = parseRouteFromLocation();
    if (route === "projects") {
      return parseProjectFromLocation();
    }
    return null;
  });
  const [assembleDone, setAssembleDone] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const userPref = localStorage.getItem("yk:animations:user");
    if (userPref !== null) {
      return localStorage.getItem("yk:animations:enabled") !== "0";
    }
    // Auto-detect: disable on reduced motion, low-end devices, or data-saver.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean };
    };
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2)
      return false;
    if (
      typeof nav.hardwareConcurrency === "number" &&
      nav.hardwareConcurrency < 2
    )
      return false;
    if (nav.connection && nav.connection.saveData) return false;
    return true;
  });
  const [assembleReplayKey, setAssembleReplayKey] = useState(0);
  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("yk:animations:user", "1");
      localStorage.setItem("yk:animations:enabled", next ? "1" : "0");
      // When turning animations back on, replay the assemble intro.
      if (next) {
        sessionStorage.removeItem("yk:assemble:played:v1");
        setAssembleReplayKey((k) => k + 1);
      }
      return next;
    });
  }, []);
  const [modalLoaded, setModalLoaded] = useState<boolean>(() => {
    const route = parseRouteFromLocation();
    if (route === "projects") {
      return parseProjectFromLocation() !== null;
    }
    return false;
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Linear-style radial cursor spotlight on .glass-panel-interactive cards
  useEffect(() => {
    if (!animationsEnabled) return;
    const handlePointerMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".glass-panel-interactive",
      );
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [animationsEnabled]);

  // Theme synchronization: always dark.
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // History Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation();
      setCurrentRoute(route);
      if (route === "projects") {
        const proj = parseProjectFromLocation();
        setSelectedProject(proj);
        if (proj) {
          setModalLoaded(true);
        }
      } else {
        setSelectedProject(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleAssembleComplete = useCallback(() => setAssembleDone(true), []);

  useEffect(() => {
    const handler = () => {
      const slug =
        window.location.pathname.split("/").filter(Boolean).join("-") || "home";
      sessionStorage.removeItem(`yk:assemble:played:v1:${slug}`);
      setAssembleReplayKey((k) => k + 1);
    };
    window.addEventListener("yk:replay-assemble", handler);
    return () => window.removeEventListener("yk:replay-assemble", handler);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    const targetPath = route === "welcome" ? "/" : `/${route}/`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, "", targetPath);
    }
    if (route !== "projects" && selectedProject) {
      setSelectedProject(null);
    }
  };

  const handleSelectProject = useCallback((project: Project) => {
    setModalLoaded(true);
    setSelectedProject(project);

    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    url.searchParams.delete("p");
    const targetPath = `/projects/${project.slug}/`;
    const nextUrl = targetPath + (url.search || "") + (url.hash || "");
    if (
      window.location.pathname +
        window.location.search +
        window.location.hash !==
      nextUrl
    ) {
      window.history.pushState({ projectSlug: project.slug }, "", nextUrl);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    url.searchParams.delete("p");
    const hash = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
    if (projects.some((p) => p.slug.toLowerCase() === hash.toLowerCase())) {
      url.hash = "";
    }
    const targetPath =
      currentRoute === "welcome"
        ? "/"
        : url.pathname.startsWith("/projects")
          ? "/projects/"
          : url.pathname;
    window.history.pushState(
      null,
      "",
      targetPath + (url.search || "") + (url.hash || ""),
    );
  }, [currentRoute]);

  useEffect(() => {
    if (selectedProject) {
      setModalLoaded(true);
    }
  }, [selectedProject]);

  // Enable live grid once assemble has completed (or when not on home).
  useEffect(() => {
    if (sessionStorage.getItem("yk:assemble:played:v1") === "1") {
      setAssembleDone(true);
    }
  }, []);

  useEffect(() => {
    if (currentRoute !== "welcome") {
      setAssembleDone(true);
    }
  }, [currentRoute]);

  // Per-route document titles (including active project dossier).
  useEffect(() => {
    if (selectedProject) {
      document.title = `${selectedProject.title} — Yaroslav Krupoder`;
      return;
    }
    const titles: Record<PageRoute, string> = {
      welcome: "Yaroslav Krupoder — Junior Web Developer",
      about: "About — Yaroslav Krupoder",
      projects: "Projects — Yaroslav Krupoder",
      contacts: "Contacts — Yaroslav Krupoder",
    };
    document.title = titles[currentRoute];
  }, [currentRoute, selectedProject]);

  // Prefetch remaining views on idle so subsequent clicks transition instantly
  useEffect(() => {
    const prefetchRoutes = () => {
      import("./views/HomeView");
      import("./views/AboutView");
      import("./views/ProjectsView");
      import("./views/ContactsView");
      import("./components/ProjectModal");
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleWindow = window as unknown as {
        requestIdleCallback: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback: (id: number) => void;
      };
      const handle = idleWindow.requestIdleCallback(prefetchRoutes, {
        timeout: 2500,
      });
      return () => idleWindow.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(prefetchRoutes, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // When user is on projects view, prefetch ProjectModal chunk so card clicks are instant
  useEffect(() => {
    if (currentRoute === "projects") {
      import("./components/ProjectModal");
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
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenCvPreview={() => setCvPreviewOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <Suspense fallback={<RouteLoader />}>
          <AnimatePresence mode="wait">
            {currentRoute === "welcome" && (
              <HomeView
                key="welcome"
                onNavigate={navigateTo}
                onSelectProject={handleSelectProject}
              />
            )}
            {currentRoute === "about" && <AboutView key="about" />}
            {currentRoute === "projects" && (
              <ProjectsView
                key="projects"
                onSelectProject={handleSelectProject}
                initialProjectSlug={selectedProject?.slug}
              />
            )}
            {currentRoute === "contacts" && (
              <ContactsView
                key="contacts"
                onOpenCvPreview={() => setCvPreviewOpen(true)}
              />
            )}
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
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        </Suspense>
      )}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={navigateTo}
        onSelectProject={handleSelectProject}
        onOpenCvPreview={() => setCvPreviewOpen(true)}
        animationsEnabled={animationsEnabled}
        onToggleAnimations={toggleAnimations}
      />

      <CvPreviewModal
        isOpen={cvPreviewOpen}
        onClose={() => setCvPreviewOpen(false)}
      />
    </div>
  );
};

export default App;
