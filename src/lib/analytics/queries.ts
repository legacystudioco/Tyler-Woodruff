import { getSql } from "./db";

// Visits scoring at or above this are treated as people in the default view.
export const HUMAN_THRESHOLD = 50;

export type DashboardData = Awaited<ReturnType<typeof loadDashboard>>;

export async function loadDashboard(days: number, humansOnly: boolean) {
  const sql = await getSql();
  if (!sql) return null;
  const since = `${days} days`;
  const min = humansOnly ? HUMAN_THRESHOLD : 0;

  const [summary, daily, reach, sections, locations, pages, referrers, devices, recent, split, resumeTotals, resumeLinks, resumeRecent] = await Promise.all([
    sql`
      SELECT count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors,
             coalesce(round(avg(active_ms)), 0)::int AS avg_ms,
             coalesce(round(avg(max_scroll)), 0)::int AS avg_scroll,
             count(DISTINCT (city, region, country)) FILTER (WHERE city IS NOT NULL)::int AS cities
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}`,
    sql`
      SELECT to_char(date_trunc('day', started_at AT TIME ZONE 'America/New_York'), 'YYYY-MM-DD') AS day,
             count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}
      GROUP BY 1 ORDER BY 1`,
    sql`
      SELECT count(*)::int AS total,
             count(*) FILTER (WHERE max_scroll >= 25)::int AS p25,
             count(*) FILTER (WHERE max_scroll >= 50)::int AS p50,
             count(*) FILTER (WHERE max_scroll >= 75)::int AS p75,
             count(*) FILTER (WHERE max_scroll >= 95)::int AS p100
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min} AND path = '/'`,
    sql`
      SELECT v.path, s.section,
             count(*)::int AS viewers,
             round(avg(s.ms))::int AS avg_ms,
             sum(s.ms)::float8 AS total_ms,
             sum(s.stops)::int AS stops,
             round(avg(s.first_ms))::int AS order_hint
      FROM section_views s JOIN visits v ON v.id = s.visit_id
      WHERE v.started_at > now() - ${since}::interval AND coalesce(v.human_score, 0) >= ${min}
      GROUP BY v.path, s.section
      ORDER BY v.path, order_hint`,
    sql`
      SELECT city, region, country,
             count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}
      GROUP BY city, region, country
      ORDER BY visitors DESC, visits DESC LIMIT 25`,
    sql`
      SELECT path, count(*)::int AS visits,
             round(avg(max_scroll))::int AS avg_scroll,
             round(avg(active_ms))::int AS avg_ms
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}
      GROUP BY path ORDER BY visits DESC LIMIT 20`,
    sql`
      SELECT CASE WHEN source IS NOT NULL THEN 'Resume PDF' ELSE coalesce(referrer, 'Direct') END AS source,
             count(*)::int AS visits
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}
      GROUP BY 1 ORDER BY visits DESC LIMIT 10`,
    sql`
      SELECT device, count(*)::int AS visits
      FROM visits WHERE started_at > now() - ${since}::interval AND coalesce(human_score, 0) >= ${min}
      GROUP BY device ORDER BY visits DESC`,
    sql`
      SELECT v.id, v.visitor_id, v.path, v.city, v.region, v.country, v.device, v.referrer,
             v.max_scroll, v.active_ms, v.started_at, v.human_score, v.source,
             (SELECT s.section FROM section_views s WHERE s.visit_id = v.id ORDER BY s.ms DESC LIMIT 1) AS top_section
      FROM visits v WHERE v.started_at > now() - ${since}::interval AND coalesce(v.human_score, 0) >= ${min}
      ORDER BY v.started_at DESC LIMIT 50`,
    sql`
      SELECT count(*) FILTER (WHERE coalesce(human_score, 0) >= ${HUMAN_THRESHOLD})::int AS humans,
             count(*) FILTER (WHERE coalesce(human_score, 0) < ${HUMAN_THRESHOLD})::int AS automated
      FROM visits WHERE started_at > now() - ${since}::interval`,
    sql`
      SELECT
        (SELECT count(*) FROM link_clicks WHERE at > now() - ${since}::interval AND slug = 'resume' AND NOT automated)::int AS downloads,
        (SELECT count(*) FROM link_clicks WHERE at > now() - ${since}::interval AND slug <> 'resume' AND NOT automated)::int AS clicks,
        (SELECT count(*) FROM link_clicks WHERE at > now() - ${since}::interval AND automated)::int AS automated,
        (SELECT count(*) FROM visits WHERE started_at > now() - ${since}::interval AND source IS NOT NULL
           AND coalesce(human_score, 0) >= ${HUMAN_THRESHOLD})::int AS confirmed`,
    sql`
      SELECT slug, count(*)::int AS clicks
      FROM link_clicks
      WHERE at > now() - ${since}::interval AND (NOT automated OR ${!humansOnly})
      GROUP BY slug ORDER BY clicks DESC`,
    sql`
      SELECT id, slug, source, device, city, region, country, automated, at
      FROM link_clicks
      WHERE at > now() - ${since}::interval AND (NOT automated OR ${!humansOnly})
      ORDER BY at DESC LIMIT 25`,
  ]);

  return {
    summary: summary[0],
    daily,
    reach: reach[0],
    sections,
    locations,
    pages,
    referrers,
    devices,
    recent,
    split: split[0],
    resumeTotals: resumeTotals[0],
    resumeLinks,
    resumeRecent,
  };
}

export type LocationData = Awaited<ReturnType<typeof loadLocation>>;
export type VisitorData = Awaited<ReturnType<typeof loadVisitor>>;

// Location filters come from "city|region|country"; empty parts match unknown (NULL) values.
export function parseLocation(value: unknown) {
  if (typeof value !== "string" || value.length > 300) return null;
  const [city = "", region = "", country = ""] = value.split("|");
  return { city: city || null, region: region || null, country: country || null };
}

export async function loadLocation(location: NonNullable<ReturnType<typeof parseLocation>>, days: number, humansOnly: boolean) {
  const sql = await getSql();
  if (!sql) return null;
  const since = `${days} days`;
  const min = humansOnly ? HUMAN_THRESHOLD : 0;

  const visitors = await sql`
    SELECT visitor_id,
           count(*)::int AS visits,
           min(started_at) AS first_seen,
           max(last_seen) AS last_seen,
           sum(active_ms)::float8 AS total_ms,
           max(max_scroll)::int AS best_scroll,
           max(human_score)::int AS human_score,
           array_agg(DISTINCT path) AS paths,
           (array_agg(device ORDER BY started_at DESC))[1] AS device,
           (array_agg(referrer ORDER BY started_at) FILTER (WHERE referrer IS NOT NULL))[1] AS referrer
    FROM visits
    WHERE started_at > now() - ${since}::interval
      AND coalesce(human_score, 0) >= ${min}
      AND city IS NOT DISTINCT FROM ${location.city}
      AND region IS NOT DISTINCT FROM ${location.region}
      AND country IS NOT DISTINCT FROM ${location.country}
    GROUP BY visitor_id
    ORDER BY max(last_seen) DESC
    LIMIT 100`;

  return { location, visitors };
}

export async function loadVisitor(visitorId: string) {
  const sql = await getSql();
  if (!sql || !/^[a-f0-9]{32}$/.test(visitorId)) return null;

  const [visits, sections] = await Promise.all([
    sql`
      SELECT id, path, referrer, source, device, city, region, country, started_at, last_seen,
             max_scroll, active_ms, human_score, signals
      FROM visits WHERE visitor_id = ${visitorId}
      ORDER BY started_at DESC LIMIT 100`,
    sql`
      SELECT s.visit_id, s.section, s.ms, s.stops, s.first_ms
      FROM section_views s JOIN visits v ON v.id = s.visit_id
      WHERE v.visitor_id = ${visitorId}
      ORDER BY s.first_ms`,
  ]);

  if (!visits.length) return null;
  return { visitorId, visits, sections };
}
