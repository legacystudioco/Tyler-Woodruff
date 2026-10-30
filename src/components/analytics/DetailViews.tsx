import type { LocationData, VisitorData } from "@/lib/analytics/queries";
import {
  BarRow,
  Empty,
  cameFrom,
  HumanScore,
  Panel,
  duration,
  locationKey,
  pageLabel,
  place,
  plural,
  sectionLabel,
  visitorName,
  when,
  type Row,
} from "./ui";

function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="font-mono text-[11px] uppercase tracking-widest text-mist transition-colors hover:text-paper">
      ← {children}
    </a>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{label}</span>
      <span className="font-display text-2xl font-semibold tabular-nums">{children}</span>
    </div>
  );
}

export function LocationView({ data, base, query }: { data: LocationData & {}; base: string; query: string }) {
  const { location, visitors } = data;
  const name = place(location);

  return (
    <>
      <div className="flex flex-col gap-3">
        <BackLink href={`${base}?${query}`}>Overview</BackLink>
        <h2 className="font-display text-3xl font-semibold tracking-tight">{name}</h2>
        <p className="text-sm text-mist">
          {plural(visitors.length, "visitor")} from here in this range. Pick one to see their visits.
        </p>
      </div>

      <Panel title="Visitors">
        {visitors.length ? (
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="font-mono text-[10px] uppercase tracking-widest text-mist">
                <tr className="border-b border-white/10">
                  {["Visitor", "Human?", "Visits", "Last seen", "Engaged", "Deepest scroll", "Pages", "Device", "From"].map((h) => (
                    <th key={h} className="py-2 pr-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitors.map((row) => (
                  <tr key={row.visitor_id} className="border-b border-white/5 last:border-0">
                    <td className="whitespace-nowrap py-2.5 pr-4">
                      <a
                        href={`${base}?${query}&v=${row.visitor_id}`}
                        className="text-paper underline-offset-4 hover:text-signal hover:underline"
                      >
                        {visitorName(row.visitor_id)} →
                      </a>
                    </td>
                    <td className="py-2.5 pr-4">
                      <HumanScore score={row.human_score} />
                    </td>
                    <td className="py-2.5 pr-4 font-mono tabular-nums">{row.visits}</td>
                    <td className="whitespace-nowrap py-2.5 pr-4 text-mist">{when(row.last_seen)}</td>
                    <td className="py-2.5 pr-4 font-mono tabular-nums">{duration(row.total_ms)}</td>
                    <td className="py-2.5 pr-4 font-mono tabular-nums">{row.best_scroll}%</td>
                    <td className="py-2.5 pr-4 text-mist">{(row.paths as string[]).map(pageLabel).join(", ")}</td>
                    <td className="py-2.5 pr-4 text-mist">{row.device}</td>
                    <td className="py-2.5 pr-4 text-mist">{row.referrer ?? "Direct"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>No visitors from here in this range.</Empty>
        )}
      </Panel>
    </>
  );
}

function ScrollDepth({ value }: { value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-mist">
        <span>Top</span>
        <span>Scrolled {value}% of the page</span>
        <span>Bottom</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${Math.max(2, value)}%` }} />
      </div>
    </div>
  );
}

function SignalSummary({ signals }: { signals: Row | null }) {
  if (!signals) return <p className="text-xs text-mist/70">Recorded before human scoring existed.</p>;
  const parts = [
    `Mouse moves: ${signals.moves} (${signals.turns} direction changes)`,
    `Scroll wheel: ${signals.wheels}`,
    `Touches: ${signals.touches}`,
    `Clicks: ${signals.clicks}`,
    `Keys: ${signals.keys}`,
    `Window focused: ${signals.focused ? "yes" : "no"}`,
  ];
  if (signals.webdriver) parts.unshift("Browser reported it was automated");
  return <p className="font-mono text-[11px] leading-relaxed text-mist">{parts.join(" · ")}</p>;
}

export function VisitorView({ data, base, query }: { data: VisitorData & {}; base: string; query: string }) {
  const { visitorId, visits, sections } = data;
  const latest = visits[0];
  const first = visits[visits.length - 1];
  const totalMs = visits.reduce((sum, v) => sum + v.active_ms, 0);
  const deepest = Math.max(...visits.map((v) => v.max_scroll));
  const bestScore = visits.reduce<number | null>(
    (best, v) => (v.human_score === null ? best : Math.max(best ?? 0, v.human_score)),
    null,
  );
  const referrer = [...visits].reverse().map(cameFrom).find((from) => from !== "Direct") ?? "Direct";

  const sectionsByVisit = new Map<string, Row[]>();
  for (const row of sections) {
    const list = sectionsByVisit.get(row.visit_id) ?? [];
    list.push(row);
    sectionsByVisit.set(row.visit_id, list);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-5">
          <BackLink href={`${base}?${query}`}>Overview</BackLink>
          <BackLink href={`${base}?${query}&loc=${encodeURIComponent(locationKey(latest))}`}>
            Everyone from {place(latest)}
          </BackLink>
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight">{visitorName(visitorId)}</h2>
        <p className="text-sm text-mist">
          {place(latest)} · {latest.device} · first seen {when(first.started_at)}, last seen {when(latest.last_seen)}.
          Visitors are told apart by an anonymous ID saved in their browser, so the same person on another device or
          browser shows up as someone new.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Page views">{visits.length}</Stat>
        <Stat label="Total engaged">{duration(totalMs)}</Stat>
        <Stat label="Deepest scroll">{deepest}%</Stat>
        <Stat label="Came from">{referrer}</Stat>
        <Stat label="Human score">
          <HumanScore score={bestScore} />
        </Stat>
      </div>

      <div className="flex flex-col gap-4">
        {visits.map((visit) => {
          const rows = sectionsByVisit.get(visit.id) ?? [];
          const maxMs = Math.max(1, ...rows.map((r) => r.ms));
          return (
            <Panel key={visit.id} title={`${when(visit.started_at)} · ${pageLabel(visit.path)}`}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span>
                  <span className="text-mist">Engaged </span>
                  <span className="font-mono tabular-nums">{duration(visit.active_ms)}</span>
                </span>
                <span>
                  <span className="text-mist">From </span>
                  {cameFrom(visit)}
                </span>
                <span>
                  <span className="text-mist">Location </span>
                  {place(visit)}
                </span>
                <HumanScore score={visit.human_score} />
              </div>

              <ScrollDepth value={visit.max_scroll} />

              {rows.length ? (
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">
                    Sections in the order they reached them
                  </h3>
                  <ol className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {rows.map((row) => (
                      <BarRow
                        key={row.section}
                        label={sectionLabel(row.section)}
                        value={row.ms}
                        max={maxMs}
                        detail={`${duration(row.ms)} · ${plural(row.stops, "stop")} · reached at ${duration(row.first_ms)}`}
                      />
                    ))}
                  </ol>
                </div>
              ) : (
                <Empty>No section time recorded for this view.</Empty>
              )}

              <SignalSummary signals={visit.signals} />
            </Panel>
          );
        })}
      </div>
    </>
  );
}
