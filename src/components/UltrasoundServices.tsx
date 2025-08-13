"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  Baby,
  Waves,
  Bone,
  Syringe,
  HeartPulse,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

const services: Service[] = [
  {
    title: "Whole Abdomen Scan",
    description:
      "Comprehensive scan covering liver, kidneys, pancreas and other abdominal organs.",
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    slug: "whole-abdomen-scan",
  },
  {
    title: "Pregnancy Ultrasound",
    description:
      "From early pregnancy to 3D/4D scans, we provide safe imaging for mother and baby.",
    icon: <Baby className="w-6 h-6 text-white" />,
    slug: "pregnancy-ultrasound",
  },
  {
    title: "Color Doppler Studies",
    description:
      "Evaluate blood flow in veins and arteries for better vascular assessment.",
    icon: <Waves className="w-6 h-6 text-white" />,
    slug: "color-doppler-studies",
  },
  {
    title: "Musculoskeletal Scan",
    description:
      "Ultrasound for joints, tendons and soft tissues for accurate diagnosis.",
    icon: <Bone className="w-6 h-6 text-white" />,
    slug: "musculoskeletal-scan",
  },
  {
    title: "USG-Guided Procedures",
    description:
      "Safe and precise procedures like FNAC or aspirations under ultrasound guidance.",
    icon: <Syringe className="w-6 h-6 text-white" />,
    slug: "usg-guided-procedures",
  },
  {
    title: "Diagnostic Ultrasound",
    description:
      "High-resolution ultrasound imaging for fast and accurate diagnostic evaluation.",
    icon: <HeartPulse className="w-6 h-6 text-white" />,
    slug: "diagnostic-ultrasound",
  },
];

const UltrasoundServices: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-10 max-w-2xl mx-auto">
          We offer a wide range of ultrasound services using the latest
          equipment and expert hands for your diagnosis.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Link key={idx} href={`/services/${service.slug}`} passHref>
              <Card className="group text-center transition-shadow hover:shadow-lg border-l-4 border-[#42998d] cursor-pointer">
                <CardContent className="py-6 px-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#42998d] mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UltrasoundServices;
