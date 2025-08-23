import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import StaffNotification from "@/lib/models/staffNotification.model";
import PatientNotification from "@/lib/models/patientNotification.model";

// create a staff notification:-
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { patientId, type, title, message, url } = await req.json();

    if (!patientId || !type || !title || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // create a new Staff notification:-
    const updatedNotification = await StaffNotification.findOneAndUpdate(
      { patientId },
      {
        $push: {
          notifications: {
            type,
            title,
            message,
            url,
            read: false,
            createdAt: new Date(),
          },
        },
        $set: { createdAt: new Date() }, // 👈 हर बार अपडेट
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // create a new patient notification:-
    const updatedPatientNotification =
      await PatientNotification.findOneAndUpdate(
        { patientId },
        {
          $push: {
            notifications: {
              type,
              title,
              message,
              url,
              read: false,
              createdAt: new Date(),
            },
          },
          $set: { createdAt: new Date() }, // 👈 हर बार अपडेट
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

    return NextResponse.json(
      {
        success: true,
        data: updatedNotification,
        patientDataNotification: updatedPatientNotification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating patient notification:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// get all notifications:-
export async function GET() {
  try {
    await connectToDatabase();

    const notifications = await StaffNotification.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "appointmentof2025", // collection name
          let: { pid: "$patientId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$patientId", "$$pid"] } } },
            { $sort: { createdAt: -1 } }, // sort appointments by createdAt
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

// delete targeted notifications:-
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json(
        { success: false, message: "patientId is required" },
        { status: 400 }
      );
    }

    const result = await StaffNotification.deleteMany({ patientId });

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notifications:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// update read marked notifications:-
export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    // ✅ Update all notifications for the patient
    const result = await StaffNotification.updateMany(
      {},
      { $set: { "notifications.$[].read": true } } // <- sabhi notifications ko read = true kar dega
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
