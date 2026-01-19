"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  glowStyle,
  desyncDelays,
  desyncDurations,
} from "@/lib/motionPresets";

/**
 * TOC (Table of Contents) Section
 *
 * Full-bleed stacked layer model (same as Hero).
 * All assets are full 1920x1080 (16:9) artboards with transparency.
 * Composition is baked into each PNG — no per-layer positioning needed.
 *
 * Assets in /public/assets/toc/:
 * - toc-01.png: Background
 * - toc-02.png: PORTFOLIO title block
 * - toc-03.png: Meet the Creative card
 * - toc-04.png: Projects folder
 * - toc-05.png: Let's Connect card
 * - toc-06.png: "TABLE OF CONTENTS" text
 *
 * Animation rules:
 * - * (float): 8px y-axis, desync via negative delays, hover lift
 * - ! (glow): soft drop-shadow filter, no pulsing
 */

/**
 * Layer configuration
 * All layers are 1920x1080, stacked full-bleed with NO per-layer positioning.
 */
interface LayerConfig {
  id: string;
  src: string;
  float?: boolean;
  glow?: boolean;
  hoverRotate?: number;
}

/**
 * Layer order (bottom to top):
 * 1) toc-01 background
 * 2) toc-02 title block (*!)
 * 3) toc-06 "TABLE OF CONTENTS" text (*!)
 * 4) toc-03 "Meet the Creative" (*!)
 * 5) toc-04 Projects folder (*!)
 * 6) toc-05 Let's Connect (*!)
 */
const layers: LayerConfig[] = [
  { id: "toc-01", src: "/assets/toc/toc-01.png" },
  { id: "toc-02", src: "/assets/toc/toc-02.png", float: true, glow: true, hoverRotate: 1 },
  { id: "toc-06", src: "/assets/toc/toc-06.png", float: true, glow: true, hoverRotate: -1 },
  { id: "toc-03", src: "/assets/toc/toc-03.png", float: true, glow: true, hoverRotate: 1 },
  { id: "toc-04", src: "/assets/toc/toc-04.png", float: true, glow: true, hoverRotate: -1 },
  { id: "toc-05", src: "/assets/toc/toc-05.png", float: true, glow: true, hoverRotate: 1 },
];

/**
 * Hitbox configuration for interactive elements
 * Coordinates are % of artboard dimensions
 */
interface HitboxConfig {
  id: string;
  targetLayerId: string;
  targetSectionId: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

/**
 * Hitboxes for TOC section
 * #4 = Meet the Creative (toc-03.png)
 * #5 = Projects (toc-04.png)
 * #6 = Let's Connect (toc-05.png)
 */
const hitboxes: HitboxConfig[] = [
  {
    id: "toc-4",
    targetLayerId: "toc-04",
    targetSectionId: "meet-the-creative",
    label: "Go to Meet",
    top: "26%",
    left: "18%",
    width: "26%",
    height: "48%",
  },
  {
    id: "toc-5",
    targetLayerId: "toc-05",
    targetSectionId: "projects",
    label: "Go to Projects",
    top: "52%",
    left: "40%",
    width: "20%",
    height: "30%",
  },
  {
    id: "toc-6",
    targetLayerId: "toc-06",
    targetSectionId: "lets-connect",
    label: "Go to Lets Connect",
    top: "26%",
    left: "66%",
    width: "28%",
    height: "50%",
  },
];

/**
 * Animation variants for hover state
 */
const createLayerVariants = (duration: number, delay: number, hoverRotate: number) => ({
  rest: {
    y: [0, -8, 0],
    rotateZ: 0,
    scale: 1,
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
    rotateZ: hoverRotate * 1,
    scale: 1.015,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
});

/**
 * TOC Section Component
 */
export function TOC() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const DEBUG_HITBOXES = false;
  const DEBUG_HOVER_MAP = false;

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  let floatIndex = 0;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Centered artboard container */}
      <div
        className="relative mx-auto"
        style={{
          width: "min(1920px, 100vw)",
          aspectRatio: "16 / 9",
        }}
      >
        {/* Visual layers - all pointer-events-none */}
        {layers.map((layer, index) => {
          const isBackground = layer.id === "toc-01";

          // Background layer: cover, no animation
          if (isBackground) {
            return (
              <div
                key={layer.id}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 0 }}
                aria-hidden="true"
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  priority
                  quality={95}
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                />
              </div>
            );
          }

          // Floating layers with hitbox-controlled hover
          const currentFloatIndex = floatIndex++;
          const delay = desyncDelays.extended[currentFloatIndex % desyncDelays.extended.length];
          const duration = desyncDurations.extended[currentFloatIndex % desyncDurations.extended.length];
          const layerVariants = createLayerVariants(duration, delay, layer.hoverRotate ?? 1);
          const isHovered = hoveredId === layer.id;

          return (
            <motion.div
              key={layer.id}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: index,
                ...(layer.glow ? glowStyle : {}),
              }}
              variants={layerVariants}
              animate={isHovered ? "hover" : "rest"}
              aria-hidden="true"
            >
              {DEBUG_HOVER_MAP && (
                <div className="absolute left-2 top-2 z-10 rounded bg-black/70 px-2 py-1 text-[10px] text-white">
                  {layer.id}
                </div>
              )}
              <Image
                src={layer.src}
                alt=""
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 1920px) 100vw, 1920px"
                quality={100}
                priority={index <= 2}
              />
            </motion.div>
          );
        })}

        {/* Invisible hitboxes for interaction */}
        {hitboxes.map((hitbox) => (
          <button
            key={hitbox.id}
            type="button"
            className="absolute bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
            style={{
              top: hitbox.top,
              left: hitbox.left,
              width: hitbox.width,
              height: hitbox.height,
              zIndex: 20,
              outline: DEBUG_HITBOXES ? "1px solid #ff0000" : "none",
            }}
            aria-label={hitbox.label}
            onMouseEnter={() => {
              setHoveredId(hitbox.targetLayerId);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(hitbox.targetLayerId)}
            onBlur={() => {
              setHoveredId(null);
            }}
            onClick={() => scrollToSection(hitbox.targetSectionId)}
          >
            {DEBUG_HOVER_MAP && (
              <span
                className="pointer-events-none absolute left-1 top-1 rounded bg-black/70 px-2 py-1 text-[10px] text-white"
                aria-hidden="true"
              >
                target: {hitbox.targetLayerId}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TOC;
