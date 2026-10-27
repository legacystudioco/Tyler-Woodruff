import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ScreenshotGrid from "./shared/ScreenshotGrid";
import SystemFlow from "./shared/SystemFlow";
import { stackItems, problemItems, designedItems, systemFlow } from "@/data/case-studies/eliteHomeSources";

export default function EliteHomeSourcesStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="elite-visual-opening" className="flex flex-col gap-10">
        <p className="mx-auto max-w-lg text-balance text-center text-lg italic leading-relaxed text-mist">
          &ldquo;What if the website wasn&rsquo;t just marketing&mdash;but the front door to the entire
          operation?&rdquo;
        </p>
        <ScreenshotGrid items={stackItems} />
      </section>

      <section id="elite-system" className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>The System</Eyebrow>
          <DisplayHeading size="md" as="h3">
            One operational thread, start to finish.
          </DisplayHeading>
        </div>
        <SystemFlow steps={systemFlow} accent="signal" />
      </section>

      <section id="elite-problem" className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="heat">Problem</Eyebrow>
          <p className="text-balance text-xl leading-relaxed text-paper lg:text-2xl">
            Fragmented, manual workflows across scheduling, communication, coordination, and billing.
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {problemItems.map((item) => (
              <li key={item} className="rounded-full border border-heat/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-heat/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <Eyebrow>What I Designed</Eyebrow>
          <ul className="grid grid-cols-1 gap-2.5 font-mono text-xs uppercase tracking-wider text-mist sm:grid-cols-2">
            {designedItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
