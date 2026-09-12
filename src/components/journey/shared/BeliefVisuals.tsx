import type { BeliefVisual } from "@/data/journey/beliefs";

export default function BeliefVisualPanel({ variant }: { variant: BeliefVisual }) {
  switch (variant) {
    case "resolve":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <path d="M20 30 L50 90 L70 20 L95 100 L120 40 L145 80 L180 30" stroke="var(--color-mist)" strokeOpacity={0.25} strokeWidth={1.5} fill="none" />
          <line x1={20} y1={60} x2={180} y2={60} stroke="var(--color-signal)" strokeWidth={2.5} />
        </svg>
      );
    case "signal":
      return (
        <div className="flex h-full w-full flex-col justify-center gap-2.5 px-8">
          <div className="h-2.5 w-2/3 rounded-full bg-white/10" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
          <div className="h-2.5 w-3/4 rounded-full bg-signal" />
          <div className="h-2.5 w-1/3 rounded-full bg-white/10" />
        </div>
      );
    case "impact":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <circle cx={85} cy={60} r={40} fill="none" stroke="var(--color-electric)" strokeOpacity={0.5} strokeWidth={1.5} />
          <circle cx={125} cy={60} r={40} fill="none" stroke="var(--color-heat)" strokeOpacity={0.5} strokeWidth={1.5} />
          <circle cx={105} cy={60} r={10} fill="var(--color-signal)" />
        </svg>
      );
    case "prototype":
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 px-8">
          <div className="h-16 w-24 rounded-md border border-dashed border-white/25" />
          <span className="text-mist/40">→</span>
          <div className="flex h-10 w-24 items-center justify-center rounded-full bg-signal font-mono text-[10px] uppercase text-ink">
            Ship
          </div>
        </div>
      );
    case "execute":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <circle cx={40} cy={60} r={8} fill="none" stroke="var(--color-mist)" strokeOpacity={0.4} strokeWidth={1.5} />
          <line x1={50} y1={60} x2={150} y2={60} stroke="var(--color-signal)" strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="4 4" />
          <circle cx={160} cy={60} r={12} fill="var(--color-signal)" />
        </svg>
      );
    case "system":
      return (
        <div className="grid h-full w-full grid-cols-5 gap-3 p-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === 7 ? "bg-signal" : "bg-white/15"}`} />
          ))}
        </div>
      );
    case "detail":
      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-signal" />
          <span className="absolute h-16 w-16 rounded-full border border-signal/30" />
          <span className="absolute h-28 w-28 rounded-full border border-signal/10" />
        </div>
      );
    default:
      return null;
  }
}
