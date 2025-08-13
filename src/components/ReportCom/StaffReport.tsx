"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";

interface Patient {
  _id: string;
  patientId: string;
  patientName: string;
  age: string;
  gender: string;
  service: string;
  phone: string;
  status: "Pending" | "Completed";
  reportStatus: "pending" | "ready";
  payment: number;
  paymentStatus: "paid" | "unpaid";
  doctorName: string;
  reportUrl: string[];
  patientReport: {
    Scan: string;
    ClinicalHistory: string;
    Findings: string[];
    Impression: string[];
    ImageUrls: string[];
  };
}

export default function ReportTable() {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // ? Doctor Name update:-
  const [editing, setEditing] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/patientList");
        const json = await res.json();
        setData(json.patients);
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // ? Handle Edit Click For Doctor Name:-
  const handleEditClick = (id: string, currentValue: string) => {
    setEditing(id);
    setInputValue(currentValue || "");
  };

  // ? Handle Doctor Name Change:-
  const handleSaveClick = async (id: string) => {
    const trimmedName = inputValue.trim();

    if (trimmedName.length < 2) {
      toast.error("Doctor name is too short", {
        description: "Please enter at least 2 characters",
        style: { background: "#ef4444", color: "#ffffff" },
      });
      return;
    }

    const updated = [...data];
    const idx = data.findIndex((p) => p._id === id);
    updated[idx].doctorName = trimmedName;
    setData(updated);
    setEditing(false);

    try {
      await fetch("/api/update_doctor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, doctorName: trimmedName }),
      });

      toast.success("Doctor name updated", {
        description: "Saved successfully",
        style: { background: "#42998d", color: "#ffffff" },
      });
    } catch (error) {
      toast.error("Update failed", {
        description: "Try again later",
        style: { background: "#ef4444", color: "#ffffff" },
      });
    }
  };

  // ? Handle Payment Status Toggle:-
  const handleStatusToggle = async (index: number) => {
    const id = data[index]._id; // ? Get the ID of the patient
    const updated = [...data];
    const currentStatus = updated[index].paymentStatus;
    const newStatus = currentStatus === "paid" ? "unpaid" : "paid";

    // ? Optimistically update UI:-
    updated[index].paymentStatus = newStatus;
    setData(updated);

    // ? Update DB:-
    try {
      await fetch("/api/payment_status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          paymentStatus: newStatus,
        }),
      });
      toast.success("Payment Status updated", {
        description: "Payment marked.",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
    } catch (err) {
      console.error("Update failed:", err);
      // Optional rollback
      updated[index].paymentStatus = currentStatus;
      setData(updated);

      toast.error("Failed to update payment status", {
        description: "Failed to update payment status",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    }
  };

  // ? for full page loader:-
  useEffect(() => {
    // Simulate API call or data fetch
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader when data is ready
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Full page loading screen
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-1000">
        <div className="flex flex-col justify-center items-center gap-4">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 flex justify-center items-start">
      <div className="w-full border border-[#42998d] transition-colors">
        <CardContent className="p-0 overflow-hidden">
          <div className="relative w-full">
            <div
              className="w-full overflow-x-auto scrollbar-hide"
              id="table-wrapper">
              <table className="min-w-[700px] w-full table-fixed">
                <thead className="bg-[#0b968d] sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 w-[5%] text-left text-sm font-semibold text-white tracking-wide">
                      Sr.
                    </th>
                    <th className="w-[18%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Name
                    </th>
                    <th className="w-[10%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Age
                    </th>
                    <th className="w-[12%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Gender
                    </th>
                    <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Phone
                    </th>
                    <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Service
                    </th>
                    <th className="w-[15%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Payment
                    </th>
                    <th className="w-[15%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Doctor
                    </th>
                    <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                      Report
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm">
                  {
                    // ? Loading:-
                    loading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-6 text-center text-gray-500">
                          <Loading />
                        </td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-6 text-center text-gray-500">
                          <NoDataFound />
                        </td>
                      </tr>
                    ) : (
                      <AnimatePresence mode="sync">
                        {data.map((item, idx) => (
                          <motion.tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-3 text-gray-800 text-center tracking-wide truncate">
                              {item.patientName
                                ? item.patientName
                                    .trim()
                                    .split(" ")
                                    .filter(Boolean)
                                    .map(
                                      (w) =>
                                        w[0].toUpperCase() +
                                        w.slice(1).toLowerCase()
                                    )
                                    .join(" ")
                                : ""}
                            </td>
                            <td className="px-4 py-3 text-gray-700 text-center tracking-wide">
                              {item.age}
                            </td>
                            <td className="px-4 py-3 text-gray-700 text-center tracking-wide">
                              {item.gender}
                            </td>
                            <td className="px-4 py-3 text-gray-700 text-center tracking-wide">
                              {item.phone}
                            </td>
                            <td className="px-4 py-3 text-gray-700 truncate text-center tracking-wide">
                              {item.service}
                            </td>
                            {/* Payment Status */}
                            <td
                              className={`px-4 py-3 text-center cursor-pointer tracking-wide select-none ${
                                item.paymentStatus === "paid"
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                              onClick={() => handleStatusToggle(idx)}>
                              {item.paymentStatus}
                            </td>
                            {/* Doctor Name */}
                            <td className="px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                              {editing === item._id ? (
                                <div className="relative w-[120px]">
                                  <input
                                    type="text"
                                    name="doctorName"
                                    id="doctorName"
                                    value={inputValue}
                                    onChange={(e) =>
                                      setInputValue(e.target.value)
                                    }
                                    className="border border-[#c4e3df] rounded-md px-3 py-1 text-sm text-[#18564e] focus:outline-none w-full max-w-[120px] tracking-wide placeholder:tracking-wide"
                                    placeholder="Enter name"
                                    autoComplete="off"
                                  />
                                  {inputValue.length < 2 ? (
                                    <button
                                      onClick={() => setEditing(false)}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#18564e] hover:text-[#18564e]/80 cursor-pointer"
                                      title="Cancel">
                                      <X size={16} />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleSaveClick(item._id)}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800 cursor-pointer"
                                      title="Save">
                                      <Check size={16} />
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span
                                  onClick={() =>
                                    handleEditClick(item._id, item.doctorName)
                                  }
                                  className="cursor-pointer hover:underline text-sm">
                                  {item.doctorName || "Enter Name"}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-center tracking-wide">
                              {/* Report */}
                              <button
                                onClick={() => {
                                  const patientSlug =
                                    `${item.patientName}-report`.replace(
                                      /\s+/g,
                                      "-"
                                    );
                                  if (typeof window !== "undefined") {
                                    sessionStorage.setItem(
                                      "patient-phone",
                                      item.phone
                                    );
                                    sessionStorage.setItem(
                                      "patient-id",
                                      item._id
                                    );
                                  }
                                  router.push(`/reports/${patientSlug}`);
                                }}
                                className="text-[#06968d] underline transition cursor-pointer">
                                Make Report
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </div>
    </section>
  );
}
