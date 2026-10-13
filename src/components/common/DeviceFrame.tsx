"use client";

import React, { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      // Fallback to state-based fullscreen toggle
      setIsFullscreen((prev) => !prev);
    }
  };

  return (
    <div className="relative flex-1 h-screen bg-[#0A0B0E] flex items-center justify-center overflow-hidden p-2 sm:p-4">
      {/* Top-Right Minimalist Fullscreen Button */}
      <button
        type="button"
        onClick={toggleFullscreen}
        title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4 text-zinc-200" />
        ) : (
          <Maximize2 className="w-4 h-4 text-zinc-200" />
        )}
      </button>

      {/* Center iPhone Mockup Frame */}
      <div className="relative h-[min(852px,calc(100vh-2.5rem))] aspect-[394/852] max-w-full p-2.5 sm:p-3 bg-zinc-900/90 border-[3.5px] border-zinc-700/90 rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300">
        {/* Dynamic Island / Speaker Pill indicator at top */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 pointer-events-none flex items-center justify-end pr-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#121623] border border-zinc-800/80" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="w-full h-full rounded-[42px] overflow-hidden bg-[#EF4823] relative">
          {children}
        </div>
      </div>
    </div>
  );
}
