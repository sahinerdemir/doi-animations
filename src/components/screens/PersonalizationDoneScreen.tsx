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
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20 text-white" />

      {/* 2. Clean High-Res Mosaic Background from Figma (Zero baked-in ghost text) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/figma-refs/mosaic-background-clean.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          sizes="394px"
          className="object-cover"
        />
        {/* Figma Exact Gradient Overlay (#14203:145595):
            Top 0-40%: light tint so covers are crisp and clearly visible
            Middle 50-70%: smooth natural fade
            Bottom 75-100%: deep dark for contrast and clean text reading */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/35 via-[#111111]/65 via-50% to-[#111111]/95 to-72%" />
      </div>

      {/* 3. Bottom Content Section (Exact Figma #14203:145575) */}
      <div className="mt-auto w-full flex flex-col items-center text-center px-6 pb-10 z-10">
        <h2 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-white tracking-tight">
          DOİ’ye üye olmaya
          <br />
          hazır mısın?
        </h2>

        <p className="text-[14px] sm:text-[15px] font-normal text-white/80 max-w-[280px] leading-snug mt-3">
          Dinle. Oku. İzle. DOİ dünyasından sınırsızca faydalanmak için sana en uygun paketi hemen seç!
        </p>

        {/* 4. Action Buttons (Exact Figma 292px pill buttons with arrow icon) */}
        <div className="w-full max-w-[292px] flex flex-col gap-3 mt-7">
          {/* Button 1: Hemen Üye Ol (Solid Orange #EF4823) */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onJoin}
            className="w-full h-[52px] rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-7 text-base font-medium shadow-xl shadow-[#EF4823]/30 transition-all cursor-pointer"
          >
            <span>Hemen Üye Ol</span>
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </motion.button>

          {/* Button 2: Üyeliksiz Devam Et (Dark Frosted Glass with border) */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onExplore}
            className="w-full h-[52px] rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white flex items-center justify-between px-7 text-base font-medium transition-all cursor-pointer"
          >
            <span>Üyeliksiz Devam Et</span>
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
