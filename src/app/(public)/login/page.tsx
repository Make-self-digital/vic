import React from "react";
import type { Metadata } from "next";
import LoginPage from "@/components/Login/Login-Page";
import { metadataConfig } from "../metadata-config";

export const metadata: Metadata = metadataConfig["/login"];

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;
