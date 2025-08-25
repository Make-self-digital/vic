import React from "react";
import PrivacyAndTermsPage from "@/components/PrivacyPolicyCom/PrivacyPolicy";
import type { Metadata } from "next";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/privacy-policy"];

const page = () => {
  return (
    <>
      <main>
        <PrivacyAndTermsPage />
      </main>
    </>
  );
};

export default page;
