import type { MediaAsset } from "@/types/content";

export type LabVisual =
  | { kind: "media"; media: MediaAsset }
  | { kind: "generated"; variant: "nodes" | "cube" | "flow" | "grid" | "type" | "cursor" }
  | { kind: "concept" };

export type LabSize = "large" | "medium" | "tall" | "small";

export type LabItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  visual: LabVisual;
  size: LabSize;
  accent: "signal" | "heat" | "electric";
  glass?: boolean;
};

export const labItems: LabItem[] = [
  {
    id: "ai-workflow",
    title: "AI Workflow Lab",
    category: "AI / LLM Workflows",
    description: "Prompt chains, agents, and tool-use patterns tested against real workflows.",
    visual: { kind: "generated", variant: "nodes" },
    size: "large",
    accent: "electric",
  },
  {
    id: "3d-explorations",
    title: "3D Explorations",
    category: "3D",
    description: "Form studies for physical products and web-native 3D.",
    visual: { kind: "generated", variant: "cube" },
    size: "tall",
    accent: "signal",
    glass: true,
  },
  {
    id: "automation-playground",
    title: "Automation Playground",
    category: "Automation",
    description: "Small systems that move data and decisions without a human in the loop.",
    visual: { kind: "generated", variant: "flow" },
    size: "medium",
    accent: "electric",
  },
  {
    id: "generative-visuals",
    title: "Generative Visuals",
    category: "Generative Design",
    description: "Rule-based compositions that produce their own variation.",
    visual: { kind: "generated", variant: "grid" },
    size: "medium",
    accent: "signal",
  },
  {
    id: "creative-coding",
    title: "Creative Coding",
    category: "Creative Coding",
    description: "Type, motion, and geometry built directly in code.",
    visual: { kind: "generated", variant: "type" },
    size: "medium",
    accent: "heat",
  },
  {
    id: "micro-apps",
    title: "Micro Apps",
    category: "Micro Apps",
    description: "Single-purpose tools built fast, used once or kept forever.",
    visual: { kind: "concept" },
    size: "small",
    accent: "signal",
  },
  {
    id: "unreleased-concepts",
    title: "Unreleased Concepts",
    category: "Concepts",
    description: "Ideas still taking shape, not ready to name yet.",
    visual: { kind: "concept" },
    size: "small",
    accent: "heat",
  },
  {
    id: "alternate-interfaces",
    title: "Alternate Interfaces",
    category: "Interfaces",
    description: "Interaction models that skip the familiar screen-and-button default.",
    visual: { kind: "generated", variant: "cursor" },
    size: "tall",
    accent: "electric",
    glass: true,
  },
];
