import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import CreativeProcess from "@/components/creative/shared/CreativeProcess";
import MomentsCollage from "@/components/creative/shared/MomentsCollage";
import {
  highlightVideo,
  collideCampVideo,
  processSteps,
  moments,
  identityMaterials,
} from "@/data/case-studies/kingdomConference";

export default function KingdomConferenceStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="kingdom-visual-opening" className="flex flex-col gap-6">
        <p className="mx-auto max-w-xl text-balance text-center text-lg italic leading-relaxed text-mist">
          &ldquo;Digital experiences aren&rsquo;t the only experiences I design.&rdquo;
        </p>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 lg:aspect-[21/9]">
          <ProjectMedia media={highlightVideo} label="Highlight / Overview Video" accent="heat" sizes="100vw" priority />
        </div>
      </section>

      <section id="kingdom-process" className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Process</Eyebrow>
          <DisplayHeading size="md" as="h3">
            A creative-production journey, start to finish.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-mist">
            During my time as Creative Pastor at Life Change Church, I led this multi-day conference experience
            end to end, year over year—concept and identity, original video, the room itself, and the technical
            production that held it together.
          </p>
        </div>
        <CreativeProcess steps={processSteps} />
      </section>

      <section id="kingdom-identity" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Identity &amp; Promotional Materials</Eyebrow>
          <DisplayHeading size="md" as="h3">
            A mark that carried across years and events.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-mist">
            The identity extended across conference years and a related summer camp, down to merch design specs
            handed off for production.
          </p>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
          {identityMaterials.map((item, i) => (
            <div
              key={item.id}
              className="mx-auto flex w-64 flex-col gap-2.5 sm:w-80 lg:w-96"
              style={{ transform: `rotate(${item.rotate}deg)`, marginTop: i % 2 === 1 ? "1.25rem" : 0 }}
            >
              <div
                className="w-full overflow-hidden rounded-xl border border-white/10 bg-graphite"
                style={{ aspectRatio: item.ratio }}
              >
                <ProjectMedia media={item.media} label={item.label} accent="heat" sizes="(min-width: 640px) 224px, 192px" />
              </div>
              <span className="text-center font-mono text-[10px] uppercase tracking-wider text-mist">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="kingdom-camp" className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Kingdom Camp</Eyebrow>
          <DisplayHeading size="md" as="h3">
            The identity extended to a summer camp, too.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-mist">
            A related summer camp under the same identity—ropes courses, late nights, and the same production
            energy carried outdoors.
          </p>
        </div>
        <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <ProjectMedia media={collideCampVideo} label="Kingdom Collide Camp" accent="heat" sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </section>

      <section id="kingdom-moments" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Moments of the Journey</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Stage, light, screen, and the people in the room.
          </DisplayHeading>
        </div>
        <MomentsCollage items={moments} />
      </section>
    </div>
  );
}
