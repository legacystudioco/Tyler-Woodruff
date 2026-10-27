import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import InterfaceSurface from "./shared/InterfaceSurface";
import SystemFlow from "./shared/SystemFlow";
import { assetExists } from "@/lib/assets";
import { pipeline, screens, exportVideo } from "@/data/case-studies/riverOfLife";

export default function RiverOfLifeStudy() {
  const readyScreens = screens.filter((screen) => screen.media && assetExists(screen.media.src));

  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      <section id="river-visual-opening" className="flex flex-col gap-10">
        <p className="mx-auto max-w-xl text-balance text-center text-lg italic leading-relaxed text-mist">
          &ldquo;A purpose-built tool, made for one specific job: getting a song&rsquo;s words on screen, in time,
          without friction.&rdquo;
        </p>
        <div className="mx-auto grid w-full max-w-5xl gap-8 sm:grid-cols-2">
          {readyScreens.map((screen) => (
            <div key={screen.id} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-xl border border-white/10" style={{ aspectRatio: screen.ratio }}>
                <InterfaceSurface chrome="panel" screen="detail" label={screen.title} media={screen.media} accent="signal" />
              </div>
              <div>
                <h4 className="font-display text-lg font-medium text-paper">{screen.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-mist">{screen.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="river-pipeline" className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Demonstration</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Import a song. Review timing. Export the video.
          </DisplayHeading>
        </div>
        <SystemFlow steps={pipeline} accent="signal" />
      </section>

      <section id="river-demo" className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>End to End</Eyebrow>
          <DisplayHeading size="md" as="h3">
            Watch the full pass.
          </DisplayHeading>
        </div>
        <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <ProjectMedia media={exportVideo} label="Import-to-Export Demonstration" accent="signal" sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
        <p className="max-w-lg text-balance text-center text-xs leading-relaxed text-mist/70">
          Built as a local-first desktop app (Electron) for worship lyric-video production—applying production
          experience to a purpose-built tool, not a general-purpose editor.
        </p>
      </section>
    </div>
  );
}
