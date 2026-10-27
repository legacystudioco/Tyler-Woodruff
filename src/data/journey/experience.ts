export type ExperienceDate = { year: number; month: number };

export type ExperienceTrack = {
  id: string;
  role: string;
  org: string;
  location?: string;
  start: ExperienceDate;
  end: ExperienceDate | "present";
  items: string[];
  accent: "heat" | "signal" | "electric" | "mist";
};

export const experienceTracks: ExperienceTrack[] = [
  {
    id: "hi-vibe",
    role: "Brand Integrator",
    org: "HI-VIBE",
    location: "Remote Contract",
    start: { year: 2026, month: 8 },
    end: "present",
    items: ["Shopify Development", "Member App", "Brand Integration", "Creative Production"],
    accent: "electric",
  },
  {
    id: "independent",
    role: "Creative Technologist & Designer",
    org: "Independent / Freelance",
    start: { year: 2010, month: 2 },
    end: "present",
    items: ["Product", "Design", "Development", "Brand", "Digital Experiences"],
    accent: "signal",
  },
  {
    id: "life-change",
    role: "Creative Pastor & Event Lead",
    org: "Life Change Church",
    location: "Milford, Ohio",
    start: { year: 2023, month: 3 },
    end: { year: 2025, month: 12 },
    items: ["Creative Direction", "Video Production", "Live Production", "Teams"],
    accent: "heat",
  },
  {
    id: "true-life",
    role: "Family Life / Associate Pastor",
    org: "True Life Community Church",
    location: "Troy, Ohio",
    start: { year: 2019, month: 2 },
    end: { year: 2023, month: 2 },
    items: ["Leadership", "Teams", "Programming"],
    accent: "mist",
  },
];

// Visual range for the timeline bars below — earliest start (Independent, 2010) to today.
export const rangeStart: ExperienceDate = { year: 2010, month: 2 };
export const today: ExperienceDate = { year: 2026, month: 10 };

export function toDecimal(date: ExperienceDate) {
  return date.year + (date.month - 1) / 12;
}
