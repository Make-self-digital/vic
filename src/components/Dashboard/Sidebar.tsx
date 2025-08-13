"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  BadgeDollarSign,
  Banknote,
  UserCog,
  Bell,
  Boxes,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isOpen: boolean;
}

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Appointments",
    href: "/appointments",
    icon: CalendarCheck,
  },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Billing", href: "/billing", icon: BadgeDollarSign },
  { name: "Revenue", href: "/revenue", icon: Banknote },
  { name: "Staff", href: "/staff", icon: UserCog },
  { name: "Inventory", href: "/inventory", icon: Boxes },
];

export default function AdminSidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { name, role } = useAuth();

  return (
    <>
      {isOpen && (
        <aside
          className={cn(
            "fixed top-20 left-0 h-[calc(100vh-80px)] w-64 bg-[#f9fafb] border-r border-gray-200 transition-transform duration-300 ease-in-out z-100 flex flex-col",
            {
              "-translate-x-full md:translate-x-0": !isOpen,
              "translate-x-0": isOpen,
            }
          )}>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f4f3] hover:text-[#42998d] tracking-wide transition-all duration-150",
                  pathname === href &&
                    "bg-[#d4f0ec] text-[#42998d] font-semibold"
                )}
                title={name}>
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            ))}
          </nav>

          {/* profile related */}
          <div
            className="flex items-center gap-3 px-6 py-6 md:hidden"
            title={`${role?.charAt(0).toUpperCase() + role?.slice(1)} Name`}>
            <Avatar className="h-10 w-10 border border-[#42998d]">
              <AvatarFallback className="text-[#42998d] font-bold text-lg">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-base font-semibold text-left leading-tight">
              <p className="text-[#42998d]">
                {name
                  ? name
                      ?.trim()
                      .split(" ")
                      .filter(Boolean)
                      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                      .join(" ")
                  : ""}
              </p>
              <p className="text-[#1f1f1f] text-sm font-medium">
                {role
                  ? "Exclusive" + " " + role[0].toUpperCase() + role.slice(1)
                  : ""}
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
