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
import { useAuth } from "@/hooks/use-auth";

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
  const { isAuthenticated } = useAuth();
  const carouselRef = useRef<any>(null);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollNext();
      }
    }, 5000);
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center md:items-start p-6 md:p-12 text-white">
                <h2
                  className="text-center md:text-left text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg"
                  aria-label={slide.heading}>
                  {slide.heading}
                </h2>
                <p className="mt-3 text-center md:text-left text-md max-w-xl tracking-wide drop-shadow-md font-semibold text-gray-200">
                  {slide.text}
                </p>
                <div className="mt-6 flex flex-col items-center sm:flex-row gap-4">
                  <Link href={isAuthenticated ? "/appointments" : "/login"}>
                    <Button
                      size="lg"
                      className="bg-[#0b968d] cursor-pointer text-white hover:[#0b968d]/90 hover:scale-105 transition-transform shadow-lg text-sm tracking-wide"
                      title="Book Appointment">
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      title="View Services"
                      className="text-white border border-white cursor-pointer hover:bg-[#0b968d] hover:text-white hover:border-none hover:scale-105 transition-transform shadow-lg text-sm tracking-wide">
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
