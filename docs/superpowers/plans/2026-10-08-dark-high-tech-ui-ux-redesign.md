# Dark High-Tech & Monochrome Architecture UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Site_YK portfolio into a high-performance dark high-tech engineering showcase inspired by idam.systems and Apple/Vercel monochrome aesthetics, featuring an interactive Systems Architecture Canvas/SVG centerpiece on the home page, an expanded `max-w-6xl` responsive layout, 1px hairline glassmorphic styling, and modernized views.

**Architecture:** Dark-first theme foundation with pitch-black / obsidian palette, custom SVG animated conduits with packet pulses for system architectures, expanded layout container, and high-tech typography (indexed numbers, monospace badges, telemetry cards).

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vite.

## Global Constraints

- Primary dark background: `#000000` / `#050507`, surfaces `bg-zinc-950/40` or `rgba(255,255,255,0.03)` with `backdrop-blur-md`.
- Hairline borders: 1px `border-white/10` (dark) and `border-zinc-200` (light).
- Monochrome Apple/Vercel palette: white/silver text, zinc-400 muted text, no colorful RGB glows.
- Interactive centerpiece: SVG/Canvas architecture diagram depicting Python AI / Data Pipelines, C# Core Engine, Automation Services, and Client UI with animated packet pulses and live telemetry panel.
- Maintain existing SPA routing (Navbar tabs: welcome, about, projects, research, contacts) while broadening layout container to `max-w-6xl`.
- Build must compile cleanly with `npm run build` (`tsc && vite build && node scripts/copy-routes.js`).

---

### Task 1: Design Tokens & Base Theme Styling

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: Tailwind CSS base configuration and CSS variables.
- Produces: CSS variables `--bg-page`, `--text-primary`, `--text-muted`, `--border-color`, plus custom dot grid pattern utility and monospace font classes.

- [ ] **Step 1: Update tailwind.config.js with monochrome tokens and engineering fonts**

Add dark theme surface tokens, zinc scale defaults, and custom animations if needed:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          surface: '#09090b',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Update src/index.css with dark high-tech variables and dot grid overlay**

Replace variables with obsidian/monochrome values and engineering grid:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-page: #ffffff;
    --text-primary: #09090b;
    --text-muted: #71717a;
    --border-color: #e4e4e7;
    --card-bg: rgba(255, 255, 255, 0.8);
  }

  html.dark {
    --bg-page: #000000;
    --text-primary: #f4f4f5;
    --text-muted: #a1a1aa;
    --border-color: rgba(255, 255, 255, 0.08);
    --card-bg: rgba(9, 9, 11, 0.6);
  }

  body {
    background-color: var(--bg-page);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
}

/* Background engineering grid */
.tech-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
}
html:not(.dark) .tech-grid {
  background-image: radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
}

/* Hairline borders and glass */
.glass-panel {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
}

/* Custom sleek scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}
html:not(.dark) ::-webkit-scrollbar-thumb {
  background: #d4d4d8;
}
```

- [ ] **Step 3: Update index.html head for dark obsidian theme-color and title styling**

Ensure `theme-color` is `#000000` and meta tags reflect modern engineering branding.

- [ ] **Step 4: Test styling build**

Run: `npm run build`  
Expected: Clean build with code 0.

- [ ] **Step 5: Commit changes**

```bash
git add tailwind.config.js src/index.css index.html
git commit -m "feat(ui): add dark high-tech design tokens and monochrome engineering styles"
```

---

### Task 2: App Shell, Container Expansion, High-Tech Navbar & Footer

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `PageRoute`, theme state (`isDark`, `onToggleTheme`), navigation callbacks.
- Produces: Expanded `max-w-6xl` responsive app layout, floating glass Navbar with status dot, and high-tech footer with live operational indicators.

- [ ] **Step 1: Expand App.tsx main container width to max-w-6xl and apply tech-grid background**

Update `App.tsx` layout structure:
- Replace `max-w-3xl` with `max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16`.
- Add the `tech-grid` class to the outer shell with smooth theme transitions.

- [ ] **Step 2: Redesign Navbar.tsx with high-tech glass aesthetic and status badge**

Update `Navbar.tsx`:
- Brand logo: `YK // 01` or `YAROSLAV KRUPODER` in uppercase monospace with live status dot (`SYS: ONLINE`).
- Glass bar: `backdrop-blur-xl bg-black/60 dark:bg-black/70 border-b border-white/10`.
- Tabs: subtle hairline pill buttons with active indicator.
- Minimalist theme switcher (moon/sun).

- [ ] **Step 3: Redesign Footer.tsx with operational status and telemetry**

Update `Footer.tsx`:
- Live UTC/Local clock display.
- System indicator: `● ALL SYSTEMS OPERATIONAL` (monospaced text-xs).
- Minimalist copyright and links to GitHub, LinkedIn, and Back to Top.

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: Pass.

- [ ] **Step 5: Commit changes**

```bash
git add src/App.tsx src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat(ui): expand layout to max-w-6xl and implement high-tech Navbar and Footer"
```

---

### Task 3: Interactive System Architecture Schema Component

**Files:**
- Create: `src/components/SystemArchitecture.tsx`

**Interfaces:**
- Consumes: None (self-contained with internal hover/select state).
- Produces: `SystemArchitecture` component export for `HomeView`.
- Exposes interactive nodes:
  1. `AI & Data Pipeline` (Python, LLM Agents, Ingestion, Embeddings)
  2. `Core Desktop Engine` (C#, .NET, High-Throughput Desktop Systems)
  3. `Automation & Services` (Async Workers, Scrapers, Background Jobs)
  4. `Client Delivery` (Reactive Web Interfaces, Dashboards, APIs)
- Interactivity: Click/hover node highlights connection paths and updates the side Telemetry Inspector panel showing live metrics, real project usage (meetbadi, Unitra, PyGlow), and system specifications.

- [ ] **Step 1: Create src/components/SystemArchitecture.tsx**

Implement the interactive SVG graph with stroke dash flow animation and the interactive telemetry inspector card:
- SVG diagram with vector connection conduits.
- Animated SVG packet pulses (`<animate>` or Framer Motion strokes).
- 4 interactive node blocks positioned in responsive layout.
- Telemetry Inspector card displaying Active Node metadata, Tech Stack, Key Systems, and live simulated throughput/latency.

- [ ] **Step 2: Verify component compiles with TypeScript**

Run: `npm run build`  
Expected: Pass.

- [ ] **Step 3: Commit component**

```bash
git add src/components/SystemArchitecture.tsx
git commit -m "feat(ui): create interactive System Architecture Schema component"
```

---

### Task 4: Hero & High-Tech HomeView Overhaul

**Files:**
- Modify: `src/views/HomeView.tsx`

**Interfaces:**
- Consumes: `onNavigate: (route: PageRoute) => void`, `SystemArchitecture` component.
- Produces: Overhauled `HomeView` with:
  1. Eyebrow badge: `SYSTEM ARCHITECTURE // SOFTWARE ENGINEERING` with live pulse.
  2. Monochromatic hero headline: *«Architecting reliable systems with Python, C#, and Applied AI.»*
  3. Embedded `SystemArchitecture` interactive component as the hero centerpiece.
  4. 4 indexed directory cards (`01 About`, `02 Projects`, `03 Research`, `04 Contacts`) styled in 1px hairline glassmorphism with technical indices and arrow triggers.

- [ ] **Step 1: Refactor HomeView.tsx to embed SystemArchitecture and high-tech directory grid**

Implement the modern hero section, embedding the interactive system architecture, and 4 high-tech directory modules with indices `01`, `02`, `03`, `04`.

- [ ] **Step 2: Verify build**

Run: `npm run build`  
Expected: Clean compilation.

- [ ] **Step 3: Commit HomeView overhaul**

```bash
git add src/views/HomeView.tsx
git commit -m "feat(ui): overhaul HomeView with high-tech hero and architecture centerpiece"
```

---

### Task 5: Projects Grid & Engineering Spec Sheet Modal Overhaul

**Files:**
- Modify: `src/views/ProjectsView.tsx`
- Modify: `src/components/ProjectModal.tsx`

**Interfaces:**
- Consumes: `Project` data, `onSelectProject`.
- Produces: High-tech asymmetric projects grid with featured cards (wide cards for meetbadi.com & Unitra, compact cards for others) and an engineering spec sheet modal with architecture breakdown.

- [ ] **Step 1: Overhaul ProjectsView.tsx**

Update `ProjectsView.tsx`:
- Header: `SYSTEM REGISTRY // ALL PROJECTS` with count indicator and filter tags.
- Project cards: 1px hairline borders, index tags (`[PRJ // 01]`, `[PRJ // 02]`), technical status badge (`PRODUCTION`, `ACTIVE DEVELOPMENT`, `OPEN SOURCE`), tech stack pills, and `Inspect Architecture ↗` action.

- [ ] **Step 2: Overhaul ProjectModal.tsx into an Engineering Spec Sheet**

Update `ProjectModal.tsx`:
- Modal header styled as a system dossier with project status, repository/demo links, and technical specifications.
- Clean tabbed or sectioned layout: *Problem Statement*, *Architecture & Key Decisions*, *Tech Stack Breakdown*, *Outcomes*.
- 1px hairline dividers, deep backdrop blur, keyboard ESC close.

- [ ] **Step 3: Verify build**

Run: `npm run build`  
Expected: Pass.

- [ ] **Step 4: Commit Projects & Modal changes**

```bash
git add src/views/ProjectsView.tsx src/components/ProjectModal.tsx
git commit -m "feat(ui): update ProjectsView and ProjectModal with engineering spec dossier design"
```

---

### Task 6: About, Research & Contacts High-Tech Views Overhaul

**Files:**
- Modify: `src/views/AboutView.tsx`
- Modify: `src/views/ResearchView.tsx`
- Modify: `src/views/ContactsView.tsx`

**Interfaces:**
- Consumes: Existing data structures and copy.
- Produces: High-tech styling for AboutView (milestone timeline & core competencies), ResearchView (engineering briefs/whitepapers), and ContactsView (direct communication channels with 1-click copy).

- [ ] **Step 1: Overhaul AboutView.tsx**

- Format experience & education as an engineering milestone conduit (Erasmus+ Grenergy LLC internship, software engineering degree).
- Core competencies categorized into Systems & Backend, AI & Data, Tools & Protocols with technical badges.

- [ ] **Step 2: Overhaul ResearchView.tsx**

- Reformat notes and articles into technical whitepaper briefs with index tags (`[DOC // 01]`, `[DOC // 02]`), reading times, and topic taxonomy.

- [ ] **Step 3: Overhaul ContactsView.tsx**

- Add high-visibility `Download CV [PDF] ↓` button.
- Direct contact cards (Email, Telegram, LinkedIn, GitHub) with 1-click copy and feedback toast/tooltip.

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: Pass.

- [ ] **Step 5: Commit remaining views**

```bash
git add src/views/AboutView.tsx src/views/ResearchView.tsx src/views/ContactsView.tsx
git commit -m "feat(ui): redesign About, Research, and Contacts views in monochrome high-tech style"
```

---

### Task 7: Full Verification, TypeScript Check & Production Build Test

**Files:**
- Verify: Whole repository.

**Interfaces:**
- Consumes: All updated components and styles.
- Produces: Passing TypeScript check, passing Vite production build, verified static routes.

- [ ] **Step 1: Run TypeScript compiler check and Vite build**

Run: `npm run build`  
Expected: Clean build, all route files copied to `dist/`, zero TypeScript errors.

- [ ] **Step 2: Preview build output**

Run: `npm run preview` test or check dist output.

- [ ] **Step 3: Final commit and cleanup**

```bash
git status
git commit --allow-empty -m "chore: complete dark high-tech UI/UX redesign verification"
```
