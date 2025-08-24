"use client";

import { useMemo, useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

interface InventoryBlockProps {
  inventoryId: string;
  itemName: string;
}

const InventoryBlock = ({ inventoryId, itemName }: InventoryBlockProps) => {
  const [quantity, setQuantity] = useState(0);
  const [rows, setRows] = useState<RowData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [expandedBases, setExpandedBases] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/first-inventory/${inventoryId}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success) {
        const doc = json.data;

        const allRows: RowData[] = doc.history.map((h: any) => ({
          _id: doc._id,
          item: doc.item,
          date: h.date,
          time: h.time,
          quantity: h.quantity,
          spent: h.spent,
          isBase: h.isBase,
        }));

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
  }, [inventoryId]);

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

    try {
      const res = await fetch(`/api/first-inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: itemName,
          quantity: added,
          spent: 0,
          isBase: true,
          date,
          time,
        }),
      });

      const json = await res.json();
      if (!json.success) return;

      fetchData();
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

    try {
      const res = await fetch(`/api/first-inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: itemName,
          quantity: newQuantity,
          spent,
          isBase: false,
          date,
          time,
        }),
      });

      const json = await res.json();
      if (!json.success) return;

      fetchData();
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

    const row = rows[editIndex]; // current row
    const oldSpent = row.spent; // purana spent
    const diff = spent - oldSpent; // naya - purana

    // ✅ Agar diff se quantity negative ho jaayegi → API call hi mat karo
    if (row.quantity - diff < 0) return;

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
      if (!json.success) return;

      fetchData();
      resetInput();
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
    setExpandedBases((prev) =>
      prev.includes(baseIndex)
        ? prev.filter((idx) => idx !== baseIndex)
        : [...prev, baseIndex]
    );
  };

  const getBaseIndexForRow = (rowIndex: number) => {
    for (let i = rowIndex; i >= 0; i--) {
      if (rows[i].isBase) return i;
    }
    return -1;
  };

  const isBaseActive = quantity > 0;

  const totalUsage = useMemo(() => {
    return rows
      .filter((row) => row.isBase)
      .reduce((sum, row) => sum + row.quantity, 0);
  }, [rows]);

  return (
    <div className="w-full rounded-lg mt-8">
      {/* Heading */}
      <h2 className="text-xl font-bold text-[#1e4d4f] tracking-wide mb-2">
        {itemName} {language === "english" ? "Inventory" : "इन्वेंटरी"}
      </h2>

      {/* Table */}
      <div className="w-full overflow-x-auto scrollbar-hide group relative border border-[#42998d] transition-colors duration-300">
        <table className="w-full min-w-[700px] table-fixed border-collapse">
          <thead className="bg-[#0b968d] sticky top-0 z-10">
            <tr className="text-left font-semibold">
              <th className="w-[12%] px-4 py-3 text-left text-sm text-white tracking-wide font-semibold">
                {language === "english" ? "Item" : "आइटम"}
              </th>
              <th className="w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                {language === "english" ? "Date" : "तारीख़"}
              </th>
              <th className="w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                {language === "english" ? "Time" : "समय"}
              </th>
              <th className="w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
                {language === "english" ? "Spent" : "खर्च"}
              </th>
              <th className="w-[20%] text-center px-4 py-3 text-sm text-white tracking-wide font-semibold">
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

                if (!isBaseRow && !isExpanded) return null;

                return (
                  <motion.tr
                    key={i}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative hover:bg-gray-50 border border-gray-200"
                    onClick={() => isBaseRow && toggleBase(i)}>
                    <td className="p-4 text-sm flex items-center gap-2">
                      {row.item}
                      {row.isBase && (
                        <span className="text-[10px] px-2 py-1 bg-[#0b968d] text-white font-semibold rounded-full cursor-pointer">
                          {language === "english" ? "Base" : "बेस"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-700">
                      {row.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-700">
                      {row.time}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-700">
                      {row.spent} {language === "english" ? "Piece" : "पीस"}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-700 relative">
                      {row.quantity} {language === "english" ? "Piece" : "पीस"}
                      {!row.isBase && i === rows.length - 1 && (
                        <button
                          onClick={() => handleEditRow(i)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 md:right-10 md:top-1/2 md:-translate-y-1/2 text-[#0b968d] cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100">
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

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {isAdding ? (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`${
                  language === "english"
                    ? `Enter ${isBaseActive ? "spent" : "initial"} quantity`
                    : `कृपया ${
                        isBaseActive ? "खर्च" : "प्रारंभिक"
                      } मात्रा दर्ज करें`
                }`}
                className="border border-[#c4e3df] rounded-md px-3 py-1 text-sm text-[#18564e] focus:outline-none placeholder:tracking-wide w-full sm:w-auto"
              />
              <button
                onClick={
                  editIndex !== null
                    ? handleSaveEdit
                    : isBaseActive
                    ? handleAddSpend
                    : handleAddQuantity
                }
                className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer tracking-wide w-full sm:w-auto">
                {language === "english" ? "OK" : "ठीक है"}
              </button>
              <button
                onClick={resetInput}
                className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer tracking-wide w-full sm:w-auto">
                {language === "english" ? "Cancel" : "रद्द करें"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer tracking-wide w-full sm:w-auto">
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
        <div className="px-3 py-1 rounded-md bg-[#0b968d] text-center w-full sm:w-auto">
          <span className="text-sm font-semibold text-white tracking-wide">
            {language === "english" ? "Total Usage:" : "कुल उपयोग:"}{" "}
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            {totalUsage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InventoryBlock;
