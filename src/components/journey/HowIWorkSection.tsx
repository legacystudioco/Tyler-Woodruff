import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import GlassSurface from "@/components/ui/GlassSurface";
import { howIWorkSteps } from "@/data/journey/howIWork";
import { cn } from "@/lib/utils";

export default function HowIWorkSection() {
  return (
    <Section id="how-i-work" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 lg:px-12">
        <div className="flex flex-col gap-5 lg:max-w-2xl">
          <Eyebrow tone="ink">How I Work</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            From &ldquo;what if?&rdquo; to &ldquo;it works.&rdquo;
          </DisplayHeading>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-5">
          {howIWorkSteps.map((step, i) => (
            <div key={step.number} className={cn("lg:min-w-0 lg:flex-1", i % 2 === 1 ? "lg:mt-10" : "")}>
              <GlassSurface tone="light" className="flex h-full flex-col gap-4 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/40">{step.number}</span>
                <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{step.tagline}</p>
                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 border-t border-ink/10 pt-4">
                  {step.items.map((item) => (
                    <li key={item} className="font-mono text-[10px] uppercase tracking-wider text-ink/45">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassSurface>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
