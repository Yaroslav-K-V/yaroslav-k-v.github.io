import React from 'react';

interface RouteLoaderProps {
  label?: string;
}

/**
 * Minimalist technical loader in the site's dark Factory aesthetic.
 * Uses pure CSS animations to guarantee instantaneous rendering without heavy runtime overhead.
 */
export const RouteLoader: React.FC<RouteLoaderProps> = ({ label = 'Loading view' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[50vh] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <div className="relative p-6 sm:p-8 rounded-[4px] border border-[#3d3a39] bg-[#1d1a18]/70 backdrop-blur-sm flex flex-col items-center gap-4 max-w-xs w-full shadow-2xl">
        {/* Technical registration marks */}
        <span
          aria-hidden="true"
          className="absolute -top-1 -left-1 text-[9px] font-mono text-[#8a8380] leading-none select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 text-[9px] font-mono text-[#8a8380] leading-none select-none"
        >
          +
        </span>

        {/* Technical spinner with signal orange accent */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#3d3a39]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ee6018] animate-spin" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#ee6018] animate-ping" />
        </div>

        {/* Monospace status label */}
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#8a8380]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#ee6018] animate-pulse" />
          <span>{label}</span>
          <span className="inline-block animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
};

export const ModalLoader: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="relative p-6 rounded-[4px] border border-[#3d3a39] bg-[#1d1a18] flex flex-col items-center gap-3 shadow-2xl">
        <span
          aria-hidden="true"
          className="absolute -top-1 -left-1 text-[9px] font-mono text-[#8a8380] leading-none select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 text-[9px] font-mono text-[#8a8380] leading-none select-none"
        >
          +
        </span>

        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#3d3a39]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ee6018] animate-spin" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#8a8380]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#ee6018] animate-pulse" />
          <span>Loading dossier...</span>
        </div>
      </div>
    </div>
  );
};

export default RouteLoader;
