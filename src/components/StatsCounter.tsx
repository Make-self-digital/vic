"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, ShieldCheck, Stethoscope } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatsCounter: React.FC = () => {
  const { language } = useLanguage();

  // ? List of stats:-
  const stats: StatItem[] = [
    {
      label: `${
        language === "english" ? "Patients Served" : "मरीज देखभाल किए गए"
      }`,
      value: 5000,
      icon: <Users className="w-6 h-6 text-[#42998d]" />,
    },
    {
      label: `${
        language === "english" ? "Years of Experience" : "अनुभव के वर्ष"
      }`,
      value: 8,
      icon: <Activity className="w-6 h-6 text-[#42998d]" />,
    },
    {
      label: `${
        language === "english" ? "Certified Doctors" : "प्रमाणित डॉक्टर"
      }`,
      value: 3,
      icon: <ShieldCheck className="w-6 h-6 text-[#42998d]" />,
    },
    {
      label: `${
        language === "english" ? "Ultrasound Types" : "अल्ट्रासाउंड प्रकार"
      }`,
      value: 12,
      icon: <Stethoscope className="w-6 h-6 text-[#42998d]" />,
    },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  // ? Counter Animation:
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
        {/* ? Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide text-[#1e4d4f] mb-10">
          {language === "english" ? "Our Achievements" : "हमारी उपलब्धियां"}
        </h2>

        {/* ? Stats: */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="text-center shadow-sm border border-gray-200 tracking-wide">
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
