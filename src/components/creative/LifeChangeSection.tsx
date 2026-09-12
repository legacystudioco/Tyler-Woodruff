import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Tag from "@/components/ui/Tag";
import ProjectMedia from "@/components/ui/ProjectMedia";
import CreativeProcess from "./shared/CreativeProcess";
import MomentsCollage from "./shared/MomentsCollage";
import { lifeChangeAssets, processSteps, moments, behindTheExperience } from "@/data/creative/lifeChange";
import { projects } from "@/data/projects";

const project = projects.find((p) => p.id === "life-change")!;

export default function LifeChangeSection() {
  return (
    <Section id="life-change" theme="ink" className="relative overflow-hidden pb-28 pt-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-24 px-6 lg:gap-32 lg:px-12">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-heat">{project.number}</span>
          <DisplayHeading as="h2" size="lg">
            Designing Experiences Beyond the Screen.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-lg italic leading-relaxed text-mist">
            &ldquo;Digital experiences aren&rsquo;t the only experiences I design.&rdquo;
          </p>
          <div className="flex flex-wrap gap-2">
            {project.disciplines.map((d) => (
              <Tag key={d} tone="mist">
                {d}
              </Tag>
            ))}
          </div>
        </div>

        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 lg:aspect-[21/9]">
          <ProjectMedia media={lifeChangeAssets.heroStage} label="Life Change Church — Main Stage" accent="heat" sizes="100vw" />
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow tone="heat">Process</Eyebrow>
            <DisplayHeading size="md" as="h3">
              A creative-production journey.
            </DisplayHeading>
          </div>
          <CreativeProcess steps={processSteps} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow tone="heat">Moments of the Journey</Eyebrow>
            <DisplayHeading size="md" as="h3">
              Stage, light, and the people in the room.
            </DisplayHeading>
          </div>
          <MomentsCollage items={moments} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow tone="heat">Behind the Experience</Eyebrow>
            <DisplayHeading size="md" as="h3">
              From concept to live result.
            </DisplayHeading>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {behindTheExperience.map((step, i) => (
              <div key={step.id} className="flex flex-col gap-3">
                <div className="aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
                  <ProjectMedia media={step.media} label={step.label} accent="heat" sizes="(min-width: 1024px) 22vw, 45vw" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
                  {String(i + 1).padStart(2, "0")} — {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
