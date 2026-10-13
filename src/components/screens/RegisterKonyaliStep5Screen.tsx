"use client";

import React from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ChevronDown, PartyPopper, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterKonyaliStep5ScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function RegisterKonyaliStep5Screen({
  onBack,
  onSuccess,
}: RegisterKonyaliStep5ScreenProps) {
  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 2. Top Nav */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between z-20 relative">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <h3 className="text-lg font-bold text-[#111111] absolute left-1/2 -translate-x-1/2">
          Üye Ol
        </h3>

        <div className="w-8" />
      </div>

      {/* 3. Form Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 pb-24 scrollbar-none space-y-3.5">
        {/* Card 1: Yaşadığın Şehir */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <span className="text-sm font-normal text-[#111111]">Yaşadığın Şehir *</span>
          <div className="relative flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[#111111] pr-5">Konya</span>
            <ChevronDown className="w-4 h-4 text-[#111111] absolute right-0" />
          </div>
        </div>

        {/* Card 2: Hoş Geldin Mustafa Dağlar (Exact Figma #14203:146137) */}
        <div className="w-full bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-zinc-200/80 space-y-2.5">
          <div className="flex items-start gap-3">
            <PartyPopper className="w-7 h-7 text-[#EF4823] shrink-0 mt-0.5" />
            <h4 className="text-base font-bold text-[#111111] leading-tight">
              Hoş Geldin Mustafa Dağlar,
            </h4>
          </div>

          <p className="text-xs text-zinc-700 leading-relaxed">
            Konya Millet Kütüphanesi üyeliğin doğrulandı, DOİ uygulamasından 1 yıl süre ile ücretsiz yararlanmak için aşağıdaki formda eksik alanları doldurarak devam edebilirsin.
          </p>
        </div>

        {/* Card 3: Pre-filled Profile Data */}
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] divide-y divide-zinc-100 overflow-hidden text-sm">
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Ad *</span>
            <span className="font-semibold text-[#111111]">Mustafa</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Soyad *</span>
            <span className="font-semibold text-[#111111]">Dağlar</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">E-Posta Adresi *</span>
            <span className="font-medium text-[#111111] truncate max-w-[190px]">
              mustafa.daglar@gmail.co...
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Cep Telefonu *</span>
            <span className="font-mono font-medium text-[#111111]">
              (538) 611 99 11
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Doğum Tarihi *</span>
            <span className="font-mono font-medium text-[#111111]">
              12/05/1992
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Cinsiyet</span>
            <div className="relative flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#111111] pr-5">Erkek</span>
              <ChevronDown className="w-4 h-4 text-[#111111] absolute right-0" />
            </div>
          </div>
        </div>

        {/* Card 4: Passwords */}
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] divide-y divide-zinc-100 overflow-hidden text-sm">
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Şifre *</span>
            <EyeOff className="w-4 h-4 text-zinc-400" />
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Şifre Tekrar *</span>
            <EyeOff className="w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSuccess}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold shadow-xl shadow-[#EF4823]/25 cursor-pointer mt-2"
        >
          <span>1 Yıllık Ücretsiz Aboneliği Başlat</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
