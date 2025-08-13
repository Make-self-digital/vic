import { connectToDatabase } from "@/lib/mongodb";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectToDatabase();

  const { status } = await req.json();
  const { id } = await context.params;

  if (!["Pending", "Completed", "Cancelled"].includes(status)) {
    return NextResponse.json(
      { success: false, message: "Invalid status" },
      { status: 400 }
    );
  }

  try {
    const patient = await AppointmentOf2025.findById(id);

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    if (!patient.lastDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Please make report first.",
        },
        { status: 400 }
      );
    }

    const updatedPatient = await AppointmentOf2025.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
