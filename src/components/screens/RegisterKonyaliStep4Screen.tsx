"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ChevronDown, CheckSquare, Square } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterKonyaliStep4ScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onKmkLogin?: () => void;
}

export function RegisterKonyaliStep4Screen({
  onBack,
  onNext,
  onKmkLogin,
}: RegisterKonyaliStep4ScreenProps) {
  const [tcNo, setTcNo] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mernisConsent, setMernisConsent] = useState(true);
  const [yokConsent, setYokConsent] = useState(true);

  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 2. Top Nav */}
      <div className="px-6 py-2 flex items-center justify-between z-20 relative">
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
      <div className="flex-1 overflow-y-auto px-5 py-2 pb-16 scrollbar-none space-y-3.5">
        {/* Card 1: Yaşadığın Şehir (Konya) */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <span className="text-sm font-normal text-[#111111]">Yaşadığın Şehir *</span>
          <div className="relative flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[#111111] pr-5">Konya</span>
            <ChevronDown className="w-4 h-4 text-[#111111] absolute right-0" />
          </div>
        </div>

        {/* Card 2: Konya Millet Kütüphanesi Özel Kartı (Exact Figma #14203:145955) */}
        <div className="w-full bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-zinc-200/80 space-y-4">
          {/* KMK Logo & Header */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8A3B2B] text-white flex items-center justify-center font-bold text-lg font-serif shrink-0">
              IK
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111111] leading-tight">
                Konya Millet Kütüphanesi üyelerine
                <br />
                DOİ ilk yıl ücretsiz!
              </h4>
            </div>
          </div>

          <p className="text-xs text-zinc-700 leading-relaxed">
            Şehir olarak Konya seçtiğin için Konya Millet Kütüphanesi üyeliğini doğrulayarak veya yeni üyelik oluşturarak DOİ’yi ücretsiz kullanabilirsin.
          </p>

          {/* Form Inputs (Rounded Outline Style from Figma) */}
          <div className="space-y-2.5">
            <div className="w-full h-13 rounded-2xl border-2 border-zinc-300 px-4 flex items-center justify-between bg-white focus-within:border-[#EF4823]">
              <span className="text-xs font-medium text-zinc-600">T.C. Kimlik No *</span>
              <input
                type="text"
                maxLength={11}
                value={tcNo}
                onChange={(e) => setTcNo(e.target.value)}
                placeholder="------------------"
                className="text-right text-xs font-mono font-medium text-[#111111] focus:outline-none w-36"
              />
            </div>

            <div className="w-full h-13 rounded-2xl border-2 border-zinc-300 px-4 flex items-center justify-between bg-white focus-within:border-[#EF4823]">
              <span className="text-xs font-medium text-zinc-600">Doğum Tarihi *</span>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="GG/AA/YYYY"
                className="text-right text-xs font-mono font-medium text-[#111111] focus:outline-none w-36"
              />
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-2 pt-1 text-[11px] text-zinc-700">
            <label
              onClick={() => setMernisConsent(!mernisConsent)}
              className="flex items-start gap-2 cursor-pointer leading-tight"
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  mernisConsent ? "bg-[#EF4823] text-white" : "border border-zinc-400"
                }`}
              >
                ✓
              </div>
              <span>
                MERNİS, T.C. kimlik numaram, ad-soyad ve e-posta adresim kullanılarak kütüphane üyeliğimin...
              </span>
            </label>

            <label
              onClick={() => setYokConsent(!yokConsent)}
              className="flex items-start gap-2 cursor-pointer leading-tight"
            >
              <div
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                  yokConsent ? "bg-[#EF4823] text-white" : "border border-zinc-400"
                }`}
              >
                ✓
              </div>
              <span>
                YÖK, T.C. kimlik numaram, ad-soyad ve e-posta adresim kullanılarak kütüphane üyeliğimin...
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onNext}
              className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white text-sm font-semibold flex items-center justify-center shadow-md shadow-[#EF4823]/25 cursor-pointer"
            >
              KMK’ya Üye Ol
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onKmkLogin || onNext}
              className="w-full h-13 rounded-2xl bg-white border-2 border-[#EF4823] text-[#EF4823] hover:bg-[#EF4823]/5 text-sm font-semibold flex items-center justify-center cursor-pointer"
            >
              KMK üyesiyseniz giriş yapın.
            </motion.button>
          </div>

          {/* Terms info */}
          <div className="text-[10px] text-zinc-500 space-y-1 pt-1 leading-snug">
            <p>* Kütüphane üyeliğin T.C. Kimlik No ve Doğum Tarihi ile <u>sorgulanır/oluşturulur</u>.</p>
            <p>* DOİ’ye devam etmek için KMK üyeliği zorunlu <u>değildir</u>.</p>
            <p>* Ücretsiz abonelikten yararlanabilmek için ikametinin Konya’da olması <u>zorunludur</u>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
