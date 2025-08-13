import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  //* Clear the token cookie
  (await cookies()).set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
