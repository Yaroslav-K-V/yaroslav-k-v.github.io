# Design Specification: Dark High-Tech & Monochrome Architecture UI/UX Redesign

**Date:** 2026-10-08  
**Project:** Site_YK (Personal Portfolio of Yaroslav Krupoder)  
**Author:** Pair programming session (Antigravity & Yaroslav Krupoder)  
**Reference Inspiration:** idam.systems (#why-idam, system node graph, high-tech industrial aesthetic)

---

## 1. Executive Summary

This design transforms the Site_YK portfolio into a high-performance, dark high-tech engineering showcase inspired by the precision and dynamism of `idam.systems`, executed with a refined monochrome Apple/Vercel design system.

The centerpiece of the experience is an **Interactive Systems Architecture Canvas/SVG component** on the Home page, simulating live data streams and interconnected technical modules (Python AI, C# Core Engine, Automation Services, Delivery UI). The site maintains its robust multi-view SPA tab routing while elevating the visual canvas width to `max-w-6xl`, incorporating 1px hairline borders, glassmorphic surfaces, indexed components (`01`, `02`), and live telemetry status indicators.

---

## 2. Design System & Tokens

### 2.1 Theme & Color Palette
- **Dark Mode (Default & Primary Focus):**
  - Page Background: Deep Pitch Black `#000000` / `#050507`.
  - Surface Glass: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-md` and `bg-zinc-950/40`.
  - Hairline Borders: 1px `rgba(255, 255, 255, 0.08)` default, hovering up to `rgba(255, 255, 255, 0.22)`.
  - Primary Typography: `#F4F4F5` (Zinc-100).
  - Secondary / Muted Typography: `#71717A` (Zinc-500).
  - High-Tech Accent: Crisp Silver-White `#FFFFFF` and subtle neutral metallic gradients (`from-white via-zinc-200 to-zinc-400`).
  - System Status: Live pulse indicator dot (`#22C55E` green for `SYS: ONLINE`).
- **Light Mode (Apple High-Key Contrast):**
  - Page Background: Pure Crisp White `#FFFFFF` with slate tint `#F8FAFC`.
  - Surface Glass: `rgba(0, 0, 0, 0.02)` with `backdrop-blur-md`.
  - Hairline Borders: 1px `rgba(0, 0, 0, 0.08)`, hover to `rgba(0, 0, 0, 0.2)`.
  - Primary Typography: `#09090B` (Zinc-950).
  - Secondary Typography: `#52525B` (Zinc-600).

### 2.2 Grid & Geometry
- **Container Max Width:** Expanded from the narrow `max-w-3xl` to **`max-w-6xl`** (`1152px`), providing breathing room for multi-column architecture diagrams and technical data grids.
- **Background Texture:** Subtle engineering dot matrix / grid pattern overlay (`bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]`).

### 2.3 Typography & Technical Embellishments
- Monospaced badges and headers (`font-mono text-xs uppercase tracking-widest`).
- Index numbering format: `[01]`, `SYS // CORE`, `PRJ // 02`.
- Technical micro-arrows (`↗`, `→`, `↓`).

---

## 3. Architecture & Core Components

### 3.1 Navigation (Navbar) & Footer
- **Navbar:**
  - Sticky glass header with `backdrop-blur-xl`, hairline bottom border `border-white/10`.
  - Monogram brand mark: `YK // SYSTEMS`.
  - Nav items styled as precision tabs with active pill highlights (`welcome`, `about`, `projects`, `research`, `contacts`).
  - Integrated theme toggle (Moon/Sun) with seamless persistence.
- **Footer:**
  - Minimalist high-tech footer with live UTC/local clock, status badge (`ALL SYSTEMS OPERATIONAL`), copyright, and back-to-top action.

### 3.2 Hero & Interactive Systems Architecture Component (HomeView)
The centerpiece consists of two synchronized elements:
1. **Interactive Architecture Node Canvas/Graph:**
   - Visual nodes:
     - `AI & Data Pipeline` (Python, LLM Agents, Ingestion, Embeddings)
     - `Core Systems Engine` (C#, .NET, High-Throughput Desktop Architecture)
     - `Automation & Services` (Async Workers, Scrapers, Background Jobs)
     - `Client Delivery` (Reactive Web Interfaces, Dashboards, APIs)
   - Connecting vector conduits with continuous animated packet pulses (light streaks flowing along paths using SVG stroke-dashoffset / Framer Motion).
   - Mouse hover & click interaction: hovering or selecting a node highlights its downstream and upstream data pathways.
2. **Telemetry & Spec Inspector Panel:**
   - Sits alongside the graph.
   - Dynamically updates when any node is hovered or clicked, displaying:
     - Module Name & Subsystem ID.
     - Primary Tech Stack tags.
     - Role & Real-world Usage in Yaroslav's work (e.g. references to meetbadi, Unitra, PyGlow).
     - Live simulated metrics (latency, operational status, architecture pattern).
3. **Directory Navigation Cards:**
   - 4 indexed high-tech cards (`[01] About Me`, `[02] Projects`, `[03] Research / Writing`, `[04] Contacts`) linking directly to the respective tab views.

### 3.3 Projects View & Modal (ProjectsView & ProjectModal)
- **Projects Grid:**
  - Modern asymmetric grid layout.
  - Featured projects (e.g., `meetbadi.com`, `Unitra`) highlighted with wide cards featuring architecture callouts, technology stacks, and direct external / modal links.
  - Secondary and library projects (e.g., `PyGlow`) rendered in compact structured cards.
- **ProjectModal (Engineering Spec Sheet):**
  - Full-screen or large modal with backdrop blur.
  - Styled as an architecture dossier: Problem Statement, Technical Architecture, Tech Stack matrix, Key Engineering Decisions, and Direct Actions (`Live Link`, `Source Code`).

### 3.4 About, Research & Contacts Views
- **AboutView:**
  - Experience timeline formatted as an engineering milestone log (Grenergy LLC Erasmus+ internship, education, core competencies categorized into Systems, AI, Tools).
- **ResearchView:**
  - Technical articles and notes formatted as whitepaper / documentation briefs with read times, publication dates, and indexed taxonomy.
- **ContactsView:**
  - Direct communication hub with 1-click copy-to-clipboard interactions, contact metadata, and high-visibility CV download button (`Download Resume [PDF] ↓`).

---

## 4. Dependencies & Implementation Strategy

- **Dependencies:** Leveraging existing stack (`react`, `react-dom`, `framer-motion`, `lucide-react`, `tailwindcss`, `vite`). No heavy 3D engine needed; SVG + Canvas + Framer Motion deliver maximum framerate (60fps), razor-sharp rendering, and zero layout shift.
- **Accessibility:** Accessible ARIA attributes, semantic buttons, keyboard navigable nodes, and prefers-reduced-motion support.

---

## 5. Verification & Quality Gates

1. **Visual Testing:** Verify both Dark Mode and Light Mode rendering across all 5 views.
2. **Responsive Testing:** Verify mobile responsiveness on widths from 375px to 1920px (graph adapts gracefully or collapses to vertical flow on small screens).
3. **Build & Typecheck:** Run `npm run build` (`tsc && vite build`) to confirm 100% clean TypeScript build without errors.
