import { cn } from "@/lib/utils";
import { HUMAN_THRESHOLD, type DashboardData } from "@/lib/analytics/queries";

type Props = {
  base: string;
  days: number;
  ranges: number[];
  humansOnly: boolean;
  data: DashboardData | null;
};

type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const number = new Intl.NumberFormat("en-US");

function duration(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function plural(count: number, word: string) {
  return `${number.format(count)} ${word}${count === 1 ? "" : "s"}`;
}

function percent(part: number, total: number) {
  return total ? Math.round((part / total) * 100) : 0;
}

function place(row: Row) {
  if (!row.city && !row.region) return row.country ?? "Unknown";
  const area = row.country && row.country !== "US" ? row.country : row.region;
  return [row.city, area].filter(Boolean).join(", ");
}

function sectionLabel(section: string) {
  return section
    .split("/")
    .map((part) => part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");
}

function pageLabel(path: string) {
  if (path === "/") return "Home";
  return path.replace(/^\/work\//, "Work · ").replace(/^\//, "");
}

function rangeLabel(days: number) {
  return days === 1 ? "24 hours" : `${days} days`;
}

function fillDays(rows: Row[], days: number) {
  const byDay = new Map(rows.map((row) => [row.day as string, row]));
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" });
  const result: { day: string; visits: number; visitors: number }[] = [];
  for (let i = Math.max(days, 1) - 1; i >= 0; i--) {
    const day = formatter.format(new Date(Date.now() - i * 86_400_000));
    const row = byDay.get(day);
    result.push({ day, visits: row?.visits ?? 0, visitors: row?.visitors ?? 0 });
  }
  return result;
}

function HumanScore({ score }: { score: number | null }) {
  if (score === null) {
    return <span className="text-mist/60">Not scored</span>;
  }
  const label = score >= 70 ? "Human" : score >= HUMAN_THRESHOLD ? "Likely human" : score >= 25 ? "Unsure" : "Bot";
  const tone =
    score >= 70
      ? "border-signal/40 text-signal"
      : score >= HUMAN_THRESHOLD
        ? "border-paper/30 text-paper"
        : score >= 25
          ? "border-[#ffb347]/40 text-[#ffb347]"
          : "border-[#ff8a7a]/40 text-[#ff8a7a]";
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[11px]", tone)}>
      {score}% · {label}
    </span>
  );
}

function Toggle({ options }: { options: { label: string; href: string; active: boolean }[] }) {
  return (
    <nav className="flex rounded-full border border-white/15 p-1 font-mono text-[11px] uppercase tracking-wider">
      {options.map((option) => (
        <a
          key={option.label}
          href={option.href}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            option.active ? "bg-paper text-ink" : "text-mist hover:text-paper",
          )}
        >
          {option.label}
        </a>
      ))}
    </nav>
  );
}

function Panel({ title, note, children, className }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6", className)}>
      <header className="flex flex-col gap-1">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-signal">{title}</h2>
        {note ? <p className="text-sm text-mist">{note}</p> : null}
      </header>
      {children}
    </section>
  );
}

function Empty({ children = "No data in this range yet." }: { children?: React.ReactNode }) {
  return <p className="text-sm text-mist/70">{children}</p>;
}

function BarRow({ label, value, max, detail }: { label: string; value: number; max: number; detail: string }) {
  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="truncate text-paper">{label}</span>
        <span className="shrink-0 font-mono text-xs text-mist">{detail}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${Math.max(2, percent(value, max))}%` }} />
      </div>
    </li>
  );
}

export default function AnalyticsDashboard({ base, days, ranges, humansOnly, data }: Props) {
  const audience = humansOnly ? "" : "&all=1";

  return (
    <main className="min-h-screen bg-ink px-4 py-10 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Studio · Analytics</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Who&rsquo;s looking</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Toggle
              options={[
                { label: "People", href: `${base}?d=${days}`, active: humansOnly },
                { label: "Everyone", href: `${base}?d=${days}&all=1`, active: !humansOnly },
              ]}
            />
            <Toggle
              options={ranges.map((range) => ({
                label: range === 1 ? "24h" : `${range}d`,
                href: `${base}?d=${range}${audience}`,
                active: range === days,
              }))}
            />
            <form method="post" action={`${base}/logout`}>
              <button className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-mist transition-colors hover:border-paper hover:text-paper">
                Sign out
              </button>
            </form>
          </div>
        </header>

        {data ? <DashboardBody data={data} days={days} humansOnly={humansOnly} base={base} /> : <StorageMissing />}
      </div>
    </main>
  );
}

function StorageMissing() {
  return (
    <Panel title="Storage not connected">
      <p className="max-w-2xl text-sm leading-relaxed text-mist">
        Sign-in works, but there&rsquo;s no database to record visits yet. In Vercel, open the tyler-woodruff project →
        Storage → Create Database → Neon, connect it to this project, then redeploy. Visits are recorded from that point
        on.
      </p>
    </Panel>
  );
}

function DashboardBody({
  data,
  days,
  humansOnly,
  base,
}: {
  data: DashboardData & {};
  days: number;
  humansOnly: boolean;
  base: string;
}) {
  const { summary, reach, sections, locations, pages, referrers, devices, recent, split } = data;
  const daily = fillDays(data.daily, days);
  const dailyMax = Math.max(1, ...daily.map((d) => d.visits));

  const sectionsByPage = new Map<string, Row[]>();
  for (const row of sections) {
    const list = sectionsByPage.get(row.path) ?? [];
    list.push(row);
    sectionsByPage.set(row.path, list);
  }
  const pageOrder = [...sectionsByPage.keys()].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

  const reachSteps = [
    { label: "Top of page", value: reach.total },
    { label: "25%", value: reach.p25 },
    { label: "50%", value: reach.p50 },
    { label: "75%", value: reach.p75 },
    { label: "Bottom", value: reach.p100 },
  ];

  return (
    <>
      <p className="-mt-2 text-sm leading-relaxed text-mist">
        {humansOnly ? (
          <>
            Showing people only. {plural(split.automated, "visit")} in this range looked automated (link scanners,
            crawlers) and {split.automated === 1 ? "is" : "are"} hidden.{" "}
            {split.automated ? (
              <a href={`${base}?d=${days}&all=1`} className="text-paper underline underline-offset-4 hover:text-signal">
                Show everyone
              </a>
            ) : null}
          </>
        ) : (
          <>
            Showing every visit: {plural(split.humans, "visit")} from likely people and {plural(split.automated, "visit")}{" "}
            that looked automated. The human score is an estimate based on mouse, scroll-wheel, touch and keyboard
            activity.
          </>
        )}
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: "Unique viewers", value: number.format(summary.visitors) },
          { label: "Page views", value: number.format(summary.visits) },
          { label: "Avg. time engaged", value: duration(summary.avg_ms) },
          { label: "Avg. scroll depth", value: `${summary.avg_scroll}%` },
          { label: "Cities", value: number.format(summary.cities) },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{stat.label}</span>
            <span className="font-display text-3xl font-semibold tabular-nums">{stat.value}</span>
          </div>
        ))}
      </div>

      <Panel title="Viewers per day" note={`Last ${rangeLabel(days)}, Eastern time.`}>
        {summary.visits ? (
          <div className="flex h-40 items-end gap-[3px]">
            {daily.map((d) => (
              <div key={d.day} className="group relative flex h-full flex-1 items-end">
                <div
                  className="w-full rounded-t-sm bg-signal/80 transition-colors group-hover:bg-signal"
                  style={{ height: `${Math.max(d.visits ? 4 : 1, percent(d.visits, dailyMax))}%` }}
                />
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-paper px-2 py-1 font-mono text-[10px] text-ink group-hover:block">
                  {d.day} · {plural(d.visitors, "viewer")} · {plural(d.visits, "view")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="How far they scrolled" note="Share of homepage visits that reached each point.">
          {reach.total ? (
            <ul className="flex flex-col gap-4">
              {reachSteps.map((step) => (
                <BarRow
                  key={step.label}
                  label={step.label}
                  value={step.value}
                  max={reach.total}
                  detail={`${percent(step.value, reach.total)}% · ${step.value}`}
                />
              ))}
            </ul>
          ) : (
            <Empty>No homepage visits in this range yet.</Empty>
          )}
        </Panel>

        <Panel title="Where they are" note="City and state from the visitor's network. Never an exact address.">
          {locations.length ? (
            <ul className="flex flex-col gap-4">
              {locations.slice(0, 10).map((row) => (
                <BarRow
                  key={`${row.city}-${row.region}-${row.country}`}
                  label={place(row)}
                  value={row.visitors}
                  max={locations[0].visitors}
                  detail={`${plural(row.visitors, "viewer")} · ${plural(row.visits, "view")}`}
                />
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Panel>
      </div>

      <Panel
        title="Where they paused to look"
        note="Each section in page order. Time is the average spent with that section in the middle of the screen; stops count the times a viewer held still there for 1.5 seconds or more."
      >
        {pageOrder.length ? (
          <div className="flex flex-col gap-8">
            {pageOrder.map((path) => {
              const rows = sectionsByPage.get(path)!;
              const maxAvg = Math.max(1, ...rows.map((r) => r.avg_ms));
              const topSection = rows.reduce((best, r) => (r.total_ms > best.total_ms ? r : best), rows[0]);
              return (
                <div key={path} className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2">
                    <h3 className="font-display text-lg font-medium">{pageLabel(path)}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-mist">
                      Most attention: {sectionLabel(topSection.section)}
                    </span>
                  </div>
                  <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {rows.map((row) => (
                      <BarRow
                        key={row.section}
                        label={sectionLabel(row.section)}
                        value={row.avg_ms}
                        max={maxAvg}
                        detail={`${duration(row.avg_ms)} avg · ${plural(row.stops, "stop")} · ${row.viewers} saw it`}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Pages">
          {pages.length ? (
            <ul className="flex flex-col gap-4">
              {pages.map((row) => (
                <BarRow
                  key={row.path}
                  label={pageLabel(row.path)}
                  value={row.visits}
                  max={pages[0].visits}
                  detail={`${plural(row.visits, "view")} · ${row.avg_scroll}% deep · ${duration(row.avg_ms)}`}
                />
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Panel>
        <Panel title="Came from">
          {referrers.length ? (
            <ul className="flex flex-col gap-4">
              {referrers.map((row) => (
                <BarRow key={row.source} label={row.source} value={row.visits} max={referrers[0].visits} detail={String(row.visits)} />
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Panel>
        <Panel title="Devices">
          {devices.length ? (
            <ul className="flex flex-col gap-4">
              {devices.map((row) => (
                <BarRow
                  key={row.device}
                  label={row.device ?? "Unknown"}
                  value={row.visits}
                  max={summary.visits}
                  detail={`${percent(row.visits, summary.visits)}%`}
                />
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Panel>
      </div>

      <Panel title="Recent visits" note="The latest 50 page views in this range.">
        {recent.length ? (
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="font-mono text-[10px] uppercase tracking-widest text-mist">
                <tr className="border-b border-white/10">
                  {["When", "Human?", "Location", "Page", "Scrolled", "Engaged", "Lingered on", "Device", "From"].map((h) => (
                    <th key={h} className="py-2 pr-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 last:border-0">
                    <td className="whitespace-nowrap py-2.5 pr-4 text-mist">
                      {new Date(row.started_at).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2.5 pr-4">
                      <HumanScore score={row.human_score} />
                    </td>
                    <td className="whitespace-nowrap py-2.5 pr-4">{place(row)}</td>
                    <td className="whitespace-nowrap py-2.5 pr-4">{pageLabel(row.path)}</td>
                    <td className="py-2.5 pr-4 font-mono tabular-nums">{row.max_scroll}%</td>
                    <td className="py-2.5 pr-4 font-mono tabular-nums">{duration(row.active_ms)}</td>
                    <td className="py-2.5 pr-4 text-mist">{row.top_section ? sectionLabel(row.top_section) : "—"}</td>
                    <td className="py-2.5 pr-4 text-mist">{row.device}</td>
                    <td className="py-2.5 pr-4 text-mist">{row.referrer ?? "Direct"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )}
      </Panel>
    </>
  );
}
