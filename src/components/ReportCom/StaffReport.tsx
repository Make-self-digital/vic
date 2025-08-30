"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";
import ConditionWisePatientReport from "./ConditionWisePatientReport";
import { useLanguage } from "@/hooks/LanguageContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type PatientStatus = "Pending" | "Completed" | "Cancelled";

interface Patient {
  _id: string;
  patientId: string;
  patientName: string;
  age: string;
  gender: string;
  referBy: string;
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
}

export default function ReportTable() {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // language:-
  const { language } = useLanguage();

  // auth:-
  const { role } = useAuth();

  const router = useRouter();

  // ? Fetch Patients:
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

  // ? No notifications found screen:-
  if (data.length === 0)
    return (
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        <NoDataFound />
        {role === "patient" && (
          <div className="text-center text-gray-500 tracking-wide text-sm font-semibold italic">
            <p>
              {language === "english"
                ? "No reports found. Please visit your appointments page and book appointment to make reports."
                : "कोई रिपोर्ट नहीं मिला । कृपया अपॉइंटमेंट पेज पर जाएं और अपॉइंटमेंट बुक करें ताकि रिपोर्ट बनें।"}
            </p>
            <Button
              onClick={() => router.push("/appointments")}
              title="Book Appointment"
              className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer mt-3">
              {language === "english"
                ? "Book Appointment"
                : "अपॉइंटमेंट बुक करें"}
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className="border border-[#c4e3df] bg-none rounded-lg bg-white p-4">
        {/* Heading */}
        <h2
          className={`text-xl ${"mb-4"} font-bold text-[#1e4d4f] tracking-wide`}
          title={
            language === "english"
              ? "Patient Report List"
              : "मरीज के रिपोर्ट सूची"
          }>
          <span className="border-b-2 border-[#18564e] inline-block pb-1">
            {language === "english"
              ? "Patient Report List"
              : "मरीज के रिपोर्ट सूची"}
          </span>
        </h2>

        <section className="w-full flex justify-center items-start">
          <div className="w-full border border-[#42998d] transition-colors">
            <CardContent className="p-0 overflow-hidden">
              <div className="relative w-full">
                <div
                  className="w-full overflow-x-auto scrollbar-hide group relative"
                  id="table-wrapper"
                  onScroll={(e) => {
                    const shadow = document.getElementById("scroll-shadow");
                    if (!shadow) return;
                    shadow.style.opacity =
                      e.currentTarget.scrollLeft > 0 ? "1" : "0";
                  }}>
                  <ConditionWisePatientReport
                    patients={data}
                    setPatients={setData}
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </section>
      </div>
    </>
  );
}
