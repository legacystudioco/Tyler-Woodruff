import type { NextRequest } from "next/server";

export const BOT_PATTERN = /bot|crawl|spider|slurp|preview|headless|lighthouse|vercel-screenshot|facebookexternalhit|embedly/i;

export function deviceFrom(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobi|iphone|android/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export function geoHeader(request: NextRequest, name: string) {
  const value = request.headers.get(name);
  if (!value) return null;
  try {
    return decodeURIComponent(value).slice(0, 80);
  } catch {
    return value.slice(0, 80);
  }
}
