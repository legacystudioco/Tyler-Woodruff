export type Theme = "ink" | "paper";

export type NavItem = {
  label: string;
  href: string;
  download?: boolean;
};

export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
};

export type ProjectLayout = "large" | "wide" | "tall" | "standard" | "feature";

export type Project = {
  id: string;
  number: string;
  title: string;
  disciplines: string[];
  description: string;
  href: string;
  layout: ProjectLayout;
  media?: MediaAsset;
  accent?: "signal" | "heat" | "electric";
};

export type Capability = {
  id: string;
  title: string;
  tagline: string;
  items: string[];
};
