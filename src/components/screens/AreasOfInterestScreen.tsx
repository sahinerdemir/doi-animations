"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AreasOfInterestScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const INTEREST_ITEMS = [
  { id: "edebiyat", label: "Edebiyat", tilt: "-rotate-2" },
  { id: "bilim-teknoloji", label: "Bilim ve\nTeknoloji", tilt: "rotate-0" },
  { id: "din", label: "Din", tilt: "rotate-1" },

  { id: "ekonomi", label: "Ekonomi", tilt: "rotate-1" },
  { id: "felsefe", label: "Felsefe", tilt: "rotate-0" },
  { id: "gastronomi", label: "Gastronomi", tilt: "-rotate-1" },

  { id: "hukuk", label: "Hukuk", tilt: "-rotate-1" },
  { id: "kisisel-gelisim", label: "Kişisel\nGelişim", tilt: "rotate-0" },
  { id: "tarih", label: "Tarih", tilt: "rotate-1" },

  { id: "mitoloji", label: "Mitoloji", tilt: "rotate-1" },
  { id: "psikoloji", label: "Psikoloji", tilt: "rotate-0" },
  { id: "saglik", label: "Sağlık", tilt: "-rotate-1" },

  { id: "sanat", label: "Sanat", tilt: "-rotate-1" },
  { id: "seyahat", label: "Seyahat", tilt: "rotate-0" },
  { id: "siyaset", label: "Siyaset", tilt: "rotate-1" },
];

export function AreasOfInterestScreen({
  onBack,
  onNext,
  onSkip,
}: AreasOfInterestScreenProps) {
  // Preselect from Figma reference: Edebiyat, Bilim ve Teknoloji, Felsefe, Hukuk, Tarih
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "edebiyat",
    "bilim-teknoloji",
    "felsefe",
    "hukuk",
    "tarih",
  ]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isComplete = selectedIds.length >= 3;

  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 2. Top Navigation */}
      <div className="px-6 py-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          {onBack && "‹ GERİ"}
        </button>

        <button
          type="button"
          onClick={onSkip || onNext}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity ml-auto"
        >
          <span>GEÇ</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* 3. Headline Area */}
      <div className="px-6 pt-1 pb-4 text-center z-10">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          İlgilendiğin alanlar
          <br />
          hangileri?
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-2">
          En az üç adet ilgi alanı seç.
        </p>
      </div>

      {/* 4. Tilted / Organic Cards Grid (Figma 3 Columns) */}
      <div className="flex-1 overflow-y-auto px-4 py-1 pb-28 scrollbar-none">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {INTEREST_ITEMS.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`min-h-[96px] sm:min-h-[104px] rounded-[22px] p-3 flex items-center justify-center text-center transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                  item.tilt
                } ${
                  isSelected
                    ? "bg-[#EF4823] text-white shadow-lg shadow-[#EF4823]/25"
                    : "bg-white text-[#111111] hover:bg-white/90"
                }`}
              >
                <span className="text-sm sm:text-[15px] font-semibold leading-snug whitespace-pre-line tracking-tight">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. Floating Bottom Navigation Bar (Exact Figma Bottom Pill #14255:2236) */}
      <div className="absolute bottom-6 inset-x-6 z-30">
        <div className="w-full h-15 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/60 px-6 flex items-center justify-between">
          {/* 4 Step Dashes (Step 1 active orange) */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#D1D1D6]" />
            <div className="w-6 h-1.5 rounded-full bg-[#D1D1D6]" />
            <div className="w-6 h-1.5 rounded-full bg-[#D1D1D6]" />
          </div>

          {/* Devam Button */}
          <button
            type="button"
            onClick={onNext}
            className={`flex items-center gap-2 text-sm sm:text-[15px] font-medium transition-all ${
              isComplete
                ? "text-[#111111] font-semibold hover:text-[#EF4823]"
                : "text-[#777777] opacity-60"
            }`}
          >
            <span>Devam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
