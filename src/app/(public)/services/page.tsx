import ExtraUltrasoundSections from "@/components/ServiceCompare";
import UltrasoundServices from "@/components/UltrasoundServices";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <UltrasoundServices />
      <ExtraUltrasoundSections />
    </>
  );
};

export default page;
