import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { fragments } from "@/data/journey/messyMiddle";

export default function MessyMiddleSection() {
  return (
    <Section id="messy-middle" theme="ink" className="py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14 px-6 lg:px-12">
        <div className="flex flex-col gap-5 lg:max-w-xl">
          <Eyebrow tone="mist">The Messy Middle</Eyebrow>
          <DisplayHeading size="md" as="h2">
            Finished work is clean. Getting there usually isn&rsquo;t.
          </DisplayHeading>
        </div>

        <div className="relative hidden h-[480px] w-full lg:block">
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
          {fragments.map((f) => (
            <div
              key={f.id}
              className="absolute flex flex-col items-center"
              style={{ top: f.top, left: f.left, zIndex: f.z, transform: "translate(-50%, -50%)" }}
            >
              <span className="mb-1 h-2 w-2 rounded-full bg-mist/50" aria-hidden />
              <div
                className="overflow-hidden rounded-sm border border-dashed border-white/20 bg-graphite p-1.5 shadow-[0_16px_35px_rgba(0,0,0,0.4)]"
                style={{ width: f.width, height: f.height, transform: `rotate(${f.rotate}deg)` }}
              >
                <div className="relative h-full w-full">
                  <ProjectMedia media={f.media} label={f.label} accent="signal" showPlaceholderLabel={false} sizes="220px" />
                </div>
              </div>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-mist/50">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {fragments.map((f) => (
            <div key={f.id} className="flex flex-col gap-2">
              <div className="aspect-square overflow-hidden rounded-sm border border-dashed border-white/20">
                <ProjectMedia media={f.media} label={f.label} accent="signal" showPlaceholderLabel={false} sizes="45vw" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-mist/50">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
