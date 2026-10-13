"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, Check, Compass } from "lucide-react";
import { motion } from "framer-motion";

interface AreasOfInterestScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const INTERESTS = [
  { id: "edebiyat", label: "Edebiyat", icon: "📖", category: "Kültür" },
  { id: "psikoloji", label: "Psikoloji", icon: "🧠", category: "İnsan" },
  { id: "felsefe", label: "Felsefe", icon: "🏛️", category: "Düşünce" },
  { id: "bilim", label: "Bilim ve Teknoloji", icon: "🔬", category: "Gelecek" },
  { id: "tarih", label: "Tarih", icon: "⏳", category: "Kültür" },
  { id: "sanat", label: "Sanat", icon: "🎨", category: "Kültür" },
  { id: "kisisel-gelisim", label: "Kişisel Gelişim", icon: "🌱", category: "İnsan" },
  { id: "cocuk-genc", label: "Çocuk ve Genç", icon: "🚀", category: "Eğitim" },
  { id: "hukuk", label: "Hukuk", icon: "⚖️", category: "Toplum" },
  { id: "ekonomi", label: "Ekonomi & Finans", icon: "📈", category: "İş" },
  { id: "saglik", label: "Sağlık & Yaşam", icon: "🌿", category: "Yaşam" },
  { id: "mitoloji", label: "Mitoloji", icon: "⚡", category: "Tarih" },
];

export function AreasOfInterestScreen({
  onBack,
  onNext,
  onSkip,
}: AreasOfInterestScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "edebiyat",
    "bilim",
    "felsefe",
  ]);

  const toggleInterest = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2" />

      {/* 2. Top Nav: Back + Skip */}
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
          ADIM 1 / 3
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
            Kişiselleştirme
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
          İlgi Alanlarını Seç
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Sana özel kütüphane oluşturabilmemiz için en az 3 alan belirle.
        </p>
      </div>

      {/* 4. Scrollable Grid of Interest Chips */}
      <div className="flex-1 overflow-y-auto px-6 py-3 scrollbar-none">
        <div className="grid grid-cols-2 gap-2.5 pb-20">
          {INTERESTS.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => toggleInterest(item.id)}
                className={`p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all duration-200 border min-h-[92px] ${
                  isSelected
                    ? "bg-[#EF4823] text-white border-[#EF4823] shadow-lg shadow-[#EF4823]/25"
                    : "bg-zinc-900/90 text-zinc-300 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl">{item.icon}</span>
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

                <div>
                  <h4 className="text-sm font-semibold tracking-tight leading-snug">
                    {item.label}
                  </h4>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-white/80" : "text-zinc-500"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. Sticky Bottom Action Bar with Blur */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent pt-8 z-30">
        <div className="flex items-center justify-between mb-2 px-1 text-xs">
          <span className="text-zinc-400">
            Seçilen:{" "}
            <strong className="text-white font-semibold">
              {selectedIds.length} alan
            </strong>
          </span>
          {selectedIds.length < 3 && (
            <span className="text-amber-400 text-[11px]">En az 3 alan önerilir</span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onNext}
          disabled={selectedIds.length === 0}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold transition-all shadow-xl shadow-[#EF4823]/30 disabled:opacity-40 cursor-pointer"
        >
          <span>Devam Et</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
