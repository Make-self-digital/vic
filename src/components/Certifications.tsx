"use client";

import { BadgeCheck, Building2, ScanLine, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Certificate = {
  title: string;
  authority: string;
  icon: React.ReactNode;
};

const certifications: Certificate[] = [
  {
    title: "PNDT Act Certified",
    authority: "Government of India",
    icon: <BadgeCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Registered Diagnostic Center",
    authority: "Bihar Health Department",
    icon: <Building2 className="w-6 h-6 text-white" />,
  },
  {
    title: "Ultrasound Quality Assurance",
    authority: "Radiology Board Certified",
    icon: <ScanLine className="w-6 h-6 text-white" />,
  },
  {
    title: "NABL Applied",
    authority: "National Accreditation Board",
    icon: <Medal className="w-6 h-6 text-white" />,
  },
];

const Certifications: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Certifications & Registrations
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8">
          We are recognized and approved by leading health and diagnostic
          authorities ensuring safe, legal, and high-quality ultrasound
          services.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item, idx) => (
            <Card
              key={idx}
              className="group transition duration-300 hover:shadow-md border-l-4 border-[#42998d] text-center">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#42998d] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.authority}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
