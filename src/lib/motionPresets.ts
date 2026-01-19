/**
 * Motion Presets
 *
 * Reusable animation configurations for the portfolio.
 * Used across all sections for consistent motion behavior.
 *
 * Symbol reference:
 * - * (float): ambient idle float + hover reaction
 * - # (rotate): continuous clockwise rotation
 * - ! (glow): soft drop-shadow filter
 */

import type { Variants, TargetAndTransition } from "framer-motion";

/**
 * Glow style - soft futuristic glow via CSS filter drop-shadow
 * Harmonizes with blue/cyan palette
 */
export const glowStyle = {
  filter:
    "drop-shadow(0 0 8px rgba(100, 200, 255, 0.4)) drop-shadow(0 0 20px rgba(100, 180, 255, 0.25)) drop-shadow(0 0 40px rgba(80, 160, 255, 0.15))",
};

/**
 * Create idle float animation variants
 *
 * @param duration - Animation duration (5.5-7.5s recommended)
 * @param delay - Negative delay to desync elements (e.g., -1.2)
 * @param amplitude - Y-axis movement in pixels (default 8)
 */
export const createFloatVariants = (
  duration: number = 6,
  delay: number = 0,
  amplitude: number = 8
): Variants => ({
  animate: {
    y: [0, -amplitude, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      delay,
    },
  },
});

/**
 * Create hover state for floating elements
 * Subtle lift + tilt + scale, quick transition
 *
 * @param rotateDirection - Direction of tilt (-1 or 1)
 * @param liftAmount - Y offset on hover (default -6)
 * @param scaleAmount - Scale factor (default 1.015)
 * @param tiltDegrees - Rotation in degrees (default 1)
 */
export const createHoverState = (
  rotateDirection: number = 1,
  liftAmount: number = -6,
  scaleAmount: number = 1.015,
  tiltDegrees: number = 1
): TargetAndTransition => ({
  y: liftAmount,
  rotateZ: rotateDirection * tiltDegrees,
  scale: scaleAmount,
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
});

/**
 * Create rotation animation variants
 * For elements marked with "#" - continuous clockwise rotation
 *
 * @param duration - Time for one full rotation (20-30s recommended)
 */
export const createRotateVariants = (duration: number = 25): Variants => ({
  animate: {
    rotate: -360,
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
    },
  },
});

/**
 * Preset desync delays for common layer counts
 * Use negative values so elements start "already in motion"
 */
export const desyncDelays = {
  // For 5-6 layers
  standard: [0, -1.2, -2.1, -0.7, -2.8, -1.6],
  // For larger sets
  extended: [0, -0.5, -1.2, -2.1, -0.7, -2.8, -1.6, -3.2, -1.0, -2.4, -0.3],
};

/**
 * Preset durations in the 5.5-7.5s band
 */
export const desyncDurations = {
  standard: [6, 6.5, 5.5, 7, 6.2, 5.8],
  extended: [6, 6.5, 5.5, 7, 6.2, 5.8, 7.2, 5.7, 6.8, 6.3, 7.5],
};

/**
 * Quick preset for standard float + hover
 * Returns both variants and hover state
 */
export const getFloatPreset = (index: number, rotateDir: number = 1) => {
  const delay = desyncDelays.extended[index % desyncDelays.extended.length];
  const duration =
    desyncDurations.extended[index % desyncDurations.extended.length];

  return {
    variants: createFloatVariants(duration, delay),
    whileHover: createHoverState(rotateDir),
  };
};
