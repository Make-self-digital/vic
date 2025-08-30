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
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Loading from "../Loading";

interface DataType {
  date: string;
  [serviceName: string]: string | number;
}

const COLORS: Record<string, string> = {
  "Whole Abdomen Scan": "#00c49f",
  "Lower Abdomen": "#006d5b",
  "KUB Scan": "#26a69a",
  "Thyroid Scan": "#4db6ac",
  "Breast Scan": "#00897b",
  "Scrotum Scan": "#42998d",
  "Soft Tissue Scan": "#00796b",
  "Follicular Monitoring": "#2e7d32",
  "TVS (Transvaginal Sonography)": "#558b2f",
  "NT/NB Scan (11–13 Weeks)": "#9e9d24",
  "Level-1 Scan": "#f9a825",
  "Level-2 Scan": "#f57f17",
  "Foetal Wellbeing Scan": "#ef6c00",
  "BPP (Biophysical Profile)": "#d84315",
  "Early Antenatal Scan": "#c62828",
  "Dating Scan": "#ad1457",
  "Whole Abdomen Doppler": "#6a1b9a",
  "Foetal Doppler": "#283593",
  "Venous Doppler": "#1565c0",
  "Carotid Doppler": "#0277bd",
  "Pleural Tapping (Diagnostic)": "#00838f",
  "Ascitic Fluid Aspiration (Diagnostic)": "#006064",
  "Ascitic Fluid Aspiration (Therapeutic)": "#004d40",
  "Liver Abscess Aspiration": "#1b5e20",
  "Plain X-Ray": "#424242",
  "HSG (Hysterosalpingography)": "#5d4037",
  "IVP (Intravenous Pyelography)": "#3e2723",
};

export default function RevenueLineChart({
  data = [],
  loading = false,
}: {
  data: DataType[];
  loading: boolean;
}) {
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
                <div className="min-w-[300px] md:min-w-[600px] h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 10, bottom: 50 }}>
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
                      {Object.keys(COLORS).map((service) => (
                        <Line
                          key={service}
                          type="monotone"
                          dataKey={service}
                          stroke={COLORS[service as keyof typeof COLORS]}
                          strokeWidth={2.5}
                          dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                          activeDot={{ r: window.innerWidth < 768 ? 5 : 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend outside chart for full responsiveness */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {Object.keys(COLORS).map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-1 text-xs">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: COLORS[service as keyof typeof COLORS],
                      }}
                    />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
