"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const filterOptions = {
  service: [
    "Whole Abdomen Scan",
    "Pregnancy Ultrasound",
    "Color Doppler",
    "Musculoskeletal Scan",
    "USG-Guided Procedures",
    "Diagnostic Ultrasound",
  ],
  time: [
    "8 AM - 10 AM",
    "10 AM - 12 PM",
    "12 PM - 2 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
  ],
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  status: ["Pending", "Completed", "Cancelled"],
};

export const PatientFilters = ({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    category: string;
    subCategory: string;
    search: string;
  }) => void;
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // ? Debounce Logic inside useEffect:-
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // ? when either changes
  useEffect(() => {
    if (debouncedSearch || (category && subCategory)) {
      onFilterChange({ category, subCategory, search: debouncedSearch });
    }
  }, [category, subCategory, debouncedSearch]);

  const currentOptions =
    filterOptions[category as keyof typeof filterOptions] || [];

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
      {/* Left Side Filter Input */}
      <div className="relative w-full md:w-[60%] flex items-center">
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-500 overflow-hidden", // ✅ always centered
            "w-full md:w-[350px] px-3 py-2 border border-[#42998d] bg-white rounded-md justify-start"
          )}>
          <Search
            className={cn(
              "text-[#42998d] transition-all duration-300 ease-in-out",
              "h-5 w-5" // ✅ bigger icon if needed
            )}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              if (value.trim() === "") {
                onFilterChange({ category, subCategory, search: "" });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onFilterChange({ category, subCategory, search });
              }
            }}
            placeholder="Search Patient"
            className={cn(
              "ml-2 bg-transparent text-sm text-gray-700 w-full outline-none transition-all duration-300 opacity-100 ease-in-out tracking-wide placeholder:font-medium"
            )}
            style={{
              transition: "width 0.3s ease, opacity 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Right Side Filter Category Dropdown */}
      <div className="relative w-full">
        <div className="flex flex-col md:flex-row justify-end gap-4 w-full">
          {/* Filter Category Dropdown */}
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setSubCategory("");
            }}>
            <SelectTrigger className="w-full md:w-[200px] border rounded-md  focus:ring-[#42998d] focus:outline-none transition-all duration-150 cursor-pointer bg-white border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide">
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent className="rounded-md z-50 bg-white border border-[#42998d]">
              <CustomSelectItem value="service">Service</CustomSelectItem>
              <CustomSelectItem value="time">Time</CustomSelectItem>
              <CustomSelectItem value="month">Months</CustomSelectItem>
              <CustomSelectItem value="status">Status</CustomSelectItem>
            </SelectContent>
          </Select>

          {/* Subcategory Dropdown */}
          {category && (
            <Select value={subCategory} onValueChange={setSubCategory}>
              <SelectTrigger className="w-full md:w-[200px] border rounded-md  focus:ring-[#42998d] focus:outline-none transition-all duration-150 cursor-pointer bg-white border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide">
                <SelectValue placeholder={`Select ${category}`} />
              </SelectTrigger>
              <SelectContent className="rounded-md z-50 bg-white border border-[#42998d]">
                {currentOptions.map((option, idx) => (
                  <CustomSelectItem key={idx} value={option}>
                    {option}
                  </CustomSelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Right Side Filter Category Dropdown */}
    </div>
  );
};

// ? Custom Item with hover styling
function CustomSelectItem({
  children,
  value,
}: {
  children: string;
  value: string;
}) {
  return (
    <SelectItem
      value={value}
      className="hover:bg-[#02998d] hover:text-white cursor-pointer transition-colors rounded-md px-2 tracking-wide">
      {children}
    </SelectItem>
  );
}
