"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/hooks/LanguageContext";

interface ServiceComparison {
  feature: string;
  [key: string]: string;
}

const ServiceComparisonTable: React.FC = () => {
  const { language } = useLanguage();

  // ? List of services:-
  const data: ServiceComparison[] = [
    {
      feature: language === "english" ? "Duration" : "समय अवधि",
      "Whole Abdomen Scan":
        language === "english" ? "15–20 mins" : "15–20 मिनट",
      "Pregnancy Ultrasound":
        language === "english" ? "15–30 mins" : "15–30 मिनट",
      "Color Doppler Studies": language === "english" ? "20 mins" : "20 मिनट",
      "Musculoskeletal Scan":
        language === "english" ? "20–30 mins" : "20–30 मिनट",
      "USG-Guided Procedures":
        language === "english" ? "30–45 mins" : "30–45 मिनट",
      "Diagnostic Ultrasound":
        language === "english" ? "15–25 mins" : "15–25 मिनट",
    },
    {
      feature: language === "english" ? "Purpose" : "उद्देश्य",
      "Whole Abdomen Scan":
        language === "english" ? "Abdominal organs" : "पेट के अंग",
      "Pregnancy Ultrasound":
        language === "english" ? "Fetal monitoring" : "भ्रूण निगरानी",
      "Color Doppler Studies":
        language === "english" ? "Blood flow" : "रक्त प्रवाह",
      "Musculoskeletal Scan":
        language === "english" ? "Muscles & joints" : "स्नायु और जोड़",
      "USG-Guided Procedures":
        language === "english" ? "FNAC/Biopsies" : "एफएनएसी / बायोप्सी",
      "Diagnostic Ultrasound":
        language === "english" ? "General diagnostics" : "सामान्य निदान",
    },
    {
      feature: language === "english" ? "Preparation" : "तैयारी",
      "Whole Abdomen Scan": language === "english" ? "Fasting" : "उपवास",
      "Pregnancy Ultrasound":
        language === "english"
          ? "Full bladder (early)"
          : "भरी मूत्राशय (प्रारंभिक)",
      "Color Doppler Studies":
        language === "english" ? "No preparation" : "कोई तैयारी नहीं",
      "Musculoskeletal Scan":
        language === "english" ? "Loose clothing" : "ढीले कपड़े",
      "USG-Guided Procedures":
        language === "english" ? "Consent required" : "सहमति आवश्यक",
      "Diagnostic Ultrasound":
        language === "english" ? "Depends on organ" : "अंग पर निर्भर करता है",
    },
    {
      feature: language === "english" ? "Safety" : "सुरक्षा",
      "Whole Abdomen Scan": "✅ Safe",
      "Pregnancy Ultrasound": "✅ Safe",
      "Color Doppler Studies": "✅ Safe",
      "Musculoskeletal Scan": "✅ Safe",
      "USG-Guided Procedures": "✅ Safe",
      "Diagnostic Ultrasound": "✅ Safe",
    },
    {
      feature: language === "english" ? "Scan Type" : "स्कैन प्रकार",
      "Whole Abdomen Scan": language === "english" ? "2D" : "2डी",
      "Pregnancy Ultrasound":
        language === "english" ? "2D / 3D / 4D" : "2डी / 3डी / 4डी",
      "Color Doppler Studies":
        language === "english" ? "Color Doppler" : "कलर डॉपलर",
      "Musculoskeletal Scan":
        language === "english" ? "2D High-Res" : "2डी उच्च-रिज़ॉल्यूशन",
      "USG-Guided Procedures":
        language === "english" ? "Guided 2D" : "गाइडेड 2डी",
      "Diagnostic Ultrasound": language === "english" ? "2D" : "2डी",
    },
    {
      feature:
        language === "english" ? "Real-time Report" : "रीयल-टाइम रिपोर्ट",
      "Whole Abdomen Scan": language === "english" ? "Yes" : "हाँ",
      "Pregnancy Ultrasound": language === "english" ? "Yes" : "हाँ",
      "Color Doppler Studies": language === "english" ? "No" : "नहीं",
      "Musculoskeletal Scan": language === "english" ? "Yes" : "हाँ",
      "USG-Guided Procedures": language === "english" ? "No" : "नहीं",
      "Diagnostic Ultrasound": language === "english" ? "Yes" : "हाँ",
    },
    {
      feature:
        language === "english" ? "Report Delivery Time" : "रिपोर्ट देने का समय",
      "Whole Abdomen Scan": language === "english" ? "15 mins" : "15 मिनट",
      "Pregnancy Ultrasound": language === "english" ? "Same day" : "उसी दिन",
      "Color Doppler Studies": language === "english" ? "Next day" : "अगले दिन",
      "Musculoskeletal Scan":
        language === "english" ? "Within 1 hour" : "1 घंटे के भीतर",
      "USG-Guided Procedures":
        language === "english"
          ? "Depends on test"
          : "परीक्षण पर निर्भर करता है",
      "Diagnostic Ultrasound":
        language === "english" ? "Within 30 mins" : "30 मिनट के भीतर",
    },
    {
      feature: language === "english" ? "Availability" : "उपलब्धता",
      "Whole Abdomen Scan": language === "english" ? "Daily" : "रोज़ाना",
      "Pregnancy Ultrasound": language === "english" ? "Daily" : "रोज़ाना",
      "Color Doppler Studies":
        language === "english" ? "Appointment" : "अपॉइंटमेंट",
      "Musculoskeletal Scan": language === "english" ? "Daily" : "रोज़ाना",
      "USG-Guided Procedures":
        language === "english" ? "Appointment" : "अपॉइंटमेंट",
      "Diagnostic Ultrasound": language === "english" ? "Daily" : "रोज़ाना",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1e4d4f] mb-8 text-center">
        {language === "english"
          ? "Ultrasound Service Comparison"
          : "अल्ट्रासाउंड सेवा तुलना"}
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table className="w-full text-base border-collapse">
            <TableHeader>
              <TableRow className="bg-[#0b968d] text-white">
                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english" ? "Feature" : "विशेषता"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "Whole Abdomen Scan"
                    : "पूरा पेट स्कैन"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "Pregnancy Ultrasound"
                    : "गर्भावस्था अल्ट्रासाउंड"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "Color Doppler Studies"
                    : "कलर डॉपलर स्टडीज़"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "Musculoskeletal Scan"
                    : "मस्कुलोस्केलेटल स्कैन"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "USG-Guided Procedures"
                    : "यूएसजी-निर्देशित प्रक्रियाएं"}
                </TableHead>

                <TableHead className="px-6 py-4 font-semibold text-white text-sm whitespace-nowrap border border-gray-300 tracking-wide">
                  {language === "english"
                    ? "Diagnostic Ultrasound"
                    : "निदानात्मक अल्ट्रासाउंड"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap border border-gray-300 tracking-wide">
                    {row.feature}
                  </TableCell>
                  {Object.keys(row)
                    .filter((key) => key !== "feature")
                    .map((key) => (
                      <TableCell
                        key={key}
                        className="px-6 py-4 text-gray-700 whitespace-nowrap border border-gray-300 tracking-wide text-sm">
                        {row[key]}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparisonTable;
