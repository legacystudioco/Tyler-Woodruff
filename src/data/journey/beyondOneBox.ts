import type { MediaAsset } from "@/types/content";

export const beyondOneBoxAssets = {
  workstation: { type: "image" as const, src: "/assets/about/workstation.jpg", alt: "Tyler at his workstation" } satisfies MediaAsset,
};
