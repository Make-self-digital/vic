"use client";

import { PatientFilters } from "@/components/PatientCom/PatientFilters";
import PatientTable from "@/components/PatientCom/PatientLists";
import { useLanguage } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const MainPatientPage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    search: "",
  });
  const { role } = useAuth();

  // language:-
  const { language } = useLanguage();

  return (
    <>
      <div className="border border-[#c4e3df] bg-none rounded-lg bg-white p-4">
        {/* Heading */}
        <div className="mb-6">
          {/* Heading */}
          <h2
            className="text-2xl font-bold text-[#1e4d4f] tracking-wide"
            title={language === "english" ? "Patients List" : "मरीज की सूची"}>
            <span className="border-b-2 border-[#18564e] inline-block pb-1">
              {language === "english" ? "Patients List" : "मरीज की सूची"}
            </span>
          </h2>
        </div>

        {/* Patient Table and Filters */}
        <div>
          {role === "admin" ||
            (role === "staff" && (
              <PatientFilters onFilterChange={setFilters} />
            ))}
          <PatientTable filters={filters} />
        </div>
      </div>
    </>
  );
};

export default MainPatientPage;
