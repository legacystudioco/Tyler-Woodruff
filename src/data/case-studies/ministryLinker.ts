import type { StackItem } from "@/components/case-studies/shared/ProductStack";
import type { FlowStep } from "@/components/case-studies/shared/SystemFlow";

const base = "/assets/ministry-linker";

export const ministryAssets = {
  home: { type: "image" as const, src: `${base}/home.jpg`, alt: "Ministry Linker home" },
  discovery: { type: "image" as const, src: `${base}/discovery.jpg`, alt: "Discovery search" },
  profile: { type: "image" as const, src: `${base}/profile.jpg`, alt: "Person profile" },
  church: { type: "image" as const, src: `${base}/church.jpg`, alt: "Church profile" },
  listing: { type: "image" as const, src: `${base}/listing.jpg`, alt: "Listing browse" },
  dashboard: { type: "image" as const, src: `${base}/dashboard.jpg`, alt: "Dashboard" },
  detail: { type: "image" as const, src: `${base}/detail.jpg`, alt: "Detail view" },
};

export const stackItems: StackItem[] = [
  { id: "home", chrome: "browser", screen: "site", label: "Home", media: ministryAssets.home, accent: "electric", top: "22%", left: "22%", width: 300, height: 190, rotate: -2, z: 2 },
  { id: "discovery", chrome: "browser", screen: "cards", label: "Discovery", media: ministryAssets.discovery, accent: "signal", top: "60%", left: "16%", width: 240, height: 190, rotate: 3, z: 3 },
  { id: "profile", chrome: "browser", screen: "profile", label: "Profile", media: ministryAssets.profile, accent: "heat", top: "26%", left: "62%", width: 220, height: 200, rotate: 2, z: 4 },
  { id: "church", chrome: "browser", screen: "profile", label: "Church", media: ministryAssets.church, accent: "signal", top: "70%", left: "70%", width: 240, height: 180, rotate: -3, z: 3 },
  { id: "dashboard", chrome: "browser", screen: "dashboard", label: "Dashboard", media: ministryAssets.dashboard, accent: "electric", top: "14%", left: "86%", width: 220, height: 160, rotate: 2, z: 1 },
];

export const productStory: FlowStep[] = [
  { label: "Problem / Opportunity" },
  { label: "User Journey" },
  { label: "Interaction Model" },
  { label: "Interface" },
  { label: "Working Platform" },
  { label: "Technical Architecture" },
];
