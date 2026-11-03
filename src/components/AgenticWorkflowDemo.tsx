import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause, ShieldCheck } from "lucide-react";
import { ContextRingArtifact } from "./ContextRingArtifact";
import { useLanguage } from "../i18n/LanguageContext";

export const AgenticWorkflowDemo: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const steps = t.workflow.steps;
  const currentStep = steps[activeIndex] || steps[0];

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  }, [steps.length]);

  // Auto-play timer with clean reset upon activeIndex change
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeIndex, goToNext]);

  // Keyboard navigation (← / →) with safety check against input editing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Announcement */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`${t.workflow.stagePrefix} ${activeIndex + 1} / ${steps.length}: ${currentStep.title}. ${currentStep.lead}`}
      </div>

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#3d3a39]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]" />
            <span className="text-xs font-mono text-[#ee6018] uppercase tracking-wider">
              {t.workflow.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#eeeeee]">
            {t.workflow.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#8a8380] max-w-2xl leading-relaxed">
            {t.workflow.subtitle}
          </p>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-xs font-mono border transition-all ${
              isAutoPlaying
                ? "bg-[#ee6018]/15 text-[#ee6018] border-[#ee6018]/40"
                : "bg-[#1d1a18]/60 text-[#8a8380] border-[#3d3a39]"
            }`}
            title={isAutoPlaying ? t.workflow.pause : t.workflow.auto}
            aria-label={isAutoPlaying ? t.workflow.pause : t.workflow.auto}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {isAutoPlaying ? t.workflow.pause : t.workflow.auto}
            </span>
          </button>

          <button
            onClick={goToPrev}
            className="min-h-[36px] min-w-[36px] p-2 flex items-center justify-center rounded-[3px] border border-[#3d3a39] bg-[#1d1a18]/60 text-[#8a8380] hover:text-white hover:bg-[#3d3a39] transition-all"
            aria-label={t.workflow.prevStep || "Previous step"}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNext}
            className="min-h-[36px] min-w-[36px] p-2 flex items-center justify-center rounded-[3px] border border-[#3d3a39] bg-[#1d1a18]/60 text-[#8a8380] hover:text-white hover:bg-[#3d3a39] transition-all"
            aria-label={t.workflow.nextStep || "Next step"}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Tabs Timeline with Auto-Play Progress Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.number}
              onClick={() => setActiveIndex(idx)}
              className={`p-3 rounded-[4px] border text-left transition-all relative font-mono text-xs overflow-hidden ${
                isActive
                  ? "border-[#ee6018] bg-[#ee6018]/10 text-white shadow-sm"
                  : "border-[#3d3a39]/70 bg-[#1d1a18]/40 text-[#8a8380] hover:border-[#3d3a39] hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-[#8a8380] mb-1">
                <span className={isActive ? "text-[#ee6018] font-bold" : ""}>
                  [{step.number}]
                </span>
                <span>
                  {t.workflow.stagePrefix} {idx + 1}/4
                </span>
              </div>
              <div
                className={`font-semibold text-xs truncate ${isActive ? "text-zinc-100" : "text-zinc-400"}`}
              >
                {step.shortTitle}
              </div>

              {/* Progress Bar for Auto-play mode */}
              {isActive && isAutoPlaying && (
                <motion.div
                  key={`bar-${idx}-${activeIndex}-${isAutoPlaying}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[#ee6018]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Terminal with Corner Registration Marks */}
      <div className="relative glass-panel p-5 sm:p-7 rounded-[10px] border border-[#3d3a39]/80 min-h-[380px]">
        {/* Technical Corner Registration Marks (+) */}
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -left-1.5 text-[10px] font-mono text-[#8a8380] select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 text-[10px] font-mono text-[#8a8380] select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -left-1.5 text-[10px] font-mono text-[#8a8380] select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -right-1.5 text-[10px] font-mono text-[#8a8380] select-none pointer-events-none"
        >
          +
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Human Engineering Narrative (Cycles on step change) */}
          <div className="lg:col-span-7 space-y-5 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#ee6018] font-bold">
                      [{currentStep.number} // 04]
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8380]">
                      {currentStep.tag}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#eeeeee]">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {currentStep.lead}
                  </p>
                </div>

                {/* My Engineering Rule Callout */}
                <div className="p-3.5 rounded-[4px] bg-[#1d1a18] border border-[#3d3a39]/80 space-y-1.5 font-mono">
                  <div className="flex items-center gap-1.5 text-[#ee6018] font-semibold text-[11px] uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.workflow.myRule}</span>
                  </div>
                  <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                    {currentStep.humanTakeaway}
                  </p>
                </div>

                {/* Real Project Anchor */}
                <div className="p-3 rounded-[4px] bg-[#ee6018]/5 border border-[#ee6018]/20 text-xs font-mono flex items-start gap-2">
                  <span className="text-[#ee6018] font-bold shrink-0">
                    {t.workflow.inPractice}
                  </span>
                  <span className="text-zinc-300 font-sans">
                    {currentStep.projectExample}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Context Ring Interactive System Artifact (Permanently mounted for smooth arc morphing) */}
          <div className="lg:col-span-5 rounded-[6px] bg-[#101010] border border-[#3d3a39] flex flex-col overflow-hidden relative">
            <ContextRingArtifact
              stepIndex={activeIndex}
              onSelectStep={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenticWorkflowDemo;
