import { cn } from "@/lib/utils";

type FlowConnectorProps = {
  orientation?: "horizontal" | "vertical";
  active?: boolean;
  accent?: "signal" | "heat" | "electric";
  className?: string;
};

const accentDot = {
  signal: "bg-signal",
  heat: "bg-heat",
  electric: "bg-electric",
};

export default function FlowConnector({ orientation = "horizontal", active, accent = "signal", className }: FlowConnectorProps) {
  const isHorizontal = orientation === "horizontal";
  return (
    <div className={cn("relative shrink-0", isHorizontal ? "h-px w-8 sm:w-12" : "h-8 w-px sm:h-12", className)}>
      <div className="absolute inset-0 bg-white/15" />
      {active ? (
        <span
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full",
            isHorizontal ? "motion-safe:animate-flow-x top-1/2 left-0" : "motion-safe:animate-flow-y left-1/2 top-0",
            accentDot[accent]
          )}
        />
      ) : null}
    </div>
  );
}
