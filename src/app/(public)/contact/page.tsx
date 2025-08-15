import type { Metadata } from "next";
import ClinicLocation from "@/components/ClinicLocation";
import ContactForm from "@/components/ContactForm";
import React from "react";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/contact"];

const page: React.FC = () => {
  return (
    <>
      <main className="pt-16">
        <ClinicLocation />
        <ContactForm />
      </main>
    </>
  );
};

export default page;
