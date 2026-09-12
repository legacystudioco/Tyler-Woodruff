import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "mist" | "ink" | "paper";
};

const toneMap = {
  mist: "border-white/15 text-mist",
  ink: "border-ink/20 text-ink/70",
  paper: "border-paper/20 text-paper/70",
};

export default function Tag({ children, className, tone = "mist" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
