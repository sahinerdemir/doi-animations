"use client";

import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "@/components/splash/StatusBar";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Headphones,
  Clapperboard,
  Users,
  Radio,
  Mic,
  Video,
} from "lucide-react";
import { animate } from "framer-motion";

interface InterestedContentTypesScreenProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

const CONTENT_TYPES = [
  { id: "e-kitaplar", label: "E-Kitaplar", icon: BookOpen },
  { id: "sesli-kitaplar", label: "Sesli Kitaplar", icon: Headphones },
  { id: "belgeseller", label: "Belgeseller", icon: Clapperboard },
  { id: "yazarlar", label: "Yazarlar", icon: Users },
  { id: "radyo-tiyatrolari", label: "Radyo Tiyatroları", icon: Radio },
  { id: "podcastler", label: "Podcastler", icon: Mic },
  { id: "egitim-videolari", label: "Eğitim Videoları", icon: Video },
];

export function InterestedContentTypesScreen({
  onBack,
  onNext,
  onSkip,
}: InterestedContentTypesScreenProps) {
  // Pre-selected from Figma / screenshot reference
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "sesli-kitaplar",
    "yazarlar",
    "radyo-tiyatrolari",
  ]);

  // Carousel offset: index 3 is "Yazarlar" (centered initially as in screenshot)
  const [offset, setOffset] = useState<number>(3);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startOffsetRef = useRef(3);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationControlsRef = useRef<{ stop: () => void } | null>(null);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isComplete = selectedIds.length >= 3;

  // Pointer drag handling for 3D wheel rotation
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startOffsetRef.current = offset;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dy = e.clientY - lastYRef.current;
    velocityRef.current = dy / dt; // px per ms
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;

    const totalDy = e.clientY - startYRef.current;
    // 70px drag corresponds to 1 carousel notch
    const newOffset = startOffsetRef.current - totalDy / 70;
    setOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    // Snap with velocity inertia to nearest notch
    const momentum = velocityRef.current * 70;
    const target = Math.round(offset - momentum / 70);

    animationControlsRef.current = animate(offset, target, {
      type: "spring",
      stiffness: 320,
      damping: 28,
      mass: 0.8,
      onUpdate: (latest) => setOffset(latest),
    });
  };

  // Mouse wheel handling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    const dir = e.deltaY > 0 ? 1 : -1;
    const target = Math.round(offset) + dir;

    animationControlsRef.current = animate(offset, target, {
      type: "spring",
      stiffness: 340,
      damping: 28,
      mass: 0.8,
      onUpdate: (latest) => setOffset(latest),
    });
  };

  // Click on a pill: toggle selection & snap to center if clicked off-center
  const handleCardClick = (k: number, id: string) => {
    const dragDistance = Math.abs(offset - startOffsetRef.current);
    if (dragDistance > 0.12) return; // Ignore clicks if it was a drag gesture

    toggleItem(id);

    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    animationControlsRef.current = animate(offset, k, {
      type: "spring",
      stiffness: 340,
      damping: 28,
      mass: 0.8,
      onUpdate: (latest) => setOffset(latest),
    });
  };

  // Calculate 3D cylindrical drum positions for visible items
  const N = CONTENT_TYPES.length;
  const visibleRange = 3; // -3 to +3 (7 visible items in total)
  const centerFloor = Math.floor(offset);
  const cards = [];

  for (let k = centerFloor - visibleRange; k <= centerFloor + visibleRange; k++) {
    const itemIndex = ((k % N) + N) % N;
    const item = CONTENT_TYPES[itemIndex];
    const delta = k - offset;
    const stepAngle = 22.5; // degrees per notch
    const alpha = delta * stepAngle;
    if (Math.abs(alpha) > 85) continue;

    const rad = (alpha * Math.PI) / 180;
    const R = 210; // radius of cylindrical drum
    const y = R * Math.sin(rad);
    const z = -R * (1 - Math.cos(rad));
    const rotateX = -alpha;
    const scale = Math.max(0.62, Math.pow(Math.cos(rad), 0.55));
    const opacity = Math.max(0, Math.pow(Math.cos(rad), 1.7));
    const zIndex = Math.round(100 * Math.cos(rad));
    const isSelected = selectedIds.includes(item.id);

    cards.push({
      k,
      item,
      y,
      z,
      rotateX,
      scale,
      opacity,
      zIndex,
      isSelected,
    });
  }

  return (
    <div className="relative w-full h-full bg-[#F4F4F6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Status Bar (30px reserved placeholder) */}
      <StatusBar className="z-20" />

      {/* 2. Top Navigation */}
      <div className="px-6 pt-3 pb-1 flex items-center justify-between z-20 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span>GERİ</span>
        </button>

        <button
          type="button"
          onClick={onSkip || onNext}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-70 transition-opacity"
        >
          <span>GEÇ</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* 3. Headline Area */}
      <div className="px-6 pt-1 pb-2 text-center z-20 shrink-0">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          Hangi içerik türleri
          <br />
          ilgini çekiyor?
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-1.5">
          En az üç adet içerik türü seç.
        </p>
      </div>

      {/* 4. 3D Cylindrical Vertical Wheel Carousel */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative flex-1 w-full flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing touch-none z-10 -my-3"
        style={{ perspective: 1200 }}
      >
        {cards.map((card) => {
          const IconComp = card.item.icon;

          return (
            <div
              key={card.k}
              onClick={() => handleCardClick(card.k, card.item.id)}
              style={{
                position: "absolute",
                transform: `translate3d(0, ${card.y}px, ${card.z}px) rotateX(${card.rotateX}deg) scale(${card.scale})`,
                opacity: card.opacity,
                zIndex: card.zIndex,
                transformOrigin: "center center",
              }}
              className="w-[305px] max-w-[86%] cursor-pointer transition-[background-color,border-color,box-shadow] duration-200"
            >
              <div
                className={`w-full h-16 rounded-full px-6 flex items-center gap-4 transition-all duration-200 select-none ${
                  card.isSelected
                    ? "bg-[#EF4823] text-white shadow-[0_8px_25px_rgba(239,72,35,0.32)]"
                    : "bg-white text-[#111111] shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-black/[0.04] hover:bg-white/95"
                }`}
              >
                <IconComp
                  className={`w-6 h-6 stroke-[1.9] shrink-0 ${
                    card.isSelected ? "text-white" : "text-[#EF4823]"
                  }`}
                />

                <span className="text-[17px] font-semibold tracking-tight truncate flex-1 text-left">
                  {card.item.label}
                </span>

                {card.isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-white stroke-[2.2] shrink-0 ml-auto" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Floating Bottom Navigation Bar (Step 2 active) */}
      <div className="absolute bottom-6 inset-x-6 z-30 pointer-events-auto">
        <div className="w-full h-15 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/60 px-6 flex items-center justify-between">
          {/* 4 Step Dashes (Step 1 & 2 active) */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#EF4823]" />
            <div className="w-6 h-1.5 rounded-full bg-[#D1D1D6]" />
            <div className="w-6 h-1.5 rounded-full bg-[#D1D1D6]" />
          </div>

          {/* Devam Button */}
          <button
            type="button"
            onClick={onNext}
            className={`flex items-center gap-2 text-sm sm:text-[15px] font-medium transition-all ${
              isComplete
                ? "text-[#111111] font-semibold hover:text-[#EF4823]"
                : "text-[#777777] opacity-60"
            }`}
          >
            <span>Devam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
