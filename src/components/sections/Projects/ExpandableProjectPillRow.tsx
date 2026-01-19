"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * ExpandableProjectPillRow
 *
 * Reusable component implementing the same phase sequencing as TestSection:
 * - OPEN sequence: pill → chevron → dropdown
 * - CLOSE sequence: dropdown → chevron → pill
 *
 * DECK LAYOUT VERSION:
 * - Component is absolutely positioned by parent
 * - Dropdown is absolutely positioned under the pill (no document flow push)
 * - Non-active pills dim slightly when another is active
 *
 * Layering:
 * - Base pill (stretches on click) - scaleX from left origin
 * - Overlay content pill (static, centered on base pill, does NOT scale)
 * - Chevron (rotates after pill expands, shifts left when expanded)
 * - Dropdown panel (reveals from behind pill, absolutely positioned)
 *
 * Animation values:
 * - Pill expansion: scaleX 1.15
 * - Chevron expanded x-shift: -16px
 */

export type AnimationPhase = "idle" | "pill" | "chevron" | "dropdown";

/**
 * Debug toggle for pill alignment visualization
 * Set to true to see outlines around row container, base pill, and overlay pill
 */
const DEBUG_PILL_BOUNDS = false;

interface ExpandableProjectPillRowProps {
  basePillSrc: string;
  overlayPillSrc: string;
  dropdownSrc: string;
  chevronSrc: string;
  rowId: string;
  activeRowId: string | null;
  pendingRowId: string | null;
  onRequestOpen: (rowId: string) => void;
  onRequestClose: () => void;
  onCloseComplete: () => void;
  pillWidth?: number;
  pillHeight?: number;
  dropdownWidth?: number;
  dropdownHeight?: number;
  /** Deck position: top offset as percentage string */
  deckTop: string;
  /** Deck position: left offset as percentage string */
  deckLeft: string;
  /** Deck rotation in degrees */
  deckRotate: number;
  /** Base z-index for this row in the deck */
  deckZIndex: number;
  /** Optional horizontal offset for overlay pill (pixels, positive = right) */
  overlayOffsetX?: number;
  /** Signal to force close this row (increment to trigger close) */
  forceCloseSignal?: number;
}

// Animation constants
const PILL_SCALE_X = 1.15;
const CHEVRON_EXPANDED_X = -16;

// Active row glow style (no pulsing, subtle ambient emphasis)
const activeGlowStyle = {
  filter: "drop-shadow(0 0 12px rgba(120, 200, 255, 0.35)) drop-shadow(0 0 24px rgba(100, 180, 255, 0.2))",
};

export function ExpandableProjectPillRow({
  basePillSrc,
  overlayPillSrc,
  dropdownSrc,
  chevronSrc,
  rowId,
  activeRowId,
  pendingRowId,
  onRequestOpen,
  onRequestClose,
  onCloseComplete,
  pillWidth = 400,
  pillHeight = 120,
  dropdownWidth = 400,
  dropdownHeight = 600,
  deckTop,
  deckLeft,
  deckRotate,
  deckZIndex,
  overlayOffsetX = 0,
  forceCloseSignal = 0,
}: ExpandableProjectPillRowProps) {
  const isActive = activeRowId === rowId;
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");

  // Determine if this row should show the active glow
  // Show glow when expanded or in any phase of expanding/collapsing
  const showActiveGlow = isExpanded || animationPhase !== "idle";

  // Determine if another row is active (for dimming non-active pills)
  const anotherRowIsActive = activeRowId !== null && activeRowId !== rowId;

  // Handle external close request (when another row is clicked)
  useEffect(() => {
    if (!isActive && isExpanded && pendingRowId !== null && pendingRowId !== rowId) {
      // Another row wants to open, start close sequence
      setAnimationPhase("dropdown");
      setIsExpanded(false);
    }
  }, [isActive, isExpanded, pendingRowId, rowId]);

  // Sync with activeRowId changes
  useEffect(() => {
    if (isActive && !isExpanded && animationPhase === "idle") {
      // This row became active, start open sequence
      setAnimationPhase("pill");
      setIsExpanded(true);
    }
  }, [isActive, isExpanded, animationPhase]);

  // Track previous forceCloseSignal to detect changes
  const prevForceCloseSignal = useRef(forceCloseSignal);

  // Handle force close signal from parent (e.g., scroll-triggered auto-close)
  useEffect(() => {
    if (forceCloseSignal !== prevForceCloseSignal.current) {
      prevForceCloseSignal.current = forceCloseSignal;
      // If this row is expanded, trigger close sequence
      if (isExpanded && animationPhase === "idle") {
        onRequestClose();
        setAnimationPhase("dropdown");
        setIsExpanded(false);
      }
    }
  }, [forceCloseSignal, isExpanded, animationPhase, onRequestClose]);

  /**
   * Handle pill click
   */
  const handleClick = useCallback(() => {
    if (isExpanded) {
      // Close this row
      onRequestClose();
      setAnimationPhase("dropdown");
      setIsExpanded(false);
    } else {
      // Request to open this row
      onRequestOpen(rowId);
    }
  }, [isExpanded, onRequestClose, onRequestOpen, rowId]);

  /**
   * Animation timing callbacks - same as TestSection
   */
  const onPillAnimationComplete = useCallback(() => {
    if (isExpanded && animationPhase === "pill") {
      // Expand: pill done → start chevron
      setAnimationPhase("chevron");
    } else if (!isExpanded && animationPhase === "pill") {
      // Collapse complete → idle
      setAnimationPhase("idle");
      onCloseComplete();
    }
  }, [isExpanded, animationPhase, onCloseComplete]);

  const onChevronAnimationComplete = useCallback(() => {
    if (isExpanded && animationPhase === "chevron") {
      // Expand: chevron done → start dropdown
      setAnimationPhase("dropdown");
    } else if (!isExpanded && animationPhase === "chevron") {
      // Collapse: chevron done → start pill contraction
      setAnimationPhase("pill");
    }
  }, [isExpanded, animationPhase]);

  const onDropdownAnimationComplete = useCallback(() => {
    if (isExpanded && animationPhase === "dropdown") {
      // Expand: dropdown done → idle
      setAnimationPhase("idle");
    } else if (!isExpanded && animationPhase === "dropdown") {
      // Collapse: dropdown done → start chevron
      setAnimationPhase("chevron");
    }
  }, [isExpanded, animationPhase]);

  // Animation variants - matching TestSection with refined values
  const chevronVariants = {
    collapsed: {
      rotate: 0,
      x: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    expanded: {
      rotate: 90,
      x: CHEVRON_EXPANDED_X,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const pillVariants = {
    collapsed: {
      scaleX: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    expanded: {
      scaleX: PILL_SCALE_X,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Dropdown variants - ABSOLUTE positioning version
  // Uses clipPath for reveal instead of height to work better with absolute positioning
  const dropdownVariants = {
    collapsed: {
      opacity: 0,
      y: -20,
      clipPath: "inset(0 0 100% 0)",
      transition: {
        opacity: { duration: 0.2, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
        clipPath: { duration: 0.3, ease: "easeOut" },
      },
    },
    expanded: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        opacity: { duration: 0.3, ease: "easeOut", delay: 0.1 },
        y: { duration: 0.3, ease: "easeOut" },
        clipPath: { duration: 0.3, ease: "easeOut" },
      },
    },
  };

  // State getters - same logic as TestSection
  const getPillState = () => {
    if (isExpanded) {
      return "expanded";
    } else {
      if (animationPhase === "dropdown" || animationPhase === "chevron") {
        return "expanded";
      }
      return "collapsed";
    }
  };

  const getChevronState = () => {
    if (isExpanded) {
      if (animationPhase === "chevron" || animationPhase === "dropdown" || animationPhase === "idle") {
        return "expanded";
      }
      return "collapsed";
    } else {
      if (animationPhase === "dropdown") {
        return "expanded";
      }
      return "collapsed";
    }
  };

  const getDropdownState = () => {
    if (isExpanded && (animationPhase === "dropdown" || animationPhase === "idle")) {
      return "expanded";
    }
    return "collapsed";
  };

  const dropdownId = `dropdown-${rowId}`;
  const isPillExpanded = getPillState() === "expanded";

  // When this row is active, bump z-index to bring it to front
  const activeZIndex = showActiveGlow ? 100 : deckZIndex;

  return (
    <div
      className="absolute"
      style={{
        top: deckTop,
        left: deckLeft,
        transform: `rotate(${deckRotate}deg)`,
        zIndex: activeZIndex,
        ...(DEBUG_PILL_BOUNDS ? { outline: "2px dashed rgba(255, 0, 0, 0.5)" } : {}),
        ...(showActiveGlow ? activeGlowStyle : {}),
        // Dim non-active pills when another is active
        opacity: anotherRowIsActive ? 0.7 : 1,
        transition: "filter 0.3s ease-out, opacity 0.3s ease-out, z-index 0s",
      }}
    >
      {/* Debug label */}
      {DEBUG_PILL_BOUNDS && (
        <span className="absolute -top-6 left-0 text-xs text-red-400 font-mono">{rowId}</span>
      )}

      {/* Main pill wrapper - clickable button */}
      <motion.button
        onClick={handleClick}
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
        style={{ zIndex: 10, minHeight: "44px" }}
        aria-expanded={isExpanded}
        aria-controls={dropdownId}
        aria-label={isExpanded ? `Collapse ${rowId}` : `Expand ${rowId}`}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {/*
          Fixed-width pill container - this box maintains consistent width
          so both base pill and overlay pill have a stable reference frame.
          The base pill scales within this container from left origin.
        */}
        <div
          className="relative"
          style={{
            width: `${pillWidth}px`,
            height: `${pillHeight}px`,
            ...(DEBUG_PILL_BOUNDS ? { outline: "1px solid rgba(0, 255, 0, 0.6)" } : {}),
          }}
        >
          {/* Base pill - scales horizontally from left origin */}
          <motion.div
            className="absolute inset-0"
            variants={pillVariants}
            animate={getPillState()}
            onAnimationComplete={onPillAnimationComplete}
            style={{ transformOrigin: "left center" }}
          >
            <Image
              src={basePillSrc}
              alt=""
              fill
              priority
              style={{
                objectFit: "contain",
                objectPosition: "left center",
                ...(DEBUG_PILL_BOUNDS ? { outline: "1px solid rgba(255, 255, 0, 0.6)" } : {}),
              }}
            />
          </motion.div>

          {/*
            Overlay content pill - static, does NOT scale
            Positioned absolutely and centered within the original pill bounds.
            Uses inset-0 with flex centering to stay centered regardless of base pill scale.
            Optional overlayOffsetX shifts the overlay horizontally (positive = right).
          */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: overlayOffsetX !== 0 ? `translateX(${overlayOffsetX}px)` : undefined,
              ...(DEBUG_PILL_BOUNDS ? { outline: "1px solid rgba(0, 255, 255, 0.6)" } : {}),
            }}
          >
            <Image
              src={overlayPillSrc}
              alt=""
              width={pillWidth}
              height={pillHeight}
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto",
                maxWidth: `${pillWidth}px`,
                maxHeight: `${pillHeight}px`,
              }}
            />
          </div>

          {/*
            Chevron container - positioned relative to the pill container (not the scaled base)
            Outer div handles vertical centering via top: 50% + translateY(-50%)
            Inner motion.div handles rotation and x-shift only
          */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: isPillExpanded ? `${-pillWidth * (PILL_SCALE_X - 1) + 16}px` : "32px",
              top: "50%",
              transform: "translateY(-50%)",
              transition: "right 0.3s ease-out",
            }}
          >
            <motion.div
              variants={chevronVariants}
              animate={getChevronState()}
              onAnimationComplete={onChevronAnimationComplete}
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src={chevronSrc}
                alt=""
                width={28}
                height={45}
                style={{
                  objectFit: "contain",
                  width: "28px",
                  height: "auto",
                }}
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/*
        Dropdown panel - ABSOLUTELY positioned under the pill
        Does NOT affect document flow - other pills stay in place
      */}
      <motion.div
        id={dropdownId}
        className="absolute left-0 pointer-events-none"
        variants={dropdownVariants}
        animate={getDropdownState()}
        onAnimationComplete={onDropdownAnimationComplete}
        initial="collapsed"
        style={{
          top: `${pillHeight - 16}px`, // Overlap slightly behind pill
          width: `${dropdownWidth}px`,
          zIndex: -1, // Behind the pill
        }}
      >
        <Image
          src={dropdownSrc}
          alt=""
          width={dropdownWidth}
          height={dropdownHeight}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
        />
      </motion.div>
    </div>
  );
}

export default ExpandableProjectPillRow;
