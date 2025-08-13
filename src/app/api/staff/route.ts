import { connectToDatabase } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Staff from "@/lib/models/staff.model";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { staffName, phone, password } = await req.json();

    // * Trim and sanitize inputs
    const trimmedName = staffName?.trim().toLowerCase();
    const trimmedPhone = phone?.trim().replace(/\s+/g, "");
    const trimmedPassword = password?.trim();

    if (!trimmedName || !trimmedPhone || !trimmedPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (trimmedPhone.length !== 10 || !/^\d{10}$/.test(trimmedPhone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Check if staff exists
    let staff = await Staff.findOne({ phone: trimmedPhone });
    let isNew = false;

    if (!staff) {
      // Register new staff
      staff = await Staff.create({
        staffName: trimmedName,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
      isNew = true;
    } else {
      // Check password match manually (for demo purpose)
      if (staff.password !== trimmedPassword) {
        return NextResponse.json(
          { success: false, message: "Incorrect password" },
          { status: 401 }
        );
      }
    }

    // Generate JWT
    const token = generateToken({
      id: staff._id,
      role: "staff",
      name: staff.staffName,
    });

    // Set token in cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      success: true,
      message: isNew
        ? "Welcome! Staff account created."
        : "Welcome back! Login successful.",
      staff: {
        id: staff._id,
        staffName: staff.staffName,
        phone: staff.phone,
      },
    });
  } catch (error) {
    console.error("Staff login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
