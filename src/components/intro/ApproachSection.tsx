import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ThinkDesignBuild from "./ThinkDesignBuild";
import { intro } from "@/data/site";

export default function ApproachSection() {
  return (
    <Section theme="ink" className="border-t border-white/10 py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-20 px-6 lg:px-12">
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            {intro.statement}
          </DisplayHeading>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist lg:text-lg">{intro.body}</p>
        </div>

        <ThinkDesignBuild />
      </div>
    </Section>
  );
}
