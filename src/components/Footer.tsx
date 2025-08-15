"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-white text-gray-800 border border-gray-200 pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link href="/">
              <div className="relative">
                <Image
                  src="/logo-2.png"
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
            Trusted ultrasound services in Daudnagar, Bihar. We ensure accurate
            care with compassion.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-[#1e4d4f] mb-3 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:underline tracking-wide">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline tracking-wide">
                Services
              </Link>
            </li>
            <li>
              <Link
                href={isAuthenticated ? "/appointments" : "/login"}
                className="hover:underline tracking-wide">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline tracking-wide">
                About Us
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="hover:underline tracking-wide">
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className="hover:underline tracking-wide">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-[#1e4d4f] mb-3 tracking-wide">
            Contact Us
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
              <span>Tiwari Mohalla, Daudnagar, Bihar</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Opening Hours */}
        <div>
          <h3 className="text-lg mb-3 tracking-wide font-bold text-[#1e4d4f]">
            Opening Hours
          </h3>
          <ul className="text-sm text-gray-500 space-y-1 tracking-wide">
            <li>Mon - Sat: 7:30 AM - 8:00 PM</li>
            <li>Sunday: 9:00 AM - 1:00 PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500 tracking-wide">
        © {new Date().getFullYear()} Vaishnavi Imaging Center. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
