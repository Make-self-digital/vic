import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "../(public)/globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { LanguageProvider } from "@/hooks/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - Vaishnavi Imaging Center",
  description: "Access your dashboard, manage appointments and view reports.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-gray-50">
        <LanguageProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f1f1f",
                border: "1px solid #42998d",
                borderRadius: "8px",
                padding: "14px 20px",
                fontSize: "14px",
                boxShadow:
                  "0 2px 6px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
              },
              className: "text-sm font-medium",
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
