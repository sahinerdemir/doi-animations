"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ChevronRight, ArrowRight, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface AreasOfInterestScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

interface InterestItem {
  id: string;
  label: string;
  rotation: number;
  minHeight: string;
  fontSize: string;
  delay: number;
  duration: number;
}

const INTEREST_ITEMS: InterestItem[] = [
  // 1. SIRA: İlk 3 kutu (Önce ekranın altından hızla fırlayarak gelir)
  {
    id: "edebiyat",
    label: "Edebiyat",
    rotation: -5.5,
    minHeight: "min-h-[116px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.06,
    duration: 0.65,
  },
  {
    id: "bilim-teknoloji",
    label: "Bilim ve\nTeknoloji",
    rotation: 3.2,
    minHeight: "min-h-[142px]",
    fontSize: "text-[18px] sm:text-[19px] font-bold leading-[1.15]",
    delay: 0.10,
    duration: 0.72,
  },
  {
    id: "din",
    label: "Din",
    rotation: -1.5,
    minHeight: "min-h-[100px]",
    fontSize: "text-[18px] font-bold",
    delay: 0.08,
    duration: 0.60,
  },

  // 2. SIRA: Farklı hızlarda ve açılarda yükselenler
  {
    id: "ekonomi",
    label: "Ekonomi",
    rotation: -6.0,
    minHeight: "min-h-[116px]",
    fontSize: "text-[17px] font-semibold",
    delay: 0.22,
    duration: 0.68,
  },
  {
    id: "felsefe",
    label: "Felsefe",
    rotation: 1.0,
    minHeight: "min-h-[118px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.28,
    duration: 0.76,
  },
  {
    id: "gastronomi",
    label: "Gastronomi",
    rotation: 4.8,
    minHeight: "min-h-[112px]",
    fontSize: "text-[15px] font-semibold",
    delay: 0.20,
    duration: 0.64,
  },

  // 3. SIRA: Kişisel Gelişim daha büyük ve belirgin
  {
    id: "hukuk",
    label: "Hukuk",
    rotation: -4.2,
    minHeight: "min-h-[112px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.36,
    duration: 0.70,
  },
  {
    id: "kisisel-gelisim",
    label: "Kişisel\nGelişim",
    rotation: 3.8,
    minHeight: "min-h-[142px]",
    fontSize: "text-[18px] sm:text-[19px] font-bold leading-[1.15]",
    delay: 0.42,
    duration: 0.82,
  },
  {
    id: "tarih",
    label: "Tarih",
    rotation: -1.2,
    minHeight: "min-h-[116px]",
    fontSize: "text-[17px] font-semibold",
    delay: 0.34,
    duration: 0.66,
  },

  // 4. SIRA:
  {
    id: "mitoloji",
    label: "Mitoloji",
    rotation: -3.0,
    minHeight: "min-h-[112px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.48,
    duration: 0.72,
  },
  {
    id: "psikoloji",
    label: "Psikoloji",
    rotation: 1.2,
    minHeight: "min-h-[114px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.54,
    duration: 0.78,
  },
  {
    id: "saglik",
    label: "Sağlık",
    rotation: 4.0,
    minHeight: "min-h-[106px]",
    fontSize: "text-[18px] font-bold",
    delay: 0.46,
    duration: 0.64,
  },

  // 5. SIRA:
  {
    id: "sanat",
    label: "Sanat",
    rotation: -4.0,
    minHeight: "min-h-[110px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.60,
    duration: 0.75,
  },
  {
    id: "seyahat",
    label: "Seyahat",
    rotation: 2.2,
    minHeight: "min-h-[112px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.66,
    duration: 0.84,
  },
  {
    id: "siyaset",
    label: "Siyaset",
    rotation: -2.0,
    minHeight: "min-h-[110px]",
    fontSize: "text-[16px] font-semibold",
    delay: 0.58,
    duration: 0.70,
  },
];

export function AreasOfInterestScreen({
  onBack,
  onNext,
  onSkip,
}: AreasOfInterestScreenProps) {
  // Görseldeki seçili olanlar: Edebiyat, Bilim ve Teknoloji, Felsefe, Hukuk, Tarih
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "edebiyat",
    "bilim-teknoloji",
    "felsefe",
    "hukuk",
    "tarih",
  ]);

  const [replayKey, setReplayKey] = useState<number>(0);
  const [shakingIds, setShakingIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    const isCurrentlySelected = selectedIds.includes(id);
    if (!isCurrentlySelected) {
      // Seçili hale geliyor: hafif titreme (tactile shake) efekti ile seçilsin
      setShakingIds((prev) => ({ ...prev, [id]: true }));
      setSelectedIds((prev) => [...prev, id]);
      setTimeout(() => {
        setShakingIds((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }, 400);
    } else {
      // Zaten seçiliydi: seçim kaldırılıyor (titreme olmadan)
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const isComplete = selectedIds.length >= 3;

  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20" />

      {/* 2. Top Navigation */}
      <div className="px-6 pt-3 pb-1 flex items-center justify-between z-20 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          {onBack && "‹ GERİ"}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            title="Animasyonu Yeniden Oynat"
            className="p-1 rounded-full hover:bg-black/5 text-zinc-400 hover:text-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
      </div>

      {/* 3. Headline Area */}
      <div className="px-6 pt-1 pb-3 text-center z-20 shrink-0">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          İlgilendiğin alanlar
          <br />
          hangileri?
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-1.5">
          En az üç adet ilgi alanı seç.
        </p>
      </div>

      {/* 4. Tilted / Organic Cards Grid with Top & Bottom Fade Out Mask */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-1 pb-28 scrollbar-none relative"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 74px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 74px), transparent 100%)",
        }}
      >
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 items-center py-2">
          {INTEREST_ITEMS.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const isShaking = Boolean(shakingIds[item.id]);

            return (
              <motion.div
                key={`${item.id}-${replayKey}`}
                initial={{ opacity: 0, y: 480, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: item.rotation }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full flex items-center justify-center"
              >
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  animate={
                    isShaking
                      ? {
                          rotate: [0, -3.5, 3.5, -2, 2, -1, 1, 0],
                          x: [0, -3.5, 3.5, -2.5, 2.5, -1, 1, 0],
                          scale: [1, 1.04, 0.97, 1.02, 1],
                        }
                      : { rotate: 0, x: 0, scale: 1 }
                  }
                  transition={
                    isShaking
                      ? {
                          duration: 0.38,
                          ease: "easeInOut",
                        }
                      : { duration: 0.15 }
                  }
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`w-full ${
                    item.minHeight
                  } rounded-[24px] p-3 flex items-center justify-center text-center transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#EF4823] text-white shadow-md shadow-[#EF4823]/25"
                      : "bg-white text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:bg-white/95"
                  }`}
                >
                  <span
                    className={`${item.fontSize} whitespace-pre-line tracking-tight select-none`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 5. Floating Bottom Navigation Bar (Exact Figma Bottom Pill #14255:2236) */}
      <div className="absolute bottom-6 inset-x-6 z-30 pointer-events-auto">
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
