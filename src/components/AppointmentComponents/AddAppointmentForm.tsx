"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2, Clock, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicePrices } from "@/constants/servicePrices";
import { toast } from "sonner";

interface LoginPatientData {
  _id: string;
  patientName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface FormData {
  name: string;
  phone: string;
  age: string;
  gender: string;
  service: string;
  notes: string;
}

export default function AddAppointmentForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [payment, setPayment] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    gender: "",
    service: "",
    notes: "",
  });
  const [loginPatient, setLoginPatient] = useState<LoginPatientData | null>(
    null
  );

  // ? get login patient:-
  useEffect(() => {
    const storedPatient = localStorage.getItem("login_patient");
    if (storedPatient) {
      const parsedPatient = JSON.parse(storedPatient);
      setLoginPatient(parsedPatient);
      setFormData({
        ...formData,
        name: parsedPatient.patientName,
        phone: parsedPatient.phone,
      });
    }
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  function formatDate(date?: Date): string {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }); // e.g., "Aug"
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // ? for the patient notifications:-
  const createPatientNotification = async (
    patientId: string,
    type: string,
    title: string,
    message: string,
    url: string
  ) => {
    try {
      const res = await fetch("/api/patientNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          type,
          title,
          message,
          url,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Notification Created:", data.data);
      } else {
        console.error("Error creating notification:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let patientId = "";
    if (loginPatient) {
      patientId = loginPatient._id;
    }

    const formattedDate = date ? formatDate(date) : "";

    try {
      // * real-time timestamp
      const bookedAt = new Date();

      // * format into readable time: "hh:mm a"
      const bookingTime = format(bookedAt, "hh:mm a");

      const response = await fetch("/api/create_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          formData,
          formattedDate,
          time,
          bookingTime,
          payment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Booking failed", {
          description: errorData.error,
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
        throw new Error(errorData.error || "Booking failed");
      }

      const result = await response.json();
      toast.success("Appointment booked successfully", {
        description: `Booking ID: ${result._id}`,
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
      // invoke patient notifications:-
      await createPatientNotification(
        patientId,
        "appointment_confirmation",
        "Appointment",
        `Your appointment for ${formattedDate} at ${time} has been booked successfully`,
        `/dashboard/appointments`
      );
    } catch (error: any) {
      console.error("Error booking appointment:", error.message);
      toast.error("Error booking appointment", {
        description: error.message,
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
      // Optionally show error toast
    } finally {
      setIsLoading(false);

      // * clear form fields
      if (loginPatient) {
        setFormData({
          name: loginPatient?.patientName,
          phone: loginPatient?.phone,
          age: "",
          gender: "",
          service: "",
          notes: "",
        });
      }
      setPayment(null);
      setTime("");
      setDate(new Date());
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, service: value });
    setPayment(servicePrices[value]);
  };

  const timeOptions = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#f9fafb] px-6 py-8 rounded-xl space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-black font-medium">
          Patient Name
        </Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")}
          onChange={handleChange}
          placeholder="Enter full name"
          className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
          required
          readOnly
          autoComplete="off"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-black font-medium">
          Phone Number
        </Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={(e) => {
            let input = e.target.value.replace(/\s+/g, "");
            if (/^\d*$/.test(input) && input.length <= 10) {
              setFormData((prev) => ({
                ...prev,
                phone: input,
              }));
            }
          }}
          placeholder="Enter phone number"
          className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
          required
          readOnly
          autoComplete="off"
        />
      </div>

      {/* Patient age */}
      <div>
        <Label htmlFor="age" className="text-sm font-medium text-gray-800">
          Patient Age
        </Label>
        <Input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          placeholder="Patient Age"
          autoComplete="off"
          className="text-sm mt-1 p-5 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label className="text-black font-medium">Select Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={handleGenderChange}
          required>
          <SelectTrigger className="border-gray-300 p-5 pl-3 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
            <SelectValue placeholder="Choose a gender" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 shadow-md z-[100]">
            {["Male", "Female", "Other"].map((item) => (
              <CustomSelectItem key={item} value={item}>
                {item}
              </CustomSelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Service */}
      <div className="space-y-2">
        <Label className="text-black font-medium">Select Service</Label>
        <Select
          value={formData.service}
          onValueChange={handleSelectChange}
          required>
          <SelectTrigger className="border-gray-300 p-5 pl-3 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 shadow-md z-[100]">
            {Object.keys(servicePrices).map((item) => (
              <CustomSelectItem key={item} value={item}>
                {item}
              </CustomSelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="space-y-2">
        <Label className="text-black font-medium">Select Date</Label>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-full justify-start text-left font-normal p-5 pl-3 border-gray-300 cursor-pointer",
                !date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4 text-[#42998d]" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[100] w-auto p-0 mt-2 bg-[#f9fafb] border border-[#42998d] rounded-md shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect} // 👈 custom handler
              className={cn(
                // Selected date style
                "[&_.rdp-day_selected]:bg-[#18564e]",
                "[&_.rdp-day_selected]:text-white",

                // Hover style
                "[&_.rdp-day:hover]:bg-[#cceee8]",
                "[&_.rdp-day:hover]:cursor-pointer",

                // Transition and rounding
                "[&_.rdp-day]:transition-all",
                "[&_.rdp-day]:rounded-md",

                // Full focus/active/visible reset (👇 ye most important hain)
                "[&_.rdp-day]:outline-none",
                "[&_.rdp-day]:ring-0",
                "[&_.rdp-day]:border-none",
                "[&_.rdp-day]:shadow-none",
                "[&_.rdp-day]:focus:outline-none",
                "[&_.rdp-day]:focus:ring-0",
                "[&_.rdp-day]:focus:border-none",
                "[&_.rdp-day]:focus:shadow-none",
                "[&_.rdp-day]:focus-visible:outline-none",
                "[&_.rdp-day]:focus-visible:ring-0",
                "[&_.rdp-day]:focus-visible:border-none",
                "[&_.rdp-day]:focus-visible:shadow-none",
                "[&_.rdp-day]:active:outline-none",
                "[&_.rdp-day]:active:ring-0",
                "[&_.rdp-day]:active:border-none",
                "[&_.rdp-day]:active:shadow-none"
              )}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="space-y-2">
        <Label className="text-black font-medium">Select Time</Label>
        <Select value={time} onValueChange={setTime} required>
          <SelectTrigger className="w-full border-gray-300 p-5 pl-3 cursor-pointer">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent
            className="bg-white z-[100] max-h-48 w-60 overflow-y-auto rounded-md border-gray-300"
            align="start">
            {timeOptions.map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="hover:bg-[#e6f4f3] cursor-pointer text-sm px-3 py-1.5 rounded-md">
                <Clock className="w-4 h-4 mr-2 text-[#42998d]" />
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-black font-medium">
          Notes
        </Label>
        <Textarea
          itemType="text"
          id="notes"
          name="notes"
          value={formData.notes}
          className="resize-none overflow-hidden text-sm mt-1 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
          onChange={handleChange}
          placeholder="Add any notes here..."
          autoComplete="off"
        />
      </div>

      {/* Payment UI */}
      <div className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-3">
        <div className="text-sm font-semibold text-black">Payment</div>

        <div className="flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full border border-gray-600 text-gray-600 bg-gray-50">
          <IndianRupee className="w-4 h-4" />
          {typeof payment === "number" && payment}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-[#42998d] hover:bg-[#357e73] text-white text-base font-semibold cursor-pointer"
        disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" /> Booking...
          </span>
        ) : (
          "Book Appointment"
        )}
      </Button>
    </form>
  );
}

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
      className="hover:bg-[#02998d] hover:text-white cursor-pointer transition-colors rounded-md px-2">
      {children}
    </SelectItem>
  );
}
