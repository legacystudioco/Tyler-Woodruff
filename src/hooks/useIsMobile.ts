"use client";

import { useState, useEffect, useLayoutEffect } from "react";

// SSR-safe: useLayoutEffect on client (sync before paint), useEffect on server (no-op)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hook to detect mobile viewport
 * Returns true when viewport width <= breakpoint (default 768px)
 *
 * Uses useLayoutEffect so the correct value is committed to the DOM
 * BEFORE the browser paints — prevents a flash of the wrong layout
 * (e.g. desktop Hero rendering briefly on a mobile screen).
 *
 * SSR-safe: returns false during server render.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  // Synchronous check before first paint
  useIsomorphicLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Initial check (runs before browser paints)
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
