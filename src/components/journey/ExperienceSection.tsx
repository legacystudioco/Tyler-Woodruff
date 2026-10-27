import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import { experienceTracks, rangeStart, today, toDecimal } from "@/data/journey/experience";
import { cn } from "@/lib/utils";

const startDecimal = toDecimal(rangeStart);
const endDecimal = toDecimal(today);
const totalRange = endDecimal - startDecimal;

function percent(decimal: number) {
  return ((decimal - startDecimal) / totalRange) * 100;
}

function formatDate(date: { year: number; month: number } | "present") {
  if (date === "present") return "Present";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.month - 1]} ${date.year}`;
}

const accentBg = { heat: "bg-heat", signal: "bg-signal", electric: "bg-electric", mist: "bg-mist" } as const;
const accentText = { heat: "text-heat", signal: "text-signal", electric: "text-electric", mist: "text-mist" } as const;
const accentBorder = {
  heat: "border-heat/40",
  signal: "border-signal/40",
  electric: "border-electric/40",
  mist: "border-mist/40",
} as const;

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
            const startPct = percent(toDecimal(track.start));
            const endPct = track.end === "present" ? 100 : percent(toDecimal(track.end));
            const isPresent = track.end === "present";

            return (
              <div key={track.id} className="flex flex-col gap-4">
                <div className="relative h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className={cn("absolute inset-y-0 rounded-full", accentBg[track.accent])}
                    style={{ left: `${startPct}%`, width: `${Math.max(endPct - startPct, 1.5)}%` }}
                  />
                  <span
                    className={cn("absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full", accentBg[track.accent])}
                    style={{ left: `${startPct}%` }}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full",
                      isPresent ? "bg-paper shadow-[0_0_10px_rgba(199,255,0,0.6)]" : accentBg[track.accent]
                    )}
                    style={{ left: `${endPct}%` }}
                  />
                </div>
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-mist/50">
                  <span>{formatDate(track.start)}</span>
                  <span>{formatDate(track.end)}</span>
                </div>
                <div className={cn("flex flex-col gap-2 border-l-2 pl-5", accentBorder[track.accent])}>
                  <h3 className="font-display text-2xl font-medium text-paper">{track.role}</h3>
                  <p className={cn("font-mono text-xs uppercase tracking-wider", accentText[track.accent])}>
                    {track.org}
                    {track.location ? <span className="text-mist/50"> — {track.location}</span> : null}
                  </p>
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

        <p className="max-w-xl text-balance text-sm leading-relaxed text-mist/70">
          Church leadership roles are included here as real evidence of creative direction, team leadership,
          original content production, and live-experience design—not as a separate category of work.
        </p>
      </div>
    </Section>
  );
}
