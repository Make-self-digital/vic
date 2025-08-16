import { metadataConfig } from "@/app/(public)/metadata-config";
import MainReportPage from "@/components/ReportCom/MainReportPage";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/reports"];

const ReportPage: React.FC = () => {
  return (
    <>
      <MainReportPage />
    </>
  );
};

export default ReportPage;
