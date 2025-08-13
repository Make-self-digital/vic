import { NextRequest, NextResponse } from "next/server";
import Admin from "@/lib/models/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { adminName, password } = body;
    adminName = adminName.trim().toLowerCase();
    password = password.replace(/\s/g, "").toLowerCase();

    if (!adminName || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    let expectedName = "Rajesh Singh";
    expectedName = expectedName.trim().toLowerCase();
    let expectedPassword = "Rajeshsingh@#234";
    expectedPassword = expectedPassword.replace(/\s/g, "").toLowerCase();

    // * Reject immediately if name or password are not valid
    if (adminName !== expectedName || password !== expectedPassword) {
      return NextResponse.json(
        { message: "You are not real admin" },
        { status: 403 }
      );
    }

    // ✅ Check if admin already exists with exact name and password
    const existingAdmin = await Admin.findOne({ adminName, password });

    if (existingAdmin) {
      // 🔓 Admin exists, log in directly
      const token = generateToken({
        id: existingAdmin._id,
        role: "admin",
        name: existingAdmin.adminName,
      });
      (await cookies()).set("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json(
        { message: "Login successful", admin: existingAdmin },
        { status: 200 }
      );
    }
    // * If not exists, create it (with exact expected credentials)
    const newAdmin = await Admin.create({ adminName, password });

    const token = generateToken({
      id: newAdmin._id,
      role: "admin",
      name: newAdmin.adminName,
    });
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      { message: "Your account has been created", admin: newAdmin },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
