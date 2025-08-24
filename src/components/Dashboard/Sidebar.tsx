"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  Banknote,
  Bell,
  Boxes,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/LanguageContext";
import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/NotificationContext";

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

interface LoginPatientData {
  _id: string;
  patientName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AdminSidebar({
  isOpen,
  onToggleSidebar,
  topbarHeight = 72,
}: SidebarProps) {
  const [loginPatient, setLoginPatient] = useState<LoginPatientData | null>(
    null
  );

  const pathname = usePathname();
  const { name, role } = useAuth();
  const { language } = useLanguage();

  const { allNotifications, setNotifications, markAllRead } =
    useNotifications();

  const navItems: NavItem[] = [
    ...(role === "admin" || role === "staff"
      ? [
          {
            name: language === "english" ? "Dashboard" : "डैशबोर्ड",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
        ]
      : []),
    ...(role === "patient"
      ? [
          {
            name: language === "english" ? "Appointments" : "अपॉइंटमेंट",
            href: "/appointments",
            icon: CalendarCheck,
          },
        ]
      : []),
    {
      name: language === "english" ? "Notifications" : "नोटिफिकेशन",
      href: "/notifications",
      icon: Bell,
    },
    {
      name: language === "english" ? "Patients" : "मरीज देखें",
      href: "/patients",
      icon: Users,
    },
    {
      name: language === "english" ? "Reports" : "रिपोर्ट",
      href: "/reports",
      icon: FileText,
    },
    ...(role === "admin"
      ? [
          {
            name: language === "english" ? "Revenue" : "आय",
            href: "/revenue",
            icon: Banknote,
          },
        ]
      : []),
    ...(role === "admin" || role === "staff"
      ? [
          {
            name: language === "english" ? "Inventory" : "इन्वेंटरी",
            href: "/inventory",
            icon: Boxes,
          },
        ]
      : []),
  ];

  // get login patient
  useEffect(() => {
    const storedPatient = localStorage.getItem("login_patient");
    if (storedPatient) {
      setLoginPatient(JSON.parse(storedPatient));
    }
  }, []);

  useEffect(() => {
    if (!loginPatient?._id || role !== "patient") return;

    // update read patient notifications:-
    const fetchPatientNotifications = async () => {
      try {
        const res = await fetch(
          `/api/patient-wise-notification?patientId=${loginPatient._id}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setNotifications(data.data); // flatten logic context me already handle
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatientNotifications();
  }, [loginPatient?._id, role]);

  // update read staff notifications:-
  useEffect(() => {
    if (!(role === "admin" || role === "staff")) return;

    const fetchStaffNotifications = async () => {
      try {
        const res = await fetch("/api/StaffNotification");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setNotifications(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStaffNotifications();
  }, [role]);

  // handle notification click
  const handleNotificationClick = async () => {
    try {
      if (role === "patient" && loginPatient?._id) {
        await markAllRead(loginPatient._id);
      } else if (role === "admin" || role === "staff") {
        await markAllRead();
      }
    } catch (err) {
      console.error("Failed to mark notifications read", err);
    }
  };

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
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              const isNotification =
                name ===
                (language === "english" ? "Notifications" : "नोटिफिकेशन");

              return (
                <Link
                  key={name}
                  href={href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f4f3] hover:text-[#42998d] tracking-wide transition-all duration-150 cursor-pointer",
                    isActive && "bg-[#d4f0ec] text-[#42998d] font-semibold"
                  )}
                  title={name}
                  onClick={() => {
                    if (isNotification) {
                      handleNotificationClick(); // ✅ अब ये चलेगा
                    }
                    if (window.innerWidth < 768) {
                      onToggleSidebar(); // ✅ अब mobile (<768px) पर ही चलेगा
                    }
                  }}>
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>

                  {/* Notification Badge */}
                  {isNotification && allNotifications.some((n) => !n.read) && (
                    <span className="absolute right-3 top-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0b968d] px-1.5 text-xs font-semibold text-white">
                      {allNotifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
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
                      .trim()
                      .split(" ")
                      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                      .join(" ")
                  : ""}
              </p>
              <p className="text-gray-700 text-sm font-medium tracking-wide">
                {role
                  ? "Exclusive " + role[0].toUpperCase() + role.slice(1)
                  : ""}
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
