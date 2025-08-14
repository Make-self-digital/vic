import React from "react";
import type { Metadata } from "next";
import ExtraUltrasoundSections from "@/components/ServiceCompare";
import UltrasoundServices from "@/components/UltrasoundServices";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/services"];

const page: React.FC = () => {
  return (
    <>
      <UltrasoundServices />
      <ExtraUltrasoundSections />
    </>
  );
};

export default page;
