import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import PatientNotification from "@/lib/models/patientNotification.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // URL से patientId निकालना
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { success: false, message: "patientId is required" },
        { status: 400 }
      );
    }

    const notifications = await PatientNotification.aggregate([
      { $match: { patientId: new mongoose.Types.ObjectId(patientId) } }, // सिर्फ उसी patientId का data लाना
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "appointmentof2025", // collection name
          let: { pid: "$patientId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$patientId", "$$pid"] } } },
            { $sort: { createdAt: -1 } },
          ],
          as: "appointments",
        },
      },
    ]);

    return NextResponse.json(
      { success: true, data: notifications },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
