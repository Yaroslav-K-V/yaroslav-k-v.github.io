import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

interface ContextRingArtifactProps {
  stepIndex: number; // 0, 1, 2, 3
  onSelectStep?: (index: number) => void;
}

export interface WorkflowPhaseConfig {
  readonly id: string;
  readonly fallbackLabel: string;
  readonly stepIndex: number;
}

export const WORKFLOW_PHASES: readonly WorkflowPhaseConfig[] = [
  { id: "plan", fallbackLabel: "Plan", stepIndex: 0 },
  { id: "spec", fallbackLabel: "Spec", stepIndex: 0 },
  { id: "index", fallbackLabel: "Index", stepIndex: 0 },
  { id: "lock", fallbackLabel: "Lock", stepIndex: 0 },
  { id: "test", fallbackLabel: "Test", stepIndex: 1 },
  { id: "execute", fallbackLabel: "Execute", stepIndex: 2 },
  { id: "merge", fallbackLabel: "Merge", stepIndex: 2 },
  { id: "review", fallbackLabel: "Review", stepIndex: 3 },
  { id: "ship", fallbackLabel: "Ship", stepIndex: 3 },
  { id: "monitor", fallbackLabel: "Monitor", stepIndex: 3 },
] as const;

// Active phase indices per step
const ACTIVE_PHASES: number[][] = [
  [0, 1, 2, 3], // Step 01: Spec Lock (Plan, Spec, Index, Lock)
  [4], // Step 02: TDD Harness (Test)
  [5, 6], // Step 03: Subagents (Execute, Merge)
  [7, 8, 9], // Step 04: Human Review (Review, Ship, Monitor)
];

// SVG Geometry Constants
const CX = 300;
const CY = 250;
const R = 180;
const CIRCUMFERENCE = 2 * Math.PI * R;

export const ContextRingArtifact: React.FC<ContextRingArtifactProps> = ({
  stepIndex,
  onSelectStep,
}) => {
  const { t } = useLanguage();
  const currentActive = ACTIVE_PHASES[stepIndex] || [0, 1, 2, 3];

  const ringData = t.workflow.ring;
  const centerText = ringData.center[stepIndex] || "SHARED CONTEXT";
  const meta = ringData.meta[stepIndex] || ringData.meta[0];
  const localizedChips =
    ringData.chips || WORKFLOW_PHASES.map((p) => p.fallbackLabel);

  // Progress arc calculation
  const maxActiveIndex = currentActive[currentActive.length - 1];
  const targetFraction = (maxActiveIndex + 1) / WORKFLOW_PHASES.length;
  const targetDash = CIRCUMFERENCE * targetFraction;

  return (
    <div className="w-full h-full flex flex-col justify-between font-mono select-none">
      {/* Top Header Telemetry Bar */}
      <div className="px-4 py-2 border-b border-[#3d3a39] flex items-center justify-between text-[10px] text-[#8a8380] bg-[#161413]/60">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018] animate-pulse" />
          <span className="text-zinc-200 font-semibold">{meta.headL}</span>
        </div>
        <span className="text-[#8a8380] uppercase tracking-wider">
          {meta.headR}
        </span>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 flex items-center justify-center p-2 min-h-[300px] sm:min-h-[340px]">
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full max-h-[360px] overflow-visible"
          role="img"
          aria-label="Workflow Context Ring Interactive Diagram"
        >
          {/* Inner Invariant Ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R - 44}
            fill="none"
            stroke="#262322"
            strokeWidth="1"
          />

          {/* Outer Dashed Orbit Path */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#474341"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {/* Progress Arc (Framer Motion smooth arc morphing) */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#ee6018"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(-90 ${CX} ${CY})`}
            initial={false}
            animate={{ strokeDasharray: `${targetDash} ${CIRCUMFERENCE}` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Connecting rays from center to active chips */}
          {WORKFLOW_PHASES.map((_, i) => {
            const isActive = currentActive.includes(i);
            if (!isActive) return null;
            const a = -Math.PI / 2 + (i / WORKFLOW_PHASES.length) * Math.PI * 2;
            const x = CX + Math.cos(a) * R;
            const y = CY + Math.sin(a) * R;
            return (
              <line
                key={`ray-${i}`}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke="#ee6018"
                strokeOpacity="0.38"
                strokeDasharray="3 4"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Orbiting Photon Packet - Pure Hardware GPU Transform (0 React Re-renders) */}
          <g transform={`translate(${CX}, ${CY})`}>
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px" }}
              className="motion-reduce:animate-none"
            >
              <circle cx={0} cy={-R} r="10" fill="#ee6018" opacity="0.22" />
              <circle cx={0} cy={-R} r="3.5" fill="#ee6018" />
            </motion.g>
          </g>

          {/* Central Core Box with Fluid Motion AnimatePresence */}
          <g>
            <AnimatePresence mode="wait">
              <motion.g
                key={centerText}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <rect
                  x={CX - 90}
                  y={CY - 19}
                  width={180}
                  height={38}
                  rx={3}
                  fill="#101010"
                  stroke="#3d3a39"
                  strokeWidth="1.5"
                />
                <text
                  x={CX}
                  y={CY + 4.5}
                  textAnchor="middle"
                  fill="#f2f0f0"
                  fontFamily="Geist Mono"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  {centerText}
                </text>
              </motion.g>
            </AnimatePresence>
          </g>

          {/* 10 Workflow Chips along Orbit - Interactive Clickable */}
          {WORKFLOW_PHASES.map((phase, i) => {
            const a = -Math.PI / 2 + (i / WORKFLOW_PHASES.length) * Math.PI * 2;
            const x = CX + Math.cos(a) * R;
            const y = CY + Math.sin(a) * R;
            const isActive = currentActive.includes(i);
            const isCompleted = i < currentActive[0];

            const chipLabel = localizedChips[i] || phase.fallbackLabel;
            const w = Math.max(54, chipLabel.length * 8.5 + 28);
            const targetStep = phase.stepIndex;

            return (
              <g
                key={phase.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectStep?.(targetStep)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectStep?.(targetStep);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${ringData.chipAriaPrefix || "Stage"} ${targetStep + 1}: ${chipLabel}`}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:stroke-[#ee6018] group"
              >
                {/* Chip Box */}
                <rect
                  x={-w / 2}
                  y={-12}
                  width={w}
                  height={24}
                  rx={2}
                  fill={
                    isActive ? "#f2f0f0" : isCompleted ? "#1d1a18" : "#141211"
                  }
                  stroke={
                    isActive ? "#f2f0f0" : isCompleted ? "#ee6018" : "#342f2d"
                  }
                  strokeOpacity={isActive ? 1 : isCompleted ? 0.6 : 1}
                  strokeWidth="1"
                  className="group-focus-visible:stroke-[#ee6018] group-focus-visible:stroke-2"
                />

                {/* Status Dot */}
                <circle
                  cx={-w / 2 + 10}
                  cy={0}
                  r={3}
                  fill={
                    isActive ? "#ee6018" : isCompleted ? "#a0ca92" : "#5c5855"
                  }
                />

                {/* Text Label */}
                <text
                  x={-w / 2 + 18}
                  y={4}
                  fill={
                    isActive ? "#0a0908" : isCompleted ? "#eeeeee" : "#8a8380"
                  }
                  fontFamily="Geist Mono"
                  fontSize="10"
                  fontWeight={isActive ? "700" : "500"}
                  letterSpacing="0.05em"
                >
                  {chipLabel.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Telemetry Footer + Chip Hint */}
      <div className="px-4 py-2 border-t border-[#3d3a39] flex items-center justify-between text-[9px] text-[#8a8380] bg-[#161413]/40">
        <span className="text-[#ee6018] font-semibold">{meta.footL}</span>
        <span className="hidden sm:inline text-zinc-500 font-normal">
          {t.workflow.chipHint}
        </span>
        <span className="text-[#8a8380]">{meta.footR}</span>
      </div>
    </div>
  );
};

export default ContextRingArtifact;
