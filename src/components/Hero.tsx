"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

const slides = [
  {
    image: "/ultrasound-hero1.jpg",
    heading: "Trusted Ultrasound Services",
    text: "Expert diagnostics for pregnancy, abdomen, and general scans.",
  },
  {
    image: "/ultrasound-hero2.jpg",
    heading: "Advanced Imaging Technology",
    text: "High-quality ultrasound machines for accurate results.",
  },
  {
    image: "/ultrasound-hero5.jpg",
    heading: "Compassionate Care",
    text: "Comfortable and safe environment for every patient.",
  },
];

const HeroSlider: React.FC = () => {
  const carouselRef = useRef<any>(null);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollNext();
      }
    }, 5000); // Change every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-50">
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => {
          carouselRef.current = api;
        }}
        className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                sizes="100vw"
                className="object-cover object-center rounded-none"
                priority={index === 0}
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-6 md:p-12 text-white">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                  {slide.heading}
                </h2>
                <p className="mt-2 text-sm md:text-base max-w-xl">
                  {slide.text}
                </p>
                <div className="mt-4 flex gap-4">
                  <Link href="/appointments">
                    <Button className="bg-white cursor-pointer text-black hover:bg-gray-200 text-sm">
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      className="text-white border-white cursor-pointer hover:bg-white hover:text-black text-sm">
                      View Services
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSlider;
