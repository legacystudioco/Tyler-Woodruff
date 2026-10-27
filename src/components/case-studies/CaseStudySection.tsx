import type { Project } from "@/types/content";
import Section from "@/components/ui/Section";
import CaseStudyHeader from "@/components/ui/CaseStudyHeader";
import ProjectMedia from "@/components/ui/ProjectMedia";
import EliteHomeSourcesStudy from "./EliteHomeSourcesStudy";
import SportsDisplaysStudy from "./SportsDisplaysStudy";
import MinistryLinkerStudy from "./MinistryLinkerStudy";
import KingdomConferenceStudy from "./KingdomConferenceStudy";
import HiVibeStudy from "./HiVibeStudy";
import RiverOfLifeStudy from "./RiverOfLifeStudy";

const studyComponents: Record<string, React.ComponentType> = {
  "kingdom-conference": KingdomConferenceStudy,
  "3d-sports-displays": SportsDisplaysStudy,
  "hi-vibe": HiVibeStudy,
  "elite-home-sources": EliteHomeSourcesStudy,
  "ministry-linker": MinistryLinkerStudy,
  "river-of-life": RiverOfLifeStudy,
};

const accentVar: Record<NonNullable<Project["accent"]>, string> = {
  signal: "var(--color-signal)",
  heat: "var(--color-heat)",
  electric: "var(--color-electric)",
};

export default function CaseStudySection({ project }: { project: Project }) {
  const Study = studyComponents[project.id];
  const accent = accentVar[project.accent ?? "signal"];

  return (
    <Section id={project.id} theme="ink" className="relative min-h-screen overflow-hidden pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-[0.14]"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-16 px-6 lg:px-12">
        <CaseStudyHeader project={project} />
        {Study ? (
          <Study />
        ) : (
          <>
            <div className="h-[50vh] min-h-[320px] overflow-hidden rounded-2xl border border-white/10">
              <ProjectMedia media={project.media} label={project.title} accent={project.accent} sizes="100vw" />
            </div>
            <p className="max-w-2xl text-balance text-base leading-relaxed text-mist">
              Full case study coming soon—process, screens, and outcomes for {project.title}.
            </p>
          </>
        )}
      </div>
    </Section>
  );
}
