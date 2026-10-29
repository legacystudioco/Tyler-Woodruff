import { cn } from "@/lib/utils";
import { HUMAN_THRESHOLD } from "@/lib/analytics/queries";

export type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export const number = new Intl.NumberFormat("en-US");

export function duration(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
}

export function plural(count: number, word: string) {
  return `${number.format(count)} ${word}${count === 1 ? "" : "s"}`;
}

export function percent(part: number, total: number) {
  return total ? Math.round((part / total) * 100) : 0;
}

export function place(row: Row) {
  if (!row.city && !row.region) return row.country ?? "Unknown";
  const area = row.country && row.country !== "US" ? row.country : row.region;
  return [row.city, area].filter(Boolean).join(", ");
}

export function sectionLabel(section: string) {
  return section
    .split("/")
    .map((part) => part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");
}

export function pageLabel(path: string) {
  if (path === "/") return "Home";
  return path.replace(/^\/work\//, "Work · ").replace(/^\//, "");
}


export function HumanScore({ score }: { score: number | null }) {
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

export function Toggle({ options }: { options: { label: string; href: string; active: boolean }[] }) {
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

export function Panel({ title, note, children, className }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
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

export function Empty({ children = "No data in this range yet." }: { children?: React.ReactNode }) {
  return <p className="text-sm text-mist/70">{children}</p>;
}

export function BarRow({
  label,
  value,
  max,
  detail,
  href,
}: {
  label: string;
  value: number;
  max: number;
  detail: string;
  href?: string;
}) {
  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        {href ? (
          <a href={href} className="truncate text-paper underline-offset-4 hover:text-signal hover:underline">
            {label} →
          </a>
        ) : (
          <span className="truncate text-paper">{label}</span>
        )}
        <span className="shrink-0 font-mono text-xs text-mist">{detail}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${Math.max(2, percent(value, max))}%` }} />
      </div>
    </li>
  );
}

export function when(value: string | Date) {
  return new Date(value).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function visitorName(visitorId: string) {
  return `Visitor ${visitorId.slice(0, 4).toUpperCase()}`;
}

// Location filter value for URLs: "city|region|country", blanks for unknown parts.
export function locationKey(row: Row) {
  return [row.city ?? "", row.region ?? "", row.country ?? ""].join("|");
}
