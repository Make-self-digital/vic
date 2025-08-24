// app/api/first-inventory/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import FirstInventory from "@/lib/models/firstInventory.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const doc = await FirstInventory.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Fetch failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { historyIndex, spent } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const doc = await FirstInventory.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    if (historyIndex < 0 || historyIndex >= doc.history.length) {
      return NextResponse.json(
        { success: false, message: "Invalid history index" },
        { status: 400 }
      );
    }

    // ✅ Calculate difference in spent
    const oldSpent = doc.history[historyIndex].spent || 0;
    const diff = spent - oldSpent;

    // ✅ Update spent
    doc.history[historyIndex].spent = spent;

    // ✅ Adjust quantity
    doc.history[historyIndex].quantity -= diff;

    await doc.save();

    return NextResponse.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}
