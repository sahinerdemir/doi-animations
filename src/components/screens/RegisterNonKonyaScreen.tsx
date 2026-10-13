"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import {
  ArrowLeft,
  ChevronDown,
  EyeOff,
  Eye,
  CheckCircle2,
  CircleDashed,
  ScanFace,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface RegisterNonKonyaScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
  onSelectKonya?: () => void;
}

export function RegisterNonKonyaScreen({
  onBack,
  onSuccess,
  onSelectKonya,
}: RegisterNonKonyaScreenProps) {
  const [city, setCity] = useState("Bursa");
  const [name, setName] = useState("Mustafa");
  const [surname, setSurname] = useState("Dağl");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCity(selected);
    if (selected === "Konya") {
      onSelectKonya?.();
    }
  };

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

      {/* 3. Form Cards (Exact Figma Cards Structure) */}
      <div className="flex-1 overflow-y-auto px-5 py-2 pb-24 scrollbar-none space-y-3.5">
        {/* Card 1: Yaşadığın Şehir */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <span className="text-sm font-normal text-[#111111]">Yaşadığın Şehir *</span>
          <div className="relative flex items-center gap-1.5 cursor-pointer">
            <select
              value={city}
              onChange={handleCityChange}
              className="appearance-none bg-transparent text-sm font-semibold text-[#111111] pr-5 focus:outline-none cursor-pointer"
            >
              <option value="Bursa">Bursa</option>
              <option value="Konya">Konya (Ücretsiz 1 Yıl)</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#111111] pointer-events-none absolute right-0" />
          </div>
        </div>

        {/* Card 2: User Profile Details (Divided White Card) */}
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] divide-y divide-zinc-100 overflow-hidden text-sm">
          {/* Ad */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Ad *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 text-right font-medium text-[#111111] focus:outline-none"
            />
          </div>

          {/* Soyad */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Soyad *</span>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="flex-1 text-right font-medium text-[#111111] focus:outline-none"
            />
          </div>

          {/* E-Posta */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">E-Posta Adresi *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Giriniz..."
              className="flex-1 text-right font-medium text-[#111111] placeholder:text-zinc-400 focus:outline-none"
            />
          </div>

          {/* Cep Telefonu */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Cep Telefonu *</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(***) *** ** **"
              className="flex-1 text-right font-medium text-[#111111] placeholder:text-zinc-400 focus:outline-none font-mono"
            />
          </div>

          {/* Doğum Tarihi */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Doğum Tarihi *</span>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="GG/AA/YYYY"
              className="flex-1 text-right font-medium text-[#111111] placeholder:text-zinc-400 focus:outline-none font-mono"
            />
          </div>

          {/* Cinsiyet */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Cinsiyet</span>
            <div className="relative flex items-center gap-1.5 cursor-pointer">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium text-[#111111] pr-5 focus:outline-none cursor-pointer"
              >
                <option value="">Seçiniz...</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#111111] pointer-events-none absolute right-0" />
            </div>
          </div>
        </div>

        {/* Card 3: Password Inputs */}
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] divide-y divide-zinc-100 overflow-hidden text-sm">
          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Şifre *</span>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                className="w-full text-right font-medium text-[#111111] focus:outline-none"
              />
              <EyeOff className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="text-zinc-600 font-normal w-28">Şifre Tekrar *</span>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifre Tekrar"
                className="w-full text-right font-medium text-[#111111] focus:outline-none"
              />
              <EyeOff className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </div>

        {/* Password Criteria Checklist */}
        <div className="px-2 space-y-1 text-xs text-zinc-600">
          <div className="flex items-center gap-2 text-[#EF4823]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>En az 1 büyük ve 1 küçük harf,</span>
          </div>
          <div className="flex items-center gap-2 text-[#EF4823]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>En az 1 rakam,</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <CircleDashed className="w-3.5 h-3.5" />
            <span>En az 1 özel karakter,</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <CircleDashed className="w-3.5 h-3.5" />
            <span>Minimum 8 hane.</span>
          </div>
        </div>

        {/* Card 4: FaceID Toggle */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScanFace className="w-5 h-5 text-[#111111]" />
            <span className="text-sm font-medium text-[#111111]">
              Yüz tanımayı aktifleştir
            </span>
          </div>

          {/* iOS Style Switch */}
          <button
            type="button"
            onClick={() => setFaceIdEnabled(!faceIdEnabled)}
            className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${
              faceIdEnabled ? "bg-[#EF4823]" : "bg-zinc-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                faceIdEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Continue Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSuccess}
          className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-8 text-base font-semibold shadow-xl shadow-[#EF4823]/25 cursor-pointer mt-2"
        >
          <span>Devam Et</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
