import Certifications from "@/components/Certifications";
import OurJourney from "@/components/OurJourney";
import PatientPromise from "@/components/PatientPromise";
import StatsCounter from "@/components/StatsCounter";
import React from "react";
import type { Metadata } from "next";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/about"];

const page: React.FC = () => {
  return (
    <>
      <main className="pt-16">
        <OurJourney />
        <StatsCounter />
        <PatientPromise />
        <Certifications />
      </main>
    </>
  );
};

export default page;
