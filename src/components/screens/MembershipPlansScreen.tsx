"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
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
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20 text-white" />

      {/* 2. Mosaic Blurred Background (Visible covers with rich depth, zero baked-in text) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/figma-refs/mosaic-background-clean.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          sizes="394px"
          className="object-cover filter blur-[7.5px] scale-110 opacity-75"
        />
        {/* Figma Exact Gradient Overlay: Book covers remain richly visible through soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/30 via-[#111111]/60 via-45% to-[#111111]/85 to-85%" />
      </div>

      {/* 3. Top Navigation */}
      <div className="px-5 pt-1.5 pb-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[14px] font-medium tracking-wide text-white hover:opacity-75 transition-opacity active:scale-95 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>GERİ</span>
        </button>
      </div>

      {/* 4. Center Content: Headline, Subtitle, Plan Cards & Cancel Notice */}
      <div className="flex-1 px-4 flex flex-col justify-center items-center text-center z-10 -mt-2">
        {/* Title */}
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-white tracking-tight">
          Senin için en uygun
          <br />
          üyeliği seç!
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] font-medium leading-[1.3] text-white/80 max-w-[280px] mx-auto mt-3">
          E-Kitaplar, Podcastler, Belgeseller..
          <br />
          DOİ dünyasından sınırsızca faydalanmak için
          <br />
          sana en uygun paketi hemen seç!
        </p>

        {/* Side-by-Side Plan Cards Container */}
        <div className="w-full max-w-[330px] flex items-center justify-center gap-2.5 mt-6">
          {/* Monthly Card */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan("monthly")}
            className={`flex-1 rounded-[18px] text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              selectedPlan === "monthly"
                ? "py-7 px-4.5 bg-black/60 border-[4px] border-[#EF4823] shadow-2xl shadow-[#EF4823]/25 backdrop-blur-md"
                : "py-5 px-4 bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md"
            }`}
          >
            <div>
              <h4 className="text-[18px] sm:text-[20px] font-medium text-white">Aylık</h4>
              <div
                className={`text-[32px] sm:text-[34px] font-medium font-sans flex items-baseline gap-1 mt-2 leading-none ${
                  selectedPlan === "monthly" ? "text-[#EF4823]" : "text-white"
                }`}
              >
                <span>₺69</span>
                <span
                  className={`text-[16px] sm:text-[18px] font-medium ${
                    selectedPlan === "monthly" ? "text-[#EF4823]" : "text-white"
                  }`}
                >
                  /ay
                </span>
              </div>
            </div>
            <p className="text-[12px] sm:text-[13px] leading-[1.25] text-[#A4A4A4] mt-4">
              Aylık olarak tanımladığın kredi kartından çekilir.
            </p>
          </motion.div>

          {/* Annual Card (Selected by default) */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan("annual")}
            className={`flex-1 rounded-[18px] text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              selectedPlan === "annual"
                ? "py-7 px-4.5 bg-black/60 border-[4px] border-[#EF4823] shadow-2xl shadow-[#EF4823]/25 backdrop-blur-md"
                : "py-5 px-4 bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md"
            }`}
          >
            <div>
              <h4 className="text-[18px] sm:text-[20px] font-medium text-white">Yıllık</h4>
              <div
                className={`text-[32px] sm:text-[34px] font-medium font-sans flex items-baseline gap-1 mt-2 leading-none ${
                  selectedPlan === "annual" ? "text-[#EF4823]" : "text-white"
                }`}
              >
                <span>₺690</span>
                <span
                  className={`text-[16px] sm:text-[18px] font-medium ${
                    selectedPlan === "annual" ? "text-[#EF4823]" : "text-white"
                  }`}
                >
                  /ay
                </span>
              </div>
            </div>
            <div className="text-[12px] sm:text-[13px] leading-[1.25] mt-4">
              <strong className="text-white block font-bold">2 Ay Bizden!</strong>
              <span className="text-[#A4A4A4]">Tek ödeme olarak alınır.</span>
            </div>
          </motion.div>
        </div>

        {/* Notice */}
        <p className="text-[12px] font-medium text-white/80 mt-5">
          * Üyeliğini istediğin zaman iptal edebilirsin!
        </p>
      </div>

      {/* 5. Bottom Buttons (Exact Figma Style - 330px max width) */}
      <div className="w-full max-w-[330px] mx-auto px-0 pb-9 flex flex-col gap-2.5 z-10">
        {/* Button 1: 7 günlük denemeyi başlat */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSuccess}
          className="w-full h-[54px] rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-7 text-[16px] font-medium shadow-xl shadow-[#EF4823]/30 transition-all cursor-pointer"
        >
          <span>7 günlük denemeyi başlat</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>

        {/* Button 2: Üye olmadan devam et */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSkip}
          className="w-full h-[54px] rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-between px-7 text-[16px] font-medium backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Üye olmadan devam et</span>
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
