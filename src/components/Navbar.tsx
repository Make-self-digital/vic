"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
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

const staticNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Stethoscope },
  { name: "Contact", href: "/contact", icon: Calendar },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Conditional item (Login or Dashboard)
  const authNavItem = isAuthenticated
    ? { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
    : { name: "Login", href: "/login", icon: LogIn };

  const allNavItems = [...staticNavItems, authNavItem];

  return (
    <header className="sticky top-0 z-50 bg-white border border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <div
          className="text-xl font-bold text-[#42998d] cursor-pointer"
          title="Vaishnavi Imaging Center Logo">
          Vaishnavi Imaging Center
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          title="Toggle Menu">
          {menuOpen ? (
            <X className="w-8 h-8 text-[#42998d] rounded-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#02998d] hover:text-white hover:shadow-lg" />
          ) : (
            <Menu className="w-8 h-8 text-[#42998d] rounded-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#02998d] hover:text-white hover:shadow-lg" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {allNavItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              title={name}
              className="relative flex items-center space-x-2 text-sm cursor-pointer font-medium text-gray-600 hover:text-black transition tracking-wide">
              <Icon
                className={cn(
                  "w-4 h-4 text-black",
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
                className="relative flex items-center space-x-2 text-sm cursor-pointer font-medium text-gray-600 hover:text-black transition tracking-wide">
                <Icon
                  className={cn(
                    "w-4 h-4 text-black",
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
