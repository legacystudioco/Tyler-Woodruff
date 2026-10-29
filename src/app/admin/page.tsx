import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminBasePath, isAdminConfigured, isAdminSession } from "@/lib/analytics/auth";
import { isStorageConfigured } from "@/lib/analytics/db";
import { loadDashboard, loadLocation, loadVisitor, parseLocation } from "@/lib/analytics/queries";
import AdminLogin from "@/components/analytics/AdminLogin";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { LocationView, VisitorView } from "@/components/analytics/DetailViews";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false, nocache: true },
};

const RANGES = [1, 7, 30, 90];

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const base = adminBasePath();
  if (!base || !isAdminConfigured()) notFound();

  const params = await searchParams;
  if (!(await isAdminSession())) {
    const error = typeof params.e === "string" ? params.e : undefined;
    return <AdminLogin action={`${base}/login`} error={error} />;
  }

  const requested = Number(params.d);
  const days = RANGES.includes(requested) ? requested : 30;
  const humansOnly = params.all !== "1";
  const query = `d=${days}${humansOnly ? "" : "&all=1"}`;
  const shell = { base, days, ranges: RANGES, humansOnly };

  if (isStorageConfigured() && typeof params.v === "string") {
    const visitor = await loadVisitor(params.v);
    if (visitor) {
      return (
        <AnalyticsDashboard
          {...shell}
          data={null}
          extraQuery={`&v=${params.v}`}
          detail={<VisitorView data={visitor} base={base} query={query} />}
        />
      );
    }
  }

  const location = parseLocation(params.loc);
  if (isStorageConfigured() && location) {
    const located = await loadLocation(location, days, humansOnly);
    if (located) {
      return (
        <AnalyticsDashboard
          {...shell}
          data={null}
          extraQuery={`&loc=${encodeURIComponent(params.loc as string)}`}
          detail={<LocationView data={located} base={base} query={query} />}
        />
      );
    }
  }

  const data = isStorageConfigured() ? await loadDashboard(days, humansOnly) : null;
  return <AnalyticsDashboard {...shell} data={data} />;
}
