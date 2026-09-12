import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { beyondOneBoxAssets } from "@/data/journey/beyondOneBox";

export default function BeyondOneBoxSection() {
  return (
    <Section id="beyond-one-box" theme="ink" className="py-28 lg:py-0">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-0 lg:px-0">
        <div className="flex flex-col gap-7 lg:col-span-7 lg:px-12 xl:px-20">
          <Eyebrow>Beyond One Box</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            I&rsquo;ve never fit neatly into one discipline.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist lg:text-lg">
            Software, design, creative direction, live production, brand, product strategy, automation, building,
            marketing, leadership. For a long time that made &ldquo;what do you do?&rdquo; hard to answer.
            <span className="text-paper"> Creative Technologist</span> is the closest one—the ability to see the
            whole system and move between strategy and execution until something works.
          </p>
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-signal">
            Strategy × Creativity × Technology × Execution
          </p>
        </div>

        <div className="relative h-[420px] lg:col-span-5 lg:h-[640px]">
          <ProjectMedia
            media={beyondOneBoxAssets.workstation}
            label="Tyler at his workstation"
            accent="signal"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>
      </div>
    </Section>
  );
}
