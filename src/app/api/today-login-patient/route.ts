import { NextResponse } from "next/server";
import moment from "moment-timezone";
import { PatientOf2025 } from "@/lib/models/patient.model";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    // Current date in IST
    const todayIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

    // Fetch all patients (or apply filters if needed)
    const allPatients = await PatientOf2025.find().sort({ createdAt: -1 });

    // Filter by IST date
    const todayPatients = allPatients.filter((patient) => {
      const createdAtIST = moment(patient.createdAt)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD");
      return createdAtIST === todayIST;
    });

    return NextResponse.json(
      { success: true, data: todayPatients },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching today's patients:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
