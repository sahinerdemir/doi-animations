"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, Bookmark, Headphones, Star, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ContentsScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const FEATURED_BOOKS = [
  {
    id: "gazi-mustafa-kemal",
    title: "Gazi Mustafa Kemal’in Hayatı",
    author: "İlber Ortaylı",
    type: "Sesli Kitap & E-Kitap",
    duration: "6 sa 24 dk",
    rating: "4.9",
    coverBg: "from-amber-600 to-amber-900",
    coverTitle: "Gazi Mustafa Kemal",
  },
  {
    id: "nutuk",
    title: "Nutuk (Tam Metin)",
    author: "Mustafa Kemal Atatürk",
    type: "E-Kitap",
    duration: "18 sa 10 dk",
    rating: "5.0",
    coverBg: "from-red-700 to-red-950",
    coverTitle: "NUTUK",
  },
  {
    id: "sapiens",
    title: "Hayvanlardan Tanrılara: Sapiens",
    author: "Yuval Noah Harari",
    type: "Sesli Kitap",
    duration: "14 sa 45 dk",
    rating: "4.8",
    coverBg: "from-emerald-700 to-emerald-950",
    coverTitle: "SAPIENS",
  },
  {
    id: "ince-memed",
    title: "İnce Memed 1",
    author: "Yaşar Kemal",
    type: "Radyo Tiyatrosu",
    duration: "3 sa 12 dk",
    rating: "4.9",
    coverBg: "from-sky-700 to-sky-950",
    coverTitle: "İNCE MEMED",
  },
];

export function ContentsScreen({ onBack, onNext, onSkip }: ContentsScreenProps) {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([
    "gazi-mustafa-kemal",
    "nutuk",
  ]);

  const toggleBook = (id: string) => {
    setSelectedBooks((prev) =>
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
          ADIM 3 / 3
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
            Sana Özel Seçkiler
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
          İlgiyle Başlayacağın Eserler
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Kütüphanene eklemek istediklerini seçerek hemen başlayabilirsin.
        </p>
      </div>

      {/* 4. Book Cards Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3 scrollbar-none">
        <div className="space-y-3 pb-24">
          {FEATURED_BOOKS.map((book) => {
            const isSelected = selectedBooks.includes(book.id);
            return (
              <motion.div
                key={book.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleBook(book.id)}
                className={`p-3.5 rounded-2xl flex items-center gap-3.5 border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 border-[#EF4823] ring-1 ring-[#EF4823]/60 shadow-lg shadow-[#EF4823]/15"
                    : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
                }`}
              >
                {/* Book Mini Cover */}
                <div
                  className={`w-16 h-22 rounded-xl bg-gradient-to-br ${book.coverBg} shrink-0 p-2 flex flex-col justify-between shadow-md relative overflow-hidden`}
                >
                  <div className="w-full flex items-center justify-between text-white/70">
                    <Bookmark className="w-3 h-3" />
                    <Headphones className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-bold uppercase leading-tight line-clamp-2 text-white/90">
                    {book.coverTitle}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium text-[#EF4823] bg-[#EF4823]/10 px-2 py-0.5 rounded">
                      {book.type}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{book.author}</p>
                  <span className="text-[11px] text-zinc-500 font-mono mt-1 block">
                    {book.duration}
                  </span>
                </div>

                {/* Selection Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#EF4823] text-white"
                      : "bg-zinc-800 border border-zinc-700 text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </motion.div>
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
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold transition-all shadow-xl shadow-[#EF4823]/30 cursor-pointer"
        >
          <span>Kişiselleştirmeyi Tamamla</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
