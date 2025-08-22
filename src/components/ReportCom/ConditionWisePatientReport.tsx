"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PatientStatus = "Pending" | "Completed" | "Cancelled";

interface Patient {
  _id: string;
  patientId: string;
  patientName: string;
  age: string;
  gender: string;
  service: string;
  phone: string;
  status: PatientStatus;
  bookingCount: number;
  lastDate: string;
  reportStatus: "pending" | "ready";
  payment: number;
  paymentStatus: "paid" | "unpaid";
  createdAt: string;
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

export default function ConditionWisePatientReport({
  patients,
  setPatients,
}: {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  // 🔽open sections state:-
  const [openSections, setOpenSections] = useState({
    today: true,
    yesterday: false,
    all: false,
  });

  // ? Doctor Name update:-
  const [editing, setEditing] = useState<string | false>(false);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ek page me kitne rows chahiye

  // auth:-
  const { role } = useAuth();

  // language:-
  const { language } = useLanguage();

  // ? Handle Edit Click For Doctor Name:-
  const handleEditClick = (id: string, currentValue: string) => {
    const updated = [...patients];
    const idx = patients.findIndex((p) => p._id === id);
    if (idx === -1) return;
    if (updated[idx].paymentStatus === "paid") {
      setEditing(id);
      setInputValue(currentValue || "");
    } else {
      return toast.info(
        language === "english" ? "Payment pending" : "भुगतान नहीं हुआ है।",
        {
          description:
            language === "english"
              ? "Please pay first"
              : "कृपया पहले भुगतान करें",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }

    if (currentValue !== "") {
      setEditing(false);
      return toast.info(
        language === "english"
          ? "Doctor’s name cannot be edited"
          : "डॉक्टर का नाम बदला नहीं जा सकता।",
        {
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }
  };

  // ? Handle Doctor Name Change:-
  const handleSaveClick = async (id: string) => {
    const trimmedName = inputValue.trim();

    if (trimmedName.length < 2) {
      toast.error(
        language === "english"
          ? "Doctor name is too short"
          : "डॉक्टर का नाम बहुत छोटा है",
        {
          description:
            language === "english"
              ? "Please enter at least 2 characters"
              : "कृपया कम से कम 2 अक्षर दर्ज करें",
          style: { background: "#ef4444", color: "#ffffff" },
        }
      );
      return;
    }

    const updated = [...patients];
    const idx = patients.findIndex((p) => p._id === id);
    updated[idx].doctorName = trimmedName;
    setPatients(updated);
    setEditing(false);

    try {
      await fetch("/api/update_doctor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, doctorName: trimmedName }),
      });

      toast.success(
        language === "english"
          ? "Doctor name updated"
          : "डॉक्टर का नाम अपडेट हुआ",
        {
          description:
            language === "english"
              ? "Saved successfully"
              : "सफलतापूर्वक सेव हुआ",
          style: { background: "#42998d", color: "#ffffff" },
        }
      );
    } catch (error) {
      toast.error(language === "english" ? "Update failed" : "अपडेट असफल हुआ", {
        description:
          language === "english"
            ? "Try again later"
            : "बाद में पुनः प्रयास करें",
        style: { background: "#ef4444", color: "#ffffff" },
      });
    }
  };

  // ? Handle Payment Status Toggle:-
  const handleStatusToggle = async (id: string) => {
    const updated = [...patients];
    const index = updated.findIndex((p) => p._id === id);
    if (index === -1) return;

    const currentStatus = updated[index].paymentStatus;
    const newStatus = currentStatus === "paid" ? "unpaid" : "paid";

    if (newStatus === "unpaid") {
      return toast.info(
        language === "english"
          ? "Patient already paid"
          : "मरीज पहले ही भुगतान किया है",
        {
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }

    // UI update
    updated[index].paymentStatus = newStatus;
    setPatients(updated);

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
      toast.success(
        language === "english"
          ? "Payment Status updated"
          : "भुगतान स्थिति अपडेट की गई",
        {
          description:
            language === "english"
              ? "Payment marked."
              : "भुगतान चिन्हित कर दिया गया।",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        }
      );
    } catch (err) {
      console.error("Update failed:", err);
      // Optional rollback
      updated[index].paymentStatus = currentStatus;
      setPatients(updated);

      toast.error(
        language === "english"
          ? "Failed to update payment status"
          : "भुगतान स्थिति अपडेट करने में विफल",
        {
          description:
            language === "english"
              ? "Failed to update payment status"
              : "भुगतान स्थिति अपडेट करने में विफल।",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    }
  };

  // 🗓️ Utility for date comparison
  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (dateStr: string) => {
    const d = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear()
    );
  };

  // 🧮 Categorize patients
  const { todayPatients, yesterdayPatients, otherPatients } = useMemo(() => {
    const today: Patient[] = [];
    const yesterday: Patient[] = [];
    const others: Patient[] = [];

    patients.forEach((p) => {
      if (isToday(p.createdAt)) today.push(p);
      else if (isYesterday(p.createdAt)) yesterday.push(p);
      else others.push(p);
    });

    return {
      todayPatients: today,
      yesterdayPatients: yesterday,
      otherPatients: others,
    };
  }, [patients]);

  // 🔽 Toggle handler
  const toggleSection = (key: "today" | "yesterday" | "all") => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // paginated nikalo:-
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = otherPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(otherPatients.length / itemsPerPage);

  return (
    <>
      <table className="min-w-[700px] w-full table-fixed">
        <thead className="bg-[#0b968d] sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 w-[10%] text-center text-sm font-semibold text-white tracking-wide">
              {language === "english" ? "Sr." : "क्रमांक"}
            </th>
            <th className="w-[18%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Name" : "मरीज का नाम"}
            </th>
            <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Report Status" : "रिपोर्ट स्थिति"}
            </th>
            <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Services" : "सेवाएं"}
            </th>
            <th className="w-[15%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Payment" : "भुगतान"}
            </th>
            <th className="w-[15%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Doctor" : "डॉक्टर का नाम"}
            </th>
            <th className="w-[20%] px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
              {language === "english" ? "Report" : "रिपोर्ट"}
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100 text-sm">
          {/* Today Row */}
          <tr
            onClick={() => toggleSection("today")}
            className="cursor-pointer bg-white hover:bg-gray-100">
            <td colSpan={role !== "patient" ? 8 : 7} className="px-4 py-3">
              <div className="flex items-center justify-center gap-2 font-bold text-[#1e4d4f] text-sm tracking-wide">
                <span>
                  {language === "english" ? "Today’s Patients" : "आज के मरीज"} (
                  {todayPatients.length})
                </span>
                {openSections.today ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </td>
          </tr>

          {/* Today Patients */}
          <AnimatePresence mode="sync">
            {openSections.today &&
              todayPatients.map((item, idx) => (
                <motion.tr
                  key={idx}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-center tracking-wide truncate">
                    {item.patientName
                      ? item.patientName
                          .trim()
                          .split(" ")
                          .filter(Boolean)
                          .map(
                            (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : ""}
                  </td>
                  {/* Report Status */}
                  <td
                    className={`px-4 py-3 text-center tracking-wide ${
                      item.reportStatus === "pending"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}>
                    {item.reportStatus
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
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
                    onClick={() => handleStatusToggle(item._id)}>
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
                          onChange={(e) => setInputValue(e.target.value)}
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
                  {/* Make Report */}
                  <td className="px-4 py-3 text-center tracking-wide">
                    <button
                      onClick={() => {
                        if (
                          item.paymentStatus === "paid" &&
                          item.doctorName !== ""
                        ) {
                          const patientSlug =
                            `${item.patientName}-report`.replace(/\s+/g, "-");
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("patient-phone", item.phone);
                            sessionStorage.setItem("patient-id", item._id);
                          }
                          router.push(`/reports/${patientSlug}`);
                        } else {
                          return toast.info(
                            language === "english"
                              ? "Payment and Doctor’s name are required to create the report."
                              : "रिपोर्ट बनाने के लिए पेमेंट और डॉक्टर का नाम ज़रूरी है।",
                            {
                              style: {
                                background: "#ff4d4f",
                                color: "#ffffff",
                              },
                            }
                          );
                        }
                      }}
                      className="text-[#06968d] underline transition cursor-pointer">
                      Make Report
                    </button>
                  </td>
                </motion.tr>
              ))}
          </AnimatePresence>

          {/* Yesterday Row */}
          <tr
            onClick={() => toggleSection("yesterday")}
            className="cursor-pointer bg-white hover:bg-gray-100">
            <td colSpan={role !== "patient" ? 8 : 7} className="px-4 py-3">
              <div className="flex items-center justify-center gap-2 font-bold text-[#1e4d4f] text-sm tracking-wide">
                <span>
                  {language === "english"
                    ? "Yesterday’s Patients"
                    : "कल के मरीज"}
                  ({yesterdayPatients.length})
                </span>
                {openSections.yesterday ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </td>
          </tr>

          {/* Yesterday Patients */}
          <AnimatePresence mode="sync">
            {openSections.yesterday &&
              yesterdayPatients.map((item, idx) => (
                <motion.tr
                  key={idx}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-center tracking-wide truncate">
                    {item.patientName
                      ? item.patientName
                          .trim()
                          .split(" ")
                          .filter(Boolean)
                          .map(
                            (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : ""}
                  </td>
                  {/* Report Status */}
                  <td
                    className={`px-4 py-3 text-center tracking-wide ${
                      item.reportStatus === "pending"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}>
                    {item.reportStatus
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
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
                    onClick={() => handleStatusToggle(item._id)}>
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
                          onChange={(e) => setInputValue(e.target.value)}
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
                  {/* Make Report */}
                  <td className="px-4 py-3 text-center tracking-wide">
                    <button
                      onClick={() => {
                        if (
                          item.paymentStatus === "paid" &&
                          item.doctorName !== ""
                        ) {
                          const patientSlug =
                            `${item.patientName}-report`.replace(/\s+/g, "-");
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("patient-phone", item.phone);
                            sessionStorage.setItem("patient-id", item._id);
                          }
                          router.push(`/reports/${patientSlug}`);
                        } else {
                          return toast.info(
                            language === "english"
                              ? "Payment and Doctor’s name are required to create the report."
                              : "रिपोर्ट बनाने के लिए पेमेंट और डॉक्टर का नाम ज़रूरी है।",
                            {
                              style: {
                                background: "#ff4d4f",
                                color: "#ffffff",
                              },
                            }
                          );
                        }
                      }}
                      className="text-[#06968d] underline transition cursor-pointer">
                      Make Report
                    </button>
                  </td>
                </motion.tr>
              ))}
          </AnimatePresence>

          {/* All Patients Row */}
          <tr
            onClick={() => toggleSection("all")}
            className="cursor-pointer bg-white hover:bg-gray-100">
            <td colSpan={role !== "patient" ? 8 : 7} className="px-4 py-3">
              <div className="flex items-center justify-center gap-2 font-bold text-[#1e4d4f] text-sm tracking-wide">
                <span>
                  {language === "english"
                    ? "All Other Patients"
                    : "अन्य सभी मरीज"}
                  ({otherPatients.length})
                </span>
                {openSections.all ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </td>
          </tr>

          {/* All Patients */}
          <AnimatePresence mode="sync">
            {openSections.all &&
              currentPatients.map((item, idx) => (
                <motion.tr
                  key={idx}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center text-gray-700">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-center tracking-wide truncate">
                    {item.patientName
                      ? item.patientName
                          .trim()
                          .split(" ")
                          .filter(Boolean)
                          .map(
                            (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : ""}
                  </td>
                  {/* Report Status */}
                  <td
                    className={`px-4 py-3 text-center tracking-wide ${
                      item.reportStatus === "pending"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}>
                    {item.reportStatus
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
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
                    onClick={() => handleStatusToggle(item._id)}>
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
                          onChange={(e) => setInputValue(e.target.value)}
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
                  {/* Make Report */}
                  <td className="px-4 py-3 text-center tracking-wide">
                    <button
                      onClick={() => {
                        if (
                          item.paymentStatus === "paid" &&
                          item.doctorName !== ""
                        ) {
                          const patientSlug =
                            `${item.patientName}-report`.replace(/\s+/g, "-");
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("patient-phone", item.phone);
                            sessionStorage.setItem("patient-id", item._id);
                          }
                          router.push(`/reports/${patientSlug}`);
                        } else {
                          return toast.info(
                            language === "english"
                              ? "Payment and Doctor’s name are required to create the report."
                              : "रिपोर्ट बनाने के लिए पेमेंट और डॉक्टर का नाम ज़रूरी है।",
                            {
                              style: {
                                background: "#ff4d4f",
                                color: "#ffffff",
                              },
                            }
                          );
                        }
                      }}
                      className="text-[#06968d] underline transition cursor-pointer">
                      Make Report
                    </button>
                  </td>
                </motion.tr>
              ))}
          </AnimatePresence>

          {/* 🔹 Pagination Row */}
          {openSections.all && totalPages > 1 && (
            <tr>
              <td colSpan={role !== "patient" ? 8 : 7} className="px-4 py-3">
                <div className="flex justify-center items-center gap-3 py-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer tracking-wide text-gray-600 font-semibold">
                    {language === "english" ? "Prev" : "पीछे"}
                  </button>
                  <span className="text-sm font-semibold text-gray-600">
                    {language === "english" ? "Page" : "पेज"} {currentPage}{" "}
                    {language === "english" ? "of" : "का"} {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-gray-600 font-semibold tracking-wide cursor-pointer">
                    {language === "english" ? "Next" : "आगे"}
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
