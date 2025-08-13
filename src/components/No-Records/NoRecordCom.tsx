"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/lotties/JTZBhfOx7Z.json";

export default function NoDataFound() {
  return (
    <div className="flex items-center justify-center">
      <div title="No Data Found">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
