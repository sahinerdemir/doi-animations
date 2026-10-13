"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StatusBar } from "./StatusBar";
import { AnimatedDoiLogo } from "./AnimatedDoiLogo";

interface SplashScreenProps {
  onStart?: () => void;
  onLogin?: () => void;
  className?: string;
  showStatusBar?: boolean;
}

export function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13.4766 9.16667L9.00658 4.69667L10.1849 3.51834L16.6666 10L10.1849 16.4817L9.00658 15.3033L13.4766 10.8333H3.33325V9.16667H13.4766Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SplashScreen({
  onStart,
  onLogin,
  className = "",
  showStatusBar = true,
}: SplashScreenProps) {
  const [replayKey, setReplayKey] = useState<number>(0);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      className={`relative w-full h-full bg-[#EF4823] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans ${className}`}
    >
      {/* 1. Status Bar */}
      {showStatusBar && <StatusBar className="pt-2 z-20" />}

      {/* Discrete Replay Button in top-right (positioned below 30px status bar) */}
      <button
        type="button"
        onClick={handleReplay}
        title="Animasyonu Yeniden Oynat"
        aria-label="Animasyonu Yeniden Oynat"
        className="absolute top-[38px] right-4 z-20 w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 active:scale-90 text-white/90 flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      {/* 2. Hero Vector Artwork with Physics Drop & Wobble Animation (DOİ - Dinle, Oku, İzle) */}
      <div className="relative flex-1 flex items-center justify-center -mt-2 px-2 z-10">
        <div
          onClick={handleReplay}
          title="Animasyonu yeniden başlatmak için tıkla"
          className="relative w-full max-w-[380px] aspect-[424/461] cursor-pointer transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
        >
          <AnimatedDoiLogo replayKey={replayKey} />
        </div>
      </div>

      {/* 3. Bottom Content Section: Headline + Buttons with Staggered Entrance */}
      <div className="w-full flex flex-col items-center px-8 pb-10 pt-2 z-10 gap-7">
        {/* Headline: Staggered entrance (delay 0.95s) */}
        <motion.h1
          key={`headline-${replayKey}`}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.95,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-[30px] leading-[1.2] font-normal text-center text-[#111111] tracking-[-0.01em]"
        >
          Yeni Nesil Kütüphaneye
          <br />
          Hoş Geldin!
        </motion.h1>

        {/* Action Buttons: Staggered entrances */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Primary Button: Hadi Başlayalım (delay 1.15s) */}
          <motion.button
            key={`btn-start-${replayKey}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            type="button"
            onClick={onStart}
            className="w-full h-14 px-8 rounded-full bg-white text-[#EF4823] flex items-center justify-between text-base font-semibold shadow-sm transition-all duration-200 hover:bg-white/95 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#EF4823]"
          >
            <span className="font-semibold tracking-[-0.01em]">Hadi Başlayalım</span>
            <ArrowRightIcon className="w-5 h-5 text-[#EF4823]" />
          </motion.button>

          {/* Secondary Button: Giriş Yap (delay 1.30s) */}
          <motion.button
            key={`btn-login-${replayKey}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            type="button"
            onClick={onLogin}
            className="w-full h-14 px-8 rounded-full bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white flex items-center justify-between text-base font-semibold backdrop-blur-[2px] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EF4823]"
          >
            <span className="font-semibold tracking-[-0.01em]">Giriş Yap</span>
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
