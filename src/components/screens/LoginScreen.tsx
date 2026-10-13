"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowRight, Eye, EyeOff, Lock, User, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface LoginScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginScreen({
  onBack,
  onSuccess,
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, 800);
  };

  return (
    <div className="relative w-full h-full bg-[#EF4823] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 2. Top Nav / Back Button */}
      <div className="px-6 py-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold tracking-wider uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full">
          Giriş Yap
        </span>
      </div>

      {/* Background Stylized DOİ Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[340px] opacity-20 pointer-events-none select-none">
        <Image
          src="/images/splash-illustration.svg"
          alt="DOİ Watermark"
          width={340}
          height={370}
          className="object-contain"
        />
      </div>

      {/* 3. Main Login Card Container */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="w-full bg-[#111111] rounded-t-[36px] p-6 pb-8 z-10 flex flex-col gap-4 shadow-[0_-15px_30px_rgba(0,0,0,0.4)] border-t border-white/10"
      >
        {/* Card Header */}
        <div className="space-y-1.5 pt-1">
          <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
            E-posta adresinle
            <br />
            giriş yap.
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Google, Apple veya Facebook seçeneklerinden herhangi birini giriş yapmak için kullanabilirsin.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
          {/* Identifier Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Telefon / E-posta / T.C. Kimlik No"
              required
              className="w-full h-13 pl-10 pr-4 text-xs sm:text-sm rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823] focus:ring-1 focus:ring-[#EF4823] transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifren"
              required
              className="w-full h-13 pl-10 pr-11 text-xs sm:text-sm rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823] focus:ring-1 focus:ring-[#EF4823] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-lg shadow-[#EF4823]/30 disabled:opacity-60 mt-1 cursor-pointer"
          >
            <span>{isLoading ? "Giriş yapılıyor..." : "Devam et"}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </form>

        {/* Links: Forgot Password & Register */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-xs">
          <button
            type="button"
            onClick={onForgotPassword}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#EF4823]" />
            <span>Şifremi Unuttum</span>
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="text-[#EF4823] hover:underline font-medium"
          >
            Kayıt Ol
          </button>
        </div>

        {/* Social Login Options */}
        <div className="space-y-2 mt-1">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-[#111111] px-3 text-[10px] uppercase tracking-wider text-zinc-500 absolute">
              veya
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onSuccess?.()}
              className="h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-200 transition-all hover:scale-[1.02]"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => onSuccess?.()}
              className="h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-200 transition-all hover:scale-[1.02]"
            >
              Apple
            </button>
            <button
              type="button"
              onClick={() => onSuccess?.()}
              className="h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-200 transition-all hover:scale-[1.02]"
            >
              Facebook
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
