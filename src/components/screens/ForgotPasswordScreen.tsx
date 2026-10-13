"use client";

import React, { useState } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import { ArrowLeft, ArrowRight, Delete, Globe, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleKeyPress = (char: string) => {
    if (step === 1) setContact((prev) => prev + char.toLowerCase());
    else if (step === 3) setNewPassword((prev) => prev + char);
  };

  const handleBackspace = () => {
    if (step === 1) setContact((prev) => prev.slice(0, -1));
    else if (step === 3) setNewPassword((prev) => prev.slice(0, -1));
  };

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar */}
      <StatusBar time="9:41" className="pt-2 z-20" />

      {/* 2. Top Nav */}
      <div className="px-6 py-2 flex items-center justify-between z-20 relative">
        <button
          type="button"
          onClick={() => {
            if (step > 1) setStep((prev) => (prev - 1) as 1 | 2);
            else onBack?.();
          }}
          className="w-8 h-8 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity"
          title="Geri"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <h3 className="text-lg font-bold text-[#111111] absolute left-1/2 -translate-x-1/2">
          {step === 3 ? "Yeni Şifre" : "Şifremi Unuttum"}
        </h3>

        <div className="w-8" />
      </div>

      {/* 3. Main Step Area */}
      <div className="flex-1 px-6 pt-3 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <p className="text-sm font-normal text-[#111111] text-center leading-relaxed px-2">
                Aşağıdaki alana e-posta adresinizi veya cep telefonunuzu yazarak şifrenizi güncelleme talebi gönderebilirsiniz.
              </p>

              <div className="pt-2">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="E-Posta / Telefon"
                  className="w-full h-15 rounded-[22px] bg-white px-6 text-base font-normal text-[#111111] placeholder:text-[#999999] shadow-[0_2px_10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#EF4823]"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(2)}
                className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-center gap-2 text-base font-medium shadow-md shadow-[#EF4823]/25 cursor-pointer mt-1"
              >
                <span>Şifremi Güncelle</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <p className="text-sm font-normal text-[#111111] text-center leading-relaxed px-2">
                Belirttiğiniz e-posta adresinize veya cep telefonunuza bir kod yolladık, lütfen aşağıdaki alana bu kodu girin ve devam edin.
              </p>

              {/* 6 Digit OTP Input Boxes (Exact Figma #14203:145888) */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {otp.map((d, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                    className="w-12 h-16 rounded-[18px] bg-white text-center text-xl font-bold font-mono text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent focus:border-[#EF4823] focus:outline-none"
                  />
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(3)}
                className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-center gap-2 text-base font-medium shadow-md shadow-[#EF4823]/25 cursor-pointer mt-2"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-3"
            >
              <p className="text-sm font-normal text-[#111111] text-center leading-relaxed px-2">
                Lütfen aşağıdaki alana yeni şifrenizi yazın ve ardından doğruluğunu kontrol edebilmemiz için altındaki kutucuğa tekrar yazın.
              </p>

              <div className="pt-2 space-y-2.5">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yeni Şifre"
                  className="w-full h-15 rounded-[22px] bg-white px-6 text-base font-normal text-[#111111] placeholder:text-[#999999] shadow-[0_2px_10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#EF4823]"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yeni Şifre Tekrar"
                  className="w-full h-15 rounded-[22px] bg-white px-6 text-base font-normal text-[#111111] placeholder:text-[#999999] shadow-[0_2px_10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#EF4823]"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onSuccess}
                className="w-full h-14 rounded-full bg-[#EF4823] hover:bg-[#ff5530] text-white flex items-center justify-center gap-2 text-base font-medium shadow-md shadow-[#EF4823]/25 cursor-pointer mt-1"
              >
                <span>Şifremi Güncelle</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Realistic iOS Keyboard (Figma AlphabeticKeyboard component) */}
      <div className="w-full bg-[#D1D5DB]/80 backdrop-blur-md pt-2 pb-4 px-1.5 border-t border-zinc-300 select-none">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5 mb-2">
          {KEYBOARD_ROWS[0].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeyPress(k)}
              className="h-10 flex-1 max-w-[32px] rounded-md bg-white text-base font-medium text-black shadow-sm flex items-center justify-center active:bg-zinc-200"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1.5 mb-2 px-3">
          {KEYBOARD_ROWS[1].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeyPress(k)}
              className="h-10 flex-1 max-w-[32px] rounded-md bg-white text-base font-medium text-black shadow-sm flex items-center justify-center active:bg-zinc-200"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1.5 mb-2">
          <div className="w-10 h-10 rounded-md bg-[#AFB4BE] flex items-center justify-center text-xs font-semibold">
            ⇧
          </div>
          {KEYBOARD_ROWS[2].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeyPress(k)}
              className="h-10 flex-1 max-w-[32px] rounded-md bg-white text-base font-medium text-black shadow-sm flex items-center justify-center active:bg-zinc-200"
            >
              {k}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="w-10 h-10 rounded-md bg-[#AFB4BE] flex items-center justify-center text-black active:bg-zinc-300"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-1.5 px-2">
          <button className="w-9 h-9 rounded-md bg-[#AFB4BE] text-xs font-bold flex items-center justify-center">
            123
          </button>
          <div className="flex items-center justify-center gap-3">
            <Globe className="w-4 h-4 text-zinc-600" />
            <Mic className="w-4 h-4 text-zinc-600" />
          </div>
          <button
            type="button"
            onClick={() => handleKeyPress(" ")}
            className="flex-1 h-9 rounded-md bg-white text-xs font-medium flex items-center justify-center shadow-sm"
          >
            space
          </button>
          <button
            type="button"
            onClick={() => {
              if (step < 3) setStep((s) => (s + 1) as 2 | 3);
              else onSuccess?.();
            }}
            className="w-16 h-9 rounded-md bg-[#AFB4BE] text-xs font-medium flex items-center justify-center text-black"
          >
            return
          </button>
        </div>
      </div>
    </div>
  );
}
