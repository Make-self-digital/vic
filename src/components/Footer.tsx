"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/LanguageContext";

const Footer: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const { language } = useLanguage();

  const targetPath = !isAuthenticated
    ? "/login"
    : role === "staff" || role === "admin"
    ? "/dashboard"
    : "/appointments";

  return (
    <footer className="bg-white text-gray-800 border border-gray-200 pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link href="/">
              <div className="relative">
                <Image
                  src="/logo-3.png"
                  alt="Vaishnavi Imaging Center Logo"
                  width={160}
                  height={160}
                  priority
                  className="object-contain"
                  style={{ height: "auto", width: "auto" }}
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </div>
            </Link>
          </div>
          <p className="text-sm text-gray-500 tracking-wide">
            {language === "english"
              ? "Trusted ultrasound services in Daudnagar, Bihar. We ensure accurate care with compassion."
              : "दाउदनगर, बिहार में विश्वसनीय अल्ट्रासाउंड सेवाएँ। हम सटीक देखभाल और सहानुभूति की गारंटी देते हैं।"}
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-[#1e4d4f] mb-3 tracking-wide">
            {language === "english" ? "Quick Links" : "त्वरित लिंक"}
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:underline tracking-wide">
                {language === "english" ? "Home" : "होम"}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline tracking-wide">
                {language === "english" ? "Services" : "सेवाएं"}
              </Link>
            </li>
            <li>
              <Link href={targetPath} className="hover:underline tracking-wide">
                {language === "english"
                  ? "Book Appointments"
                  : "अपॉइंटमेंट्स बुक करें"}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline tracking-wide">
                {language === "english" ? "About Us" : "हमारे बारे में"}
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="hover:underline tracking-wide">
                  {language === "english" ? "Dashboard" : "डैशबोर्ड"}
                </Link>
              ) : (
                <Link href="/login" className="hover:underline tracking-wide">
                  {language === "english" ? "Login" : "लॉगिन"}
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-[#1e4d4f] mb-3 tracking-wide">
            {language === "english" ? "Contact Us" : "संपर्क करें"}
          </h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2 tracking-wide">
              <Phone className="w-4 h-4 mt-1 text-gray-500" />
              <span>+91-9876543210</span>
            </li>
            <li className="flex items-start gap-2 tracking-wide">
              <Mail className="w-4 h-4 mt-1 text-gray-500" />
              <span>info@vaishnaviultrasound.com</span>
            </li>
            <li className="flex items-start gap-2 tracking-wide">
              <MapPin className="w-4 h-4 mt-1 text-gray-500" />
              <span>
                {" "}
                {language === "english"
                  ? "NH-139, Tiwari Mohalla Bhakharua, Daudnagar, Bihar"
                  : "एनएच-139, तिवारी मोहल्ला भखरुआ, दाउदनगर, बिहार"}{" "}
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Opening Hours */}
        <div>
          <h3 className="text-lg mb-3 tracking-wide font-bold text-[#1e4d4f]">
            {language === "english" ? "Opening Hours" : "खुलने का समय"}
          </h3>
          <ul className="text-sm text-gray-500 space-y-1 tracking-wide">
            <li>
              {" "}
              {language === "english"
                ? "Mon - Sat: 7:30 AM - 8:00 PM"
                : "सोमवार - शनिवार: सुबह 7:30 बजे - रात 8:00 बजे"}
            </li>
            <li>
              {language === "english"
                ? "Sunday: 9:00 AM - 1:00 PM"
                : "रविवार: सुबह 9:00 बजे - दोपहर 1:00 बजे"}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500 tracking-wide">
        {language === "english"
          ? `© ${new Date().getFullYear()} Vaishnavi Imaging Center. All rights reserved.`
          : `© ${new Date().getFullYear()} वैष्णवी इमेजिंग सेंटर। सर्वाधिकार सुरक्षित।`}
      </div>
    </footer>
  );
};

export default Footer;
