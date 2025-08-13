import FirstInventory from "@/lib/models/firstInventory.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { item, quantity, spent, isBase, date, time } = await request.json();

    // ✅ Connect to DB
    await connectToDatabase();

    let doc;

    // Check if item exists
    const existing = await FirstInventory.findOne({ item });

    if (existing) {
      if (isBase) {
        existing.totalUsage += quantity;
      }
      existing.history.push({ date, time, quantity, spent, isBase });
      doc = await existing.save();
    } else {
      doc = await FirstInventory.create({
        item,
        totalUsage: isBase ? quantity : 0,
        history: [{ date, time, quantity, spent, isBase }],
      });
    }

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json(
      { success: false, message: "Database insert/update failed" },
      { status: 500 }
    );
  }
}

// 🟢 GET: Fetch all inventory
export async function GET() {
  try {
    await connectToDatabase();
    const inventories = await FirstInventory.find({});
    return NextResponse.json(
      { success: true, data: inventories },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Database fetch failed" },
      { status: 500 }
    );
  }
}
