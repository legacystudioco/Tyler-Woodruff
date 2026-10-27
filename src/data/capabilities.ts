import type { Capability } from "@/types/content";

export const capabilities: Capability[] = [
  {
    id: "think",
    title: "Think.",
    tagline: "Understand the need, identify the opportunity, and define what should exist.",
    items: [
      "Product strategy",
      "Systems architecture",
      "Research",
      "User journeys",
      "Business logic",
      "Creative direction",
    ],
  },
  {
    id: "design",
    title: "Design.",
    tagline: "Shape the user experience, visual direction, interactions, and workflow.",
    items: [
      "UX/UI",
      "Brand systems",
      "Visual storytelling",
      "Interaction design",
      "Content",
      "Experience design",
    ],
  },
  {
    id: "build",
    title: "Build.",
    tagline: "Implement, connect, test, and refine the working experience.",
    items: [
      "Web applications",
      "iOS applications",
      "AI systems",
      "Automations",
      "Integrations",
      "Interactive experiences",
    ],
  },
];
