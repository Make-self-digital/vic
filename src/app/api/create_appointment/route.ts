import { AppointmentOf2025 } from "@/lib/models/appointment.model";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    let {
      patientId,
      formData: { name, phone, age, village, gender, service, notes },
      formattedDate, // appointmentDate
      time, // appointmentTime
      bookingTime, // time of booking
      payment, // amount
    } = body;

    age = age?.trim();
    notes = notes?.trim();

    if (!patientId || !age || !gender || !service || !formattedDate || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ! Count how many bookings already exist for this patientId
    const bookingCount = await AppointmentOf2025.countDocuments({ patientId });

    // ! Create a new appointment:-
    const newAppointment = await AppointmentOf2025.create({
      patientId,
      patientName: name,
      phone: phone,
      age,
      village,
      referBy: "",
      gender,
      service,
      notes,
      appointmentDate: formattedDate,
      appointmentTime: time,
      bookingTime,
      payment,
      status: "Pending",
      reportStatus: "pending",
      paymentStatus: "unpaid",
      bookingCount: bookingCount + 1,
      doctorName: "",
      reportUrl: [],
      patientReport: {
        MakingDate: "",
        Sections: [],
        ImageUrls: [],
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
