"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Headphones,
  Film,
  Users,
  Radio,
  Mic,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";

interface InterestedContentTypesScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const CONTENT_TYPES = [
  { id: "e-kitaplar", label: "E-Kitaplar", icon: BookOpen },
  { id: "sesli-kitaplar", label: "Sesli Kitaplar", icon: Headphones },
  { id: "belgeseller", label: "Belgeseller", icon: Film },
  { id: "yazarlar", label: "Yazarlar", icon: Users },
  { id: "radyo-tiyatrolari", label: "Radyo Tiyatroları", icon: Radio },
  { id: "podcastler", label: "Podcastler", icon: Mic },
  { id: "egitim-videolari", label: "Eğitim Videoları", icon: Video },
];

export function InterestedContentTypesScreen({
  onBack,
  onNext,
  onSkip,
}: InterestedContentTypesScreenProps) {
  // Pre-selected from Figma reference: Sesli Kitaplar, Yazarlar, Radyo Tiyatroları
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "sesli-kitaplar",
    "yazarlar",
    "radyo-tiyatrolari",
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
      <div className="px-6 pt-5 pb-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>GERİ</span>
        </button>

        <button
          type="button"
          onClick={onSkip || onNext}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          <span>GEÇ</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* 3. Headline Area */}
      <div className="px-6 pt-1 pb-3 text-center z-10">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          Hangi içerik türleri
          <br />
          ilgini çekiyor?
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-2">
          En az üç adet içerik türü seç.
        </p>
      </div>

      {/* 4. Pill Cards List (Figma Stacked Pill Style) */}
      <div className="flex-1 overflow-y-auto px-6 py-2 pb-28 scrollbar-none space-y-3">
        {CONTENT_TYPES.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const IconComp = item.icon;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full h-16 rounded-full px-7 flex items-center gap-4 transition-all duration-200 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                isSelected
                  ? "bg-[#EF4823] text-white shadow-md shadow-[#EF4823]/25"
                  : "bg-white text-[#111111] hover:bg-white/90"
              }`}
            >
              {isSelected ? (
                <CheckCircle2 className="w-6 h-6 text-white stroke-[2.2] shrink-0" />
              ) : (
                <IconComp className="w-6 h-6 text-[#EF4823] stroke-[1.8] shrink-0" />
              )}

              <span className="text-base sm:text-[17px] font-semibold tracking-tight">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 5. Floating Bottom Navigation Bar (Step 2 active) */}
      <div className="absolute bottom-6 inset-x-6 z-30">
        <div className="w-full h-15 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/60 px-6 flex items-center justify-between">
          {/* 4 Step Dashes (Step 1 & 2 active) */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
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
