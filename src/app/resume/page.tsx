import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";

export default function ResumePage() {
  return (
    <Section theme="ink" className="flex min-h-screen flex-col justify-center px-6 py-32 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Eyebrow>Résumé</Eyebrow>
        <DisplayHeading as="h1" size="lg">
          A downloadable résumé is on its way.
        </DisplayHeading>
        <p className="max-w-xl text-balance text-lg leading-relaxed text-mist">
          Check back shortly, or reach out directly in the meantime.
        </p>
      </div>
    </Section>
  );
}
