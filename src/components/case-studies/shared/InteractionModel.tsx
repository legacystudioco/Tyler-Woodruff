import { cn } from "@/lib/utils";

type Lane = {
  actor: string;
  steps: string[];
  accent: "heat" | "electric";
};

const lanes: Lane[] = [
  { actor: "Church", steps: ["Create listing", "Publish"], accent: "heat" },
  { actor: "Person", steps: ["Discover", "Explore"], accent: "electric" },
];

function Chip({ label, accent, strong }: { label: string; accent?: "heat" | "electric"; strong?: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-md border px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider",
        strong
          ? "border-signal/60 bg-white/[0.05] text-signal backdrop-blur-md"
          : accent === "heat"
            ? "border-heat/40 bg-white/[0.03] text-heat/90"
            : "border-electric/40 bg-white/[0.03] text-electric/90"
      )}
    >
      {label}
    </span>
  );
}

export default function InteractionModel() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-5">
        {lanes.map((lane) => (
          <div key={lane.actor} className="flex flex-wrap items-center justify-center gap-2">
            <Chip label={lane.actor} accent={lane.accent} />
            {lane.steps.map((step) => (
              <span key={step} className="flex items-center gap-2">
                <span className="h-px w-4 bg-white/15" aria-hidden />
                <Chip label={step} accent={lane.accent} />
              </span>
            ))}
            <span className="h-px w-4 bg-white/15" aria-hidden />
          </div>
        ))}
      </div>

      <svg width="120" height="36" viewBox="0 0 120 36" className="overflow-visible" aria-hidden>
        <path d="M10 0 V14 L60 28 L110 14 V0" stroke="var(--color-mist)" strokeOpacity={0.3} strokeWidth={1} fill="none" />
      </svg>

      <Chip label="Ministry Linker Platform" strong />
    </div>
  );
}
