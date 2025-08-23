import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import PatientNotification from "@/lib/models/patientNotification.model";

// get patient wise notifications:-
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

    // // पहले notifications को read:true कर दो
    // await PatientNotification.updateMany(
    //   { patientId: new mongoose.Types.ObjectId(patientId) },
    //   { $set: { "notifications.$[].read": true } }
    // );

    // उसी patientId के notifications को लाना
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

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json(
        { error: "patientId is required" },
        { status: 400 }
      );
    }

    // ✅ Update notifications array: set read=true for all notifications
    const result = await PatientNotification.updateMany(
      { patientId: new mongoose.Types.ObjectId(patientId) },
      { $set: { "notifications.$[].read": true } }
    );

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
      result,
    });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
