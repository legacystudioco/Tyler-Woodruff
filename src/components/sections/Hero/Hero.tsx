"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  glowStyle,
  createRotateVariants,
  desyncDelays,
  desyncDurations,
} from "@/lib/motionPresets";
import { SectionRegistry } from "@/lib/section-registry";
import { ResponsiveArtboard } from "@/components/ui/ResponsiveArtboard";

/**
 * DEBUG_LAYER Toggle
 * ------------------
 * Set to 0 to render all layers normally.
 * Set to 2-11 to render ONLY hero-01 (background) + that single layer.
 */
const DEBUG_LAYER = 0;

/**
 * Layer configuration
 * All layers are 1920x1080, stacked full-bleed with NO per-layer positioning.
 *
 * Animation rules:
 * - Layer 2: glow only (no *)
 * - Layers 3,4,5,6,7,8,10,11: float + glow (*!)
 * - Layer 9: rotate + glow (#!)
 */
interface LayerConfig {
  id: number;
  src: string;
  float?: boolean;
  rotate?: boolean;
  glow?: boolean;
  hoverRotate?: number;
}

const layers: LayerConfig[] = [
  { id: 1, src: "/assets/hero_page/hero-01.png" },
  { id: 2, src: "/assets/hero_page/hero-02.png", glow: true, hoverRotate: 1 },
  { id: 6, src: "/assets/hero_page/hero-06.png", float: true, glow: true, hoverRotate: 1 },
  { id: 7, src: "/assets/hero_page/hero-07.png", float: true, glow: true, hoverRotate: -1 },
  { id: 8, src: "/assets/hero_page/hero-08.png", float: true, glow: true, hoverRotate: 1 },
  { id: 9, src: "/assets/hero_page/hero-09.png", rotate: true, glow: true },
  { id: 10, src: "/assets/hero_page/hero-10.png", float: true, glow: true, hoverRotate: -1 },
  { id: 11, src: "/assets/hero_page/hero-11.png", float: true, glow: true, hoverRotate: 1 },
];

/**
 * Folder sprite configuration (interactive overlays)
 * Coordinates are % of artboard dimensions.
 */
interface FolderSpriteConfig {
  id: string;
  src: string;
  targetLayerId: number;
  targetSectionId: string;
  label: string;
  hoverRotate: number;
  top: string;
  left: string;
  width: string;
  height: string;
}

/**
 * Folder sprites for Hero section (only #3, #4, #5)
 * #3 = Highlights folder
 * #4 = Featured folder
 * #5 = Projects folder
 */
const folderSprites: FolderSpriteConfig[] = [
  {
    id: "hero-highlights",
    src: "/assets/hero_page/folders-01.png",
    targetLayerId: 3,
    targetSectionId: "meet-the-creative",
    label: "Go to Meet the Creative",
    hoverRotate: -1,
    top: "11.99%",
    left: "14.39%",
    width: "5.15%",
    height: "8.8%",
  },
  {
    id: "hero-featured",
    src: "/assets/hero_page/folders-02.png",
    targetLayerId: 4,
    targetSectionId: "projects",
    label: "Go to Projects",
    hoverRotate: 1,
    top: "14.07%",
    left: "20.58%",
    width: "5.07%",
    height: "8.45%",
  },
  {
    id: "hero-projects",
    src: "/assets/hero_page/folders-03.png",
    targetLayerId: 5,
    targetSectionId: "lets-connect",
    label: "Go to Lets Connect",
    hoverRotate: -1,
    top: "23.49%",
    left: "17.82%",
    width: "5.07%",
    height: "8.56%",
  },
];

/**
 * Rotation variants for layer 9
 */
const rotateVariants = createRotateVariants(25);

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
 * Hero Section Component
 */
export function Hero() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionOrder = SectionRegistry.getAll();
  const DEBUG_FOLDER_SPRITES = false;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Hero folders] sprite srcs:",
        folderSprites.map((sprite) => sprite.src)
      );
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const targetIndex = sectionOrder.findIndex((section) => section.id === sectionId);
    if (targetIndex === -1) {
      return;
    }

    const sections = document.querySelectorAll("main > section");
    const fallbackTarget = sections.item(targetIndex);

    if (fallbackTarget) {
      fallbackTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleLayers =
    DEBUG_LAYER === 0
      ? layers
      : layers.filter((l) => l.id === 1 || l.id === DEBUG_LAYER);

  let floatIndex = 0;

  return (
    <ResponsiveArtboard aspectRatio="16 / 9">
      <div className="relative w-full h-full">
        {/* Visual layers - all pointer-events-none */}
        {visibleLayers.map((layer, index) => {
          const isBackground = layer.id === 1;

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

          if (layer.rotate) {
            const badgeTop = 4;
            const badgeLeft = 70;
            const badgeSize = 16;

            return (
              <div
                key={layer.id}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: index }}
                aria-hidden="true"
              >
                <motion.div
                  className="absolute"
                  style={{
                    top: `${badgeTop}%`,
                    left: `${badgeLeft}%`,
                    width: `${badgeSize}%`,
                    aspectRatio: "1 / 1",
                    transformOrigin: "center center",
                    ...(layer.glow ? glowStyle : {}),
                  }}
                  variants={rotateVariants}
                  animate="animate"
                >
                  <Image
                    src={layer.src}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="20vw"
                  />
                </motion.div>
              </div>
            );
          }

          // Non-floating layer (layer 2): glow + hover support via hitbox
          if (!layer.float) {
            const isHovered = hoveredId === layer.id;
            const staticHoverVariants = {
              rest: {
                y: 0,
                rotateZ: 0,
                scale: 1,
              },
              hover: {
                y: -6,
                rotateZ: (layer.hoverRotate ?? 1) * 1,
                scale: 1.015,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              },
            };

            return (
              <motion.div
                key={layer.id}
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: index,
                  ...(layer.glow ? glowStyle : {}),
                }}
                variants={staticHoverVariants}
                animate={isHovered ? "hover" : "rest"}
                aria-hidden="true"
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  priority={layer.id <= 3}
                />
              </motion.div>
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
              <Image
                src={layer.src}
                alt=""
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
                priority={layer.id <= 3}
              />
            </motion.div>
          );
        })}

        {/* Folder sprite buttons */}
        {folderSprites.map((sprite) => (
          <motion.button
            key={sprite.id}
            type="button"
            className="absolute bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              top: sprite.top,
              left: sprite.left,
              width: sprite.width,
              height: sprite.height,
              zIndex: 30,
              outline: DEBUG_FOLDER_SPRITES ? "1px solid #ff0000" : "none",
            }}
            aria-label={sprite.label}
            onMouseEnter={() => setHoveredId(sprite.targetLayerId)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(sprite.targetLayerId)}
            onBlur={() => setHoveredId(null)}
            onClick={() => scrollToSection(sprite.targetSectionId)}
            whileHover={{
              y: -6,
              rotateZ: sprite.hoverRotate,
              scale: 1.015,
              filter: "drop-shadow(0 0 8px rgba(0, 210, 255, 0.35))",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Image
              src={sprite.src}
              alt=""
              fill
              style={{ objectFit: "contain" }}
              sizes="10vw"
              priority={sprite.targetLayerId === 3}
            />
          </motion.button>
        ))}

        {DEBUG_LAYER !== 0 && (
          <div className="absolute left-4 top-4 z-50 rounded bg-red-600 px-3 py-1 font-mono text-sm text-white">
            DEBUG: Layer {DEBUG_LAYER}
          </div>
        )}
      </div>
    </ResponsiveArtboard>
  );
}

export default Hero;
