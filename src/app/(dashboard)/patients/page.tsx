import type { Metadata } from "next";
import { metadataConfig } from "@/app/(public)/metadata-config";
import MainPatientPage from "@/components/PatientCom/MainPatientPage";

export const metadata: Metadata = metadataConfig["/patients"];

const PatientsPage: React.FC = () => {
  return (
    <>
      <MainPatientPage />
    </>
  );
};

export default PatientsPage;
