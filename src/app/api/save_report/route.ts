import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    let {
      patientId,
      phone,
      scan,
      history,
      findings,
      impressions,
      images,
      currentDate,
    } = await req.json();

    if (!phone || !patientId) {
      return NextResponse.json(
        { error: "Phone and patientId number are required" },
        { status: 400 }
      );
    }

    // Clean input
    scan = scan.trim();
    history = history.trim();
    findings = findings?.trim?.() ?? findings;
    impressions = impressions?.trim?.() ?? impressions;

    const updatedPatient = await AppointmentOf2025.findOneAndUpdate(
      { phone, _id: patientId },
      {
        $set: {
          "patientReport.Scan": scan,
          "patientReport.ClinicalHistory": history,
          "patientReport.Findings": findings,
          "patientReport.Impression": impressions,
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
      message: "Report updated",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
