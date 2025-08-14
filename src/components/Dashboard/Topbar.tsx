"use client";

import { LogOut, Settings, Home, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import PageRefreshButton from "../RefreshButtonCom/PageRefreshButton";
// import Image from "next/image";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }: TopbarProps) => {
  const router = useRouter();
  const { name, role } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Logged out successfully", {
          description: "See you soon!",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        });
        // Redirect to login
        localStorage.removeItem("login_patient");
        router.push("/login");
      } else {
        toast.error("Logout failed", {
          description: "Please try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      id="topbar"
      className="w-full p-4 px-4 md:px-8 bg-white border-b border-gray-200 flex items-center justify-between fixed top-0 z-50">
      {/* Left: Logo & App Controls */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2" title="Logo">
          {/* <div className="bg-[#42998d] px-3 py-2 rounded-lg">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div> */}
          <span className="text-xl font-bold text-[#42998d] tracking-wide hidden md:block">
            Vaishnavi Imaging Center
          </span>
        </div>

        {/* Menu Icons */}
        <button
          onClick={onToggleSidebar}
          className="rounded-xl p-2 hover:bg-[#d4f0ec] transition-all duration-150 ease-in-out cursor-pointer">
          <div
            className="w-6 h-6 text-[#0b968d] flex items-center justify-center"
            title="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </button>

        {/* Home Icon */}
        <Link href="/">
          <button
            className="rounded-xl p-2 hover:bg-[#d4f0ec] transition-all duration-150 ease-in-out cursor-pointer"
            title="Home">
            <div className="w-6 h-6 text-[#0b968d] flex items-center justify-center">
              <Home className="w-full h-full" strokeWidth={2.2} />
            </div>
          </button>
        </Link>

        {/* REFRESH PAGE BUTTON */}
        <div>
          <PageRefreshButton />
        </div>
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-4">
        <Separator orientation="vertical" className="h-8 bg-gray-300" />

        {/* User */}
        <div
          className="flex items-center gap-3"
          title={`${role?.charAt(0).toUpperCase() + role?.slice(1)} Name`}>
          <Avatar className="h-10 w-10 border border-[#42998d] transition-colors hidden md:block">
            <AvatarFallback className="text-[#0b968d] font-bold text-lg">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-base font-semibold text-left leading-tight">
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

        {/* Settings */}
        <button
          className="rounded-xl p-2 hover:bg-[#d4f0ec] transition-all duration-150 ease-in-out cursor-pointer"
          title="Settings">
          <div className="w-6 h-6 text-[#42998d] flex items-center justify-center">
            <Settings className="w-full h-full" strokeWidth={2.2} />
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="rounded-xl p-2 hover:bg-[#d4f0ec] transition-all duration-150 ease-in-out cursor-pointer"
          title="Logout">
          <div className="w-6 h-6 text-[#42998d] flex items-center justify-center">
            <LogOut className="w-full h-full" strokeWidth={2.2} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
