import type { MediaAsset } from "@/types/content";
import ProjectMedia from "@/components/ui/ProjectMedia";

export type MomentItem = {
  id: string;
  media: MediaAsset;
  label: string;
  top: string;
  left: string;
  width: number;
  height: number;
  rotate?: number;
  z?: number;
};

export default function MomentsCollage({ items }: { items: MomentItem[] }) {
  return (
    <>
      <div className="relative hidden h-[560px] w-full lg:block">
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute overflow-hidden rounded-lg border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
            style={{
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
              zIndex: item.z ?? 1,
              transform: `translate(-50%, -50%) rotate(${item.rotate ?? 0}deg)`,
            }}
          >
            <ProjectMedia media={item.media} label={item.label} accent="heat" sizes="(min-width: 1024px) 30vw, 90vw" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
        {items.map((item) => (
          <div key={item.id} className="aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
            <ProjectMedia media={item.media} label={item.label} accent="heat" sizes="50vw" />
          </div>
        ))}
      </div>
    </>
  );
}
