"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Smartphone, Maximize2, SplitSquareVertical } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
  referenceImage?: string;
}

export function DeviceFrame({
  children,
  referenceImage = "/images/splash-screen-reference.png",
}: DeviceFrameProps) {
  const [viewMode, setViewMode] = useState<"frame" | "fullscreen" | "compare">("frame");

  return (
    <div className="min-h-screen bg-[#0F1115] text-zinc-100 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Top Bar / Controls */}
      <header className="w-full max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-4 py-2 px-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#EF4823]" />
          <span className="font-semibold text-sm tracking-wide text-zinc-200">
            DOİ Frontend &bull; Onboarding v2 / Splash Screen
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("frame")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === "frame"
                ? "bg-[#EF4823] text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Cihaz Çerçevesi</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("compare")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === "compare"
                ? "bg-[#EF4823] text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Figma ile Karşılaştır</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("fullscreen")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === "fullscreen"
                ? "bg-[#EF4823] text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Tam Ekran</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex items-center justify-center">
        {viewMode === "fullscreen" && (
          <div className="fixed inset-0 z-50 bg-[#EF4823] flex items-center justify-center">
            <button
              onClick={() => setViewMode("frame")}
              className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all"
            >
              Çıkış (ESC)
            </button>
            <div className="w-full h-full max-w-[430px] flex items-center justify-center">
              {children}
            </div>
          </div>
        )}

        {viewMode === "frame" && (
          <div className="relative group">
            {/* Outer Device Frame (iPhone style) */}
            <div className="p-3 bg-zinc-900 border-[3px] border-zinc-700/80 rounded-[52px] shadow-2xl shadow-black/80 ring-1 ring-white/10">
              <div className="rounded-[40px] overflow-hidden bg-[#EF4823]">
                {children}
              </div>
            </div>
          </div>
        )}

        {viewMode === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center max-w-5xl">
            {/* Left: Code Implementation */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                Kodlanan Ekran (React / Next.js)
              </span>
              <div className="p-3 bg-zinc-900 border-[3px] border-zinc-700/80 rounded-[52px] shadow-2xl shadow-black/80 ring-1 ring-white/10">
                <div className="rounded-[40px] overflow-hidden bg-[#EF4823]">
                  {children}
                </div>
              </div>
            </div>

            {/* Right: Figma Reference */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                Figma Orijinal Tasarım
              </span>
              <div className="p-3 bg-zinc-900 border-[3px] border-zinc-700/80 rounded-[52px] shadow-2xl shadow-black/80 ring-1 ring-white/10">
                <div className="relative w-[394px] h-[852px] rounded-[40px] overflow-hidden bg-[#EF4823]">
                  <Image
                    src={referenceImage}
                    alt="Figma Referans Tasarımı"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
