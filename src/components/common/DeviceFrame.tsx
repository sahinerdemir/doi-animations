"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Maximize2,
  Minimize2,
  SplitSquareVertical,
  Smartphone,
  Expand,
} from "lucide-react";

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
  const [fillMode, setFillMode] = useState<"fill" | "fit">("fill");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
          (document as unknown as { webkitFullscreenElement?: Element })
            .webkitFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const hasFs = Boolean(
        document.fullscreenElement ||
          (document as unknown as { webkitFullscreenElement?: Element })
            .webkitFullscreenElement
      );

      if (!hasFs) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (
          (containerRef.current as unknown as { webkitRequestFullscreen?: () => Promise<void> })
            ?.webkitRequestFullscreen
        ) {
          await (
            containerRef.current as unknown as { webkitRequestFullscreen: () => Promise<void> }
          ).webkitRequestFullscreen();
        } else {
          await document.documentElement.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (
          (document as unknown as { webkitExitFullscreen?: () => Promise<void> })
            ?.webkitExitFullscreen
        ) {
          await (
            document as unknown as { webkitExitFullscreen: () => Promise<void> }
          ).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 h-screen bg-[#0A0B0E] flex items-center justify-center overflow-auto select-none transition-all duration-300 ${
        isFullscreen ? "p-0 bg-black" : "p-3 sm:p-5"
      }`}
    >
      {/* Top-Right Control Buttons */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        {/* Fullscreen Width / Fit Toggle (Only shown in Fullscreen mode without compare) */}
        {isFullscreen && !isCompareMode && (
          <button
            type="button"
            onClick={() => setFillMode(fillMode === "fit" ? "fill" : "fit")}
            title={
              fillMode === "fit"
                ? "Ekranı Doldur (Genişlet)"
                : "Telefon Oranına Dön (394 × 853)"
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 text-xs font-medium cursor-pointer"
          >
            {fillMode === "fit" ? (
              <>
                <Expand className="w-3.5 h-3.5 text-[#EF4823]" />
                <span className="hidden sm:inline">Ekranı Doldur</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#EF4823]" />
                <span className="hidden sm:inline">Telefon Oranı</span>
              </>
            )}
          </button>
        )}

        {/* Toggle Compare Mode (if reference image available) */}
        {referenceImage && (
          <button
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            title={isCompareMode ? "Tekli Görünüme Dön" : "Figma ile Yan Yana Karşılaştır"}
            className={`p-2.5 rounded-full border backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
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
          title={isFullscreen ? "Tam Ekrandan Çık (Esc)" : "Tam Ekran Yap"}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
        <div
          className={`relative overflow-hidden bg-black flex items-center justify-center transition-all duration-300 ${
            isFullscreen
              ? fillMode === "fill"
                ? "w-full h-full max-w-xl md:max-w-2xl rounded-none sm:rounded-[24px] border-0 sm:border border-zinc-800/80 shadow-2xl"
                : "h-screen max-h-screen aspect-[394/853] w-auto max-w-full rounded-none sm:rounded-[36px] border-0 sm:border-[2px] border-zinc-800/80 shadow-2xl"
              : "h-[min(853px,calc(100vh-2.5rem))] aspect-[394/853] w-auto max-w-full rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/15 border-[3px] border-zinc-800/90"
          }`}
        >
          {/* Screen Canvas */}
          <div className="w-full h-full relative overflow-hidden bg-black">
            {children}
          </div>
        </div>
      ) : (
        /* Side-by-Side Comparison Mode */
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-7xl h-full py-4">
          {/* Left: Code implementation */}
          <div className="flex flex-col items-center h-full max-h-screen">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-2 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
              Kodlanan Ekran
            </span>
            <div
              className={`relative ${
                isFullscreen
                  ? "h-[calc(100vh-4rem)] rounded-[28px]"
                  : "h-[min(760px,calc(100vh-6rem))] rounded-[40px]"
              } aspect-[394/853] w-auto border-[3px] border-zinc-800 shadow-2xl overflow-hidden bg-black ring-1 ring-white/10`}
            >
              <div className="w-full h-full relative overflow-hidden">
                {children}
              </div>
            </div>
          </div>

          {/* Right: Figma Screenshot */}
          <div className="flex flex-col items-center h-full max-h-screen">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EF4823] mb-2 bg-[#EF4823]/10 border border-[#EF4823]/30 px-3 py-1 rounded-full">
              Figma Orijinal Tasarım
            </span>
            <div
              className={`relative ${
                isFullscreen
                  ? "h-[calc(100vh-4rem)] rounded-[28px]"
                  : "h-[min(760px,calc(100vh-6rem))] rounded-[40px]"
              } aspect-[394/853] w-auto border-[3px] border-zinc-800 shadow-2xl overflow-hidden bg-black ring-1 ring-white/10`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={referenceImage!}
                  alt={pageTitle || "Figma Referansı"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
