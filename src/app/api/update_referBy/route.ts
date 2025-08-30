// /src/app/api/update_referBy/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AppointmentOf2025 } from "@/lib/models/appointment.model";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { id, referBy } = body;

    if (!id || !referBy) {
      return NextResponse.json(
        { success: false, message: "Missing id or referBy" },
        { status: 400 }
      );
    }

    const result = await AppointmentOf2025.updateOne(
      { _id: id },
      { $set: { referBy } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No document updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Refer By updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating referBy:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
