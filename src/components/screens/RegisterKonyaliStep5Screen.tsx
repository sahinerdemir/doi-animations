"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterKonyaliStep5ScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function RegisterKonyaliStep5Screen({
  onBack,
  onSuccess,
}: RegisterKonyaliStep5ScreenProps) {
  const [email, setEmail] = useState("mustafa.daglar@gmail.com");
  const [phone, setPhone] = useState("(538) 611 99 11");
  const [gender, setGender] = useState("Erkek");
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      onSuccess?.();
    }, 900);
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

        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>KMK Üyeliği Doğrulandı</span>
        </span>
      </div>

      {/* 3. Header Title */}
      <div className="px-6 pt-2 pb-1">
        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
          Hoş Geldin, <span className="text-[#EF4823]">Mustafa Dağlar</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Konya Millet Kütüphanesi üyeliğin doğrulandı! DOİ uygulamasını 1 yıl boyunca ücretsiz kullanmaya başlamak için son adımı onayla.
        </p>
      </div>

      {/* 4. Verified Profile Card & Confirmation Form */}
      <form onSubmit={handleActivate} className="flex-1 overflow-y-auto px-6 py-2 space-y-3 scrollbar-none pb-24">
        {/* Verified Badge Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-zinc-900 border border-emerald-800/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
              Aktif Ayrıcalık
            </span>
            <h4 className="text-sm font-bold text-white mt-0.5">
              1 Yıllık Tam DOİ Premium Paketi
            </h4>
            <span className="text-[11px] text-zinc-400">Ücretsiz (Millet Kütüphanesi Sponsorluğunda)</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Read-Only Verified Identity */}
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-zinc-800">
            <span className="text-zinc-500">Ad Soyad</span>
            <span className="font-semibold text-white flex items-center gap-1">
              Mustafa Dağlar
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-1 border-b border-zinc-800">
            <span className="text-zinc-500">Doğum Tarihi</span>
            <span className="font-mono text-zinc-300">12/05/1992</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Konum / Şehir</span>
            <span className="text-zinc-300">Konya / Selçuklu</span>
          </div>
        </div>

        {/* Contact Info (Editable) */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            E-Posta Adresi
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#EF4823]"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            Cep Telefonu
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono focus:outline-none focus:border-[#EF4823]"
          />
        </div>

        {/* Gender Selection */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            Cinsiyet
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Erkek", "Kadın"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`h-11 rounded-xl text-xs font-medium border transition-all ${
                  gender === g
                    ? "bg-[#EF4823] text-white border-[#EF4823]"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isActivating}
            className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-xl shadow-[#EF4823]/30 cursor-pointer"
          >
            <span>{isActivating ? "Abonelik Başlatılıyor..." : "1 Yıllık Ücretsiz Aboneliği Başlat"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
