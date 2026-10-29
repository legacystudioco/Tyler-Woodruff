import type { NextRequest } from "next/server";
import { getSql } from "@/lib/analytics/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/analytics/auth";
import { humanScore, isDataCenterTown, parseSignals } from "@/lib/analytics/humanScore";

const ID_PATTERN = /^[a-f0-9]{32}$/;
const BOT_PATTERN = /bot|crawl|spider|slurp|preview|headless|lighthouse|vercel-screenshot|facebookexternalhit|embedly/i;
const MAX_MS = 6 * 60 * 60 * 1000;

type SectionTuple = [string, number, number, number];

const clampInt = (value: unknown, max: number) =>
  Math.max(0, Math.min(max, Math.round(Number(value) || 0)));

function deviceFrom(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobi|iphone|android/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function referrerHost(referrer: unknown, ownHost: string | null) {
  if (typeof referrer !== "string" || !referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host && host !== ownHost?.replace(/^www\./, "") ? host.slice(0, 120) : null;
  } catch {
    return null;
  }
}

function geoHeader(request: NextRequest, name: string) {
  const value = request.headers.get(name);
  if (!value) return null;
  try {
    return decodeURIComponent(value).slice(0, 80);
  } catch {
    return value.slice(0, 80);
  }
}

const noContent = () => new Response(null, { status: 204 });

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  // Skip crawlers and the admin's own browsing.
  if (BOT_PATTERN.test(userAgent) || verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return noContent();
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return noContent();
  }

  const visitId = String(body.visit ?? "");
  const visitorId = String(body.visitor ?? "");
  const path = typeof body.path === "string" ? body.path.slice(0, 200) : "";
  if (!ID_PATTERN.test(visitId) || !ID_PATTERN.test(visitorId) || !path.startsWith("/")) {
    return noContent();
  }

  const sql = await getSql();
  if (!sql) return noContent();

  const maxScroll = clampInt(body.maxScroll, 100);
  const activeMs = clampInt(body.activeMs, MAX_MS);
  const city = geoHeader(request, "x-vercel-ip-city");
  const region = geoHeader(request, "x-vercel-ip-country-region");
  const signals = parseSignals(body.signals);
  const score = humanScore(signals, userAgent, isDataCenterTown(city, region));

  await sql`
    INSERT INTO visits (id, visitor_id, path, referrer, device, city, region, country, max_scroll, active_ms, human_score, signals)
    VALUES (
      ${visitId}, ${visitorId}, ${path},
      ${referrerHost(body.referrer, request.headers.get("host"))},
      ${deviceFrom(userAgent)},
      ${city},
      ${region},
      ${geoHeader(request, "x-vercel-ip-country")},
      ${maxScroll}, ${activeMs}, ${score}, ${signals ? JSON.stringify(signals) : null}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      last_seen = now(),
      max_scroll = GREATEST(visits.max_scroll, EXCLUDED.max_scroll),
      active_ms = GREATEST(visits.active_ms, EXCLUDED.active_ms),
      human_score = GREATEST(visits.human_score, EXCLUDED.human_score),
      signals = coalesce(EXCLUDED.signals, visits.signals)
    WHERE visits.visitor_id = EXCLUDED.visitor_id`;

  const sections = (Array.isArray(body.sections) ? body.sections : [])
    .filter((entry): entry is SectionTuple => Array.isArray(entry) && typeof entry[0] === "string")
    .slice(0, 80);

  if (sections.length) {
    const names = sections.map(([name]) => name.slice(0, 120));
    const ms = sections.map(([, value]) => clampInt(value, MAX_MS));
    const stops = sections.map(([, , value]) => clampInt(value, 10_000));
    const firstMs = sections.map(([, , , value]) => clampInt(value, MAX_MS));

    await sql`
      INSERT INTO section_views (visit_id, section, ms, stops, first_ms)
      SELECT ${visitId}, name, ms, stops, first_ms
      FROM unnest(${names}::text[], ${ms}::int[], ${stops}::int[], ${firstMs}::int[]) AS t(name, ms, stops, first_ms)
      WHERE EXISTS (SELECT 1 FROM visits WHERE id = ${visitId} AND visitor_id = ${visitorId})
      ON CONFLICT (visit_id, section) DO UPDATE SET
        ms = GREATEST(section_views.ms, EXCLUDED.ms),
        stops = GREATEST(section_views.stops, EXCLUDED.stops),
        first_ms = LEAST(section_views.first_ms, EXCLUDED.first_ms)`;
  }

  return noContent();
}
