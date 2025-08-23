import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import PatientNotification from "@/lib/models/staffNotification.model";

// delete all notifications:-
export async function DELETE() {
  try {
    await connectToDatabase();

    const result = await PatientNotification.deleteMany({}); // पूरे collection का डेटा delete

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
