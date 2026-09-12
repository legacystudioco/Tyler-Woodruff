import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import BeliefCarousel from "./shared/BeliefCarousel";
import { beliefs } from "@/data/journey/beliefs";

const portrait = { type: "image" as const, src: "/assets/philosophy/portrait.jpg", alt: "Tyler in front of working screens" };

export default function ThingsIBelieveSection() {
  return (
    <Section id="beliefs" theme="ink" className="py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Eyebrow>Things I Believe</Eyebrow>
          <DisplayHeading size="md" as="h2">
            Seven working principles.
          </DisplayHeading>
          <div className="hidden aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 lg:block">
            <ProjectMedia media={portrait} label="Tyler" accent="signal" sizes="24vw" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <BeliefCarousel beliefs={beliefs} />
        </div>
      </div>
    </Section>
  );
}
