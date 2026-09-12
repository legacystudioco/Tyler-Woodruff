import type { MediaAsset } from "@/types/content";

const base = "/assets/visual-work";

export type GalleryCategory =
  | "identity"
  | "poster"
  | "campaign"
  | "stage"
  | "social"
  | "typography"
  | "photography"
  | "apparel"
  | "environment"
  | "experimental";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  label: string;
  media: MediaAsset;
  colSpan: string;
  aspect: string;
  overlap?: string;
};

function asset(file: string, alt: string): MediaAsset {
  return { type: "image", src: `${base}/${file}.jpg`, alt };
}

export const galleryItems: GalleryItem[] = [
  { id: "identity-01", category: "identity", label: "Identity Study", media: asset("identity-01", "Identity study"), colSpan: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { id: "poster-01", category: "poster", label: "Poster Series", media: asset("poster-01", "Poster series"), colSpan: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { id: "stage-01", category: "stage", label: "Stage Design", media: asset("stage-01", "Stage design"), colSpan: "lg:col-span-4", aspect: "aspect-[4/3]" },
  { id: "typography-01", category: "typography", label: "Type Study", media: asset("typography-01", "Type study"), colSpan: "lg:col-span-2", aspect: "aspect-square", overlap: "lg:-mt-16 lg:ml-4" },
  { id: "social-01", category: "social", label: "Social Campaign", media: asset("social-01", "Social campaign"), colSpan: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { id: "campaign-01", category: "campaign", label: "Campaign Direction", media: asset("campaign-01", "Campaign direction"), colSpan: "lg:col-span-4", aspect: "aspect-[3/4]" },
  { id: "photography-01", category: "photography", label: "Photography", media: asset("photography-01", "Photography"), colSpan: "lg:col-span-6", aspect: "aspect-[16/9]" },
  { id: "apparel-01", category: "apparel", label: "Apparel", media: asset("apparel-01", "Apparel"), colSpan: "lg:col-span-3", aspect: "aspect-[4/5]" },
  { id: "environment-01", category: "environment", label: "Environmental Graphics", media: asset("environment-01", "Environmental graphics"), colSpan: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { id: "experimental-01", category: "experimental", label: "Experimental", media: asset("experimental-01", "Experimental graphics"), colSpan: "lg:col-span-4", aspect: "aspect-square", overlap: "lg:-mt-10" },
  { id: "identity-02", category: "identity", label: "Mark Exploration", media: asset("identity-02", "Mark exploration"), colSpan: "lg:col-span-2", aspect: "aspect-square" },
  { id: "stage-02", category: "stage", label: "Environment Detail", media: asset("stage-02", "Environment detail"), colSpan: "lg:col-span-4", aspect: "aspect-[4/5]" },
];
