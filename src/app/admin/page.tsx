import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminBasePath, isAdminConfigured, isAdminSession } from "@/lib/analytics/auth";
import { isStorageConfigured } from "@/lib/analytics/db";
import { loadDashboard } from "@/lib/analytics/queries";
import AdminLogin from "@/components/analytics/AdminLogin";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

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
  const data = isStorageConfigured() ? await loadDashboard(days) : null;

  return <AnalyticsDashboard base={base} days={days} ranges={RANGES} data={data} />;
}
