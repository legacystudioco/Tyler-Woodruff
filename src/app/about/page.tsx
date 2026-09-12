import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";

export default function AboutPage() {
  return (
    <Section theme="ink" className="flex min-h-screen flex-col justify-center px-6 py-32 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Eyebrow>About</Eyebrow>
        <DisplayHeading as="h1" size="lg">
          This part of the story is still being written.
        </DisplayHeading>
        <p className="max-w-xl text-balance text-lg leading-relaxed text-mist">
          The full About section is coming in a future update—background, process, and how I work.
        </p>
      </div>
    </Section>
  );
}
