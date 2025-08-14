"use client";

import { RefreshCcw } from "lucide-react";
import { useState, MouseEvent } from "react";

export default function PageRefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload(); // Full page reload
    }, 300);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="rounded-xl p-2 hover:bg-[#d4f0ec] transition-all duration-150 ease-in-out cursor-pointer"
        title="Reload this page">
        <div className="w-5.5 h-5.5 text-[#0b968d] flex items-center justify-center">
          <RefreshCcw
            className={`w-full h-full transition-transform duration-500 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );
}
