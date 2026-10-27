import type { MediaAsset } from "@/types/content";

export type ArtifactVariant = "ui" | "stage-result" | "code" | "system" | "art" | "jersey" | "stage";

export type ArtifactDrift = {
  /** Horizontal drift in px (ambient motion, applied both directions from center). */
  x: number;
  /** Vertical drift in px (ambient motion, applied both directions from center). */
  y: number;
  /** Rotational drift in deg, added on top of the artifact's base `rotate`. */
  rot: number;
  /** Full drift-cycle duration in seconds. */
  duration: number;
};

/** Where this panel travels to when featured — a safe, comfortably-visible showcase position. */
export type ArtifactFeatured = {
  top: string;
  left: string;
  /** Multiplier on top of the artifact's default rendered scale. */
  scale: number;
};

export type HeroArtifact = {
  id: string;
  variant: ArtifactVariant;
  label: string;
  meta: string;
  media?: MediaAsset;
  width: number;
  height: number;
  top: string;
  left: string;
  rotate: number;
  depth: number;
  z: number;
  drift: ArtifactDrift;
  featured: ArtifactFeatured;
  delay: number;
  /** Section on the single-scroll homepage this panel represents — drives the revealed CTA link. */
  projectHref: string;
  /** Label for the revealed CTA, e.g. "View Project" / "Explore Work". */
  cta: string;
  anchor?: boolean;
  showOnMobile?: boolean;
  mobile?: { top: string; left: string; width: number; height: number; rotate: number; z: number };
};

// Tyler sits at z-8 and is the foreground for the entire scene — every artifact below is z 1-6,
// so nothing ever renders on top of him. Panels are flat editorial cards (rotateZ + scale only —
// no 3D perspective) layered around him via position/z-index/opacity/scale, not turned in space.
//
// When a panel is selected (see HeroSelection), it's temporarily promoted to z-9 — above Tyler,
// still below the z-10 headline — and travels to its `featured` position: a safe, comfortably
// on-screen showcase zone (roughly 60-78% viewport width, 45-60% hero height) chosen per-item so
// the whole panel stays clear of both the viewport edges and Tyler's face.
export const heroArtifacts: HeroArtifact[] = [
  {
    id: "live-experience",
    variant: "stage-result",
    label: "Live / Experience",
    meta: "Fig. 05",
    media: {
      type: "image",
      src: "/assets/hero/live-experience.WebP",
      alt: "Live stage production with green lighting, screens, and crowd",
      fit: "cover",
      position: "center",
    },
    width: 620,
    height: 413,
    top: "53%",
    left: "78%",
    rotate: -1,
    depth: 1.15,
    z: 6,
    drift: { x: 3, y: -6, rot: 0.3, duration: 11 },
    // Already the right size by default — featured only moves/straightens/brings it forward,
    // it never scales up or down (scale: 1 keeps it identical to its default rendered size).
    featured: { top: "52%", left: "78%", scale: 1 },
    delay: 0,
    projectHref: "#kingdom-conference",
    cta: "View Project",
    anchor: true,
    showOnMobile: true,
    mobile: { top: "9%", left: "32%", width: 150, height: 105, rotate: -3, z: 2 },
  },
  {
    id: "concept-to-physical",
    variant: "jersey",
    label: "Concept / Physical",
    meta: "Fig. 01",
    media: {
      type: "image",
      src: "/assets/hero/concept-to-physical.webp",
      alt: "Jersey design specification progressing into the finished physical product",
      fit: "cover",
      position: "center",
    },
    width: 340,
    height: 425,
    top: "76%",
    left: "91%",
    rotate: 6,
    depth: 0.9,
    z: 8,
    drift: { x: -5, y: 7, rot: -0.5, duration: 9 },
    featured: { top: "50%", left: "75%", scale: 1.2 },
    delay: 0.9,
    projectHref: "#3d-sports-displays",
    cta: "View Project",
    showOnMobile: true,
    mobile: { top: "78%", left: "16%", width: 110, height: 145, rotate: 6, z: 2 },
  },
  {
    id: "art-direction",
    variant: "art",
    label: "Art Direction",
    meta: "Fig. 02",
    media: {
      type: "image",
      src: "/assets/hero/art-direction.webp",
      alt: "Art direction and brand identity study",
      fit: "cover",
      position: "center",
    },
    width: 300,
    height: 375,
    top: "26%",
    left: "89%",
    rotate: 4,
    depth: 0.6,
    z: 4,
    drift: { x: 4, y: -5, rot: 0.4, duration: 13 },
    featured: { top: "48%", left: "76%", scale: 1.3 },
    delay: 0.3,
    projectHref: "#hi-vibe",
    cta: "Explore Work",
  },
  {
    id: "sports-product",
    variant: "jersey",
    label: "Sports / Product",
    meta: "Fig. 04",
    media: {
      type: "image",
      src: "/assets/hero/sports-jersey.webp",
      alt: "Finished 3D sports jersey product render",
      fit: "cover",
      position: "center",
    },
    width: 340,
    height: 276,
    top: "21%",
    left: "69%",
    rotate: 3,
    depth: 0.55,
    z: 3,
    drift: { x: -3, y: 6, rot: -0.35, duration: 8 },
    featured: { top: "52%", left: "76%", scale: 1.65 },
    delay: 0.6,
    projectHref: "#3d-sports-displays",
    cta: "View Project",
  },
  {
    id: "system-process",
    variant: "system",
    label: "System / Process",
    meta: "Fig. 07",
    media: { type: "image", src: "/assets/hero/system-process.jpg", alt: "System and process diagram" },
    width: 95,
    height: 95,
    top: "7%",
    left: "86%",
    rotate: 0,
    depth: 0.22,
    z: 1,
    drift: { x: 2, y: -4, rot: 0.25, duration: 14 },
    featured: { top: "48%", left: "63%", scale: 4.4 },
    delay: 1.6,
    projectHref: "#ministry-linker",
    cta: "Explore Work",
  },
  {
    id: "hi-vibe-brand",
    variant: "ui",
    label: "Brand / Storefront",
    meta: "Fig. 06",
    media: {
      type: "image",
      src: "/assets/hi-vibe/storefront-home.jpg",
      alt: "HI-VIBE Shopify storefront hero",
      fit: "cover",
      position: "center",
    },
    width: 190,
    height: 130,
    top: "82%",
    left: "36%",
    rotate: -2,
    depth: 0.28,
    z: 1,
    drift: { x: 6, y: 5, rot: -0.6, duration: 7.5 },
    featured: { top: "58%", left: "62%", scale: 2.6 },
    delay: 1.1,
    projectHref: "#hi-vibe",
    cta: "Explore Work",
  },
  {
    id: "product-ui",
    variant: "ui",
    label: "Product / UI",
    meta: "Fig. 03",
    media: {
      type: "image",
      src: "/assets/hero/product-ui.webp",
      alt: "Real product interface — Ministry Linker platform",
      fit: "cover",
      position: "center",
    },
    width: 350,
    height: 188,
    top: "79%",
    left: "75%",
    rotate: 2,
    depth: 0.5,
    z: 7,
    drift: { x: -4, y: -7, rot: 0.5, duration: 10.5 },
    featured: { top: "48%", left: "76%", scale: 1.6 },
    delay: 1.4,
    projectHref: "#elite-home-sources",
    cta: "View Project",
  },
];
