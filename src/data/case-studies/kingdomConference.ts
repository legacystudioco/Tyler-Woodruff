import type { MediaAsset } from "@/types/content";

const base = "/assets/kingdom-conference";

export const kingdomAssets = {
  stageWide: { type: "image" as const, src: `${base}/stage-wide.jpg`, alt: "Worship set with screen content and the crowd, hands raised" },
  behindScenes: { type: "image" as const, src: `${base}/behind-the-scenes.jpg`, alt: "Staff team behind the scenes at the conference" },
  environment: { type: "image" as const, src: `${base}/room-environment.jpg`, alt: "Wide room shot with stage lighting during a response time" },
};

export const identityAssets = {
  identityMark: { type: "image" as const, src: `${base}/identity-mark.jpg`, alt: "Kingdom identity mark" },
  poster2025: { type: "image" as const, src: `${base}/poster-2025.jpg`, alt: "Kingdom/25 conference poster, November 21–22, 2025" },
  poster2024: { type: "image" as const, src: `${base}/poster-2024.jpg`, alt: "Kingdom conference poster, November 22–23, 2024" },
  posterCamp: { type: "image" as const, src: `${base}/poster-camp.jpg`, alt: "Kingdom Camp promotional design" },
  merchDesign: { type: "image" as const, src: `${base}/merch-design.jpg`, alt: "Kingdom event hockey-jersey merch design spec sheet" },
  shoeDesign: { type: "image" as const, src: `${base}/shoe-design.jpg`, alt: "Custom Kingdom-branded sneakers, designed in-house and produced" },
};

export const identityMaterials = [
  { id: "identity-mark", label: "Identity Mark", media: identityAssets.identityMark, ratio: 2000 / 1118, rotate: -2 },
  { id: "poster-2025", label: "Kingdom/25 — Nov 21–22, 2025", media: identityAssets.poster2025, ratio: 1800 / 790, rotate: 1.5 },
  { id: "poster-2024", label: "Kingdom — Nov 22–23, 2024", media: identityAssets.poster2024, ratio: 1, rotate: -1 },
  { id: "poster-camp", label: "Kingdom Camp Promo", media: identityAssets.posterCamp, ratio: 1800 / 1012, rotate: 2 },
  { id: "merch-design", label: "Event Merch Design Spec", media: identityAssets.merchDesign, ratio: 2000 / 1545, rotate: -1.5 },
  { id: "shoe-design", label: "Custom Shoe Design", media: identityAssets.shoeDesign, ratio: 1500 / 2000, rotate: 1 },
];

export const highlightVideo: MediaAsset = {
  type: "video",
  src: `${base}/highlight-reel.mp4`,
  poster: `${base}/highlight-reel-poster.jpg`,
  alt: "Kingdom Conference highlight and overview video",
};

export const collideCampVideo: MediaAsset = {
  type: "video",
  src: `${base}/collide-camp.mp4`,
  poster: `${base}/collide-camp-poster.jpg`,
  alt: "Kingdom Collide Camp highlight video",
};

export const processSteps = [
  { label: "Concept", icon: "lightbulb" as const },
  { label: "Identity", icon: "palette" as const },
  { label: "Video", icon: "film" as const },
  { label: "Technical Production", icon: "settings" as const },
  { label: "Stage & Lighting", icon: "map" as const },
  { label: "Audience Experience", icon: "users" as const },
];

export const moments = [
  { id: "stage-wide", media: kingdomAssets.stageWide, label: "Worship & Screen Content", top: "26%", left: "26%", width: 540, height: 360, rotate: -2, z: 2 },
  { id: "environment", media: kingdomAssets.environment, label: "Room — Response Time", top: "72%", left: "22%", width: 500, height: 340, rotate: 2, z: 3 },
  { id: "behind-scenes", media: kingdomAssets.behindScenes, label: "Staff Team", top: "44%", left: "76%", width: 380, height: 507, rotate: -1, z: 1 },
];
