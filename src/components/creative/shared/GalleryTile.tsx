import type { GalleryItem } from "@/data/creative/visualExperiments";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { cn } from "@/lib/utils";

export default function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg", item.colSpan, item.aspect, item.overlap)}>
      <div className="absolute inset-0 scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.08]">
        <ProjectMedia media={item.media} label={item.label} sizes="(min-width: 1024px) 40vw, 90vw" showPlaceholderLabel={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-mono text-[10px] uppercase tracking-widest text-paper">{item.label}</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-paper/50">{item.category}</span>
      </div>
    </div>
  );
}
