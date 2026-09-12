import type { Theme } from "@/types/content";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

type CaseStudyDividerProps = {
  fromTheme: Theme;
  toTheme: Theme;
  number: string;
  label: string;
  accent: "signal" | "heat" | "electric";
  variant?: "auto" | "bleed" | "marquee";
};

const accentVar: Record<CaseStudyDividerProps["accent"], string> = {
  signal: "var(--color-signal)",
  heat: "var(--color-heat)",
  electric: "var(--color-electric)",
};

const themeBg: Record<Theme, string> = {
  ink: "var(--color-ink)",
  paper: "var(--color-paper)",
};

const themeText: Record<Theme, string> = {
  ink: "var(--color-paper)",
  paper: "var(--color-ink)",
};

const themeMutedText: Record<Theme, string> = {
  ink: "text-mist/60",
  paper: "text-ink/50",
};

export default function CaseStudyDivider({ fromTheme, toTheme, number, label, accent, variant = "auto" }: CaseStudyDividerProps) {
  const accentColor = accentVar[accent];

  if (variant === "bleed") {
    return (
      <div className="relative w-full overflow-hidden bg-ink py-16 lg:py-20">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 lg:px-12">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist/50">Next — {label}</span>
          <div className="h-px flex-1" style={{ backgroundColor: accentColor, opacity: 0.3 }} aria-hidden />
        </div>
        <div className="relative mt-6 flex items-center">
          <span
            className="z-10 -mr-6 font-display text-[24vw] font-semibold leading-none tracking-tight sm:text-[16vw] lg:-mr-10 lg:text-[10vw]"
            style={{ color: accentColor }}
          >
            {number}
          </span>
          <div className="h-20 flex-1 overflow-hidden rounded-lg border border-white/10 opacity-70 sm:h-28 lg:h-32">
            <MediaPlaceholder label={label} hint="Image pending" accent={accent} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "marquee") {
    const repeated = Array.from({ length: 8 }).map(() => label.toUpperCase());
    return (
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-ink py-10">
        <div className="motion-safe:animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...repeated, ...repeated].map((text, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-3xl font-semibold tracking-tight lg:text-5xl" style={{ color: i % 2 === 0 ? accentColor : "var(--color-mist)" }}>
              {text}
              <span className="text-mist/30">{number}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (fromTheme !== toTheme) {
    return (
      <div
        className="relative h-40 w-full overflow-hidden sm:h-44 lg:h-56"
        style={{ background: `linear-gradient(to bottom, ${themeBg[fromTheme]} 50%, ${themeBg[toTheme]} 50%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[22vw] font-semibold leading-none tracking-tight sm:text-[20vw] lg:text-[13vw]"
            style={{ clipPath: "inset(0 0 50% 0)", color: themeText[fromTheme] }}
            aria-hidden
          >
            {number}
          </span>
          <span
            className="absolute font-display text-[22vw] font-semibold leading-none tracking-tight sm:text-[20vw] lg:text-[13vw]"
            style={{ clipPath: "inset(50% 0 0 0)", color: themeText[toTheme] }}
            aria-hidden
          >
            {number}
          </span>
        </div>
        <div className={`absolute left-6 top-[20%] -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest lg:left-12 lg:top-[27%] ${themeMutedText[fromTheme]}`}>
          Next
        </div>
        <div className={`absolute right-6 top-[80%] -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest lg:right-12 lg:top-[73%] ${themeMutedText[toTheme]}`}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full border-t border-white/10 bg-ink py-20 lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 text-center">
        <span className="h-px w-12" style={{ backgroundColor: accentColor, opacity: 0.5 }} aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50">Next</span>
        <span
          className="font-display text-[16vw] font-semibold leading-none tracking-tight sm:text-[10vw] lg:text-[7vw]"
          style={{ color: accentColor, opacity: 0.22 }}
        >
          {number}
        </span>
        <span className="-mt-6 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          {label}
        </span>
      </div>
    </div>
  );
}
