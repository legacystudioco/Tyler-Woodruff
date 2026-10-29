import { NextResponse, type NextRequest } from "next/server";

// The admin area only answers at the secret ADMIN_PATH. Its internal routes
// (/admin, /api/admin/*) 404 when requested directly, so the source code
// being public doesn't reveal a working URL.
const INTERNAL_ROUTES = /^\/(admin|api\/admin)(\/|$)/;

const PUBLIC_TO_INTERNAL: Record<string, string> = {
  "": "/admin",
  "/": "/admin",
  "/login": "/api/admin/login",
  "/logout": "/api/admin/logout",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = process.env.ADMIN_PATH;

  if (slug && (pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))) {
    const target = PUBLIC_TO_INTERNAL[pathname.slice(slug.length + 1)];
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      const response = NextResponse.rewrite(url);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
  }

  if (INTERNAL_ROUTES.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|favicon.ico|.*\\.(?:pdf|jpg|jpeg|png|webp|svg|mp4)$).*)"],
};
