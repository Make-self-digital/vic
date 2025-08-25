import React from "react";
import RefundPolicyPage from "@/components/RefundPolicyCom/RefundPolicy";
import type { Metadata } from "next";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/refund-policy"];

const page = () => {
  return (
    <>
      <main>
        <RefundPolicyPage />
      </main>
    </>
  );
};

export default page;
