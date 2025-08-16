"use client";

import PatientReport from "@/components/ReportCom/PatientReport";
import ReportTable from "@/components/ReportCom/StaffReport";
import { useAuth } from "@/hooks/use-auth";

const MainReportPage: React.FC = () => {
  const { role } = useAuth();
  return (
    <>
      {(role === "admin" || role === "staff") && <ReportTable />}
      {role === "patient" && <PatientReport />}
    </>
  );
};

export default MainReportPage;
