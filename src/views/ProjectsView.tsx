import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalizedProjects } from "../data/projects";
import { parseProjectSlug } from "../utils/routes";
import { Project, ProjectCategory } from "../types";
import {
  ExternalLink,
  Filter,
  ArrowUpRight,
  Layers,
  Cpu,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "../components/Icons";
import { VideoPreview } from "../components/VideoPreview";
import { useLanguage } from "../i18n/LanguageContext";

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
  initialProjectSlug?: string | null;
}

type FilterCategory = "all" | "fullstack" | "ai" | "desktop" | "systems";

const VALID_FILTERS: FilterCategory[] = [
  "all",
  "fullstack",
  "ai",
  "desktop",
  "systems",
];

const getInitialFilter = (): FilterCategory => {
  if (typeof window === "undefined") return "all";
  const params = new URLSearchParams(window.location.search);
  const filterParam = params.get("filter");
  if (filterParam && VALID_FILTERS.includes(filterParam as FilterCategory)) {
    return filterParam as FilterCategory;
  }
  return "all";
};

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onSelectProject,
  initialProjectSlug,
}) => {
  const { locale, t } = useLanguage();
  const localizedProjects = getLocalizedProjects(locale);
  const [activeFilter, setActiveFilter] =
    useState<FilterCategory>(getInitialFilter);

  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", category);
    }
    window.history.pushState(
      null,
      "",
      url.pathname + (url.search || "") + (url.hash || ""),
    );
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get("filter");
      if (
        filterParam &&
        VALID_FILTERS.includes(filterParam as FilterCategory)
      ) {
        setActiveFilter(filterParam as FilterCategory);
      } else {
        setActiveFilter("all");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug =
        initialProjectSlug ||
        parseProjectSlug({
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
        });
      if (slug) {
        const found = localizedProjects.find(
          (p) => p.slug.toLowerCase() === slug.toLowerCase(),
        );
        if (found) {
          onSelectProject(found);
        }
      }
    }
  }, [initialProjectSlug, onSelectProject, localizedProjects]);

  const filterOptions: { id: FilterCategory; label: string }[] = [
    { id: "all", label: t.projects.filterAll },
    { id: "fullstack", label: t.projects.filterFullstack },
    { id: "ai", label: t.projects.filterAi },
    { id: "desktop", label: t.projects.filterDesktop },
    { id: "systems", label: t.projects.filterSystems },
  ];

  const matchesCategory = (
    project: Project,
    category: FilterCategory,
  ): boolean => {
    if (category === "all") return true;
    if (category === "systems") {
      return project.tech.some((techName) =>
        ["pytest", "Flask", "pywebview"].includes(techName),
      );
    }
    return project.categories.includes(category as ProjectCategory);
  };

  const filteredProjects = localizedProjects.filter((project) =>
    matchesCategory(project, activeFilter),
  );

  const getFilterCount = (category: FilterCategory): number => {
    return localizedProjects.filter((p) => matchesCategory(p, category)).length;
  };

  const getStatusBadge = (badge: string) => {
    switch (badge) {
      case "Live Service":
        return {
          label: t.projects.statusLive,
          className: "bg-signal/10 text-signal border-signal/30",
          dotClass: "bg-signal",
        };
      case "In Progress":
        return {
          label: t.projects.statusInProgress,
          className: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          dotClass: "bg-amber-500",
        };
      case "Open Source":
        return {
          label: t.projects.statusOpenSource,
          className: "bg-stroke/35 text-stone border-stroke",
          dotClass: "bg-metric",
        };
      default:
        return {
          label: badge.toUpperCase(),
          className: "bg-stroke/35 text-stone border-stroke",
          dotClass: "bg-granite",
        };
    }
  };

  // Wide cards only on 'all' — filters always render a uniform grid with no holes.
  const isFlagship = (project: Project): boolean => {
    if (activeFilter !== "all") return false;
    return project.id === 1 || project.id === 2 || project.id === 5;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-10"
    >
      {/* Header Section */}
      <section data-assemble="1" className="space-y-4 pt-2">
        {/* System Registry Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control border border-signal/25 bg-signal/10 text-[11px] font-mono text-signal">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-signal" />
            <span className="font-semibold tracking-wider uppercase">
              {t.projects.badge}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-granite">
            <span className="hidden sm:inline">
              {localizedProjects.length} {t.projects.projectsCount}
            </span>
          </div>
        </div>

        {/* Title and Engineering Description */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-chalk">
            {t.projects.title}
          </h1>
          <p className="text-sm sm:text-base text-stone max-w-3xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="pt-2 flex items-center gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-granite mr-1 flex-shrink-0" />
          {filterOptions.map((opt) => {
            const count = getFilterCount(opt.id);
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleFilterChange(opt.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-control text-xs font-mono transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-bone text-canvas border-bone font-semibold"
                    : "bg-surface/70 text-granite border-stroke hover:border-graphite hover:text-bone"
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-[2px] ${
                    isActive
                      ? "bg-canvas/15 text-canvas"
                      : "bg-stroke text-stone"
                  }`}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div
          data-assemble="2"
          className="glass-panel p-12 text-center space-y-3"
        >
          <p className="text-base font-semibold text-bone">
            {t.projects.emptyTitle}
          </p>
          <p className="text-xs font-mono text-granite max-w-sm mx-auto">
            {t.projects.emptySubtitle}
          </p>
          <button
            onClick={() => handleFilterChange("all")}
            className="mt-2 text-xs font-mono px-3 py-1.5 rounded-control border border-stroke text-bone hover:bg-stroke/40 transition-colors"
          >
            {t.projects.showAllBtn}
          </button>
        </div>
      ) : (
        <div
          data-assemble="2"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isFeatured = isFlagship(project);
              const status = getStatusBadge(project.badge);
              const projectTag = String(project.id).padStart(2, "0");

              if (isFeatured) {
                // FLAGSHIP PROMINENT WIDE CARD (single action bar at bottom, no duplicate top buttons)
                return (
                  <motion.article
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onSelectProject(project)}
                    className="group md:col-span-2 glass-panel glass-panel-interactive p-6 sm:p-8 cursor-pointer relative overflow-hidden"
                  >
                    {/* Subtle Top Ambient Lighting Accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-signal/55 to-transparent" />

                    {/* Header Row: Telemetry Badges & Category Indicator */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-control bg-bone text-canvas">
                          {t.projects.featuredBadge}
                        </span>
                        <span className="font-mono text-xs text-granite">
                          {projectTag}
                        </span>
                        <div
                          className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-control border ${status.className}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-[2px] ${status.dotClass}`}
                          />
                          <span>{status.label}</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-granite">
                        {project.categories.map((cat) => (
                          <span
                            key={cat}
                            className="uppercase tracking-wider px-2 py-0.5 rounded-control border border-stroke/80 bg-canvas/50 text-stone"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="mb-6">
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-chalk group-hover:text-signal transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm sm:text-base font-medium text-stone mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Asymmetric 2-Column Specs Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                      {/* Left Column: Scope & Capabilities */}
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-sm text-stone leading-relaxed">
                          {project.description}
                        </p>

                        {(project.video || project.image) && (
                          <VideoPreview
                            src={project.video ?? project.image ?? ""}
                            webm={project.webm}
                            poster={project.image}
                            alt={`${project.title} screenshot`}
                          />
                        )}
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-granite flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-signal" />
                            {t.projects.highlightsLabel}
                          </span>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-stone">
                            {project.features.slice(0, 4).map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-granite font-mono text-xs mt-0.5">
                                  ▸
                                </span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column: Architecture Breakdown Plate */}
                      <div className="lg:col-span-5 bg-canvas/65 border border-stroke rounded-panel p-4 sm:p-5 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-stroke/60">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-bone flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-signal" />
                              {t.projects.stackOverviewLabel}
                            </span>
                            <span className="font-mono text-[10px] text-granite">
                              {project.architecture
                                ? `${project.architecture.length} ${t.projects.layersSuffix}`
                                : ""}
                            </span>
                          </div>

                          {project.architecture ? (
                            <div className="space-y-2">
                              {project.architecture.map((arch, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="text-[11px] font-mono text-stone flex items-start gap-2 bg-surface/50 p-2.5 rounded-control border border-stroke/70"
                                >
                                  <span className="text-signal font-bold">
                                    0{aIdx + 1}
                                  </span>
                                  <span className="leading-tight">{arch}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs font-mono text-granite space-y-2">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-3.5 h-3.5 text-signal" />
                                <span>Modular Component Architecture</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-granite" />
                                <span>Strict Separation of Concerns</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Flagship Marker */}
                        <div className="pt-2 border-t border-stroke/60 flex items-center justify-between font-mono text-[10px] text-granite">
                          <span>{t.projects.featuredMarker}</span>
                          <span className="text-metric">VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    {/* Single Unified Bottom Tech Pills & Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stroke">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-granite mr-1">
                          {t.projects.stackPrefix}
                        </span>
                        {project.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-control bg-canvas/70 border border-stroke text-stone"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex flex-wrap items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-mono border border-signal/40 bg-signal/10 text-signal hover:bg-signal/20 transition-all font-medium"
                            title="Visit live production service"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{t.projects.liveDemoBtn}</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-mono border border-stroke bg-canvas/60 text-stone hover:text-bone hover:border-graphite transition-all"
                            title="View GitHub repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>{t.projects.codeBtn}</span>
                          </a>
                        )}
                        <button
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1 text-xs font-mono font-semibold px-3.5 py-1.5 rounded-control bg-bone text-canvas hover:bg-chalk transition-colors"
                        >
                          <span>{t.projects.viewDossier}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              // COMPACT STRUCTURED CARDS FOR ALL OTHER PROJECTS
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectProject(project)}
                  className="group glass-panel glass-panel-interactive p-5 sm:p-6 cursor-pointer flex flex-col justify-between space-y-4"
                >
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-granite">
                        {projectTag}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-control border ${status.className}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-[2px] ${status.dotClass}`}
                        />
                        <span>{status.label}</span>
                      </div>
                    </div>

                    {(project.video || project.image) && (
                      <VideoPreview
                        src={project.video ?? project.image ?? ""}
                        webm={project.webm}
                        poster={project.image}
                        alt={`${project.title} demo`}
                      />
                    )}

                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.025em] text-bone group-hover:text-signal transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-granite mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Bullet points summary */}
                    <ul className="space-y-1 text-xs text-granite pt-1">
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-1.5 line-clamp-1"
                        >
                          <span className="text-granite font-mono">▸</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer with Tech & Actions */}
                  <div className="space-y-3 pt-3 border-t border-stroke">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((techItem) => (
                        <span
                          key={techItem}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-control bg-canvas/70 border border-stroke text-stone"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex flex-wrap items-center justify-between gap-2 pt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control text-xs font-mono border border-signal/35 bg-signal/10 text-signal hover:bg-signal/20 transition-all font-medium"
                            title="Visit live site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{t.projects.demoBtn}</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control text-xs font-mono border border-stroke bg-canvas/60 text-stone hover:text-bone hover:border-graphite transition-all"
                            title="View GitHub repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>{t.projects.codeBtn}</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-stone hover:text-bone transition-colors ml-auto font-medium"
                      >
                        <span>{t.projects.detailsBtn}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsView;
