"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { DeviceFrame } from "@/components/common/DeviceFrame";

export default function HomePage() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleStart = () => {
    setLastAction("Hadi Başlayalım tıklandı (Onboarding akışına yönlendiriliyor...)");
    setTimeout(() => setLastAction(null), 3000);
  };

  const handleLogin = () => {
    setLastAction("Giriş Yap tıklandı (Giriş ekranına yönlendiriliyor...)");
    setTimeout(() => setLastAction(null), 3000);
  };

  return (
    <>
      <DeviceFrame referenceImage="/images/splash-screen-reference.png">
        <SplashScreen
          onStart={handleStart}
          onLogin={handleLogin}
          showStatusBar={true}
        />
      </DeviceFrame>

      {/* Floating Toast Notification on Action */}
      {lastAction && (
        <div className="fixed bottom-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="bg-[#111111] text-white border border-white/10 px-5 py-3 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4823]" />
            <span>{lastAction}</span>
          </div>
        </div>
      )}
    </>
  );
}
