import { metadataConfig } from "@/app/(public)/metadata-config";
import ServiceChart from "@/components/RevenueCom/RevenueChart";
import Protected from "@/ProtectedRoute/Protected";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/revenue"];

const RevenuePage: React.FC = () => {
  return (
    <>
      <Protected>
        <ServiceChart />
      </Protected>
    </>
  );
};

export default RevenuePage;
