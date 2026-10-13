"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { ArrowRightIcon } from "@/components/splash/SplashScreen";
import { motion } from "framer-motion";

interface MembershipPlansScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
  onSkip?: () => void;
}

export function MembershipPlansScreen({
  onBack,
  onSuccess,
  onSkip,
}: MembershipPlansScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">("annual");

  return (
    <div className="relative w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20 text-white" />

      {/* 2. Mosaic Blurry Background from Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/figma-refs/ref-membership-plans.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          className="object-cover opacity-60 filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
      </div>

      {/* 3. Top Navigation */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>GERİ</span>
        </button>
      </div>

      {/* 4. Center Content: Headline & Side-by-Side Plan Cards */}
      <div className="flex-1 px-6 pt-1 flex flex-col justify-center text-center z-10 -mt-4">
        {/* Title & Subtitle */}
        <h1 className="text-[28px] sm:text-[30px] font-bold leading-[1.2] text-white tracking-tight mb-2">
          Senin için en uygun
          <br />
          üyeliği seç!
        </h1>

        <p className="text-xs text-white/80 leading-relaxed max-w-[290px] mx-auto mb-6">
          E-Kitaplar, Podcastler, Belgeseller..
          <br />
          DOİ dünyasından sınırsızca faydalanmak için
          <br />
          sana en uygun paketi hemen seç!
        </p>

        {/* Side-by-Side 2 Cards (Exact Figma Layout) */}
        <div className="grid grid-cols-2 gap-3 max-w-[340px] mx-auto w-full">
          {/* Monthly Card */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedPlan("monthly")}
            className={`rounded-[26px] p-4 text-left flex flex-col justify-between min-h-[175px] transition-all duration-200 cursor-pointer ${
              selectedPlan === "monthly"
                ? "bg-black/90 border-[3px] border-[#EF4823] shadow-xl"
                : "bg-black/60 border border-white/10 hover:border-white/20"
            }`}
          >
            <div>
              <h4 className="text-base font-medium text-white mb-1.5">Aylık</h4>
              <div className="text-2xl font-bold text-white font-sans flex items-baseline">
                ₺69 <span className="text-xs font-normal text-white/70 ml-1">/ay</span>
              </div>
            </div>
            <p className="text-[11px] leading-snug text-white/70">
              Aylık olarak tanımladığın kredi kartından çekilir.
            </p>
          </motion.div>

          {/* Annual Card (Selected by default) */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedPlan("annual")}
            className={`rounded-[26px] p-4 text-left flex flex-col justify-between min-h-[175px] transition-all duration-200 cursor-pointer ${
              selectedPlan === "annual"
                ? "bg-black/90 border-[3px] border-[#EF4823] shadow-xl shadow-[#EF4823]/25"
                : "bg-black/60 border border-white/10 hover:border-white/20"
            }`}
          >
            <div>
              <h4 className="text-base font-medium text-white mb-1.5">Yıllık</h4>
              <div className="text-2xl font-bold text-[#EF4823] font-sans flex items-baseline">
                ₺690 <span className="text-xs font-normal text-white/70 ml-1">/ay</span>
              </div>
            </div>
            <div className="text-[11px] leading-snug text-white/90">
              <strong className="text-white block font-bold">2 Ay Bizden!</strong>
              <span className="text-white/70">Tek ödeme olarak alınır.</span>
            </div>
          </motion.div>
        </div>

        {/* Notice */}
        <p className="text-[11px] text-white/70 mt-5">
          * Üyeliğini istediğin zaman iptal edebilirsin!
        </p>
      </div>

      {/* 5. Bottom Buttons (Exact Figma Style) */}
      <div className="w-full px-8 pb-10 flex flex-col gap-3 z-10">
        {/* Button 1: 7 günlük denemeyi başlat */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSuccess}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold shadow-xl shadow-[#EF4823]/30 transition-all cursor-pointer"
        >
          <span>7 günlük denemeyi başlat</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>

        {/* Button 2: Üye olmadan devam et */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSkip}
          className="w-full h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-between px-8 text-base font-semibold backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Üye olmadan devam et</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
