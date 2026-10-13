"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, KeyRound, Mail, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contact, setContact] = useState("mustafa.daglar@gmail.com");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setIsSuccessModal(true);
      setTimeout(() => {
        setIsSuccessModal(false);
        onSuccess?.();
      }, 1500);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // auto-focus next
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#111111] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 text-white" />

      {/* 2. Top Nav */}
      <div className="px-6 py-2 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={() => {
            if (step > 1) setStep((prev) => (prev - 1) as 1 | 2);
            else onBack?.();
          }}
          className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-white transition-all active:scale-95"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-6 bg-[#EF4823]"
                  : s < step
                  ? "w-2 bg-emerald-500"
                  : "w-2 bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Main Step Area */}
      <div className="flex-1 px-6 pt-4 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EF4823]/10 border border-[#EF4823]/30 flex items-center justify-center text-[#EF4823]">
                <KeyRound className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Şifremi Unuttum
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Aşağıdaki alana e-posta adresinizi veya cep telefonunuzu yazarak şifrenizi güncelleme talebi gönderebilirsiniz.
                </p>
              </div>

              <form onSubmit={handleNextStep1} className="space-y-4 pt-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="E-Posta / Telefon"
                    required
                    className="w-full h-13 pl-10 pr-4 text-xs sm:text-sm rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823] focus:ring-1 focus:ring-[#EF4823] transition-all"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-lg shadow-[#EF4823]/25 cursor-pointer"
                >
                  <span>Doğrulama Kodu Gönder</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EF4823]/10 border border-[#EF4823]/30 flex items-center justify-center text-[#EF4823]">
                <Mail className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Kodu Doğrula
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Belirttiğiniz e-posta adresinize veya cep telefonunuza bir kod yolladık, lütfen aşağıdaki alana bu kodu girin ve devam edin.
                </p>
              </div>

              <form onSubmit={handleNextStep2} className="space-y-6 pt-2">
                {/* 4 Digit OTP Inputs */}
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-14 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-center text-2xl font-bold text-white focus:outline-none focus:border-[#EF4823] focus:ring-2 focus:ring-[#EF4823]/40 transition-all font-mono"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtp(["1", "2", "3", "4"])}
                    className="text-xs text-zinc-500 hover:text-[#EF4823] transition-colors"
                  >
                    Kodu almadınız mı? <span className="font-medium text-white underline">Tekrar Gönder</span>
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-lg shadow-[#EF4823]/25 cursor-pointer"
                >
                  <span>Devam Et</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <KeyRound className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Yeni Şifre Belirle
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Lütfen aşağıdaki alana yeni şifrenizi yazın ve ardından doğruluğunu kontrol edebilmemiz için altındaki kutucuğa tekrar yazın.
                </p>
              </div>

              <form onSubmit={handleNextStep3} className="space-y-3 pt-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yeni Şifre"
                  required
                  className="w-full h-13 px-4 text-xs sm:text-sm rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823] focus:ring-1 focus:ring-[#EF4823] transition-all"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yeni Şifre Tekrar"
                  required
                  className="w-full h-13 px-4 text-xs sm:text-sm rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823] focus:ring-1 focus:ring-[#EF4823] transition-all"
                />

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-13 rounded-2xl bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-between px-6 text-sm font-semibold transition-all shadow-lg shadow-[#EF4823]/25 cursor-pointer mt-4"
                >
                  <span>Şifremi Güncelle</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Pad */}
      <div className="p-6 text-center text-xs text-zinc-600">
        DOİ Güvenli Doğrulama
      </div>

      {/* Success Modal */}
      {isSuccessModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Şifreniz Güncellendi!</h3>
          <p className="text-xs text-zinc-400">Giriş ekranına yönlendiriliyorsunuz...</p>
        </div>
      )}
    </div>
  );
}
