import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { capabilityGroups, tools } from "@/data/journey/capabilityTable";

export default function CapabilitiesSection() {
  return (
    <Section id="capabilities" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 px-6 lg:px-12">
        <div className="flex flex-col gap-5 lg:max-w-2xl">
          <Eyebrow tone="ink">What I Bring to the Table</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            Capabilities, not job titles.
          </DisplayHeading>
        </div>

        <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {capabilityGroups.map((group, i) => (
            <div key={group.id} className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="flex items-center gap-4 lg:col-span-3">
                <span className="font-mono text-xs text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-ink/10">
                  <ProjectMedia media={group.image} label={group.title} sizes="48px" showPlaceholderLabel={false} />
                </div>
                <h3 className="font-display text-2xl font-medium text-ink">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:col-span-9">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-xs uppercase tracking-wider text-ink/55">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-balance font-mono text-xs uppercase leading-loose tracking-wider text-ink/40">
          {tools.join("  ·  ")}
        </p>
      </div>
    </Section>
  );
}
