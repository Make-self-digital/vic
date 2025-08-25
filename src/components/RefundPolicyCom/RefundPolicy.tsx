"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ListTree, ShieldCheck, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

export default function RefundPolicyPage() {
  const { language } = useLanguage();

  const CLINIC_NAME =
    language === "english"
      ? "Vaishnavi Imaging center(Ultrasound)"
      : "वैष्णवी इमेजिंग सेंटर(अल्ट्रासाउंड)";

  const EFFECTIVE_DATE =
    language === "english" ? "25 Aug 2025" : "25 अगस्त 2025";

  const toc = useMemo(
    () => [
      { id: "intro", label: language === "english" ? "Introduction" : "परिचय" },
      {
        id: "eligibility",
        label: language === "english" ? "Eligibility" : "पात्रता",
      },
      {
        id: "process",
        label: language === "english" ? "Refund Process" : "रिफंड प्रक्रिया",
      },
      {
        id: "timeline",
        label: language === "english" ? "Timeline" : "समय सीमा",
      },
      { id: "contact", label: language === "english" ? "Contact" : "संपर्क" },
    ],
    [language]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="mt-12 font-sans">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide text-[#1e4d4e]">
                {CLINIC_NAME} —{" "}
                {language === "english" ? "Refund Policy" : "रिफंड नीति"}
              </h1>
              <p className="text-sm text-slate-500 tracking-wide">
                {language === "english" ? "Effective:" : "प्रभावी"}:{" "}
                {EFFECTIVE_DATE}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6">
          {/* TOC Sidebar */}
          <Card className="bg-white sticky top-4 h-max hidden md:block border border-gray-300">
            <CardHeader>
              <CardTitle className="text-sm font-semibold tracking-wide flex items-center gap-2">
                <ListTree className="size-4 text-emerald-600" />{" "}
                {language === "english" ? "On this page" : "इस पृष्ठ पर"}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-3">
              <ScrollArea className="pr-2">
                <ul className="space-y-2 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <button
                        onClick={() => scrollTo(t.id)}
                        className="text-left w-full text-slate-600 hover:text-emerald-700 transition-colors tracking-wide cursor-pointer mb-0.5">
                        {t.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-6">
            {/* INTRODUCTION */}
            <PolicyCard
              id="intro"
              title={language === "english" ? "Introduction" : "परिचय"}
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === "english"
                  ? `${CLINIC_NAME} values transparency and customer satisfaction. This Refund Policy explains conditions under which refunds are issued. Refunds are intended to ensure fairness and maintain trust with our patients. We strive to handle each request promptly and with clarity. Please read the eligibility and process sections carefully to understand how refunds are managed.`
                  : `${CLINIC_NAME} पारदर्शिता और ग्राहक संतोष को महत्व देता है। यह रिफंड नीति उन परिस्थितियों को स्पष्ट करती है जिनमें रिफंड प्रदान किए जाते हैं। रिफंड का उद्देश्य निष्पक्षता सुनिश्चित करना और हमारे रोगियों के साथ विश्वास बनाए रखना है। हम प्रत्येक अनुरोध को शीघ्र और स्पष्ट रूप से संभालने का प्रयास करते हैं। कृपया पात्रता और प्रक्रिया अनुभागों को ध्यानपूर्वक पढ़ें ताकि यह समझ सकें कि रिफंड कैसे प्रबंधित किए जाते हैं।`}
              </p>
            </PolicyCard>

            {/* ELIGIBILITY */}
            <PolicyCard
              id="eligibility"
              title={language === "english" ? "Eligibility" : "पात्रता"}
              icon={<FileText className="h-5 w-5 text-emerald-600" />}>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 leading-relaxed">
                <li>
                  {language === "english"
                    ? "Refunds are applicable only for prepaid services not availed."
                    : "रिफंड केवल उन प्रीपेइड सेवाओं के लिए लागू होते हैं जो उपयोग नहीं की गई हों।"}
                </li>
                <li>
                  {language === "english"
                    ? "Refunds are not available for completed services or reports already delivered."
                    : "पूरा की गई सेवाओं या पहले से प्रदान की गई रिपोर्ट के लिए रिफंड उपलब्ध नहीं है।"}
                </li>
                <li>
                  {language === "english"
                    ? "Refund requests must be submitted within 7 days from the date of payment."
                    : "रिफंड अनुरोध भुगतान की तारीख से 7 दिनों के भीतर जमा करना आवश्यक है।"}
                </li>
                <li>
                  {language === "english"
                    ? "Services canceled due to operational issues or clinic errors are eligible for full refund."
                    : "संचालन संबंधी समस्याओं या क्लिनिक की गलती के कारण रद्द की गई सेवाओं के लिए पूरा रिफंड पात्र है।"}
                </li>
                <li>
                  {language === "english"
                    ? "Partial refunds may apply in cases where services were partially availed or discounts/promotions were used."
                    : "यदि सेवाओं का आंशिक उपयोग किया गया हो या छूट/प्रमोशन लागू थे, तो आंशिक रिफंड लागू हो सकता है।"}
                </li>
                <li>
                  {language === "english"
                    ? "Refunds will be processed only to the original mode of payment."
                    : "रिफंड केवल मूल भुगतान के तरीके पर ही संसाधित किया जाएगा।"}
                </li>
              </ul>
            </PolicyCard>

            {/* REFUND PROCESS */}
            <PolicyCard
              id="process"
              title={
                language === "english" ? "Refund Process" : "रिफंड प्रक्रिया"
              }
              icon={<FileText className="h-5 w-5 text-emerald-600" />}>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === "english"
                  ? "To request a refund, contact our support team with your payment details and reason for refund."
                  : "रिफंड का अनुरोध करने के लिए, अपने भुगतान विवरण और रिफंड का कारण हमारे सपोर्ट टीम से संपर्क करें।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Refund requests should be submitted within 7 days from the date of payment."
                  : "रिफंड अनुरोध भुगतान की तारीख से 7 दिनों के भीतर जमा करना आवश्यक है।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Our team will verify the request, check the service usage, and ensure eligibility for refund."
                  : "हमारी टीम अनुरोध की सत्यापन करेगी, सेवा के उपयोग की जांच करेगी, और रिफंड के लिए पात्रता सुनिश्चित करेगी।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Once approved, refunds will be processed to the original mode of payment within 5-10 business days."
                  : "स्वीकृति मिलने के बाद, रिफंड मूल भुगतान के तरीके पर 5-10 कार्य दिवसों में प्रोसेस किया जाएगा।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "In case of disputes or delays, our support team will provide updates and assistance throughout the process."
                  : "विवाद या विलंब की स्थिति में, हमारी सपोर्ट टीम पूरे प्रक्रिया के दौरान अपडेट और सहायता प्रदान करेगी।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Partial refunds may apply if services were partially availed or promotions were used."
                  : "यदि सेवाओं का आंशिक उपयोग किया गया हो या प्रमोशन लागू थे, तो आंशिक रिफंड लागू हो सकता है।"}
              </p>
            </PolicyCard>

            {/* TIMELINE */}
            <PolicyCard
              id="timeline"
              title={language === "english" ? "Timeline" : "समय सीमा"}
              icon={<FileText className="h-5 w-5 text-emerald-600" />}>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 leading-relaxed">
                <li>
                  {language === "english"
                    ? "Refund requests are processed within 7–10 business days."
                    : "रिफंड अनुरोध 7–10 कार्य दिवसों में प्रोसेस किए जाते हैं।"}
                </li>
                <li>
                  {language === "english"
                    ? "Verification of your request may take 1–2 business days."
                    : "आपके अनुरोध की सत्यापन प्रक्रिया 1–2 कार्य दिवसों में पूरी हो सकती है।"}
                </li>
                <li>
                  {language === "english"
                    ? "Refund amount will be credited back to the original payment method."
                    : "रिफंड राशि मूल भुगतान विधि में वापस जमा की जाएगी।"}
                </li>
                <li>
                  {language === "english"
                    ? "In case of partial services or promotional discounts, refund processing may take longer."
                    : "आंशिक सेवाओं या प्रमोशनल डिस्काउंट की स्थिति में, रिफंड प्रोसेसिंग में अधिक समय लग सकता है।"}
                </li>
                <li>
                  {language === "english"
                    ? "You will receive email or SMS updates at each stage of the refund process."
                    : "रिफंड प्रक्रिया के प्रत्येक चरण में आपको ईमेल या SMS के माध्यम से अपडेट प्राप्त होंगे।"}
                </li>
                <li>
                  {language === "english"
                    ? "If any issues arise, our support team will contact you within 24 hours."
                    : "यदि कोई समस्या उत्पन्न होती है, तो हमारी सपोर्ट टीम 24 घंटे के भीतर आपसे संपर्क करेगी।"}
                </li>
              </ul>
            </PolicyCard>

            {/* CONTACT */}
            <PolicyCard
              id="contact"
              title={language === "english" ? "Contact Us" : "संपर्क करें"}
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === "english"
                  ? "For any refund queries, contact us at info@vaishnaviultrasound.com or call +91-7004787351."
                  : "किसी भी रिफंड संबंधी प्रश्न के लिए, हमसे info@vaishnaviultrasound.com पर संपर्क करें या +91-7004787351 पर कॉल करें।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Our support team is available Monday to Saturday, 7:30 AM to 8:00 PM."
                  : "हमारी सपोर्ट टीम सोमवार से शनिवार, सुबह 7:30 बजे से शाम 8:00 बजे तक उपलब्ध है।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "You can also reach us via WhatsApp at +91-7004787351 for faster response."
                  : "त्वरित प्रतिक्रिया के लिए आप हमें WhatsApp पर +91-7004787351 पर भी संपर्क कर सकते हैं।"}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {language === "english"
                  ? "Please provide your payment details and reason for refund to help us process your request efficiently."
                  : "कृपया अपने भुगतान विवरण और रिफंड का कारण प्रदान करें ताकि हम आपका अनुरोध कुशलतापूर्वक प्रोसेस कर सकें।"}
              </p>
            </PolicyCard>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicyCard({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card
      id={id}
      className="rounded-2xl border border-gray-300 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center tracking-wide gap-2 text-[#1e4d4e] text-base font-bold">
          {icon} <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-slate text-gray-800 tracking-wide text-sm max-w-none mt-[-30px]">
        {children}
      </CardContent>
    </Card>
  );
}
