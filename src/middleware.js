import { NextResponse } from "next/server";

// In-memory cache for redirect & status lookup to eliminate redundant DB calls across edge invocations
const redirectCache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("jwt")?.value;

  // 1. Admin Authentication Check
  const isProtected = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 2. Client-Side Page Status & URL Redirects Check (skip for admin, api, static files, and homepage)
  // Homepage '/' is never redirected or inactive — skip network check completely
  if (pathname !== "/" && !pathname.startsWith("/admin") && !pathname.startsWith("/api") && !pathname.startsWith("/_next") && !pathname.includes('.')) {
    try {
      let data = null;
      const cached = redirectCache.get(pathname);
      const now = Date.now();

      if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
        data = cached.data;
      } else {
        // Query lookup endpoint with strict 800ms timeout to never block user navigation
        const checkUrl = new URL(`/api/cms/redirect-check?path=${encodeURIComponent(pathname)}`, request.url);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800);

        try {
          const res = await fetch(checkUrl, {
            signal: controller.signal,
            next: { revalidate: 60 },
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            data = await res.json();
            redirectCache.set(pathname, { data, timestamp: now });
            // Clean up cache size if too large
            if (redirectCache.size > 500) {
              const firstKey = redirectCache.keys().next().value;
              redirectCache.delete(firstKey);
            }
          }
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          // If timeout or fetch error occurs, fail open immediately so user is not blocked
        }
      }

      if (data) {
        // 2a. If page is marked Inactive, hide it from client-side website (return 404)
        if (data.inactive) {
          const isPreview = token && request.nextUrl.searchParams.get("preview") === "true";
          if (!isPreview) {
            return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
          }
        }

        // 2b. URL Redirects
        if (data.redirect) {
          const destination = data.redirect.toPath;
          const statusCode = data.redirect.type === '302' ? 302 : 301;
          
          if (destination.startsWith('http://') || destination.startsWith('https://')) {
            return NextResponse.redirect(destination, statusCode);
          } else {
            return NextResponse.redirect(new URL(destination, request.url), statusCode);
          }
        }
      }
    } catch (err) {
      console.error("Middleware lookup error:", err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - standard file extensions (.png, .jpg, .svg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};