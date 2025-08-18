"use client";

import {
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/LanguageContext";

type ValueItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const PatientPromise: React.FC = () => {
  const { language } = useLanguage();

  // ? List of values:-
  const values: ValueItem[] = [
    {
      title:
        language === "english"
          ? "Compassionate Care"
          : "सहानुभूति पूर्ण देखभाल",
      description:
        language === "english"
          ? "We treat every patient with empathy and respect during their diagnostic journey."
          : "हम हर मरीज के डायग्नोस्टिक सफर में सहानुभूति और सम्मान के साथ इलाज करते हैं।",
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
    },
    {
      title: language === "english" ? "Accurate Diagnosis" : "सटीक निदान",
      description:
        language === "english"
          ? "Our expert radiologists ensure precise and reliable ultrasound results."
          : "हमारे विशेषज्ञ रेडियोलॉजिस्ट सटीक और भरोसेमंद अल्ट्रासाउंड परिणाम सुनिश्चित करते हैं।",
      icon: <Stethoscope className="w-6 h-6 text-white" />,
    },
    {
      title:
        language === "english" ? "Safety & Hygiene" : "सुरक्षा और स्वच्छता",
      description:
        language === "english"
          ? "We follow strict sanitation protocols to ensure a safe environment for all."
          : "हम सभी के लिए सुरक्षित वातावरण सुनिश्चित करने के लिए कड़े स्वच्छता प्रोटोकॉल का पालन करते हैं।",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
    },
    {
      title: language === "english" ? "Patient Privacy" : "मरीज की गोपनीयता",
      description:
        language === "english"
          ? "All consultations and scans are conducted with complete confidentiality."
          : "सभी परामर्श और स्कैन पूरी गोपनीयता के साथ किए जाते हैं।",
      icon: <Sparkles className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="py-12 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] mb-3">
          {language === "english"
            ? "Our Promise to Patients"
            : "हमारा मरीजों के लिए वादा"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8 tracking-wide">
          {language === "english"
            ? "We are committed to providing every patient with a safe, respectful, and accurate diagnostic experience."
            : "हम प्रत्येक मरीज को सुरक्षित, सम्मानजनक और सटीक डायग्नोस्टिक अनुभव प्रदान करने के लिए प्रतिबद्ध हैं।"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, idx) => (
            <Card
              key={idx}
              className="group transition duration-300 hover:shadow-lg border-l-4 border-[#42998d] text-center tracking-wide">
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
