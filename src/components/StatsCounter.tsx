"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, ShieldCheck, Stethoscope } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    label: "Patients Served",
    value: 5000,
    icon: <Users className="w-6 h-6 text-[#42998d]" />,
  },
  {
    label: "Years of Experience",
    value: 8,
    icon: <Activity className="w-6 h-6 text-[#42998d]" />,
  },
  {
    label: "Certified Doctors",
    value: 3,
    icon: <ShieldCheck className="w-6 h-6 text-[#42998d]" />,
  },
  {
    label: "Ultrasound Types",
    value: 12,
    icon: <Stethoscope className="w-6 h-6 text-[#42998d]" />,
  },
];

const StatsCounter: React.FC = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((count, i) =>
          count < stats[i].value
            ? count + Math.ceil(stats[i].value / 50)
            : stats[i].value
        )
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="text-center shadow-sm border border-gray-200">
              <CardContent className="py-6 flex flex-col items-center justify-center">
                <div className="mb-2">{stat.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#42998d]">
                  {counters[i]}+
                </h3>
                <p className="text-sm md:text-base text-gray-700 mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
