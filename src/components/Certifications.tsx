"use client";

import { BadgeCheck, Building2, ScanLine, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/LanguageContext";

type Certificate = {
  title: string;
  authority: string;
  icon: React.ReactNode;
};

const Certifications: React.FC = () => {
  const { language } = useLanguage();

  // ? List of certifications:-
  const certifications: Certificate[] = [
    {
      title:
        language === "english"
          ? "PNDT Act Certified"
          : "पीएनडीटी अधिनियम प्रमाणित",
      authority: language === "english" ? "Government of India" : "भारत सरकार",
      icon: <BadgeCheck className="w-6 h-6 text-white" />,
    },
    {
      title:
        language === "english"
          ? "Registered Diagnostic Center"
          : "पंजीकृत डायग्नोस्टिक केंद्र",
      authority:
        language === "english"
          ? "Bihar Health Department"
          : "बिहार स्वास्थ्य विभाग",
      icon: <Building2 className="w-6 h-6 text-white" />,
    },
    {
      title:
        language === "english"
          ? "Ultrasound Quality Assurance"
          : "अल्ट्रासाउंड गुणवत्ता आश्वासन",
      authority:
        language === "english"
          ? "Radiology Board Certified"
          : "रेडियोलॉजी बोर्ड प्रमाणित",
      icon: <ScanLine className="w-6 h-6 text-white" />,
    },
    {
      title: language === "english" ? "NABL Applied" : "एनएबीएल आवेदनित",
      authority:
        language === "english"
          ? "National Accreditation Board"
          : "राष्ट्रीय मान्यता बोर्ड",
      icon: <Medal className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-wide text-[#1e4d4f]">
          {language === "english"
            ? "Certifications & Registrations"
            : "प्रमाणपत्र और पंजीकरण"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8 tracking-wide">
          {language === "english"
            ? "We are recognized and approved by leading health and diagnostic authorities ensuring safe, legal, and high-quality ultrasound services."
            : "हम प्रमुख स्वास्थ्य और निदान प्राधिकरणों द्वारा मान्यता प्राप्त और अनुमोदित हैं, जो सुरक्षित, कानूनी और उच्च-गुणवत्ता वाली अल्ट्रासाउंड सेवाओं को सुनिश्चित करते हैं।"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item, idx) => (
            <Card
              key={idx}
              className="group transition duration-300 hover:shadow-md border-l-4 border-[#42998d] text-center tracking-wide">
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
