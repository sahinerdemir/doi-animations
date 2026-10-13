"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, MapPin, User, Mail, Phone, Calendar, Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterNonKonyaScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
  onLogin?: () => void;
}

const CITIES = ["Bursa", "İstanbul", "Ankara", "İzmir", "Antalya", "Eskişehir", "Trabzon", "Diğer"];

export function RegisterNonKonyaScreen({
  onBack,
  onSuccess,
  onLogin,
}: RegisterNonKonyaScreenProps) {
  const [city, setCity] = useState("Bursa");
  const [name, setName] = useState("Mustafa");
  const [surname, setSurname] = useState("Dağlar");
  const [email, setEmail] = useState("mustafa.daglar@gmail.com");
  const [phone, setPhone] = useState("(538) 611 99 11");
  const [birthDate, setBirthDate] = useState("12/05/1992");
  const [password, setPassword] = useState("");
  const [agreeKvkk, setAgreeKvkk] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeKvkk) return;
    onSuccess?.();
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

        <span className="text-xs font-semibold text-zinc-400">
          Yeni Üyelik
        </span>

        <button
          type="button"
          onClick={onLogin}
          className="text-xs font-semibold text-[#EF4823] hover:underline"
        >
          Giriş Yap
        </button>
      </div>

      {/* 3. Header Title */}
      <div className="px-6 pt-2 pb-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          DOİ Hesabı Oluştur
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Hemen kaydolarak zengin kütüphaneye adım at.
        </p>
      </div>

      {/* 4. Form Fields - Scrollable */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-2 space-y-3 scrollbar-none pb-24">
        {/* City Select */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            Yaşadığınız Şehir *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 pl-10 pr-4 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#EF4823] transition-all"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-zinc-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Name & Surname */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] font-medium text-zinc-400 block mb-1">
              Ad *
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad"
                required
                className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400 block mb-1">
              Soyad *
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Soyad"
              required
              className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            E-Posta Adresi *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              required
              className="w-full h-12 pl-10 pr-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all"
            />
          </div>
        </div>

        {/* Phone & BirthDate */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] font-medium text-zinc-400 block mb-1">
              Cep Telefonu *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0 (5XX) XXX XX XX"
              required
              className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all font-mono"
            />
          </div>
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
              className="w-full h-12 px-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all font-mono"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">
            Şifre *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 6 karakter"
              required
              className="w-full h-12 pl-10 pr-3.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#EF4823] transition-all"
            />
          </div>
        </div>

        {/* KVKK Checkbox */}
        <div
          onClick={() => setAgreeKvkk(!agreeKvkk)}
          className="flex items-start gap-2.5 pt-1 cursor-pointer"
        >
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              agreeKvkk
                ? "bg-[#EF4823] text-white"
                : "bg-zinc-800 border border-zinc-700 text-transparent"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[11px] text-zinc-400 leading-snug">
            Kullanıcı Sözleşmesi ve KVKK Aydınlatma Metni&apos;ni okudum, kabul ediyorum.
          </span>
        </div>

        {/* Sticky Submit Button */}
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!agreeKvkk}
            className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-xl shadow-[#EF4823]/30 disabled:opacity-40 cursor-pointer"
          >
            <span>Kaydı Tamamla ve Devam Et</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
