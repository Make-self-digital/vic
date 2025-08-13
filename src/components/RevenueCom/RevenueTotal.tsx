"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Users, IndianRupee } from "lucide-react";
// import NoDataFound from "../No-Records/NoRecordCom";

type RevenueData = {
  name: string;
  count: number;
  revenue: number;
};

interface TotalRevenueSummaryProps {
  data: RevenueData[];
}

export default function TotalRevenueSummary({
  data,
}: TotalRevenueSummaryProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalPatients = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="w-full bg-white rounded-md border border-gray-300 p-0 mb-4">
      <CardContent className="p-2 sm:p-4 space-y-4">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 ">
            <IndianRupee className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-lg font-semibold text-[#18564e]">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 ">
            <Users className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-lg font-semibold text-[#18564e]">
                {totalPatients}
              </p>
            </div>
          </div>

          <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 ">
            <BarChart2 className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-lg font-semibold text-[#18564e]">
                {data.length}
              </p>
            </div>
          </div>
        </div>

        {/* Service-wise Revenue Breakdown */}
        <div className="mt-4">
          <h3 className="text-md font-semibold text-[#1e4d4f] tracking-wide mb-2">
            Service Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center bg-gray-50 border border-[#42998d] rounded-lg px-4 py-3 hover:bg-gray-100 transition">
                <div>
                  <p className="text-sm font-medium text-gray-700 tracking-wide">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 tracking-wide">
                    {item.count} patient{item.count > 1 ? "s" : ""}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#18564e] tracking-wide">
                  ₹{item.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
