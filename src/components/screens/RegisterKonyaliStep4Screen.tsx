"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterKonyaliStep4ScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

export function RegisterKonyaliStep4Screen({
  onBack,
  onNext,
  onSkip,
}: RegisterKonyaliStep4ScreenProps) {
  const [tcNo, setTcNo] = useState("12345678901");
  const [birthDate, setBirthDate] = useState("12/05/1992");
  const [mernisCheck, setMernisCheck] = useState(true);
  const [yokCheck, setYokCheck] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onNext?.();
    }, 1000);
  };

  return (
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2" />

      {/* 2. Top Nav */}
      <div className="px-6 py-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-white transition-all active:scale-95"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          1 Yıl Ücretsiz Fırsat
        </span>

        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold uppercase text-zinc-400 hover:text-white px-2 py-1"
        >
          GEÇ
        </button>
      </div>

      {/* 3. Header Title */}
      <div className="px-6 pt-2 pb-1">
        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
          Konya Millet Kütüphanesi üyelerine
          <br />
          <span className="text-[#EF4823]">DOİ ilk yıl ücretsiz!</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Şehir olarak Konya seçtiğin için KMK üyeliğini doğrulayarak DOİ’yi 1 yıl ücretsiz kullanabilirsin.
        </p>
      </div>

      {/* 4. Form Content */}
      <form onSubmit={handleVerify} className="flex-1 overflow-y-auto px-6 py-2 space-y-3.5 scrollbar-none pb-24">
        {/* TC Kimlik No */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            T.C. Kimlik No *
          </label>
          <input
            type="text"
            maxLength={11}
            value={tcNo}
            onChange={(e) => setTcNo(e.target.value)}
            placeholder="11 haneli kimlik numarası"
            required
            className="w-full h-12 px-3.5 text-xs sm:text-sm rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#EF4823] transition-all font-mono tracking-wider"
          />
        </div>

        {/* Doğum Tarihi */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            Doğum Tarihi *
          </label>
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="GG/AA/YYYY"
            required
            className="w-full h-12 px-3.5 text-xs sm:text-sm rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#EF4823] transition-all font-mono"
          />
        </div>

        {/* MERNIS / KVKK Checkboxes */}
        <div className="space-y-2 pt-1 text-xs">
          <label
            onClick={() => setMernisCheck(!mernisCheck)}
            className="flex items-start gap-2.5 cursor-pointer text-zinc-400"
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                mernisCheck ? "bg-[#EF4823] text-white" : "bg-zinc-800 border border-zinc-700"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] leading-tight">
              MERNİS verileri kullanılarak kütüphane üyeliğimin sorgulanmasını onaylıyorum.
            </span>
          </label>

          <label
            onClick={() => setYokCheck(!yokCheck)}
            className="flex items-start gap-2.5 cursor-pointer text-zinc-400"
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                yokCheck ? "bg-[#EF4823] text-white" : "bg-zinc-800 border border-zinc-700"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] leading-tight">
              YÖK / Öğrenci verileri üzerinden doğrulama yapılmasını onaylıyorum.
            </span>
          </label>
        </div>

        {/* Information box */}
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Info className="w-3.5 h-3.5" />
            <span>Önemli Bilgiler</span>
          </div>
          <p className="leading-snug">
            &bull; Kütüphane üyeliğin T.C. Kimlik No ve Doğum Tarihi ile otomatik oluşturulur/sorgulanır.
          </p>
          <p className="leading-snug">
            &bull; Ücretsiz abonelikten yararlanabilmek için ikametinin Konya&apos;da olması zorunludur.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isVerifying}
            className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-xl shadow-[#EF4823]/30 cursor-pointer"
          >
            <span>{isVerifying ? "Doğrulanıyor..." : "KMK Üyeliğimi Doğrula"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
