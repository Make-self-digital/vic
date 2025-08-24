"use client";

import { useState, useEffect } from "react";
import InventoryBlock from "./InventoryBlock";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { useLanguage } from "@/hooks/LanguageContext";

interface Inventory {
  _id: string;
  item: string;
}

const MedicalInventory = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);

  // language:-
  const { language } = useLanguage();

  const fetchInventories = async () => {
    try {
      const res = await fetch("/api/first-inventory", { cache: "no-store" });
      const json = await res.json();
      if (json.success) {
        setInventories(json.data);
      }
    } catch (err) {
      console.error("Error fetching inventories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const handleAddInventory = async () => {
    if (!newItem.trim()) return;
    try {
      const res = await fetch("/api/first-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: newItem,
          history: [],
        }),
      });

      const json = await res.json();
      if (json.success) {
        setInventories((prev) => [...prev, json.data]);
        setNewItem("");
      }
    } catch (err) {
      console.error("Error adding inventory:", err);
    }
  };

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
    <main className="p-6 bg-white border border-[#c4e3df] rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#1e4d4f] text-center tracking-wide mb-6">
        {language === "english" ? "Inventory" : "इन्वेंटरी"}
      </h2>

      {/* Add Inventory Input */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={
            language === "english"
              ? "Enter inventory name"
              : "इन्वेंटरी का नाम दर्ज करें"
          }
          className="w-full border px-4 py-2 border-[#c4e3df] rounded-md text-sm text-[#18564e] focus:outline-none placeholder:tracking-wide"
        />
        <Button
          variant="outline"
          onClick={handleAddInventory}
          className="text-[#1e4d4f] rounded-md px-5 sm:px-6 py-3 font-semibold border-[#c4e3df] hover:bg-[#0b968d] hover:text-white transition-transform duration-300 ease-in cursor-pointer tracking-wide">
          {language === "english" ? "Add Inventory" : "इन्वेंटरी जोड़ें"}
        </Button>
      </div>

      {/* Inventory Blocks */}
      {inventories.map((inv) => (
        <InventoryBlock
          key={inv._id}
          inventoryId={inv._id}
          itemName={inv.item}
        />
      ))}
    </main>
  );
};

export default MedicalInventory;
