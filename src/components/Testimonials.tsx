"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  feedback: string;
  rating: number;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Pooja Kumari",
    feedback:
      "Very clean and well-maintained center. The staff was polite and my ultrasound report was ready within 30 minutes.",
    rating: 5,
    image: "/testimonials/pooja.jpg",
  },
  {
    name: "Shilpi Kumari",
    feedback:
      "Doctor explained everything in detail. Affordable and accurate service. Highly recommended!",
    rating: 4,
    image: "/testimonials/shilpi.webp",
  },
  {
    name: "Neha Verma",
    feedback:
      "The environment was hygienic and they handled my pregnancy scan with utmost care. Great experience!",
    rating: 5,
    image: "/testimonials/neha.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Patients Say
        </h2>
        <p className="text-gray-600 mt-2 mb-10 text-sm md:text-base">
          We value every smile and every story. Here's what some of our patients
          have to say.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="shadow-sm h-full">
              <CardContent className=" flex flex-col items-center text-center">
                {/* 🧑 Patient Image */}
                <div className="w-20 h-20 relative rounded-full overflow-hidden mb-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80px"
                  />
                </div>

                {/* ⭐ Rating */}
                <div className="flex mb-3 space-x-1 justify-center">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 text-yellow-500 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* 📝 Feedback */}
                <p className="text-gray-700 text-sm mb-4">"{t.feedback}"</p>

                {/* 👤 Name */}
                <span className="text-sm font-medium text-gray-900">
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
