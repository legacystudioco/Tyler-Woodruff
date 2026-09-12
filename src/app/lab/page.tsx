import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";

export default function LabPage() {
  return (
    <Section theme="ink" className="flex min-h-screen flex-col justify-center px-6 py-32 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Eyebrow>Lab</Eyebrow>
        <DisplayHeading as="h1" size="lg">
          Prototypes, experiments, and things in progress.
        </DisplayHeading>
        <p className="max-w-xl text-balance text-lg leading-relaxed text-mist">
          AI systems, 3D fabrication, and automation experiments will land here as they&rsquo;re ready to show.
        </p>
      </div>
    </Section>
  );
}
