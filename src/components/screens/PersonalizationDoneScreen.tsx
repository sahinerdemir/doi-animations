"use client";

import React from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowRightIcon } from "@/components/splash/SplashScreen";
import { motion } from "framer-motion";

interface PersonalizationDoneScreenProps {
  onJoin?: () => void;
  onExplore?: () => void;
}

export function PersonalizationDoneScreen({
  onJoin,
  onExplore,
}: PersonalizationDoneScreenProps) {
  return (
    <div className="relative w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20 text-white" />

      {/* 2. Mosaic Background from Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/figma-refs/ref-personalization-done.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          className="object-cover opacity-60 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* 3. Center Content (Exact Figma #14203:145575) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 -mt-8">
        <h2 className="text-[30px] sm:text-[32px] font-bold leading-[1.2] text-white tracking-tight mb-3">
          DOİ’ye üye olmaya
          <br />
          hazır mısın?
        </h2>

        <p className="text-sm font-normal text-white/90 max-w-[280px] leading-relaxed">
          Dinle. Oku. İzle. DOİ dünyasından sınırsızca faydalanmak için sana en uygun paketi hemen seç!
        </p>
      </div>

      {/* 4. Action Buttons (Exact Figma Style) */}
      <div className="w-full px-8 pb-10 flex flex-col gap-3 z-10">
        {/* Button 1: Hemen Üye Ol (Solid Orange) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onJoin}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold shadow-xl shadow-[#EF4823]/30 transition-all cursor-pointer"
        >
          <span>Hemen Üye Ol</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>

        {/* Button 2: Üyeliksiz Devam Et (Dark Frosted Glass) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onExplore}
          className="w-full h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-between px-8 text-base font-semibold backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Üyeliksiz Devam Et</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
