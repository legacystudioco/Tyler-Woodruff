import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProductMedia from "@/components/ui/ProjectMedia";
import ScreenshotGrid from "./shared/ScreenshotGrid";
import PriceCompare from "./shared/PriceCompare";
import VideoBuilder from "./shared/VideoBuilder";
import { stackItems, video, physicalResults } from "@/data/case-studies/sportsDisplays";

const journey = ["Idea", "Design", "Digital Experience", "Build", "Real-World Object"];

export default function SportsDisplaysStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="sports-visual-opening" className="flex flex-col gap-4">
        <ScreenshotGrid items={stackItems} />
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="https://3dsportsdisplays.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-heat transition-opacity hover:opacity-80"
          >
            View Live Site
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://3dsportsdisplays.com/football/custom-jersey-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-heat transition-opacity hover:opacity-80"
          >
            Open Football Configurator
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-mist/50">
          Basketball-related work also exists on the site; current functionality there should be confirmed against
          the live build.
        </p>
      </section>

      <section id="sports-challenge" className="-mt-16 flex flex-col gap-10 lg:-mt-24">
        <p className="mx-auto max-w-xl text-balance text-center text-xl italic leading-relaxed text-paper lg:text-2xl">
          &ldquo;How do you let customers personalize a physical product without creating an overwhelming
          configuration experience?&rdquo;
        </p>
        <p className="mx-auto max-w-xl text-balance text-center text-sm leading-relaxed text-mist">
          I built the interactive website and configurator myself. The physical products shown on the site—custom
          3D-printed displays—were designed and fabricated collaboratively.
        </p>
        <PriceCompare />
      </section>

      <section id="sports-experience" className="flex flex-col items-center gap-8">
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

      <section id="sports-physical-result" className="flex flex-col items-center gap-10">
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
        <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {physicalResults.map((item) => (
            <div key={item.id} className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <ProductMedia media={item.media} label={item.label} accent="heat" sizes="(min-width: 1024px) 23vw, 45vw" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
