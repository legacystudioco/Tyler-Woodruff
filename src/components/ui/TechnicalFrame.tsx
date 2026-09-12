import { cn } from "@/lib/utils";

type TechnicalFrameProps = {
  children: React.ReactNode;
  index: string;
  label: string;
  className?: string;
};

export default function TechnicalFrame({ children, index, label, className }: TechnicalFrameProps) {
  return (
    <div className={cn("relative rounded-2xl border border-white/10 bg-white/[0.015] p-px", className)}>
      <div className="relative overflow-hidden rounded-2xl">
        <CornerMarks />
        <div className="absolute left-4 top-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-mist/50">
          {index} — {label}
        </div>
        {children}
      </div>
    </div>
  );
}

function CornerMarks() {
  const base = "absolute z-10 h-3 w-3 border-signal/30";
  return (
    <>
      <span className={cn(base, "left-2 top-2 border-l border-t")} aria-hidden />
      <span className={cn(base, "right-2 top-2 border-r border-t")} aria-hidden />
      <span className={cn(base, "bottom-2 left-2 border-b border-l")} aria-hidden />
      <span className={cn(base, "bottom-2 right-2 border-b border-r")} aria-hidden />
    </>
  );
}
