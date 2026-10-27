import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import { capabilityGroups } from "@/data/journey/capabilityTable";

export default function CapabilitiesSection() {
  return (
    <Section id="capabilities" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 px-6 lg:px-12">
        <div className="flex flex-col gap-5 lg:max-w-2xl">
          <Eyebrow tone="ink">Capabilities &amp; Tools</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            A curated set, not a wall of logos.
          </DisplayHeading>
          <p className="max-w-lg text-balance text-sm leading-relaxed text-ink/60 lg:text-base">
            Not every tool here is used on every project—this is the range I draw from, grouped by what it&rsquo;s
            for.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {capabilityGroups.map((group, i) => (
            <div key={group.id} className="grid grid-cols-1 gap-4 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8">
              <div className="flex items-center gap-4 lg:col-span-3">
                <span className="font-mono text-xs text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl font-medium text-ink lg:text-2xl">{group.title}</h3>
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
      </div>
    </Section>
  );
}
