"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/LanguageContext";
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

  // language:-
  const { language } = useLanguage();

  // ? Handle status change:-
  const handleChange = async (
    newStatus: "Pending" | "Completed" | "Cancelled"
  ) => {
    if (!patient.lastDate) {
      return toast.info(
        language === "english"
          ? "Patient reports not found"
          : "मरीज की रिपोर्ट नहीं मिली",
        {
          description:
            language === "english"
              ? "Please make reports first"
              : "कृपया पहले रिपोर्ट बनाएँ",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }

    if (status === "Completed") {
      return toast.error(
        language === "english"
          ? "Patient reports already completed"
          : "मरीज की रिपोर्ट पहले ही पूरी हो चुकी है",
        {
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }

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

      toast.success(
        language === "english"
          ? "Status updated successfully"
          : "स्थिति सफलतापूर्वक अपडेट हो गई",
        {
          description:
            language === "english"
              ? data?.message || "The status has been changed."
              : data?.message || "स्थिति बदल दी गई है।",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        }
      );
    } catch (err: any) {
      toast.error(
        language === "english"
          ? "Failed to update status"
          : "स्थिति अपडेट करने में विफल",
        {
          description:
            language === "english"
              ? err?.message || "Something went wrong"
              : err?.message || "कुछ गलत हो गया",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
            borderRadius: "8px",
            fontWeight: "500",
          },
        }
      );
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
