import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label: string;
  hint?: string;
  className?: string;
  accent?: "signal" | "heat" | "electric" | "mist";
  showLabel?: boolean;
};

const accentMap = {
  signal: "text-signal",
  heat: "text-heat",
  electric: "text-electric",
  mist: "text-mist",
};

export default function MediaPlaceholder({ label, hint, className, accent = "mist", showLabel = true }: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden bg-graphite p-5",
        className
      )}
    >
      <div className="absolute inset-3 border border-white/10" aria-hidden />
      <CornerMarks />
      <div className="relative flex flex-1 items-center justify-center">
        <ImageIcon className={cn("h-8 w-8 opacity-40", accentMap[accent])} strokeWidth={1.25} />
      </div>
      {showLabel ? (
        <div className="relative flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-mist/70">
          <span>{label}</span>
          <span>{hint ?? "Asset pending"}</span>
        </div>
      ) : null}
    </div>
  );
}

function CornerMarks() {
  const base = "absolute h-2.5 w-2.5 border-white/25";
  return (
    <>
      <span className={cn(base, "left-3 top-3 border-l border-t")} aria-hidden />
      <span className={cn(base, "right-3 top-3 border-r border-t")} aria-hidden />
      <span className={cn(base, "bottom-3 left-3 border-b border-l")} aria-hidden />
      <span className={cn(base, "bottom-3 right-3 border-b border-r")} aria-hidden />
    </>
  );
}
