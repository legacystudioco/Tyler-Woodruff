import InterfaceSurface from "./InterfaceSurface";
import type { StackItem } from "./ProductStack";
import { assetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

export default function ScreenshotGrid({ items, className }: { items: StackItem[]; className?: string }) {
  const seenSrc = new Set<string>();
  const ready = items.filter((item) => {
    if (!item.media || !assetExists(item.media.src)) return false;
    if (seenSrc.has(item.media.src)) return false;
    seenSrc.add(item.media.src);
    return true;
  });

  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}>
      {ready.map((item, i) => {
        const isLoneTrailing = ready.length % 2 === 1 && i === ready.length - 1;
        return (
          <div
            key={item.id}
            className={cn(
              item.chrome === "mobile" ? "mx-auto aspect-[9/16] w-full max-w-[260px]" : "aspect-[16/10] w-full",
              isLoneTrailing && "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]"
            )}
          >
            <InterfaceSurface chrome={item.chrome} screen={item.screen} label={item.label} media={item.media} accent={item.accent} />
          </div>
        );
      })}
    </div>
  );
}
