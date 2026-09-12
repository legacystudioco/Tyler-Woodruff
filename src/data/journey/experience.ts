export type ExperienceTrack = {
  id: string;
  start: number;
  role: string;
  org: string;
  items: string[];
  accent: "heat" | "signal";
};

export const experienceTracks: ExperienceTrack[] = [
  {
    id: "life-change",
    start: 2023,
    role: "Creative Pastor / Creative Director",
    org: "Life Change Church",
    items: ["Creative direction", "Production", "Teams", "Digital", "Events"],
    accent: "heat",
  },
  {
    id: "independent",
    start: 2010,
    role: "Independent Creative Technologist",
    org: "Self-directed practice",
    items: ["Product", "Design", "Development", "Brand", "Digital experiences"],
    accent: "signal",
  },
];

export const currentYear = 2026;
