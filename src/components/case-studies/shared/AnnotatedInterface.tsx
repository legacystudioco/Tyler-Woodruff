import InterfaceSurface, { type Chrome, type ScreenVariant } from "./InterfaceSurface";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

export type Annotation = {
  label: string;
  top: string;
  side: "left" | "right";
};

type AnnotatedInterfaceProps = {
  chrome?: Chrome;
  screen: ScreenVariant;
  label: string;
  media?: MediaAsset;
  accent?: "signal" | "heat" | "electric";
  annotations: Annotation[];
};

export default function AnnotatedInterface({ chrome, screen, label, media, accent, annotations }: AnnotatedInterfaceProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative hidden h-[420px] lg:block">
        <div className="absolute inset-0">
          <InterfaceSurface chrome={chrome} screen={screen} label={label} media={media} accent={accent} />
        </div>
        {annotations.map((a) => (
          <div
            key={a.label}
            className={cn("absolute flex items-center gap-2", a.side === "right" ? "flex-row" : "flex-row-reverse")}
            style={{
              top: a.top,
              ...(a.side === "right" ? { left: "calc(100% + 0.75rem)" } : { right: "calc(100% + 0.75rem)" }),
            }}
          >
            <span className="h-px w-6 shrink-0 bg-mist/40" />
            <span className="w-36 shrink-0 font-mono text-[10px] uppercase leading-snug tracking-wider text-mist">
              {a.label}
            </span>
          </div>
        ))}
        {annotations.map((a) => (
          <span
            key={`dot-${a.label}`}
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
            style={{ top: a.top, left: a.side === "right" ? "100%" : "0%" }}
          />
        ))}
      </div>

      <div className="lg:hidden">
        <InterfaceSurface chrome={chrome} screen={screen} label={label} media={media} accent={accent} className="h-72" />
        <ul className="mt-6 flex flex-col gap-2">
          {annotations.map((a) => (
            <li key={a.label} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-mist">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              {a.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
