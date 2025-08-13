"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Doctor = {
  name: string;
  qualification: string;
  experience: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Shneha Verma",
    qualification: "MBBS, DMRD",
    experience: "10+ years experience in diagnostic ultrasound",
    image: "/doctors/shneha.jpg",
  },
  {
    name: "Dr. Rajeev Ranjan",
    qualification: "MBBS, MD (Radiology)",
    experience: "8 years in fetal & abdominal imaging",
    image: "/doctors/rajeev.jpg",
  },
  {
    name: "Dr. Anjali Kumari",
    qualification: "MBBS, DNB (Radiology)",
    experience: "Expert in pelvic ultrasound & 3D scan",
    image: "/doctors/anjali.jpg",
  },
];

export default function DoctorSection() {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Meet Our Experts
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8">
          Our experienced doctors ensure safe and accurate ultrasound services.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, i) => (
            <Card key={i} className="p-0 shadow-md overflow-hidden">
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
                <h3 className="text-lg font-semibold text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {doc.qualification}
                </p>
                <p className="text-sm text-gray-500 mt-2">{doc.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
