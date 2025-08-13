import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { patientId, phoneNumber } = body;

    if (!patientId || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing patientId or phoneNumber" },
        { status: 400 }
      );
    }

    const patient = await AppointmentOf2025.find({
      patientId: patientId,
      phone: phoneNumber,
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
