// /app/api/get-distance/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userLat, userLng } = await req.json();

    const clinicLat = 25.0270033;
    const clinicLng = 84.4149439;

    const apiKey = "AIzaSyAml4Scaub_RhmxTE8_22c2tFCferZnLOE";

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLat},${userLng}&destinations=${clinicLat},${clinicLng}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (
      !data.rows ||
      !data.rows[0] ||
      !data.rows[0].elements ||
      !data.rows[0].elements[0] ||
      data.rows[0].elements[0].status !== "OK"
    ) {
      return NextResponse.json(
        { error: "Invalid response from Google Maps API", data },
        { status: 500 }
      );
    }

    const distanceInMeters = data.rows[0].elements[0].distance.value;

    return NextResponse.json({ distanceInMeters });
  } catch (error) {
    console.error("Error in get-distance route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
