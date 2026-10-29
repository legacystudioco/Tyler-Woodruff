import { NextResponse, type NextRequest } from "next/server";
import { getSql } from "@/lib/analytics/db";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  adminBasePath,
  attemptKey,
  createSessionToken,
  verifyCredentials,
} from "@/lib/analytics/auth";

const WINDOW = "15 minutes";
const MAX_PER_CLIENT = 5;
const MAX_TOTAL = 40;

const notFound = () => new Response("Not Found", { status: 404 });

export async function POST(request: NextRequest) {
  const base = adminBasePath();
  if (!base) return notFound();

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return notFound();

  const back = (error?: string) =>
    NextResponse.redirect(new URL(error ? `${base}?e=${error}` : base, request.url), 303);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = attemptKey(ip);
  const sql = await getSql().catch(() => null);

  if (sql) {
    const [counts] = await sql`
      SELECT count(*) FILTER (WHERE key = ${key})::int AS mine, count(*)::int AS total
      FROM login_attempts WHERE at > now() - ${WINDOW}::interval`;
    if (counts.mine >= MAX_PER_CLIENT || counts.total >= MAX_TOTAL) return back("locked");
  }

  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  if (!(await verifyCredentials(email, password))) {
    if (sql) {
      await sql`INSERT INTO login_attempts (key) VALUES (${key})`;
      await sql`DELETE FROM login_attempts WHERE at < now() - interval '1 day'`;
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
    return back("invalid");
  }

  if (sql) await sql`DELETE FROM login_attempts WHERE key = ${key}`;

  const response = back();
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
