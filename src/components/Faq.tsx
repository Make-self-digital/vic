"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Do I need to fast before an ultrasound scan?",
    answer:
      "Yes, especially for abdominal scans. Fasting helps reduce gas and gives clearer images. We’ll inform you at the time of appointment.",
  },
  {
    question: "Is a doctor’s prescription mandatory?",
    answer:
      "Yes, as per medical and government guidelines, a valid doctor's prescription is required for most diagnostic ultrasounds.",
  },
  {
    question: "How long does the scan take and when will I get the report?",
    answer:
      "The scan usually takes 20–30 minutes. Reports are ready within 1–2 hours and can be collected or downloaded online.",
  },
  {
    question: "Is ultrasound painful or harmful?",
    answer:
      "Not at all. Ultrasound is safe, non-invasive, and completely painless. It uses sound waves, not radiation.",
  },
  {
    question: "Can someone accompany me during the scan?",
    answer:
      "Yes, a family member or friend can accompany you depending on room availability and scan type.",
  },
];

const FaqAccordion: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center text-base md:text-lg mb-10 tracking-wide">
          Everything you need to know before visiting our ultrasound center.
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
