"use client";

import Link from "next/link";
import type { HeroArtifact } from "@/data/heroArtifacts";
import ResponsiveMedia from "@/components/ui/ResponsiveMedia";
import ArtifactVisual from "./ArtifactVariants";
import TylerCutout from "./TylerCutout";
import { useHeroSelection } from "./HeroSelection";

const FEATURED_Z = 9;

export default function HeroMobileScene({
  items,
  tylerReady,
}: {
  items: Array<{ artifact: HeroArtifact; ready: boolean }>;
  tylerReady: boolean;
}) {
  const { selectedId, select, clear } = useHeroSelection();
  const cards = items.filter(({ artifact }) => artifact.showOnMobile && artifact.mobile);

  return (
    <div className="relative mt-10 h-[320px] w-full sm:h-[380px] lg:hidden" onClick={clear}>
      {cards.map(({ artifact, ready }) => {
        const m = artifact.mobile!;
        const isSelected = selectedId === artifact.id;
        const isDimmed = selectedId !== null && !isSelected;

        return (
          <div
            key={artifact.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${artifact.label} — press to feature this project`}
            onClick={(e) => {
              e.stopPropagation();
              select(artifact.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                select(artifact.id);
              }
            }}
            className="absolute cursor-pointer overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] shadow-[0_16px_36px_rgba(0,0,0,0.4)] outline-none transition-[transform,opacity,filter] duration-300 focus-visible:ring-2 focus-visible:ring-signal/70"
            style={{
              top: m.top,
              left: m.left,
              width: m.width,
              height: m.height,
              zIndex: isSelected ? FEATURED_Z : m.z,
              opacity: isDimmed ? 0.4 : 1,
              filter: isDimmed ? "blur(1px)" : "none",
              transform: `translate(-50%, -50%) rotate(${m.rotate}deg) scale(${isSelected ? 1.18 : 1})`,
            }}
          >
            {ready && artifact.media ? (
              <ResponsiveMedia media={artifact.media} sizes="45vw" />
            ) : (
              <>
                <div className="absolute inset-0 bg-graphite" />
                <ArtifactVisual variant={artifact.variant} />
              </>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-2 py-1.5 font-mono text-[8px] uppercase tracking-widest text-paper/60">
              {isSelected ? (
                <Link
                  href={artifact.projectHref}
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto flex items-center gap-1 text-signal"
                >
                  {artifact.cta}
                  <span aria-hidden>↘</span>
                </Link>
              ) : (
                <span>{artifact.label}</span>
              )}
            </div>
          </div>
        );
      })}

      <TylerCutout ready={tylerReady} className="bottom-0 left-[58%] h-full w-[46%] -translate-x-1/2" />
    </div>
  );
}
