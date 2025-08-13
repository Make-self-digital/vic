import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  const patientId = req.nextUrl.searchParams.get("patientId");

  if (!phone || !patientId) {
    return NextResponse.json(
      { error: "Phone and patientId number required for the report" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // Validate patientId format first
    if (!Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({ error: "Invalid patientId" }, { status: 400 });
    }

    const patient = await AppointmentOf2025.findOne({
      phone,
      _id: new Types.ObjectId(patientId),
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
