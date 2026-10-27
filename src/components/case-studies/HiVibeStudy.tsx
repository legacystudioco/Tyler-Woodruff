import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ScreenshotGrid from "./shared/ScreenshotGrid";
import InterfaceSurface from "./shared/InterfaceSurface";
import Tag from "@/components/ui/Tag";
import { commerceStack, portalScreens, roleMeta } from "@/data/case-studies/hiVibe";

export default function HiVibeStudy() {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="hivibe-role" className="flex flex-col items-center gap-3 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-mist">
          {roleMeta.title} — {roleMeta.org}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-mist/60">{roleMeta.term}</span>
      </section>

      <section id="hivibe-commerce" className="-mt-16 flex flex-col gap-10 lg:-mt-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Part One — Commerce &amp; Brand Experience</Eyebrow>
          <DisplayHeading size="md" as="h3">
            A Shopify storefront built to carry the brand.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-mist">
            The site runs on a Shopify Liquid theme extended with substantial custom code. My contribution spans
            code, page templates, product configuration, video, and the overall connected shopping experience.
          </p>
        </div>
        <ScreenshotGrid items={commerceStack} />
      </section>

      <section id="hivibe-member-app" className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="electric">Part Two — Member App &amp; Program Experience</Eyebrow>
          <DisplayHeading size="md" as="h3">
            The HI-VIBE Portal.
          </DisplayHeading>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-mist">
            A member application supporting guided program content, journaling, community, and personalized access.
            It&rsquo;s complete and testable today—what remains is the video, audio, and guide content the founder
            still needs to supply before any public rollout.
          </p>
          <Tag tone="mist">Complete &amp; testable — not yet publicly launched</Tag>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {portalScreens.map((screen) => (
            <div
              key={screen.id}
              className="relative mx-auto aspect-[9/16] w-full max-w-[220px] transition-transform duration-300 ease-out hover:z-10 hover:scale-110"
            >
              <InterfaceSurface chrome="mobile" screen={screen.screen} label={screen.label} media={screen.media} accent="electric" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
