"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * ResponsiveArtboard Component
 *
 * A reusable wrapper that scales art-directed content (designed at 1920px width)
 * down proportionally on smaller screens using CSS transforms.
 *
 * Features:
 * - Uses ResizeObserver to detect container width changes
 * - Applies CSS transform: scale() for smooth scaling
 * - Maintains aspect ratio of original design
 * - Desktop (≥1920px): No scaling applied
 * - Mobile/Tablet (<1920px): Scales down proportionally
 * - Preserves all original positioning and layout
 *
 * Usage:
 * <ResponsiveArtboard designWidth={1920} aspectRatio="16 / 9">
 *   ...art-directed content...
 * </ResponsiveArtboard>
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
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      // Only scale down, never scale up beyond 1
      const newScale = Math.min(1, containerWidth / designWidth);
      setScale(newScale);
    };

    // Initial calculation
    updateScale();

    // Use ResizeObserver to track container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [designWidth]);

  return (
    <section
      id={id}
      className={`relative w-full ${allowOverflow ? "overflow-visible" : "overflow-hidden"} ${className}`}
      style={{
        zIndex: zIndex,
        position: "relative",
      }}
    >
      {/* Outer container: full width, sets measurement reference */}
      <div
        ref={containerRef}
        className="mx-auto w-full relative"
        style={{
          maxWidth: `${designWidth}px`,
          // The container height is determined by aspect ratio at current width
          aspectRatio: aspectRatio,
        }}
      >
        {/* Inner scaling container: fixed at design width, scaled down */}
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: `${designWidth}px`,
            aspectRatio: aspectRatio,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default ResponsiveArtboard;
