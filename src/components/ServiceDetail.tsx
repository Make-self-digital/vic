"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { notFound } from "next/navigation";
import { useLanguage } from "@/hooks/LanguageContext";

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

const ServiceDetail = ({ slug }: { slug: string }) => {
  const { language } = useLanguage();

  const serviceData: ServiceDetails[] = [
    {
      slug: "whole-abdomen-scan",
      title: language === "english" ? "Whole Abdomen Scan" : "पूरा पेट स्कैन",
      fullDescription:
        language === "english"
          ? "This scan covers liver, kidneys, pancreas, gallbladder, and spleen to detect abnormalities like stones, cysts, or tumors. It helps in early diagnosis and monitoring of abdominal conditions."
          : "यह स्कैन लीवर, किडनी, पैनक्रियास, गॉल ब्लैडर और प्लीहा को कवर करता है ताकि पथरी, सिस्ट या ट्यूमर जैसी असामान्यताओं का पता लगाया जा सके। यह पेट की स्थितियों के शुरुआती निदान और निगरानी में मदद करता है।",
      preparation:
        language === "english"
          ? "Fast for 6-8 hours before scan."
          : "स्कैन से पहले 6-8 घंटे उपवास करें।",
      procedureTime:
        language === "english" ? "Approx. 15-20 minutes." : "लगभग 15-20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Completely safe, no radiation used."
          : "पूरी तरह सुरक्षित, कोई विकिरण नहीं।",
      benefits:
        language === "english"
          ? "Non-invasive, quick, and helps detect internal abnormalities early."
          : "गैर-आक्रामक, तेज़, और आंतरिक असामान्यताओं का जल्दी पता लगाने में मदद करता है।",
      afterCare:
        language === "english"
          ? "You can resume normal activities immediately after the scan."
          : "स्कैन के बाद आप सामान्य गतिविधियां तुरंत शुरू कर सकते हैं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },
    {
      slug: "pregnancy-ultrasound",
      title:
        language === "english"
          ? "Pregnancy Ultrasound"
          : "गर्भावस्था अल्ट्रासाउंड",
      fullDescription:
        language === "english"
          ? "Monitors fetal growth, checks heartbeat, and helps estimate due date. We also offer 3D/4D scans for detailed visualization of the fetus and pregnancy tracking."
          : "भ्रूण की वृद्धि की निगरानी करता है, हृदय की धड़कन की जांच करता है, और अनुमानित डिलीवरी तिथि का अनुमान लगाने में मदद करता है। हम 3D/4D स्कैन भी प्रदान करते हैं ताकि भ्रूण और गर्भावस्था का विस्तृत अवलोकन किया जा सके।",
      preparation:
        language === "english"
          ? "Full bladder may be required in early stages."
          : "प्रारंभिक चरणों में पूर्ण मूत्राशय की आवश्यकता हो सकती है।",
      procedureTime: language === "english" ? "15-30 minutes." : "15-30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe for mother and baby."
          : "माँ और बच्चे के लिए सुरक्षित।",
      benefits:
        language === "english"
          ? "Essential for prenatal care and ensuring fetal well-being."
          : "गर्भावस्था देखभाल और भ्रूण की भलाई सुनिश्चित करने के लिए आवश्यक।",
      afterCare:
        language === "english"
          ? "No special aftercare needed. Discuss results with your doctor."
          : "कोई विशेष देखभाल आवश्यक नहीं। परिणामों पर अपने डॉक्टर से चर्चा करें।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },
    {
      slug: "color-doppler-studies",
      title:
        language === "english" ? "Color Doppler Studies" : "कलर डॉपलर स्टडीज़",
      fullDescription:
        language === "english"
          ? "Analyzes blood flow in veins and arteries, often used in pregnancy or vascular evaluations. Helps in detecting blockages, narrowing of vessels, and blood clots."
          : "शिराओं और धमनियों में रक्त प्रवाह का विश्लेषण करता है, अक्सर गर्भावस्था या संवहनी मूल्यांकन में उपयोग किया जाता है। यह ब्लॉकेज, वाहिकाओं की संकुचन और रक्त के थक्के का पता लगाने में मदद करता है।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Non-invasive and safe."
          : "गैर-आक्रामक और सुरक्षित।",
      benefits:
        language === "english"
          ? "Vital for cardiovascular assessments and fetal blood circulation checks."
          : "हृदय और रक्त परिसंचरण के मूल्यांकन और भ्रूण रक्त प्रवाह की जाँच के लिए महत्वपूर्ण।",
      afterCare:
        language === "english"
          ? "Return to normal activities right after the scan."
          : "स्कैन के तुरंत बाद सामान्य गतिविधियों पर लौटें।",
      image: "/serviceImg/color-doppler.jpg",
    },
    {
      slug: "musculoskeletal-scan",
      title:
        language === "english"
          ? "Musculoskeletal Scan"
          : "मस्कुलोस्केलेटल स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound examination of muscles, joints, tendons, and soft tissues to detect tears, inflammation, or fluid."
          : "स्नायु, जोड़, टेंडन और नरम ऊतकों की अल्ट्रासाउंड जांच ताकि आँसू, सूजन या तरल का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "Wear comfortable clothing. Remove jewelry from the area being examined."
          : "आरामदायक कपड़े पहनें। जांच किए जा रहे क्षेत्र से आभूषण हटा दें।",
      procedureTime: language === "english" ? "20-30 minutes." : "20-30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and painless imaging method."
          : "सुरक्षित और बिना दर्द की इमेजिंग विधि।",
      benefits:
        language === "english"
          ? "Accurate diagnosis of musculoskeletal issues without radiation."
          : "स्नायु और जोड़ की समस्याओं का सटीक निदान बिना विकिरण के।",
      afterCare:
        language === "english"
          ? "Resume normal activities after the scan."
          : "स्कैन के बाद सामान्य गतिविधियों को फिर से शुरू करें।",
      image: "/serviceImg/musculoskeletal.jpg",
    },
    {
      slug: "usg-guided-procedures",
      title:
        language === "english"
          ? "USG-Guided Procedures"
          : "यूएसजी-निर्देशित प्रक्रियाएं",
      fullDescription:
        language === "english"
          ? "Ultrasound-guided techniques used for FNAC, biopsies, and fluid aspirations, ensuring accurate targeting."
          : "एफएनएसी, बायोप्सी और तरल आस्पिरेशन के लिए अल्ट्रासाउंड-निर्देशित तकनीकें, सटीक लक्ष्य सुनिश्चित करती हैं।",
      preparation:
        language === "english"
          ? "May vary depending on the procedure. Usually requires consent."
          : "प्रक्रिया के आधार पर भिन्न हो सकता है। आमतौर पर सहमति की आवश्यकता होती है।",
      procedureTime:
        language === "english"
          ? "30-45 minutes depending on the procedure."
          : "प्रक्रिया के आधार पर 30-45 मिनट।",
      safetyInfo:
        language === "english"
          ? "Minimally invasive, safer than blind techniques."
          : "न्यूनतम आक्रामक, बिना दिशानिर्देश तकनीकों से सुरक्षित।",
      benefits:
        language === "english"
          ? "Precise guidance increases safety and effectiveness of minor procedures."
          : "सटीक मार्गदर्शन छोटी प्रक्रियाओं की सुरक्षा और प्रभावकारिता बढ़ाता है।",
      afterCare:
        language === "english"
          ? "Follow specific instructions provided by the doctor post-procedure."
          : "प्रक्रिया के बाद डॉक्टर द्वारा दिए गए विशेष निर्देशों का पालन करें।",
      image: "/serviceImg/usg-procedures.png",
    },
    {
      slug: "diagnostic-ultrasound",
      title:
        language === "english"
          ? "Diagnostic Ultrasound"
          : "निदानात्मक अल्ट्रासाउंड",
      fullDescription:
        language === "english"
          ? "General high-resolution ultrasound to assess various internal organs for early detection of abnormalities."
          : "विभिन्न आंतरिक अंगों का मूल्यांकन करने के लिए सामान्य उच्च-रिज़ॉल्यूशन अल्ट्रासाउंड ताकि असामान्यताओं का जल्दी पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "Depends on the organ being scanned (fasting, full bladder, etc)."
          : "जिस अंग की जांच की जा रही है उस पर निर्भर करता है (उपवास, पूर्ण मूत्राशय, आदि)।",
      procedureTime: language === "english" ? "15-25 minutes." : "15-25 मिनट।",
      safetyInfo:
        language === "english"
          ? "Completely safe with no ionizing radiation."
          : "पूरी तरह सुरक्षित, कोई आयनकारी विकिरण नहीं।",
      benefits:
        language === "english"
          ? "Versatile and fast tool for clinical diagnosis."
          : "क्लिनिकल निदान के लिए बहुउद्देशीय और तेज़ उपकरण।",
      afterCare:
        language === "english"
          ? "No aftercare required in most cases."
          : "अधिकांश मामलों में कोई देखभाल आवश्यक नहीं।",
      image: "/serviceImg/diagnostic.png",
    },
  ];

  const service = serviceData.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <>
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
                priority
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
                  {language === "english" ? "Preparation" : "तैयारी"}
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
                  {language === "english"
                    ? "Procedure Time"
                    : "प्रक्रिया का समय"}
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
                  {language === "english" ? "Safety Info" : "सुरक्षा जानकारी"}
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
                <h3 className="text-md font-semibold text-gray-800">
                  {language === "english" ? "Benefits" : "लाभ"}
                </h3>
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
                  {language === "english"
                    ? "Aftercare Instructions"
                    : "देखभाल के निर्देश"}
                </h3>
                <p className="text-sm text-gray-600">{service.afterCare}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
