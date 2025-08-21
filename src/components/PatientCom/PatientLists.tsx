"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { StatusDropdown } from "./SelectStatus";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";
import { useLanguage } from "@/hooks/LanguageContext";
import PatientData from "./PatientData";

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

const PatientTable = ({
  filters,
}: {
  filters: { category: string; subCategory: string; search: string };
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);

  // language:-
  const { language } = useLanguage();

  // ? Fetch patients list
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        let url = "/api/patientList";
        const params = new URLSearchParams();

        if (filters.category) params.append("category", filters.category);
        if (filters.subCategory)
          params.append("subCategory", filters.subCategory);
        if (filters.search) params.append("search", filters.search);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setPatients(data.patients);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [filters]);

  // ? Update status locally after backend update
  const handleStatusUpdate = (id: string, newStatus: PatientStatus) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient._id === id ? { ...patient, status: newStatus } : patient
      )
    );
  };

  // ? handle print:
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
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

  // ? Full page loading screen:-
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-1000">
        <div className="flex flex-col justify-center items-center gap-4">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Patient data */}
      {role !== "patient" && (
        <div className="mb-7">
          <PatientData />
        </div>
      )}

      {/* Patient list */}
      <div ref={printRef} id="printable-report">
        <section className="w-full flex justify-center items-start">
          <div className="w-full border border-[#c4e3df] transition-colors">
            <CardContent className="p-0 overflow-hidden">
              <div className="relative w-full">
                {/* Horizontal Scroll Wrapper */}
                <div
                  className="w-full overflow-x-auto scrollbar-hide group relative"
                  onScroll={(e) => {
                    const shadow = document.getElementById("scroll-shadow");
                    if (!shadow) return;
                    shadow.style.opacity =
                      e.currentTarget.scrollLeft > 0 ? "1" : "0";
                  }}>
                  {/* Table including both thead and tbody */}
                  <table className="min-w-[700px] w-full table-fixed">
                    <thead className="bg-[#0b968d] sticky top-0 z-10">
                      <tr>
                        <th className="w-18 px-4 py-3 text-left text-sm font-semibold text-white tracking-wide">
                          {language === "english" ? "Sr." : "क्रमांक"}
                        </th>
                        <th className="w-40 px-4 py-3 text-center text-sm font-semibold text-white truncate tracking-wide">
                          {language === "english"
                            ? "Patient Name"
                            : "मरीज का नाम"}
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
                      {loading ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-6 text-center text-gray-500">
                            <Loading />
                          </td>
                        </tr>
                      ) : patients.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="py-6 text-center text-gray-500">
                            <NoDataFound />
                          </td>
                        </tr>
                      ) : (
                        <AnimatePresence mode="sync">
                          {patients.map((patient, idx) => (
                            <motion.tr
                              key={patient._id}
                              layout="position"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50">
                              <td className="w-10 px-4 py-3">{idx + 1}</td>
                              <td className="w-40 px-4 py-3 text-gray-800 text-center tracking-wide">
                                {patient.patientName
                                  ? patient.patientName
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
                              <td className="w-48 px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                                {patient.service}
                              </td>
                              <td className="w-40 px-4 text-center py-3 text-gray-700">
                                {patient.bookingCount}
                              </td>
                              {role !== "patient" && (
                                <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                                  {patient.phone}
                                </td>
                              )}
                              <td className="w-40 px-4 py-3 text-center text-gray-700 tracking-wide">
                                {formatDate(patient.createdAt)}
                              </td>

                              <td className="w-32 px-4 py-3 text-center text-gray-700 tracking-wide">
                                {formatTime(patient.createdAt)}
                              </td>
                              <td className="w-40 px-4 py-3 text-center tracking-wide">
                                {role === "admin" || role === "staff" ? (
                                  <StatusDropdown
                                    patient={patient}
                                    onStatusChange={(newStatus) =>
                                      handleStatusUpdate(patient._id, newStatus)
                                    }
                                  />
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className={getStatusColor(patient.status)}>
                                    {patient.status}
                                  </Badge>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </div>
        </section>
      </div>

      {/* PRINT */}
      {role !== "patient" && (
        <div className="flex justify-center mt-4 ">
          <button
            onClick={handlePrint}
            className="px-3 py-1 bg-[#0b968d] text-white font-semibold rounded-sm hover:bg-[#097c74] transition text-sm cursor-pointer tracking-wide">
            {language === "english" ? "Print" : "प्रिंट"}
          </button>
        </div>
      )}
    </>
  );
};

export default PatientTable;
