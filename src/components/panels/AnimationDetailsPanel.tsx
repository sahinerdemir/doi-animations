"use client";

import React, { useState } from "react";
import { ANIMATION_SPECS, ScreenAnimationSpec } from "@/data/animationSpecs";
import {
  Clock,
  PanelRightClose,
  PanelRightOpen,
  Sliders,
} from "lucide-react";

interface AnimationDetailsPanelProps {
  selectedPageId: string;
}

export function AnimationDetailsPanel({
  selectedPageId,
}: AnimationDetailsPanelProps) {
  // Default olarak kapalı başlar
  const [isCollapsed, setIsCollapsed] = useState(true);

  const spec: ScreenAnimationSpec = ANIMATION_SPECS[selectedPageId] || {
    pageId: selectedPageId,
    title: selectedPageId,
    category: "Prototip",
    summary: "",
    totalDurationMs: "200 ms",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "default-transition",
        target: "Ekran Geçişi",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: ["opacity: 0 → 1", "scale: 0.98 → 1.0"],
        description: "",
      },
    ],
  };

  if (isCollapsed) {
    return (
      <aside className="fixed right-5 bottom-5 z-40">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          title="Animasyon Detayları Panelini Aç"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/95 hover:bg-zinc-850 text-zinc-200 hover:text-white border border-zinc-700/80 shadow-2xl transition-all backdrop-blur-md active:scale-95 group cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-[#EF4823] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-medium">Animasyon Detayları</span>
          <PanelRightOpen className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-[340px] sm:w-[360px] shrink-0 h-screen bg-[#0C0D12] border-l border-zinc-800/80 flex flex-col z-30 select-none overflow-hidden">
      {/* 1. Sade Header: Ekran Adı & Toplam Süre */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between gap-3 bg-zinc-950/60">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Animasyon Özellikleri
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EF4823]/15 text-[#EF4823] border border-[#EF4823]/30 truncate">
              {spec.title}
            </span>
          </div>

          {spec.totalDurationMs && (
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-400 font-mono">
              <Clock className="w-3 h-3 text-[#EF4823]" />
              <span>Toplam Süre:</span>
              <span className="text-white font-medium">{spec.totalDurationMs}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          title="Paneli Gizle"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer shrink-0"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Katman Katman Sade Animasyon Listesi */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs font-sans scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {spec.steps.map((step, idx) => (
          <div
            key={step.id}
            className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2.5"
          >
            {/* Başlık & Tetikleyici */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-4.5 h-4.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="font-medium text-white text-xs truncate">
                  {step.target}
                </h4>
              </div>

              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded shrink-0">
                {step.trigger}
              </span>
            </div>

            {/* Süre / Gecikme / Easing Grid */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              <div className="bg-black/50 border border-zinc-800/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="text-zinc-500">Gecikme:</span>
                <span className="text-zinc-200 font-medium">
                  {step.delayMs !== undefined ? `${step.delayMs} ms` : "0 ms"}
                </span>
              </div>

              <div className="bg-black/50 border border-zinc-800/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="text-zinc-500">Süre:</span>
                <span className="text-[#EF4823] font-medium">
                  {typeof step.durationMs === "number" ? `${step.durationMs} ms` : step.durationMs}
                </span>
              </div>

              <div className="col-span-2 bg-black/50 border border-zinc-800/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="text-zinc-500">Easing:</span>
                <span className="text-amber-400 font-mono text-[10px] truncate max-w-[210px]">
                  {step.easing}
                </span>
              </div>
            </div>

            {/* Transform Değerleri (x, y, scale, rotate, opacity vb.) */}
            <div className="bg-black/70 border border-zinc-800/80 rounded-lg p-2 font-mono text-[11px] text-zinc-200 space-y-1">
              {step.properties.map((prop, pIdx) => (
                <div key={pIdx} className="flex items-baseline gap-1.5">
                  <span className="text-[#EF4823] font-bold select-none">›</span>
                  <span className="break-all">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Micro-Interactions (varsa kısa özet) */}
        {spec.microInteractions && spec.microInteractions.length > 0 && (
          <div className="pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2 px-1">
              Mikro Etkileşimler
            </span>

            <div className="space-y-1.5">
              {spec.microInteractions.map((item, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-zinc-900/30 border border-zinc-800/60 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px]"
                >
                  <span className="text-zinc-300 font-medium">{item.name}</span>
                  <span className="font-mono text-[10px] text-zinc-400 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                    {item.durationMs}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
