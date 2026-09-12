import { PlayCircle } from "lucide-react";
import { assetExists } from "@/lib/assets";
import VideoPlayer from "./VideoPlayer";

type VideoBuilderProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc?: string;
  label: string;
};

export default function VideoBuilder({ mp4Src, webmSrc, posterSrc, label }: VideoBuilderProps) {
  const hasMp4 = assetExists(mp4Src);
  const hasWebm = webmSrc ? assetExists(webmSrc) : false;
  const hasPoster = posterSrc ? assetExists(posterSrc) : false;

  if (!hasMp4) {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-graphite">
        <div className="absolute inset-3 border border-white/10" aria-hidden />
        <PlayCircle className="h-10 w-10 text-heat/60" strokeWidth={1.25} />
        <p className="font-mono text-[10px] uppercase tracking-widest text-mist/60">Screen recording pending — {label}</p>
      </div>
    );
  }

  const sources = [
    ...(hasWebm ? [{ src: webmSrc as string, type: "video/webm" }] : []),
    { src: mp4Src, type: "video/mp4" },
  ];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite">
      <VideoPlayer sources={sources} poster={hasPoster ? posterSrc : undefined} label={label} />
    </div>
  );
}
