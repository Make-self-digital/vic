"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/LanguageContext";
import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const WhyChooseUs: React.FC = () => {
  const { language } = useLanguage();

  // ? List of features:-
  const features: Feature[] = [
    {
      image: "/why1.jpg",
      title: `${
        language === "english" ? "Accurate & Safe" : "सटीक और सुरक्षित"
      }`,
      description: `${
        language === "english"
          ? "We provide highly accurate and radiation-free ultrasound scans using modern technology."
          : "हम आधुनिक तकनीक का उपयोग करके अत्यधिक सटीक और विकिरण-मुक्त अल्ट्रासाउंड स्कैन प्रदान करते हैं।"
      }`,
    },
    {
      image: "/why2.jpg",
      title: `${
        language === "english" ? "Experienced Doctors" : "अनुभवी डॉक्टर"
      }`,
      description: `${
        language === "english"
          ? "Our radiologists have 10+ years of experience in diagnostic imaging and patient care."
          : "हमारे रेडियोलॉजिस्ट्स के पास डायग्नोस्टिक इमेजिंग और मरीज देखभाल में 10+ वर्षों का अनुभव है।"
      }`,
    },
    {
      image: "/why3.jpg",
      title: `${
        language === "english" ? "Affordable Pricing" : "किफायती मूल्य"
      }`,
      description: `${
        language === "english"
          ? "Get quality ultrasound scans at reasonable rates, without compromising care."
          : "गुणवत्तापूर्ण अल्ट्रासाउंड स्कैन उचित दरों पर प्राप्त करें, बिना देखभाल से समझौता किए।"
      }`,
    },
    {
      image: "/why4.jpg",
      title: `${
        language === "english"
          ? "Clean & Comfortable Center"
          : "स्वच्छ और आरामदायक केंद्र"
      }`,
      description: `${
        language === "english"
          ? "Our facility is hygienic, modern and focused on patient comfort."
          : "हमारी सुविधा स्वच्छ, आधुनिक और मरीजों की सुविधा पर केंद्रित है।"
      }`,
    },
  ];

  return (
    <section className="py-12 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f]">
          {language === "english"
            ? "Why Choose Vaishnavi Imaging Center?"
            : "वैष्णवी इमेजिंग सेंटर क्यों चुनें?"}
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          {language === "english"
            ? "We are trusted by thousands of patients for safe, affordable and professional ultrasound services in Daudnagar."
            : "दाउदनगर में हम पर हजारों मरीज भरोसा करते हैं सुरक्षित, किफायती और पेशेवर अल्ट्रासाउंड सेवाओं के लिए।"}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <Card
              key={index}
              className="h-full overflow-hidden hover:shadow-lg transition-shadow p-0 tracking-wide border border-[#42998d]">
              {/* Image */}
              <div className="w-full h-[160px] md:h-[200px] lg:h-[220px] relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>

              {/* Text */}
              <CardContent className="px-4 pt-3 pb-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
