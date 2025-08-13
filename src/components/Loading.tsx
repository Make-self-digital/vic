"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/lotties/uzodQkzun2.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-100 h-100">
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
