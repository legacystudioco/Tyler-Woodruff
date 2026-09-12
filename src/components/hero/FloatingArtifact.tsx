"use client";

import Link from "next/link";
import type { HeroArtifact } from "@/data/heroArtifacts";
import ResponsiveMedia from "@/components/ui/ResponsiveMedia";
import GlassSurface from "@/components/ui/GlassSurface";
import ArtifactVisual from "./ArtifactVariants";
import { useHeroSelection } from "./HeroSelection";

// Featured state lives at z-9 — above Tyler (z-8), below the headline (z-10) — so a "pulled
// forward" panel can pass in front of Tyler without ever winning against the title text.
const FEATURED_Z = 9;
const DIMMED_SCALE = 0.94;
const FEATURED_OPACITY = 0.97;
const DIMMED_OPACITY_FACTOR = 0.35;
const POSITION_TRANSITION = "top 0.6s cubic-bezier(0.22,1,0.36,1), left 0.6s cubic-bezier(0.22,1,0.36,1)";
const ORIENTATION_TRANSITION =
  "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease-out, filter 0.45s ease-out";

function ArtifactFrame({
  artifact,
  ready,
  isSelected,
}: {
  artifact: HeroArtifact;
  ready: boolean;
  isSelected: boolean;
}) {
  return (
    <>
      {ready && artifact.media ? (
        <ResponsiveMedia media={artifact.media} sizes="(min-width: 1024px) 32vw, 60vw" />
      ) : (
        <>
          {!artifact.anchor ? <div className="absolute inset-0 bg-graphite" /> : null}
          <ArtifactVisual variant={artifact.variant} />
        </>
      )}
      {/* holographic sheen + edge highlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset"
        style={{ boxShadow: artifact.anchor ? "inset 0 0 0 1px rgba(199,255,0,0.14)" : "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-paper/60">
        <span>{artifact.label}</span>
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
          <span className="text-paper/30">{artifact.meta}</span>
        )}
      </div>
    </>
  );
}

export default function FloatingArtifact({ artifact, ready }: { artifact: HeroArtifact; ready: boolean }) {
  const { selectedId, select } = useHeroSelection();
  const isSelected = selectedId === artifact.id;
  const isDimmed = selectedId !== null && !isSelected;

  const depth = Math.min(artifact.depth, 1.1);
  const baseOpacity = 0.26 + depth * 0.58;
  const baseScale = 0.8 + depth * 0.17;

  const scale = isSelected ? baseScale * artifact.featured.scale : isDimmed ? baseScale * DIMMED_SCALE : baseScale;
  const opacity = isSelected ? FEATURED_OPACITY : isDimmed ? baseOpacity * DIMMED_OPACITY_FACTOR : baseOpacity;
  const zIndex = isSelected ? FEATURED_Z : artifact.z;
  const filter = isSelected
    ? "none"
    : isDimmed
      ? "blur(1.5px)"
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
            className="group h-full w-full cursor-pointer rounded-2xl outline-none transition-[transform,filter] duration-300 ease-out hover:scale-[1.045] hover:brightness-110 focus-visible:scale-[1.045] focus-visible:brightness-110 focus-visible:ring-2 focus-visible:ring-signal/70"
          >
            {artifact.anchor ? (
              <GlassSurface
                className="h-full w-full !rounded-xl transition-shadow duration-300 group-hover:ring-1 group-hover:ring-white/25"
                style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 40px rgba(199,255,0,0.05)" }}
              >
                <ArtifactFrame artifact={artifact} ready={ready} isSelected={isSelected} />
              </GlassSurface>
            ) : (
              <div
                className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-[2px] transition-shadow duration-300 group-hover:border-white/25"
                style={{ boxShadow: "0 20px 45px rgba(0,0,0,0.4), 0 0 24px rgba(255,255,255,0.04)" }}
              >
                <ArtifactFrame artifact={artifact} ready={ready} isSelected={isSelected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
