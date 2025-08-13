import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id, paymentStatus } = await req.json();

    if (!id || !paymentStatus) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    await connectToDatabase();

    await AppointmentOf2025.findByIdAndUpdate(id, {
      paymentStatus,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating payment status:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
