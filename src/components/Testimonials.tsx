"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

type Testimonial = {
  name: string;
  feedback: string;
  rating: number;
  image: string;
};

const Testimonials: React.FC = () => {
  const { language } = useLanguage();

  // ? Testimonials:-
  const testimonials: Testimonial[] = [
    {
      name: `${language === "english" ? "Pooja Kumari" : "पूजा कुमारी"}`,
      feedback: `${
        language === "english"
          ? "Very clean and well-maintained center. The staff was polite and my ultrasound report was ready within 30 minutes."
          : "बहुत साफ-सुथरा और अच्छी तरह से संचालित केंद्र। स्टाफ विनम्र था और मेरी अल्ट्रासाउंड रिपोर्ट 30 मिनट के अंदर तैयार थी।"
      }`,
      rating: 5,
      image: "/testimonials/pooja.jpg",
    },
    {
      name: `${language === "english" ? "Shilpi Kumari" : "शिल्पी कुमारी"}`,
      feedback: `${
        language === "english"
          ? "Doctor explained everything in detail. Affordable and accurate service. Highly recommended!"
          : "डॉक्टर ने हर चीज़ विस्तार से समझाई। किफायती और सटीक सेवा। अत्यधिक अनुशंसित!"
      }`,
      rating: 4,
      image: "/testimonials/shilpi.webp",
    },
    {
      name: `${language === "english" ? "Neha Verma" : "नेहा वर्मा"}`,
      feedback: `${
        language === "english"
          ? "The environment was hygienic and they handled my pregnancy scan with utmost care. Great experience!"
          : "पर्यावरण स्वच्छ था और उन्होंने मेरी प्रेग्नेंसी स्कैन को बहुत सावधानी से किया। शानदार अनुभव!"
      }`,
      rating: 5,
      image: "/testimonials/neha.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f]">
          {language === "english"
            ? "What Our Patients Say?"
            : "हमारे मरीज क्या कहते हैं?"}
        </h2>
        <p className="text-gray-600 mt-2 mb-10 text-sm md:text-base tracking-wide">
          {language === "english"
            ? "We value every smile and every story. Here's what some of our patients have to say."
            : "हम हर मुस्कान और हर कहानी की कदर करते हैं। हमारे कुछ मरीजों की राय यहां दी गई है।"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="shadow-sm h-full border border-[#42998d]">
              <CardContent className=" flex flex-col items-center text-center">
                {/* Patient Image */}
                <div className="w-20 h-20 relative rounded-full overflow-hidden mb-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80px"
                  />
                </div>

                {/* Rating */}
                <div className="flex mb-3 space-x-1 justify-center">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 text-yellow-500 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 text-sm mb-4 tracking-wide">
                  "{t.feedback}"
                </p>

                {/* 👤 Name */}
                <span className="text-sm font-medium text-gray-900 tracking-wide">
                  – {t.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
