import React, { useEffect, useState, useRef } from "react";
import { Project, ProjectBadge, ProjectDossierData } from "../types";
import { getLocalizedProjects } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Layers,
  CheckCircle2,
  Cpu,
  Terminal,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Boxes,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { VideoPreview } from "./VideoPreview";
import { useLanguage } from "../i18n/LanguageContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type ModalTab = "all" | "overview" | "architecture" | "tech" | "metrics";

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const { locale, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ModalTab>("all");
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const activeProject = project
    ? getLocalizedProjects(locale).find((p) => p.slug === project.slug) ||
      project
    : null;

  // Reset tab to 'all' whenever a new project is selected
  useEffect(() => {
    if (project) {
      setActiveTab("all");
    }
  }, [project]);

  // Focus trap, keyboard listeners and focus restoration
  useEffect(() => {
    if (project) {
      // 1. Save previous active element before modal opened
      if (!triggerRef.current) {
        triggerRef.current = document.activeElement as HTMLElement;
      }
      document.body.style.overflow = "hidden";

      // 2. Focus on close button or modal container
      const focusTimer = setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);

      // 3. Tab trap and Escape handler
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCloseRef.current();
          return;
        }

        if (e.key === "Tab" && modalRef.current) {
          const focusableSelector =
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
          const focusables =
            modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
          const focusableElements = Array.from(focusables).filter(
            (el) =>
              el.offsetParent !== null ||
              el.offsetWidth > 0 ||
              el.offsetHeight > 0,
          );

          if (focusableElements.length === 0) {
            e.preventDefault();
            return;
          }

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (
              document.activeElement === firstElement ||
              !modalRef.current.contains(document.activeElement)
            ) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (
              document.activeElement === lastElement ||
              !modalRef.current.contains(document.activeElement)
            ) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(focusTimer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current) {
        const el = triggerRef.current;
        triggerRef.current = null;
        el.focus();
      }
    }
  }, [project]);

  // Ensure scroll lock cleanup and focus return if unmounted while modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    };
  }, []);

  const getStatusBadge = (badge: ProjectBadge) => {
    switch (badge) {
      case "Live Service":
        return {
          label: t.projects.statusLive,
          className: "bg-[#ee6018]/10 text-[#ee6018] border-[#ee6018]/30",
          dotClass: "bg-[#ee6018]",
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
          className: "bg-zinc-500/10 text-zinc-300 border-[#3d3a39]",
          dotClass: "bg-zinc-400",
        };
      default:
        return {
          label: String(badge).toUpperCase(),
          className: "bg-zinc-500/10 text-zinc-300 border-[#3d3a39]",
          dotClass: "bg-zinc-400",
        };
    }
  };

  const getProjectDossier = (p: Project): ProjectDossierData => {
    if (p.dossier) {
      return p.dossier;
    }

    return {
      problemStatement: p.description,
      scopeObjectives: p.features,
      keyDecisions: [
        {
          title: "Scope kept honest",
          reasoning:
            "Only what was actually built or touched — no padding, no borrowed credit.",
        },
        {
          title: "Reviewed and documented",
          reasoning:
            "Code reviewed before shipping; docs written where handover matters.",
        },
      ],
      stackMatrix: [{ category: "Technologies", items: p.tech }],
      metrics: [
        { label: "Status", value: p.badge },
        { label: "Stack", value: p.tech.slice(0, 3).join(" · ") },
      ],
      architectureLayers: p.architecture
        ? p.architecture.map((a, i) => ({ name: `Layer 0${i + 1}`, detail: a }))
        : [
            {
              name: "Core Architecture",
              detail:
                "Structured modular codebase with isolated service responsibilities.",
            },
          ],
    };
  };

  const dossier = activeProject ? getProjectDossier(activeProject) : null;
  const status = activeProject ? getStatusBadge(activeProject.badge) : null;
  const specNumber = activeProject
    ? String(activeProject.id).padStart(2, "0")
    : "";

  const tabs: { id: ModalTab; label: string }[] = [
    { id: "all", label: t.modal.tabAll },
    { id: "overview", label: `01 · ${t.modal.tabOverview}` },
    { id: "architecture", label: `02 · ${t.modal.tabArchitecture}` },
    { id: "tech", label: `03 · ${t.modal.tabTech}` },
    { id: "metrics", label: `04 · ${t.modal.tabMetrics}` },
  ];

  return (
    <AnimatePresence>
      {activeProject && dossier && status && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
          {/* Backdrop with Deep Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#101010]/80 backdrop-blur-xl transition-opacity"
          />

          {/* Modal Window: Engineering Spec Sheet Dossier */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90dvh] sm:max-h-[88dvh] flex flex-col glass-panel text-bone rounded-t-[12px] sm:rounded-panel border border-stroke backdrop-blur-2xl z-10 overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Dossier Metadata Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 py-3.5 border-b border-stroke bg-canvas/70 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold tracking-wider text-chalk">
                  {specNumber}
                </span>
                <span className="hidden sm:inline text-granite">|</span>
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-control border text-[10px] ${status.className}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-[2px] ${status.dotClass}`}
                  />
                  <span>{status.label}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline text-[11px] text-granite">
                  REV: 2026
                </span>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 px-2.5 py-1 rounded-control text-granite hover:text-bone hover:bg-stroke/40 transition-colors text-xs font-mono"
                  aria-label={t.modal.close}
                >
                  <span>[ESC]</span>
                  <X className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Dossier Header Info & Primary Actions */}
            <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-stroke space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-granite">
                    {t.modal.projectDetailsEyebrow}
                  </span>
                  <h2
                    id="dossier-title"
                    className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-chalk mt-0.5"
                  >
                    {activeProject.title}
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-stone mt-1">
                    {activeProject.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-bone text-canvas font-mono text-xs font-semibold hover:bg-chalk transition-colors"
                    >
                      <span>{t.modal.openService}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control border border-stroke bg-canvas/60 text-bone font-mono text-xs font-medium hover:bg-stroke/40 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{t.modal.openGithub}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div
                className={`grid grid-cols-2 gap-3 pt-2 ${
                  dossier.metrics.length > 2 ? "sm:grid-cols-3" : ""
                }`}
              >
                {dossier.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-control bg-canvas/60 border border-stroke font-mono"
                  >
                    <div className="text-[10px] text-granite uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-xs font-bold text-bone mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 pt-2 pb-1 scrollbar-none border-t border-stroke/60">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-0 rounded-control text-xs font-mono whitespace-nowrap transition-all border ${
                      activeTab === tab.id
                        ? "bg-bone text-canvas border-bone font-semibold"
                        : "bg-transparent text-granite border-transparent hover:text-bone hover:bg-stroke/40"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dossier Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8">
              {/* SECTION 1: PROBLEM STATEMENT & ENGINEERING SCOPE */}
              {(activeTab === "all" || activeTab === "overview") && (
                <section className="space-y-4">
                  {(activeProject.video || activeProject.image) && (
                    <VideoPreview
                      src={activeProject.video ?? activeProject.image ?? ""}
                      webm={activeProject.webm}
                      poster={activeProject.image}
                      alt={`${activeProject.title} demo`}
                    />
                  )}
                  <div className="flex items-center justify-between border-b border-stroke pb-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-signal" />
                      <span>{t.modal.section01Title}</span>
                    </h3>
                  </div>

                  <div className="p-4 rounded-panel bg-canvas/55 border border-stroke/80 space-y-3">
                    <div className="text-xs font-mono text-granite uppercase tracking-wider">
                      {t.modal.problemStatement}
                    </div>
                    <p className="text-sm text-stone leading-relaxed">
                      {dossier.problemStatement}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-mono text-granite uppercase tracking-wider">
                      {t.modal.scopeObjectives}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {dossier.scopeObjectives.map((obj, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-control bg-canvas/55 border border-stroke/80 flex items-start gap-2.5 text-xs text-stone"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-signal flex-shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 2: TECHNICAL ARCHITECTURE & KEY DECISIONS */}
              {(activeTab === "all" || activeTab === "architecture") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stroke pb-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-signal" />
                      <span>{t.modal.section02Title}</span>
                    </h3>
                  </div>

                  {/* Layered System Topology */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-granite uppercase tracking-wider">
                      {t.modal.howItsBuilt}
                    </div>
                    <div className="space-y-2 font-mono">
                      {dossier.architectureLayers.map((layer, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3 rounded-control bg-canvas/55 border border-stroke/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
                        >
                          <div className="flex items-center gap-2 font-bold text-bone">
                            <span className="text-signal">
                              [{String(lIdx + 1).padStart(2, "0")}]
                            </span>
                            <span>{layer.name}</span>
                          </div>
                          <div className="text-stone font-sans sm:font-mono text-xs">
                            {layer.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Technical Decisions & Tradeoffs */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-granite uppercase tracking-wider">
                      {t.modal.keyDecisions}
                    </div>
                    <div className="space-y-2.5">
                      {dossier.keyDecisions.map((dec, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-4 rounded-panel bg-canvas/55 border border-stroke/80 space-y-1.5"
                        >
                          <div className="text-xs font-bold font-mono text-bone flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-signal" />
                            <span>{dec.title}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-stone leading-relaxed pl-5">
                            {dec.reasoning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 3: TECH STACK MATRIX */}
              {(activeTab === "all" || activeTab === "tech") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stroke pb-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                      <Boxes className="w-3.5 h-3.5 text-signal" />
                      <span>{t.modal.section03Title}</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dossier.stackMatrix.map((group, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-4 rounded-panel bg-canvas/55 border border-stroke/80 space-y-2.5"
                      >
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-bone flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-[2px] bg-signal" />
                          <span>{group.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs font-mono px-2.5 py-1 rounded-control bg-surface border border-stroke text-stone"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION 4: RESULTS, CAPABILITIES & METRICS */}
              {(activeTab === "all" || activeTab === "metrics") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stroke pb-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-chalk flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-signal" />
                      <span>{t.modal.section04Title}</span>
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-granite uppercase tracking-wider">
                      {t.modal.checklistLabel}
                    </div>
                    <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                      {activeProject.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-3 rounded-control bg-canvas/55 border border-stroke/80 flex items-start gap-2.5 text-stone"
                        >
                          <ShieldCheck className="w-4 h-4 text-signal flex-shrink-0 mt-0.5" />
                          <span className="font-sans sm:font-mono leading-relaxed">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeProject.note && (
                    <div className="p-4 rounded-panel bg-canvas/70 border border-stroke font-mono text-xs space-y-1">
                      <div className="text-[10px] text-granite uppercase tracking-wider">
                        {t.modal.notesLabel}
                      </div>
                      <p className="text-stone italic">
                        {activeProject.note}
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Dossier Footer Toolbar */}
            <div className="px-5 sm:px-8 py-3.5 border-t border-stroke bg-canvas/70 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-granite">
                <span className="w-2 h-2 rounded-[2px] bg-signal" />
                <span>{t.modal.footerEnd}</span>
              </div>

              <div className="flex items-center gap-3">
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-signal hover:underline"
                  >
                    <span>{t.modal.liveServiceLink}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-stone hover:text-bone hover:underline"
                  >
                    <span>{t.modal.repositoryLink}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-control bg-stroke text-bone hover:bg-graphite transition-colors font-medium"
                >
                  {t.modal.closeBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
