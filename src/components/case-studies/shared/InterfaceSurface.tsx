import type { MediaAsset } from "@/types/content";
import { assetExists } from "@/lib/assets";
import ResponsiveMedia from "@/components/ui/ResponsiveMedia";
import { cn } from "@/lib/utils";

export type ScreenVariant =
  | "site"
  | "form"
  | "dashboard"
  | "calendar"
  | "chat"
  | "table"
  | "detail"
  | "config"
  | "cards"
  | "profile"
  | "wireframe"
  | "checklist";

export type Chrome = "browser" | "panel" | "mobile";

type InterfaceSurfaceProps = {
  chrome?: Chrome;
  screen: ScreenVariant;
  label: string;
  media?: MediaAsset;
  accent?: "signal" | "heat" | "electric";
  className?: string;
  priority?: boolean;
};

const accentBg: Record<NonNullable<InterfaceSurfaceProps["accent"]>, string> = {
  signal: "bg-signal",
  heat: "bg-heat",
  electric: "bg-electric",
};

const accentText: Record<NonNullable<InterfaceSurfaceProps["accent"]>, string> = {
  signal: "text-signal",
  heat: "text-heat",
  electric: "text-electric",
};

export default function InterfaceSurface({
  chrome = "browser",
  screen,
  label,
  media,
  accent = "signal",
  className,
  priority,
}: InterfaceSurfaceProps) {
  const ready = Boolean(media && assetExists(media.src));

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-graphite shadow-[0_24px_50px_rgba(0,0,0,0.4)]",
        chrome === "mobile" && "rounded-[1.75rem] border-[5px] border-graphite bg-ink",
        className
      )}
    >
      {chrome === "browser" ? (
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3">
          <span className="h-2 w-2 rounded-full bg-heat/70" />
          <span className="h-2 w-2 rounded-full bg-signal/70" />
          <span className="h-2 w-2 rounded-full bg-electric/70" />
          <span className="ml-2 h-3 flex-1 max-w-[60%] rounded-sm bg-white/[0.06]" />
        </div>
      ) : null}
      {chrome === "panel" ? (
        <div className="flex h-6 shrink-0 items-center border-b border-white/10 px-3 font-mono text-[8px] uppercase tracking-widest text-mist/50">
          {label}
        </div>
      ) : null}
      {chrome === "mobile" ? <div className="mx-auto mt-1.5 h-1 w-8 shrink-0 rounded-full bg-white/15" /> : null}

      <div className="relative flex-1 overflow-hidden">
        {ready && media ? (
          <ResponsiveMedia media={media} sizes="(min-width: 1024px) 40vw, 90vw" priority={priority} />
        ) : (
          <ScreenContent screen={screen} accent={accent} />
        )}
      </div>

      {chrome !== "panel" ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/70 to-transparent px-3 py-2 font-mono text-[8px] uppercase tracking-widest text-paper/50">
          <span>{label}</span>
          <span className={cn(accentText[accent], "opacity-80")}>●</span>
        </div>
      ) : null}
    </div>
  );
}

function Bar({ w, tone = "bg-white/10" }: { w: string; tone?: string }) {
  return <div className={cn("h-2 rounded-full", tone)} style={{ width: w }} />;
}

function ScreenContent({ screen, accent }: { screen: ScreenVariant; accent: NonNullable<InterfaceSurfaceProps["accent"]> }) {
  const dot = accentBg[accent];

  switch (screen) {
    case "site":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <Bar w="30%" />
            <div className="flex gap-2">
              <Bar w="16px" tone="bg-white/10" />
              <Bar w="16px" tone="bg-white/10" />
            </div>
          </div>
          <Bar w="70%" tone="bg-paper/25" />
          <Bar w="50%" tone="bg-paper/15" />
          <div className={cn("mt-1 h-6 w-20 rounded-full", dot)} />
          <div className="mt-2 flex-1 rounded-lg border border-white/10 bg-white/[0.03]" />
        </div>
      );
    case "form":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <Bar w="40%" tone="bg-paper/25" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Bar w="25%" tone="bg-white/10" />
              <div className="h-6 rounded-md border border-white/10 bg-white/[0.03]" />
            </div>
          ))}
          <div className={cn("mt-1 h-6 w-24 rounded-full", dot)} />
        </div>
      );
    case "dashboard":
      return (
        <div className="flex h-full gap-3 p-4">
          <div className="flex w-8 flex-col gap-2 border-r border-white/10 pr-2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? dot : "bg-white/15")} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-10 rounded-md border border-white/10 bg-white/[0.03]" />
              ))}
            </div>
            <div className="flex-1 rounded-md border border-white/10 bg-white/[0.02]" />
          </div>
        </div>
      );
    case "calendar":
      return (
        <div className="grid h-full grid-cols-7 gap-1 p-3">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-sm border border-white/5",
                [4, 11, 19].includes(i) ? dot : "bg-white/[0.03]"
              )}
            />
          ))}
        </div>
      );
    case "chat":
      return (
        <div className="flex h-full flex-col justify-end gap-2 p-4">
          <div className="w-2/3 rounded-lg rounded-bl-sm bg-white/[0.06] px-3 py-2">
            <Bar w="80%" />
          </div>
          <div className={cn("ml-auto w-1/2 rounded-lg rounded-br-sm px-3 py-2", "bg-white/10")}>
            <Bar w="70%" tone="bg-paper/30" />
          </div>
          <div className="w-3/5 rounded-lg rounded-bl-sm bg-white/[0.06] px-3 py-2">
            <Bar w="60%" />
          </div>
        </div>
      );
    case "table":
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex gap-3 border-b border-white/10 pb-2">
            <Bar w="20%" tone="bg-paper/20" />
            <Bar w="30%" tone="bg-paper/20" />
            <Bar w="15%" tone="bg-paper/20" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Bar w="20%" />
              <Bar w="30%" />
              <span className={cn("h-2 w-2 rounded-full", i === 1 ? dot : "bg-white/15")} />
            </div>
          ))}
        </div>
      );
    case "detail":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <Bar w="35%" tone="bg-paper/25" />
            <span className={cn("h-5 w-14 rounded-full", dot, "opacity-80")} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <Bar w="60%" tone="bg-white/10" />
                <Bar w="80%" tone="bg-white/[0.06]" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-md border border-white/10 bg-white/[0.02]" />
        </div>
      );
    case "config":
      return (
        <div className="flex h-full gap-3 p-4">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
            <div className={cn("h-14 w-14 rounded-md border-2", accent === "heat" ? "border-heat/60" : accent === "electric" ? "border-electric/60" : "border-signal/60")} />
          </div>
          <div className="flex w-14 flex-col gap-2">
            <div className="flex gap-1.5">
              <span className="h-4 w-4 rounded-full bg-signal" />
              <span className="h-4 w-4 rounded-full bg-heat" />
              <span className="h-4 w-4 rounded-full bg-electric" />
            </div>
            <Bar w="100%" tone="bg-white/10" />
            <Bar w="70%" tone="bg-white/10" />
          </div>
        </div>
      );
    case "cards":
      return (
        <div className="grid h-full grid-cols-2 gap-2 p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2">
              <div className="h-8 rounded-sm bg-white/[0.06]" />
              <Bar w="70%" />
            </div>
          ))}
        </div>
      );
    case "profile":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
          <div className={cn("h-10 w-10 rounded-full", dot, "opacity-70")} />
          <Bar w="60px" tone="bg-paper/25" />
          <Bar w="80px" tone="bg-white/10" />
          <div className="mt-2 flex gap-1.5">
            <span className="h-4 w-10 rounded-full border border-white/15" />
            <span className="h-4 w-10 rounded-full border border-white/15" />
          </div>
        </div>
      );
    case "wireframe":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full p-3">
          <g stroke="var(--color-mist)" strokeOpacity={0.4} strokeWidth={0.8} fill="none">
            <rect x={20} y={30} width={60} height={45} />
            <line x1={20} y1={30} x2={35} y2={15} />
            <line x1={80} y1={30} x2={95} y2={15} />
            <line x1={80} y1={75} x2={95} y2={60} />
            <line x1={35} y1={15} x2={95} y2={15} />
            <line x1={95} y1={15} x2={95} y2={60} />
          </g>
          <circle cx={50} cy={52} r={3} fill="var(--color-signal)" />
        </svg>
      );
    case "checklist":
      return (
        <div className="flex h-full flex-col justify-center gap-2.5 p-4">
          {[true, true, false, true].map((pass, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm text-[8px]",
                  pass ? "bg-signal text-ink" : "border border-white/20 text-transparent"
                )}
              >
                {pass ? "✓" : "-"}
              </span>
              <Bar w={`${50 + i * 10}%`} />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
