"use client";

import { useState } from "react";
import Topbar from "@/components/Dashboard/Topbar";
import AdminSidebar from "@/components/Dashboard/Sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AdminSidebar isOpen={isSidebarOpen} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <main
        className={
          isSidebarOpen
            ? "md:flex-1 md:h-[calc(100vh-80px)] md:ml-64 md:overflow-y-auto md:px-6 md:py-6"
            : "ml-0 p-4"
        }>
        {children}
      </main>
    </>
  );
}
