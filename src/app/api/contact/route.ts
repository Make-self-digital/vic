import { NextRequest, NextResponse } from "next/server";
import Contact from "@/lib/models/contact.model";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { name, phone, message } = body;

    // ✅ Validate fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    name = name.trim().toLowerCase();
    phone = phone.trim().replace(/\D/g, "");
    message = message.trim();

    await connectToDatabase();

    // Create and save new contact entry
    const newContact = await Contact.create({ name, phone, message });

    return NextResponse.json(
      { message: "Message sent successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
