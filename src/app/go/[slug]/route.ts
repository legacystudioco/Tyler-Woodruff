import type { NextRequest } from "next/server";
import { getSql } from "@/lib/analytics/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/analytics/auth";
import { isDataCenterTown } from "@/lib/analytics/humanScore";
import { BOT_PATTERN, deviceFrom, geoHeader } from "@/lib/analytics/request";
import { RESUME_DOWNLOAD_SLUG, SOURCE_PATTERN, TRACKED_LINKS } from "@/lib/analytics/trackedLinks";

async function recordClick(request: NextRequest, slug: string, source: string | null) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const city = geoHeader(request, "x-vercel-ip-city");
  const region = geoHeader(request, "x-vercel-ip-country-region");
  // A click has no behaviour to score, so this only catches what identifies itself or
  // comes from a data center. The visit that follows confirms a person.
  const automated =
    !userAgent ||
    BOT_PATTERN.test(userAgent) ||
    !request.headers.get("accept-language") ||
    isDataCenterTown(city, region);

  const sql = await getSql();
  if (!sql) return;
  await sql`
    INSERT INTO link_clicks (slug, source, device, city, region, country, automated)
    VALUES (
      ${slug}, ${source}, ${deviceFrom(userAgent)}, ${city}, ${region},
      ${geoHeader(request, "x-vercel-ip-country")}, ${automated}
    )`;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = Object.hasOwn(TRACKED_LINKS, slug) ? TRACKED_LINKS[slug] : null;
  if (!link) return new Response("Not Found", { status: 404 });

  const rawSource = request.nextUrl.searchParams.get("s");
  const source = rawSource && SOURCE_PATTERN.test(rawSource) ? rawSource : null;

  const isAdmin = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (request.method === "GET" && !isAdmin) {
    // Tracking must never stop someone reaching the page.
    await recordClick(request, slug, source).catch((error) => console.error("link click not recorded", error));
  }

  const target = new URL(link.target, request.url);
  // Pages on this site learn they were reached from the resume, so the visit can confirm a person.
  if (link.target.startsWith("/") && slug !== RESUME_DOWNLOAD_SLUG) {
    target.searchParams.set("via", source ?? "resume");
  }
  return new Response(null, {
    status: 302,
    headers: { Location: target.toString(), "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
