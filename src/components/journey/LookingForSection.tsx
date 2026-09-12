import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { roleFamilies, interestAreas, workspaceImage } from "@/data/journey/lookingFor";

export default function LookingForSection() {
  return (
    <Section id="looking-for" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Eyebrow tone="ink">What I&rsquo;m Looking For</Eyebrow>
          <DisplayHeading size="md" as="h2">
            Ambitious products. Ambitious problems.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-ink/70">
            I&rsquo;m interested in teams building ambitious products and experiences where creative thinking and
            technical execution belong in the same room—especially around {interestAreas.slice(0, 4).join(", ").toLowerCase()},
            and {interestAreas.slice(4).join(", ").toLowerCase()}.
          </p>
          <p className="font-mono text-xs uppercase leading-loose tracking-wider text-ink/45">
            {roleFamilies.join("  ·  ")}
          </p>
          <p className="text-balance font-display text-2xl font-medium text-ink">
            The exact title matters less to me than the problem.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink/10 lg:aspect-auto lg:h-full">
            <ProjectMedia media={workspaceImage} label="Workspace" sizes="(min-width: 1024px) 36vw, 90vw" />
          </div>
        </div>
      </div>
    </Section>
  );
}
