"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/LanguageContext";
import { CalendarCheck, TrendingUp, UserCheck, ScanLine } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OurJourney: React.FC = () => {
  const { language } = useLanguage();

  // ? List of timeline items:-
  const timeline: TimelineItem[] = [
    {
      year: "2015",
      title: `${
        language === "english"
          ? "Clinic Established"
          : "क्लिनिक स्थापित किया गया"
      }`,
      description: `${
        language === "english"
          ? "Vaishnavi Imaging Center was founded in Daudnagar to provide accessible ultrasound diagnostics to all."
          : "वैष्णवी इमेजिंग सेंटर की स्थापना दाउदनगर में सभी के लिए सुलभ अल्ट्रासाउंड डायग्नोस्टिक्स प्रदान करने के लिए की गई।"
      }`,
      icon: <CalendarCheck className="w-6 h-6 text-white" />,
    },
    {
      year: "2017",
      title: `${
        language === "english"
          ? "Advanced Equipment Installed"
          : "उन्नत उपकरण स्थापित किए गए"
      }`,
      description: `${
        language === "english"
          ? "Introduced high-resolution ultrasound machines for improved accuracy and comfort."
          : "बेहतर सटीकता और सुविधा के लिए उच्च-रिज़ॉल्यूशन अल्ट्रासाउंड मशीनों को पेश किया गया।"
      }`,
      icon: <ScanLine className="w-6 h-6 text-white" />,
    },
    {
      year: "2020",
      title: `${
        language === "english"
          ? "5000+ Patients Served"
          : "5000+ मरीजों की सेवा की गई"
      }`,
      description: `${
        language === "english"
          ? "Crossed a major milestone of scanning over 5000 patients with trust and care."
          : "विश्वास और देखभाल के साथ 5000 से अधिक मरीजों के स्कैन का एक प्रमुख मील का पत्थर पार किया।"
      }`,
      icon: <UserCheck className="w-6 h-6 text-white" />,
    },
    {
      year: "2023",
      title: `${
        language === "english"
          ? "Launched 3D/4D Ultrasound"
          : "3D/4D अल्ट्रासाउंड शुरू किया गया"
      }`,
      description: `${
        language === "english"
          ? "Started providing 3D and 4D fetal ultrasound services for enhanced diagnostic clarity."
          : "बेहतर डायग्नोस्टिक स्पष्टता के लिए 3D और 4D भ्रूण अल्ट्रासाउंड सेवाएं प्रदान करना शुरू किया।"
      }`,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide text-[#1e4d4f] mb-4">
          {language === "english" ? "Our Journey" : "हमारी यात्रा"}
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          {language === "english"
            ? "Since 2015, we have been constantly evolving to provide the best diagnostic care. Here's how we grew with your trust."
            : "2015 से, हम लगातार उन्नति कर रहे हैं ताकि सर्वोत्तम डायग्नोस्टिक देखभाल प्रदान की जा सके। यहां बताया गया है कि हम आपके विश्वास के साथ कैसे बढ़े।"}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
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
