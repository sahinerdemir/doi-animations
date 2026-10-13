"use client";

import React from "react";
import Image from "next/image";
import { StatusBar } from "./StatusBar";

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
  return (
    <div
      className={`relative w-full h-full bg-[#EF4823] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans ${className}`}
    >
      {/* 1. Status Bar */}
      {showStatusBar && <StatusBar time="9:41" className="pt-2" />}

      {/* 2. Hero Vector Artwork (DOİ - Dinle, Oku, İzle) */}
      <div className="relative flex-1 flex items-center justify-center -mt-2 px-2">
        <div className="relative w-full max-w-[380px] aspect-[424/461] transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/images/splash-illustration.svg"
            alt="DOİ - Dinle, Oku, İzle"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* 3. Bottom Content Section: Headline + Buttons */}
      <div className="w-full flex flex-col items-center px-8 pb-10 pt-2 z-10 gap-7">
        {/* Headline */}
        <h1 className="text-[30px] leading-[1.2] font-normal text-center text-[#111111] tracking-[-0.01em]">
          Yeni Nesil Kütüphaneye
          <br />
          Hoş Geldin!
        </h1>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Primary Button: Hadi Başlayalım */}
          <button
            type="button"
            onClick={onStart}
            className="w-full h-14 px-8 rounded-full bg-white text-[#EF4823] flex items-center justify-between text-base font-medium shadow-sm transition-all duration-200 hover:bg-white/95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#EF4823]"
          >
            <span>Hadi Başlayalım</span>
            <ArrowRightIcon className="w-5 h-5 text-[#EF4823]" />
          </button>

          {/* Secondary Button: Giriş Yap (Glassmorphism light) */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full h-14 px-8 rounded-full bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white flex items-center justify-between text-base font-medium backdrop-blur-[2px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EF4823]"
          >
            <span>Giriş Yap</span>
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
