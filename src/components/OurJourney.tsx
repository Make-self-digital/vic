"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, TrendingUp, UserCheck, ScanLine } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timeline: TimelineItem[] = [
  {
    year: "2015",
    title: "Clinic Established",
    description:
      "Vaishnavi Imaging Center was founded in Aurangabad to provide accessible ultrasound diagnostics to all.",
    icon: <CalendarCheck className="w-6 h-6 text-white" />,
  },
  {
    year: "2017",
    title: "Advanced Equipment Installed",
    description:
      "Introduced high-resolution ultrasound machines for improved accuracy and comfort.",
    icon: <ScanLine className="w-6 h-6 text-white" />,
  },
  {
    year: "2020",
    title: "5000+ Patients Served",
    description:
      "Crossed a major milestone of scanning over 5000 patients with trust and care.",
    icon: <UserCheck className="w-6 h-6 text-white" />,
  },
  {
    year: "2023",
    title: "Launched 3D/4D Ultrasound",
    description:
      "Started providing 3D and 4D fetal ultrasound services for enhanced diagnostic clarity.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
  },
];

const OurJourney: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide text-[#1e4d4f] mb-4">
          Our Journey
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          Since 2015, we have been constantly evolving to provide the best
          diagnostic care. Here's how we grew with your trust.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {timeline.map((item, index) => (
            <Card
              key={index}
              className="relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
              <div className="absolute -left-5 top-6 bg-[#42998d] rounded-full p-2">
                {item.icon}
              </div>
              <CardContent className="pl-12 py-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.year} — {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
