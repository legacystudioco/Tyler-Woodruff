import type { StackItem } from "@/components/case-studies/shared/ProductStack";

const base = "/assets/3d-sports-displays";

export const sportsAssets = {
  footballBuilder: { type: "image" as const, src: `${base}/football-builder.jpg`, alt: "Football display builder" },
  basketballBuilder: { type: "image" as const, src: `${base}/basketball-builder.jpg`, alt: "Basketball display builder" },
  customizationControls: { type: "image" as const, src: `${base}/customization-controls.jpg`, alt: "Customization controls" },
  modelingConcept: { type: "image" as const, src: `${base}/modeling-concept.jpg`, alt: "3D concept render of a custom Buckeyes jersey display, before printing" },
  raidersBust: { type: "image" as const, src: `${base}/raiders-bust.jpg`, alt: "Finished Las Vegas Raiders jersey display, 3D-printed" },
  bearsTriple: { type: "image" as const, src: `${base}/bears-triple.jpg`, alt: "Finished Chicago Bears three-jersey display, 3D-printed" },
  buckeyesCompleted: { type: "image" as const, src: `${base}/buckeyes-completed.jpg`, alt: "Finished custom Ohio State Buckeyes jersey display, 3D-printed" },
};

export const video = {
  mp4: `${base}/3d-builder-demo.mp4`,
  webm: `${base}/3d-builder-demo.webm`,
  poster: `${base}/3d-builder-poster.jpg`,
};

export const stackItems: StackItem[] = [
  { id: "football", chrome: "browser", screen: "config", label: "Football Builder", media: sportsAssets.footballBuilder, accent: "heat", top: "26%", left: "24%", width: 320, height: 210, rotate: -3, z: 3 },
  { id: "basketball", chrome: "browser", screen: "config", label: "Basketball Builder", media: sportsAssets.basketballBuilder, accent: "electric", top: "64%", left: "62%", width: 300, height: 200, rotate: 3, z: 2 },
  { id: "controls", chrome: "panel", screen: "config", label: "Customization Controls", media: sportsAssets.customizationControls, accent: "heat", top: "20%", left: "72%", width: 220, height: 160, rotate: 2, z: 4 },
  { id: "mobile", chrome: "mobile", screen: "config", label: "Mobile Preview", accent: "signal", top: "78%", left: "18%", width: 140, height: 210, rotate: -4, z: 5 },
];

export const physicalResults = [
  { id: "modeling", label: "3D Concept Render", media: sportsAssets.modelingConcept },
  { id: "buckeyes", label: "Custom Buckeyes Display", media: sportsAssets.buckeyesCompleted },
  { id: "raiders", label: "Raiders Jersey Display", media: sportsAssets.raidersBust },
  { id: "bears", label: "Bears Three-Jersey Display", media: sportsAssets.bearsTriple },
];
