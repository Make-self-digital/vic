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
      title: language === "english" ? "Whole Abdomen Scan" : "पूर्ण पेट स्कैन",
      fullDescription:
        language === "english"
          ? "Comprehensive scan covering liver, kidneys, pancreas and other abdominal organs to detect stones, cysts, or tumors."
          : "यकृत, गुर्दे, अग्न्याशय और अन्य पेट के अंगों को कवर करने वाला व्यापक स्कैन ताकि पथरी, सिस्ट या ट्यूमर का पता लगाया जा सके।",
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
      slug: "lower-abdomen",
      title: language === "english" ? "Lower Abdomen" : "निचला पेट",
      fullDescription:
        language === "english"
          ? "Focused ultrasound scan for lower abdominal organs such as bladder and reproductive organs."
          : "निचले पेट के अंगों जैसे मूत्राशय और प्रजनन अंगों के लिए केंद्रित अल्ट्रासाउंड स्कैन।",
      preparation:
        language === "english"
          ? "May need a full bladder before the scan."
          : "स्कैन से पहले मूत्राशय भरा होना चाहिए।",
      procedureTime:
        language === "english" ? "Approx. 15 minutes." : "लगभग 15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Accurate evaluation of lower abdominal organs."
          : "निचले पेट के अंगों का सटीक मूल्यांकन।",
      afterCare:
        language === "english"
          ? "No special aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "kub-scan",
      title:
        language === "english"
          ? "KUB Scan"
          : "किडनी, मूत्रवाहिनी और मूत्राशय स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound of kidneys, ureters, and bladder to detect stones, obstructions or infections."
          : "किडनी, मूत्रवाहिनी और मूत्राशय का अल्ट्रासाउंड ताकि पथरी, अवरोध या संक्रमण का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "Drink water and have a full bladder before scan."
          : "स्कैन से पहले पानी पिएँ और मूत्राशय भरा होना चाहिए।",
      procedureTime:
        language === "english" ? "Approx. 15-20 minutes." : "लगभग 15-20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Completely safe, non-invasive."
          : "पूरी तरह सुरक्षित, गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Helps detect urinary tract issues early."
          : "मूत्र मार्ग की समस्याओं का जल्दी पता लगाने में मदद करता है।",
      afterCare:
        language === "english"
          ? "No special aftercare."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "thyroid-scan",
      title: language === "english" ? "Thyroid Scan" : "थायरॉइड स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound evaluation of the thyroid gland to detect nodules, cysts, or enlargement."
          : "थायरॉइड ग्रंथि का अल्ट्रासाउंड मूल्यांकन ताकि गाँठें, सिस्ट या वृद्धि का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "10-15 minutes." : "10-15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Early detection of thyroid abnormalities."
          : "थायरॉइड असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "breast-scan",
      title: language === "english" ? "Breast Scan" : "स्तन स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound imaging of breast tissue to detect lumps, cysts, or other abnormalities."
          : "स्तन ऊतक की अल्ट्रासाउंड इमेजिंग ताकि गांठें, सिस्ट या अन्य असामान्यताओं का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "15-20 minutes." : "15-20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and painless."
          : "सुरक्षित और बिना दर्द।",
      benefits:
        language === "english"
          ? "Early detection of breast conditions."
          : "स्तन की स्थितियों का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "scrotum-scan",
      title: language === "english" ? "Scrotum Scan" : "स्क्रोटम स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound of the scrotum to evaluate testicles and surrounding tissues for abnormalities."
          : "अंडकोष और आसपास के ऊतकों का अल्ट्रासाउंड ताकि असामान्यताओं का मूल्यांकन किया जा सके।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "10-15 minutes." : "10-15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Detects testicular abnormalities early."
          : "अंडकोष की असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "soft-tissue-scan",
      title: language === "english" ? "Soft Tissue Scan" : "सॉफ्ट टिशू स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound for lumps, swelling or injuries in soft tissues."
          : "सतही गांठों, सूजन या चोटों के लिए अल्ट्रासाउंड।",
      preparation:
        language === "english"
          ? "No special preparation required."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "15 minutes." : "15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and painless."
          : "सुरक्षित और बिना दर्द।",
      benefits:
        language === "english"
          ? "Quick and accurate soft tissue evaluation."
          : "त्वरित और सटीक नरम ऊतक मूल्यांकन।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/abdomen-scan.jpg",
    },

    {
      slug: "follicular-monitoring",
      title:
        language === "english" ? "Follicular Monitoring" : "फॉलिकुलर मॉनिटरिंग",
      fullDescription:
        language === "english"
          ? "Track ovarian follicles for fertility evaluation and treatment planning."
          : "प्रजनन मूल्यांकन और उपचार योजना के लिए अंडाशय के फॉलिकल्स को ट्रैक करें।",
      preparation:
        language === "english"
          ? "May need a full bladder before scan."
          : "स्कैन से पहले मूत्राशय भरा होना चाहिए।",
      procedureTime: language === "english" ? "15 minutes." : "15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Assists in fertility treatment monitoring."
          : "प्रजनन उपचार की निगरानी में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "tvs-scan",
      title:
        language === "english"
          ? "TVS (Transvaginal Sonography)"
          : "टीवीएस (ट्रांसवेजाइनल सोनोग्राफी)",
      fullDescription:
        language === "english"
          ? "High-resolution scan for early pregnancy and pelvic organ assessment."
          : "प्रारंभिक गर्भावस्था और पेल्विक अंगों का उच्च-रिज़ॉल्यूशन स्कैन।",
      preparation:
        language === "english"
          ? "Empty bladder preferred."
          : "खाली मूत्राशय बेहतर।",
      procedureTime: language === "english" ? "15-20 minutes." : "15-20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe for early pregnancy assessment."
          : "प्रारंभिक गर्भावस्था मूल्यांकन के लिए सुरक्षित।",
      benefits:
        language === "english"
          ? "Early detection of fetal and pelvic abnormalities."
          : "भ्रूण और पेल्विक असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "nt-nb-scan",
      title:
        language === "english"
          ? "NT/NB Scan (11–13 Weeks)"
          : "एनटी/एनबी स्कैन (11–13 सप्ताह)",
      fullDescription:
        language === "english"
          ? "Nuchal translucency and nasal bone assessment for early fetal anomaly screening."
          : "भ्रूण में शुरुआती असामान्यताओं के स्क्रीनिंग के लिए नचल ट्रांसलुसेंसी और नाक की हड्डी का मूल्यांकन।",
      preparation:
        language === "english"
          ? "Full bladder recommended."
          : "पूर्ण मूत्राशय की सिफारिश।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe for mother and fetus."
          : "माँ और भ्रूण के लिए सुरक्षित।",
      benefits:
        language === "english"
          ? "Helps in early detection of chromosomal anomalies."
          : "क्रोमोसोमल असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "level-1-scan",
      title: language === "english" ? "Level-1 Scan" : "लेवल-1 स्कैन",
      fullDescription:
        language === "english"
          ? "Basic anomaly scan to evaluate fetal development in early pregnancy."
          : "प्रारंभिक गर्भावस्था में भ्रूण विकास का मूल्यांकन करने के लिए बुनियादी असामान्यता स्कैन।",
      preparation:
        language === "english"
          ? "Full bladder recommended."
          : "पूर्ण मूत्राशय की सिफारिश।",
      procedureTime: language === "english" ? "15–20 minutes." : "15–20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Early detection of developmental anomalies."
          : "विकासात्मक असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "level-2-scan",
      title: language === "english" ? "Level-2 Scan" : "लेवल-2 स्कैन",
      fullDescription:
        language === "english"
          ? "Detailed anomaly scan to check fetal organs and structures in detail."
          : "भ्रूण के अंगों और संरचनाओं का विस्तृत मूल्यांकन करने के लिए विस्तृत असामान्यता स्कैन।",
      preparation:
        language === "english"
          ? "Full bladder recommended."
          : "पूर्ण मूत्राशय की सिफारिश।",
      procedureTime: language === "english" ? "25–30 minutes." : "25–30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe for mother and fetus."
          : "माँ और भ्रूण के लिए सुरक्षित।",
      benefits:
        language === "english"
          ? "Detects structural abnormalities early."
          : "संरचनात्मक असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "foetal-wellbeing-scan",
      title:
        language === "english"
          ? "Foetal Wellbeing Scan"
          : "भ्रूण स्वास्थ्य स्कैन",
      fullDescription:
        language === "english"
          ? "Monitors fetal growth, movement, and amniotic fluid levels for overall wellbeing."
          : "भ्रूण की वृद्धि, गति और अम्नीओटिक द्रव स्तर की निगरानी करता है ताकि सामान्य स्वास्थ्य सुनिश्चित हो।",
      preparation:
        language === "english"
          ? "Full bladder may be needed."
          : "पूर्ण मूत्राशय की आवश्यकता हो सकती है।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe for mother and fetus."
          : "माँ और भ्रूण के लिए सुरक्षित।",
      benefits:
        language === "english"
          ? "Ensures normal fetal development and health."
          : "भ्रूण के सामान्य विकास और स्वास्थ्य को सुनिश्चित करता है।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "bpp-scan",
      title:
        language === "english"
          ? "BPP (Biophysical Profile)"
          : "बीपीपी (बायोफिजिकल प्रोफ़ाइल)",
      fullDescription:
        language === "english"
          ? "Evaluates fetal breathing, movement, muscle tone, and amniotic fluid."
          : "भ्रूण की श्वसन, गति, मांसपेशियों का टोन और अम्नीओटिक द्रव का मूल्यांकन करता है।",
      preparation:
        language === "english"
          ? "Full bladder recommended."
          : "पूर्ण मूत्राशय की सिफारिश।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Comprehensive fetal health assessment."
          : "भ्रूण के स्वास्थ्य का व्यापक मूल्यांकन।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "early-antenatal-scan",
      title:
        language === "english"
          ? "Early Antenatal Scan"
          : "प्रारंभिक गर्भधारण स्कैन",
      fullDescription:
        language === "english"
          ? "Confirms pregnancy, estimates gestational age, and checks early fetal development."
          : "गर्भावस्था की पुष्टि करता है, गर्भावस्था की आयु का अनुमान लगाता है और भ्रूण के शुरुआती विकास की जांच करता है।",
      preparation:
        language === "english"
          ? "Full bladder may be required."
          : "पूर्ण मूत्राशय की आवश्यकता हो सकती है।",
      procedureTime: language === "english" ? "15–20 minutes." : "15–20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Early confirmation and fetal assessment."
          : "गर्भावस्था की जल्दी पुष्टि और भ्रूण मूल्यांकन।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "dating-scan",
      title: language === "english" ? "Dating Scan" : "डेटिंग स्कैन",
      fullDescription:
        language === "english"
          ? "Ultrasound to estimate gestational age and expected due date of the fetus."
          : "भ्रूण की गर्भावस्था की आयु और अनुमानित प्रसव तिथि का अनुमान लगाने के लिए अल्ट्रासाउंड।",
      preparation:
        language === "english"
          ? "May require a full bladder for better imaging."
          : "बेहतर इमेजिंग के लिए मूत्राशय भरा होना चाहिए।",
      procedureTime: language === "english" ? "15–20 minutes." : "15–20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Helps determine accurate gestational age and due date."
          : "सटीक गर्भावस्था आयु और अनुमानित प्रसव तिथि निर्धारित करने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/pregnancy-ultrasound.jpg",
    },

    {
      slug: "whole-abdomen-doppler",
      title:
        language === "english" ? "Whole Abdomen Doppler" : "पूर्ण पेट डॉपलर",
      fullDescription:
        language === "english"
          ? "Evaluates blood flow in abdominal vessels using Doppler ultrasound."
          : "डॉपलर अल्ट्रासाउंड का उपयोग करके पेट की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "15 minutes." : "15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Detects vascular abnormalities early."
          : "रक्त वाहिका की असामान्यताओं का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/color-doppler.jpg",
    },

    {
      slug: "foetal-doppler",
      title: language === "english" ? "Foetal Doppler" : "भ्रूण डॉपलर",
      fullDescription:
        language === "english"
          ? "Monitors blood flow in fetal vessels to assess fetal health."
          : "भ्रूण के रक्त वाहिकाओं में रक्त प्रवाह की निगरानी करके भ्रूण स्वास्थ्य का मूल्यांकन।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "10–15 minutes." : "10–15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Assists in monitoring fetal wellbeing."
          : "भ्रूण के स्वास्थ्य की निगरानी में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/color-doppler.jpg",
    },

    {
      slug: "venous-doppler",
      title: language === "english" ? "Venous Doppler" : "शिरापरक डॉपलर",
      fullDescription:
        language === "english"
          ? "Evaluates venous blood flow in limbs to detect blockages or clots."
          : "अंगों में शिरापरक रक्त प्रवाह का मूल्यांकन ताकि ब्लॉकेज या थक्के का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "15 minutes." : "15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Early detection of venous disorders."
          : "शिरापरक विकारों का जल्दी पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/color-doppler.jpg",
    },

    {
      slug: "carotid-doppler",
      title: language === "english" ? "Carotid Doppler" : "कैरोटिड डॉपलर",
      fullDescription:
        language === "english"
          ? "Assesses carotid artery blood flow to detect blockages or narrowing."
          : "कैरोटिड धमनी में रक्त प्रवाह का मूल्यांकन ताकि ब्लॉकेज या संकीर्णता का पता लगाया जा सके।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "15 minutes." : "15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe and non-invasive."
          : "सुरक्षित और गैर-आक्रामक।",
      benefits:
        language === "english"
          ? "Prevents stroke by early detection of arterial issues."
          : "धमनी समस्याओं का जल्दी पता लगाकर स्ट्रोक को रोकने में मदद।",
      afterCare:
        language === "english"
          ? "No aftercare required."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/color-doppler.jpg",
    },

    {
      slug: "pleural-tapping-diagnostic",
      title:
        language === "english"
          ? "Pleural Tapping (Diagnostic)"
          : "प्ल्यूरल टैपिंग (नैदानिक)",
      fullDescription:
        language === "english"
          ? "Ultrasound-guided pleural fluid aspiration for diagnostic purposes."
          : "नैदानिक उद्देश्यों के लिए अल्ट्रासाउंड-निर्देशित प्ल्यूरल द्रव का अस्पिरेशन।",
      preparation:
        language === "english"
          ? "No food or drink restrictions."
          : "खाने या पीने की कोई सीमा नहीं।",
      procedureTime: language === "english" ? "20–30 minutes." : "20–30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Performed under sterile conditions."
          : "सफाई के नियमों के तहत किया जाता है।",
      benefits:
        language === "english"
          ? "Helps diagnose pleural diseases."
          : "प्ल्यूरल रोगों का निदान करने में मदद।",
      afterCare:
        language === "english"
          ? "Rest for few hours post-procedure."
          : "प्रक्रिया के बाद कुछ घंटे आराम करें।",
      image: "/serviceImg/diagnostic.png",
    },

    {
      slug: "ascitic-fluid-aspiration-diagnostic",
      title:
        language === "english"
          ? "Ascitic Fluid Aspiration (Diagnostic)"
          : "एस्किटिक द्रव अस्पिरेशन (नैदानिक)",
      fullDescription:
        language === "english"
          ? "Diagnostic aspiration of ascitic fluid under ultrasound guidance."
          : "अल्ट्रासाउंड मार्गदर्शन के तहत एस्किटिक द्रव का नैदानिक अस्पिरेशन।",
      preparation:
        language === "english"
          ? "No food restrictions."
          : "खाने की कोई सीमा नहीं।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe under sterile conditions."
          : "सफाई के नियमों के तहत सुरक्षित।",
      benefits:
        language === "english"
          ? "Identifies cause of ascites."
          : "Ascites का कारण पहचानने में मदद।",
      afterCare:
        language === "english"
          ? "Rest after procedure."
          : "प्रक्रिया के बाद आराम करें।",
      image: "/serviceImg/diagnostic.png",
    },

    {
      slug: "ascitic-fluid-aspiration-therapeutic",
      title:
        language === "english"
          ? "Ascitic Fluid Aspiration (Therapeutic)"
          : "एस्किटिक द्रव अस्पिरेशन (उपचारात्मक)",
      fullDescription:
        language === "english"
          ? "Therapeutic removal of excess ascitic fluid under ultrasound guidance."
          : "अल्ट्रासाउंड मार्गदर्शन के तहत अतिरिक्त एस्किटिक द्रव का उपचारात्मक निष्कासन।",
      preparation:
        language === "english"
          ? "No special preparation needed."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "30 minutes." : "30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe under sterile conditions."
          : "सफाई के नियमों के तहत सुरक्षित।",
      benefits:
        language === "english"
          ? "Relieves abdominal discomfort."
          : "पेट की असुविधा को कम करता है।",
      afterCare:
        language === "english"
          ? "Monitor for complications."
          : "जटिलताओं के लिए निगरानी करें।",
      image: "/serviceImg/diagnostic.png",
    },

    {
      slug: "liver-abscess-aspiration",
      title:
        language === "english"
          ? "Liver Abscess Aspiration"
          : "यकृत फोड़ा अस्पिरेशन",
      fullDescription:
        language === "english"
          ? "Ultrasound-guided aspiration of liver abscess for diagnosis or therapy."
          : "निदान या उपचार के लिए अल्ट्रासाउंड-निर्देशित यकृत फोड़ा अस्पिरेशन।",
      preparation:
        language === "english"
          ? "Fasting may be required."
          : "भूख/उपवास आवश्यक हो सकता है।",
      procedureTime: language === "english" ? "30–40 minutes." : "30–40 मिनट।",
      safetyInfo:
        language === "english"
          ? "Performed under sterile conditions."
          : "सफाई के नियमों के तहत किया जाता है।",
      benefits:
        language === "english"
          ? "Drains abscess and helps recovery."
          : "फोड़े को निकालता है और उपचार में मदद करता है।",
      afterCare:
        language === "english"
          ? "Observe for infection or bleeding."
          : "संक्रमण या रक्तस्राव के लिए निगरानी करें।",
      image: "/serviceImg/diagnostic.png",
    },

    {
      slug: "plain-xray",
      title: language === "english" ? "Plain X-Ray" : "साधारण एक्स-रे",
      fullDescription:
        language === "english"
          ? "Standard radiographic imaging for bones, chest, and other areas."
          : "हड्डियों, छाती और अन्य क्षेत्रों के लिए मानक रेडियोग्राफिक इमेजिंग।",
      preparation:
        language === "english"
          ? "No special preparation."
          : "कोई विशेष तैयारी आवश्यक नहीं।",
      procedureTime: language === "english" ? "10–15 minutes." : "10–15 मिनट।",
      safetyInfo:
        language === "english"
          ? "Safe with minimal radiation exposure."
          : "न्यूनतम विकिरण के साथ सुरक्षित।",
      benefits:
        language === "english"
          ? "Quick and effective diagnostic imaging."
          : "त्वरित और प्रभावी निदान इमेजिंग।",
      afterCare:
        language === "english"
          ? "No aftercare needed."
          : "कोई विशेष देखभाल आवश्यक नहीं।",
      image: "/serviceImg/usg-procedures.png",
    },

    {
      slug: "hsg",
      title:
        language === "english"
          ? "HSG (Hysterosalpingography)"
          : "HSG (हिस्टेरोसैल्पिनोग्राफी)",
      fullDescription:
        language === "english"
          ? "X-ray procedure to assess fallopian tubes and uterus."
          : "फैलोपियन ट्यूब और गर्भाशय का मूल्यांकन करने के लिए एक्स-रे प्रक्रिया।",
      preparation:
        language === "english"
          ? "Schedule after menstruation."
          : "मासिक धर्म के बाद निर्धारित करें।",
      procedureTime: language === "english" ? "20 minutes." : "20 मिनट।",
      safetyInfo:
        language === "english"
          ? "Minimal radiation; safe procedure."
          : "न्यूनतम विकिरण; सुरक्षित प्रक्रिया।",
      benefits:
        language === "english"
          ? "Helps in fertility evaluation."
          : "प्रजनन मूल्यांकन में मदद करता है।",
      afterCare:
        language === "english"
          ? "Rest and monitor for discomfort."
          : "आराम करें और असुविधा के लिए निगरानी करें।",
      image: "/serviceImg/usg-procedures.png",
    },

    {
      slug: "ivp",
      title:
        language === "english"
          ? "IVP (Intravenous Pyelography)"
          : "IVP (इंट्रावेनस पायलोग्राफी)",
      fullDescription:
        language === "english"
          ? "Contrast X-ray study to assess kidneys, ureters, and bladder function."
          : "किडनी, मूत्रवाहिनी और मूत्राशय के कार्य का मूल्यांकन करने के लिए कंट्रास्ट एक्स-रे अध्ययन।",
      preparation:
        language === "english"
          ? "Fasting may be required."
          : "भूख/उपवास आवश्यक हो सकता है।",
      procedureTime: language === "english" ? "20–30 minutes." : "20–30 मिनट।",
      safetyInfo:
        language === "english"
          ? "Contrast dye used; safe under supervision."
          : "कंट्रास्ट डाई का उपयोग; निगरानी में सुरक्षित।",
      benefits:
        language === "english"
          ? "Helps detect urinary tract abnormalities."
          : "मूत्र मार्ग की असामान्यताओं का पता लगाने में मदद।",
      afterCare:
        language === "english"
          ? "Drink plenty of water post-procedure."
          : "प्रक्रिया के बाद खूब पानी पिएं।",
      image: "/serviceImg/usg-procedures.png",
    },
  ];

  const service = serviceData.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <>
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto mt-16">
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
