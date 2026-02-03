"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// SSR-safe layout effect: runs synchronously before paint on client,
// falls back to useEffect (no-op during SSR) on server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Module-level debug flag — checked once at import time.
// Append ?debugLayout=1 to URL to enable console logging.
const DEBUG =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("debugLayout");

/**
 * ResponsiveArtboard
 *
 * Scales art-directed content (designed at a fixed pixel width) down
 * proportionally on smaller screens using CSS transform: scale().
 *
 * Two-phase measurement strategy:
 *   Phase 1 (useLayoutEffect): synchronous measurement before first paint.
 *           If it gets a valid offsetWidth → scale + reveal in one go.
 *   Phase 2 (useEffect):        bounded rAF retry if Phase 1 got width=0,
 *           ResizeObserver, fonts.ready, visualViewport, orientationchange.
 *
 * Content is hidden (opacity:0) until a valid measurement succeeds.
 */

interface ResponsiveArtboardProps {
  children: ReactNode;
  /** The design width in pixels (default: 1920) */
  designWidth?: number;
  /** CSS aspect-ratio value (e.g., "16 / 9", "1920 / 1469.4451") */
  aspectRatio: string;
  /** Additional className for the section wrapper */
  className?: string;
  /** Section id for navigation */
  id?: string;
  /** Z-index for the section */
  zIndex?: number;
  /** Whether to allow overflow (for dropdowns that extend beyond section) */
  allowOverflow?: boolean;
}

export function ResponsiveArtboard({
  children,
  designWidth = 1920,
  aspectRatio,
  className = "",
  id,
  zIndex,
  allowOverflow = false,
}: ResponsiveArtboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measuredOk = useRef(false);

  // ── State ──────────────────────────────────────────────────────
  // CRITICAL: identical initial values on server AND client.
  // scale=1 is a safe default (no scaling). Content is hidden via
  // isReady=false until a valid measurement is taken.
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const tag = id ? `[Artboard#${id}]` : "[Artboard]";

  // ── Measure helper ─────────────────────────────────────────────
  // Reads container.offsetWidth, computes scale, updates state.
  // Returns true if measurement was valid (width > 0).
  const measure = useCallback((): boolean => {
    const el = containerRef.current;
    if (!el) return false;

    const w = el.offsetWidth;

    if (DEBUG) {
      console.log(tag, "measure", {
        offsetWidth: w,
        clientWidth: el.clientWidth,
        boundingWidth: Math.round(el.getBoundingClientRect().width),
        designWidth,
        computedScale: w > 0 ? +(w / designWidth).toFixed(5) : "SKIP(w=0)",
      });
    }

    if (w <= 0) return false;

    setScale(Math.min(1, w / designWidth));
    return true;
  }, [designWidth, tag]);

  // ── Reveal helper ──────────────────────────────────────────────
  // Flips opacity to 1. Only runs once (idempotent via ref guard).
  const reveal = useCallback(() => {
    if (!measuredOk.current) {
      measuredOk.current = true;
      setIsReady(true);
    }
  }, []);

  // ── Phase 1: synchronous measurement (blocks browser paint) ───
  useIsomorphicLayoutEffect(() => {
    if (measure()) {
      reveal();
      if (DEBUG) console.log(tag, "✓ Phase 1 succeeded (layoutEffect)");
    } else if (DEBUG) {
      console.warn(tag, "✗ Phase 1: width=0, deferring to Phase 2");
    }
  }, [measure, reveal, tag]);

  // ── Phase 2: post-paint fallback + observers ──────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | undefined;

    // Retry if Phase 1 did not get a valid measurement
    if (!measuredOk.current) {
      let n = 0;
      const MAX = 10;

      const retry = () => {
        n++;
        if (DEBUG) {
          console.log(tag, `retry #${n}, offsetWidth=${el.offsetWidth}`);
        }
        if (measure()) {
          reveal();
          if (DEBUG) console.log(tag, `✓ measured on retry #${n}`);
          return;
        }
        if (n < MAX) {
          rafId = requestAnimationFrame(retry);
        } else {
          // Last-ditch fallback: use window.innerWidth
          const fallback = Math.min(1, window.innerWidth / designWidth);
          if (DEBUG) {
            console.warn(
              tag,
              `✗ ${MAX} retries exhausted → window.innerWidth fallback, scale=${fallback.toFixed(4)}`
            );
          }
          setScale(fallback);
          reveal();
        }
      };

      rafId = requestAnimationFrame(retry);
    }

    // ResizeObserver for ongoing size changes
    const ro = new ResizeObserver(() => {
      if (measure()) reveal();
    });
    ro.observe(el);

    // Additional stabilisation listeners
    const remeasure = () => {
      if (measure()) reveal();
    };

    // Fonts can reflow layout and shift container width
    document.fonts?.ready?.then(() => {
      if (DEBUG) console.log(tag, "fonts.ready → remeasure");
      remeasure();
    });

    // Safari dynamic toolbar changes visual viewport
    window.visualViewport?.addEventListener("resize", remeasure);

    // Orientation change on mobile
    window.addEventListener("orientationchange", remeasure);

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", remeasure);
      window.removeEventListener("orientationchange", remeasure);
    };
  }, [measure, reveal, designWidth, tag]);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <section
      id={id}
      className={`relative w-full ${
        allowOverflow
          ? "overflow-y-visible overflow-x-hidden"
          : "overflow-hidden"
      } ${className}`}
      style={{
        zIndex,
        position: "relative",
      }}
    >
      {/* Measurement container: full width, aspect-ratio sets height */}
      <div
        ref={containerRef}
        className={`mx-auto w-full relative ${
          allowOverflow ? "overflow-y-visible overflow-x-hidden" : ""
        }`}
        style={{
          maxWidth: `${designWidth}px`,
          aspectRatio,
        }}
      >
        {/* Inner scaling container: fixed at design width, scaled down */}
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: `${designWidth}px`,
            aspectRatio,
            transform: `scale(${scale})`,
            // Hidden until a valid scale is computed
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.15s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default ResponsiveArtboard;
