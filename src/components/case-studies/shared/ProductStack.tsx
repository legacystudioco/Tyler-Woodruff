import InterfaceSurface, { type Chrome, type ScreenVariant } from "./InterfaceSurface";
import type { MediaAsset } from "@/types/content";

export type StackItem = {
  id: string;
  chrome?: Chrome;
  screen: ScreenVariant;
  label: string;
  media?: MediaAsset;
  accent?: "signal" | "heat" | "electric";
  top: string;
  left: string;
  width: number;
  height: number;
  rotate?: number;
  z?: number;
};

export default function ProductStack({ items, className = "" }: { items: StackItem[]; className?: string }) {
  return (
    <>
      <div className={`relative hidden h-[460px] w-full lg:block lg:h-[560px] ${className}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
              zIndex: item.z ?? 1,
              transform: `translate(-50%, -50%) rotate(${item.rotate ?? 0}deg)`,
            }}
          >
            <InterfaceSurface chrome={item.chrome} screen={item.screen} label={item.label} media={item.media} accent={item.accent} />
          </div>
        ))}
      </div>

      <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden ${className}`}>
        {items.map((item) => (
          <div key={item.id} className="h-56">
            <InterfaceSurface chrome={item.chrome} screen={item.screen} label={item.label} media={item.media} accent={item.accent} />
          </div>
        ))}
      </div>
    </>
  );
}
