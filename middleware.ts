import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = req.nextUrl.pathname === "/login";

  // ✅ If trying to access dashboard and not logged in, redirect to login
  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = verifyToken(token);
      if (!decoded || decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ If already logged in and trying to access login, redirect to dashboard
  if (isLoginPage && token) {
    try {
      const decoded = verifyToken(token);
      if (decoded && decoded.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err) {
      console.error("Error verifying token:", err);
      // Invalid token, let user stay on login page
    }
  }

  return NextResponse.next();
}
