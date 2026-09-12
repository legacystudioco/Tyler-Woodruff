import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { tylerPortrait } from "@/data/journey/imTyler";

export default function ImTylerSection() {
  return (
    <Section id="im-tyler" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-ink/10">
            <ProjectMedia media={tylerPortrait} label="Tyler Woodruff" sizes="(min-width: 1024px) 36vw, 90vw" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:justify-center">
          <Eyebrow tone="ink">I&rsquo;m Tyler</Eyebrow>
          <p className="text-balance text-lg leading-relaxed text-ink/70 lg:text-xl">
            I&rsquo;m a Creative Technologist based in Ohio. I design and build things at the intersection of
            creativity and technology—from digital products and AI-powered systems to brands, live experiences, and
            the infrastructure behind them.
          </p>
          <p className="text-balance text-lg leading-relaxed text-ink/70 lg:text-xl">
            My career hasn&rsquo;t followed one straight line, and that&rsquo;s become one of my biggest strengths.
            I&rsquo;ve been a designer, developer, creative director, technical director, builder, strategist, and
            problem solver.
          </p>
          <DisplayHeading as="h2" size="md" className="mt-2">
            I like figuring out how things could work better&mdash;and then building the solution.
          </DisplayHeading>
        </div>
      </div>
    </Section>
  );
}
