"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    image: "/why1.jpg",
    title: "Accurate & Safe",
    description:
      "We provide highly accurate and radiation-free ultrasound scans using modern technology.",
  },
  {
    image: "/why2.jpg",
    title: "Experienced Doctors",
    description:
      "Our radiologists have 10+ years of experience in diagnostic imaging and patient care.",
  },
  {
    image: "/why3.jpg",
    title: "Affordable Pricing",
    description:
      "Get quality ultrasound scans at reasonable rates, without compromising care.",
  },
  {
    image: "/why4.jpg",
    title: "Clean & Comfortable Center",
    description:
      "Our facility is hygienic, modern and focused on patient comfort.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f]">
          Why Choose Vaishnavi Imaging Center?
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          We are trusted by thousands of patients for safe, affordable and
          professional ultrasound services in Daudnagar.
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
