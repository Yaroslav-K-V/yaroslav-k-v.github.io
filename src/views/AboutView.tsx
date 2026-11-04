import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { getCompetencyMatrices, getCertifications } from "../data/skills";
import {
  ExternalLink,
  Cpu,
  GraduationCap,
  Briefcase,
  Terminal,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { AgenticWorkflowDemo } from "../components/AgenticWorkflowDemo";

interface Milestone {
  id: string;
  indexTag: string;
  type: "experience" | "education" | "engineering";
  role: string;
  organization: string;
  location: string;
  program?: string;
  period: string;
  statusText?: string;
  statusType?: "active" | "completed" | "ongoing";
  highlights: string[];
  link?: {
    text: string;
    url: string;
  };
  techBadges: string[];
}

export const AboutView: React.FC = () => {
  const { locale, t } = useLanguage();
  const matrices = getCompetencyMatrices(locale);
  const certs = getCertifications(locale);

  const milestones: Milestone[] = [
    {
      id: "grenergy",
      indexTag: t.about.milestones.grenergy.indexTag,
      type: "experience",
      role: t.about.milestones.grenergy.role,
      organization: t.about.milestones.grenergy.organization,
      location: t.about.milestones.grenergy.location,
      program: t.about.milestones.grenergy.program,
      period: t.about.milestones.grenergy.period,
      highlights: t.about.milestones.grenergy.highlights,
      link: experience[0]?.link,
      techBadges: [
        "Python",
        "TypeScript/JavaScript",
        "REST APIs",
        "OpenRouter",
        "Stripe",
        "Resend",
        "Supabase",
        "PostgreSQL",
        "Chrome Extension",
        "Linux/VPS",
        "CI/CD",
        "Claude Code",
      ],
    },
    {
      id: "university",
      indexTag: t.about.milestones.university.indexTag,
      type: "education",
      role: t.about.milestones.university.role,
      organization: t.about.milestones.university.organization,
      location: t.about.milestones.university.location,
      program: t.about.milestones.university.program,
      period: t.about.milestones.university.period,
      statusText: t.about.milestones.university.statusText,
      statusType: "ongoing",
      highlights: t.about.milestones.university.highlights,
      techBadges: [
        "OOP",
        "Data Structures & Algorithms",
        "Software Design",
        "SDLC",
        "Agile",
      ],
    },
    {
      id: "projects-track",
      indexTag: t.about.milestones.projectsTrack.indexTag,
      type: "engineering",
      role: t.about.milestones.projectsTrack.role,
      organization: t.about.milestones.projectsTrack.organization,
      location: t.about.milestones.projectsTrack.location,
      program: t.about.milestones.projectsTrack.program,
      period: t.about.milestones.projectsTrack.period,
      statusText: t.about.milestones.projectsTrack.statusText,
      statusType: "ongoing",
      highlights: t.about.milestones.projectsTrack.highlights,
      techBadges: [
        "Python",
        "Flask",
        "pywebview",
        "PySide6",
        "Pygments",
        "pytest",
        "pandas",
        "Jupyter Notebook",
      ],
    },
  ];

  const engineeringPillars = t.about.pillars;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-16"
    >
      {/* Overview Header */}
      <section data-assemble="1" className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control border border-signal/25 bg-signal/10 text-[11px] font-mono text-signal">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-signal" />
            <span>{t.about.badge}</span>
          </div>

          <span className="text-xs font-mono text-granite">
            Yaroslav Krupoder
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-chalk mb-4">
            {t.about.title}
          </h1>
          <p className="text-base sm:text-lg text-stone leading-relaxed max-w-4xl">
            {t.about.subtitle}
          </p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.about.infoEducationLabel}
            </span>
            <span className="text-sm font-semibold text-bone block">
              {t.about.infoEducationValue}
            </span>
            <span className="text-[11px] font-mono text-granite block">
              {t.about.infoEducationSub}
            </span>
          </div>

          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.about.infoExperienceLabel}
            </span>
            <span className="text-sm font-semibold text-bone block">
              {t.about.infoExperienceValue}
            </span>
            <span className="text-[11px] font-mono text-granite block">
              {t.about.infoExperienceSub}
            </span>
          </div>

          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.about.infoLanguagesLabel}
            </span>
            <span className="text-sm font-semibold text-bone block">
              {t.about.infoLanguagesValue}
            </span>
            <span className="text-[11px] font-mono text-granite block">
              {t.about.infoLanguagesSub}
            </span>
          </div>

          <div className="glass-panel p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
              {t.about.infoLocationLabel}
            </span>
            <span className="text-sm font-semibold text-bone block">
              {t.about.infoLocationValue}
            </span>
            <span className="text-[11px] font-mono text-granite block">
              {t.about.infoLocationSub}
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Milestone Timeline */}
      <section data-assemble="2" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-stroke">
          <div>
            <span className="text-xs font-mono text-granite uppercase tracking-widest block mb-1">
              {t.about.timelineEyebrow}
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
              {t.about.timelineTitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-granite">
            {t.about.timelinePeriod}
          </span>
        </div>

        {/* Vertical Timeline Pipeline */}
        <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-stroke">
          {milestones.map((item) => (
            <div key={item.id} className="relative group">
              {/* Telemetry Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  {item.statusType === "active" ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-[2px] bg-signal opacity-75" />
                      <span className="relative inline-flex rounded-[2px] h-3 w-3 bg-signal ring-4 ring-canvas" />
                    </>
                  ) : item.statusType === "ongoing" ? (
                    <span className="relative inline-flex rounded-[2px] h-3 w-3 bg-bone ring-4 ring-canvas" />
                  ) : (
                    <span className="relative inline-flex rounded-[2px] h-3 w-3 bg-granite ring-4 ring-canvas" />
                  )}
                </span>
              </div>

              {/* Node Card */}
              <div className="glass-panel glass-panel-interactive p-6 sm:p-7 space-y-5">
                {/* Node Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-granite font-semibold">
                        {item.indexTag}
                      </span>
                      {item.program && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-control bg-stroke/60 text-stone border border-stroke">
                          {item.program}
                        </span>
                      )}
                      {item.statusText && (
                        <span className="text-[11px] font-mono text-signal font-medium">
                          · {item.statusText}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-bone flex flex-wrap items-baseline gap-2">
                      <span className="inline-flex items-center gap-2">
                        {item.type === "experience" && (
                          <Briefcase className="w-4 h-4 text-signal inline-block" />
                        )}
                        {item.type === "education" && (
                          <GraduationCap className="w-4 h-4 text-granite inline-block" />
                        )}
                        {item.type === "engineering" && (
                          <Terminal className="w-4 h-4 text-granite inline-block" />
                        )}
                        <span>{item.role}</span>
                      </span>
                      <span className="text-granite font-medium text-base">
                        @ {item.organization}
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-granite">
                    <span className="font-semibold text-bone">
                      {item.period}
                    </span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Highlights list with telemetry indicators */}
                <ul className="space-y-2.5 text-sm text-stone leading-relaxed">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-signal mt-1 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Badges and Links */}
                <div className="pt-3 border-t border-stroke/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techBadges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-control border border-stroke bg-canvas/60 text-stone"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-bone hover:text-signal transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>{item.link.text} →</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Competencies: Technical Matrices */}
      <section data-assemble="3" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-stroke">
          <div>
            <span className="text-xs font-mono text-granite uppercase tracking-widest block mb-1">
              {t.about.skillsEyebrow}
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
              {t.about.skillsTitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-granite">
            {t.about.skillsSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {matrices.map((matrix) => (
            <div
              key={matrix.id}
              className="glass-panel glass-panel-interactive p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-granite font-semibold">
                      0{matrix.index}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-granite">
                      {matrix.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {matrix.id === "frontend" && (
                      <Cpu className="w-5 h-5 text-granite" />
                    )}
                    {matrix.id === "backend" && (
                      <Activity className="w-5 h-5 text-signal" />
                    )}
                    {matrix.id === "ai-workflow" && (
                      <Layers className="w-5 h-5 text-granite" />
                    )}
                    <h3 className="text-xl font-bold text-bone">
                      {matrix.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone leading-relaxed">
                  {matrix.summary}
                </p>

                {/* Primary Competencies */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-granite block font-semibold">
                    {t.about.mainToolsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.primarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded-control border border-stroke bg-stroke/80 text-bone"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Skills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-granite block font-semibold">
                    {t.about.alsoUsedLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.secondarySkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-control border border-stroke bg-canvas/60 text-stone"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frameworks & Specifications */}
              <div className="pt-4 border-t border-stroke/80 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-granite block">
                  {t.about.toolsServicesLabel}
                </span>
                <div className="flex flex-wrap gap-1">
                  {matrix.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-control bg-stroke/50 text-granite border border-stroke/50"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Agentic Workflow & Geometric Cyber-Artifacts Demo */}
      <section data-assemble="4">
        <AgenticWorkflowDemo />
      </section>

      {/* Certifications */}
      <section data-assemble="5" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-stroke">
          <div>
            <span className="text-xs font-mono text-granite uppercase tracking-widest block mb-1">
              {t.about.certsEyebrow}
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
              {t.about.certsTitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-granite">
            {t.about.certsSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {certs.map((cert) => (
            <div
              key={cert.title}
              className="glass-panel px-5 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
            >
              <div>
                <span className="text-xs font-mono text-granite">
                  {cert.provider}
                </span>
                <h3 className="text-base font-bold text-bone">
                  {cert.title}
                </h3>
                <p className="text-xs text-stone leading-relaxed mt-1">
                  {cert.detail}
                </p>
              </div>
              <span className="text-xs font-mono text-granite shrink-0">
                {cert.date}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-panel p-5 text-sm text-stone">
          <span className="font-semibold text-bone">{t.about.spokenLanguagesLabel}</span>
          {t.about.spokenLanguagesValue}
        </div>
      </section>

      {/* Engineering Philosophy & Rigor Section */}
      <section data-assemble="6" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-stroke">
          <div>
            <span className="text-xs font-mono text-granite uppercase tracking-widest block mb-1">
              {t.about.approachEyebrow}
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-signal" />
              <h2 className="text-2xl font-bold tracking-[-0.025em] text-bone">
                {t.about.approachTitle}
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-granite">
            {t.about.approachSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringPillars.map((pillar) => (
            <div
              key={pillar.index}
              className="glass-panel p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-granite">
                  {pillar.tag}
                </span>
                <span className="text-xs font-mono text-signal/80 font-bold">
                  [{pillar.index}]
                </span>
              </div>
              <h3 className="text-lg font-bold text-bone">
                {pillar.title}
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default AboutView;
