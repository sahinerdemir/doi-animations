"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { DeviceFrame } from "@/components/common/DeviceFrame";
import { SidebarTree } from "@/components/navigation/SidebarTree";
import { siteTreeData } from "@/data/pagesTree";
import { PageNode } from "@/types/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState<PageNode>(
    siteTreeData[0]?.pages[0] || {
      id: "splash-screen",
      title: "Splash Screen",
      status: "completed",
    }
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStart = () => {
    showToast("Hadi Başlayalım tıklandı → 'Login' ekranına geçiliyor...");
    const loginPage = siteTreeData[0]?.pages.find((p) => p.id === "login");
    if (loginPage) {
      setSelectedPage(loginPage);
    }
  };

  const handleLogin = () => {
    showToast("Giriş Yap tıklandı → 'Login' ekranına geçiliyor...");
    const loginPage = siteTreeData[0]?.pages.find((p) => p.id === "login");
    if (loginPage) {
      setSelectedPage(loginPage);
    }
  };

  const renderActiveScreen = () => {
    switch (selectedPage.id) {
      case "splash-screen":
        return (
          <SplashScreen
            onStart={handleStart}
            onLogin={handleLogin}
            showStatusBar={true}
          />
        );

      default:
        return (
          <div className="w-full h-full bg-[#111111] text-white flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="w-14 h-14 rounded-2xl bg-[#EF4823]/20 border border-[#EF4823]/40 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-[#EF4823]" />
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#EF4823] bg-[#EF4823]/10 px-3 py-1 rounded-full mb-3">
              {selectedPage.badge || "Sırada"}
            </span>
            <h3 className="text-xl font-bold mb-2">{selectedPage.title}</h3>
            <p className="text-xs text-zinc-400 max-w-xs mb-6">
              {selectedPage.description ||
                "Bu ekran için kodlama hazır. Sıradaki talimatınızla kodlanacak."}
            </p>
            {selectedPage.nodeId && (
              <div className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 mb-6">
                Figma Node: #{selectedPage.nodeId}
              </div>
            )}
            <button
              onClick={() => {
                const splash = siteTreeData[0]?.pages[0];
                if (splash) setSelectedPage(splash);
              }}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Splash Screen ekranına dön</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-[#0A0B0E]">
      {/* 1. Left Vertical Site Tree Sidebar */}
      <SidebarTree
        selectedPageId={selectedPage.id}
        onSelectPage={(page) => {
          setSelectedPage(page);
          showToast(`'${page.title}' ekranı seçildi.`);
        }}
      />

      {/* 2. Center Viewport with Scaled Mockup & Top-Right Fullscreen Icon */}
      <DeviceFrame>{renderActiveScreen()}</DeviceFrame>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
          <div className="bg-zinc-900/95 text-white border border-zinc-700/80 px-4 py-2.5 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#EF4823]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
