import { metadataConfig } from "@/app/(public)/metadata-config";
import ServiceChart from "@/components/RevenueCom/RevenueChart";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/revenue"];

const RevenuePage: React.FC = () => {
  return (
    <>
      <ServiceChart />
    </>
  );
};

export default RevenuePage;
