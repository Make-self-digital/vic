"use client";

import {
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ValueItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const values: ValueItem[] = [
  {
    title: "Compassionate Care",
    description:
      "We treat every patient with empathy and respect during their diagnostic journey.",
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
  },
  {
    title: "Accurate Diagnosis",
    description:
      "Our expert radiologists ensure precise and reliable ultrasound results.",
    icon: <Stethoscope className="w-6 h-6 text-white" />,
  },
  {
    title: "Safety & Hygiene",
    description:
      "We follow strict sanitation protocols to ensure a safe environment for all.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Patient Privacy",
    description:
      "All consultations and scans are conducted with complete confidentiality.",
    icon: <Sparkles className="w-6 h-6 text-white" />,
  },
];

const PatientPromise: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Our Promise to Patients
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8">
          We are committed to providing every patient with a safe, respectful,
          and accurate diagnostic experience.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, idx) => (
            <Card
              key={idx}
              className="group transition duration-300 hover:shadow-lg border-l-4 border-[#42998d] text-center">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#42998d] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
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

export default PatientPromise;
