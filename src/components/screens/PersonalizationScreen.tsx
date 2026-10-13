"use client";

import React, { useState, useEffect } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface PersonalizationScreenProps {
  onComplete?: () => void;
}

const STEPS_STATUS = [
  "İlgi alanların ve kategorilerin taranıyor...",
  "Sesli kitap ve radyo tiyatrosu arşivleri eşleştiriliyor...",
  "Sana özel okuma ve dinleme listeleri oluşturuluyor...",
  "Kütüphanen hazırlandı!",
];

export function PersonalizationScreen({ onComplete }: PersonalizationScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 600);
          return 100;
        }
        const next = prev + 1;
        if (next === 30) setStatusIndex(1);
        if (next === 65) setStatusIndex(2);
        if (next === 95) setStatusIndex(3);
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  // SVG Circular progress params
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between items-center overflow-hidden select-none font-sans p-6">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 w-full" />

      {/* 2. Center Animated Wheel */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        <div className="relative w-52 h-52 flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#EF4823]/10 blur-xl animate-pulse" />

          {/* SVG Progress Circle */}
          <svg className="w-52 h-52 -rotate-90">
            {/* Background track */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-zinc-800"
            />
            {/* Progress line */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="#EF4823"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75"
            />
          </svg>

          {/* Percentage Value in Center */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
              %{progress}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#EF4823] font-semibold mt-1">
              Analiz
            </span>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-8 text-center px-4 max-w-xs space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#EF4823]/15 text-[#EF4823] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Kişiselleştiriliyor</span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">
            DOİ senin için hazırlanıyor...
          </h3>

          <p className="text-xs text-zinc-400 min-h-[32px] transition-all">
            {STEPS_STATUS[statusIndex]}
          </p>
        </div>
      </div>

      {/* 3. Bottom Skip / Manual Continue */}
      <div className="w-full pb-4 text-center">
        {progress === 100 ? (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onComplete}
            className="w-full h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Hazır! Devam Et</span>
          </motion.button>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Beklemeden devam et →
          </button>
        )}
      </div>
    </div>
  );
}
