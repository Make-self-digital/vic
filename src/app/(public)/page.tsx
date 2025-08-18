import React from "react";
import DoctorSlider from "@/components/Doctors";
import FaqAccordion from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUS";
import Hero from "@/components/Hero";
import LanguageToggle from "@/components/LanguageToggle/LanguageToggle";

const page: React.FC = () => {
  return (
    <>
      <LanguageToggle />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <DoctorSlider />
      <FaqAccordion />
    </>
  );
};

export default page;
