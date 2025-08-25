"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ShieldCheck,
  FileText,
  Lock,
  Gavel,
  Globe,
  Mail,
  Phone,
  MapPin,
  ListTree,
} from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

export default function PrivacyAndTermsPage() {
  // language:-
  const { language } = useLanguage();

  const CLINIC_NAME =
    language === "english"
      ? "Vaishnavi Imaging center(Ultrasound)"
      : "वैष्णवी इमेजिंग सेंटर(अल्ट्रासाउंड)";

  const EFFECTIVE_DATE =
    language === "english" ? "25 Aug 2025" : "25 अगस्त 2025";

  const ADDRESS =
    language === "english"
      ? "NH-139, Tiwari Mohalla, Bhakharua, Daudnagar, Bihar"
      : "एनएच-139, तिवारी मोहल्ला, भखरुआ, दाऊदनगर, बिहार";

  const PHONE = "+91-7004787351";
  const EMAIL = "info@vaishnaviultrasound.com";

  const toc = useMemo(
    () => [
      { id: "intro", label: language === "english" ? "Introduction" : "परिचय" },
      {
        id: "collection",
        label:
          language === "english"
            ? "Information We Collect"
            : "हम कौन सी जानकारी एकत्र करते हैं",
      },
      {
        id: "use",
        label:
          language === "english"
            ? "How We Use Information"
            : "हम जानकारी का उपयोग कैसे करते हैं",
      },
      {
        id: "lawful",
        label:
          language === "english" ? "Lawful Basis (GDPR)" : "कानूनी आधार (GDPR)",
      },
      {
        id: "sharing",
        label:
          language === "english"
            ? "Sharing & Disclosures"
            : "जानकारी साझा करना और खुलासे",
      },
      {
        id: "security",
        label:
          language === "english"
            ? "Data Security (HIPAA safeguards)"
            : "डेटा सुरक्षा (HIPAA उपाय)",
      },
      {
        id: "retention",
        label: language === "english" ? "Data Retention" : "डेटा संरक्षण अवधि",
      },
      {
        id: "rights",
        label:
          language === "english"
            ? "Your Rights (GDPR/CCPA)"
            : "आपके अधिकार (GDPR/CCPA)",
      },
      {
        id: "cookies",
        label:
          language === "english" ? "Cookies & Tracking" : "कुकीज़ और ट्रैकिंग",
      },
      {
        id: "intl",
        label:
          language === "english"
            ? "International Transfers"
            : "अंतरराष्ट्रीय स्थानांतरण",
      },
      {
        id: "children",
        label:
          language === "english" ? "Children’s Privacy" : "बच्चों की गोपनीयता",
      },
      {
        id: "changes",
        label:
          language === "english"
            ? "Changes to this Policy"
            : "इस नीति में बदलाव",
      },
      {
        id: "contact",
        label: language === "english" ? "Contact Us" : "हमसे संपर्क करें",
      },
      {
        id: "terms",
        label: language === "english" ? "Terms of Service" : "सेवा की शर्तें",
      },
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
                {language === "english"
                  ? "Privacy Policy & Terms"
                  : "गोपनीयता नीति और नियम व शर्तें"}
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
          {/* TOC sidebar */}
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
            <Tabs defaultValue="privacy" className="w-full">
              {/* TABS */}
              <TabsList className="grid grid-cols-2 gap-2 w-full mb-6">
                <TabsTrigger
                  value="privacy"
                  className="bg-white flex items-center gap-2 font-semibold tracking-wide text-sm cursor-pointer border border-gray-300 py-3">
                  <Lock className="h-4 w-4 text-emerald-600" />{" "}
                  {language === "english" ? "Privacy Policy" : "गोपनीयता नीति"}
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="bg-white flex items-center gap-2 tracking-wide text-sm font-semibold cursor-pointer border border-gray-300">
                  <FileText className="h-4 w-4 text-emerald-600" />{" "}
                  {language === "english"
                    ? "Terms of Service"
                    : "सेवा की शर्तें"}
                </TabsTrigger>
              </TabsList>

              {/* PRIVACY */}
              <TabsContent value="privacy" className="space-y-6">
                {/* INTRODUCTION */}
                <PolicyCard
                  id="intro"
                  title={language === "english" ? "Introduction" : "परिचय"}
                  icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {CLINIC_NAME}{" "}
                    {language === "english"
                      ? "value your privacy and are committed to protecting your personal and medical information in compliance with applicable laws, including the Information Technology Act, 2000 (India), GDPR (EU), CCPA (California), and HIPAA (Health Insurance Portability and Accountability Act). We collect and use personal and medical information in a way that is consistent with these laws, and healthcare best practices such as HIPAA safeguards."
                      : "आपकी गोपनीयता का सम्मान करता हैं और आपके व्यक्तिगत तथा चिकित्सीय डेटा की सुरक्षा के लिए प्रतिबद्ध हैं। यह सुरक्षा लागू कानूनों जैसे सूचना प्रौद्योगिकी अधिनियम, 2000 (भारत), GDPR (यूरोपीय संघ), CCPA (कैलिफ़ोर्निया) और HIPAA (हेल्थ इंश्योरेंस पोर्टेबिलिटी एंड अकाउंटेबिलिटी एक्ट) के अनुरूप सुनिश्चित की जाती है। हमारे डेटा उपयोग और प्रबंधन की प्रक्रिया इन नियमों और स्वास्थ्य सेवा मानकों के अनुरूप है, ताकि आपकी जानकारी की गोपनीयता, अखंडता और सुरक्षा बनी रहे।"}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "This Policy explains what information we collect, how we use it, and the choices available to you. By accessing or using our services, you acknowledge and agree to the terms outlined in this Policy."
                      : "यह नीति बताती है कि हम कौन-सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं और आपके लिए उपलब्ध विकल्प क्या हैं। हमारी सेवाओं का उपयोग या उन तक पहुँच कर, आप इस नीति में बताए गए नियमों को स्वीकार करते हैं और उनसे सहमत होते हैं।"}
                  </p>
                </PolicyCard>

                {/* INFORMATION WE COLLECT */}
                <PolicyCard
                  id="collection"
                  title={
                    language === "english"
                      ? "Information We Collect"
                      : "हम कौन सी जानकारी एकत्र करते हैं"
                  }
                  icon={<Globe className="h-5 w-5 text-emerald-600" />}>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 leading-relaxed">
                    <li>
                      <strong>
                        {language === "english"
                          ? "Identity & Contact"
                          : "पहचान और संपर्क"}
                      </strong>
                      :{" "}
                      {language === "english"
                        ? "name, age, gender, phone, address"
                        : "नाम, आयु, लिंग, फ़ोन, पता"}
                    </li>
                    <li>
                      <strong>
                        {language === "english"
                          ? "Medical Data"
                          : "चिकित्सा डेटा"}
                      </strong>
                      :{" "}
                      {language === "english"
                        ? "referrals, appointments, ultrasound details, images/reports"
                        : "रेफरल, अपॉइंटमेंट, अल्ट्रासाउंड विवरण, इमेज/रिपोर्ट"}
                    </li>
                    <li>
                      <strong>
                        {language === "english" ? "Billing" : "बिलिंग"}
                      </strong>
                      :{" "}
                      {language === "english"
                        ? "payment mode, transaction IDs (no card data stored on our servers unless necessary)"
                        : "भुगतान का तरीका, लेन-देन आईडी (जब तक आवश्यक न हो, हमारे सर्वर पर कार्ड डेटा संग्रहीत नहीं किया जाता)"}
                    </li>
                    <li>
                      <strong>
                        {language === "english" ? "Technical" : "तकनीकी"}
                      </strong>
                      :{" "}
                      {language === "english"
                        ? "IP, device, browser, cookies/analytics (website/app usage)"
                        : "आईपी, डिवाइस, ब्राउज़र, कुकीज़/विश्लेषण (वेबसाइट/एप उपयोग)"}
                    </li>
                  </ul>
                </PolicyCard>

                {/* HOW WE USE INFORMATION */}
                <PolicyCard
                  id="use"
                  title={
                    language === "english"
                      ? "How We Use Information"
                      : "हम जानकारी का उपयोग कैसे करते हैं"
                  }
                  icon={<FileText className="h-5 w-5 text-emerald-600" />}>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 leading-relaxed">
                    <li>
                      {language === "english"
                        ? "Schedule and confirm appointments; deliver reports."
                        : "अपॉइंटमेंट निर्धारित और पुष्टि करें; रिपोर्ट प्रदान करें।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Operate, maintain and improve clinical services and website."
                        : "क्लिनिकल सेवाओं और वेबसाइट को संचालित, बनाए रखें और सुधारें।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Process payments and prevent fraud."
                        : "भुगतान प्रोसेस करें और धोखाधड़ी को रोकें।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Comply with medical, legal and regulatory obligations."
                        : "चिकित्सा, कानूनी और नियामक दायित्वों का पालन करें।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Communicate updates, reminders, support and service notices."
                        : "अपडेट, रिमाइंडर, सपोर्ट और सेवा सूचनाएं साझा करें।"}
                    </li>
                  </ul>
                </PolicyCard>

                {/* GDPR LAWFUL BASIS */}
                <PolicyCard
                  id="lawful"
                  title={
                    language === "english"
                      ? "Lawful Basis for Processing (GDPR)"
                      : "कानूनी आधार पर प्रसंस्करण (GDPR)"
                  }
                  icon={<Gavel className="h-5 w-5 text-emerald-600" />}>
                  <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-slate-600">
                    <li>
                      <strong>
                        {language === "english" ? "Consent" : "सहमति"}
                      </strong>{" "}
                      –{" "}
                      {language === "english"
                        ? "for communications, optional analytics, or sharing with third parties."
                        : "संचार, वैकल्पिक विश्लेषण, या तीसरे पक्ष के साथ साझा करने के लिए।"}
                    </li>
                    <li>
                      <strong>
                        {language === "english" ? "Contract" : "अनुबंध"}
                      </strong>{" "}
                      –{" "}
                      {language === "english"
                        ? "to provide requested healthcare services."
                        : "अनुरोधित स्वास्थ्य सेवाएं प्रदान करने के लिए।"}
                    </li>
                    <li>
                      <strong>
                        {language === "english"
                          ? "Legal Obligation"
                          : "कानूनी दायित्व"}
                      </strong>{" "}
                      –{" "}
                      {language === "english"
                        ? "record-keeping, public health, court orders."
                        : "रिकॉर्ड रखने, सार्वजनिक स्वास्थ्य, और न्यायालय के आदेशों के लिए।"}
                    </li>
                    <li>
                      <strong>
                        {language === "english"
                          ? "Vital Interests"
                          : "महत्वपूर्ण हित"}
                      </strong>{" "}
                      –{" "}
                      {language === "english"
                        ? "to protect life or health in emergencies."
                        : "आपातकाल में जीवन या स्वास्थ्य की सुरक्षा के लिए।"}
                    </li>
                    <li>
                      <strong>
                        {language === "english"
                          ? "Legitimate Interests"
                          : "वैध हित"}
                      </strong>{" "}
                      –{" "}
                      {language === "english"
                        ? "secure operations and service improvement."
                        : "सुरक्षित संचालन और सेवा सुधार के लिए।"}
                    </li>
                  </ul>
                </PolicyCard>

                {/* SHARING & DISCLOSURES */}
                <PolicyCard
                  id="sharing"
                  title={
                    language === "english"
                      ? "Sharing & Disclosures"
                      : "जानकारी साझा करना और खुलासे"
                  }
                  icon={<Globe className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {language === "english"
                      ? "We never sell your personal information. We may share limited data with:"
                      : "हम कभी भी आपकी व्यक्तिगत जानकारी नहीं बेचते। हम सीमित डेटा साझा कर सकते हैं:"}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm text-slate-600 leading-relaxed">
                    <li>
                      {language === "english"
                        ? "Healthcare providers/labs for treatment and diagnostics."
                        : "उपचार और निदान के लिए स्वास्थ्य सेवा प्रदाता / प्रयोगशालाओं के साथ।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Payment processors for transactions."
                        : "लेनदेन के लिए भुगतान प्रोसेसर।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "IT/vendors under confidentiality and data-processing agreements."
                        : "गोपनीयता और डेटा-प्रसंस्करण समझौतों के तहत आईटी/विक्रेताओं के साथ।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Authorities where required by law."
                        : "जहां कानून द्वारा आवश्यक हो, प्राधिकरणों के साथ।"}
                    </li>
                  </ul>
                </PolicyCard>

                {/* SECURITY */}
                <PolicyCard
                  id="security"
                  title={
                    language === "english"
                      ? "Data Security (HIPAA safeguards)"
                      : "डेटा सुरक्षा (HIPAA उपाय)"
                  }
                  icon={<Lock className="h-5 w-5 text-emerald-600" />}>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="a1">
                      <AccordionTrigger className="font-semibold tracking-wide text-md text-gray-800 cursor-pointer">
                        {language === "english"
                          ? "Administrative Safeguards"
                          : "प्रशासनिक सुरक्षा उपाय"}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 leading-relaxed">
                        {language === "english"
                          ? "Role-based access, staff training, signed NDAs/BAAs with vendors, incident response and audits."
                          : "भूमिका-आधारित पहुंच, कर्मचारी प्रशिक्षण, विक्रेताओं के साथ हस्ताक्षरित NDA/BAA, घटना प्रतिक्रिया और ऑडिट।"}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="a2">
                      <AccordionTrigger className="font-semibold tracking-wide text-md text-gray-800 cursor-pointer">
                        {language === "english"
                          ? "Technical Safeguards"
                          : "तकनीकी सुरक्षा उपाय"}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 leading-relaxed">
                        {language === "english"
                          ? "Encryption in transit and at rest where applicable, strong authentication, backups, logging."
                          : "जहाँ लागू हो, ट्रांज़िट और रेस्ट में एन्क्रिप्शन, मजबूत प्रमाणीकरण, बैकअप और लॉगिंग।"}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="a3">
                      <AccordionTrigger className="font-semibold tracking-wide text-md text-gray-800 cursor-pointer">
                        {language === "english"
                          ? "Physical Safeguards"
                          : "भौतिक सुरक्षा उपाय"}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 leading-relaxed">
                        {language === "english"
                          ? "Secure premises, device controls, restricted areas for medical records and imaging."
                          : "सुरक्षित परिसर, डिवाइस नियंत्रण, चिकित्सा रिकॉर्ड और इमेजिंग के लिए सीमित क्षेत्रों।"}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </PolicyCard>

                {/* RETENTION */}
                <PolicyCard
                  id="retention"
                  title={
                    language === "english"
                      ? "Data Retention"
                      : "डेटा संरक्षण अवधि"
                  }
                  icon={<FileText className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "We retain medical records and invoices for the period mandated by applicable law or clinical guidance. Where no such mandate exists, we keep data only as long as necessary for the purposes stated in this Policy, after which it is securely deleted or anonymized."
                      : "हम चिकित्सा रिकॉर्ड और चालान लागू कानून या नैदानिक मार्गदर्शन द्वारा निर्धारित अवधि के लिए रखते हैं। जहाँ ऐसा कोई निर्देश नहीं है, हम डेटा केवल आवश्यक अवधि के लिए ही रखते हैं, जिसके बाद इसे सुरक्षित रूप से हटा दिया जाता है या गुमनाम कर दिया जाता है।"}
                  </p>
                </PolicyCard>

                {/* RIGHTS */}
                <PolicyCard
                  id="rights"
                  title={
                    language === "english"
                      ? "Your Rights (GDPR/CCPA)"
                      : "आपके अधिकार (GDPR/CCPA)"
                  }
                  icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
                    <li>
                      {language === "english"
                        ? "Access, correction, update, or deletion of your personal data."
                        : "अपने व्यक्तिगत डेटा तक पहुँच, सुधार, अपडेट या हटाने का अधिकार।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Withdraw consent where processing is based on consent."
                        : "जहाँ डेटा प्रसंस्करण सहमति पर आधारित हो, वहाँ सहमति वापस लेने का अधिकार।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Data portability and right to restrict/opt-out of certain processing."
                        : "डेटा पोर्टेबिलिटी और कुछ प्रक्रियाओं को सीमित/अस्वीकृत करने का अधिकार।"}
                    </li>
                    <li>
                      {language === "english"
                        ? "Right to complain to a supervisory authority (EU/UK) or consumer authority."
                        : "सुपरवाइजरी अथॉरिटी (EU/UK) या उपभोक्ता प्राधिकरण को शिकायत करने का अधिकार।"}
                    </li>
                  </ul>
                </PolicyCard>

                {/* COOKIES */}
                <PolicyCard
                  id="cookies"
                  title={
                    language === "english"
                      ? "Cookies & Tracking"
                      : "कुकीज़ और ट्रैकिंग"
                  }
                  icon={<Globe className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "We use essential cookies to operate our website and optional analytics with your consent. You can manage cookies in your browser or via our preferences tool (where available)."
                      : "हम अपनी वेबसाइट संचालित करने के लिए आवश्यक कुकीज़ का उपयोग करते हैं और आपकी सहमति से वैकल्पिक एनालिटिक्स। आप अपने ब्राउज़र में या उपलब्ध प्राथमिकता उपकरण के माध्यम से कुकीज़ प्रबंधित कर सकते हैं।"}
                  </p>
                </PolicyCard>

                {/* INTERNATIONAL */}
                <PolicyCard
                  id="intl"
                  title={
                    language === "english"
                      ? "International Transfers"
                      : "अंतरराष्ट्रीय स्थानांतरण"
                  }
                  icon={<Globe className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "If data is transferred outside your jurisdiction, we use appropriate safeguards (e.g., Standard Contractual Clauses) and ensure recipients provide adequate protection."
                      : "यदि डेटा आपके क्षेत्राधिकार के बाहर स्थानांतरित किया जाता है, तो हम उचित सुरक्षा उपायों (जैसे, स्टैंडर्ड कॉन्ट्रैक्चुअल क्लॉज़) का उपयोग करते हैं और सुनिश्चित करते हैं कि प्राप्तकर्ता पर्याप्त सुरक्षा प्रदान करें।"}
                  </p>
                </PolicyCard>

                {/* CHILDREN */}
                <PolicyCard
                  id="children"
                  title={
                    language === "english"
                      ? "Children’s Privacy"
                      : "बच्चों की गोपनीयता"
                  }
                  icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "Our services are intended for patients and caregivers. We do not knowingly collect data from children without appropriate consent under applicable laws."
                      : "हमारी सेवाएँ रोगियों और देखभालकर्ताओं के लिए हैं। हम लागू कानूनों के तहत उचित सहमति के बिना बच्चों से जानबूझकर डेटा एकत्र नहीं करते हैं।"}
                  </p>
                </PolicyCard>

                {/* CHANGES */}
                <PolicyCard
                  id="changes"
                  title={
                    language === "english"
                      ? "Changes to this Policy"
                      : "इस नीति में बदलाव"
                  }
                  icon={<FileText className="h-5 w-5 text-emerald-600" />}>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === "english"
                      ? "We may update this Policy periodically. Material changes will be highlighted on this page with a new effective date."
                      : "हम इस नीति को समय-समय पर अपडेट कर सकते हैं। महत्वपूर्ण बदलावों को इस पृष्ठ पर नए प्रभावी तिथि के साथ हाइलाइट किया जाएगा।"}
                  </p>
                </PolicyCard>

                {/* CONTACT */}
                <PolicyCard
                  id="contact"
                  title={
                    language === "english" ? "Contact Us" : "हमसे संपर्क करें"
                  }
                  icon={<Mail className="h-5 w-5 text-emerald-600" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-700">
                    {/* Address */}
                    <div className="flex items-start sm:items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{ADDRESS}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start sm:items-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{PHONE}</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-start sm:items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{EMAIL}</span>
                    </div>
                  </div>
                </PolicyCard>
              </TabsContent>

              {/* TERMS */}
              <TabsContent value="terms" className="space-y-6">
                <PolicyCard
                  id="terms"
                  title={
                    language === "english"
                      ? "Terms of Service"
                      : "सेवा की शर्तें"
                  }
                  icon={<FileText className="h-5 w-5 text-emerald-600" />}>
                  <p className="font-semibold mt-2 text-sm text-slate-800 leading-relaxed">
                    {language === "english"
                      ? `Please read these terms carefully before using ${CLINIC_NAME}'s services.`
                      : `कृपया ${CLINIC_NAME} की सेवाओं का उपयोग करने से पहले इन शर्तों को ध्यान से पढ़ें।`}
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 mt-4 text-sm leading-relaxed text-slate-700">
                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english" ? "Scope:" : "सीमा:"}
                      </strong>{" "}
                      {language === "english"
                        ? `These Terms govern your use of ${CLINIC_NAME}'s services and website. By using our services, you agree to be bound by these Terms.`
                        : `ये शर्तें ${CLINIC_NAME} की सेवाओं और वेबसाइट के उपयोग को नियंत्रित करती हैं। हमारी सेवाओं का उपयोग करके, आप इन शर्तों से बंधे होने के लिए सहमत होते हैं।`}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Appointments & Reports:"
                          : "अपॉइंटमेंट और रिपोर्ट:"}
                      </strong>{" "}
                      {language === "english"
                        ? "You are responsible for providing accurate information. We may reschedule or cancel appointments for operational or safety reasons."
                        : "सही जानकारी प्रदान करना आपकी जिम्मेदारी है। हम संचालन या सुरक्षा कारणों से अपॉइंटमेंट को पुनर्निर्धारित या रद्द कर सकते हैं।"}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english" ? "Payments:" : "भुगतान:"}
                      </strong>{" "}
                      {language === "english"
                        ? "Fees are due as displayed or communicated. Third-party payment processors may apply their own terms."
                        : "शुल्क प्रदर्शित या सूचित के अनुसार देय हैं। तीसरे पक्ष के भुगतान प्रोसेसर अपनी शर्तें लागू कर सकते हैं।"}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Medical Disclaimer:"
                          : "चिकित्सा अस्वीकरण:"}
                      </strong>{" "}
                      {language === "english"
                        ? "Ultrasound results support clinical decision-making but are not a substitute for physician advice. Always consult your doctor."
                        : "अल्ट्रासाउंड परिणाम नैदानिक निर्णय लेने में सहायक हैं, लेकिन यह चिकित्सक की सलाह का विकल्प नहीं हैं। हमेशा अपने डॉक्टर से परामर्श करें।"}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Acceptable Use:"
                          : "स्वीकृत उपयोग:"}
                      </strong>{" "}
                      {language === "english"
                        ? "Do not misuse our systems, attempt unauthorized access, or disrupt services."
                        : "हमारे सिस्टम का दुरुपयोग न करें, अनधिकृत पहुंच का प्रयास न करें, या सेवाओं में बाधा न डालें।"}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Intellectual Property:"
                          : "बौद्धिक संपदा:"}
                      </strong>{" "}
                      {language === "english"
                        ? `Content, trademarks, and software are owned by ${CLINIC_NAME} or its licensors. A limited, revocable, non-transferable license is granted for personal use.`
                        : `सामग्री, ट्रेडमार्क और सॉफ़्टवेयर ${CLINIC_NAME} या इसके लाइसेंसधारकों के स्वामित्व में हैं। व्यक्तिगत उपयोग के लिए सीमित, रद्द करने योग्य, गैर-हस्तांतरणीय लाइसेंस दिया गया है।`}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Limitation of Liability:"
                          : "दायित्व की सीमा:"}
                      </strong>{" "}
                      {language === "english"
                        ? `To the extent permitted by law, ${CLINIC_NAME} is not liable for indirect or consequential damages. Our total aggregate liability is limited to fees paid in the 3 months preceding the claim.`
                        : `कानून द्वारा अनुमत सीमा तक, ${CLINIC_NAME} अप्रत्यक्ष या परिणामी नुकसान के लिए उत्तरदायी नहीं है। हमारी कुल देयता पिछले 3 महीनों में भुगतान किए गए शुल्क तक सीमित है।`}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english" ? "Indemnity:" : "क्षतिपूर्ति:"}
                      </strong>{" "}
                      {language === "english"
                        ? `You agree to indemnify and hold harmless ${CLINIC_NAME} against claims arising from your misuse of the services.`
                        : `आप सेवाओं के दुरुपयोग से उत्पन्न दावों के खिलाफ ${CLINIC_NAME} को हर्ज़ से मुक्त रखने के लिए सहमत होते हैं।`}
                    </li>

                    <li className="mb-4">
                      <strong className="text-slate-800">
                        {language === "english"
                          ? "Governing Law & Disputes:"
                          : "शासन कानून और विवाद:"}
                      </strong>{" "}
                      {language === "english"
                        ? "Subject to applicable consumer laws, these Terms are governed by the laws of India and courts at your local jurisdiction or our registered office (as applicable)."
                        : "प्रयुक्त उपभोक्ता कानूनों के अधीन, ये शर्तें भारत के कानूनों और आपके स्थानीय क्षेत्राधिकार या हमारे पंजीकृत कार्यालय (जहां लागू हो) के न्यायालयों द्वारा शासित होती हैं।"}
                    </li>

                    <li>
                      <strong className="text-slate-800">
                        {language === "english" ? "Changes:" : "परिवर्तन:"}
                      </strong>{" "}
                      {language === "english"
                        ? "We may update these Terms from time to time. Continued use constitutes acceptance of updated Terms."
                        : "हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं। निरंतर उपयोग अद्यतन शर्तों को स्वीकार करने के रूप में माना जाएगा।"}
                    </li>
                  </ol>
                </PolicyCard>

                {/* Compliance Snapshot */}
                <Card className="border bg-white border-gray-300 rounded-2xl">
                  <CardHeader className="">
                    <CardTitle className="text-base tracking-wide font-bold flex items-center text-[#1e4d4f] gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />{" "}
                      {language === "english"
                        ? "Compliance Snapshot"
                        : "अनुपालन स्नैपशॉट"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(language === "english"
                        ? [
                            "GDPR-ready",
                            "HIPAA-informed",
                            "CCPA opt-outs",
                            "Secure-by-design",
                          ]
                        : [
                            "GDPR-तैयार",
                            "HIPAA-जानकारीपूर्ण",
                            "CCPA विकल्प बाहर",
                            "सुरक्षित-डिज़ाइन",
                          ]
                      ).map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="w-full justify-center py-1.5 text-xs md:text-sm font-medium rounded-lg bg-white text-gray-800 border border-gray-300 transition-colors">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
      className="rounded-2xl bg-white shadow-sm border border-gray-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center tracking-wide gap-2 text-[#1e4d4e] text-base font-bold">
          {icon} <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="prose prose-slate text-gray-800 tracking-wide text-sm max-w-none mt-[-55px]">
        {children}
      </CardContent>
    </Card>
  );
}
