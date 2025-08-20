"use client";

import { useLanguage } from "@/hooks/LanguageContext";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CountsRadialChartProps {
  counts: {
    data: any[];
    paid: any[];
    unpaid: any[];
    completed: any[];
    pending: any[];
  };
}

const COLORS = [
  "#42998d", // base green
  "#3b887e", // slightly darker
  "#50a6a0", // slightly lighter
  "#379183", // mid tone
  "#5bb3aa", // lightest variation
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    const category = payload[0].name.toLowerCase(); // e.g., "paid", "pending"
    const patients = payload[0].payload.patients || []; // array of patient objects

    return (
      <div className="bg-[#e6f4f2] backdrop-blur-sm shadow-lg rounded-lg p-3 border border-[#c4e3df] max-w-[220px] text-xs">
        <p className="text-[#18564e] font-semibold mb-1 tracking-wide">
          {payload[0].name}
        </p>
        <p className="text-[#1e4d4f] font-semibold mb-1 tracking-wide">
          Count: {payload[0].value}
        </p>
        <ul className="text-[#1e4d4f] max-h-32 overflow-y-auto">
          {patients.map((p: any, idx: number) => (
            <li key={idx} className="truncate tracking-wide">
              {p.patientName
                .split(" ")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const CountsRadialChart: React.FC<CountsRadialChartProps> = ({ counts }) => {
  // Language:-
  const { language } = useLanguage();

  // Data for the PieChart:
  const data = [
    {
      name: language === "english" ? "Appointments" : "अपॉइंटमेंट",
      value: counts.data.length,
      patients: counts.data,
    },
    {
      name: language === "english" ? "Paid" : "भुगतान",
      value: counts.paid.length,
      patients: counts.paid,
    },
    {
      name: language === "english" ? "Unpaid" : "अभुगतान",
      value: counts.unpaid.length,
      patients: counts.unpaid,
    },
    {
      name: language === "english" ? "Completed" : "पूर्ण",
      value: counts.completed.length,
      patients: counts.completed,
    },
    {
      name: language === "english" ? "Pending" : "लंबित",
      value: counts.pending.length,
      patients: counts.pending,
    },
  ];

  return (
    <>
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
        <div className="w-full h-64 md:h-96 p-4 bg-white rounded-lg flex justify-center items-center border border-gray-300">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="[&>*]:outline-none">
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={4}
                label={({ name, percent }) =>
                  `${name} (${
                    percent !== undefined ? (percent * 100).toFixed(0) : 0
                  }%)`
                }
                className="text-[12px] cursor-pointer tracking-wide">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default CountsRadialChart;
