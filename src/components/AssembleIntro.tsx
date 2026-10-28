import React, { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Feature flag: set to false to disable the assemble animation entirely.
// ---------------------------------------------------------------------------
export const ASSEMBLE_ENABLED = true;

// ---------------------------------------------------------------------------
// Tunable constants
// ---------------------------------------------------------------------------
const CELL_SIZE = 28; // px, must match .tech-grid step
const SKIP_FRACTION = 0.38; // ~30-40% cells skipped for ragged edges
const BLOCK_STAGGER_MS = 220; // delay between consecutive blocks
const BLOCK_REVEAL_MS = 700; // how long a block takes to fade in
const CELL_FLASH_MS = 520; // total flash duration of one cell
const CELL_RISE_MS = 200; // ease-in (>=150ms per WCAG)
const CELL_FALL_MS = 320; // ease-out
const CELL_PEAK_OPACITY = 0.6; // max cell opacity (orange ~ red)
const MAX_WAIT_MS = 5000;

interface Block {
  el: HTMLElement;
  order: number;
  children: HTMLElement[];
  useChildren: boolean;
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
    // Base session key; suffixed with the current route at runtime.
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
    let completed = false;
    const timers: number[] = [];

    // Combine cleanups instead of overwriting the previous one.
    const addCleanup = (fn: () => void) => {
      const prev = cleanupListeners;
      cleanupListeners = () => {
        prev();
        fn();
      };
    };
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };
    // Mark the intro as done (once): session flag + onComplete.
    const complete = () => {
      if (completed) return;
      completed = true;
      sessionStorage.setItem(sessionKey, "1");
      onCompleteRef.current?.();
    };

    const finish = () => {
      if (finishCalled) return;
      finishCalled = true;
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimers();
      cleanupListeners();
      if (canvas) {
        canvas.remove();
        canvas = null;
      }
      blocks.forEach((b) => {
        if (b.useChildren) {
          b.children.forEach((c) => {
            c.style.opacity = "1";
            c.style.transform = "";
            c.style.transition = "";
          });
        } else {
          b.el.style.opacity = "1";
          b.el.style.transform = "";
          b.el.style.transition = "";
        }
      });
      complete();
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
          if (els.length < 2) return; // wait for at least nav + one block
          if (els.length !== lastCount) {
            lastCount = els.length;
            if (stableTimer) window.clearTimeout(stableTimer);
            stableTimer = window.setTimeout(() => {
              obs.disconnect();
              resolve(found());
            }, 600);
            timers.push(stableTimer);
          }
        };
        obs.observe(document.body, { childList: true, subtree: true });
        addCleanup(() => obs.disconnect());
        schedule();
        later(() => {
          obs.disconnect();
          if (stableTimer) window.clearTimeout(stableTimer);
          resolve(found());
        }, MAX_WAIT_MS);
      });
    };

    waitForBlocks().then((els) => {
      if (cancelled) return;
      blocks = els
        .map((el, i) => {
          const childEls = Array.from(el.children).filter(
            (n): n is HTMLElement => n instanceof HTMLElement,
          );
          const useChildren =
            childEls.length >= 2 && !/^H[1-6]$/.test(el.tagName);
          return {
            el,
            order: parseFloat(el.getAttribute("data-assemble") || String(i)),
            children: useChildren ? childEls : [],
            useChildren,
          };
        })
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
        if (b.useChildren) {
          b.children.forEach((c) => {
            c.style.opacity = "0";
            c.style.transform = "translateY(10px) scale(0.985)";
          });
        } else {
          b.el.style.opacity = "0";
          b.el.style.transform = "translateY(10px) scale(0.985)";
        }
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

      // Canvas overlay is created lazily and removed when no flash is active.
      interface Cell {
        x: number;
        y: number;
        start: number; // absolute performance.now() timestamp
        intensity: number;
      }
      let cells: Cell[] = [];
      let introEnd = 0; // absolute time when the initial animation ends
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const ensureCanvas = () => {
        if (canvas) return;
        canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        canvas.style.cssText =
          "position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:9999;";
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      // Generate brick cells for one block rect, starting at `baseStart`.
      const addCells = (rect: DOMRect, baseStart: number) => {
        const x0 = Math.floor(rect.left / CELL_SIZE) * CELL_SIZE;
        const y0 = Math.floor(rect.top / CELL_SIZE) * CELL_SIZE;
        const x1 = Math.ceil(rect.right / CELL_SIZE) * CELL_SIZE;
        const y1 = Math.ceil(rect.bottom / CELL_SIZE) * CELL_SIZE;
        const cols = Math.max(
          1,
          Math.ceil((rect.right - rect.left) / CELL_SIZE),
        );
        const blockHeight = Math.max(1, y1 - y0);
        const blockCenterY = y0 + blockHeight / 2;

        for (let y = y0; y < y1; y += CELL_SIZE) {
          for (let x = x0; x < x1; x += CELL_SIZE) {
            if (Math.random() < skipFraction) continue;
            const col = Math.round((x - x0) / CELL_SIZE);
            const waveDelay =
              (col / Math.max(cols - 1, 1)) * (CELL_FLASH_MS * 0.7);
            // Vertical gradient: center brighter, edges dimmer.
            const cellCenterY = y + CELL_SIZE / 2;
            const dist = Math.abs(cellCenterY - blockCenterY) / (blockHeight / 2);
            const intensity = Math.max(0.35, 1 - dist * 0.65);
            cells.push({ x, y, start: baseStart + waveDelay, intensity });
          }
        }
      };

      const tick = (now: number) => {
        rafId = 0;
        if (cancelled) return;
        if (!canvas || !ctx) ensureCanvas();
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const cell of cells) {
          const local = now - cell.start;
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
          opacity = opacity * cell.intensity;
          if (opacity <= 0.01) continue;
          ctx.fillStyle = `rgba(238, 96, 24, ${opacity})`;
          // Brick look: 1px gap around each cell.
          ctx.fillRect(cell.x + 1, cell.y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }
        // Drop cells whose flash is over.
        cells = cells.filter((c) => now - c.start <= CELL_FLASH_MS);
        if (now >= introEnd) complete();
        if (cells.length > 0 || now < introEnd) {
          rafId = requestAnimationFrame(tick);
        } else if (canvas) {
          // Nothing left to flash; remove canvas (recreated on demand).
          canvas.remove();
          canvas = null;
          ctx = null;
        }
      };
      const startLoop = () => {
        if (!rafId && !cancelled) rafId = requestAnimationFrame(tick);
      };

      const revealBlock = (b: Block, baseDelay = 0) => {
        if (cancelled) return;
        const apply = (el: HTMLElement) => {
          if (cancelled) return;
          el.style.transition = `opacity ${BLOCK_REVEAL_MS}ms ease, transform ${BLOCK_REVEAL_MS}ms ease`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        };
        if (b.useChildren) {
          b.children.forEach((c, ci) => {
            later(() => apply(c), baseDelay + ci * 90);
          });
        } else {
          later(() => apply(b.el), baseDelay);
        }
      };

      const startTime = performance.now();
      inViewBlocks.forEach((b, idx) => {
        const blockStart = idx * BLOCK_STAGGER_MS;
        addCells(b.el.getBoundingClientRect(), startTime + blockStart);
        // Schedule block reveal (children stagger if applicable).
        revealBlock(b, blockStart);
      });
      introEnd =
        inViewBlocks.length > 0
          ? startTime +
            (inViewBlocks.length - 1) * BLOCK_STAGGER_MS +
            BLOCK_REVEAL_MS +
            CELL_FLASH_MS
          : 0;

      // Deferred blocks: reveal (with brick flash) when scrolled into view.
      // The observer keeps running after the intro animation ends.
      let io: IntersectionObserver | null = null;
      if (deferredBlocks.length > 0 && "IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (cancelled || !entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              const block = deferredBlocks.find((b) => b.el === el);
              if (block) {
                addCells(el.getBoundingClientRect(), performance.now());
                ensureCanvas();
                startLoop();
                revealBlock(block);
              }
              io?.unobserve(el);
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
        );
        deferredBlocks.forEach((b) => io?.observe(b.el));
      } else {
        deferredBlocks.forEach((b) => revealBlock(b));
      }

      // Extend cleanup to disconnect observer.
      addCleanup(() => {
        if (io) io.disconnect();
      });

      // Interaction / resize -> finish immediately (scroll is intentionally
      // excluded so deferred blocks can be revealed by the IntersectionObserver).
      const onInteract = () => finish();
      const onResize = () => finish();
      window.addEventListener("click", onInteract);
      window.addEventListener("keydown", onInteract);
      window.addEventListener("resize", onResize);
      addCleanup(() => {
        window.removeEventListener("click", onInteract);
        window.removeEventListener("keydown", onInteract);
        window.removeEventListener("resize", onResize);
      });

      // Reduced-motion change during animation.
      const onMqChange = (e: MediaQueryListEvent) => {
        if (e.matches) finish();
      };
      reducedMQ.addEventListener("change", onMqChange);
      addCleanup(() => reducedMQ.removeEventListener("change", onMqChange));

      // If nothing is in view, skip the canvas animation but keep scroll reveals.
      if (inViewBlocks.length === 0) {
        complete();
        return;
      }

      // rAF draw loop.
      ensureCanvas();
      startLoop();
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimers();
      cleanupListeners();
      if (canvas) canvas.remove();
      blocks.forEach((b) => {
        if (b.useChildren) {
          b.children.forEach((c) => {
            c.style.opacity = "1";
            c.style.transform = "";
            c.style.transition = "";
          });
        } else {
          b.el.style.opacity = "1";
          b.el.style.transform = "";
          b.el.style.transition = "";
        }
      });
    };
  }, [enabled]);

  return null;
};

export default AssembleIntro;
