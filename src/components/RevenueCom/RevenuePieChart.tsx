"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { LegendPayload } from "recharts/types/component/DefaultLegendContent";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "../Loading";

interface RevenuePieChartProps {
  data: { name: string; count: number; revenue: number }[];
  loading?: boolean;
}

const COLORS = [
  "#006d5b",
  "#42998d",
  "#00c49f",
  "#26a69a",
  "#00897b",
  "#4db6ac",
];

// Custom Tooltip:
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    const total = payload.reduce(
      (sum: number, item: any) => sum + (item.payload?.count || 0),
      0
    );

    return (
      <div className="bg-[#e6f4f2] backdrop-blur-sm shadow-md rounded-md p-3 border border-[#c4e3df] max-w-[220px]">
        <ul className="space-y-1 text-xs text-[#1e4d4f]">
          {payload.map((item: any, index: number) => (
            <li key={index} className="flex justify-between gap-4">
              <span
                className="font-medium truncate tracking-wide"
                style={{ color: item.color }}>
                {item.name}
              </span>
              <span className="font-semibold">
                {item.payload.count} ({item.payload.value}%)
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-2 pt-2 border-t border-[#c8e6e4] text-xs font-bold text-[#00695c] flex justify-between">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    );
  }

  return null;
};

// Label inside pie:
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      pointerEvents="none">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom Legend:
const renderCustomLegend = (props: { payload?: LegendPayload[] }) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2 px-1 text-[12px]">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: entry.color }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

// ? Main Component:
const RevenuePieChart = ({ data, loading }: RevenuePieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const percentageData = data.map((item) => ({
    name: item.name,
    count: item.count,
    value: total > 0 ? Math.round((item.count / total) * 100) : 0,
  }));

  return (
    <Card className="border border-gray-300 bg-white p-4 rounded-md w-full h-fit">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
        <span className="border-b border-[#18564e] inline-block pb-1">
          Revenue Pie Chart
        </span>
      </h2>

      <CardContent className="p-4">
        <div className="w-full h-[240px] pb-2">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loading />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="[&>*]:outline-none">
                <Pie
                  data={percentageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label={renderLabel}
                  labelLine={false}>
                  {percentageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {!loading &&
          renderCustomLegend({
            payload: percentageData.map((d, i) => ({
              value: `${d.name} (${d.value}%)`,
              color: COLORS[i],
              id: `${i}`,
              type: "circle",
            })),
          })}
      </CardContent>
    </Card>
  );
};

export default RevenuePieChart;
