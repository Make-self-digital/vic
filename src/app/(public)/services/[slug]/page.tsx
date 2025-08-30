import { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

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
}

const serviceData: ServiceDetails[] = [
  {
    title: "Whole Abdomen Scan",
    fullDescription:
      "This scan covers liver, kidneys, pancreas, gallbladder, and spleen to detect abnormalities like stones, cysts, or tumors. It helps in early diagnosis and monitoring of abdominal conditions.",
    slug: "whole-abdomen-scan",
  },
  {
    title: "Lower Abdomen",
    fullDescription:
      "Focused ultrasound scan for lower abdominal organs such as bladder and reproductive organs.",
    slug: "lower-abdomen",
  },
  {
    title: "KUB Scan",
    fullDescription:
      "Analyzes blood flow in veins and arteries, often used in pregnancy or vascular evaluations. Helps in detecting blockages, narrowing of vessels, and blood clots.",
    slug: "kub-scan",
  },
  {
    title: "Thyroid Scan",
    fullDescription:
      "Ultrasound evaluation of the thyroid gland to detect nodules, cysts, or enlargement.",
    slug: "thyroid-scan",
  },
  {
    title: "Breast Scan",
    fullDescription:
      "Ultrasound imaging of breast tissue to detect lumps, cysts, or other abnormalities.",
    slug: "breast-scan",
  },
  {
    title: "Scrotum Scan",
    fullDescription:
      "Ultrasound of the scrotum to evaluate testicles and surrounding tissues for abnormalities.",
    slug: "scrotum-scan",
  },
  {
    title: "Soft Tissue Scan",
    fullDescription:
      "Ultrasound for lumps, swelling or injuries in soft tissues.",
    slug: "soft-tissue-scan",
  },
  {
    title: "Follicular Monitoring",
    fullDescription:
      "Track ovarian follicles for fertility evaluation and treatment planning.",
    slug: "follicular-monitoring",
  },
  {
    title: "TVS (Transvaginal Sonography)",
    fullDescription:
      "High-resolution scan for early pregnancy and pelvic organ assessment.",
    slug: "tvs-scan",
  },
  {
    title: "NT/NB Scan (11–13 Weeks)",
    fullDescription:
      "Nuchal translucency and nasal bone scan for early fetal screening.",
    slug: "nt-nb-scan",
  },
  {
    title: "Level-1 Scan",
    fullDescription: "Basic anomaly scan in early pregnancy.",
    slug: "level-1-scan",
  },
  {
    title: "Level-2 Scan",
    fullDescription: "Detailed anomaly scan for fetal development.",
    slug: "level-2-scan",
  },
  {
    title: "Foetal Wellbeing Scan",
    fullDescription: "Scan to assess fetal health and growth.",
    slug: "foetal-wellbeing-scan",
  },
  {
    title: "BPP (Biophysical Profile)",
    fullDescription:
      "Assessment of fetal breathing, movement, tone and amniotic fluid.",
    slug: "bpp-scan",
  },
  {
    title: "Early Antenatal Scan",
    fullDescription:
      "Early scan to confirm pregnancy and estimate gestational age.",
    slug: "early-antenatal-scan",
  },
  {
    title: "Dating Scan",
    fullDescription:
      "Ultrasound to estimate gestational age and expected due date.",
    slug: "dating-scan",
  },
  {
    title: "Whole Abdomen Doppler",
    fullDescription: "Evaluate blood flow in abdominal vessels.",
    slug: "whole-abdomen-doppler",
  },
  {
    title: "Foetal Doppler",
    fullDescription: "Monitor blood flow in fetal vessels.",
    slug: "foetal-doppler",
  },
  {
    title: "Venous Doppler",
    fullDescription: "Evaluate venous blood flow in extremities.",
    slug: "venous-doppler",
  },
  {
    title: "Carotid Doppler",
    fullDescription: "Assess carotid artery blood flow and blockages.",
    slug: "carotid-doppler",
  },
  {
    title: "Pleural Tapping (Diagnostic)",
    fullDescription: "Ultrasound-guided pleural fluid aspiration.",
    slug: "pleural-tapping-diagnostic",
  },
  {
    title: "Ascitic Fluid Aspiration (Diagnostic)",
    fullDescription: "Diagnostic aspiration of ascitic fluid.",
    slug: "ascitic-fluid-aspiration-diagnostic",
  },
  {
    title: "Ascitic Fluid Aspiration (Therapeutic)",
    fullDescription: "Therapeutic aspiration of ascitic fluid.",
    slug: "ascitic-fluid-aspiration-therapeutic",
  },
  {
    title: "Liver Abscess Aspiration",
    fullDescription:
      "USG-guided aspiration of liver abscess for diagnosis or therapy.",
    slug: "liver-abscess-aspiration",
  },
  {
    title: "Plain X-Ray",
    fullDescription: "Standard radiographic imaging for bones and chest.",
    slug: "plain-xray",
  },
  {
    title: "HSG (Hysterosalpingography)",
    fullDescription: "X-ray procedure to evaluate fallopian tubes and uterus.",
    slug: "hsg",
  },
  {
    title: "IVP (Intravenous Pyelography)",
    fullDescription: "X-ray contrast study for kidneys, ureters, and bladder.",
    slug: "ivp",
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

  return (
    <>
      <ServiceDetail slug={slug} />
    </>
  );
}
