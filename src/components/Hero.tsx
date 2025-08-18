"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/LanguageContext";

const Hero = () => {
  const { isAuthenticated, role } = useAuth();
  const { language } = useLanguage();

  const services = [
    language === "english"
      ? "Diagnostic Ultrasound"
      : "निदानात्मक अल्ट्रासाउंड",
    language === "english" ? "Whole Abdomen Scan" : "संपूर्ण पेट का स्कैन",
    language === "english" ? "Pregnancy Ultrasound" : "गर्भावस्था अल्ट्रासाउंड",
    language === "english" ? "Color Doppler Studies" : "कलर डॉप्लर अध्ययन",
    language === "english" ? "Musculoskeletal Scan" : "मस्कुलोस्केलेटल स्कैन",
    language === "english"
      ? "USG-Guided Procedures"
      : "यूएसजी-निर्देशित प्रक्रियाएं",
  ];

  // Check if user is authenticated:-
  const targetPath = !isAuthenticated
    ? "/login"
    : role === "staff" || role === "admin"
    ? "/dashboard"
    : "/appointments";

  return (
    <>
      <section className="relative bg-gradient-to-r from-[#e6f9f7] to-[#e6f9f7] overflow-hidden">
        <div className="max-w-7xl min-h-screen mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-6 md:mt-0">
          {/* Left Content */}
          <div className="space-y-6 text-left">
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e4d4f] leading-tight tracking-wide">
              {language === "english" ? (
                <>
                  Trusted{" "}
                  <span className="text-[#0b968d]">Ultrasound Center</span> for
                  Your Health in Daudnagar
                </>
              ) : (
                <>
                  दाउदनगर में{" "}
                  <span className="text-[#0b968d]">
                    विश्वसनीय अल्ट्रासाउंड सेंटर
                  </span>{" "}
                  आपके स्वास्थ्य के लिए
                </>
              )}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg tracking-wide max-w-lg mx-0">
              {language === "english"
                ? "Advanced diagnostic ultrasound services with modern technology and experienced radiologists."
                : "आधुनिक तकनीक और अनुभवी रेडियोलॉजिस्ट के साथ उन्नत डायग्नोस्टिक अल्ट्रासाउंड सेवाएं।"}
            </p>

            {/* Services with ticks */}
            <ul className="space-y-3 text-sm sm:text-base">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0b968d] flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-3 h-3 font-bold text-white" />
                  </span>
                  <span className="text-gray-700 font-medium text-sm sm:text-base tracking-wide">
                    {service}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="flex gap-6">
              <div className="text-center tracking-wide">
                <p className="text-xl sm:text-2xl font-bold text-[#0b968d]">
                  10+
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {language === "english" ? "Years Experience" : "साल का अनुभव"}
                </p>
              </div>
              <div className="text-center tracking-wide">
                <p className="text-xl sm:text-2xl font-bold text-[#0b968d]">
                  5K+
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {language === "english" ? "Happy Patients" : "संतुष्ट मरीज"}
                </p>
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="flex flex-row items-center gap-4 mt-6">
              {/* Button to Book Appointment */}
              <Link href={targetPath}>
                <Button className="px-5 sm:px-6 py-3 rounded-full bg-[#0b968d] text-white font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  {language === "english"
                    ? "Book Appointment"
                    : "अपॉइंटमेंट बुक करें"}
                </Button>
              </Link>
              {/* Button to View Services */}
              <Link href="/services">
                <Button
                  variant="outline"
                  className="text-[#0b968d] rounded-full px-5 sm:px-6 py-3 font-semibold shadow-lg border-[#0b968d] hover:bg-[#0b968d]/10 hover:scale-105 transition-transform cursor-pointer">
                  {language === "english" ? "View Services" : "सेवाएं देखें"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image with Circle + Discount */}
          <div className="relative flex justify-center items-center">
            {/* Main Circle Image */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-10 border-[#0b968d]">
              <Image
                src="/ultrasound-hero1.jpg"
                alt="Ultrasound"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            {/* Discount Badge */}
            <div className="absolute top-3 sm:top-6 -right-3 sm:-right-6 bg-[#0b968d] text-white rounded-full w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center shadow-lg">
              <span className="text-base sm:text-xl font-bold">50%</span>
              <span className="text-[10px] sm:text-sm font-light">
                {language === "english" ? "Discount" : "छूट"}
              </span>
            </div>

            {/* ISO Badge */}
            <div className="absolute bottom-3 sm:bottom-6 -left-3 sm:-left-6 bg-[#0b968d] text-white rounded-full w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center shadow-lg">
              <span className="text-base sm:text-xl font-bold">ISO</span>
              <span className="text-[10px] sm:text-sm font-light">
                {language === "english" ? "Certified" : "प्रमाणित"}
              </span>
            </div>

            {/* first Decorative Circles */}
            <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 w-28 h-28 sm:w-40 sm:h-40 rounded-full border-6 border-[#0b968d] bg-[#0b968d] overflow-hidden">
              <Image
                src="/ultrasound-hero2.jpg"
                alt="Ultrasound"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>

            {/* second Decorative Circle */}
            <div className="absolute bottom-0 -right-10 sm:-right-16 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-[#0b968d]/5 border-6 border-[#0b968d] overflow-hidden">
              <Image
                src="/ultrasound-hero3.jpg"
                alt="Ultrasound"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
