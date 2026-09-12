import type { MediaAsset } from "@/types/content";

const base = "/assets/process";

export type Fragment = {
  id: string;
  label: string;
  media: MediaAsset;
  top: string;
  left: string;
  width: number;
  height: number;
  rotate: number;
  z: number;
};

export const fragments: Fragment[] = [
  { id: "whiteboard", label: "Whiteboard", media: { type: "image", src: `${base}/whiteboard.jpg`, alt: "Whiteboard session" }, top: "20%", left: "14%", width: 230, height: 170, rotate: -4, z: 2 },
  { id: "conversation", label: "AI Conversation", media: { type: "image", src: `${base}/conversation.jpg`, alt: "Claude conversation" }, top: "55%", left: "8%", width: 190, height: 230, rotate: 3, z: 3 },
  { id: "architecture", label: "Architecture Sketch", media: { type: "image", src: `${base}/architecture.jpg`, alt: "Architecture diagram" }, top: "22%", left: "42%", width: 210, height: 160, rotate: 2, z: 1 },
  { id: "wireframe", label: "Early Wireframe", media: { type: "image", src: `${base}/wireframe.jpg`, alt: "Wireframe draft" }, top: "58%", left: "38%", width: 200, height: 150, rotate: -3, z: 2 },
  { id: "commits", label: "Commit History", media: { type: "image", src: `${base}/commits.jpg`, alt: "Git commit history" }, top: "22%", left: "68%", width: 220, height: 150, rotate: 3, z: 2 },
  { id: "first-pass", label: "First Pass", media: { type: "image", src: `${base}/first-pass.jpg`, alt: "Early rough iteration" }, top: "60%", left: "72%", width: 200, height: 160, rotate: -2, z: 1 },
  { id: "notebook", label: "Notebook", media: { type: "image", src: `${base}/notebook.jpg`, alt: "Handwritten notes" }, top: "84%", left: "50%", width: 180, height: 130, rotate: 4, z: 3 },
];
