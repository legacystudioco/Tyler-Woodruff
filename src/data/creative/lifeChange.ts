const base = "/assets/life-change";

export const lifeChangeAssets = {
  heroStage: { type: "image" as const, src: `${base}/hero-stage.jpg`, alt: "Life Change Church main stage" },
  stageWide: { type: "image" as const, src: `${base}/stage-wide.jpg`, alt: "Wide stage environment" },
  stageDetail: { type: "image" as const, src: `${base}/stage-detail.jpg`, alt: "Stage detail" },
  speaker: { type: "image" as const, src: `${base}/speaker.jpg`, alt: "Speaker on stage" },
  production: { type: "image" as const, src: `${base}/production.jpg`, alt: "Production booth" },
  behindScenes: { type: "image" as const, src: `${base}/behind-scenes.jpg`, alt: "Behind the scenes" },
  badge: { type: "image" as const, src: `${base}/badge.jpg`, alt: "Event identity badge" },
  environment: { type: "image" as const, src: `${base}/environment.jpg`, alt: "Environmental graphics" },
  screenContent: { type: "image" as const, src: `${base}/screen-content.jpg`, alt: "Screen content design" },
  lighting: { type: "image" as const, src: `${base}/lighting.jpg`, alt: "Lighting design" },
  designConcept: { type: "image" as const, src: `${base}/design-concept.jpg`, alt: "Early design concept" },
  build: { type: "image" as const, src: `${base}/build.jpg`, alt: "Physical build and setup" },
  liveResult: { type: "image" as const, src: `${base}/live-result.jpg`, alt: "Live result" },
};

export const processSteps = [
  { label: "Concept", icon: "lightbulb" as const },
  { label: "Visual Direction", icon: "palette" as const },
  { label: "Content", icon: "film" as const },
  { label: "Technical Production", icon: "settings" as const },
  { label: "Environment", icon: "map" as const },
  { label: "Audience Experience", icon: "users" as const },
];

export const moments = [
  { id: "stage-wide", media: lifeChangeAssets.stageWide, label: "Stage", top: "24%", left: "18%", width: 320, height: 220, rotate: -2, z: 2 },
  { id: "speaker", media: lifeChangeAssets.speaker, label: "Speaker", top: "46%", left: "6%", width: 200, height: 280, rotate: 2, z: 3 },
  { id: "behind-scenes", media: lifeChangeAssets.behindScenes, label: "Behind the Scenes", top: "72%", left: "30%", width: 240, height: 180, rotate: -3, z: 2 },
  { id: "badge", media: lifeChangeAssets.badge, label: "Identity", top: "20%", left: "56%", width: 150, height: 150, rotate: 4, z: 4 },
  { id: "screen-content", media: lifeChangeAssets.screenContent, label: "Screen Content", top: "50%", left: "62%", width: 280, height: 190, rotate: 2, z: 1 },
  { id: "lighting", media: lifeChangeAssets.lighting, label: "Lighting", top: "74%", left: "82%", width: 190, height: 240, rotate: -4, z: 3 },
  { id: "environment", media: lifeChangeAssets.environment, label: "Environment", top: "24%", left: "90%", width: 170, height: 220, rotate: 3, z: 2 },
];

export const behindTheExperience = [
  { id: "design-concept", label: "Design Concept", media: lifeChangeAssets.designConcept },
  { id: "content", label: "Content Development", media: lifeChangeAssets.screenContent },
  { id: "build", label: "Physical Build", media: lifeChangeAssets.build },
  { id: "live-result", label: "Live Result", media: lifeChangeAssets.liveResult },
];
