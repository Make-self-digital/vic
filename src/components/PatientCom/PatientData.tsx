"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/LanguageContext";
import {
  IndianRupee,
  Users,
  CalendarCheck,
  ClipboardCheck,
  FileClock,
  ChevronUp,
  ChevronDown,
  FileCheck,
  Clock,
} from "lucide-react";

interface StatsData {
  statusCounts: Record<string, number>;
  reportCounts: Record<string, number>;
  paymentCounts: Record<string, number>;
  serviceCounts: Record<string, number>;
  totalRegisteredPatients: number;
  totalAppointments: number;
  totalPatients: number;
}

const PatientData = () => {
  const [stats, setStats] = useState<StatsData>({
    statusCounts: {},
    reportCounts: {},
    paymentCounts: {},
    serviceCounts: {},
    totalRegisteredPatients: 0,
    totalAppointments: 0,
    totalPatients: 0,
  });
  const [loading, setLoading] = useState(true);

  // Open and close dropdown:-
  const [open, setOpen] = useState(false);

  // language:-
  const { language } = useLanguage();

  // ? Fetch stats:-
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/patient-stats");
        const data = await res.json();
        if (data.status === "success") {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="border border-[#c4e3df] bg-none rounded-lg bg-white p-4">
        {/* Heading and hide and show icon */}
        <div className="flex items-center justify-between">
          {/* Heading */}
          <h2
            className={`text-xl ${
              open ? "mb-6" : "mb-0"
            } font-bold text-[#1e4d4f] tracking-wide`}
            title={language === "english" ? "Patient Stats" : "मरीज के आँकड़े"}>
            <span className="border-b-2 border-[#18564e] inline-block pb-1">
              {language === "english" ? "Patient Stats" : "मरीज के आँकड़े"}
            </span>
          </h2>
          {/* hide and show icon */}
          <div
            onClick={() => setOpen(!open)}
            className={`${
              open ? "mb-6" : "mb-0"
            } cursor-pointer rounded-full p-1 bg-[#0b968d] hover:bg-[#097c74] transition-colors duration-200`}>
            {open ? (
              <ChevronUp className="w-5 h-5 text-[#fff] transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#fff] transition-transform duration-300" />
            )}
          </div>
        </div>

        {/* Conditional rendering based on open state */}
        {open && (
          <div>
            {/* Top dashboard Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total registered patients */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <Users className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Registered Patients"
                      : "कुल रजिस्टर मरीज"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.totalRegisteredPatients}
                  </p>
                </div>
              </div>

              {/* Total Appointments */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <CalendarCheck className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Appointments"
                      : "कुल अपॉइंटमेंट"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.totalAppointments}
                  </p>
                </div>
              </div>

              {/* Total Completed Reports */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <ClipboardCheck className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Completed Reports"
                      : "कुल पूर्ण रिपोर्ट्स"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.statusCounts.Completed}
                  </p>
                </div>
              </div>

              {/* Total Pending Reports */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <FileClock className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Pending Reports"
                      : "कुल लंबित रिपोर्ट्स"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.statusCounts.Pending}
                  </p>
                </div>
              </div>

              {/* Total Paid */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <IndianRupee className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Paid Patient"
                      : "कुल भुगतान मरीज"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.paymentCounts.paid}
                  </p>
                </div>
              </div>

              {/* Total Unpaid */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <IndianRupee className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Unpaid Patient"
                      : "कुल बिना भुगतान वाले मरीज"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.paymentCounts.unpaid}
                  </p>
                </div>
              </div>

              {/* Total Ready Report */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <FileCheck className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Ready Report"
                      : "कुल तैयार रिपोर्ट"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.reportCounts.ready}
                  </p>
                </div>
              </div>

              {/* Total Pending Report */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4">
                <Clock className="w-6 h-6 text-[#18564e]" />
                <div>
                  <p className="text-sm text-gray-600 tracking-wide">
                    {language === "english"
                      ? "Total Pending Report"
                      : "कुल लंबित रिपोर्ट"}
                  </p>
                  <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                    {stats.reportCounts.pending}
                  </p>
                </div>
              </div>
            </div>

            {/* Service-wise Revenue Breakdown */}
            <div className="mt-6">
              {/* heading */}
              <h2
                className="text-xl mb-6 font-bold text-[#1e4d4f] tracking-wide"
                title={
                  language === "english"
                    ? "Service Stats"
                    : "सेवा के अनुसार आँकड़े"
                }>
                <span className="border-b-2 border-[#18564e] inline-block pb-1">
                  {language === "english"
                    ? "Service Stats"
                    : "सेवा के अनुसार आँकड़े"}
                </span>
              </h2>

              {/* content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Diagnostic Ultrasound */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english"
                        ? "Diagnostic Ultrasound"
                        : "निदानात्मक अल्ट्रासाउंड"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["Diagnostic Ultrasound"]}
                  </p>
                </div>

                {/* Whole Abdomen Scan */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english"
                        ? "Whole Abdomen Scan"
                        : "संपूर्ण पेट का स्कैन"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["Whole Abdomen Scan"]}
                  </p>
                </div>

                {/* Color Doppler */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english" ? "Color Doppler" : "कॉलर डॉप्पर"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["Color Doppler"]}
                  </p>
                </div>

                {/* Pregnancy Ultrasound */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english"
                        ? "Pregnancy Ultrasound"
                        : "गर्भावस्था अल्ट्रासाउंड"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["Pregnancy Ultrasound"]}
                  </p>
                </div>

                {/* USG-Guided Procedures */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english"
                        ? "USG-Guided Procedures"
                        : "यूएसजी-निर्देशित प्रक्रियाएं"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["USG-Guided Procedures"]}
                  </p>
                </div>

                {/* Musculoskeletal Scan */}
                <div className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-700 tracking-wide">
                      {language === "english"
                        ? "Musculoskeletal Scan"
                        : "मस्कुलोस्केलेट स्कैन"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                    {stats.serviceCounts["Musculoskeletal Scan"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientData;
