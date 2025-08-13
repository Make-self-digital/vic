// src/app/api/auth/status/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ isAuthenticated: false });
  }

  return NextResponse.json({
    isAuthenticated: true,
    role: decoded.role,
    userId: decoded.id,
    name: decoded.name,
  });
}
