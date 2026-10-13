"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Headphones,
  Video,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

interface ContentsScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const BOOKS = [
  {
    id: "kurk-mantolu-madonna",
    title: "Kürk Mantolu\nMadonna",
    author: "Sabahattin Ali",
    icon: FileText,
    coverColor: "from-purple-900 to-indigo-950",
    badgeColor: "text-red-500 bg-white",
  },
  {
    id: "kordugum",
    title: "Kördüğüm",
    author: "Ayşe Kulin",
    icon: BookOpen,
    coverColor: "from-zinc-700 to-zinc-900",
    badgeColor: "text-zinc-600 bg-white",
  },
  {
    id: "gazi-mustafa-kemal",
    title: "Gazi Mustafa\nKemal’in Hayatı",
    author: "İlber Ortaylı",
    icon: Video,
    coverColor: "from-amber-800 to-stone-900",
    badgeColor: "text-red-500 bg-white",
  },
  {
    id: "beyond-the-ocean-door",
    title: "Beyond the Ocean\nDoor",
    author: "Amisha Sathi",
    icon: Headphones,
    coverColor: "from-teal-800 to-emerald-950",
    badgeColor: "text-orange-500 bg-white",
  },
];

export function ContentsScreen({ onBack, onNext, onSkip }: ContentsScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "kurk-mantolu-madonna",
    "kordugum",
    "gazi-mustafa-kemal",
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
          Hoşuna giden
          <br />
          içerikleri seç!
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-2">
          En az üç adet içerik seç.
        </p>
      </div>

      {/* 4. Book Cards List */}
      <div className="flex-1 overflow-y-auto px-6 py-2 pb-28 scrollbar-none space-y-3">
        {BOOKS.map((book) => {
          const isSelected = selectedIds.includes(book.id);
          const IconComp = book.icon;

          return (
            <motion.button
              key={book.id}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => toggleItem(book.id)}
              className={`w-full p-3.5 rounded-[24px] bg-white flex items-center gap-4 transition-all duration-200 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-2 ${
                isSelected
                  ? "border-[#EF4823] shadow-md shadow-[#EF4823]/15"
                  : "border-transparent hover:border-zinc-200"
              }`}
            >
              {/* Cover with badge */}
              <div className="relative shrink-0">
                <div
                  className={`w-20 h-24 rounded-2xl bg-gradient-to-br ${book.coverColor} flex flex-col justify-between p-2 shadow-sm text-white overflow-hidden`}
                >
                  <span className="text-[9px] font-bold opacity-80 uppercase leading-none">
                    DOİ
                  </span>
                  <span className="text-[10px] font-bold leading-tight line-clamp-2">
                    {book.title}
                  </span>
                </div>

                {/* Badge icon attached to right edge */}
                <div
                  className={`absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md flex items-center justify-center border border-zinc-100 ${book.badgeColor}`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Author */}
              <div className="flex-1 text-left min-w-0 pl-1">
                <h4 className="text-base sm:text-[17px] font-semibold text-[#111111] leading-snug whitespace-pre-line tracking-tight">
                  {book.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#777777] mt-1 font-normal">
                  {book.author}
                </p>
              </div>

              {/* Checkmark indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#EF4823] text-white"
                    : "bg-zinc-100 text-transparent"
                }`}
              >
                <CheckCircle2 className="w-5 h-5 fill-[#EF4823] text-white" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 5. Floating Bottom Navigation Bar (Step 3 active) */}
      <div className="absolute bottom-6 inset-x-6 z-30">
        <div className="w-full h-15 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/60 px-6 flex items-center justify-between">
          {/* 4 Step Dashes (Step 1, 2, 3 active) */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
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
