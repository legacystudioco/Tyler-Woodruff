import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "signal" | "mist" | "heat" | "electric" | "ink";
};

const toneMap = {
  signal: "text-signal",
  mist: "text-mist",
  heat: "text-heat",
  electric: "text-electric",
  ink: "text-ink/70",
};

export default function Eyebrow({ children, className, tone = "signal" }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em]", toneMap[tone], className)}>
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </div>
  );
}
