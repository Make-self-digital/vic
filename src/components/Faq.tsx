"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/LanguageContext";

type FaqItem = {
  question: string;
  answer: string;
};

const FaqAccordion: React.FC = () => {
  const { language } = useLanguage();

  // ? Faq:-
  const faqs: FaqItem[] = [
    {
      question: `${
        language === "english"
          ? "Do I need to fast before an ultrasound scan?"
          : "अल्ट्रासाउंड स्कैन के लिए मुझे फास्ट करना होगा?"
      }`,
      answer: `${
        language === "english"
          ? "Yes, especially for abdominal scans. Fasting helps reduce gas and gives clearer images. We’ll inform you at the time of appointment."
          : "हाँ, खासकर पेट (एब्डॉमिनल) स्कैन के लिए। फास्टिंग करने से गैस कम होती है और इमेज साफ आती है। आपको अपॉइंटमेंट के समय जानकारी दी जाएगी।"
      }`,
    },
    {
      question: `${
        language === "english"
          ? "Is a doctor’s prescription mandatory?"
          : "क्या डॉक्टर का प्रिस्क्रिप्शन जरूरी है?"
      }`,
      answer: `${
        language === "english"
          ? "Yes, as per medical and government guidelines, a valid doctor's prescription is required for most diagnostic ultrasounds."
          : "हाँ, मेडिकल और सरकारी गाइडलाइंस के अनुसार, ज़्यादातर डायग्नोस्टिक अल्ट्रासाउंड के लिए डॉक्टर का वैध प्रिस्क्रिप्शन जरूरी है।"
      }`,
    },
    {
      question: `${
        language === "english"
          ? "How long does the scan take and when will I get the report?"
          : "स्कैन में कितना समय लगता है और रिपोर्ट कब मिलेगी?"
      }`,
      answer: `${
        language === "english"
          ? "The scan usually takes 20–30 minutes. Reports are ready within 1–2 hours and can be collected or downloaded online."
          : "स्कैन आमतौर पर 20–30 मिनट का होता है। रिपोर्ट 1–2 घंटे में तैयार हो जाती है और आप उसे कलेक्ट कर सकते हैं या ऑनलाइन डाउनलोड कर सकते हैं।"
      }`,
    },
    {
      question: `${
        language === "english"
          ? "Is ultrasound painful or harmful?"
          : "क्या अल्ट्रासाउंड दर्दनाक या हानिकारक होता है?"
      }`,
      answer: `${
        language === "english"
          ? "Not at all. Ultrasound is safe, non-invasive, and completely painless. It uses sound waves, not radiation."
          : "बिल्कुल नहीं। अल्ट्रासाउंड सुरक्षित है, बिना दर्द और पूरी तरह से बिना किसी नुकसान के। इसमें साउंड वेव्स का इस्तेमाल होता है, रेडिएशन का नहीं।"
      }`,
    },
    {
      question: `${
        language === "english"
          ? "Can someone accompany me during the scan?"
          : "क्या स्कैन के दौरान कोई मेरे साथ आ सकता है?"
      }`,
      answer: `${
        language === "english"
          ? "Yes, a family member or friend can accompany you depending on room availability and scan type."
          : "हाँ, आपकी फैमिली का कोई सदस्य या दोस्त आपके साथ आ सकता है, यह रूम की उपलब्धता और स्कैन के प्रकार पर निर्भर करता है।"
      }`,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] text-center mb-4">
          {language === "english"
            ? "Frequently Asked Questions"
            : "अक्सर पूछे जाने वाले प्रश्न"}
        </h2>
        <p className="text-gray-600 text-center text-base md:text-lg mb-10 tracking-wide">
          {language === "english"
            ? "Everything you need to know before visiting our ultrasound center."
            : "हमारे अल्ट्रासाउंड सेंटर पर आने से पहले आपको जो भी जानना ज़रूरी है।"}
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-gray-200 rounded-xl bg-white">
              <AccordionTrigger className="w-full text-left px-6 py-5 font-medium text-gray-900 hover:bg-gray-100 rounded-t-xl transition-all text-base md:text-lg cursor-pointer tracking-wide">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="px-6 pt-2 pb-6 text-left text-gray-700 text-sm md:text-base leading-relaxed tracking-wide">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqAccordion;
