"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  BookOpen,
  Headphones,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

interface ContentsScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

interface ContentItem {
  id: string;
  title: string;
  author: string;
  type: "book" | "audio" | "video";
  coverBg: string;
  coverTitle: string;
  coverAuthor: string;
}

// 16 örnek içerik (E-Kitap, Sesli Kitap, Video)
const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "kurk-mantolu-madonna",
    title: "Kürk Mantolu\nMadonna",
    author: "Sabahattin Ali",
    type: "book",
    coverBg: "from-[#5B1F54] to-[#7B2E74]",
    coverTitle: "Kürk Mantolu Madonna",
    coverAuthor: "Sabahattin Ali",
  },
  {
    id: "kordugum",
    title: "Kördüğüm",
    author: "Ayşe Kulin",
    type: "audio",
    coverBg: "from-[#2A2E35] to-[#3E4550]",
    coverTitle: "Kördüğüm",
    coverAuthor: "AYŞE KULİN",
  },
  {
    id: "gazi-mustafa-kemal",
    title: "Gazi Mustafa\nKemal’in Hayatı",
    author: "İlber Ortaylı",
    type: "book",
    coverBg: "from-[#7C5A38] to-[#99734D]",
    coverTitle: "Gazi Mustafa Kemal",
    coverAuthor: "İlber Ortaylı",
  },
  {
    id: "beyond-the-ocean-door",
    title: "Beyond the Ocean\nDoor",
    author: "Amisha Sathi",
    type: "video",
    coverBg: "from-[#144238] to-[#256858]",
    coverTitle: "BEYOND THE OCEAN DOOR",
    coverAuthor: "Amisha Sathi",
  },
  {
    id: "tutunamayanlar",
    title: "Tutunamayanlar",
    author: "Oğuz Atay",
    type: "book",
    coverBg: "from-[#2F3E46] to-[#354F52]",
    coverTitle: "Tutunamayanlar",
    coverAuthor: "Oğuz Atay",
  },
  {
    id: "simyaci",
    title: "Simyacı",
    author: "Paulo Coelho",
    type: "audio",
    coverBg: "from-[#B85A1D] to-[#D47935]",
    coverTitle: "Simyacı",
    coverAuthor: "Paulo Coelho",
  },
  {
    id: "insan-neyle-yasar",
    title: "İnsan Neyle\nYaşar?",
    author: "Lev Tolstoy",
    type: "book",
    coverBg: "from-[#3D405B] to-[#4F5375]",
    coverTitle: "İnsan Neyle Yaşar?",
    coverAuthor: "Lev Tolstoy",
  },
  {
    id: "seker-portakali",
    title: "Şeker Portakalı",
    author: "José Mauro de Vasconcelos",
    type: "audio",
    coverBg: "from-[#C4551E] to-[#E06D2D]",
    coverTitle: "Şeker Portakalı",
    coverAuthor: "J. M. Vasconcelos",
  },
  {
    id: "nutuk",
    title: "Nutuk",
    author: "Mustafa Kemal Atatürk",
    type: "book",
    coverBg: "from-[#781D2A] to-[#962637]",
    coverTitle: "NUTUK",
    coverAuthor: "M. Kemal Atatürk",
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    type: "audio",
    coverBg: "from-[#1A1F2C] to-[#2B3242]",
    coverTitle: "1984",
    coverAuthor: "George Orwell",
  },
  {
    id: "beyaz-zambaklar",
    title: "Beyaz Zambaklar\nÜlkesinde",
    author: "Grigory Petrov",
    type: "book",
    coverBg: "from-[#1D4E89] to-[#2864AC]",
    coverTitle: "Beyaz Zambaklar",
    coverAuthor: "Grigory Petrov",
  },
  {
    id: "donusum",
    title: "Dönüşüm",
    author: "Franz Kafka",
    type: "audio",
    coverBg: "from-[#3D2C4D] to-[#543E69]",
    coverTitle: "Dönüşüm",
    coverAuthor: "Franz Kafka",
  },
  {
    id: "kucuk-prens",
    title: "Küçük Prens",
    author: "Antoine de Saint-Exupéry",
    type: "video",
    coverBg: "from-[#1E3F66] to-[#2E5984]",
    coverTitle: "Küçük Prens",
    coverAuthor: "Saint-Exupéry",
  },
  {
    id: "varolmanin-hafifligi",
    title: "Varolmanın Dayanılmaz\nHafifliği",
    author: "Milan Kundera",
    type: "book",
    coverBg: "from-[#523A54] to-[#6A4D6D]",
    coverTitle: "Varolmanın Hafifliği",
    coverAuthor: "Milan Kundera",
  },
  {
    id: "suc-ve-ceza",
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    type: "audio",
    coverBg: "from-[#4A154B] to-[#631D64]",
    coverTitle: "Suç ve Ceza",
    coverAuthor: "F. Dostoyevski",
  },
  {
    id: "bir-omur-nasil-yasanir",
    title: "Bir Ömür Nasıl\nYaşanır?",
    author: "İlber Ortaylı",
    type: "video",
    coverBg: "from-[#634812] to-[#7E5E19]",
    coverTitle: "Bir Ömür Nasıl Yaşanır",
    coverAuthor: "İlber Ortaylı",
  },
];

export function ContentsScreen({ onBack, onNext, onSkip }: ContentsScreenProps) {
  // Görseldeki seçili olanlar: Kürk Mantolu Madonna ve Gazi Mustafa Kemal'in Hayatı
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "kurk-mantolu-madonna",
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
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20" />

      {/* 2. Top Navigation */}
      <div className="px-6 pt-3 pb-1 flex items-center justify-between z-20 shrink-0">
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

      {/* 3. Headline Area (Üstüne 30px boşluk eklendi) */}
      <div className="px-6 pt-[30px] pb-3 text-center z-20 shrink-0">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          Hoşuna giden
          <br />
          içerikleri seç!
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-1.5">
          En az üç adet içerik seç.
        </p>
      </div>

      {/* 4. Book Cards List (16 Örnek, Kare Thumbnail, Sağ Kenar Tick, 4px Boşluk) */}
      <div
        className="flex-1 overflow-y-auto pl-5 pr-6 py-2 pb-28 scrollbar-none space-y-[4px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 64px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 64px), transparent 100%)",
        }}
      >
        {CONTENT_ITEMS.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => toggleItem(item.id)}
              className={`relative w-full p-3 sm:p-3.5 rounded-[22px] bg-white flex items-center gap-3.5 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-[2px] border-[#EF4823] shadow-md shadow-[#EF4823]/10"
                  : "border-[2px] border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md"
              }`}
            >
              {/* Kare Thumbnail (Kapak) */}
              <div className="relative shrink-0">
                <div
                  className={`w-[76px] h-[76px] rounded-[18px] bg-gradient-to-br ${item.coverBg} flex flex-col justify-between p-2.5 shadow-sm text-white overflow-hidden aspect-square`}
                >
                  <span className="text-[8px] font-bold opacity-75 uppercase tracking-wider leading-none">
                    {item.coverAuthor}
                  </span>
                  <span className="text-[10px] font-bold leading-tight line-clamp-2">
                    {item.coverTitle}
                  </span>
                  <span className="text-[7px] font-extrabold tracking-widest opacity-60">
                    DOİ
                  </span>
                </div>

                {/* Kapağın sağ dikey kenarında yer alan beyaz yuvarlak kategori ikonu */}
                <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-white shadow-md flex items-center justify-center border border-zinc-100 z-10">
                  {item.type === "book" && (
                    <BookOpen className="w-3 h-3 text-[#EF4823] stroke-[2]" />
                  )}
                  {item.type === "audio" && (
                    <Headphones className="w-3 h-3 text-[#EF4823] stroke-[2]" />
                  )}
                  {item.type === "video" && (
                    <Play className="w-2.5 h-2.5 text-[#EF4823] fill-[#EF4823] ml-0.5" />
                  )}
                </div>
              </div>

              {/* Başlık & Yazar */}
              <div className="flex-1 text-left min-w-0 pl-1.5 pr-2">
                <h4 className="text-base sm:text-[17px] font-bold text-[#111111] leading-snug whitespace-pre-line tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#777777] mt-1 font-normal">
                  {item.author}
                </p>
              </div>

              {/* Tick Durumu: Görseldeki gibi kartın sağ sınır kenarında, yarı dışarıda duran turuncu onay tiki */}
              {isSelected && (
                <div className="absolute -right-[12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EF4823] flex items-center justify-center text-white shadow-sm z-10 pointer-events-none">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 5. Floating Bottom Navigation Bar (Step 3 active) */}
      <div className="absolute bottom-6 inset-x-6 z-30 pointer-events-auto">
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
