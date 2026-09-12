import Image from "next/image";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

type ResponsiveMediaProps = {
  media: MediaAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ResponsiveMedia({ media, className, sizes = "100vw", priority }: ResponsiveMediaProps) {
  const fit = media.fit ?? "cover";
  const position = media.position ?? "center";

  if (media.type === "video") {
    return (
      <video
        className={cn("h-full w-full", className)}
        style={{ objectFit: fit, objectPosition: position }}
        poster={media.poster}
        preload="none"
        muted
        loop
        playsInline
        controls
        aria-label={media.alt}
      >
        <source src={media.src} />
      </video>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
}
