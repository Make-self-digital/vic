import { generateToken } from "@/lib/jwt";
import { PatientOf2025 } from "@/lib/models/patient.model";
import { connectToDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  let { patientName, phone } = await req.json();

  // * Clean and validate input:-
  patientName = patientName?.trim().toLowerCase();
  phone = phone?.replace(/\D/g, "").trim();
  // age = age?.trim();

  if (!patientName || !phone) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    let patient = await PatientOf2025.findOne({ phone });
    let isNewPatient = false;

    if (!patient) {
      // New patient → Register
      patient = await PatientOf2025.create({
        patientName,
        phone,
      });
      isNewPatient = true;
    }

    // * Create JWT token
    const token = generateToken({
      id: patient._id,
      role: "patient",
      name: patient.patientName,
    });

    //* Set cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      success: true,
      message: isNewPatient
        ? "Welcome! Your account has been created."
        : "Welcome back! You are logged in successfully.",
      patient,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
