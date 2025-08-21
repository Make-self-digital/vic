import { NextRequest, NextResponse } from "next/server";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { PatientOf2025 } from "@/lib/models/patient.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // ✅ Status counts
    const statusCounts = await AppointmentOf2025.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Report status counts
    const reportCounts = await AppointmentOf2025.aggregate([
      {
        $group: {
          _id: "$reportStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Payment status counts
    const paymentCounts = await AppointmentOf2025.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Service counts
    const serviceCounts = await AppointmentOf2025.aggregate([
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 },
        },
      },
    ]);

    // Total Patients (unique patientId count)
    const totalPatients = await AppointmentOf2025.distinct("patientId");
    const totalPatientsCount = totalPatients.length;

    // Total Appointments (all documents)
    const totalAppointments = await AppointmentOf2025.countDocuments();

    // Total Registered Patients (all documents)
    const totalRegisteredPatients = await PatientOf2025.countDocuments();

    return NextResponse.json(
      {
        status: "success",
        data: {
          totalRegisteredPatients,
          totalAppointments, // कितने appointment हुए
          totalPatients: totalPatientsCount, // कितने unique patients हैं

          statusCounts: statusCounts.reduce(
            (acc, item) => ({ ...acc, [item._id]: item.count }),
            {}
          ),

          reportCounts: reportCounts.reduce(
            (acc, item) => ({ ...acc, [item._id]: item.count }),
            {}
          ),

          paymentCounts: paymentCounts.reduce(
            (acc, item) => ({ ...acc, [item._id]: item.count }),
            {}
          ),

          serviceCounts: serviceCounts.reduce(
            (acc, item) => ({ ...acc, [item._id]: item.count }),
            {}
          ),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
