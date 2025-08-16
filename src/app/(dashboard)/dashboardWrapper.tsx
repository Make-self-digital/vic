"use client";

import { useState, useEffect } from "react";
import Topbar from "@/components/Dashboard/Topbar";
import AdminSidebar from "@/components/Dashboard/Sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [topbarHeight, setTopbarHeight] = useState(0);

  // ? Detect screen size:-
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreen(); // initial check

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ? Get Topbar height dynamically:-
  useEffect(() => {
    const topbarEl = document.getElementById("topbar");
    if (topbarEl) {
      setTopbarHeight(topbarEl.offsetHeight);
      const resizeObs = new ResizeObserver(() => {
        setTopbarHeight(topbarEl.offsetHeight);
      });
      resizeObs.observe(topbarEl);
      return () => resizeObs.disconnect();
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        topbarHeight={topbarHeight}
      />

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar onToggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            !isMobile && isSidebarOpen ? "md:ml-64" : "ml-0"
          }`}
          style={{ marginTop: `${topbarHeight}px` }}>
          {children}
        </main>
      </div>
    </div>
  );
}
