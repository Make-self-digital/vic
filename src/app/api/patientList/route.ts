import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";

// ✅ IST Time Slot Map (hour ranges)
const getISTHourRange = (slot: string): [number, number] | null => {
  const slots: Record<string, [number, number]> = {
    "8 AM - 10 AM": [8, 10],
    "10 AM - 12 PM": [10, 12],
    "12 PM - 2 PM": [12, 14],
    "2 PM - 4 PM": [14, 16],
    "4 PM - 6 PM": [16, 18],
  };

  return slots[slot] || null;
};

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const search = searchParams.get("search");

    let matchQuery: any = {};

    // ? Search filter (by name, phone, service)
    if (search) {
      matchQuery.$or = [
        { patientName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
      ];
    }

    // ? Category filters:-
    if (category && subCategory) {
      switch (category) {
        case "service":
          matchQuery.service = subCategory;
          break;

        case "status":
          matchQuery.status = subCategory;
          break;

        case "month":
          const monthIndex = new Date(`${subCategory} 1, 2025`).getMonth();
          matchQuery.createdAt = {
            $gte: new Date(new Date().getFullYear(), monthIndex, 1),
            $lt: new Date(new Date().getFullYear(), monthIndex + 1, 1),
          };
          break;

        case "time":
          const hourRange = getISTHourRange(subCategory);
          if (hourRange) {
            const [startHour, endHour] = hourRange;

            const timeAggregation = await AppointmentOf2025.aggregate([
              {
                $addFields: {
                  istCreatedAt: {
                    $add: ["$createdAt", 1000 * 60 * 60 * 5.5], // Convert UTC to IST
                  },
                },
              },
              {
                $addFields: {
                  istHour: { $hour: "$istCreatedAt" },
                },
              },
              {
                $match: {
                  ...matchQuery,
                  istHour: { $gte: startHour, $lt: endHour },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
            ]);

            return NextResponse.json({
              success: true,
              patients: timeAggregation,
            });
          }
          break;
      }
    }

    // ? Default fallback (if no time filter)
    const patients = await AppointmentOf2025.find(matchQuery).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error("Fetch Patients Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
