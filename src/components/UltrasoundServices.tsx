"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  Baby,
  Waves,
  Bone,
  Syringe,
  // HeartPulse,
} from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";
import { useState } from "react";

interface SingleService {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

interface ServiceCategory {
  id: string;
  label: string;
  services: SingleService[];
}

const UltrasoundServices: React.FC = () => {
  // language:-
  const { language } = useLanguage();

  // ? List of services:-
  const services: ServiceCategory[] = [
    // * Geneal Ultrasound:-
    {
      id: "abdomen",
      label:
        language === "english" ? "General Ultrasound" : "साधारण अल्ट्रासाउंड",
      services: [
        {
          title:
            language === "english" ? "Whole Abdomen Scan" : "पूर्ण पेट स्कैन",
          description:
            language === "english"
              ? "Comprehensive scan covering liver, kidneys, pancreas and other abdominal organs."
              : "यकृत, गुर्दे, अग्न्याशय और अन्य पेट के अंगों को कवर करने वाला व्यापक स्कैन।",
          slug: "whole-abdomen-scan",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Lower Abdomen" : "निचला पेट",
          description:
            language === "english"
              ? "Focused ultrasound scan for lower abdominal organs."
              : "निचले पेट के अंगों के लिए केंद्रित अल्ट्रासाउंड स्कैन।",
          slug: "lower-abdomen",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "KUB Scan"
              : "किडनी, मूत्रवाहिनी और मूत्राशय स्कैन",
          description:
            language === "english"
              ? "Kidneys, ureters and bladder ultrasound scan."
              : "गुर्दे, मूत्रवाहिनी और मूत्राशय का अल्ट्रासाउंड स्कैन।",
          slug: "kub-scan",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Follicular Monitoring"
              : "फोलिक्यूलर मॉनिटरिंग",
          description:
            language === "english"
              ? "Ultrasound to track the growth and development of ovarian follicles, essential for fertility evaluation and treatment planning."
              : "अंडाशय के फॉलिकल्स की वृद्धि और विकास का पता लगाने के लिए अल्ट्रासाउंड, जो प्रजनन क्षमता के मूल्यांकन और उपचार योजना में सहायक है।",
          slug: "follicular-monitoring",
          icon: <Bone className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "TVS (Transvaginal Sonography)"
              : "टीवीएस (ट्रांसवेजाइनल सोनोग्राफी)",
          description:
            language === "english"
              ? "High-resolution scan for early pregnancy and pelvic organs."
              : "प्रारंभिक गर्भावस्था और पेल्विक अंगों के लिए उच्च-रिज़ॉल्यूशन स्कैन।",
          slug: "tvs-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
      ],
    },

    // * OBS Ultrasound:-
    {
      id: "pregnancy",
      label: language === "english" ? "OBS Ultrasound" : "ओबीएस अल्ट्रासाउंड",
      services: [
        {
          title:
            language === "english"
              ? "NT/NB Scan (11–13 Weeks)"
              : "एनटी/एनबी स्कैन (11–13 सप्ताह)",
          description:
            language === "english"
              ? "Nuchal translucency and nasal bone scan for early fetal screening."
              : "प्रारंभिक भ्रूण स्क्रीनिंग के लिए नचल ट्रांसलुसेंसी और नाक की हड्डी का स्कैन।",
          slug: "nt-nb-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Level-1 Scan" : "लेवल-1 स्कैन",
          description:
            language === "english"
              ? "Basic anomaly scan in early pregnancy."
              : "प्रारंभिक गर्भावस्था में बुनियादी असामान्यता स्कैन।",
          slug: "level-1-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Level-2 Scan" : "लेवल-2 स्कैन",
          description:
            language === "english"
              ? "Detailed anomaly scan for fetal development."
              : "भ्रूण विकास के लिए विस्तृत असामान्यता स्कैन।",
          slug: "level-2-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Foetal Wellbeing Scan"
              : "भ्रूण स्वास्थ्य स्कैन",
          description:
            language === "english"
              ? "Scan to assess fetal health and growth."
              : "भ्रूण के स्वास्थ्य और विकास का मूल्यांकन करने के लिए स्कैन।",
          slug: "foetal-wellbeing-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "BPP (Biophysical Profile)"
              : "बीपीपी (बायोफिजिकल प्रोफ़ाइल)",
          description:
            language === "english"
              ? "Assessment of fetal breathing, movement, tone and amniotic fluid."
              : "भ्रूण की श्वसन, गति, टोन और अम्नीओटिक फ्लूइड का मूल्यांकन।",
          slug: "bpp-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Early Antenatal Scan"
              : "प्रारंभिक गर्भधारण स्कैन",
          description:
            language === "english"
              ? "Early scan to confirm pregnancy and estimate gestational age."
              : "गर्भावस्था की पुष्टि और गर्भावस्था की आयु का अनुमान लगाने के लिए प्रारंभिक स्कैन।",
          slug: "early-antenatal-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Dating Scan" : "डेटिंग स्कैन",
          description:
            language === "english"
              ? "Ultrasound to estimate gestational age and expected due date."
              : "गर्भावस्था की आयु और अनुमानित प्रसव तिथि का अनुमान लगाने के लिए अल्ट्रासाउंड।",
          slug: "dating-scan",
          icon: <Baby className="w-6 h-6 text-white" />,
        },
      ],
    },

    // * Digital X Ray:-
    {
      id: "Digital X-Ray",
      label: language === "english" ? "Digital X-Ray" : "डिजिटल एक्स-रेय",
      services: [
        {
          title: language === "english" ? "Plain X-Ray" : "साधारण एक्स-रे",
          description:
            language === "english"
              ? "Standard radiographic imaging for bones and chest."
              : "हड्डियों और छाती के लिए मानक रेडियोग्राफिक इमेजिंग।",
          slug: "plain-xray",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "HSG (Hysterosalpingography)"
              : "HSG (हिस्टेरोसैल्पिनोग्राफी)",
          description:
            language === "english"
              ? "X-ray procedure to evaluate fallopian tubes and uterus."
              : "फैलोपियन ट्यूब और गर्भाशय का मूल्यांकन करने के लिए एक्स-रे प्रक्रिया।",
          slug: "hsg",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "IVP (Intravenous Pyelography)"
              : "IVP (इंट्रावेनस पायलोग्राफी)",
          description:
            language === "english"
              ? "X-ray contrast study for kidneys, ureters, and bladder."
              : "किडनी, मूत्रवाहिनी और मूत्राशय के लिए एक्स-रे कंट्रास्ट अध्ययन।",
          slug: "ivp",
          icon: <Stethoscope className="w-6 h-6 text-white" />,
        },
      ],
    },

    // * Small Parts:-
    {
      id: "Small Parts",
      label: language === "english" ? "Small Parts" : "छोटे हिस्से",
      services: [
        {
          title: language === "english" ? "Thyroids Scan" : "थायरोड स्कैन",
          description:
            language === "english"
              ? "Ultrasound for thyroid nodules."
              : "थायरोड के नोडल्स के लिए अल्ट्रासाउंड।",
          slug: "thyroid-scan",
          icon: <Bone className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Breast Scan" : "स्तन स्कैन",
          description:
            language === "english"
              ? "Ultrasound for breast evaluation."
              : "स्तन का मूल्यांकन करने के लिए अल्ट्रासाउंड।",
          slug: "breast-scan",
          icon: <Bone className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Scrotum Scan" : "स्क्रोटम स्कैन",
          description:
            language === "english"
              ? "Ultrasound for scrotal pathologies."
              : "स्क्रोटम की बीमारियों के लिए अल्ट्रासाउंड।",
          slug: "scrotum-scan",
          icon: <Bone className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english" ? "Soft Tissue Scan" : "सॉफ्ट टिशू स्कैन",
          description:
            language === "english"
              ? "Ultrasound for superficial lumps and soft tissues."
              : "सतही गांठों और नरम ऊतकों के लिए अल्ट्रासाउंड।",
          slug: "soft-tissue-scan",
          icon: <Bone className="w-6 h-6 text-white" />,
        },
      ],
    },

    // * Doppler:-
    {
      id: "doppler",
      label: language === "english" ? "Doppler" : "डॉपलर",
      services: [
        {
          title:
            language === "english"
              ? "Whole Abdomen Doppler"
              : "पूर्ण पेट डॉपलर",
          description:
            language === "english"
              ? "Evaluate blood flow in abdominal vessels."
              : "पेट की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।",
          slug: "whole-abdomen-doppler",
          icon: <Waves className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Foetal Doppler" : "भ्रूण डॉपलर",
          description:
            language === "english"
              ? "Monitor blood flow in fetal vessels."
              : "भ्रूण की रक्त वाहिकाओं में रक्त प्रवाह की निगरानी।",
          slug: "foetal-doppler",
          icon: <Waves className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Venous Doppler" : "शिरापरक डॉपलर",
          description:
            language === "english"
              ? "Evaluate venous blood flow in extremities."
              : "अंगों में शिरापरक रक्त प्रवाह का मूल्यांकन।",
          slug: "venous-doppler",
          icon: <Waves className="w-6 h-6 text-white" />,
        },
        {
          title: language === "english" ? "Carotid Doppler" : "कैरोटिड डॉपलर",
          description:
            language === "english"
              ? "Assess carotid artery blood flow and blockages."
              : "कैरोटिड धमनी में रक्त प्रवाह और अवरोध का मूल्यांकन।",
          slug: "carotid-doppler",
          icon: <Waves className="w-6 h-6 text-white" />,
        },
      ],
    },

    // * Procedures:-
    {
      id: "procedures",
      label: language === "english" ? "Special Procedures" : "विशेष प्रक्रिया",
      services: [
        {
          title:
            language === "english"
              ? "Pleural Tapping (Diagnostic)"
              : "प्ल्यूरल टैपिंग (नैदानिक)",
          description:
            language === "english"
              ? "Ultrasound-guided pleural fluid aspiration."
              : "अल्ट्रासाउंड-निर्देशित प्ल्यूरल द्रव अस्पिरेशन।",
          slug: "pleural-tapping-diagnostic",
          icon: <Syringe className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Ascitic Fluid Aspiration (Diagnostic)"
              : "एस्किटिक द्रव अस्पिरेशन (नैदानिक)",
          description:
            language === "english"
              ? "Diagnostic aspiration of ascitic fluid."
              : "एस्किटिक द्रव का नैदानिक अस्पिरेशन।",
          slug: "ascitic-fluid-aspiration-diagnostic",
          icon: <Syringe className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Ascitic Fluid Aspiration (Therapeutic)"
              : "एस्किटिक द्रव अस्पिरेशन (उपचारात्मक)",
          description:
            language === "english"
              ? "Therapeutic aspiration of ascitic fluid."
              : "एस्किटिक द्रव का उपचारात्मक अस्पिरेशन।",
          slug: "ascitic-fluid-aspiration-therapeutic",
          icon: <Syringe className="w-6 h-6 text-white" />,
        },
        {
          title:
            language === "english"
              ? "Liver Abscess Aspiration"
              : "यकृत फोड़ा अस्पिरेशन",
          description:
            language === "english"
              ? "USG-guided aspiration of liver abscess for diagnosis or therapy."
              : "निदान या उपचार के लिए अल्ट्रासाउंड-निर्देशित यकृत फोड़ा अस्पिरेशन।",
          slug: "liver-abscess-aspiration",
          icon: <Syringe className="w-6 h-6 text-white" />,
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(services[0].id);

  const activeServices =
    services.find((cat) => cat.id === activeCategory)?.services || [];

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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {services.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium tracking-wide transition ${
                activeCategory === category.id
                  ? "bg-[#42998d] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {activeServices.map((service, idx) => (
            <Link key={idx} href={`/services/${service.slug}`} passHref>
              <Card className="bg-white group text-center transition-shadow hover:shadow-lg border-l-4 border-[#42998d] cursor-pointer tracking-wide h-full">
                <CardContent className="py-6 px-4 flex flex-col items-center justify-between h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#42998d] mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold tracking-wide text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow tracking-wide">
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
