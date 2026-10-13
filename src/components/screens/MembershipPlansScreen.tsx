"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
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

        <span className="text-xs font-semibold text-[#EF4823] bg-[#EF4823]/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Plan Seçimi
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
      <div className="px-6 pt-2 pb-1 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
          Senin için en uygun
          <br />
          üyeliği seç!
        </h2>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
          E-Kitaplar, Podcastler, Belgeseller.. DOİ dünyasından sınırsızca faydalanmak için sana en uygun paketi hemen seç!
        </p>
      </div>

      {/* 4. Plans Comparison Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3 scrollbar-none pb-28">
        {/* Annual Plan (Featured) */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedPlan("annual")}
          className={`p-4 rounded-3xl border relative transition-all duration-200 cursor-pointer ${
            selectedPlan === "annual"
              ? "bg-zinc-900 border-[#EF4823] ring-2 ring-[#EF4823]/80 shadow-2xl shadow-[#EF4823]/20"
              : "bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
          }`}
        >
          {/* Badge */}
          <div className="absolute -top-3 right-6 bg-[#EF4823] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>En Popüler &bull; 2 Ay Bizden!</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-base font-bold text-white">Yıllık Plan</h4>
              <span className="text-[11px] text-zinc-400">Tek ödeme olarak alınır</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#EF4823] font-mono">
                ₺690
              </span>
              <span className="text-xs text-zinc-400 block font-normal">/yıl (₺57.5/ay)</span>
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-2.5 mt-2 flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#EF4823]" />
              <span>Sınırsız e-kitap & sesli kütüphane</span>
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedPlan === "annual"
                  ? "bg-[#EF4823] text-white"
                  : "bg-zinc-800 text-transparent"
              }`}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        </motion.div>

        {/* Monthly Plan */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedPlan("monthly")}
          className={`p-4 rounded-3xl border transition-all duration-200 cursor-pointer ${
            selectedPlan === "monthly"
              ? "bg-zinc-900 border-[#EF4823] ring-2 ring-[#EF4823]/80 shadow-2xl shadow-[#EF4823]/20"
              : "bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-base font-bold text-white">Aylık Plan</h4>
              <span className="text-[11px] text-zinc-400">
                Aylık tanımladığın kredi kartından çekilir
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white font-mono">
                ₺69
              </span>
              <span className="text-xs text-zinc-400 block font-normal">/ay</span>
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-2.5 mt-2 flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#EF4823]" />
              <span>Tüm içeriklere tam erişim</span>
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedPlan === "monthly"
                  ? "bg-[#EF4823] text-white"
                  : "bg-zinc-800 text-transparent"
              }`}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        </motion.div>

        {/* Guarantee Info */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Üyeliğini istediğin zaman tek tıkla iptal edebilirsin!</span>
        </div>
      </div>

      {/* 5. Sticky Bottom Action Bar */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#111111] via-[#111111]/95 to-transparent pt-6 z-30 flex flex-col gap-2.5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSuccess}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-sm sm:text-base font-semibold shadow-xl shadow-[#EF4823]/30 cursor-pointer"
        >
          <span>7 Günlük Denemeyi Başlat</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-xs text-zinc-400 hover:text-white transition-colors py-1"
        >
          Üye olmadan devam et
        </button>
      </div>
    </div>
  );
}
