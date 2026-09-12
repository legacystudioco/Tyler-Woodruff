import { cn } from "@/lib/utils";

type SystemNodeProps = {
  label: string;
  active?: boolean;
  accent?: "signal" | "heat" | "electric";
  compact?: boolean;
  className?: string;
};

const accentMap = {
  signal: "border-signal/60 text-signal",
  heat: "border-heat/60 text-heat",
  electric: "border-electric/60 text-electric",
};

export default function SystemNode({ label, active, accent = "signal", compact, className }: SystemNodeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border bg-graphite/90 text-center font-mono uppercase tracking-wider transition-colors duration-300",
        compact ? "px-2 py-2 text-[9px] sm:text-[10px]" : "px-4 py-3 text-xs",
        active ? accentMap[accent] : "border-white/15 text-mist",
        className
      )}
    >
      {label}
    </div>
  );
}
