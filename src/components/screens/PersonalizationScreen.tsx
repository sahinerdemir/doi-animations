"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { Loader2 } from "lucide-react";

interface PersonalizationScreenProps {
  onComplete?: () => void;
}

export function PersonalizationScreen({ onComplete }: PersonalizationScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20 text-white" />

      {/* 2. Mosaic Background from Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/figma-refs/ref-personalization.png"
          alt="DOİ Kütüphane Arşivi"
          fill
          priority
          className="object-cover opacity-60 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      {/* 3. Center Title (Exact Figma #14203:144887) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 -mt-10">
        <h2 className="text-[30px] sm:text-[32px] font-normal leading-[1.25] text-white tracking-tight">
          DOİ senin için
          <br />
          kişiselleştiriliyor...
        </h2>
      </div>

      {/* 4. Bottom Frosted Glass Pill with Animated Percentage (Exact Figma) */}
      <div className="w-full px-6 pb-12 z-10 flex justify-center">
        <div className="h-16 px-10 rounded-full bg-black/75 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center gap-3.5">
          <span className="text-xl font-bold font-mono text-white tracking-wider">
            %{progress}
          </span>
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        </div>
      </div>
    </div>
  );
}
