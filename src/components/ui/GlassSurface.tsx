import { cn } from "@/lib/utils";

type GlassSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tone?: "dark" | "light";
};

export default function GlassSurface({ children, className, style, tone = "dark" }: GlassSurfaceProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
        tone === "dark"
          ? cn(
              "border border-white/15 bg-white/[0.06] backdrop-blur-xl",
              "before:bg-gradient-to-br before:from-white/20 before:via-white/0 before:to-transparent",
              "after:border-white/10"
            )
          : cn(
              "border border-ink/15 bg-ink/[0.035] backdrop-blur-xl",
              "before:bg-gradient-to-br before:from-white/50 before:via-white/0 before:to-transparent",
              "after:border-ink/10"
            ),
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-60",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:border",
        className
      )}
    >
      {children}
    </div>
  );
}
