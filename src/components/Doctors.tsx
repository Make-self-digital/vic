"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/LanguageContext";

type Doctor = {
  name: string;
  qualification: string;
  experience: string;
  image: string;
};

export default function DoctorSection() {
  const { language } = useLanguage();

  // ? List of doctors:-
  const doctors: Doctor[] = [
    {
      name: `${
        language === "english" ? "Dr. Shneha Verma" : "डॉ. शिनेहा वर्मा"
      }`,
      qualification: `${
        language === "english" ? "MBBS, DMRD" : "एमबीबीएस, डीएमआरडी"
      }`,
      experience: `${
        language === "english"
          ? "10+ years experience in diagnostic ultrasound"
          : "डायग्नोस्टिक अल्ट्रासाउंड में 10+ वर्षों का अनुभव"
      }`,
      image: "/doctors/shneha.jpg",
    },
    {
      name: `${
        language === "english" ? "Dr. Rajeev Ranjan" : "डॉ. राजीव रंजन"
      }`,
      qualification: `${
        language === "english"
          ? "MBBS, MD (Radiology)"
          : "एमबीबीएस, एमडी (रेडियोलॉजी)"
      }`,
      experience: `${
        language === "english"
          ? "8 years in fetal & abdominal imaging"
          : "फीटल और एब्डॉमिनल इमेजिंग में 8 वर्षों का अनुभव"
      }`,
      image: "/doctors/rajeev.jpg",
    },
    {
      name: `${
        language === "english" ? "Dr. Anjali Kumari" : "डॉ. अंजलि कुमारी"
      }`,
      qualification: `${
        language === "english"
          ? "MBBS, DNB (Radiology)"
          : "एमबीबीएस, डीएनबी (रेडियोलॉजी)"
      }`,
      experience: `${
        language === "english"
          ? "Expert in pelvic ultrasound & 3D scan"
          : "पेल्विक अल्ट्रासाउंड और 3D स्कैन की विशेषज्ञ"
      }`,
      image: "/doctors/anjali.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] mb-2">
          {language === "english"
            ? "Meet Our Experts"
            : "हमारे विशेषज्ञों से मिलें"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8 tracking-wide">
          {language === "english"
            ? "Our experienced doctors ensure safe and accurate ultrasound services."
            : "हमारे अनुभवी डॉक्टर सुरक्षित और सटीक अल्ट्रासाउंड सेवाएं सुनिश्चित करते हैं।"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, i) => (
            <Card
              key={i}
              className="p-0 shadow-md overflow-hidden border border-[#42998d]">
              <div className="relative w-full h-[250px]">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={i === 0} // ✅ Add this line
                />
              </div>
              <CardContent className="px-4 pt-3 pb-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 tracking-wide">
                  {doc.qualification}
                </p>
                <p className="text-sm text-gray-500 mt-2 tracking-wide">
                  {doc.experience}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
