"use client";

import { PatientFilters } from "@/components/PatientCom/PatientFilters";
import PatientTable from "@/components/PatientCom/PatientLists";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const PatientsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    search: "",
  });
  const { role } = useAuth();
  return (
    <>
      {role === "admin" ||
        (role === "staff" && <PatientFilters onFilterChange={setFilters} />)}
      <PatientTable filters={filters} />
    </>
  );
};

export default PatientsPage;
