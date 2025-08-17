// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Agar token nahi hai aur protected route hai to redirect karo
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/appointments")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/notifications")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/revenue")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/reports")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/patients")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/staff")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/billing")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && pathname.startsWith("/inventory")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Agar token hai aur login pe jaa raha hai to redirect dashboard
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Ye define karo kaha middleware chalega
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/notifications/:path*",
    "/revenue/:path*",
    "/reports/:path*",
    "/patients/:path*",
    "/staff/:path*",
    "/billing/:path*",
    "/inventory/:path*",
    "/login",
  ], // jispe guard chahiye
};
