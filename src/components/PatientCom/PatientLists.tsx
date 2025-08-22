"use client";

import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import Loading from "../Loading";
import PatientData from "./PatientData";
import ConditionWisePatient from "./ConditionWisePatient";
import { useLanguage } from "@/hooks/LanguageContext";

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

const PatientTable = ({
  filters,
}: {
  filters: { category: string; subCategory: string; search: string };
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();

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
      <div>
        {/* Heading */}
        <h2
          className={`text-xl ${"mb-4"} font-bold text-[#1e4d4f] tracking-wide`}
          title={
            language === "english"
              ? "Patient Appointments List"
              : "मरीज के अपॉइंटमेंट्स सूची"
          }>
          <span className="border-b-2 border-[#18564e] inline-block pb-1">
            {language === "english"
              ? "Patient Appointments List"
              : "मरीज के अपॉइंटमेंट्स सूची"}
          </span>
        </h2>
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
                  <ConditionWisePatient
                    patients={patients}
                    setPatients={setPatients}
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </section>
      </div>
    </>
  );
};

export default PatientTable;
