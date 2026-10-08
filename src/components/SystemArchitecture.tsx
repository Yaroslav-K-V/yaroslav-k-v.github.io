import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  Database,
  Globe,
  Workflow,
  Radio,
  Terminal,
  Zap,
  Layers,
  CheckCircle2,
  Server,
  Boxes,
  ArrowRight
} from 'lucide-react';

export type ArchitectureNodeId = 'ai' | 'core' | 'automation' | 'client';

const NODE_ICONS: Record<ArchitectureNodeId, React.ComponentType<{ className?: string }>> = {
  ai: Database,
  core: Cpu,
  automation: Workflow,
  client: Globe,
};

export interface ConduitDefinition {
  id: string;
  source: ArchitectureNodeId;
  target: ArchitectureNodeId;
  path: string;
  label: string;
  protocol: string;
  direction: 'bidirectional' | 'downstream' | 'upstream';
}

export interface NodeProjectUsage {
  name: string;
  badge: string;
  role: string;
}

export interface ArchitectureNode {
  id: ArchitectureNodeId;
  sysId: string;
  title: string;
  subtitle: string;
  summary: string;
  pattern: string;
  techStack: string[];
  projects: NodeProjectUsage[];
  metrics: {
    baseLatency: number;
    latencyUnit: string;
    baseThroughput: number;
    throughputUnit: string;
    reliability: string;
    resourceLoad: string;
    status: 'ACTIVE' | 'OPTIMAL' | 'LISTENING' | 'HEALTHY';
  };
  pos: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export const ARCHITECTURE_NODES: Record<ArchitectureNodeId, ArchitectureNode> = {
  ai: {
    id: 'ai',
    sysId: 'SYS // 01',
    title: 'AI & Data Pipeline',
    subtitle: 'Python · LLM Agents · Ingestion · Embeddings',
    summary:
      'Autonomous intelligence layer processing unstructured web data, generating semantic vector embeddings, and orchestrating context-augmented LLM reasoning agents.',
    pattern: 'Vector Stream Worker / Async RAG Pipeline',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'Qdrant / pgvector', 'AsyncIO', 'NumPy'],
    projects: [
      {
        name: 'meetbadi.com',
        badge: 'Live Production',
        role: 'Engineered real-time embeddings pipeline and automated LLM recommendation agents matching users with flatmates based on semantic contextual preferences.'
      },
      {
        name: 'PyGlow',
        badge: 'Open Source',
        role: 'Built optical preprocessing & computer vision pipelines for live edge sensor analysis.'
      }
    ],
    metrics: {
      baseLatency: 12.4,
      latencyUnit: 'ms',
      baseThroughput: 2480,
      throughputUnit: 'req/s',
      reliability: '99.98%',
      resourceLoad: '1.2 GB RAM / pod',
      status: 'ACTIVE'
    },
    pos: { x: 25, y: 25, w: 250, h: 140 }
  },
  core: {
    id: 'core',
    sysId: 'SYS // 02',
    title: 'Core Desktop Engine',
    subtitle: 'C# · .NET · High-Throughput Desktop Systems',
    summary:
      'High-performance desktop architecture engineered for native hardware orchestration, multi-threaded instrumentation, and real-time deterministic event loops.',
    pattern: 'Deterministic Event Loop / SIMD Memory Pipeline',
    techStack: ['C#', '.NET 8/9', 'WPF / WinUI', 'P/Invoke', 'SIMD / Memory<T>', 'SCPI / VISA'],
    projects: [
      {
        name: 'Unitra',
        badge: 'Industrial System',
        role: 'Architected automated test station software controlling oscilloscopes, spectrum analyzers, and power supplies with microsecond deterministic accuracy.'
      },
      {
        name: 'Native Telemetry Host',
        badge: 'Desktop App',
        role: 'Designed zero-copy memory mapped ring buffers for high-rate sensor telemetry logging without garbage collection pressure.'
      }
    ],
    metrics: {
      baseLatency: 0.8,
      latencyUnit: 'ms',
      baseThroughput: 18500,
      throughputUnit: 'ops/s',
      reliability: '99.999%',
      resourceLoad: '4.2% CPU / Core',
      status: 'OPTIMAL'
    },
    pos: { x: 25, y: 275, w: 250, h: 140 }
  },
  automation: {
    id: 'automation',
    sysId: 'SYS // 03',
    title: 'Automation & Services',
    subtitle: 'Async Workers · Scrapers · Background Jobs',
    summary:
      'Distributed background daemon pool running resilient web scrapers, scheduled catalog synchronization, and self-healing asynchronous message queues.',
    pattern: 'Distributed Job Bus / Worker Pool',
    techStack: ['Python', 'Go', 'Celery / Redis', 'Playwright', 'Docker', 'RabbitMQ'],
    projects: [
      {
        name: 'meetbadi.com',
        badge: 'Live Production',
        role: 'Engineered distributed scraping workers syncing real-estate catalogs, handling anti-bot hurdles, and populating normalized relational schemas.'
      },
      {
        name: 'Async Pipeline ETL',
        badge: 'Microservice',
        role: 'Orchestrated self-healing worker queues with exponential backoff retries and dead-letter queue isolation.'
      }
    ],
    metrics: {
      baseLatency: 34.1,
      latencyUnit: 'ms',
      baseThroughput: 950,
      throughputUnit: 'jobs/min',
      reliability: '99.94%',
      resourceLoad: '6 Active Workers',
      status: 'LISTENING'
    },
    pos: { x: 405, y: 25, w: 250, h: 140 }
  },
  client: {
    id: 'client',
    sysId: 'SYS // 04',
    title: 'Client Delivery',
    subtitle: 'Reactive Web Interfaces · Dashboards · APIs',
    summary:
      'Sub-50ms responsive delivery interface streaming live data streams, telemetry charts, and reactive user experiences to modern browsers.',
    pattern: 'Edge-Cached SPA / WebSocket Streaming',
    techStack: ['TypeScript', 'React 19', 'Vite / Next.js', 'Tailwind CSS', 'WebSockets', 'Framer Motion'],
    projects: [
      {
        name: 'meetbadi.com',
        badge: 'Web App',
        role: 'Built responsive client web portal featuring real-time conversational search, instant filtering, and sub-100ms UI interactions.'
      },
      {
        name: 'Site_YK Architecture',
        badge: 'Portfolio Suite',
        role: 'Engineered high-contrast obsidian engineering interface with interactive SVG schema topology and live telemetry inspectors.'
      }
    ],
    metrics: {
      baseLatency: 18.2,
      latencyUnit: 'ms TTFB',
      baseThroughput: 4120,
      throughputUnit: 'sess/h',
      reliability: '99.99%',
      resourceLoad: '60 FPS Render Loop',
      status: 'HEALTHY'
    },
    pos: { x: 405, y: 275, w: 250, h: 140 }
  }
};

export const CONDUITS: ConduitDefinition[] = [
  {
    id: 'c-ai-auto',
    source: 'ai',
    target: 'automation',
    path: 'M 275 95 L 405 95',
    label: 'Corpus Feeds / Scraper Queue',
    protocol: 'Redis Bus / Task Channel',
    direction: 'bidirectional'
  },
  {
    id: 'c-core-client',
    source: 'core',
    target: 'client',
    path: 'M 275 345 L 405 345',
    label: 'Hardware Telemetry & Metrics',
    protocol: 'Local IPC / WebSocket',
    direction: 'downstream'
  },
  {
    id: 'c-ai-core',
    source: 'ai',
    target: 'core',
    path: 'M 150 165 L 150 275',
    label: 'Model Inference & Engine Sockets',
    protocol: 'Native IPC / Shared Memory',
    direction: 'bidirectional'
  },
  {
    id: 'c-auto-client',
    source: 'automation',
    target: 'client',
    path: 'M 530 165 L 530 275',
    label: 'Task Execution & Alert Stream',
    protocol: 'SSE / WebSocket Events',
    direction: 'downstream'
  },
  {
    id: 'c-ai-client',
    source: 'ai',
    target: 'client',
    path: 'M 275 135 C 335 135, 345 305, 405 305',
    label: 'Semantic Recommendations & Chat',
    protocol: 'gRPC-Web / REST Stream',
    direction: 'downstream'
  },
  {
    id: 'c-core-auto',
    source: 'core',
    target: 'automation',
    path: 'M 275 305 C 335 305, 345 135, 405 135',
    label: 'Test Station Artifact Archiving',
    protocol: 'RabbitMQ / File Stream',
    direction: 'upstream'
  }
];

export interface SystemArchitectureProps {
  className?: string;
  initialNodeId?: ArchitectureNodeId;
  onSelectNode?: (nodeId: ArchitectureNodeId) => void;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({
  className = '',
  initialNodeId = 'ai',
  onSelectNode
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<ArchitectureNodeId>(initialNodeId);
  const [hoveredNodeId, setHoveredNodeId] = useState<ArchitectureNodeId | null>(null);
  const [jitter, setJitter] = useState<number>(0);

  // Live telemetry subtle fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setJitter((prev) => (prev + 1) % 12);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const activeNodeId = hoveredNodeId || selectedNodeId;
  const activeNode = ARCHITECTURE_NODES[activeNodeId];

  const handleSelect = (id: ArchitectureNodeId) => {
    setSelectedNodeId(id);
    if (onSelectNode) {
      onSelectNode(id);
    }
  };

  // Determine connected conduits
  const isConduitActive = (conduit: ConduitDefinition): boolean => {
    return conduit.source === activeNodeId || conduit.target === activeNodeId;
  };

  const activeConduits = CONDUITS.filter(isConduitActive);

  // Simulated live metrics with micro-perturbations
  const liveLatency = (
    activeNode.metrics.baseLatency +
    Math.sin(jitter) * (activeNode.metrics.baseLatency > 5 ? 0.35 : 0.04)
  ).toFixed(1);

  const liveThroughput = Math.round(
    activeNode.metrics.baseThroughput + Math.cos(jitter) * (activeNode.metrics.baseThroughput * 0.015)
  ).toLocaleString();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Topology Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
              SYSTEM ARCHITECTURE // TOPOLOGY SCHEMATIC
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            Interconnected Core Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            The four architectural subsystems powering Yaroslav&apos;s engineering stack. Click or hover any node to inspect active data conduits, live simulated metrics, and real-world project deployments.
          </p>
        </div>

        {/* Quick Node Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10">
          {(Object.keys(ARCHITECTURE_NODES) as ArchitectureNodeId[]).map((nodeKey) => {
            const node = ARCHITECTURE_NODES[nodeKey];
            const NodeIcon = NODE_ICONS[nodeKey];
            const isSelected = selectedNodeId === nodeKey;
            return (
              <button
                key={nodeKey}
                onClick={() => handleSelect(nodeKey)}
                onMouseEnter={() => setHoveredNodeId(nodeKey)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white dark:text-emerald-300 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-white/5'
                }`}
              >
                <NodeIcon className="w-3 h-3 opacity-80" />
                <span className="text-[10px] opacity-60">[{node.sysId.replace('SYS // ', '')}]</span>
                <span className="font-medium">{node.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: SVG Diagram Canvas (Left) + Telemetry Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Interactive SVG Schema Canvas */}
        <div className="lg:col-span-7 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-black/60 backdrop-blur-md p-3 sm:p-5 relative overflow-hidden flex flex-col justify-between">
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>SIGNAL CONDUITS: {activeConduits.length} ACTIVE</span>
            </span>
            <span className="hidden sm:inline opacity-70">INTERACTIVE GRAPH · 60 FPS VECTOR BUS</span>
          </div>

          {/* SVG Diagram Container */}
          <div className="relative w-full aspect-[680/440] select-none">
            <svg
              viewBox="0 0 680 440"
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Background dot grid pattern */}
                <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" className="fill-zinc-300/40 dark:fill-zinc-800/80" />
                </pattern>

                {/* Gradients for Packet Pulse Animations */}
                <linearGradient id="emeraldPacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="silverPacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#71717a" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#a1a1aa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#71717a" stopOpacity="0.1" />
                </linearGradient>

                {/* Glow Filter for Active Elements */}
                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Engineering Matrix Grid */}
              <rect width="680" height="440" fill="url(#archGrid)" />

              {/* Central Telemetry Hub Marker / Nexus */}
              <g className="transition-opacity duration-300">
                <circle
                  cx="340"
                  cy="220"
                  r="24"
                  className="fill-zinc-100 dark:fill-zinc-900/90 stroke-zinc-300 dark:stroke-white/10"
                  strokeWidth="1"
                />
                <circle
                  cx="340"
                  cy="220"
                  r="16"
                  className="fill-none stroke-emerald-500/30"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 340 220"
                    to="360 340 220"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="340" cy="220" r="3.5" className="fill-emerald-500" />
                <text
                  x="340"
                  y="256"
                  textAnchor="middle"
                  className="text-[8px] font-mono fill-zinc-400 dark:fill-zinc-500 tracking-widest font-semibold"
                >
                  SYNAPSE BUS
                </text>
              </g>

              {/* Conduits (Vector Pathways) */}
              {CONDUITS.map((conduit) => {
                const active = isConduitActive(conduit);
                const hasFocus = activeNodeId !== null;
                const opacity = active ? 1 : hasFocus ? 0.22 : 0.6;

                return (
                  <g key={conduit.id} className="transition-opacity duration-300">
                    {/* Base Conduit Tube Line */}
                    <path
                      d={conduit.path}
                      fill="none"
                      className={
                        active
                          ? 'stroke-emerald-500/80 dark:stroke-emerald-400'
                          : 'stroke-zinc-300 dark:stroke-zinc-800'
                      }
                      strokeWidth={active ? 2.5 : 1.5}
                      strokeDasharray={active ? undefined : '4 4'}
                      opacity={opacity}
                      filter={active ? 'url(#emeraldGlow)' : undefined}
                    />

                    {/* Animated Packet Pulse Streak */}
                    <path
                      d={conduit.path}
                      fill="none"
                      stroke={active ? 'url(#emeraldPacketGrad)' : 'url(#silverPacketGrad)'}
                      strokeWidth={active ? 3 : 2}
                      strokeDasharray={active ? '16 90' : '10 140'}
                      opacity={opacity}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="200"
                        to="0"
                        dur={active ? '1.8s' : '4.2s'}
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Photon Pulse Particle traveling along the conduit */}
                    <circle
                      r={active ? 3.5 : 2}
                      fill={active ? '#34d399' : '#a1a1aa'}
                      opacity={opacity}
                    >
                      <animateMotion
                        path={conduit.path}
                        dur={active ? '2.4s' : '5s'}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Interactive Node Cards */}
              {(Object.keys(ARCHITECTURE_NODES) as ArchitectureNodeId[]).map((nodeKey) => {
                const node = ARCHITECTURE_NODES[nodeKey];
                const isSelected = selectedNodeId === nodeKey;
                const isHovered = hoveredNodeId === nodeKey;
                const isActive = isSelected || isHovered;
                const isTargetOfActive =
                  activeNodeId !== null &&
                  CONDUITS.some(
                    (c) =>
                      (c.source === activeNodeId && c.target === nodeKey) ||
                      (c.target === activeNodeId && c.source === nodeKey)
                  );

                const { x, y, w, h } = node.pos;

                return (
                  <g
                    key={nodeKey}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${node.title}`}
                    aria-pressed={isSelected}
                    onClick={() => handleSelect(nodeKey)}
                    onMouseEnter={() => setHoveredNodeId(nodeKey)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(nodeKey);
                      }
                    }}
                    className="cursor-pointer focus:outline-none transition-all duration-200"
                  >
                    {/* Node Background Rectangle */}
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="8"
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'fill-white dark:fill-zinc-950 stroke-emerald-500 dark:stroke-emerald-400'
                          : isTargetOfActive
                          ? 'fill-white/95 dark:fill-zinc-950/90 stroke-emerald-500/40 dark:stroke-emerald-400/40'
                          : 'fill-white/80 dark:fill-zinc-950/70 stroke-zinc-200 dark:stroke-white/10'
                      }`}
                      strokeWidth={isActive ? 2 : 1}
                      filter={isActive ? 'url(#emeraldGlow)' : undefined}
                    />

                    {/* Corner Registration Marks (CAD Style '+') */}
                    <g className={isActive ? 'stroke-emerald-500 dark:stroke-emerald-400' : 'stroke-zinc-400 dark:stroke-zinc-600'} strokeWidth="1">
                      {/* Top-Left */}
                      <path d={`M ${x + 4} ${y + 8} L ${x + 12} ${y + 8} M ${x + 8} ${y + 4} L ${x + 8} ${y + 12}`} />
                      {/* Top-Right */}
                      <path d={`M ${x + w - 12} ${y + 8} L ${x + w - 4} ${y + 8} M ${x + w - 8} ${y + 4} L ${x + w - 8} ${y + 12}`} />
                      {/* Bottom-Left */}
                      <path d={`M ${x + 4} ${y + h - 8} L ${x + 12} ${y + h - 8} M ${x + 8} ${y + h - 12} L ${x + 8} ${y + h - 4}`} />
                      {/* Bottom-Right */}
                      <path d={`M ${x + w - 12} ${y + h - 8} L ${x + w - 4} ${y + h - 8} M ${x + w - 8} ${y + h - 12} L ${x + w - 8} ${y + h - 4}`} />
                    </g>

                    {/* Header Row: Subsystem ID & Status Indicator */}
                    <text
                      x={x + 22}
                      y={y + 26}
                      className="text-[10px] font-mono fill-zinc-500 dark:fill-zinc-400 tracking-wider font-semibold"
                    >
                      {node.sysId}
                    </text>

                    {/* Live Status Pill Inside Node */}
                    <circle
                      cx={x + w - 30}
                      cy={y + 22}
                      r="3.5"
                      className={isActive ? 'fill-emerald-500 animate-pulse' : 'fill-zinc-400 dark:fill-zinc-600'}
                    />
                    <text
                      x={x + w - 38}
                      y={y + 25}
                      textAnchor="end"
                      className={`text-[8px] font-mono ${isActive ? 'fill-emerald-600 dark:fill-emerald-400' : 'fill-zinc-400 dark:fill-zinc-500'}`}
                    >
                      {node.metrics.status}
                    </text>

                    {/* Node Title */}
                    <text
                      x={x + 18}
                      y={y + 54}
                      className="text-[14px] font-mono font-bold fill-zinc-900 dark:fill-zinc-100 tracking-tight"
                    >
                      {node.title}
                    </text>

                    {/* Node Subtitle */}
                    <text
                      x={x + 18}
                      y={y + 74}
                      className="text-[9.5px] font-mono fill-zinc-500 dark:fill-zinc-400"
                    >
                      {node.subtitle}
                    </text>

                    {/* Divider hairline inside card */}
                    <line
                      x1={x + 18}
                      y1={y + 88}
                      x2={x + w - 18}
                      y2={y + 88}
                      className="stroke-zinc-200 dark:stroke-white/10"
                      strokeWidth="1"
                    />

                    {/* Metrics Bar at Bottom of Card */}
                    <text
                      x={x + 18}
                      y={y + 108}
                      className="text-[9px] font-mono fill-zinc-400 dark:fill-zinc-500 uppercase"
                    >
                      LATENCY:
                    </text>
                    <text
                      x={x + 68}
                      y={y + 108}
                      className="text-[9px] font-mono fill-zinc-700 dark:fill-zinc-300 font-semibold"
                    >
                      {node.metrics.baseLatency} {node.metrics.latencyUnit}
                    </text>

                    <text
                      x={x + 128}
                      y={y + 108}
                      className="text-[9px] font-mono fill-zinc-400 dark:fill-zinc-500 uppercase"
                    >
                      THROUGHPUT:
                    </text>
                    <text
                      x={x + 198}
                      y={y + 108}
                      className="text-[9px] font-mono fill-zinc-700 dark:fill-zinc-300 font-semibold"
                    >
                      {node.metrics.baseThroughput >= 1000 ? `${(node.metrics.baseThroughput / 1000).toFixed(1)}k` : node.metrics.baseThroughput}
                    </text>

                    {/* Interactive Click Tip on Hover */}
                    <text
                      x={x + 18}
                      y={y + 126}
                      className={`text-[8.5px] font-mono transition-opacity duration-200 ${
                        isActive
                          ? 'fill-emerald-600 dark:fill-emerald-400 opacity-100'
                          : 'fill-zinc-400 opacity-0'
                      }`}
                    >
                      {isSelected ? '● INSPECTING SUBSYSTEM' : '→ CLICK TO LOCK INSPECTOR'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Schematic Status Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-white/10 pt-3 mt-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>TOPOLOGY STATUS: NOMINAL</span>
            </div>
            <div className="text-[10px] text-zinc-400">
              CLICK OR HOVER ANY NODE TO INSPECT CONDUIT ROUTING
            </div>
          </div>
        </div>

        {/* RIGHT: Telemetry & Engineering Spec Inspector Panel */}
        <div className="lg:col-span-5 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl p-5 shadow-xl space-y-5">
          {/* Inspector Header */}
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 font-semibold">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span>TELEMETRY INSPECTOR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
                {activeNode.sysId}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Node Metadata & Spec */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {/* Title & Architecture Pattern */}
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {React.createElement(NODE_ICONS[activeNode.id], { className: 'w-4 h-4' })}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {activeNode.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {activeNode.subtitle}
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                  <Layers className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Pattern: {activeNode.pattern}</span>
                </div>
              </div>

              {/* Functional Description */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {activeNode.summary}
              </p>

              {/* Real-World Systems Usage */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-semibold">
                  <Server className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Production System Role</span>
                </div>
                <div className="space-y-2">
                  {activeNode.projects.map((proj) => (
                    <div
                      key={proj.name}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200/80 dark:border-white/10 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-zinc-900 dark:text-zinc-200">
                          {proj.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {proj.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-normal">
                        {proj.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Tech Stack Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-semibold">
                  <Boxes className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Engineered Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-300"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Simulated Telemetry Readout Grid */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Live Simulated Telemetry</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
                    <div className="text-[9px] font-mono text-zinc-400 uppercase">Avg Latency</div>
                    <div className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 flex items-center gap-1">
                      <span>{liveLatency}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{activeNode.metrics.latencyUnit}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
                    <div className="text-[9px] font-mono text-zinc-400 uppercase">Throughput</div>
                    <div className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 flex items-center gap-1">
                      <span>{liveThroughput}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{activeNode.metrics.throughputUnit}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
                    <div className="text-[9px] font-mono text-zinc-400 uppercase">Availability</div>
                    <div className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{activeNode.metrics.reliability}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
                    <div className="text-[9px] font-mono text-zinc-400 uppercase">Resource Load</div>
                    <div className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {activeNode.metrics.resourceLoad}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Conduits List */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-semibold">
                  <Radio className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Active Inter-Node Pathways</span>
                </div>
                <div className="space-y-1">
                  {activeConduits.map((c) => {
                    const otherNodeId = c.source === activeNode.id ? c.target : c.source;
                    const otherNode = ARCHITECTURE_NODES[otherNodeId];
                    return (
                      <div
                        key={c.id}
                        className="px-2.5 py-1.5 rounded bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono"
                      >
                        <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium">{activeNode.title.split(' ')[0]}</span>
                          <ArrowRight className="w-3 h-3 text-zinc-400" />
                          <span>{otherNode.title.split(' ')[0]}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {c.protocol}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
