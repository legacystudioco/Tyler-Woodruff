import type { MediaAsset } from "@/types/content";

export type CapabilityGroup = {
  id: string;
  title: string;
  items: string[];
  image: MediaAsset;
};

const base = "/assets/workspace";

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "product",
    title: "Product",
    items: ["Product strategy", "UX architecture", "User journeys", "Prototyping", "Systems thinking", "Business logic"],
    image: { type: "image", src: `${base}/product.jpg`, alt: "Product strategy work" },
  },
  {
    id: "creative",
    title: "Creative",
    items: ["Creative direction", "Brand identity", "Visual design", "Storytelling", "Content systems", "Experience design"],
    image: { type: "image", src: `${base}/creative.jpg`, alt: "Creative direction work" },
  },
  {
    id: "technology",
    title: "Technology",
    items: ["Web development", "iOS development", "AI integration", "Automation", "APIs", "Databases", "Cloud deployment"],
    image: { type: "image", src: `${base}/technology.jpg`, alt: "Technology work" },
  },
  {
    id: "experience",
    title: "Experience",
    items: ["Interactive experiences", "Live production", "AV systems", "Lighting", "Stage environments", "Physical/digital integration"],
    image: { type: "image", src: `${base}/experience.jpg`, alt: "Live experience production" },
  },
];

export const tools = [
  "Illustrator",
  "Photoshop",
  "Premiere Pro",
  "After Effects",
  "Lightroom",
  "Xcode",
  "Swift",
  "SwiftUI",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Supabase",
  "GitHub",
  "Vercel",
  "Claude",
  "ChatGPT",
];
