import type { MediaAsset } from "@/types/content";
import type { AiArea } from "@/data/journey/aiMaterial";
import ProjectMedia from "@/components/ui/ProjectMedia";

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 148;

export default function AiOrbit({ portrait, areas }: { portrait: MediaAsset; areas: AiArea[] }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: SIZE, aspectRatio: "1 / 1" }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--color-electric)" strokeOpacity={0.18} strokeWidth={1} />
        {areas.map((area) => {
          const rad = (area.angle * Math.PI) / 180;
          const x = CENTER + Math.cos(rad) * RADIUS;
          const y = CENTER + Math.sin(rad) * RADIUS;
          return <line key={area.id} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="var(--color-electric)" strokeOpacity={0.3} strokeWidth={1} />;
        })}
      </svg>

      <div className="absolute inset-0 animate-spin [animation-duration:40s]">
        <div className="absolute inset-6 rounded-full border border-dashed border-electric/25" />
      </div>

      <div
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-electric/40 shadow-[0_0_50px_rgba(61,90,254,0.25)]"
      >
        <ProjectMedia media={portrait} label="Human" accent="electric" showPlaceholderLabel={false} sizes="144px" />
      </div>

      {areas.map((area) => {
        const rad = (area.angle * Math.PI) / 180;
        const x = ((CENTER + Math.cos(rad) * RADIUS) / SIZE) * 100;
        const y = ((CENTER + Math.sin(rad) * RADIUS) / SIZE) * 100;
        return (
          <div
            key={area.id}
            className="absolute w-24 max-w-[28%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="h-2 w-2 shrink-0 rounded-full bg-electric shadow-[0_0_10px_rgba(61,90,254,0.7)]" />
              <span className="font-mono text-[9px] uppercase leading-tight tracking-wider text-paper">{area.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
