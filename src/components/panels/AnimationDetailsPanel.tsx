"use client";

import React, { useState } from "react";
import { ANIMATION_SPECS, ScreenAnimationSpec } from "@/data/animationSpecs";
import {
  Sparkles,
  Clock,
  Zap,
  Activity,
  Code2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
  Info,
  Layers,
  MousePointerClick,
  Cpu,
} from "lucide-react";

interface AnimationDetailsPanelProps {
  selectedPageId: string;
}

export function AnimationDetailsPanel({
  selectedPageId,
}: AnimationDetailsPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [expandedSnippets, setExpandedSnippets] = useState<Record<string, boolean>>({});

  const spec: ScreenAnimationSpec = ANIMATION_SPECS[selectedPageId] || {
    pageId: selectedPageId,
    title: selectedPageId,
    category: "Prototip Ekranı",
    summary: "Bu ekran için temel geçişler ve micro-etkileşimler tanımlandı.",
    totalDurationMs: "200 ms",
    framework: "Framer Motion",
    gpuAccelerated: true,
    steps: [
      {
        id: "default-transition",
        target: "Ekran Geçişi (Screen Transition)",
        trigger: "Mount (Otomatik)",
        delayMs: 0,
        durationMs: "200 ms",
        easing: "easeOut",
        properties: ["opacity: 0 → 1", "scale: 0.98 → 1.0"],
        description: "Ekranlar arası yumuşak pürüzsüz geçiş.",
      },
    ],
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const toggleSnippet = (id: string) => {
    setExpandedSnippets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isCollapsed) {
    return (
      <aside className="fixed right-4 top-20 z-40">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          title="Animasyon & Teknik Detaylar Panelini Aç"
          className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all backdrop-blur-md active:scale-95 group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#EF4823] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-medium">Animasyon Detayları</span>
          <PanelRightOpen className="w-4 h-4 text-zinc-400" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-[380px] shrink-0 h-screen bg-[#0E0F14]/95 border-l border-zinc-800/80 flex flex-col z-30 select-none overflow-hidden backdrop-blur-xl">
      {/* 1. Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between gap-3 bg-zinc-950/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#EF4823]/15 border border-[#EF4823]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#EF4823]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5 truncate">
              <span>Animasyon & Teknik</span>
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 truncate">
              <span className="text-[#EF4823] font-medium">{spec.title}</span>
              <span>•</span>
              <span className="text-zinc-500">{spec.category}</span>
            </div>
          </div>
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

      {/* 2. Overview Quick Badges */}
      <div className="p-4 border-b border-zinc-800/60 bg-zinc-900/20 flex flex-col gap-3">
        <p className="text-xs text-zinc-300 leading-relaxed font-normal">
          {spec.summary}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {/* Total Duration */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-2 flex flex-col gap-1">
            <span className="text-zinc-500 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold">
              <Clock className="w-3 h-3 text-[#EF4823]" />
              Toplam Süre
            </span>
            <span className="font-mono font-medium text-white text-xs truncate">
              {spec.totalDurationMs || "Etkileşimli"}
            </span>
          </div>

          {/* Engine / Framework */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-2 flex flex-col gap-1">
            <span className="text-zinc-500 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold">
              <Cpu className="w-3 h-3 text-emerald-400" />
              Engine / GPU
            </span>
            <span className="font-mono font-medium text-emerald-400 text-xs truncate">
              60/120 FPS GPU
            </span>
          </div>
        </div>
      </div>

      {/* 3. Scrollable Breakdown Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {/* Katman & Zamanlama Başlığı */}
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <Layers className="w-3.5 h-3.5 text-[#EF4823]" />
            Katman Zamanlamaları ({spec.steps.length})
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">ms Dökümü</span>
        </div>

        {/* Step Cards List */}
        <div className="space-y-3">
          {spec.steps.map((step, idx) => (
            <div
              key={step.id}
              className="bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 rounded-xl p-3 flex flex-col gap-2.5 transition-colors"
            >
              {/* Step Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-medium text-white text-xs truncate">
                    {step.target}
                  </h4>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EF4823]/10 text-[#EF4823] border border-[#EF4823]/25 shrink-0">
                  {step.trigger}
                </span>
              </div>

              {/* Timing & Easing Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                {step.delayMs !== undefined && (
                  <span className="px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300 border border-zinc-750">
                    Gecikme: <strong className="text-white">+{step.delayMs}ms</strong>
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300 border border-zinc-750">
                  Süre: <strong className="text-white">{step.durationMs}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800/40 text-amber-400 border border-amber-500/20 truncate max-w-[200px]">
                  {step.easing}
                </span>
              </div>

              {/* Properties Transform List */}
              <div className="bg-black/40 border border-zinc-800/50 rounded-lg p-2 font-mono text-[11px] text-zinc-300 space-y-1">
                {step.properties.map((prop, pIdx) => (
                  <div key={pIdx} className="flex items-baseline gap-1.5">
                    <span className="text-[#EF4823] select-none">›</span>
                    <span className="break-all">{prop}</span>
                  </div>
                ))}
              </div>

              {/* Explanation Note */}
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {step.description}
              </p>

              {/* Code Snippet Box (if available) */}
              {step.codeSnippet && (
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                    <button
                      type="button"
                      onClick={() => toggleSnippet(step.id)}
                      className="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <Code2 className="w-3 h-3 text-[#EF4823]" />
                      <span>{expandedSnippets[step.id] ? "Kodu Gizle" : "Framer Motion Konfigürasyonu"}</span>
                      {expandedSnippets[step.id] ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(step.id, step.codeSnippet!)}
                      title="Kodu Kopyala"
                      className="hover:text-white transition-colors cursor-pointer p-0.5"
                    >
                      {copiedCodeId === step.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {expandedSnippets[step.id] && (
                    <pre className="p-2.5 rounded-lg bg-black border border-zinc-800/80 text-[10px] font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-normal">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Micro-interactions section */}
        {spec.microInteractions && spec.microInteractions.length > 0 && (
          <div className="pt-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
              <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
              Dokunsal Etkileşimler (Micro-Interactions)
            </span>

            <div className="space-y-2">
              {spec.microInteractions.map((item, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-2.5 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                      {item.durationMs}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Design / Technical Notes */}
        {spec.notes && spec.notes.length > 0 && (
          <div className="pt-2 border-t border-zinc-800/60">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              Tasarım & Mimari Notları
            </span>
            <ul className="space-y-1.5 text-[11px] text-zinc-400 list-disc list-inside">
              {spec.notes.map((note, nIdx) => (
                <li key={nIdx} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. Footer Status Bar */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Framer Motion v12</span>
        </div>
        <span>Canlı Senkronize</span>
      </div>
    </aside>
  );
}
