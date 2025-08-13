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
    <header className="sticky top-0 z-50 bg-[#f9fafb] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <div className="text-xl font-bold text-[#42998d] cursor-pointer">
          Vaishnavi Imaging Center
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu">
          {menuOpen ? (
            <X className="w-6 h-6 text-[#42998d]" />
          ) : (
            <Menu className="w-6 h-6 text-[#42998d]" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {allNavItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-sm cursor-pointer font-medium text-gray-600 hover:text-black transition",
                pathname === href &&
                  "text-black after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black"
              )}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-56 rounded-md border bg-white shadow-md p-3 flex flex-col space-y-2 md:hidden">
            {allNavItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-black transition",
                  pathname === href && "text-black underline underline-offset-6"
                )}>
                <Icon className="w-4 h-4 text-[#42998d]" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
