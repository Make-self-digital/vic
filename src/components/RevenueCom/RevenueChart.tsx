"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import RevenuePieChart from "./RevenuePieChart";
import RevenueLineChart from "./RevenueLineChart";
import TotalRevenueSummary from "./RevenueTotal";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";

// ? Custom Item with hover styling:-
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
      className="hover:bg-[#0b968d] hover:text-white cursor-pointer transition-colors rounded-md px-2">
      {children}
    </SelectItem>
  );
}

interface ChartData {
  name: string;
  count: number;
  revenue: number;
}

type LineChartEntry = {
  date: string;
  [serviceName: string]: number | string; // * string for date, number for revenue values
};

const filterOptions = {
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
  year: ["2025", "2026", "2027", "2028", "2029", "2030"],
};

export default function RevenueChart() {
  const printRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [weekDate, setWeekDate] = useState<Date | null>(null);
  const [weekRange, setWeekRange] = useState<null | { start: Date; end: Date }>(
    null
  );
  const [weekPickerOpen, setWeekPickerOpen] = useState(false);
  const [hasFetchedDefault, setHasFetchedDefault] = useState(false);
  const [lineChartData, setLineChartData] = useState<LineChartEntry[]>([]);
  const [weekLineChartData, setWeekLineChartData] = useState<LineChartEntry[]>(
    []
  );
  const [monthLineChartData, setMonthLineChartData] = useState<
    LineChartEntry[]
  >([]);
  const [yearLineChartData, setYearLineChartData] = useState<LineChartEntry[]>(
    []
  );
  const [pageLoading, setPageLoading] = useState(true);

  const currentOptions =
    filterOptions[category as keyof typeof filterOptions] || [];

  const fetchRevenueData = async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);

      // ? Reduce to group revenue by service name
      const revenueByService: Record<string, number> = json.reduce(
        (acc: Record<string, number>, item: ChartData) => {
          if (!acc[item.name]) acc[item.name] = 0;
          acc[item.name] += item.revenue;
          return acc;
        },
        {}
      );

      // ? Format and set line chart data for the date:-
      if (selectedDate) {
        const finalFormatted = [
          {
            date: format(selectedDate, "yyyy-MM-dd"),
            ...revenueByService,
          },
        ];
        setLineChartData((prev: LineChartEntry[]) => {
          const newDate = finalFormatted[0].date;
          const filtered = prev.filter((item) => item.date !== newDate);
          return [...filtered, ...finalFormatted];
        });
      }

      // ? Format and set line chart data for the week range:-
      if (weekRange) {
        const weekLabel = `${format(weekRange.start, "yyyy-MM-dd")} - ${format(
          weekRange.end,
          "yyyy-MM-dd"
        )}`;

        const finalFormatted: LineChartEntry[] = [
          {
            date: weekLabel,
            ...revenueByService,
          },
        ];

        setWeekLineChartData((prev: LineChartEntry[]) => {
          const newDate = finalFormatted[0].date;
          const filtered = prev.filter((item) => item.date !== newDate);
          return [...filtered, ...finalFormatted];
        });
      }

      // ? Format and set line chart data for the month:-
      if (category === "month" && subCategory) {
        const monthLabel = subCategory;
        const finalFormatted: LineChartEntry[] = [
          {
            date: monthLabel,
            ...revenueByService,
          },
        ];
        setMonthLineChartData((prev: LineChartEntry[]) => {
          const newDate = finalFormatted[0].date;
          const filtered = prev.filter((item) => item.date !== newDate);
          return [...filtered, ...finalFormatted];
        });
      }

      // ? Format and set line chart data for the year:-
      if (category === "year" && subCategory) {
        const yearLabel = subCategory;
        const finalFormatted: LineChartEntry[] = [
          {
            date: yearLabel,
            ...revenueByService,
          },
        ];
        setYearLineChartData((prev: LineChartEntry[]) => {
          const newDate = finalFormatted[0].date;
          const filtered = prev.filter((item) => item.date !== newDate);
          return [...filtered, ...finalFormatted];
        });
      }
    } catch (error) {
      toast.error("Failed to load revenue", {
        description: "Please try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // ? Filter by date:-
  useEffect(() => {
    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");
      fetchRevenueData(`/api/revenue_graph?date=${formatted}`);
    }
  }, [selectedDate]);

  // ? Fetch initially with today's date if no date selected:-
  useEffect(() => {
    if (!selectedDate && !hasFetchedDefault) {
      let today = new Date();
      let formattedDate = format(today, "yyyy-MM-dd");
      fetchRevenueData(`/api/revenue_graph?date=${formattedDate}`);
      setHasFetchedDefault(true);
      setSelectedDate(today);
    }
  }, [selectedDate, hasFetchedDefault]);

  // ? Filter by week:-
  useEffect(() => {
    if (weekRange) {
      const start = weekRange.start.toLocaleDateString("en-CA");
      const end = weekRange.end.toLocaleDateString("en-CA");
      fetchRevenueData(`/api/revenue_graph?weekStart=${start}&weekEnd=${end}`);
    }
  }, [weekRange]);

  // ? Filter by month and year:-
  useEffect(() => {
    if (category === "month" && subCategory) {
      const month = filterOptions.month.indexOf(subCategory) + 1;
      fetchRevenueData(
        `/api/revenue_graph?month=${month}&year=${new Date().getFullYear()}`
      );
    } else if (category === "year" && subCategory) {
      fetchRevenueData(`/api/revenue_graph?year=${subCategory}`);
    }
  }, [category, subCategory]);

  // ? handle week range:-
  const handleWeekSelect = (date: Date | undefined) => {
    if (!date) return;
    const end = date;
    const start = subDays(date, 6);
    setWeekDate(date);
    setWeekRange({ start, end });
    setWeekPickerOpen(false);
    setSelectedDate(undefined);
    setCategory("");
    setSubCategory("");
  };

  // ? Create this custom tooltip component:-
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const { count, revenue } = payload[0].payload;

      return (
        <div className="bg-[#e6f4f2] border border-[#c4e3df] rounded-lg shadow-lg backdrop-blur-sm p-3 max-w-[220px]">
          <p className="text-[#0f4c4c] font-semibold text-[12px] mb-1 tracking-wide">
            {label}
          </p>
          <div className="flex justify-between space-y-1 text-xs text-[#20585a]">
            <span className="font-xs truncate tracking-wide text-[#239b92]">
              Patients:
            </span>
            <span className="font-semibold text-xs">{count}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-[#c8e6e4] text-xs font-bold text-[#00695c] flex justify-between gap-4">
            <span className="text-[#00695c]">Total</span>
            <span className="text-xs">₹{revenue}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // ? handle print:
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ? handle line chart data:-
  const getChartData = () => {
    if (weekRange) return weekLineChartData;
    if (category === "month" && subCategory) return monthLineChartData;
    if (category === "year" && subCategory) return yearLineChartData;
    return lineChartData;
  };

  // ? for full page loader:-
  useEffect(() => {
    // Simulate API call or data fetch
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader when data is ready
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Full page loading screen
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-1000">
        <div className="flex flex-col justify-center items-center gap-4">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={printRef} id="printable-report">
        {/* FILTERS */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2 ">
            {/*  DATE PICKER */}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-[#42998d] rounded-md text-sm text-gray-700 bg-white transition-all duration-150 tracking-wide w-full sm:w-auto cursor-pointer"
                  aria-label="Select date">
                  <CalendarIcon className="w-4 h-4 text-[#42998d]" />
                  <span>
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-auto p-0 z-50 bg-white border border-[#42998d] rounded-md">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setCalendarOpen(false);
                      setWeekRange(null);
                      setWeekDate(null);
                      setCategory("");
                      setSubCategory("");
                    }
                  }}
                  className={cn(
                    // Selected date style
                    "[&_.rdp-day_selected]:bg-[#18564e]",
                    "[&_.rdp-day_selected]:text-white",

                    // Hover style
                    "[&_.rdp-day:hover]:bg-[#cceee8]",
                    "[&_.rdp-day:hover]:cursor-pointer",

                    // Transition and rounding
                    "[&_.rdp-day]:transition-all",
                    "[&_.rdp-day]:rounded-md",

                    // Full focus/active/visible reset (👇 ye most important hain)
                    "[&_.rdp-day]:outline-none",
                    "[&_.rdp-day]:ring-0",
                    "[&_.rdp-day]:border-none",
                    "[&_.rdp-day]:shadow-none",
                    "[&_.rdp-day]:focus:outline-none",
                    "[&_.rdp-day]:focus:ring-0",
                    "[&_.rdp-day]:focus:border-none",
                    "[&_.rdp-day]:focus:shadow-none",
                    "[&_.rdp-day]:focus-visible:outline-none",
                    "[&_.rdp-day]:focus-visible:ring-0",
                    "[&_.rdp-day]:focus-visible:border-none",
                    "[&_.rdp-day]:focus-visible:shadow-none",
                    "[&_.rdp-day]:active:outline-none",
                    "[&_.rdp-day]:active:ring-0",
                    "[&_.rdp-day]:active:border-none",
                    "[&_.rdp-day]:active:shadow-none"
                  )}
                />
              </PopoverContent>
            </Popover>

            {/* WEEK PICKER */}
            <Popover open={weekPickerOpen} onOpenChange={setWeekPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-[#42998d] rounded-md text-sm text-gray-700 shadow-sm bg-white transition-all duration-150 tracking-wide w-full sm:w-auto cursor-pointer"
                  aria-label="Select week">
                  <CalendarIcon className="w-4 h-4 text-[#42998d]" />
                  <span>
                    {weekRange
                      ? `${format(weekRange.end, "PPP")} - ${format(
                          weekRange.start,
                          "PPP"
                        )}`
                      : "Select week"}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-auto p-0 z-50 bg-white border border-[#42998d] rounded-md shadow-md">
                <Calendar
                  mode="single"
                  selected={weekDate ?? undefined}
                  onSelect={handleWeekSelect}
                  className={cn(
                    // Selected date style
                    "[&_.rdp-day_selected]:bg-[#18564e]",
                    "[&_.rdp-day_selected]:text-white",

                    // Hover style
                    "[&_.rdp-day:hover]:bg-[#cceee8]",
                    "[&_.rdp-day:hover]:cursor-pointer",

                    // Transition and rounding
                    "[&_.rdp-day]:transition-all",
                    "[&_.rdp-day]:rounded-md",

                    // Full focus/active/visible reset (👇 ye most important hain)
                    "[&_.rdp-day]:outline-none",
                    "[&_.rdp-day]:ring-0",
                    "[&_.rdp-day]:border-none",
                    "[&_.rdp-day]:shadow-none",
                    "[&_.rdp-day]:focus:outline-none",
                    "[&_.rdp-day]:focus:ring-0",
                    "[&_.rdp-day]:focus:border-none",
                    "[&_.rdp-day]:focus:shadow-none",
                    "[&_.rdp-day]:focus-visible:outline-none",
                    "[&_.rdp-day]:focus-visible:ring-0",
                    "[&_.rdp-day]:focus-visible:border-none",
                    "[&_.rdp-day]:focus-visible:shadow-none",
                    "[&_.rdp-day]:active:outline-none",
                    "[&_.rdp-day]:active:ring-0",
                    "[&_.rdp-day]:active:border-none",
                    "[&_.rdp-day]:active:shadow-none"
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col md:flex-row justify-end gap-4 w-full ">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setSubCategory("");
                  setSelectedDate(undefined);
                  setWeekRange(null);
                  setWeekDate(null);
                }}>
                <SelectTrigger className="w-full md:w-[200px] border rounded-md  focus:ring-[#42998d] focus:outline-none transition-all bg-white duration-150 cursor-pointer border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="rounded-md z-50 bg-white border border-[#42998d] tracking-wide">
                  <CustomSelectItem value="month">Month</CustomSelectItem>
                  <CustomSelectItem value="year">Year</CustomSelectItem>
                </SelectContent>
              </Select>

              {category && (
                <Select value={subCategory} onValueChange={setSubCategory}>
                  <SelectTrigger className="w-full md:w-[200px] border rounded-md  focus:ring-[#42998d] focus:outline-none transition-all bg-white duration-150 cursor-pointer border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide">
                    <SelectValue placeholder={`Select ${category}`} />
                  </SelectTrigger>
                  <SelectContent className="rounded-md z-50 bg-white border border-[#42998d] tracking-wide">
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
        </div>

        {data.length === 0 ? (
          // NO DATA FOUND
          <>
            <div className="flex flex-col justify-center items-center min-h-screen">
              <NoDataFound />
              <div className="text-center text-gray-500 tracking-wide text-sm font-semibold italic space-y-2 mt-2">
                <h2>The data hasn’t been updated yet.</h2>
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* TOTAL REVENUE */}
            <TotalRevenueSummary data={data} />

            {/* BAR CHART AND PIE CHART */}
            <div className="w-full flex flex-col lg:flex-row gap-4">
              {/* BAR CHART */}
              <div className="w-full">
                <Card className="w-full bg-white rounded-md p-4 border border-gray-300">
                  {/* Heading */}
                  <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
                    <span className="border-b border-[#18564e] inline-block pb-1">
                      Revenue Bar Chart
                    </span>
                  </h2>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="flex justify-center items-center h-48">
                        <Loading />
                      </div>
                    ) : (
                      <div className="no-outline-on-focus">
                        <div className="w-full overflow-x-auto">
                          <div className="min-w-[600px] h-[325px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={data}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 10,
                                  bottom: 10,
                                }}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#81c7ba"
                                />
                                <XAxis
                                  dataKey="name"
                                  tick={{ fill: "#3f4a5a", fontSize: 12 }}
                                  axisLine={{ stroke: "#81c7ba" }}
                                />
                                <YAxis
                                  tick={{ fill: "#3f4a5a", fontSize: 12 }}
                                  axisLine={{ stroke: "#81c7ba" }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  dataKey="count"
                                  fill="#0b968d"
                                  radius={[8, 8, 0, 0]}
                                  barSize={40}
                                  isAnimationActive={true}
                                  animationDuration={800}
                                  animationEasing="ease-out"
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* PIE CHART */}
              <div className="w-full lg:w-1/2">
                <RevenuePieChart data={data} loading={loading} />
              </div>
            </div>

            {/* LINE CHART */}
            <div>
              <RevenueLineChart data={getChartData()} loading={loading} />
            </div>

            {/* PRINT */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrint}
                className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer">
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
