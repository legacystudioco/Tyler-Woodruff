import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

export function assetExists(relativeSrc?: string): boolean {
  if (!relativeSrc) return false;
  const cleaned = relativeSrc.replace(/^\/+/, "");
  return fs.existsSync(path.join(publicDir, cleaned));
}
