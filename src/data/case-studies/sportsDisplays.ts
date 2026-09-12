import type { StackItem } from "@/components/case-studies/shared/ProductStack";

const base = "/assets/3d-sports-displays";

export const sportsAssets = {
  footballBuilder: { type: "image" as const, src: `${base}/football-builder.jpg`, alt: "Football display builder" },
  basketballBuilder: { type: "image" as const, src: `${base}/basketball-builder.jpg`, alt: "Basketball display builder" },
  customizationControls: { type: "image" as const, src: `${base}/customization-controls.jpg`, alt: "Customization controls" },
  modeling: { type: "image" as const, src: `${base}/modeling.jpg`, alt: "3D modeling process" },
  testing: { type: "image" as const, src: `${base}/testing.jpg`, alt: "Testing checklist" },
  physicalProduct: { type: "image" as const, src: `${base}/physical-product.jpg`, alt: "Finished physical display" },
  printing: { type: "image" as const, src: `${base}/printing.jpg`, alt: "Printing process" },
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

export const behindTheBuild = [
  { id: "modeling", title: "3D Modeling", body: "Physical product geometry translated into a web-ready 3D asset.", screen: "wireframe" as const, media: sportsAssets.modeling },
  { id: "config", title: "Configuration Logic", body: "Rules distinguishing template recolors from true custom builds.", screen: "config" as const, media: undefined },
  { id: "testing", title: "Testing", body: "Cross-device checks on rendering, pricing logic, and export accuracy.", screen: "checklist" as const, media: sportsAssets.testing },
];
