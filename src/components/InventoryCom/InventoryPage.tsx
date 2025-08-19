"use client";

import { Card } from "@/components/ui/card";
import { useMemo, useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../Loading";
import { useLanguage } from "@/hooks/LanguageContext";

interface RowData {
  _id: string;
  item: string;
  date: string;
  time: string;
  quantity: number;
  spent: number;
  isBase: boolean;
}

const MedicalInventory = () => {
  const [quantity, setQuantity] = useState(0);
  const [rows, setRows] = useState<RowData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [expandedBases, setExpandedBases] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // language:-
  const { language } = useLanguage();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/first-inventory", { cache: "no-store" }); // force fresh data
      const json = await res.json();
      if (json.success) {
        const allRows: RowData[] = json.data.flatMap((inv: any) =>
          inv.history.map((h: any) => ({
            _id: inv._id,
            item: inv.item,
            date: h.date,
            time: h.time,
            quantity: h.quantity,
            spent: h.spent,
            isBase: h.isBase,
          }))
        );

        // Date sorting (optional) so latest at bottom
        allRows.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });

        setRows(allRows);

        if (allRows.length > 0) {
          setQuantity(allRows[allRows.length - 1].quantity);
        }
      }
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Agar tu chaahe ki POST ke baad bhi turant update ho to ek event trigger kare
    window.addEventListener("inventoryUpdated", fetchData);

    return () => {
      window.removeEventListener("inventoryUpdated", fetchData);
    };
  }, []);

  const formatDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  const handleAddQuantity = async () => {
    const added = parseInt(inputValue);
    if (isNaN(added) || added <= 0) return;

    const { date, time } = formatDateTime();

    setLoading(true);
    try {
      const res = await fetch("/api/first-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: "Gel",
          quantity: added,
          spent: 0,
          isBase: true,
          date,
          time,
        }),
      });

      if (!res.ok) throw new Error("Failed to add quantity");

      const json = await res.json();

      if (!json.success) {
        console.error("Server error:", json.message);
        return;
      }

      // Server se pura updated doc milega
      const doc = json.data;

      // Flatten history with _id from doc
      const newRows = doc.history.map((h: any) => ({
        _id: doc._id,
        item: doc.item,
        date: h.date,
        time: h.time,
        quantity: h.quantity,
        spent: h.spent,
        isBase: h.isBase,
      }));

      setRows(newRows);

      // Update current quantity to last row quantity
      if (newRows.length > 0) {
        setQuantity(newRows[newRows.length - 1].quantity);
      }

      resetInput();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpend = async () => {
    const spent = parseInt(inputValue);
    if (isNaN(spent) || spent <= 0 || spent > quantity) return;

    const newQuantity = quantity - spent;
    const { date, time } = formatDateTime();

    setLoading(true);

    try {
      const res = await fetch("/api/first-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: "Gel",
          quantity: newQuantity,
          spent,
          isBase: false,
          date,
          time,
        }),
      });

      if (!res.ok) throw new Error("Failed to add spend");

      const json = await res.json();

      if (!json.success) {
        console.error("Server error:", json.message);
        return;
      }

      // Server se pura updated doc milega
      const doc = json.data;

      // Flatten history with _id from doc
      const newRows = doc.history.map((h: any) => ({
        _id: doc._id,
        item: doc.item,
        date: h.date,
        time: h.time,
        quantity: h.quantity,
        spent: h.spent,
        isBase: h.isBase,
      }));

      setRows(newRows);

      // Update current quantity to last row quantity
      if (newRows.length > 0) {
        setQuantity(newRows[newRows.length - 1].quantity);
      }

      resetInput();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRow = (index: number) => {
    setEditIndex(index);
    setInputValue(rows[index].spent.toString());
    setIsAdding(true);
  };

  const handleSaveEdit = async () => {
    if (editIndex === null) return;

    const spent = parseInt(inputValue);
    if (isNaN(spent) || spent <= 0) return;

    try {
      const res = await fetch(`/api/first-inventory/${rows[editIndex]._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          historyIndex: editIndex,
          spent,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        console.error("Error updating row:", json.message);
        return;
      }

      // DB se aaya naya history turant set karo
      const updatedRows = json.data.history.map((h: any) => ({
        _id: json.data._id,
        item: json.data.item,
        date: h.date,
        time: h.time,
        quantity: h.quantity,
        spent: h.spent,
        isBase: h.isBase,
      }));

      setRows(updatedRows);

      // Last quantity update karo
      if (updatedRows.length > 0) {
        setQuantity(updatedRows[updatedRows.length - 1].quantity);
      }

      resetInput();

      // Optionally fresh fetch for full sync
      await fetchData();
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const resetInput = () => {
    setInputValue("");
    setIsAdding(false);
    setEditIndex(null);
  };

  const toggleBase = (baseIndex: number) => {
    setExpandedBases(
      (prev) =>
        prev.includes(baseIndex)
          ? prev.filter((idx) => idx !== baseIndex) // collapse
          : [...prev, baseIndex] // expand
    );
  };

  const getBaseIndexForRow = (rowIndex: number) => {
    for (let i = rowIndex; i >= 0; i--) {
      if (rows[i].isBase) return i;
    }
    return -1;
  };

  const isBaseActive = quantity > 0;

  // ? Total usage (sum of all base quantities):-
  const totalUsage = useMemo(() => {
    return rows
      .filter((row) => row.isBase)
      .reduce((sum, row) => sum + row.quantity, 0);
  }, [rows]);

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
    <main className="min-h-screen">
      <div className="w-full space-y-6">
        <Card className="w-full rounded-md border border-gray-300 px-6 bg-white">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
            <span className="border-b border-[#18564e] inline-block pb-1">
              {language === "english" ? "Gel Inventory" : "जेल इन्वेंटरी"}
            </span>
          </h2>

          <div className="space-y-4">
            {/* Table */}
            <div className="w-full rounded-md p-0 overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[700px] table-fixed">
                <thead className="bg-[#0b968d] sticky top-0 z-10">
                  <tr className="text-left font-semibold">
                    <th className="w-[10%] px-4 py-3 text-left text-sm text-white tracking-wide font-semibold">
                      {language === "english" ? "Item" : "आइटम"}
                    </th>
                    <th className="w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                      {language === "english" ? "Date" : "तारीख़"}
                    </th>
                    <th className="p-4 w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                      {language === "english" ? "Time" : "समय"}
                    </th>
                    <th className="p-4 w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                      {language === "english" ? "Spent" : "खर्च"}
                    </th>
                    <th className="p-4 w-[20%] px-4 py-3 text-center text-sm text-white tracking-wide font-semibold">
                      {language === "english" ? "Quantity" : "मात्रा"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="sync">
                    {rows.map((row, i) => {
                      const baseIndex = getBaseIndexForRow(i);
                      const isBaseRow = row.isBase;
                      const isExpanded = expandedBases.includes(baseIndex);

                      // Agar base collapsed hai aur ye base row nahi hai => hide karo
                      if (!isBaseRow && !isExpanded) {
                        return null;
                      }

                      return (
                        <motion.tr
                          key={i}
                          layout="position"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="group hover:bg-gray-50 relative border border-gray-200"
                          onClick={() => isBaseRow && toggleBase(i)}>
                          <td className="p-4 text-sm flex items-center gap-2 tracking-wide">
                            {row.item}
                            {row.isBase && (
                              <span className="text-[10px] px-2 py-1 bg-[#0b968d] text-white font-semibold rounded-full cursor-pointer">
                                {language === "english" ? "Base" : "बेस"}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700 text-sm tracking-wide">
                            {row.date}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700 text-sm tracking-wide">
                            {row.time}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700 text-sm tracking-wide">
                            {row.spent}{" "}
                            {language === "english" ? "Piece" : "पीस"}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700 text-sm relative">
                            {row.quantity}{" "}
                            {language === "english" ? "Piece" : "पीस"}
                            {!row.isBase && i === rows.length - 1 && (
                              <button
                                onClick={() => handleEditRow(i)}
                                className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#0b968d] hover:text-[#0b968d]/80 cursor-pointer"
                                title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="flex flex-row items-center justify-between">
              {/* Add / Edit */}
              <div className="flex items-center gap-3">
                {isAdding ? (
                  <>
                    <input
                      type="text"
                      id="spentItem"
                      name="spentItem"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={`${
                        language === "english"
                          ? `Enter ${
                              isBaseActive ? "spent" : "initial"
                            } quantity`
                          : `कृपया ${
                              isBaseActive ? "खर्च" : "प्रारंभिक"
                            } मात्रा दर्ज करें`
                      }`}
                      autoComplete="off"
                      className="border border-[#c4e3df] rounded-md px-3 py-1 text-sm text-[#18564e] focus:outline-none placeholder:tracking-wide"
                    />
                    <button
                      onClick={
                        editIndex !== null
                          ? handleSaveEdit
                          : isBaseActive
                          ? handleAddSpend
                          : handleAddQuantity
                      }
                      className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer tracking-wide">
                      {language === "english" ? "OK" : "ठीक है"}
                    </button>
                    <button
                      onClick={resetInput}
                      className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer">
                      {language === "english" ? "Cancel" : "रद्द करें"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer tracking-wide">
                    {isBaseActive
                      ? language === "english"
                        ? "Add Spent"
                        : "खर्च जोड़ें"
                      : language === "english"
                      ? "Add Quantity"
                      : "मात्रा जोड़ें"}
                  </button>
                )}
              </div>

              {/* Total Usage */}
              <div className="px-3 py-1 rounded-md bg-[#0b968d]">
                <span className="text-sm font-semibold text-white tracking-wide">
                  {language === "english"
                    ? "Total Gel Usage:"
                    : "कुल जेल उपयोग:"}{" "}
                </span>
                <span className="text-sm font-semibold text-white">
                  {totalUsage}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default MedicalInventory;
