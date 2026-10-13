"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { Loader2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface PersonalizationScreenProps {
  onComplete?: () => void;
}

export function PersonalizationScreen({ onComplete }: PersonalizationScreenProps) {
  const [progress, setProgress] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [onComplete, replayKey]);

  const handleRestart = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="relative w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20 text-white" />

      {/* Discrete Replay Button in top-right */}
      <button
        type="button"
        onClick={handleRestart}
        title="Animasyonu Yeniden Başlat"
        className="absolute top-[38px] right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-all active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* 2. Görseldeki gibi net, belirgin ve canlı mozaik kapak arka planı */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/figma-refs/mosaic-background-clean.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          sizes="394px"
          className="object-cover opacity-95"
        />
        {/* Metin ve ilerleme kutusunun okunabilirliği için alt kısma yumuşak karartma degradesi */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 via-50% to-black/85 to-90%" />
      </div>

      {/* 3. Alt Kısım: Başlık + Soldan Sağa Dolan Turuncu Kutu */}
      <div className="w-full flex flex-col items-center px-6 pb-12 z-10 gap-5 mt-auto">
        {/* Başlık (Görseldeki gibi ilerleme kutusunun hemen üzerinde) */}
        <h2 className="text-[25px] sm:text-[27px] font-normal leading-[1.25] text-white text-center tracking-tight drop-shadow-md">
          DOİ senin için
          <br />
          kişiselleştiriliyor...
        </h2>

        {/* İlerleme Kutusu: Soldan Sağa Dolarak Turuncu Olan Yapı */}
        <div
          onClick={handleRestart}
          title="Yeniden başlatmak için tıkla"
          className="w-full max-w-[310px] h-[58px] sm:h-[62px] rounded-full bg-black/65 backdrop-blur-2xl border border-white/20 shadow-2xl relative overflow-hidden flex items-center justify-center cursor-pointer active:scale-[0.99] transition-transform"
        >
          {/* Soldan sağa dolan turuncu ilerleme dolgusu */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#EF4823] to-[#FF5C35] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />

          {/* İlerleme Yüzdesi & Dönen Çark (Dolgunun üzerinde daima ortalanmış ve net görünür) */}
          <div className="relative z-10 flex items-center justify-center gap-3 text-white">
            <span className="text-[19px] sm:text-[20px] font-bold font-mono tracking-wider select-none drop-shadow-sm">
              %{progress}
            </span>
            <Loader2 className="w-5 h-5 text-white animate-spin stroke-[2.5] drop-shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
