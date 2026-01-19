"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  glowStyle,
  createFloatVariants,
  createRotateVariants,
  desyncDelays,
  desyncDurations,
} from "@/lib/motionPresets";
import { ResponsiveArtboard } from "@/components/ui/ResponsiveArtboard";

/**
 * Base position offset for tool strip (Framer Motion x/y)
 * Composes correctly with float and hover animations
 */
const TOOL_STRIP_OFFSET = { x: 0, y: -150 };

/**
 * Contact group base position (absolute % positioning)
 * Located bottom-center-right, to the right of the phone
 */
const CONTACT_GROUP_BASE = {
  top: "86%",
  left: "52%",
  width: "36%",
};

/**
 * Meet the Creative Section
 *
 * Full-bleed stacked layer model.
 * All assets (except sprite) are full 1920x1080 (16:9) artboards with transparency.
 *
 * Assets in /public/assets/meet_the_creative/:
 * - meet_the_creative-01.png: Background
 * - meet_the_creative-02.png: "MEET THE CREATIVE" title (! only)
 * - meet_the_creative-03.png: Phone + portrait (*!)
 * - meet_the_creative-04.png: Combined (location pill + handle + social panel) (*!)
 * - meet_the_creative-05.png: IGNORED (combined into 04)
 * - meet_the_creative-06.png: Vertical tool strip (*!)
 * - meet_the_creative-07.png: LinkedIn pill (*!) - clickable
 * - meet_the_creative-08.png: Sprite ring (#!*)
 * - meet_the_creative-09.png: Email pill (*!) - clickable
 *
 * Animation rules:
 * - ! (glow): soft drop-shadow filter, no pulsing
 * - * (float): 8px y-axis, desync via negative delays, hover lift
 * - # (rotate): 360deg, 25s duration, linear, repeat Infinity
 */

/**
 * Layer configuration for full-bleed overlays (1-7, excluding 5)
 */
interface LayerConfig {
  id: number;
  src: string;
  float?: boolean;
  glow?: boolean;
  hoverRotate?: number;
}

/**
 * Layer stack order (bottom to top):
 * 1) Background (01)
 * 2) Title (02) - glow only (!)
 * 3) Phone + portrait (03) - float + glow (*!)
 * 4) Combined location/handle/social (04) - float + glow (*!)
 * 5) Tool strip (06) - float + glow (*!)
 * 6) LinkedIn pill (07) - float + glow (*!) - rendered separately as clickable
 * 7) Email pill (09) - float + glow (*!) - rendered separately as clickable
 */
const layers: LayerConfig[] = [
  { id: 1, src: "/assets/meet_the_creative/meet_the_creative-01.png" },
  { id: 2, src: "/assets/meet_the_creative/meet_the_creative-02.png", glow: true },
  { id: 3, src: "/assets/meet_the_creative/meet_the_creative-03.png", float: true, glow: true, hoverRotate: -1 },
  { id: 4, src: "/assets/meet_the_creative/meet_the_creative-04.png", float: true, glow: true, hoverRotate: 1 },
  { id: 6, src: "/assets/meet_the_creative/meet_the_creative-06.png", float: true, glow: true, hoverRotate: -1 },
];

/**
 * Clickable pill SPRITE configuration for LinkedIn and Email
 * These are positioned as individual sprites (not full-bleed overlays)
 * Using center-anchored positioning with transform: translate(-50%, -50%)
 */
interface ClickablePillConfig {
  key: string;
  src: string;
  href: string;
  label: string;
  top: string;
  left: string;
  width: string;
  isExternal?: boolean;
}

/**
 * Clickable pill sprites - LinkedIn and Email
 * Positioned at bottom-center area, stacked vertically
 *
 * PLACEMENT VALUES (for easy tuning):
 * - LinkedIn: top: calc(83% - 30px), left: calc(46%), width: 34%
 * - Email:    top: calc(91% - 30px), left: calc(46%), width: 34%
 */
const clickablePills: ClickablePillConfig[] = [
  {
    key: "linkedin",
    src: "/assets/meet_the_creative/meet_the_creative-07.png",
    href: "https://www.linkedin.com/in/tyler-woodruff-a8179a175",
    label: "Open LinkedIn profile",
    top: "calc(83% - 30px)",
    left: "calc(46%)",
    width: "34%",
    isExternal: true,
  },
  {
    key: "email",
    src: "/assets/meet_the_creative/meet_the_creative-09.png",
    href: "mailto:pastor.tyler.woodruff@gmail.com",
    label: "Send email",
    top: "calc(91% - 30px)",
    left: "calc(46%)",
    width: "34%",
    isExternal: false,
  },
];

/**
 * Rotation animation for sprite (#)
 */
const rotateVariants = createRotateVariants(18.75);

/**
 * Sprite float animation (desync from others)
 */
const spriteFloatVariants = createFloatVariants(6.5, -1.0);

/**
 * Ambient glow for clickable pills (LinkedIn/Email)
 * Soft cyan glow at rest, maintained during hover
 */
const pillGlowStyle = {
  filter: "drop-shadow(0 0 14px rgba(120,200,255,0.45))",
};

/**
 * Intensified glow for pill hover state
 */
const pillHoverGlow = "drop-shadow(0 0 18px rgba(120,200,255,0.6)) drop-shadow(0 12px 28px rgba(0,0,0,0.25))";

/**
 * Breathing animation for clickable pills
 * ±6px y-axis, 6s duration, easeInOut, infinite
 * @param delay - Phase offset for desync (0 for LinkedIn, 0.5 for Email)
 * @param baseY - Vertical offset baseline (0 for LinkedIn, -20 for Email)
 */
const createPillBreathingVariants = (delay: number, baseY: number = 0) => ({
  animate: {
    x: -110,
    y: [baseY, baseY - 6, baseY, baseY + 6, baseY],
    scale: 0.7,
    transition: {
      y: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      },
    },
  },
});

/**
 * Animation variants for hover state
 * @param baseY - Vertical offset baseline (default 0, use TOOL_STRIP_OFFSET.y for tool strip)
 */
const createLayerVariants = (duration: number, delay: number, hoverRotate: number, baseY: number = 0) => ({
  rest: {
    y: [baseY, baseY - 8, baseY],
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
    y: baseY - 6,
    rotateZ: hoverRotate * 1,
    scale: 1.015,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
});

/**
 * Meet the Creative Section Component
 */
export function MeetTheCreative() {
  let floatIndex = 0;

  return (
    <ResponsiveArtboard id="meet-the-creative" aspectRatio="16 / 9">
      <div className="relative w-full h-full">
        {/* Background layer - fixed, no transform */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <Image
            src="/assets/meet_the_creative/meet_the_creative-01.png"
            alt=""
            fill
            priority
            quality={95}
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        </div>

        {/* Foreground wrapper - shifted right + uniformly scaled down */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateX(5%) scale(0.88)",
            transformOrigin: "center center",
          }}
        >
          {/* Foreground layers (2-7, excluding 5) - all pointer-events-none */}
          {layers.map((layer, index) => {
            // Skip background layer (handled separately above)
            if (layer.id === 1) return null;

            // Non-floating layer (title): glow only, no hover
            if (!layer.float) {
              return (
                <motion.div
                  key={layer.id}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    zIndex: index,
                    ...(layer.glow ? glowStyle : {}),
                  }}
                  aria-hidden="true"
                >
                  <Image
                    src={layer.src}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="100vw"
                    priority={index <= 2}
                  />
                </motion.div>
              );
            }

            // Floating layers with continuous float animation
            const currentFloatIndex = floatIndex++;
            const delay = desyncDelays.extended[currentFloatIndex % desyncDelays.extended.length];
            const duration = desyncDurations.extended[currentFloatIndex % desyncDurations.extended.length];

            // Tool strip (layer 06) gets vertical offset via baseY in variants
            const isToolStrip = layer.id === 6;
            const baseY = isToolStrip ? TOOL_STRIP_OFFSET.y : 0;
            const layerVariants = createLayerVariants(duration, delay, layer.hoverRotate ?? 1, baseY);

            return (
              <motion.div
                key={layer.id}
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: index,
                  ...(layer.glow ? glowStyle : {}),
                }}
                variants={layerVariants}
                animate="rest"
                aria-hidden="true"
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  priority={index <= 2}
                />
              </motion.div>
            );
          })}

          {/* Sprite ring (08) - positioned separately, rotates + floats (#!*) */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "calc(26% - 150px)",
              left: "calc(24% - 55px)",
              width: "24%",
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
            variants={spriteFloatVariants}
            animate="animate"
            aria-hidden="true"
          >
            <motion.div
              className="relative w-full h-full"
              style={glowStyle}
              variants={rotateVariants}
              animate="animate"
            >
              <Image
                src="/assets/meet_the_creative/meet_the_creative-08.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
                sizes="25vw"
              />
            </motion.div>
          </motion.div>

          {/* Static "About" text block - right side */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "0%",
              left: "44%",
              width: "40%",
              zIndex: 10,
            }}
            aria-hidden="true"
          >
            <Image
              src="/assets/meet_the_creative/meet_about.png"
              alt=""
              width={652}
              height={400}
              style={{ width: "100%", height: "auto" }}
              sizes="34vw"
            />
          </div>

          {/* Clickable LinkedIn and Email pill SPRITES with hover animations */}
          {/* Group wrapper with absolute base position, pills stacked inside */}
          <div
            className="absolute"
            style={{
              top: CONTACT_GROUP_BASE.top,
              left: CONTACT_GROUP_BASE.left,
              width: CONTACT_GROUP_BASE.width,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {/* LinkedIn pill - top of stack */}
            <motion.a
              href={clickablePills[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-lg mb-1"
              style={{ ...pillGlowStyle, minHeight: "44px" }}
              aria-label={clickablePills[0].label}
              variants={createPillBreathingVariants(0, 0)}
              animate="animate"
              whileHover={{
                y: -6,
                scale: 0.7 * 1.015,
                filter: pillHoverGlow,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              whileTap={{
                y: -6,
                scale: 0.7 * 1.015,
                filter: pillHoverGlow,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <Image
                src={clickablePills[0].src}
                alt=""
                width={614}
                height={140}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                sizes="34vw"
              />
            </motion.a>

            {/* Email pill - bottom of stack */}
            <motion.a
              href={clickablePills[1].href}
              className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-lg"
              style={{ ...pillGlowStyle, minHeight: "44px" }}
              aria-label={clickablePills[1].label}
              variants={createPillBreathingVariants(0.5, -20)}
              animate="animate"
              whileHover={{
                y: -20 - 6,
                scale: 0.7 * 1.015,
                filter: pillHoverGlow,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              whileTap={{
                y: -20 - 6,
                scale: 0.7 * 1.015,
                filter: pillHoverGlow,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <Image
                src={clickablePills[1].src}
                alt=""
                width={614}
                height={140}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                sizes="34vw"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </ResponsiveArtboard>
  );
}

export default MeetTheCreative;
