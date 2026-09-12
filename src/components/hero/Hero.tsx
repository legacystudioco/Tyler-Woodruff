import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import InteractiveArrow from "@/components/ui/InteractiveArrow";
import HeroParallax from "./HeroParallax";
import FloatingArtifact from "./FloatingArtifact";
import TylerCutout from "./TylerCutout";
import HeroMobileScene from "./HeroMobileScene";
import HeroSceneBackground from "./HeroSceneBackground";
import { HeroSelectionProvider } from "./HeroSelection";
import { heroArtifacts } from "@/data/heroArtifacts";
import { hero } from "@/data/site";
import { tylerHeroSrc } from "@/data/heroTyler";
import { assetExists } from "@/lib/assets";

export default function Hero() {
  const artifactsWithReadiness = heroArtifacts.map((artifact) => ({
    artifact,
    ready: Boolean(artifact.media && assetExists(artifact.media.src)),
  }));
  const tylerReady = assetExists(tylerHeroSrc);

  return (
    <Section id="hero" theme="ink" className="grain flex min-h-[100svh] flex-col justify-between pt-28">
      <HeroSelectionProvider>
        <HeroSceneBackground className="absolute inset-0 hidden lg:block">
          <HeroParallax>
            {artifactsWithReadiness.map(({ artifact, ready }) => (
              <FloatingArtifact key={artifact.id} artifact={artifact} ready={ready} />
            ))}
          </HeroParallax>
          <TylerCutout
            ready={tylerReady}
            className="bottom-0 left-[47%] h-[92%] w-[clamp(280px,34vw,540px)] -translate-x-1/2"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{
              background:
                "linear-gradient(to right, var(--color-ink) 0%, var(--color-ink) 16%, rgba(10,10,10,0.8) 24%, rgba(10,10,10,0.28) 32%, transparent 38%)",
            }}
          />
        </HeroSceneBackground>

        <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mist">{hero.kicker}</p>
          <h1 className="mt-4 font-hero uppercase leading-[0.82] tracking-tight text-[clamp(3rem,13vw,5.25rem)] sm:text-[clamp(4rem,10.5vw,7.5rem)] lg:text-[clamp(5.5rem,9vw,11rem)]">
            <span className="block text-paper">{hero.headline[0]}</span>
            <span className="block text-signal drop-shadow-[0_0_60px_rgba(199,255,0,0.3)]">{hero.headline[1]}</span>
          </h1>

          <div className="pointer-events-auto">
            <HeroMobileScene items={artifactsWithReadiness} tylerReady={tylerReady} />
          </div>

        <div className="mt-8 flex flex-col gap-5 lg:mt-10 lg:max-w-md">
          <p className="text-balance text-sm leading-relaxed text-paper/65 lg:text-base">{hero.body}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-mist">{hero.location}</p>
        </div>

        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4 lg:mt-10">
          <Link
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-3 rounded-full bg-signal px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
            <InteractiveArrow direction="down" className="h-7 w-7 border-ink/30 group-hover:border-ink group-hover:bg-ink group-hover:text-signal" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-300 hover:border-paper hover:bg-paper/10"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 pb-8 lg:px-12">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-mist">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" aria-hidden />
          {hero.status}
        </div>
        <ArrowDown className="hidden h-4 w-4 animate-bounce text-mist sm:block" aria-hidden />
      </div>
      </HeroSelectionProvider>
    </Section>
  );
}
