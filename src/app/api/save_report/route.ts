import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    let { patientId, phone, reportMakingDate, sections, images, currentDate } =
      await req.json();

    if (!phone || !patientId) {
      return NextResponse.json(
        { error: "Phone and patientId are required" },
        { status: 400 }
      );
    }

    // Clean input (optional)
    sections = sections?.map((s: any) => ({
      heading: s.heading?.trim?.() ?? "",
      description: s.description?.trim?.() ?? "",
    }));

    const updatedPatient = await AppointmentOf2025.findOneAndUpdate(
      { phone, _id: patientId },
      {
        $set: {
          "patientReport.MakingDate": reportMakingDate,
          "patientReport.Sections": sections,
          "patientReport.ImageUrls": images,
          reportStatus: "ready",
          lastDate: currentDate,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedPatient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Report updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
