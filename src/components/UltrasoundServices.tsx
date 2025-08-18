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
import { useLanguage } from "@/hooks/LanguageContext";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

const UltrasoundServices: React.FC = () => {
  const { language } = useLanguage();

  // ? List of services:-
  const services: Service[] = [
    {
      title: language === "english" ? "Whole Abdomen Scan" : "पूरा पेट स्कैन",
      description:
        language === "english"
          ? "Comprehensive scan covering liver, kidneys, pancreas and other abdominal organs."
          : "यह स्कैन जिगर, किडनी, अग्न्याशय और अन्य पेट के अंगों को कवर करता है।",
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      slug: "whole-abdomen-scan",
    },
    {
      title:
        language === "english"
          ? "Pregnancy Ultrasound"
          : "गर्भावस्था अल्ट्रासाउंड",
      description:
        language === "english"
          ? "From early pregnancy to 3D/4D scans, we provide safe imaging for mother and baby."
          : "प्रारंभिक गर्भावस्था से लेकर 3D/4D स्कैन तक, हम मां और बच्चे के लिए सुरक्षित इमेजिंग प्रदान करते हैं।",
      icon: <Baby className="w-6 h-6 text-white" />,
      slug: "pregnancy-ultrasound",
    },
    {
      title:
        language === "english" ? "Color Doppler Studies" : "कलर डॉपलर अध्ययन",
      description:
        language === "english"
          ? "Evaluate blood flow in veins and arteries for better vascular assessment."
          : "सही नसों और धमनियों के मूल्यांकन के लिए रक्त प्रवाह का आकलन।",
      icon: <Waves className="w-6 h-6 text-white" />,
      slug: "color-doppler-studies",
    },
    {
      title:
        language === "english"
          ? "Musculoskeletal Scan"
          : "मस्कुलोस्केलेटल स्कैन",
      description:
        language === "english"
          ? "Ultrasound for joints, tendons and soft tissues for accurate diagnosis."
          : "सटीक निदान के लिए जोड़ों, टेंडन और नरम ऊतकों का अल्ट्रासाउंड।",
      icon: <Bone className="w-6 h-6 text-white" />,
      slug: "musculoskeletal-scan",
    },
    {
      title:
        language === "english"
          ? "USG-Guided Procedures"
          : "यूएसजी-निर्देशित प्रक्रियाएँ",
      description:
        language === "english"
          ? "Safe and precise procedures like FNAC or aspirations under ultrasound guidance."
          : "अल्ट्रासाउंड मार्गदर्शन के तहत FNAC या अस्पिरेशन जैसी सुरक्षित और सटीक प्रक्रियाएँ।",
      icon: <Syringe className="w-6 h-6 text-white" />,
      slug: "usg-guided-procedures",
    },
    {
      title:
        language === "english"
          ? "Diagnostic Ultrasound"
          : "निदानात्मक अल्ट्रासाउंड",
      description:
        language === "english"
          ? "High-resolution ultrasound imaging for fast and accurate diagnostic evaluation."
          : "तेज़ और सटीक निदान के लिए उच्च-रिज़ॉल्यूशन अल्ट्रासाउंड इमेजिंग।",
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      slug: "diagnostic-ultrasound",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] mb-4">
          {language === "english" ? "Our Services" : "हमारी सेवाएं"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-10 max-w-2xl mx-auto tracking-wide">
          {language === "english"
            ? "We offer a wide range of ultrasound services using the latest equipment and expert hands for your diagnosis."
            : "हम आपकी निदान के लिए नवीनतम उपकरण और विशेषज्ञ हाथों का उपयोग करके विस्तृत अल्ट्रासाउंड सेवाएं प्रदान करते हैं।"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Link key={idx} href={`/services/${service.slug}`} passHref>
              <Card className="group text-center transition-shadow hover:shadow-lg border-l-4 border-[#42998d] cursor-pointer tracking-wide">
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
