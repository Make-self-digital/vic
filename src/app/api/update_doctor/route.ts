import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { id, doctorName } = await req.json();

    if (!id || !doctorName || doctorName.trim().length < 2) {
      return NextResponse.json(
        { error: "Doctor name is required and must be at least 2 characters" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await AppointmentOf2025.findByIdAndUpdate(id, { doctorName });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Doctor update failed:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}
