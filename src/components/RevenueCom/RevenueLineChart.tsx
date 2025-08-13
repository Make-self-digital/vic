"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Loading from "../Loading";

interface DataType {
  date: string;
  [serviceName: string]: string | number;
}

const COLORS = {
  "Whole Abdomen Scan": "#00c49f",
  "Pregnancy Ultrasound": "#006d5b",
  "Color Doppler": "#26a69a",
  "Musculoskeletal Scan": "#4db6ac",
  "USG-Guided Procedures": "#00897b",
  "Diagnostic Ultrasound": "#42998d",
};

export default function RevenueLineChart({
  data = [],
  loading = false,
}: {
  data: DataType[];
  loading: boolean;
}) {
  // ? handle format date:-
  // const formatDate = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString("en-GB", {
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  return (
    <div className="mt-4 w-full space-y-4">
      <Card className="bg-white border border-gray-300 rounded-md p-4">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
          <span className="border-b border-[#18564e] inline-block pb-1">
            Revenue Line Chart
          </span>
        </h2>
        <CardContent className="p-0 md:p-4">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loading />
            </div>
          ) : (
            <div className="no-outline-on-focus">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[600px] h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#81c7ba" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#3f4a5a", fontSize: 12 }}
                        axisLine={{ stroke: "#81c7ba" }}
                      />
                      <YAxis
                        tick={{ fill: "#3f4a5a", fontSize: 12 }}
                        axisLine={{ stroke: "#81c7ba" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{
                          paddingTop: 10,
                          fontSize: 12,
                        }}
                      />
                      {Object.keys(COLORS).map((service) => (
                        <Line
                          key={service}
                          type="monotone"
                          dataKey={service}
                          stroke={COLORS[service as keyof typeof COLORS]}
                          strokeWidth={2.5}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
