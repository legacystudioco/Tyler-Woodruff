import type { MediaAsset } from "@/types/content";
import { assetExists } from "@/lib/assets";
import MediaPlaceholder from "./MediaPlaceholder";
import ResponsiveMedia from "./ResponsiveMedia";
import ParallaxLayer from "./ParallaxLayer";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  media?: MediaAsset;
  label: string;
  accent?: "signal" | "heat" | "electric";
  className?: string;
  sizes?: string;
  priority?: boolean;
  showPlaceholderLabel?: boolean;
  parallax?: boolean;
};

export default function ProjectMedia({
  media,
  label,
  accent,
  className,
  sizes,
  priority,
  showPlaceholderLabel = true,
  parallax = false,
}: ProjectMediaProps) {
  const ready = media && assetExists(media.src);

  const content = ready && media ? (
    <ResponsiveMedia media={media} sizes={sizes} priority={priority} />
  ) : (
    <MediaPlaceholder label={label} accent={accent} showLabel={showPlaceholderLabel} className="absolute inset-0" />
  );

  return (
    <div className={cn("relative h-full w-full", className)}>
      {parallax && ready ? <ParallaxLayer>{content}</ParallaxLayer> : content}
    </div>
  );
}
