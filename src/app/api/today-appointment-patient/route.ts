import { NextResponse } from "next/server";
import moment from "moment-timezone";
import { connectToDatabase } from "@/lib/mongodb";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";

export async function GET() {
  try {
    await connectToDatabase();

    // Current date in IST (YYYY-MM-DD)
    const todayIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

    // Fetch all appointments (latest first)
    const allAppointments = await AppointmentOf2025.find().sort({
      createdAt: -1,
    });

    // Filter by IST date
    const todayAppointments = allAppointments.filter((app) => {
      const createdAtIST = moment(app.createdAt)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD");
      return createdAtIST === todayIST;
    });

    // Filter by conditions
    const paid = todayAppointments.filter(
      (app) => app.paymentStatus?.toLowerCase() === "paid"
    );
    const unpaid = todayAppointments.filter(
      (app) => app.paymentStatus?.toLowerCase() === "unpaid"
    );
    const completed = todayAppointments.filter(
      (app) => app.status === "Completed"
    );
    const pending = todayAppointments.filter((app) => app.status === "Pending");

    return NextResponse.json(
      {
        success: true,
        counts: {
          total: todayAppointments.length,
          paid: paid.length,
          unpaid: unpaid.length,
          completed: completed.length,
          pending: pending.length,
        },
        data: {
          data: todayAppointments,
          paid,
          unpaid,
          completed,
          pending,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
