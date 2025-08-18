import React from "react";
import DoctorSlider from "@/components/Doctors";
import FaqAccordion from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUS";
import Hero from "@/components/Hero";

const page: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <DoctorSlider />
      <FaqAccordion />
    </>
  );
};

export default page;
