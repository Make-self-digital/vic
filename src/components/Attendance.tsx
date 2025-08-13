"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AttendancePage() {
  const [loading, setLoading] = useState(false);

  const markAttendance = async () => {
    setLoading(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const res = await fetch("/api/get-distance", {
          method: "POST",
          body: JSON.stringify({ userLat, userLng }),
        });

        const { distanceInMeters } = await res.json();
        console.log(distanceInMeters);

        if (distanceInMeters <= 10) {
          toast.success("✅ Attendance marked successfully!");
          // TODO: Save to database
        } else {
          toast.error(
            `❌ You are ${distanceInMeters} meters away from the clinic. Attendance not allowed.`
          );
        }

        setLoading(false);
      },
      () => {
        toast.error("Unable to fetch your location.");
        setLoading(false);
      }
    );
  };

  return (
    <Button onClick={markAttendance} disabled={loading}>
      {loading ? "Checking Location..." : "Mark Attendance"}
    </Button>
  );
}
