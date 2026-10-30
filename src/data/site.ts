import type { NavItem } from "@/types/content";

export const nav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Résumé", href: "/go/resume", download: true },
];

export const hero = {
  kicker: "Tyler Woodruff",
  headline: ["Creative", "Technologist."],
  body: "I design and build digital products, intelligent systems, brands, and experiences—taking ideas from concept to working reality.",
  location: "Cincinnati–Dayton, Ohio · Open to remote opportunities",
  primaryCta: { label: "Explore My Work", href: "#work" },
  secondaryCta: { label: "About Me", href: "#about" },
  status: "Available for select opportunities",
};

export const intro = {
  eyebrow: "How I work",
  statement: "I work where creativity, technology, and real-world problems meet.",
  body: "I take ideas that don't quite fit into one discipline and figure out how to make them real—from product strategy and UX to development, automation, AI, branding, and physical experiences.",
};

export const contact = {
  email: "pastor.tyler.woodruff@gmail.com",
  phone: "(513) 600-8006",
  location: "Cincinnati–Dayton, Ohio",
  preference: "Remote opportunities",
  linkedin: null as string | null,
  resumeHref: "/go/resume",
};

export const resumeAssetPath = "/Tyler_Woodruff_Resume_2026.pdf";

export const openTo = {
  roleFamilies: [
    "Creative Technologist",
    "Senior Creative Technologist",
    "Design Technologist",
    "Creative Developer",
    "Product Designer / Developer",
  ],
  interestAreas: ["AI products", "creative technology", "interactive experiences", "innovation labs", "experience design"],
};
