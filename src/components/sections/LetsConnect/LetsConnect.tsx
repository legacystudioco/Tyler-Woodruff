"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { glowStyle, desyncDelays, desyncDurations } from "@/lib/motionPresets";

/**
 * Let's Connect Section
 *
 * Artboard size: 1920 x 1057.1209
 * Layer stack (bottom -> top):
 * - Background (01)
 * - Title (02) *!
 * - Paragraph (03) *!
 * - Buttons sprite (LinkedIn + Email) - compact sprite with individual hover
 * - Device + portrait (06) *!
 */

/**
 * Debug toggle for hitbox visualization
 * Set to true to see red outlines + labels for each hitbox
 */
const DEBUG_HITBOXES = false;

interface OverlayLayerConfig {
  id: string;
  src: string;
  z: number;
  hasFloat: boolean;
  hasGlow: boolean;
  hoverRotate: number;
  baseScale: number;
}

const overlayLayers: OverlayLayerConfig[] = [
  {
    id: "title",
    src: "/assets/lets_connect/lets_connect-02.png",
    z: 10,
    hasFloat: true,
    hasGlow: true,
    hoverRotate: -1,
    baseScale: 0.85,
  },
  {
    id: "paragraph",
    src: "/assets/lets_connect/lets_connect-03.png",
    z: 20,
    hasFloat: true,
    hasGlow: true,
    hoverRotate: 1,
    baseScale: 0.85,
  },
  {
    id: "device",
    src: "/assets/lets_connect/lets_connect-06.png",
    z: 40,
    hasFloat: true,
    hasGlow: true,
    hoverRotate: 1,
    baseScale: 0.85,
  },
];

/**
 * Button configuration for LinkedIn and Email buttons
 * Uses compact button images from meet_the_creative assets
 * Each button: 492x77 pixels (original size)
 */
interface ButtonConfig {
  id: string;
  src: string;
  label: string;
  href: string;
  width: number;
  height: number;
}

const buttonConfigs: ButtonConfig[] = [
  {
    id: "linkedin",
    src: "/assets/meet_the_creative/meet_the_creative-07.png",
    label: "Open LinkedIn profile",
    href: "https://www.linkedin.com/in/tyler-woodruff-a8179a175",
    width: 492,
    height: 76,
  },
  {
    id: "email",
    src: "/assets/meet_the_creative/meet_the_creative-09.png",
    label: "Send email",
    href: "mailto:pastor.tyler.woodruff@gmail.com",
    width: 492,
    height: 77,
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

export function LetsConnect() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  let floatIndex = 0;

  return (
    <section
      id="lets-connect"
      className="relative w-full overflow-hidden"
      style={{
        // Lower z-index so Projects dropdowns can overlap this section
        zIndex: 0,
        position: "relative",
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: "min(1920px, 100vw)",
          aspectRatio: "1920 / 1057.1209",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <Image
            src="/assets/lets_connect/lets_connect-01.png"
            alt=""
            fill
            priority
            quality={95}
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        </div>

        {overlayLayers.map((layer) => {
          const currentFloatIndex = floatIndex++;
          const delay = desyncDelays.extended[currentFloatIndex % desyncDelays.extended.length];
          const duration = desyncDurations.extended[currentFloatIndex % desyncDurations.extended.length];
          const layerVariants = createLayerVariants(duration, delay, layer.hoverRotate, layer.baseScale);
          const isHovered = hoveredId === layer.id;

          return (
            <motion.div
              key={layer.id}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: layer.z,
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
                style={{ objectFit: "contain" }}
                sizes="100vw"
                priority={layer.id === "title"}
              />
            </motion.div>
          );
        })}

        {/* LinkedIn and Email buttons - compact images with individual hover */}
        <div
          className="absolute pointer-events-auto flex gap-4"
          style={{
            zIndex: 30,
            // Position buttons in the same area as original hitboxes
            top: "calc(57% + 40px)",
            left: "calc(6% + 65px)",
          }}
        >
          {buttonConfigs.map((button) => (
              <motion.a
                key={button.id}
                href={button.href}
                target={button.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={button.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
                style={{
                  display: "block",
                  ...(glowStyle),
                  ...(DEBUG_HITBOXES
                    ? {
                        border: "2px solid rgba(255,0,0,0.65)",
                        background: "rgba(255,0,0,0.08)",
                      }
                    : {}),
                }}
                aria-label={button.label}
                onMouseEnter={() => setHoveredId(button.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(button.id)}
                onBlur={() => setHoveredId(null)}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <Image
                  src={button.src}
                  alt=""
                  width={button.width}
                  height={button.height}
                  style={{
                    width: "auto",
                    height: "clamp(34px, 4vw, 60px)",
                    objectFit: "contain",
                  }}
                />
                {DEBUG_HITBOXES && (
                  <span
                    className="absolute top-1 left-1 text-red-500 font-bold text-sm"
                    style={{ pointerEvents: "none" }}
                  >
                    {button.id}
                  </span>
                )}
              </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LetsConnect;
