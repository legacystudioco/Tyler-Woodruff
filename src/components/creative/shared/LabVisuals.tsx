import { cn } from "@/lib/utils";

const accentVar = {
  signal: "var(--color-signal)",
  heat: "var(--color-heat)",
  electric: "var(--color-electric)",
};

type Accent = keyof typeof accentVar;

export function NodesVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  const nodes = [
    { x: 50, y: 15 },
    { x: 18, y: 40 },
    { x: 82, y: 40 },
    { x: 30, y: 75 },
    { x: 70, y: 75 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full p-6">
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1={50} y1={15} x2={n.x} y2={n.y} stroke={c} strokeOpacity={0.25} strokeWidth={0.6} />
      ))}
      <line x1={18} y1={40} x2={30} y2={75} stroke={c} strokeOpacity={0.25} strokeWidth={0.6} />
      <line x1={82} y1={40} x2={70} y2={75} stroke={c} strokeOpacity={0.25} strokeWidth={0.6} />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 5 : 3} fill={c} className="motion-safe:animate-cell-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
    </svg>
  );
}

export function CubeVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  const size = 90;
  const half = size / 2;
  const faceStyle = (transform: string): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    border: `1px solid ${c}`,
    background: `color-mix(in srgb, ${c} 6%, transparent)`,
    transform,
  });
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ perspective: 500 }}>
      <div className="relative motion-safe:animate-spin3d" style={{ width: size, height: size, transformStyle: "preserve-3d" }}>
        <div style={faceStyle(`translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`)} />
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`)} />
      </div>
    </div>
  );
}

export function FlowVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 p-6">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-3 w-3 shrink-0 rounded-full border" style={{ borderColor: c }} />
          {i < 3 ? (
            <span className="relative h-px w-8 shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${c} 30%, transparent)` }}>
              <span
                className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full motion-safe:animate-flow-x"
                style={{ backgroundColor: c, animationDelay: `${i * 0.3}s` }}
              />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function GridVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  const cells = Array.from({ length: 36 });
  return (
    <div className="grid h-full w-full grid-cols-6 gap-1.5 p-6">
      {cells.map((_, i) => (
        <span
          key={i}
          className="rounded-[2px] motion-safe:animate-cell-pulse"
          style={{ backgroundColor: c, animationDelay: `${(i % 9) * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function TypeVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  const words = ["<build/>", "iterate();", "ship —", "again."];
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden font-mono text-xl">
      {words.map((word, i) => (
        <span
          key={word}
          className="absolute motion-safe:animate-cycle-fade"
          style={{ color: c, animationDelay: `${i * 1.5}s` }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function ConceptVisual({ accent }: { accent: Accent }) {
  const c = accentVar[accent];
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span
        className={cn("h-10 w-10 rounded-full border transition-transform duration-500 group-hover:scale-125")}
        style={{ borderColor: c }}
      />
    </div>
  );
}
