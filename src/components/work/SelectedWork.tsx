import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectEntry from "./ProjectEntry";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <Section id="work" theme="paper" className="py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 lg:px-12">
        <SectionHeader
          theme="paper"
          eyebrow="Real ideas. Real work. Real impact."
          heading="Selected Work"
          supporting="Products, platforms, identities, systems, and experiences I've designed and built."
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)] lg:gap-x-10 lg:gap-y-12">
          {projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
