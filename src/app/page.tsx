"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { ForgotPasswordScreen } from "@/components/screens/ForgotPasswordScreen";
import { AreasOfInterestScreen } from "@/components/screens/AreasOfInterestScreen";
import { InterestedContentTypesScreen } from "@/components/screens/InterestedContentTypesScreen";
import { ContentsScreen } from "@/components/screens/ContentsScreen";
import { PersonalizationScreen } from "@/components/screens/PersonalizationScreen";
import { PersonalizationDoneScreen } from "@/components/screens/PersonalizationDoneScreen";
import { RegisterNonKonyaScreen } from "@/components/screens/RegisterNonKonyaScreen";
import { RegisterKonyaliStep4Screen } from "@/components/screens/RegisterKonyaliStep4Screen";
import { RegisterKonyaliStep5Screen } from "@/components/screens/RegisterKonyaliStep5Screen";
import { MembershipPlansScreen } from "@/components/screens/MembershipPlansScreen";
import { DeviceFrame } from "@/components/common/DeviceFrame";
import { SidebarTree } from "@/components/navigation/SidebarTree";
import { PageNode } from "@/types/navigation";
import { motion, AnimatePresence } from "framer-motion";

const REFERENCE_IMAGES: Record<string, string> = {
  "splash-screen": "/images/splash-screen-reference.png",
  "login": "/images/login-screen-reference.png",
  "areas-of-interest": "/images/figma-refs/ref-areas-of-interest.png",
  "interested-content-types": "/images/figma-refs/ref-content-types.png",
  "contents": "/images/figma-refs/ref-contents.png",
  "personalization": "/images/figma-refs/ref-personalization.png",
  "personalization-done": "/images/figma-refs/ref-personalization-done.png",
  "register-non-konya": "/images/figma-refs/ref-register-non-konya.png",
  "register-konyali-step4": "/images/figma-refs/ref-register-konyali-step4.png",
  "register-konyali-step5": "/images/figma-refs/ref-register-konyali-step5.png",
  "membership-plans": "/images/figma-refs/ref-membership-plans.png",
  "forgot-password": "/images/figma-refs/ref-forgot-password-step1.png",
};

export default function HomePage() {
  const [selectedPageId, setSelectedPageId] = useState<string>("splash-screen");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navigateTo = (pageId: string, toast?: string) => {
    setSelectedPageId(pageId);
    if (toast) showToast(toast);
  };

  const renderCurrentScreen = () => {
    switch (selectedPageId) {
      case "splash-screen":
        return (
          <SplashScreen
            onStart={() => navigateTo("areas-of-interest", "İlgi alanları ekranına geçildi.")}
            onLogin={() => navigateTo("login", "Giriş ekranına geçildi.")}
            showStatusBar={true}
          />
        );

      case "login":
        return (
          <LoginScreen
            onClose={() => navigateTo("splash-screen")}
            onForgotPassword={() => navigateTo("forgot-password")}
            onRegister={() => navigateTo("register-non-konya")}
            onGuest={() => navigateTo("areas-of-interest")}
            onSuccess={() => navigateTo("personalization-done", "Başarıyla giriş yapıldı!")}
          />
        );

      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onBack={() => navigateTo("login")}
            onSuccess={() => navigateTo("login", "Şifreniz güncellendi, giriş yapabilirsiniz.")}
          />
        );

      case "areas-of-interest":
        return (
          <AreasOfInterestScreen
            onBack={() => navigateTo("splash-screen")}
            onNext={() => navigateTo("interested-content-types")}
            onSkip={() => navigateTo("interested-content-types")}
          />
        );

      case "interested-content-types":
        return (
          <InterestedContentTypesScreen
            onBack={() => navigateTo("areas-of-interest")}
            onNext={() => navigateTo("contents")}
            onSkip={() => navigateTo("contents")}
          />
        );

      case "contents":
        return (
          <ContentsScreen
            onBack={() => navigateTo("interested-content-types")}
            onNext={() => navigateTo("personalization")}
            onSkip={() => navigateTo("personalization")}
          />
        );

      case "personalization":
        return (
          <PersonalizationScreen
            onComplete={() => navigateTo("personalization-done", "Kişiselleştirme tamamlandı!")}
          />
        );

      case "personalization-done":
        return (
          <PersonalizationDoneScreen
            onJoin={() => navigateTo("membership-plans")}
            onExplore={() => navigateTo("membership-plans")}
          />
        );

      case "register-non-konya":
        return (
          <RegisterNonKonyaScreen
            onBack={() => navigateTo("login")}
            onSelectKonya={() => navigateTo("register-konyali-step4", "Konya 1 Yıl Ücretsiz Fırsatı!")}
            onSuccess={() => navigateTo("membership-plans", "Kaydınız tamamlandı!")}
          />
        );

      case "register-konyali-step4":
        return (
          <RegisterKonyaliStep4Screen
            onBack={() => navigateTo("register-non-konya")}
            onNext={() => navigateTo("register-konyali-step5", "KMK üyeliğiniz doğrulandı!")}
            onKmkLogin={() => navigateTo("register-konyali-step5")}
          />
        );

      case "register-konyali-step5":
        return (
          <RegisterKonyaliStep5Screen
            onBack={() => navigateTo("register-konyali-step4")}
            onSuccess={() => navigateTo("personalization-done", "1 Yıllık ücretsiz aboneliğiniz başladı!")}
          />
        );

      case "membership-plans":
        return (
          <MembershipPlansScreen
            onBack={() => navigateTo("personalization-done")}
            onSuccess={() => navigateTo("splash-screen", "7 Günlük deneme süreniz başladı!")}
            onSkip={() => navigateTo("splash-screen")}
          />
        );

      default:
        return (
          <SplashScreen
            onStart={() => navigateTo("areas-of-interest")}
            onLogin={() => navigateTo("login")}
          />
        );
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-[#0A0B0E]">
      {/* 1. Left Vertical Site Tree Sidebar */}
      <SidebarTree
        selectedPageId={selectedPageId}
        onSelectPage={(page: PageNode) => {
          setSelectedPageId(page.id);
          showToast(`'${page.title}' ekranına geçildi.`);
        }}
      />

      {/* 2. Center Viewport with Scaled Mockup & Top-Right Fullscreen / Compare Controls */}
      <DeviceFrame
        referenceImage={REFERENCE_IMAGES[selectedPageId]}
        pageTitle={selectedPageId}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPageId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>

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
