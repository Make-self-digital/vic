import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaishnavi Imaging Center (Ultrasound) - Daudnagar, Aurangabad, Bihar",
  description:
    "Vaishnavi Imaging Center is a trusted ultrasound diagnostic center in Daudnagar, Aurangabad, Bihar, offering advanced ultrasound HD scanning services by expert radiologists. Book appointments online for pregnancy, abdominal, and general ultrasound tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main> {children} </main>
        <Footer />
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
      </body>
    </html>
  );
}
