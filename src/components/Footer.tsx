"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-[#42998d] text-white pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-[120px] h-[40px]">
              <Image
                src="/logo.png"
                alt="Vaishnavi Imaging Center Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 120px, 160px"
              />
            </div>
            <h2 className="text-xl font-bold tracking-wide">
              Vaishnavi Imaging Center
            </h2>
          </div>
          <p className="text-sm text-white/80 tracking-wide">
            Trusted ultrasound services in Daudnagar, Bihar. We ensure accurate
            care with compassion.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/90">
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
                href="/appointments"
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
          <h3 className="text-lg font-semibold mb-3 tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-start gap-2 tracking-wide">
              <Phone className="w-4 h-4 mt-1 text-white" />
              <span>+91-9876543210</span>
            </li>
            <li className="flex items-start gap-2 tracking-wide">
              <Mail className="w-4 h-4 mt-1 text-white" />
              <span>info@vaishnaviultrasound.com</span>
            </li>
            <li className="flex items-start gap-2 tracking-wide">
              <MapPin className="w-4 h-4 mt-1 text-white" />
              <span>Tiwari Mohalla, Daudnagar, Bihar</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-3 tracking-wide">
            Opening Hours
          </h3>
          <ul className="text-sm text-white/90 space-y-1 tracking-wide">
            <li>Mon - Sat: 8:00 AM - 8:00 PM</li>
            <li>Sunday: 9:00 AM - 1:00 PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/30 mt-10 pt-4 text-center text-sm text-white/80 tracking-wide">
        © {new Date().getFullYear()} Vaishnavi Imaging Center. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
