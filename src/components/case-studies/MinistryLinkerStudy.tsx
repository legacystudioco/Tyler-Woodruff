import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ScreenshotGrid from "./shared/ScreenshotGrid";
import InteractionModel from "./shared/InteractionModel";
import { stackItems, productStory } from "@/data/case-studies/ministryLinker";

export default function MinistryLinkerStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="ministry-visual-opening" className="flex flex-col gap-10">
        <ScreenshotGrid items={stackItems} />
      </section>

      <section id="ministry-product-story" className="flex flex-col items-center gap-8">
        <Eyebrow tone="electric">Product Story</Eyebrow>
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3">
          {productStory.map((step, i) => (
            <span key={step.label} className="flex items-center gap-1.5">
              <span className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mist">
                {step.label}
              </span>
              {i < productStory.length - 1 ? <ArrowRight className="h-3 w-3 shrink-0 text-mist/30" /> : null}
            </span>
          ))}
        </div>
      </section>

      <section id="ministry-interaction-model" className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Interaction Model</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Two participants, one shared platform.
          </DisplayHeading>
        </div>
        <InteractionModel />
      </section>
    </div>
  );
}
