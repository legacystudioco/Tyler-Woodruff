import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import { experienceTracks, currentYear } from "@/data/journey/experience";
import { cn } from "@/lib/utils";

const RANGE_START = 2010;

function trackStartPercent(start: number) {
  return ((start - RANGE_START) / (currentYear - RANGE_START)) * 100;
}

const accentBg = { heat: "bg-heat", signal: "bg-signal" } as const;
const accentText = { heat: "text-heat", signal: "text-signal" } as const;
const accentBorder = { heat: "border-heat/40", signal: "border-signal/40" } as const;

export default function ExperienceSection() {
  return (
    <Section id="experience" theme="ink" className="py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-16 px-6 lg:px-12">
        <div className="flex flex-col gap-5 lg:max-w-xl">
          <Eyebrow>Experience</Eyebrow>
          <DisplayHeading size="md" as="h2">
            Different paths. Same purpose.
          </DisplayHeading>
        </div>

        <div className="flex flex-col gap-14">
          {experienceTracks.map((track) => {
            const startPct = trackStartPercent(track.start);
            return (
              <div key={track.id} className="flex flex-col gap-4">
                <div className="relative h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className={cn("absolute inset-y-0 rounded-full", accentBg[track.accent])}
                    style={{ left: `${startPct}%`, right: 0 }}
                  />
                  <span
                    className={cn("absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full", accentBg[track.accent])}
                    style={{ left: `${startPct}%` }}
                  />
                  <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-paper shadow-[0_0_10px_rgba(199,255,0,0.6)]" />
                </div>
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-mist/50">
                  <span>{track.start}</span>
                  <span>Present</span>
                </div>
                <div className={cn("flex flex-col gap-2 border-l-2 pl-5", accentBorder[track.accent])}>
                  <h3 className="font-display text-2xl font-medium text-paper">{track.role}</h3>
                  <p className={cn("font-mono text-xs uppercase tracking-wider", accentText[track.accent])}>{track.org}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    {track.items.map((item) => (
                      <span key={item} className="font-mono text-[11px] uppercase tracking-wider text-mist">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
