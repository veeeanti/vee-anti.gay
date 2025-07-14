import { NextRequest, NextResponse } from "next/server"

// Protect admin API endpoints
const protectedApiRoutes = [
  "/api/projects",
  "/api/projects/",
  "/api/categories",
  "/api/categories/",
  "/api/blog",
  "/api/blog/",
]

export function middleware(request: NextRequest) {
  // Only protect API routes (not GETs)
  if (
    request.nextUrl.pathname.startsWith("/api/") &&
    request.method !== "GET" &&
    protectedApiRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const authHeader = request.headers.get("authorization")
    const adminSecret = process.env.ADMIN_SECRET
    if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/projects",
    "/api/projects/:path*",
    "/api/categories",
    "/api/categories/:path*",
    "/api/blog",
    "/api/blog/:path*",
  ],
}
