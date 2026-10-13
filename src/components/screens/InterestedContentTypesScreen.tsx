"use client";

import React, { useState, useRef } from "react";
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
  // Seçili olanlar (default olarak boş başlar, tıklandıkça turuncu olur, tekrar tıklanınca beyaz olur)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Carousel offset: 3 numaralı indeks ("Yazarlar") başlangıçta merkezdedir (görseldeki gibi)
  const [offset, setOffset] = useState<number>(3);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startYRef = useRef(0);
  const startOffsetRef = useRef(3);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationControlsRef = useRef<{ stop: () => void } | null>(null);

  // Kutuya tıklanınca: Seçili değilse turuncu yap, turuncu ise varsayılan beyaza çevir
  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isComplete = selectedIds.length >= 3;

  // Dikey sürükleme (Drag / Swipe) yönetimi
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
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
    velocityRef.current = dy / dt; // px / ms
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;

    const totalDy = e.clientY - startYRef.current;
    if (Math.abs(totalDy) > 6) {
      hasDraggedRef.current = true;
    }

    // Her 50px dikey sürükleme 1 kart adımı ilerletir
    const newOffset = startOffsetRef.current - totalDy / 50;
    setOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (hasDraggedRef.current) {
      // Sürükleme bittiğinde atalet hızıyla en yakın karta yay (spring) ile oturur
      const momentum = velocityRef.current * 65;
      const target = Math.round(offset - momentum / 50);

      animationControlsRef.current = animate(offset, target, {
        type: "spring",
        stiffness: 340,
        damping: 28,
        mass: 0.8,
        onUpdate: (latest) => setOffset(latest),
      });
    }
  };

  // Fare tekerleğiyle (wheel) yukarı-aşağı çevirme
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    const dir = e.deltaY > 0 ? 1 : -1;
    const target = Math.round(offset) + dir;

    animationControlsRef.current = animate(offset, target, {
      type: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.8,
      onUpdate: (latest) => setOffset(latest),
    });
  };

  // Karta tıklandığında: Seçimi değiştir (turuncu <-> beyaz) ve kartı merkeze kaydır
  const handleCardClick = (k: number, id: string) => {
    if (hasDraggedRef.current) return;

    toggleItem(id);

    if (animationControlsRef.current) {
      animationControlsRef.current.stop();
    }
    animationControlsRef.current = animate(offset, k, {
      type: "spring",
      stiffness: 360,
      damping: 28,
      mass: 0.8,
      onUpdate: (latest) => setOffset(latest),
    });
  };

  // Kartların dikey katmanlı düz yerleşimi (Bükülme yok, tamamen ön yüzey düz, arkaya doğru scale & opacity ile süzülüş)
  const N = CONTENT_TYPES.length;
  const visibleRange = 3; // Merkez + üstte 3 + altta 3 kart (toplam 7 kart)
  const centerFloor = Math.floor(offset);
  const cards = [];

  for (let k = centerFloor - visibleRange; k <= centerFloor + visibleRange; k++) {
    const itemIndex = ((k % N) + N) % N;
    const item = CONTENT_TYPES[itemIndex];
    const delta = k - offset;
    const absD = Math.abs(delta);
    if (absD > 3.6) continue;

    // Dikey kaydırma konumu (aralıkları daha açık: ~62px adım)
    const y = delta * 62;

    // Boyut küçülmesi (arkaya doğru derinlik hissi)
    const scale = Math.max(0.72, 1 - absD * 0.075);

    // Görseldeki gibi arkaya doğru azalan opacity
    let opacity = 0;
    if (absD < 1) {
      opacity = 1 - absD * 0.12;
    } else if (absD < 2) {
      opacity = 0.88 - (absD - 1) * 0.28;
    } else if (absD < 3.5) {
      opacity = Math.max(0, 0.60 - (absD - 2) * 0.24);
    }

    // Merkezdeki kart daima en üstte (z: 50), uzaklaştıkça arkaya girer
    const zIndex = Math.max(1, 50 - Math.round(absD * 10));
    const isSelected = selectedIds.includes(item.id);

    cards.push({
      k,
      item,
      y,
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

      {/* 3. Headline Area (Üstüne 30px boşluk eklendi) */}
      <div className="px-6 pt-[30px] pb-2 text-center z-20 shrink-0">
        <h1 className="text-[28px] sm:text-[30px] font-normal leading-[1.2] text-[#111111] tracking-tight">
          Hangi içerik türleri
          <br />
          ilgini çekiyor?
        </h1>
        <p className="text-sm font-normal text-[#111111]/70 mt-1.5">
          En az üç adet içerik türü seç.
        </p>
      </div>

      {/* 4. Katmanlı Dikey Carousel Çarkı - Başlık ile Devam Butonu Arasında Tam Ortalanmış */}
      <div className="flex-1 w-full relative flex items-center justify-center pb-[96px] overflow-hidden select-none z-10">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          {cards.map((card) => {
            const IconComp = card.item.icon;

            return (
              <div
                key={card.k}
                onClick={() => handleCardClick(card.k, card.item.id)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate3d(-50%, calc(-50% + ${card.y}px), 0) scale(${card.scale})`,
                  opacity: card.opacity,
                  zIndex: card.zIndex,
                  transformOrigin: "center center",
                }}
                className="w-[310px] max-w-[88%] cursor-pointer transition-[box-shadow,background-color] duration-150"
              >
                <div
                  className={`w-full h-[60px] sm:h-[64px] rounded-full px-6 flex items-center gap-4 select-none transition-all duration-200 ${
                    card.isSelected
                      ? "bg-[#EF4823] text-white shadow-[0_8px_25px_rgba(239,72,35,0.35)]"
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
