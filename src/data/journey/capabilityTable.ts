export type CapabilityGroup = {
  id: string;
  title: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "development",
    title: "Development & Deployment",
    items: ["HTML", "CSS", "JavaScript", "Liquid", "Next.js", "Electron", "Swift", "SwiftUI", "UIKit", "GitHub", "Vercel", "VS Code"],
  },
  {
    id: "commerce",
    title: "Commerce & Customer Systems",
    items: ["Shopify", "Klaviyo", "Stripe"],
  },
  {
    id: "data",
    title: "Data & Backend",
    items: ["Supabase", "Firebase"],
  },
  {
    id: "creative",
    title: "Creative & Fabrication",
    items: ["Illustrator", "Photoshop", "Premiere Pro", "Blender", "3D Modeling", "3D Printing", "Video Production", "Visual Identity Design"],
  },
  {
    id: "live",
    title: "Live Production",
    items: ["ProPresenter", "Lightkey", "Live Sound Mixing", "MIDI Programming", "Lighting Design", "Stage & Screen Production"],
  },
  {
    id: "core",
    title: "Core Capabilities",
    items: ["Product Strategy", "UX/UI", "Prototyping", "Workflow Automation", "AI-Assisted Development", "Creative Direction"],
  },
];
