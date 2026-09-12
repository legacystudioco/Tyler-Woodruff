import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import AiOrbit from "./shared/AiOrbit";
import { aiPortrait, aiAreas } from "@/data/journey/aiMaterial";

export default function AiMaterialSection() {
  return (
    <Section id="ai-material" theme="ink" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <div className="flex flex-col gap-6 lg:max-w-lg">
          <Eyebrow tone="electric">AI as a Creative Material</Eyebrow>
          <DisplayHeading size="md" as="h2">
            AI as a Creative Material
          </DisplayHeading>
          <p className="text-balance text-base leading-relaxed text-mist lg:text-lg">
            I use AI as more than a productivity shortcut. I design it into products, workflows, creative systems,
            and development processes—exploring where machine intelligence actually improves the human experience.
          </p>
          <ul className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-5">
            {aiAreas.map((area) => (
              <li key={area.id} className="flex flex-col gap-0.5">
                <span className="font-mono text-xs uppercase tracking-wider text-electric">{area.title}</span>
                <span className="text-sm text-mist">{area.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <AiOrbit portrait={aiPortrait} areas={aiAreas} />
      </div>
    </Section>
  );
}
