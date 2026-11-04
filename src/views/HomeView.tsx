import React from "react";
import { PageRoute, Project } from "../types";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { GithubLivePulse } from "../components/GithubLivePulse";
import { getLocalizedProjects } from "../data/projects";
import { GithubIcon } from "../components/Icons";

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProject?: (project: Project) => void;
}

interface DirectoryModule {
  index: string;
  route: PageRoute;
  title: string;
  tag: string;
  description: string;
  meta: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  const { locale, t } = useLanguage();
  const localizedProjects = getLocalizedProjects(locale);
  const featuredProjects = localizedProjects.filter(
    (p) => p.id === 1 || p.id === 2 || p.id === 5,
  );

  const directoryModules: DirectoryModule[] = [
    {
      index: "01",
      route: "about",
      title: t.home.dirAboutTitle,
      tag: t.home.dirAboutTag,
      description: t.home.dirAboutDesc,
      meta: "JS · React · TS · Python · REST APIs",
    },
    {
      index: "02",
      route: "projects",
      title: t.home.dirProjectsTitle,
      tag: t.home.dirProjectsTag,
      description: t.home.dirProjectsDesc,
      meta: "Full-stack · Python · Swift · pandas",
    },
    {
      index: "03",
      route: "contacts",
      title: t.home.dirContactsTitle,
      tag: t.home.dirContactsTag,
      description: t.home.dirContactsDesc,
      meta: t.home.dirContactsMeta,
    },
  ];

  const handleOpenProject = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      onNavigate("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="pt-4 sm:pt-10 pb-2 space-y-6">
        {/* Eyebrow badge with live status and GitHub pulse telemetry */}
        <div data-assemble="1" className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-control border border-signal/25 bg-signal/10 text-[11px] font-mono text-signal">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-[2px] bg-signal opacity-75" />
              <span className="relative inline-flex rounded-[2px] h-2 w-2 bg-signal" />
            </span>
            <span className="font-semibold tracking-wider uppercase">
              {t.home.badge}
            </span>
          </div>

          <GithubLivePulse />
        </div>

        {/* Balanced Industrial Hero Headline */}
        <h1
          data-assemble="2"
          className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.032em] text-chalk leading-[1.1] max-w-4xl"
        >
          {t.home.titleStart}
          <span className="text-granite font-medium">
            {t.home.titleHighlight}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p
          data-assemble="3"
          className="text-base sm:text-lg text-stone max-w-3xl leading-relaxed"
        >
          {t.home.description}
        </p>

        {/* Quick Navigation CTAs */}
        <div
          data-assemble="4"
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <button
            onClick={() => {
              onNavigate("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control bg-bone text-canvas font-mono text-xs sm:text-sm font-semibold hover:bg-chalk transition-all group"
          >
            <span>{t.home.btnAbout}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              onNavigate("projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control border border-stroke bg-surface/80 text-bone font-mono text-xs sm:text-sm font-medium hover:bg-stroke/40 hover:border-graphite transition-all group"
          >
            <span>{t.home.btnProjects}</span>
            <ArrowUpRight className="w-4 h-4 text-granite group-hover:text-bone group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Engineering Stack / Meta-spec Row */}
        <div
          data-assemble="5"
          className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] font-mono text-granite border-t border-stroke/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[2px] bg-signal" />
            <span>JavaScript · React · TypeScript · Python</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[2px] bg-signal" />
            <span>REST APIs · Supabase · PostgreSQL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[2px] bg-metric" />
            <span className="text-stone">{t.home.openToWork}</span>
          </div>
        </div>
      </section>

      {/* Selected Work Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stroke pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-bone">
              {t.home.featuredTitle}
            </span>
            <span className="font-mono text-[10px] text-granite">
              {t.home.featuredCount}
            </span>
          </div>

          <button
            onClick={() => {
              onNavigate("projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1 font-mono text-xs text-signal hover:text-bone transition-colors"
          >
            <span>{t.home.viewAllProjects}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project, idx) => {
            const isLive = project.badge === "Live Service";
            const projectTag = String(project.id).padStart(2, "0");

            return (
              <article
                key={project.slug}
                data-assemble={String(6 + idx)}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenProject(project);
                  }
                }}
                className="glass-panel glass-panel-interactive group relative p-5 flex flex-col justify-between cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                {/* Top subtle signal accent line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-signal/45 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3.5">
                  {/* Top telemetry row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-granite">
                      {projectTag}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-control border ${
                        isLive
                          ? "bg-signal/10 text-signal border-signal/30"
                          : "bg-stroke/30 text-stone border-stroke"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-[2px] ${
                          isLive ? "bg-signal" : "bg-metric"
                        }`}
                      />
                      <span>
                        {isLive
                          ? t.projects.statusLive
                          : t.projects.statusOpenSource}
                      </span>
                    </span>
                  </div>

                  {/* Visual preview or architecture plate */}
                  {project.image ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-control border border-stroke bg-canvas">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full rounded-control border border-stroke bg-canvas/80 p-3.5 flex flex-col justify-between font-mono">
                      <div className="flex items-center justify-between text-[10px] text-granite border-b border-stroke/60 pb-2">
                        <span className="inline-flex items-center gap-1.5 text-stone font-semibold">
                          <Layers className="w-3 h-3 text-signal" />
                          <span>AST · PYTEST ENGINE</span>
                        </span>
                        <span className="text-metric">03 LAYERS</span>
                      </div>
                      <div className="space-y-1.5 my-auto">
                        {(project.architecture ?? [])
                          .slice(0, 3)
                          .map((layer, lIdx) => (
                            <div
                              key={lIdx}
                              className="text-[10px] text-stone truncate flex items-center gap-1.5"
                            >
                              <span className="text-signal font-bold">
                                0{lIdx + 1}
                              </span>
                              <span className="truncate">{layer}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Title & concise description */}
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-bone group-hover:text-signal transition-colors flex items-center justify-between gap-2">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-granite group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </h2>
                    <p className="text-xs font-medium text-granite mt-0.5 line-clamp-1">
                      {project.subtitle}
                    </p>
                    <p className="mt-2 text-xs text-stone leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer with top tech pills & quick links */}
                <div className="mt-4 pt-3 border-t border-stroke/70 space-y-2.5">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((techItem) => (
                      <span
                        key={techItem}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-control bg-canvas/60 border border-stroke text-stone"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between text-[11px] font-mono pt-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-signal hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{t.projects.demoBtn}</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone hover:text-bone transition-colors"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>{t.projects.codeBtn}</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenProject(project)}
                      className="text-bone group-hover:text-signal transition-colors font-medium"
                    >
                      {t.home.openDossier}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Directory Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stroke pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-bone">
              {t.home.sectionsTitle}
            </span>
            <span className="font-mono text-[10px] text-granite">
              {t.home.sectionsCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directoryModules.map((card, i) => (
            <div
              key={card.route}
              data-assemble={String(9 + i)}
              role="button"
              tabIndex={0}
              onClick={() => {
                onNavigate(card.route);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNavigate(card.route);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="glass-panel glass-panel-interactive group relative p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-signal">
                      [{card.index}]
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-granite">
                      {card.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-granite group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="text-base sm:text-lg font-bold font-mono text-bone group-hover:text-signal transition-colors">
                  {card.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-stone leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stroke/60 flex items-center justify-between text-[11px] font-mono text-granite">
                <span className="truncate">{card.meta}</span>
                <span className="text-signal shrink-0 ml-2 font-medium">
                  {t.home.openSection}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomeView;
