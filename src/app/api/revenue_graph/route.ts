import { NextResponse } from "next/server";
import moment from "moment-timezone";
import { connectToDatabase } from "@/lib/mongodb";
import { servicePrices } from "@/constants/servicePrices";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const weekStart = searchParams.get("weekStart");
    const weekEnd = searchParams.get("weekEnd");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    let filter: any = { paymentStatus: "paid" };

    if (date) {
      // Single date in IST
      const startOfDayIST = moment
        .tz(date, "Asia/Kolkata")
        .startOf("day")
        .toDate();
      const endOfDayIST = moment.tz(date, "Asia/Kolkata").endOf("day").toDate();
      filter.createdAt = { $gte: startOfDayIST, $lte: endOfDayIST };
    } else if (weekStart && weekEnd) {
      // Week range in IST
      const startIST = moment
        .tz(weekStart, "Asia/Kolkata")
        .startOf("day")
        .toDate();
      const endIST = moment.tz(weekEnd, "Asia/Kolkata").endOf("day").toDate();
      filter.createdAt = { $gte: startIST, $lte: endIST };
    } else if (month && year) {
      // Month range in IST
      const startIST = moment
        .tz(`${year}-${month}-01`, "Asia/Kolkata")
        .startOf("month")
        .toDate();
      const endIST = moment
        .tz(`${year}-${month}-01`, "Asia/Kolkata")
        .endOf("month")
        .toDate();
      filter.createdAt = { $gte: startIST, $lte: endIST };
    } else if (year) {
      // Whole year in IST
      const startIST = moment
        .tz(`${year}-01-01`, "Asia/Kolkata")
        .startOf("year")
        .toDate();
      const endIST = moment
        .tz(`${year}-12-31`, "Asia/Kolkata")
        .endOf("year")
        .toDate();
      filter.createdAt = { $gte: startIST, $lte: endIST };
    } else {
      // Default: today's IST date
      const todayIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
      const startOfDayIST = moment
        .tz(todayIST, "Asia/Kolkata")
        .startOf("day")
        .toDate();
      const endOfDayIST = moment
        .tz(todayIST, "Asia/Kolkata")
        .endOf("day")
        .toDate();
      filter.createdAt = { $gte: startOfDayIST, $lte: endOfDayIST };
    }

    // Fetch appointments directly with IST-based filtering
    const appointments = await AppointmentOf2025.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    // Service stats calculation
    const serviceStats: Record<
      string,
      { name: string; count: number; revenue: number }
    > = {};

    for (const appointment of appointments) {
      const service = appointment.service || "Unknown";
      const price = servicePrices[service] || 0;

      if (!serviceStats[service]) {
        serviceStats[service] = { name: service, count: 1, revenue: price };
      } else {
        serviceStats[service].count += 1;
        serviceStats[service].revenue += price;
      }
    }

    // return NextResponse.json(
    //   { success: true, data: Object.values(serviceStats) },
    //   { status: 200 }
    // );

    const result = Object.values(serviceStats);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching service stats:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// const result = Object.values(serviceStats);

//   return NextResponse.json(result);
