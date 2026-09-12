import type { NavItem } from "@/types/content";

export const nav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#im-tyler" },
  { label: "Lab", href: "#lab" },
  { label: "Résumé", href: "/resume" },
];

export const hero = {
  kicker: "Tyler Woodruff",
  headline: ["Creative", "Technologist."],
  body: "I design and build digital products, intelligent systems, brands, and experiences—taking ideas from concept to working reality.",
  location: "Based in Ohio · Working everywhere",
  primaryCta: { label: "Explore My Work", href: "#work" },
  secondaryCta: { label: "About Me", href: "#im-tyler" },
  status: "Available for select opportunities",
};

export const intro = {
  eyebrow: "How I work",
  statement: "I work where creativity, technology, and real-world problems meet.",
  body: "I take ideas that don't quite fit into one discipline and figure out how to make them real—from product strategy and UX to development, automation, AI, branding, and physical experiences.",
};

export const contact = {
  email: "pastor.tyler.woodruff@gmail.com",
  linkedin: null as string | null,
  resumeHref: "/resume",
};
