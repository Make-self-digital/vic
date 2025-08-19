"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

export default function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: "hindi" | "english") => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#0b968d] text-white p-3 rounded-full shadow-lg hover:bg-[#097c74] transition-all duration-300 cursor-pointer">
        <Languages size={20} />
      </button>

      {/* Language Options → slide out to left */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-3 flex flex-col bg-gray-100 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => handleSelect("hindi")}
              className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer tracking-wide ${
                language === "hindi"
                  ? "bg-[#0b968d] text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}>
              हिंदी
            </button>
            <button
              onClick={() => handleSelect("english")}
              className={`px-6 py-2 text-sm font-medium transition-all cursor-pointer tracking-wide ${
                language === "english"
                  ? "bg-[#0b968d] text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}>
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
