import type { MediaAsset } from "@/types/content";

export const aiPortrait: MediaAsset = { type: "image", src: "/assets/ai/portrait.jpg", alt: "Tyler Woodruff" };

export type AiArea = { id: string; title: string; description: string; angle: number };

export const aiAreas: AiArea[] = [
  { id: "products", title: "AI Products", description: "LLM-powered interfaces and applications.", angle: -55 },
  { id: "workflows", title: "AI Workflows", description: "Automating repetitive operational and creative work.", angle: 35 },
  { id: "development", title: "AI-Assisted Development", description: "Moving concept → prototype → production, fast.", angle: 145 },
  { id: "generative", title: "Generative Exploration", description: "Using models to explore visual and interaction possibilities.", angle: 235 },
];
