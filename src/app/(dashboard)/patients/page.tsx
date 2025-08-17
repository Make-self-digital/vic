import type { Metadata } from "next";
import { metadataConfig } from "@/app/(public)/metadata-config";
import MainPatientPage from "@/components/PatientCom/MainPatientPage";
import Protected from "@/ProtectedRoute/Protected";

export const metadata: Metadata = metadataConfig["/patients"];

const PatientsPage: React.FC = () => {
  return (
    <>
      <Protected>
        <MainPatientPage />
      </Protected>
    </>
  );
};

export default PatientsPage;
