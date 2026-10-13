"use client";

import React from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
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
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2" />

      {/* 2. Center Success Visual & Badges */}
      <div className="flex-1 px-6 flex flex-col items-center justify-center text-center -mt-6">
        {/* Glow & Badge */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#EF4823]/25 rounded-full blur-2xl" />
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#EF4823] to-amber-500 flex items-center justify-center text-white shadow-xl shadow-[#EF4823]/30 relative">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold bg-[#EF4823]/15 text-[#EF4823] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#EF4823]/20">
            <Sparkles className="w-3 h-3" />
            <span>Kütüphanen Hazır</span>
          </span>
          <span className="text-[11px] font-semibold bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full flex items-center gap-1.5 border border-zinc-700">
            <BookOpen className="w-3 h-3" />
            <span>Kişiselleştirildi</span>
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
          DOİ’ye üye olmaya
          <br />
          hazır mısın?
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xs leading-relaxed">
          Dinle. Oku. İzle. DOİ dünyasından sınırsızca faydalanmak için sana en uygun paketi hemen seç!
        </p>
      </div>

      {/* 3. Action Buttons */}
      <div className="p-6 pb-10 flex flex-col gap-3 z-10">
        {/* Primary: Hemen Üye Ol */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onJoin}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold shadow-xl shadow-[#EF4823]/30 transition-all cursor-pointer"
        >
          <span>Hemen Üye Ol</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Secondary: Üyeliksiz Devam Et */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onExplore}
          className="w-full h-14 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center text-sm font-medium transition-all cursor-pointer"
        >
          <span>Üyeliksiz Devam Et</span>
        </motion.button>
      </div>
    </div>
  );
}
