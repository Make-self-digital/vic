import Certifications from "@/components/Certifications";
import OurJourney from "@/components/OurJourney";
import PatientPromise from "@/components/PatientPromise";
import StatsCounter from "@/components/StatsCounter";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <OurJourney />
      <StatsCounter />
      <PatientPromise />
      <Certifications />
    </>
  );
};

export default page;
