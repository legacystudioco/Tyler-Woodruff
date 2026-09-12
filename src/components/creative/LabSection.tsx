import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import LabCard from "./shared/LabCard";
import { labItems } from "@/data/creative/lab";

export default function LabSection() {
  return (
    <Section id="lab" theme="ink" className="py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 lg:px-12">
        <div className="flex flex-col gap-5">
          <Eyebrow>09 — Lab</Eyebrow>
          <DisplayHeading size="lg" as="h2">
            LAB
          </DisplayHeading>
          <p className="max-w-xl text-balance text-base leading-relaxed text-mist">
            Small experiments, strange ideas, prototypes, AI workflows, interfaces, and things built to see if they
            could work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:[grid-auto-flow:dense] lg:auto-rows-[minmax(200px,auto)]">
          {labItems.map((item) => (
            <LabCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
