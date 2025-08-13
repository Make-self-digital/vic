"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  patient: {
    _id: string;
    status: "Pending" | "Completed" | "Cancelled";
    lastDate: string;
  };
  onStatusChange: (status: "Pending" | "Completed" | "Cancelled") => void;
};

export const StatusDropdown = ({ patient, onStatusChange }: Props) => {
  const [status, setStatus] = useState(patient.status);

  const handleChange = async (
    newStatus: "Pending" | "Completed" | "Cancelled"
  ) => {
    if (!patient.lastDate) {
      return toast.info("Patient reports not found", {
        description: "Please make reports first",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    }
    if (status === "Completed")
      return toast.error("Patient reports already completed", {
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    if (patient.lastDate) {
      setStatus(newStatus);
      onStatusChange(newStatus);
    }

    try {
      const res = await fetch(`/api/patientStatus/${patient._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok)
        toast.error(data.message, {
          description: data.error,
          style: { background: "#ff4d4f", color: "#ffffff" },
        });
      // console.log(data.patient.lastDate);

      toast.success("Status updated successfully", {
        description: data.message,
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
    } catch (err: any) {
      toast.error("Failed to update status", {
        description: err.message,
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
      console.error("Status update error:", err);
    }
  };

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 cursor-pointer border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent
        className="z-[9999] border border-[#42998d] rounded-md shadow-lg bg-white cursor-pointer"
        side="top">
        <CustomSelectItem value="Pending">Pending</CustomSelectItem>
        <CustomSelectItem value="Completed">Completed</CustomSelectItem>
        <CustomSelectItem value="Cancelled">Cancelled</CustomSelectItem>
      </SelectContent>
    </Select>
  );
};

// ? Custom Item with hover styling
function CustomSelectItem({
  children,
  value,
}: {
  children: string;
  value: string;
}) {
  return (
    <SelectItem
      value={value}
      className="hover:bg-[#42998d] hover:text-white cursor-pointer transition-colors rounded-md px-2 tracking-wide">
      {children}
    </SelectItem>
  );
}
