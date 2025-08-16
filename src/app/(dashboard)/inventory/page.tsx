import { metadataConfig } from "@/app/(public)/metadata-config";
import MedicalInventory from "@/components/InventoryCom/InventoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/inventory"];

const InventoryPage: React.FC = () => {
  return (
    <>
      <MedicalInventory />
    </>
  );
};

export default InventoryPage;
