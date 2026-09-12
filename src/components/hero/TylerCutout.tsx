import Image from "next/image";
import { tylerHeroSrc, tylerHeroAlt } from "@/data/heroTyler";
import { cn } from "@/lib/utils";

export default function TylerCutout({ className, ready }: { className?: string; ready: boolean }) {
  return (
    <div className={cn("pointer-events-none absolute z-[8]", className)}>
      <div className="relative h-full w-full">
        {ready ? (
          <Image
            src={tylerHeroSrc}
            alt={tylerHeroAlt}
            fill
            sizes="(min-width: 1024px) 36vw, 60vw"
            style={{
              objectFit: "contain",
              objectPosition: "bottom",
            }}
            priority
          />
        ) : (
          <PlaceholderSilhouette />
        )}
      </div>
    </div>
  );
}

function PlaceholderSilhouette() {
  return (
    <div className="relative flex h-full w-full items-end justify-center">
      <svg viewBox="0 0 200 400" className="h-full w-auto max-w-full opacity-[0.16]" preserveAspectRatio="xMidYMax meet" aria-hidden>
        <ellipse cx="100" cy="70" rx="42" ry="50" fill="var(--color-mist)" />
        <path
          d="M40 400 L48 210 Q52 150 100 148 Q148 150 152 210 L160 400 Z"
          fill="var(--color-mist)"
        />
      </svg>
      <span className="absolute bottom-3 font-mono text-[10px] uppercase tracking-widest text-mist/50">
        Tyler — asset pending
      </span>
    </div>
  );
}
