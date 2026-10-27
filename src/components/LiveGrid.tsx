import React, { useEffect, useRef } from "react";

// Feature flag: set to false to disable the live grid entirely.
export const LIVE_GRID_ENABLED = true;

const MIN_WIDTH = 1024;
const GLOW_RADIUS = 130;
const MAX_OPACITY = 0.45;
const FADE_MS = 400;

export interface LiveGridProps {
  enabled: boolean;
}

export const LiveGrid: React.FC<LiveGridProps> = ({ enabled }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !LIVE_GRID_ENABLED || !enabled) return;

    const hoverMQ = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    let running = false;
    let rafId = 0;
    let pending = false;
    let targetX = -9999;
    let targetY = -9999;
    let visible = false;

    const eligible = () =>
      hoverMQ.matches &&
      window.innerWidth >= MIN_WIDTH &&
      !reducedMQ.matches &&
      enabled;

    const apply = () => {
      pending = false;
      if (!el) return;
      el.style.setProperty("--lx", `${targetX}px`);
      el.style.setProperty("--ly", `${targetY}px`);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
      if (!visible && eligible()) {
        visible = true;
        el.style.opacity = String(MAX_OPACITY);
      }
    };

    const onLeave = () => {
      visible = false;
      if (el) el.style.opacity = "0";
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) onLeave();
    };

    const onVisibility = () => {
      if (document.hidden) {
        onLeave();
        window.removeEventListener("mousemove", onMove);
      } else if (eligible()) {
        window.addEventListener("mousemove", onMove);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseout", onMouseOut);
      document.addEventListener("visibilitychange", onVisibility);
    };

    const stop = () => {
      if (!running) {
        onLeave();
        return;
      }
      running = false;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      onLeave();
    };

    const reeval = () => {
      if (eligible()) {
        if (!running) start();
      } else {
        stop();
      }
    };

    window.addEventListener("resize", reeval);
    hoverMQ.addEventListener("change", reeval);
    reducedMQ.addEventListener("change", reeval);

    reeval();

    return () => {
      window.removeEventListener("resize", reeval);
      hoverMQ.removeEventListener("change", reeval);
      reducedMQ.removeEventListener("change", reeval);
      stop();
    };
  }, [enabled]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        transition: `opacity ${FADE_MS}ms ease`,
        background:
          "radial-gradient(rgba(238, 96, 24, 0.6) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        WebkitMaskImage: `radial-gradient(circle ${GLOW_RADIUS}px at var(--lx, -9999px) var(--ly, -9999px), black 0%, transparent 100%)`,
        maskImage: `radial-gradient(circle ${GLOW_RADIUS}px at var(--lx, -9999px) var(--ly, -9999px), black 0%, transparent 100%)`,
      }}
    />
  );
};

export default LiveGrid;
