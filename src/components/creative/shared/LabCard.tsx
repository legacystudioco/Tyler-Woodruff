import type { LabItem } from "@/data/creative/lab";
import GlassSurface from "@/components/ui/GlassSurface";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { cn } from "@/lib/utils";
import { NodesVisual, CubeVisual, FlowVisual, GridVisual, TypeVisual, ConceptVisual } from "./LabVisuals";
import CursorVisual from "./CursorVisual";

const sizeClasses: Record<LabItem["size"], string> = {
  large: "lg:col-span-7 lg:row-span-2",
  tall: "lg:col-span-4 lg:row-span-2",
  medium: "lg:col-span-5",
  small: "lg:col-span-3",
};

const accentText: Record<LabItem["accent"], string> = {
  signal: "text-signal",
  heat: "text-heat",
  electric: "text-electric",
};

function Visual({ item }: { item: LabItem }) {
  if (item.visual.kind === "media") {
    return <ProjectMedia media={item.visual.media} label={item.title} accent={item.accent} sizes="(min-width: 1024px) 40vw, 90vw" />;
  }
  if (item.visual.kind === "concept") {
    return <ConceptVisual accent={item.accent} />;
  }
  switch (item.visual.variant) {
    case "nodes":
      return <NodesVisual accent={item.accent} />;
    case "cube":
      return <CubeVisual accent={item.accent} />;
    case "flow":
      return <FlowVisual accent={item.accent} />;
    case "grid":
      return <GridVisual accent={item.accent} />;
    case "type":
      return <TypeVisual accent={item.accent} />;
    case "cursor":
      return <CursorVisual accent={item.accent} />;
    default:
      return null;
  }
}

export default function LabCard({ item }: { item: LabItem }) {
  const body = (
    <div className="flex h-full flex-col">
      <div className="relative min-h-[140px] flex-1 overflow-hidden rounded-t-xl border-b border-white/10 bg-ink/40">
        <Visual item={item} />
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className={cn("font-mono text-[10px] uppercase tracking-widest", accentText[item.accent])}>{item.category}</span>
        <h4 className="font-display text-lg font-medium text-paper">{item.title}</h4>
        <p className="text-xs leading-relaxed text-mist">{item.description}</p>
      </div>
    </div>
  );

  return (
    <div className={cn("group relative flex", sizeClasses[item.size])}>
      {item.glass ? (
        <GlassSurface className="!rounded-xl w-full">{body}</GlassSurface>
      ) : (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">{body}</div>
      )}
    </div>
  );
}
