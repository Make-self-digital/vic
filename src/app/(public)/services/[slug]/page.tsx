import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

// ---------------- Types ----------------
interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ServiceDetails {
  title: string;
  slug: string;
  fullDescription: string;
  preparation?: string;
  procedureTime?: string;
  safetyInfo?: string;
  benefits?: string;
  afterCare?: string;
  image?: string;
}

const serviceData: ServiceDetails[] = [
  {
    slug: "whole-abdomen-scan",
    title: "Whole Abdomen Scan",
    fullDescription:
      "This scan covers liver, kidneys, pancreas, gallbladder, and spleen to detect abnormalities like stones, cysts, or tumors. It helps in early diagnosis and monitoring of abdominal conditions.",
    preparation: "Fast for 6-8 hours before scan.",
    procedureTime: "Approx. 15-20 minutes.",
    safetyInfo: "Completely safe, no radiation used.",
    benefits:
      "Non-invasive, quick, and helps detect internal abnormalities early.",
    afterCare: "You can resume normal activities immediately after the scan.",
    image: "/serviceImg/abdomen-scan.jpg",
  },
  {
    slug: "pregnancy-ultrasound",
    title: "Pregnancy Ultrasound",
    fullDescription:
      "Monitors fetal growth, checks heartbeat, and helps estimate due date. We also offer 3D/4D scans for detailed visualization of the fetus and pregnancy tracking.",
    preparation: "Full bladder may be required in early stages.",
    procedureTime: "15-30 minutes.",
    safetyInfo: "Safe for mother and baby.",
    benefits: "Essential for prenatal care and ensuring fetal well-being.",
    afterCare: "No special aftercare needed. Discuss results with your doctor.",
    image: "/serviceImg/pregnancy-ultrasound.jpg",
  },
  {
    slug: "color-doppler-studies",
    title: "Color Doppler Studies",
    fullDescription:
      "Analyzes blood flow in veins and arteries, often used in pregnancy or vascular evaluations. Helps in detecting blockages, narrowing of vessels, and blood clots.",
    preparation: "No special preparation needed.",
    procedureTime: "20 minutes.",
    safetyInfo: "Non-invasive and safe.",
    benefits:
      "Vital for cardiovascular assessments and fetal blood circulation checks.",
    afterCare: "Return to normal activities right after the scan.",
    image: "/serviceImg/color-doppler.jpg",
  },
  {
    slug: "musculoskeletal-scan",
    title: "Musculoskeletal Scan",
    fullDescription:
      "Ultrasound examination of muscles, joints, tendons, and soft tissues to detect tears, inflammation, or fluid.",
    preparation:
      "Wear comfortable clothing. Remove jewelry from the area being examined.",
    procedureTime: "20-30 minutes.",
    safetyInfo: "Safe and painless imaging method.",
    benefits: "Accurate diagnosis of musculoskeletal issues without radiation.",
    afterCare: "Resume normal activities after the scan.",
    image: "/serviceImg/musculoskeletal.jpg",
  },
  {
    slug: "usg-guided-procedures",
    title: "USG-Guided Procedures",
    fullDescription:
      "Ultrasound-guided techniques used for FNAC, biopsies, and fluid aspirations, ensuring accurate targeting.",
    preparation:
      "May vary depending on the procedure. Usually requires consent.",
    procedureTime: "30-45 minutes depending on the procedure.",
    safetyInfo: "Minimally invasive, safer than blind techniques.",
    benefits:
      "Precise guidance increases safety and effectiveness of minor procedures.",
    afterCare:
      "Follow specific instructions provided by the doctor post-procedure.",
    image: "/serviceImg/usg-procedures.png",
  },
  {
    slug: "diagnostic-ultrasound",
    title: "Diagnostic Ultrasound",
    fullDescription:
      "General high-resolution ultrasound to assess various internal organs for early detection of abnormalities.",
    preparation:
      "Depends on the organ being scanned (fasting, full bladder, etc).",
    procedureTime: "15-25 minutes.",
    safetyInfo: "Completely safe with no ionizing radiation.",
    benefits: "Versatile and fast tool for clinical diagnosis.",
    afterCare: "No aftercare required in most cases.",
    image: "/serviceImg/diagnostic.png",
  },
];

// ---------------- Metadata ----------------
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Detail" };
  }

  return {
    title: `${service.title} Details`,
    description: service.fullDescription.slice(0, 140),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceData.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <section className="py-10 px-4 md:px-8 max-w-4xl mx-auto mt-16">
      <div className="mb-6">
        {service.image && (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 border border-[#42998d] bg-white">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-center object-cover"
            />
          </div>
        )}
        <h2 className="text-xl font-bold mb-1.5 tracking-wide text-[#1e4d4f] leading-5">
          {service.title}
        </h2>
        <p className="text-gray-700 text-sm text-semibold mb-6 tracking-wide  line-clamp-2">
          {service.fullDescription}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {/* Preparation */}
        {service.preparation && (
          <Card className="relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
            <div className="absolute -left-5 top-10 bg-[#42998d] rounded-full p-2">
              <CheckCircle className="text-white" />
            </div>
            <CardContent className="pl-12 py-4">
              <h3 className="text-md font-semibold text-gray-800">
                Preparation
              </h3>
              <p className="text-sm text-gray-600">{service.preparation}</p>
            </CardContent>
          </Card>
        )}

        {/* Procedure Time */}
        {service.procedureTime && (
          <Card className="relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
            <div className="absolute -left-5 top-10 bg-[#42998d] rounded-full p-2">
              <Clock className="text-white" />
            </div>
            <CardContent className="pl-12 py-4">
              <h3 className="text-md font-semibold text-gray-800">
                Procedure Time
              </h3>
              <p className="text-sm text-gray-600">{service.procedureTime}</p>
            </CardContent>
          </Card>
        )}

        {/* Safety */}
        {service.safetyInfo && (
          <Card className="relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
            <div className="absolute -left-5 top-10 bg-[#42998d] rounded-full p-2">
              <ShieldCheck className="text-white" />
            </div>
            <CardContent className="pl-12 py-4">
              <h3 className="text-md font-semibold text-gray-800">
                Safety Info
              </h3>
              <p className="text-sm text-gray-600">{service.safetyInfo}</p>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        {service.benefits && (
          <Card className="relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
            <div className="absolute -left-5 top-10 bg-[#42998d] rounded-full p-2">
              <HeartPulse className="text-white" />
            </div>
            <CardContent className="pl-12 py-4">
              <h3 className="text-md font-semibold text-gray-800">Benefits</h3>
              <p className="text-sm text-gray-600">{service.benefits}</p>
            </CardContent>
          </Card>
        )}

        {/* Aftercare */}
        {service.afterCare && (
          <Card className="sm:col-span-2 relative border-l-4 border-[#42998d] shadow-md hover:shadow-lg transition duration-200 tracking-wide">
            <div className="absolute -left-5 top-10 bg-[#42998d] rounded-full p-2">
              <CheckCircle2 className="text-white" />
            </div>
            <CardContent className="pl-12 py-4">
              <h3 className="text-md font-semibold text-gray-800">
                Aftercare Instructions
              </h3>
              <p className="text-sm text-gray-600">{service.afterCare}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
