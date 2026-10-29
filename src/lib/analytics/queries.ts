import { getSql } from "./db";

export type DashboardData = Awaited<ReturnType<typeof loadDashboard>>;

export async function loadDashboard(days: number) {
  const sql = await getSql();
  if (!sql) return null;
  const since = `${days} days`;

  const [summary, daily, reach, sections, locations, pages, referrers, devices, recent] = await Promise.all([
    sql`
      SELECT count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors,
             coalesce(round(avg(active_ms)), 0)::int AS avg_ms,
             coalesce(round(avg(max_scroll)), 0)::int AS avg_scroll,
             count(DISTINCT (city, region, country)) FILTER (WHERE city IS NOT NULL)::int AS cities
      FROM visits WHERE started_at > now() - ${since}::interval`,
    sql`
      SELECT to_char(date_trunc('day', started_at AT TIME ZONE 'America/New_York'), 'YYYY-MM-DD') AS day,
             count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors
      FROM visits WHERE started_at > now() - ${since}::interval
      GROUP BY 1 ORDER BY 1`,
    sql`
      SELECT count(*)::int AS total,
             count(*) FILTER (WHERE max_scroll >= 25)::int AS p25,
             count(*) FILTER (WHERE max_scroll >= 50)::int AS p50,
             count(*) FILTER (WHERE max_scroll >= 75)::int AS p75,
             count(*) FILTER (WHERE max_scroll >= 95)::int AS p100
      FROM visits WHERE started_at > now() - ${since}::interval AND path = '/'`,
    sql`
      SELECT v.path, s.section,
             count(*)::int AS viewers,
             round(avg(s.ms))::int AS avg_ms,
             sum(s.ms)::float8 AS total_ms,
             sum(s.stops)::int AS stops,
             round(avg(s.first_ms))::int AS order_hint
      FROM section_views s JOIN visits v ON v.id = s.visit_id
      WHERE v.started_at > now() - ${since}::interval
      GROUP BY v.path, s.section
      ORDER BY v.path, order_hint`,
    sql`
      SELECT city, region, country,
             count(*)::int AS visits,
             count(DISTINCT visitor_id)::int AS visitors
      FROM visits WHERE started_at > now() - ${since}::interval
      GROUP BY city, region, country
      ORDER BY visitors DESC, visits DESC LIMIT 25`,
    sql`
      SELECT path, count(*)::int AS visits,
             round(avg(max_scroll))::int AS avg_scroll,
             round(avg(active_ms))::int AS avg_ms
      FROM visits WHERE started_at > now() - ${since}::interval
      GROUP BY path ORDER BY visits DESC LIMIT 20`,
    sql`
      SELECT coalesce(referrer, 'Direct') AS source, count(*)::int AS visits
      FROM visits WHERE started_at > now() - ${since}::interval
      GROUP BY 1 ORDER BY visits DESC LIMIT 10`,
    sql`
      SELECT device, count(*)::int AS visits
      FROM visits WHERE started_at > now() - ${since}::interval
      GROUP BY device ORDER BY visits DESC`,
    sql`
      SELECT v.id, v.path, v.city, v.region, v.country, v.device, v.referrer,
             v.max_scroll, v.active_ms, v.started_at,
             (SELECT s.section FROM section_views s WHERE s.visit_id = v.id ORDER BY s.ms DESC LIMIT 1) AS top_section
      FROM visits v WHERE v.started_at > now() - ${since}::interval
      ORDER BY v.started_at DESC LIMIT 50`,
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
  };
}
