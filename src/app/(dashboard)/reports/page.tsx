import { metadataConfig } from "@/app/(public)/metadata-config";
import MainReportPage from "@/components/ReportCom/MainReportPage";
import Protected from "@/ProtectedRoute/Protected";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/reports"];

const ReportPage: React.FC = () => {
  return (
    <>
      <Protected>
        <MainReportPage />
      </Protected>
    </>
  );
};

export default ReportPage;
