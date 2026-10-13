"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, Check, Headphones, BookOpen, Mic, Radio, Video, Feather } from "lucide-react";
import { motion } from "framer-motion";

interface InterestedContentTypesScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const CONTENT_TYPES = [
  {
    id: "sesli-kitaplar",
    title: "Sesli Kitaplar",
    desc: "Usta seslendirmenlerden binlerce sesli eser",
    icon: Headphones,
    count: "2.400+ Eser",
  },
  {
    id: "e-kitaplar",
    title: "E-Kitaplar & Metinler",
    desc: "Zengin dijital kütüphane ve orijinal baskılar",
    icon: BookOpen,
    count: "15.000+ Kitap",
  },
  {
    id: "radyo-tiyatrolari",
    title: "Radyo Tiyatroları",
    desc: "Klasik ve çağdaş dramatik ses oyunları",
    icon: Radio,
    count: "450+ Oyun",
  },
  {
    id: "podcastler",
    title: "Podcast Yayınları",
    desc: "Felsefe, tarih, edebiyat ve bilim sohbetleri",
    icon: Mic,
    count: "120+ Seri",
  },
  {
    id: "belgeseller",
    title: "Belgeseller & Videolar",
    desc: "Kültür, sanat ve portre belgeselleri",
    icon: Video,
    count: "300+ Bölüm",
  },
  {
    id: "yazarlar",
    title: "Yazarlar & Koleksiyonlar",
    desc: "Özel yazar arşivleri ve külliyatlar",
    icon: Feather,
    count: "800+ Yazar",
  },
];

export function InterestedContentTypesScreen({
  onBack,
  onNext,
  onSkip,
}: InterestedContentTypesScreenProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "sesli-kitaplar",
    "radyo-tiyatrolari",
    "yazarlar",
  ]);

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2" />

      {/* 2. Top Nav */}
      <div className="px-6 py-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-white transition-all active:scale-95"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-zinc-500 font-mono tracking-wider">
          ADIM 2 / 3
        </span>

        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white px-2 py-1 transition-colors"
        >
          GEÇ
        </button>
      </div>

      {/* 3. Header Title Area */}
      <div className="px-6 pt-3 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#EF4823]" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#EF4823]">
            İçerik Tercihleri
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
          Hangi Türleri Seversin?
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Deneyimini zenginleştirmek için favori içerik türlerini işaretle.
        </p>
      </div>

      {/* 4. Scrollable List of Types */}
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-2.5 scrollbar-none">
        <div className="space-y-2.5 pb-24">
          {CONTENT_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type.id);
            const IconComponent = type.icon;
            return (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => toggleType(type.id)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#EF4823] text-white border-[#EF4823] shadow-lg shadow-[#EF4823]/25"
                    : "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-[#EF4823]"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">
                      {type.title}
                    </h4>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? "text-white/80" : "text-zinc-400"
                      }`}
                    >
                      {type.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {type.count}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-white text-[#EF4823]"
                        : "bg-zinc-800 text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. Sticky Bottom Action Bar */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent pt-8 z-30">
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onNext}
          disabled={selectedTypes.length === 0}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold transition-all shadow-xl shadow-[#EF4823]/30 disabled:opacity-40 cursor-pointer"
        >
          <span>Devam Et ({selectedTypes.length} seçildi)</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
