"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { StatusDropdown } from "./SelectStatus";

type PatientStatus = "Pending" | "Completed" | "Cancelled";

interface Patient {
  _id: string;
  patientName: string;
  service: string;
  phone: string;
  bookingCount: number;
  createdAt: string;
  status: PatientStatus;
  lastDate: string;
}

const getStatusColor = (status: Patient["status"]) => {
  switch (status) {
    case "Completed":
      return "text-green-600";
    case "Pending":
      return "text-yellow-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "";
  }
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function ConditionWisePatient({
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ek page me kitne rows chahiye

  // auth:-
  const { role } = useAuth();

  // language:-
  const { language } = useLanguage();

  // ? Update status locally after backend update
  const handleStatusUpdate = (id: string, newStatus: PatientStatus) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient._id === id ? { ...patient, status: newStatus } : patient
      )
    );
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
    <table className="w-full min-w-[700px] table-fixed">
      <thead className="bg-[#0b968d] sticky top-0 z-10">
        <tr>
          <th className="w-18 px-4 py-3 text-left text-sm font-semibold text-white tracking-wide">
            {language === "english" ? "Sr." : "क्रमांक"}
          </th>
          <th className="w-40 px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
            {language === "english" ? "Patient Name" : "मरीज का नाम"}
          </th>
          <th className="w-48 px-4 py-3 text-sm font-semibold text-white text-center truncate tracking-wide">
            {language === "english" ? "Services" : "सेवाएं"}
          </th>
          <th className="w-28 px-4 py-3 text-sm font-semibold text-white text-center tracking-wide">
            {language === "english" ? "Count" : "काउंट"}
          </th>
          {role !== "patient" && (
            <th className="w-40 px-4 py-3 text-sm font-semibold text-white text-center tracking-wide">
              {language === "english" ? "Phone" : "फोन नंबर"}
            </th>
          )}
          <th className="w-40 px-4 py-3 text-center text-sm font-semibold text-white tracking-wide">
            {language === "english" ? "Date" : "तारीख़"}
          </th>
          <th className="w-32 px-4 py-3 text-center text-sm font-semibold text-white tracking-wide">
            {language === "english" ? "Time" : "समय"}
          </th>
          <th className="w-40 px-4 py-3 text-center text-sm font-semibold text-white tracking-wide">
            {language === "english" ? "Status" : "स्थिति"}
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
            todayPatients.map((p, idx) => (
              <motion.tr
                key={p._id}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50">
                <td className="w-10 px-4 py-3">{idx + 1}</td>
                <td className="w-40 px-4 py-3 text-gray-800 text-center tracking-wide">
                  {p.patientName
                    ? p.patientName
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .map(
                          (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : ""}
                </td>
                <td className="w-48 px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                  {p.service}
                </td>
                <td className="w-40 px-4 text-center py-3 text-gray-700">
                  {p.bookingCount}
                </td>
                {role !== "patient" && (
                  <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                    {p.phone}
                  </td>
                )}
                <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatDate(p.createdAt)}
                </td>
                <td className="w-32 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatTime(p.createdAt)}
                </td>
                <td className="w-40 px-4 py-3 text-center tracking-wide">
                  {role === "admin" || role === "staff" ? (
                    <StatusDropdown
                      patient={p}
                      onStatusChange={(newStatus) =>
                        handleStatusUpdate(p._id, newStatus)
                      }
                    />
                  ) : (
                    <Badge
                      variant="outline"
                      className={getStatusColor(p.status)}>
                      {p.status}
                    </Badge>
                  )}
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
                {language === "english" ? "Yesterday’s Patients" : "कल के मरीज"}
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

        <AnimatePresence mode="sync">
          {openSections.yesterday &&
            yesterdayPatients.map((p, idx) => (
              <motion.tr
                key={p._id}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50">
                <td className="w-10 px-4 py-3">{idx + 1}</td>
                <td className="w-40 px-4 py-3 text-gray-800 text-center tracking-wide">
                  {p.patientName
                    ? p.patientName
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .map(
                          (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : ""}
                </td>
                <td className="w-48 px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                  {p.service}
                </td>
                <td className="w-40 px-4 text-center py-3 text-gray-700">
                  {p.bookingCount}
                </td>
                {role !== "patient" && (
                  <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                    {p.phone}
                  </td>
                )}
                <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatDate(p.createdAt)}
                </td>
                <td className="w-32 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatTime(p.createdAt)}
                </td>
                <td className="w-40 px-4 py-3 text-center tracking-wide">
                  {role === "admin" || role === "staff" ? (
                    <StatusDropdown
                      patient={p}
                      onStatusChange={(newStatus) =>
                        handleStatusUpdate(p._id, newStatus)
                      }
                    />
                  ) : (
                    <Badge
                      variant="outline"
                      className={getStatusColor(p.status)}>
                      {p.status}
                    </Badge>
                  )}
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

        <AnimatePresence mode="sync">
          {openSections.all &&
            currentPatients.map((p, idx) => (
              <motion.tr
                key={p._id}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50">
                <td className="w-10 px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                <td className="w-40 px-4 py-3 text-gray-800 text-center tracking-wide">
                  {p.patientName
                    ? p.patientName
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .map(
                          (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : ""}
                </td>
                <td className="w-48 px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                  {p.service}
                </td>
                <td className="w-40 px-4 text-center py-3 text-gray-700">
                  {p.bookingCount}
                </td>
                {role !== "patient" && (
                  <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                    {p.phone}
                  </td>
                )}
                <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatDate(p.createdAt)}
                </td>
                <td className="w-32 px-4 py-3 text-center text-gray-700 tracking-wide">
                  {formatTime(p.createdAt)}
                </td>
                <td className="w-40 px-4 py-3 text-center tracking-wide">
                  {role === "admin" || role === "staff" ? (
                    <StatusDropdown
                      patient={p}
                      onStatusChange={(newStatus) =>
                        handleStatusUpdate(p._id, newStatus)
                      }
                    />
                  ) : (
                    <Badge
                      variant="outline"
                      className={getStatusColor(p.status)}>
                      {p.status}
                    </Badge>
                  )}
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
  );
}
