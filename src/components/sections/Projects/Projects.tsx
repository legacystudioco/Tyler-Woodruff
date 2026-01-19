"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { glowStyle, desyncDelays, desyncDurations } from "@/lib/motionPresets";
import { ExpandableProjectPillRow } from "./ExpandableProjectPillRow";
import { ResponsiveArtboard } from "@/components/ui/ResponsiveArtboard";

/**
 * Projects Section
 *
 * Artboard size: 1920 x 1469.4451
 * Layer stack (bottom -> top):
 * - Background (05)
 * - Header (01) *!
 * - Interactive pills as tilted deck (3 rows)
 *
 * DECK LAYOUT:
 * - Pills are absolutely positioned in a tilted deck arrangement
 * - Row 1 (top): slight negative rotation, higher position
 * - Row 2 (middle): near flat, centered
 * - Row 3 (bottom): slight positive rotation, lower position
 * - Dropdowns are absolutely positioned, do NOT push other pills
 * - Only one row can be open at a time
 *
 * Pills assets in /public/assets/projects/motion_pills/:
 * - pills-01.png: Chevron (shared)
 * - Row 1: pills-03 (base), pills-05 (overlay), pills-08 (dropdown)
 * - Row 2: pills-04 (base), pills-06 (overlay), pills-09 (dropdown)
 * - Row 3: pills-04 (base), pills-07 (overlay), pills-10 (dropdown)
 */

interface OverlayLayerConfig {
  id: string;
  src: string;
  z: number;
  hasFloat: boolean;
  hasGlow: boolean;
  hoverable: boolean;
  hoverRotate: number;
  baseScale: number;
}

// Only header layer now - cards replaced by interactive pills deck
const overlayLayers: OverlayLayerConfig[] = [
  {
    id: "header",
    src: "/assets/projects/projects-01.png",
    z: 10,
    hasFloat: true,
    hasGlow: true,
    hoverable: true,
    hoverRotate: -1,
    baseScale: 0.8,
  },
];

const createLayerVariants = (duration: number, delay: number, hoverRotate: number, baseScale: number = 1) => ({
  rest: {
    y: [0, -8, 0],
    rotateZ: 0,
    scale: baseScale,
    transition: {
      y: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
        delay,
      },
    },
  },
  hover: {
    y: -6,
    rotateZ: hoverRotate,
    scale: baseScale * 1.015,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
});

// Row configuration for the deck
interface RowConfig {
  rowId: string;
  basePillSrc: string;
  overlayPillSrc: string;
  dropdownSrc: string;
  // Deck positioning
  deckTop: string;
  deckLeft: string;
  deckRotate: number;
  deckZIndex: number;
  // Optional overlay offset
  overlayOffsetX?: number;
}

/**
 * DECK POSITION VALUES:
 * - Row 1: top 10%, left 12%, rotate -4deg, z-index 30
 * - Row 2: top 32%, left 18%, rotate 0deg, z-index 20
 * - Row 3: top 54%, left 8%, rotate +4deg, z-index 10
 *
 * These create a tilted deck effect where pills overlap slightly.
 * Adjust these values to tune the visual appearance.
 */
const rowConfigs: RowConfig[] = [
  {
    rowId: "row1",
    basePillSrc: "/assets/projects/motion_pills/pills-03.png",
    overlayPillSrc: "/assets/projects/motion_pills/pills-05.png",
    dropdownSrc: "/assets/projects/motion_pills/pills-08.png",
    deckTop: "12%",
    deckLeft: "12%",
    deckRotate: -4,
    deckZIndex: 30,
  },
  {
    rowId: "row2",
    basePillSrc: "/assets/projects/motion_pills/pills-04.png",
    overlayPillSrc: "/assets/projects/motion_pills/pills-06.png",
    dropdownSrc: "/assets/projects/motion_pills/pills-09.png",
    deckTop: "28%",
    deckLeft: "18%",
    deckRotate: 0,
    deckZIndex: 20,
    overlayOffsetX: 55, // Shift overlay text right into the light-blue area
  },
  {
    rowId: "row3",
    basePillSrc: "/assets/projects/motion_pills/pills-04.png",
    overlayPillSrc: "/assets/projects/motion_pills/pills-07.png",
    dropdownSrc: "/assets/projects/motion_pills/pills-10.png",
    deckTop: "44%",
    deckLeft: "8%",
    deckRotate: 4,
    deckZIndex: 10,
  },
];

const CHEVRON_SRC = "/assets/projects/motion_pills/pills-01.png";

// Debug toggle for deck stage visualization
const DEBUG_DECK_STAGE = false;

export function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Accordion state management
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [pendingRowId, setPendingRowId] = useState<string | null>(null);

  // Force close signal - increment to trigger auto-close of any open row
  const [forceCloseSignal, setForceCloseSignal] = useState(0);

  // Sentinel ref for IntersectionObserver (placed at bottom of Projects section)
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /**
   * IntersectionObserver: Auto-close pills when user scrolls past Projects section
   * - Watches a sentinel element at the bottom of the Projects section
   * - When sentinel exits viewport (user scrolled into next section), trigger close
   * - rootMargin: "0px 0px -40% 0px" triggers slightly before full overlap
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When sentinel is NOT intersecting (scrolled past Projects bottom)
        // AND we have an open row, trigger force close
        if (!entry.isIntersecting && activeRowId !== null) {
          setForceCloseSignal((prev) => prev + 1);
        }
      },
      {
        // rootMargin: negative bottom margin triggers close before full overlap
        // -40% means close when sentinel is 40% of viewport height from bottom
        rootMargin: "0px 0px -40% 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [activeRowId]);

  let floatIndex = 0;

  /**
   * Handle request to open a row
   * If another row is open, set pending and let it close first
   */
  const handleRequestOpen = useCallback((rowId: string) => {
    if (activeRowId === null) {
      // No row is open, open immediately
      setActiveRowId(rowId);
      setPendingRowId(null);
    } else if (activeRowId !== rowId) {
      // Another row is open, set pending to trigger close
      setPendingRowId(rowId);
    }
  }, [activeRowId]);

  /**
   * Handle request to close the current row
   */
  const handleRequestClose = useCallback(() => {
    // Close will be handled by the row component animation
    // After close completes, onCloseComplete will be called
  }, []);

  /**
   * Called when a row finishes its close animation
   */
  const handleCloseComplete = useCallback(() => {
    if (pendingRowId !== null) {
      // Another row was waiting to open
      setActiveRowId(pendingRowId);
      setPendingRowId(null);
    } else {
      // Just closing, no pending row
      setActiveRowId(null);
    }
  }, [pendingRowId]);

  // Determine if any row is open (for z-index layering)
  const isAnyOpen = activeRowId !== null;

  return (
    <ResponsiveArtboard
      id="projects"
      aspectRatio="1920 / 1469.4451"
      zIndex={isAnyOpen ? 20 : 1}
      allowOverflow={true}
    >
      <div
        className="relative w-full h-full"
        style={{
          backgroundColor: "#050B2A",
        }}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <Image
            src="/assets/projects/projects-05.png"
            alt=""
            fill
            priority
            quality={95}
            style={{ objectFit: "contain", objectPosition: "top center" }}
            sizes="100vw"
          />
        </div>

        {/* Header overlay layer - full artboard overlay, anchored near top */}
        {overlayLayers.map((layer) => {
          const currentFloatIndex = floatIndex++;
          const delay = desyncDelays.extended[currentFloatIndex % desyncDelays.extended.length];
          const duration = desyncDurations.extended[currentFloatIndex % desyncDurations.extended.length];
          const layerVariants = createLayerVariants(duration, delay, layer.hoverRotate, layer.baseScale);
          const isHovered = hoveredId === layer.id;

          return (
            <motion.div
              key={layer.id}
              className="absolute pointer-events-none"
              style={{
                zIndex: layer.z,
                // Position header near top of section - using explicit top offset instead of inset-0
                top: "-6%",
                left: 0,
                right: 0,
                bottom: 0,
                ...(layer.hasGlow ? glowStyle : {}),
              }}
              variants={layerVariants}
              animate={isHovered ? "hover" : "rest"}
              aria-hidden="true"
            >
              <Image
                src={layer.src}
                alt=""
                fill
                style={{ objectFit: "contain", objectPosition: "top center" }}
                sizes="100vw"
                priority={layer.id === "header"}
              />
            </motion.div>
          );
        })}

        {/*
          DECK STAGE CONTAINER
          - Fixed positioning area for the tilted deck of pills
          - Large enough to contain dropdowns when expanded
          - Pills are absolutely positioned within this container
          - overflow: visible so dropdowns can extend if needed
        */}
        <div
          className="absolute pointer-events-auto"
          style={{
            zIndex: 20,
            // Position the deck stage within the artboard
            // Moved up to sit ~3-5px below header, centered horizontally with right offset
            top: "18%",
            left: "50%",
            transform: "translateX(-30%) translateY(-14%) scale(1.35)", // translateY moves deck up closer to header
            transformOrigin: "top left",
            width: "90%",
            height: "75%", // Large enough to contain expanded dropdowns
            ...(DEBUG_DECK_STAGE ? { outline: "2px dashed rgba(255, 255, 0, 0.5)", background: "rgba(255, 255, 0, 0.05)" } : {}),
          }}
        >
          {/* Debug label for deck stage */}
          {DEBUG_DECK_STAGE && (
            <span className="absolute top-0 left-0 text-xs text-yellow-400 font-mono bg-black/50 px-1">
              DECK STAGE
            </span>
          )}

          {/* Tilted deck of pills */}
          {rowConfigs.map((config) => (
            <ExpandableProjectPillRow
              key={config.rowId}
              rowId={config.rowId}
              basePillSrc={config.basePillSrc}
              overlayPillSrc={config.overlayPillSrc}
              dropdownSrc={config.dropdownSrc}
              chevronSrc={CHEVRON_SRC}
              activeRowId={activeRowId}
              pendingRowId={pendingRowId}
              onRequestOpen={handleRequestOpen}
              onRequestClose={handleRequestClose}
              onCloseComplete={handleCloseComplete}
              pillWidth={450}
              pillHeight={130}
              dropdownWidth={450}
              dropdownHeight={700}
              // Deck positioning props
              deckTop={config.deckTop}
              deckLeft={config.deckLeft}
              deckRotate={config.deckRotate}
              deckZIndex={config.deckZIndex}
              overlayOffsetX={config.overlayOffsetX}
              // Auto-close signal from scroll observer
              forceCloseSignal={forceCloseSignal}
            />
          ))}
        </div>

        {/* Sentinel element for IntersectionObserver - triggers auto-close when scrolled past */}
        <div
          ref={sentinelRef}
          className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </ResponsiveArtboard>
  );
}

export default Projects;
