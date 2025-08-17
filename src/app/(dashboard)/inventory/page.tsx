import { metadataConfig } from "@/app/(public)/metadata-config";
import MedicalInventory from "@/components/InventoryCom/InventoryPage";
import Protected from "@/ProtectedRoute/Protected";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/inventory"];

const InventoryPage: React.FC = () => {
  return (
    <>
      <Protected>
        <MedicalInventory />
      </Protected>
    </>
  );
};

export default InventoryPage;
