import React, { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Feature flag: set to false to disable the assemble animation entirely.
// ---------------------------------------------------------------------------
export const ASSEMBLE_ENABLED = true;

// ---------------------------------------------------------------------------
// Tunable constants
// ---------------------------------------------------------------------------
const CELL_SIZE = 28; // px, must match .tech-grid step
const SKIP_FRACTION = 0.32; // ~30-35% cells skipped for ragged edges
const BLOCK_STAGGER_MS = 180; // delay between consecutive blocks
const BLOCK_REVEAL_MS = 600; // how long a block takes to fade in
const CELL_FLASH_MS = 450; // total flash duration of one cell
const CELL_RISE_MS = 180; // ease-in (>=150ms per WCAG)
const CELL_FALL_MS = 270; // ease-out
const CELL_PEAK_OPACITY = 0.6; // max cell opacity (orange ~ red)
// Base session key; suffixed with the current route at runtime.
const MAX_WAIT_MS = 3000;

interface Block {
  el: HTMLElement;
  order: number;
}

function easeInOut(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export interface AssembleIntroProps {
  onComplete?: () => void;
  enabled?: boolean;
}

export const AssembleIntro: React.FC<AssembleIntroProps> = ({ onComplete, enabled = true }) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!ASSEMBLE_ENABLED || !enabled) {
      onCompleteRef.current?.();
      return;
    }

    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    const replay = new URLSearchParams(window.location.search).has('replay');

    const routeSlug = window.location.pathname.split("/").filter(Boolean).join("-") || "home";
    const sessionKey = `yk:assemble:played:v1:${routeSlug}`;

    // Already played this session -> skip (unless ?replay is present).
    if (!replay && sessionStorage.getItem(sessionKey) === "1") {
      onCompleteRef.current?.();
      return;
    }

    // Reduced motion: no assemble, content stays visible.
    if (reducedMQ.matches) {
      sessionStorage.setItem(sessionKey, "1");
      onCompleteRef.current?.();
      return;
    }

    let cancelled = false;
    let finishCalled = false;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let rafId = 0;
    let blocks: Block[] = [];
    let cleanupListeners: () => void = () => {};

    const finish = () => {
      if (finishCalled) return;
      finishCalled = true;
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanupListeners();
      if (canvas) {
        canvas.remove();
        canvas = null;
      }
      blocks.forEach((b) => {
        b.el.style.opacity = "1";
        b.el.style.transform = "";
        b.el.style.transition = "";
      });
      sessionStorage.setItem(sessionKey, "1");
      onCompleteRef.current?.();
    };

    // Wait for annotated blocks to appear in the DOM (lazy-loaded view).
    const waitForBlocks = (): Promise<HTMLElement[]> => {
      return new Promise((resolve) => {
        const found = () =>
          Array.from(document.querySelectorAll<HTMLElement>("[data-assemble]"));
        let lastCount = -1;
        let stableTimer = 0;
        const obs = new MutationObserver(() => schedule());
        const schedule = () => {
          const els = found();
          if (els.length === 0) return;
          if (els.length !== lastCount) {
            lastCount = els.length;
            if (stableTimer) window.clearTimeout(stableTimer);
            stableTimer = window.setTimeout(() => {
              obs.disconnect();
              resolve(found());
            }, 300);
          }
        };
        obs.observe(document.body, { childList: true, subtree: true });
        schedule();
        window.setTimeout(() => {
          obs.disconnect();
          if (stableTimer) window.clearTimeout(stableTimer);
          resolve(found());
        }, MAX_WAIT_MS);
      });
    };

    waitForBlocks().then((els) => {
      if (cancelled) return;
      blocks = els
        .map((el, i) => ({
          el,
          order: parseInt(el.getAttribute("data-assemble") || String(i), 10),
        }))
        .sort(
          (a, b) =>
            (isNaN(a.order) ? 0 : a.order) - (isNaN(b.order) ? 0 : b.order),
        );

      if (blocks.length === 0) {
        finish();
        return;
      }

      // Hide content visually (opacity only, no layout shift).
      const skipFraction = window.innerWidth < 640 ? 0.5 : SKIP_FRACTION;

      blocks.forEach((b) => {
        b.el.style.opacity = "0";
        b.el.style.transform = "translateY(8px)";
      });

      // Split blocks into in-view (animated now) and deferred (revealed on scroll).
      const inViewBlocks: Block[] = [];
      const deferredBlocks: Block[] = [];
      blocks.forEach((b) => {
        const rect = b.el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          inViewBlocks.push(b);
        } else {
          deferredBlocks.push(b);
        }
      });

      // Build canvas overlay.
      canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:9999;";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const resizeCanvas = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resizeCanvas();

      // Generate cells per in-view block.
      interface Cell {
        x: number;
        y: number;
        start: number;
      }
      const cells: Cell[] = [];

      inViewBlocks.forEach((b, idx) => {
        const blockStart = idx * BLOCK_STAGGER_MS;
        const rect = b.el.getBoundingClientRect();
        const x0 = Math.floor(rect.left / CELL_SIZE) * CELL_SIZE;
        const y0 = Math.floor(rect.top / CELL_SIZE) * CELL_SIZE;
        const x1 = Math.ceil(rect.right / CELL_SIZE) * CELL_SIZE;
        const y1 = Math.ceil(rect.bottom / CELL_SIZE) * CELL_SIZE;
        const cols = Math.max(
          1,
          Math.ceil((rect.right - rect.left) / CELL_SIZE),
        );

        for (let y = y0; y < y1; y += CELL_SIZE) {
          for (let x = x0; x < x1; x += CELL_SIZE) {
            if (Math.random() < skipFraction) continue;
            const col = Math.round((x - x0) / CELL_SIZE);
            const waveDelay =
              (col / Math.max(cols - 1, 1)) * (CELL_FLASH_MS * 0.55);
            cells.push({ x, y, start: blockStart + waveDelay });
          }
        }

        // Schedule block reveal.
        window.setTimeout(() => {
          if (cancelled) return;
          b.el.style.transition = `opacity ${BLOCK_REVEAL_MS}ms ease, transform ${BLOCK_REVEAL_MS}ms ease`;
          b.el.style.opacity = "1";
          b.el.style.transform = "translateY(0)";
        }, blockStart);
      });

      // Deferred blocks: reveal when scrolled into view.
      let io: IntersectionObserver | null = null;
      if (deferredBlocks.length > 0 && "IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              el.style.transition = `opacity ${BLOCK_REVEAL_MS}ms ease, transform ${BLOCK_REVEAL_MS}ms ease`;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
              io?.unobserve(el);
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
        );
        deferredBlocks.forEach((b) => io?.observe(b.el));
      } else {
        deferredBlocks.forEach((b) => {
          b.el.style.transition = `opacity ${BLOCK_REVEAL_MS}ms ease, transform ${BLOCK_REVEAL_MS}ms ease`;
          b.el.style.opacity = "1";
          b.el.style.transform = "translateY(0)";
        });
      }

      // Extend cleanup to disconnect observer.
      const prevCleanupIO = cleanupListeners;
      cleanupListeners = () => {
        prevCleanupIO();
        if (io) io.disconnect();
      };

      // Interaction / resize -> finish immediately.
      const onInteract = () => finish();
      const onResize = () => finish();
      window.addEventListener("click", onInteract);
      window.addEventListener("scroll", onInteract, { passive: true });
      window.addEventListener("keydown", onInteract);
      window.addEventListener("resize", onResize);
      cleanupListeners = () => {
        window.removeEventListener("click", onInteract);
        window.removeEventListener("scroll", onInteract);
        window.removeEventListener("keydown", onInteract);
        window.removeEventListener("resize", onResize);
      };

      // Reduced-motion change during animation.
      const onMqChange = (e: MediaQueryListEvent) => {
        if (e.matches) finish();
      };
      reducedMQ.addEventListener("change", onMqChange);
      const prevCleanup = cleanupListeners;
      cleanupListeners = () => {
        prevCleanup();
        reducedMQ.removeEventListener("change", onMqChange);
      };

      // If nothing is in view, skip the canvas animation but keep scroll reveals.
      if (inViewBlocks.length === 0) {
        if (canvas) {
          canvas.remove();
          canvas = null;
        }
        sessionStorage.setItem(sessionKey, "1");
        onCompleteRef.current?.();
        return;
      }

      // rAF draw loop.
      const startTime = performance.now();
      const TOTAL =
        (inViewBlocks.length - 1) * BLOCK_STAGGER_MS +
        BLOCK_REVEAL_MS +
        CELL_FLASH_MS;

      const tick = (now: number) => {
        if (cancelled || !ctx || !canvas) return;
        const t = now - startTime;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const cell of cells) {
          const local = t - cell.start;
          if (local < 0 || local > CELL_FLASH_MS) continue;
          let opacity = 0;
          if (local < CELL_RISE_MS) {
            opacity = easeInOut(local / CELL_RISE_MS) * CELL_PEAK_OPACITY;
          } else {
            const fallLocal = local - CELL_RISE_MS;
            if (fallLocal > CELL_FALL_MS) continue;
            opacity =
              (1 - easeInOut(fallLocal / CELL_FALL_MS)) * CELL_PEAK_OPACITY;
          }
          if (opacity <= 0.01) continue;
          ctx.fillStyle = `rgba(238, 96, 24, ${opacity})`;
          ctx.fillRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);
        }
        if (t < TOTAL) {
          rafId = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      rafId = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanupListeners();
      if (canvas) canvas.remove();
      blocks.forEach((b) => {
        b.el.style.opacity = "1";
        b.el.style.transform = "";
        b.el.style.transition = "";
      });
    };
  }, [enabled]);

  return null;
};

export default AssembleIntro;
