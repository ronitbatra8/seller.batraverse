import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");

async function serveUpload(pathname: string, search: string) {
  const upstream = new URL(`${pathname}${search}`, `${API_BASE}/`);
  try {
    const res = await fetch(upstream, {
      headers: { "ngrok-skip-browser-warning": "true" },
      cache: "no-store",
    });
    const headers = new Headers();
    const contentType = res.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=3600, immutable");
    if (res.status !== 200) return new Response(null, { status: res.status });
    return new Response(res.body, { status: 200, headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/uploads/")) {
    return serveUpload(pathname, search);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
