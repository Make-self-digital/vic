// app/api/set_reportWithQr/route.ts
import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { phone, patientId, reportImages } = await req.json();

    if (!phone || !patientId || !reportImages) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const updatedPatient = await AppointmentOf2025.findByIdAndUpdate(
      { phone, _id: patientId },
      {
        $set: { reportUrl: reportImages }, // or push if multiple allowed
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedPatient });
  } catch (error) {
    console.error("Error saving report URL:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
