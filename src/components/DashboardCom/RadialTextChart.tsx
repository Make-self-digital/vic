"use client";

import { useLanguage } from "@/hooks/LanguageContext";
import React, { useEffect, useState } from "react";

interface RadialChartProps {
  value: number; // patient.length
  max: number; // total limit (for 100%)
  label?: string;
}

export default function CountsRadialTextChart({
  value,
  max,
}: RadialChartProps) {
  const { language } = useLanguage();

  // percentage calculation
  const percentage = Math.min((value / max) * 100, 100);

  // Circle properties
  const radius = 70; // base circle radius
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const [offset, setOffset] = useState(circumference);

  // Animate circle on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (percentage / 100) * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage, circumference]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <h2
        className="text-xl mb-6 font-bold text-[#1e4d4f] tracking-wide"
        title={
          language === "english"
            ? "Radial Chart"
            : "वृत्ताकार चार्ट के माध्यम से देखें"
        }>
        <span className="border-b-2 border-[#18564e] inline-block pb-1">
          {language === "english"
            ? "Radial Chart"
            : "वृत्ताकार चार्ट के माध्यम से देखें"}
        </span>
      </h2>

      {/* Chart Container */}
      <div className="w-full h-64 md:h-96 p-4 bg-white rounded-lg flex justify-center items-center border border-gray-300">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* SVG Circle */}
          <svg
            className="w-full h-full max-w-[300px] max-h-[300px] -rotate-90"
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            preserveAspectRatio="xMidYMid meet">
            {/* Background */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              stroke="#42998d"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1.5s ease-in-out",
              }}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center text-center px-2">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#42998d]">
              {value}
            </span>
            <span className="text-xs sm:text-sm md:text-base text-[#1d4d4d] font-semibold tracking-wide truncate">
              {language === "english"
                ? "Today Registered Patients"
                : "आज के रजिस्टर मरीज"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
