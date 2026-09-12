import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProductMedia from "@/components/ui/ProjectMedia";
import ProductStack from "./shared/ProductStack";
import PriceCompare from "./shared/PriceCompare";
import VideoBuilder from "./shared/VideoBuilder";
import InterfaceSurface from "./shared/InterfaceSurface";
import { stackItems, behindTheBuild, video, sportsAssets } from "@/data/case-studies/sportsDisplays";

const journey = ["Idea", "Design", "Digital Experience", "Build", "Real-World Object"];

export default function SportsDisplaysStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="visual-opening" className="flex flex-col gap-10">
        <ProductStack items={stackItems} />
      </section>

      <section id="challenge" className="flex flex-col gap-10">
        <p className="mx-auto max-w-xl text-balance text-center text-xl italic leading-relaxed text-paper lg:text-2xl">
          &ldquo;How do you let customers personalize a physical product without creating an overwhelming
          configuration experience?&rdquo;
        </p>
        <PriceCompare />
      </section>

      <section id="experience" className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">The Experience</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Watch the builder in motion.
          </DisplayHeading>
        </div>
        <div className="w-full max-w-3xl">
          <VideoBuilder mp4Src={video.mp4} webmSrc={video.webm} posterSrc={video.poster} label="3D display builder demo" />
        </div>
      </section>

      <section id="behind-the-build" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="electric">Behind the Build</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Modeling, logic, and testing.
          </DisplayHeading>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {behindTheBuild.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <InterfaceSurface chrome="panel" screen={item.screen} label={item.title} media={item.media} accent="electric" className="h-48" />
              <div>
                <h4 className="font-display text-lg font-medium text-paper">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-mist">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="physical-result" className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="heat">Physical Result</Eyebrow>
          <DisplayHeading size="md" as="h3">
            From screen to shelf.
          </DisplayHeading>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {journey.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mist">
                {step}
              </span>
              {i < journey.length - 1 ? <span className="text-mist/40">&rarr;</span> : null}
            </span>
          ))}
        </div>
        <div className="aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <ProductMedia media={sportsAssets.physicalProduct} label="Finished Physical Display" accent="heat" sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </section>
    </div>
  );
}
