"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StatusBar } from "@/components/splash/StatusBar";
import { SplashScreen, ArrowRightIcon } from "@/components/splash/SplashScreen";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface LoginScreenProps {
  onClose?: () => void;
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onGuest?: () => void;
}

export function LoginScreen({
  onClose,
  onSuccess,
  onForgotPassword,
  onRegister,
  onGuest,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, 600);
  };

  return (
    <div className="relative w-full h-full bg-[#EF4823] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Real Splash Screen running in the background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <SplashScreen showStatusBar={false} />
        {/* Soft dark overlay to give focus to the login modal */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] z-10" />
      </div>

      {/* 2. Status Bar on top of modal */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 3. Floating Modal Card (Figma Node #14203:145541) */}
      <motion.div
        initial={{ y: 45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="absolute top-[138px] sm:top-[146px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[362px] min-h-[640px] bg-[#111111]/75 backdrop-blur-2xl rounded-[32px] p-6 pt-5 shadow-[0_12px_40px_rgba(0,0,0,0.55)] border border-white/15 z-20 flex flex-col justify-between"
      >
        {/* Top Close Button (Figma #14203:145571) */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-white/15 hover:bg-white/25 active:scale-90 flex items-center justify-center transition-all shadow-md cursor-pointer text-white"
            title="Kapat"
            aria-label="Kapat"
          >
            <X className="w-5 h-5 text-white stroke-[2.2]" />
          </button>
        </div>

        {/* Card Body */}
        <div className="w-full flex flex-col items-center text-center -mt-2">
          {/* Title */}
          <h2 className="text-[28px] sm:text-[30px] leading-[1.2] font-normal text-white tracking-tight mb-2">
            E-posta adresinle
            <br />
            giriş yap.
          </h2>

          {/* Subtitle */}
          <p className="text-sm font-medium leading-[1.2] text-white/90 max-w-[270px] mb-5">
            Google, Apple veya Facebook seçeneklerinden herhangi birini giriş yapmak için kullanabilirsin.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
            {/* Input 1: Telefon / E-posta / T.C. Kimlik No */}
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Telefon / E-posta / T.C. Kimlik No"
              required
              className="w-full h-14 px-6 rounded-[28px] bg-[#EFEFEF] text-[#111111] placeholder:text-[#777777] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#EF4823] transition-all"
            />

            {/* Input 2: Şifren */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifren"
              required
              className="w-full h-14 px-6 rounded-[28px] bg-[#EFEFEF] text-[#111111] placeholder:text-[#777777] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#EF4823] transition-all"
            />

            {/* Primary Button: Devam et */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full h-14 px-6 rounded-[28px] bg-[#EF4823] hover:bg-[#ff5530] active:scale-[0.98] text-white flex items-center justify-between text-base font-medium shadow-md transition-all cursor-pointer"
            >
              <span>{isLoading ? "Giriş yapılıyor..." : "Devam et"}</span>
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </motion.button>
          </form>

          {/* Link: Şifremi Unuttum (Figma #14203:145557) */}
          <button
            type="button"
            onClick={onForgotPassword}
            className="w-full flex items-center justify-start gap-3 px-4 py-2 mt-2 text-white hover:text-white/80 transition-colors"
          >
            <Image
              src="/images/login-security.svg"
              alt="Güvenlik"
              width={18}
              height={18}
              className="w-4.5 h-4.5 object-contain"
            />
            <span className="text-base font-medium">Şifremi Unuttum</span>
          </button>

          {/* Grouped Cell Options (Figma #14203:145560) */}
          <div className="w-full mt-2 rounded-[10px] border border-white/20 divide-y divide-white/20 overflow-hidden bg-white/5">
            {/* Google */}
            <button
              type="button"
              onClick={() => onSuccess?.()}
              className="w-full h-[44px] px-4 flex items-center gap-3.5 hover:bg-white/10 active:bg-white/15 transition-colors text-left cursor-pointer"
            >
              <Image
                src="/images/login-google.svg"
                alt="Google"
                width={16}
                height={16}
                className="w-4 h-4 object-contain brightness-200"
              />
              <span className="text-[15px] font-medium text-white">Google ile giriş yap</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => onSuccess?.()}
              className="w-full h-[44px] px-4 flex items-center gap-3.5 hover:bg-white/10 active:bg-white/15 transition-colors text-left cursor-pointer"
            >
              <Image
                src="/images/login-apple.svg"
                alt="Apple"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span className="text-[15px] font-medium text-white">Apple ile giriş yap</span>
            </button>

            {/* Guest */}
            <button
              type="button"
              onClick={onGuest || onSuccess}
              className="w-full h-[44px] px-4 flex items-center gap-3.5 hover:bg-white/10 active:bg-white/15 transition-colors text-left cursor-pointer"
            >
              <Image
                src="/images/login-user.svg"
                alt="Misafir"
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain"
              />
              <span className="text-[15px] font-medium text-white">Misafir olarak devam et</span>
            </button>
          </div>
        </div>

        {/* Footer Text (Figma #14203:145574) */}
        <div className="w-full text-center pt-2">
          <p className="text-base leading-[1.4] text-white">
            Hesabın yok mu?
            <br />
            <strong>Hesap oluşturmak için </strong>
            <button
              type="button"
              onClick={onRegister}
              className="underline font-bold hover:text-white/80 transition-colors cursor-pointer"
            >
              buraya tıkla!
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
