"use client";

import { useState } from "react";
import Link from "next/link";
import type { HeroArtifact } from "@/data/heroArtifacts";
import ResponsiveMedia from "@/components/ui/ResponsiveMedia";
import GlassSurface from "@/components/ui/GlassSurface";
import ArtifactVisual from "./ArtifactVariants";
import { useHeroSelection } from "./HeroSelection";
import { cn } from "@/lib/utils";

// Featured state lives at z-11 — above Tyler (z-8) AND the headline (z-10), below the fixed
// nav (z-50) — so the clicked artifact becomes the clear focal point instead of getting caught
// in an awkward middle layer between Tyler and the title text.
const FEATURED_Z = 11;
const DIMMED_SCALE = 0.94;
const FEATURED_OPACITY = 1;
const DIMMED_OPACITY_FACTOR = 0.35;
const POSITION_TRANSITION = "top 0.6s cubic-bezier(0.22,1,0.36,1), left 0.6s cubic-bezier(0.22,1,0.36,1)";
const ORIENTATION_TRANSITION =
  "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease-out, filter 0.45s ease-out";

function WindowDots({ compact, lit }: { compact: boolean; lit: boolean }) {
  const size = compact ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <div className={cn("flex items-center", compact ? "gap-1" : "gap-1.5")}>
      <span className={cn("rounded-full bg-heat transition-opacity duration-300", size, lit ? "opacity-80" : "opacity-55")} />
      <span
        className={cn("rounded-full transition-opacity duration-300", size, lit ? "opacity-80" : "opacity-55")}
        style={{ backgroundColor: "#d9a441" }}
      />
      <span className={cn("rounded-full bg-signal transition-opacity duration-300", size, lit ? "opacity-75" : "opacity-50")} />
    </div>
  );
}

function ArtifactFrame({
  artifact,
  ready,
  isSelected,
  isHovered,
}: {
  artifact: HeroArtifact;
  ready: boolean;
  isSelected: boolean;
  isHovered: boolean;
}) {
  const compact = artifact.height < 200;
  // Reflection direction is derived from each artifact's own authored tilt, not randomized —
  // enough to keep the system from feeling mechanically identical card to card.
  const sheenDirection = artifact.rotate >= 0 ? "bg-gradient-to-tr" : "bg-gradient-to-tl";
  const showViewHint = !isSelected && isHovered;

  return (
    <>
      {ready && artifact.media ? (
        <>
          {/* opaque backing so the source webp's own alpha channel can't reveal whatever
              card sits behind this one in z-order — glass border/blur stays on the outer shell */}
          {!artifact.anchor ? <div className="absolute inset-0 bg-graphite" /> : null}
          <ResponsiveMedia media={artifact.media} sizes="(min-width: 1024px) 32vw, 60vw" />
        </>
      ) : (
        <>
          {!artifact.anchor ? <div className="absolute inset-0 bg-graphite" /> : null}
          <ArtifactVisual variant={artifact.variant} />
        </>
      )}

      {/* faint lime light catching the top-left edge of the glass, not a full outline */}
      <div
        className={cn("pointer-events-none absolute -left-3 -top-3 h-16 w-16 rounded-full transition-opacity duration-300", isSelected ? "opacity-100" : "opacity-70")}
        style={{ background: "radial-gradient(circle, rgba(199,255,0,0.12), transparent 70%)" }}
      />

      {/* soft specular streak across the surface — direction varies per card, stays subliminal */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 via-transparent to-transparent transition-[background] duration-300",
          sheenDirection,
          isSelected ? "from-white/[0.10]" : "from-white/[0.06]"
        )}
      />

      {/* hairline glass edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.08]" />

      {/* subtle top display strip — visual device only, echoes a physical display bezel */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 flex items-center border-b bg-gradient-to-b to-transparent transition-colors duration-300",
          compact ? "h-5 px-2" : "h-6 px-3",
          isSelected ? "border-white/[0.12] from-white/[0.06]" : "border-white/[0.06] from-white/[0.03]"
        )}
      >
        <WindowDots compact={compact} lit={isSelected} />
      </div>

      {/* archive-style caption: category label (left) / figure number or view cue (right) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-3 py-2 font-mono text-[9px] uppercase tracking-widest">
        <span className={cn("transition-opacity duration-300", isSelected ? "text-paper/70" : "text-paper/55")}>{artifact.label}</span>
        {isSelected ? (
          <Link
            href={artifact.projectHref}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto flex items-center gap-1 text-signal transition-colors hover:text-paper"
          >
            {artifact.cta}
            <span aria-hidden>↘</span>
          </Link>
        ) : (
          <span className="relative inline-grid">
            <span
              className={cn("col-start-1 row-start-1 text-paper/40 transition-opacity duration-200", showViewHint ? "opacity-0" : "opacity-100")}
            >
              {artifact.meta}
            </span>
            <span
              className={cn(
                "col-start-1 row-start-1 flex items-center gap-1 whitespace-nowrap text-signal transition-opacity duration-200",
                showViewHint ? "opacity-90" : "opacity-0"
              )}
              aria-hidden={!showViewHint}
            >
              View <span aria-hidden>↗</span>
            </span>
          </span>
        )}
      </div>
    </>
  );
}

export default function FloatingArtifact({ artifact, ready }: { artifact: HeroArtifact; ready: boolean }) {
  const { selectedId, select } = useHeroSelection();
  const isSelected = selectedId === artifact.id;
  const isDimmed = selectedId !== null && !isSelected;

  const [isHovered, setIsHovered] = useState(false);

  const depth = Math.min(artifact.depth, 1.1);
  // Media stays strong and readable (~0.92–0.97) — just shy of fully solid, so the card still
  // reads as a touch of holographic glass rather than a flat opaque cutout. It never dips low
  // enough to let a card behind show through; the opaque backing plate (ArtifactFrame) already
  // handles the source images' own alpha channels separately.
  const baseOpacity = Math.min(0.97, 0.9 + depth * 0.07);
  const baseScale = 0.8 + depth * 0.17;

  // Faint lime edge-light on every card, carried entirely by the outer box-shadow (not a border
  // tint or image wash) so it never reads as neon. Restrained hierarchy: default < hover <
  // featured — Live/Experience gets no special boost just because its imagery is already green.
  const glowAlpha = isSelected ? 0.1 : isHovered ? 0.09 : 0.06;
  const glowRadius = isSelected ? 22 : isHovered ? 20 : 16;
  const glowShadow = `0 0 ${glowRadius}px rgba(199,255,0,${glowAlpha})`;

  const scale = isSelected ? baseScale * artifact.featured.scale : isDimmed ? baseScale * DIMMED_SCALE : baseScale;
  const opacity = isSelected ? FEATURED_OPACITY : isDimmed ? baseOpacity * DIMMED_OPACITY_FACTOR : baseOpacity;
  const zIndex = isSelected ? FEATURED_Z : artifact.z;
  const filter = isSelected
    ? "none"
    : isDimmed
      ? "blur(1.5px)"
      : isHovered
        ? "none"
        : artifact.depth < 0.4
          ? "blur(1px)"
          : artifact.depth < 0.6
            ? "blur(0.5px)"
            : undefined;

  // Default state carries the panel's small editorial tilt; featured state straightens toward 0
  // so the work reads clearly front-on.
  const rotateZ = artifact.rotate * (isSelected ? 0.2 : 1);

  const top = isSelected ? artifact.featured.top : artifact.top;
  const left = isSelected ? artifact.featured.left : artifact.left;

  function handleSelect(e: React.SyntheticEvent) {
    e.stopPropagation();
    select(artifact.id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(e);
    }
  }

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        width: artifact.width,
        height: artifact.height,
        zIndex,
        transition: POSITION_TRANSITION,
        transform: `translate3d(calc(-50% + var(--px, 0) * ${artifact.depth * 20}px), calc(-50% + var(--py, 0) * ${artifact.depth * 20}px), 0)`,
      }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `rotateZ(${rotateZ}deg) scale(${scale})`,
          opacity,
          filter,
          transition: ORIENTATION_TRANSITION,
        }}
      >
        <div
          className="h-full w-full"
          style={
            {
              animationName: "hero-drift",
              animationDuration: `${artifact.drift.duration}s`,
              animationDelay: `${artifact.delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationPlayState: isSelected || isDimmed ? "paused" : "running",
              "--tilt": "0deg",
              "--drift-x": `${artifact.drift.x}px`,
              "--drift-y": `${artifact.drift.y}px`,
              "--drift-rot": `${artifact.drift.rot}deg`,
            } as React.CSSProperties
          }
        >
          <div
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${artifact.label} — press to feature this project`}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className="group h-full w-full cursor-pointer rounded-2xl outline-none transition-[transform,filter] duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.018] hover:brightness-105 focus-visible:-translate-y-1.5 focus-visible:scale-[1.018] focus-visible:brightness-105 focus-visible:ring-2 focus-visible:ring-signal/70"
          >
            {artifact.anchor ? (
              <GlassSurface
                className="h-full w-full !rounded-xl transition-shadow duration-300 group-hover:ring-1 group-hover:ring-white/25"
                style={{ boxShadow: `0 30px 70px rgba(0,0,0,0.5), ${glowShadow}` }}
              >
                <ArtifactFrame artifact={artifact} ready={ready} isSelected={isSelected} isHovered={isHovered} />
              </GlassSurface>
            ) : (
              <div
                className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-[2px] transition-shadow duration-300 group-hover:border-white/25"
                style={{ boxShadow: `0 20px 45px rgba(0,0,0,0.4), ${glowShadow}` }}
              >
                <ArtifactFrame artifact={artifact} ready={ready} isSelected={isSelected} isHovered={isHovered} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
