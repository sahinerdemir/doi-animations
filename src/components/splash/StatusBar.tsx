import React from "react";
import Image from "next/image";

interface StatusBarProps {
  time?: string;
  className?: string;
}

export function StatusBar({ time = "9:41", className = "" }: StatusBarProps) {
  return (
    <div
      className={`w-full h-11 px-7 flex items-center justify-between select-none z-20 ${className}`}
      aria-label="Durum Çubuğu"
    >
      {/* Time */}
      <span className="text-[17px] font-semibold tracking-tight text-[#111111] font-sans">
        {time}
      </span>

      {/* Right icons: Signal, Wi-Fi, Battery */}
      <div className="flex items-center">
        <Image
          src="/images/status-bar-right.svg"
          alt="Sinyal, Wi-Fi ve Batarya"
          width={78}
          height={13}
          priority
          className="h-[13px] w-auto object-contain"
        />
      </div>
    </div>
  );
}
