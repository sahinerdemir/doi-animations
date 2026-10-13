"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, SplitSquareVertical } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
  referenceImage?: string;
  pageTitle?: string;
}

export function DeviceFrame({
  children,
  referenceImage,
  pageTitle,
}: DeviceFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  return (
    <div className="relative flex-1 h-screen bg-[#0A0B0E] flex items-center justify-center overflow-auto p-2 sm:p-4">
      {/* Top-Right Control Buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Toggle Compare Mode (if reference image available) */}
        {referenceImage && (
          <button
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            title={isCompareMode ? "Normal Görünüme Dön" : "Figma ile Yan Yana Karşılaştır"}
            className={`p-2.5 rounded-full border backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 ${
              isCompareMode
                ? "bg-[#EF4823] text-white border-[#EF4823]"
                : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700/60"
            }`}
          >
            <SplitSquareVertical className="w-4 h-4" />
          </button>
        )}

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-zinc-200" />
          ) : (
            <Maximize2 className="w-4 h-4 text-zinc-200" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      {!isCompareMode ? (
        /* Single Centered Mockup Frame */
        <div className="relative h-[min(852px,calc(100vh-2.5rem))] aspect-[394/852] max-w-full p-2.5 sm:p-3 bg-zinc-900/90 border-[3.5px] border-zinc-700/90 rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300">
          {/* Dynamic Island Pill */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 pointer-events-none flex items-center justify-end pr-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#121623] border border-zinc-800/80" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="w-full h-full rounded-[42px] overflow-hidden bg-black relative">
            {children}
          </div>
        </div>
      ) : (
        /* Side-by-Side Comparison Mode */
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl py-8">
          {/* Left: Code implementation */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-2 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
              Kodlanan Ekran (Next.js / React)
            </span>
            <div className="relative h-[min(780px,calc(100vh-6rem))] aspect-[394/852] p-2.5 bg-zinc-900 border-[3px] border-zinc-700 rounded-[46px] shadow-2xl overflow-hidden">
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-black">
                {children}
              </div>
            </div>
          </div>

          {/* Right: Figma Screenshot */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EF4823] mb-2 bg-[#EF4823]/10 border border-[#EF4823]/30 px-3 py-1 rounded-full">
              Figma Orijinal Tasarım
            </span>
            <div className="relative h-[min(780px,calc(100vh-6rem))] aspect-[394/852] p-2.5 bg-zinc-900 border-[3px] border-zinc-700 rounded-[46px] shadow-2xl overflow-hidden">
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black">
                <Image
                  src={referenceImage!}
                  alt={pageTitle || "Figma Referansı"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
