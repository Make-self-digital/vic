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
  onToggleSidebar: () => void;
  topbarHeight: number;
}

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export default function AdminSidebar({
  isOpen,
  onToggleSidebar,
  topbarHeight = 72,
}: SidebarProps) {
  // pathname and auth:-
  const pathname = usePathname();
  const { name, role } = useAuth();

  // Conditional item (Login or Dashboard)
  const navItems: NavItem[] = [
    ...(role === "admin" || role === "staff"
      ? [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
      : []),

    ...(role === "patient"
      ? [{ name: "Appointments", href: "/appointments", icon: CalendarCheck }]
      : []),

    { name: "Notifications", href: "/notifications", icon: Bell },

    { name: "Patients", href: "/patients", icon: Users },

    { name: "Reports", href: "/reports", icon: FileText },

    // { name: "Billing", href: "/billing", icon: BadgeDollarSign },

    ...(role === "admin"
      ? [{ name: "Revenue", href: "/revenue", icon: Banknote }]
      : []),

    // { name: "Staff", href: "/staff", icon: UserCog },

    ...(role === "admin" || role === "staff"
      ? [{ name: "Inventory", href: "/inventory", icon: Boxes }]
      : []),
  ];

  return (
    <>
      {isOpen && (
        <aside
          className={cn(
            "fixed left-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col transform transition-transform duration-300 ease-in-out",
            {
              "-translate-x-full md:translate-x-0": !isOpen,
              "translate-x-0": isOpen,
            }
          )}
          style={{
            top: `${topbarHeight}px`,
            height: `calc(100vh - ${topbarHeight}px)`,
          }}>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f4f3] hover:text-[#42998d] tracking-wide transition-all duration-150",
                  pathname === href &&
                    "bg-[#d4f0ec] text-[#42998d] font-semibold"
                )}
                title={name}
                onClick={() => {
                  // Only trigger onToggleSidebar on small screens (<768px)
                  if (window.innerWidth < 768) {
                    onToggleSidebar?.();
                  }
                }}>
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            ))}
          </nav>

          {/* profile related */}
          <div
            className="flex items-center gap-3 p-4 md:hidden"
            title={`${role?.charAt(0).toUpperCase() + role?.slice(1)} Name`}>
            <Avatar className="border border-[#42998d] transition-colors">
              <AvatarFallback className="text-[#0b968d] font-bold text-lg">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-base font-semibold text-left leading-tight">
              <p className="text-[#0b968d] tracking-wide text-md font-semibold">
                {name
                  ? name
                      ?.trim()
                      .split(" ")
                      .filter(Boolean)
                      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                      .join(" ")
                  : ""}
              </p>
              <p className="text-gray-700 text-sm font-medium tracking-wide">
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
