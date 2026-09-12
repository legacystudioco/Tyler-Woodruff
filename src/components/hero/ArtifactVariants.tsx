import type { ArtifactVariant } from "@/data/heroArtifacts";

export default function ArtifactVisual({ variant }: { variant: ArtifactVariant }) {
  switch (variant) {
    case "ui":
      return <UiVisual />;
    case "stage-result":
      return <StageResultVisual />;
    case "code":
      return <CodeVisual />;
    case "system":
      return <SystemVisual />;
    case "art":
      return <ArtVisual />;
    case "jersey":
      return <JerseyVisual />;
    case "stage":
      return <StageVisual />;
    default:
      return null;
  }
}

function UiVisual() {
  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-heat/70" />
        <span className="h-2 w-2 rounded-full bg-signal/70" />
        <span className="h-2 w-2 rounded-full bg-electric/70" />
      </div>
      <div className="flex flex-1 gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-2.5 w-3/4 rounded-full bg-paper/20" />
          <div className="h-2.5 w-1/2 rounded-full bg-paper/10" />
          <div className="mt-2 h-16 rounded-lg border border-paper/15 bg-paper/[0.04]" />
          <div className="h-6 w-20 rounded-full bg-signal/90" />
        </div>
        <div className="flex w-14 flex-col items-end justify-end gap-1">
          {[40, 65, 50, 80].map((h, i) => (
            <div key={i} className="w-3 rounded-t-sm bg-electric/60" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StageResultVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-heat/40 blur-3xl" />
      <div className="absolute inset-x-0 top-6 h-px bg-gradient-to-r from-transparent via-heat/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-24 w-32 -translate-x-1/2 rounded-t-full bg-ink/80 blur-sm" />
      <div className="absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-t-full bg-ink" />
    </div>
  );
}

function CodeVisual() {
  const lines = [
    { w: "40%", tone: "text-electric/80" },
    { w: "70%", tone: "text-paper/70" },
    { w: "55%", tone: "text-signal/80" },
    { w: "62%", tone: "text-paper/50" },
    { w: "35%", tone: "text-electric/60" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5 p-5 font-mono text-[10px]">
      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-paper/20">{String(i + 1).padStart(2, "0")}</span>
          <span className={`h-2.5 rounded-sm bg-current ${line.tone} opacity-70`} style={{ width: line.w }} />
        </div>
      ))}
      <span className="ml-6 h-3 w-1.5 animate-pulse bg-signal" />
    </div>
  );
}

function SystemVisual() {
  const nodes = [
    { x: 50, y: 18 },
    { x: 20, y: 45 },
    { x: 80, y: 45 },
    { x: 32, y: 82 },
    { x: 68, y: 82 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full p-4">
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1={50} y1={18} x2={n.x} y2={n.y} stroke="var(--color-mist)" strokeOpacity={0.3} strokeWidth={0.8} />
      ))}
      <line x1={20} y1={45} x2={32} y2={82} stroke="var(--color-mist)" strokeOpacity={0.3} strokeWidth={0.8} />
      <line x1={80} y1={45} x2={68} y2={82} stroke="var(--color-mist)" strokeOpacity={0.3} strokeWidth={0.8} />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 6 : 4}
          fill={i === 0 ? "var(--color-signal)" : "var(--color-graphite)"}
          stroke={i === 0 ? "none" : "var(--color-mist)"}
          strokeOpacity={0.5}
          strokeWidth={0.8}
        />
      ))}
    </svg>
  );
}

function ArtVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute -left-6 top-6 h-24 w-24 rounded-full bg-signal/80 mix-blend-screen" />
      <div className="absolute right-2 top-1/3 h-20 w-20 rotate-12 bg-heat/80 mix-blend-screen" />
      <div className="absolute bottom-4 left-1/4 h-24 w-24 rotate-45 border-2 border-electric/80" />
    </div>
  );
}

function JerseyVisual() {
  return (
    <svg viewBox="0 0 100 130" className="h-full w-full p-4">
      <path
        d="M30 8 L10 22 L18 38 L28 32 L28 118 L72 118 L72 32 L82 38 L90 22 L70 8 L60 14 Q50 20 40 14 Z"
        fill="var(--color-graphite)"
        stroke="var(--color-mist)"
        strokeOpacity={0.4}
        strokeWidth={1.2}
      />
      <line x1={50} y1={20} x2={50} y2={118} stroke="var(--color-signal)" strokeOpacity={0.7} strokeWidth={2} />
      <text x={50} y={78} textAnchor="middle" fontSize={26} fill="var(--color-paper)" opacity={0.25} fontFamily="var(--font-mono)">
        7
      </text>
    </svg>
  );
}

function StageVisual() {
  return (
    <svg viewBox="0 0 160 110" className="h-full w-full p-4">
      <polygon points="80,0 20,60 140,60" fill="var(--color-signal)" opacity={0.06} />
      <g stroke="var(--color-mist)" strokeOpacity={0.4} strokeWidth={1}>
        <line x1={10} y1={20} x2={150} y2={20} />
        <line x1={10} y1={20} x2={40} y2={70} />
        <line x1={40} y1={20} x2={70} y2={70} />
        <line x1={70} y1={20} x2={100} y2={70} />
        <line x1={100} y1={20} x2={130} y2={70} />
        <line x1={130} y1={20} x2={150} y2={70} />
      </g>
      <circle cx={40} cy={70} r={3} fill="var(--color-heat)" />
      <circle cx={100} cy={70} r={3} fill="var(--color-electric)" />
      <circle cx={130} cy={70} r={3} fill="var(--color-signal)" />
    </svg>
  );
}
