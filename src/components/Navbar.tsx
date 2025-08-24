"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Stethoscope,
  Calendar,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { useLanguage } from "@/hooks/LanguageContext";

export default function Navbar() {
  // pathname and auth:-
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const { language } = useLanguage();

  // scroll navbar fixed:-
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect:-
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const staticNavItems = [
    {
      name: `${language === "english" ? "Home" : "होम"}`,
      href: "/",
      icon: Home,
    },
    {
      name: `${language === "english" ? "About" : "हमारे बारे में"}`,
      href: "/about",
      icon: Info,
    },
    {
      name: `${language === "english" ? "Services" : "सेवाएं"}`,
      href: "/services",
      icon: Stethoscope,
    },
    {
      name: `${language === "english" ? "Contact" : "संपर्क"}`,
      href: "/contact",
      icon: Calendar,
    },
  ];

  // Conditional item (Login or Dashboard)
  const authNavItem = isAuthenticated
    ? {
        name: `${language === "english" ? "Dashboard" : "डैशबोर्ड"}`,
        href: `${role === "patient" ? "/appointments" : "/dashboard"}`,
        icon: LayoutDashboard,
      }
    : {
        name: `${language === "english" ? "Login" : "लॉगिन"}`,
        href: "/login",
        icon: LogIn,
      };

  const allNavItems = [...staticNavItems, authNavItem];

  return (
    <header
      className={`fixed top-0 w-full z-[60] transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white border border-gray-200"
          : "bg-transparent border-none"
      }`}>
      <div className="max-w-7xl px-4 py-2 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="w-full max-w-[60px]"
          title="Vaishnavi Imaging Center Logo">
          <Link href="/">
            <Image
              src="/logo-3.png"
              alt="Vaishnavi Imaging Center Logo"
              priority
              width="100"
              height="100"
              style={{ height: "auto", width: "auto" }}
              className="object-contain fit-cover cursor-pointer"
            />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          title="Toggle Menu">
          {menuOpen ? (
            <X className="w-8 h-8 rounded-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer bg-[#02998d] text-white hover:shadow-lg" />
          ) : (
            <Menu className="w-8 h-8 rounded-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer bg-[#02998d] text-white hover:shadow-lg" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {allNavItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              title={name}
              className="relative flex items-center space-x-2 text-sm cursor-pointer font-semibold text-gray-600 hover:text-black transition tracking-wide">
              <Icon
                className={cn(
                  "w-4 h-4 text-gray-600",
                  pathname === href && "text-[#42998d]"
                )}
              />
              <span
                className={cn(
                  "relative", // needed so after is positioned correctly
                  pathname === href &&
                    "text-[#42998d] font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#42998d]"
                )}>
                {name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-56 rounded-md border border-[#42998d] bg-white shadow-md p-3 flex flex-col space-y-2 md:hidden">
            {allNavItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                title={name}
                onClick={() => setMenuOpen(false)}
                className="relative flex items-center space-x-2 text-sm cursor-pointer font-semibold text-gray-600 hover:text-black transition tracking-wide p-1">
                <Icon
                  className={cn(
                    "w-4 h-4 text-gray-600",
                    pathname === href && "text-[#42998d]"
                  )}
                />
                <span
                  className={cn(
                    "relative", // needed so after is positioned correctly
                    pathname === href &&
                      "text-[#42998d] font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#42998d]"
                  )}>
                  {name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
