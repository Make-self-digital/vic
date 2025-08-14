import React from "react";
import DoctorSlider from "@/components/Doctors";
import FaqAccordion from "@/components/Faq";
import HeroSlider from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUS";

const page: React.FC = () => {
  return (
    <>
      <div>
        <HeroSlider />
        <WhyChooseUs />
        <Testimonials />
        <DoctorSlider />
        <FaqAccordion />
      </div>
    </>
  );
};

export default page;
