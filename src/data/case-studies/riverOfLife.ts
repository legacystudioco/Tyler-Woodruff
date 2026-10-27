import type { FlowStep } from "@/components/case-studies/shared/SystemFlow";

const base = "/assets/river-of-life";

export const riverAssets = {
  timingReview: { type: "image" as const, src: `${base}/timing-review.jpg`, alt: "Lyric timing and review screen" },
  mediaLibrary: { type: "image" as const, src: `${base}/media-library.jpg`, alt: "Media library management screen" },
  exportScreen: { type: "image" as const, src: `${base}/export-screen.jpg`, alt: "Video export screen" },
};

export const pipeline: FlowStep[] = [
  { label: "Import Song" },
  { label: "Review Timing" },
  { label: "Process Audio" },
  { label: "Prepare Visual Output" },
  { label: "Export Video" },
];

export const screens = [
  { id: "timing", title: "Lyric Timing & Review", body: "Line-by-line timing against the audio track, reviewed and adjusted before export.", media: riverAssets.timingReview, ratio: 2000 / 1315 },
  { id: "library", title: "Media Library", body: "Local-first management of songs, backgrounds, and prior exports.", media: riverAssets.mediaLibrary, ratio: 2000 / 1316 },
  { id: "export", title: "Video Export", body: "Packaging the timed lyrics and visual output into a finished video file.", media: riverAssets.exportScreen, ratio: 16 / 10 },
];
