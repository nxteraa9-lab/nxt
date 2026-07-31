"use client";

import { useState, useEffect } from "react";
import { NXTCleanIntro } from "@/components/intros/NXTCleanIntro";

// In-memory session flag: persists during SPA route navigation, resets on browser page reload (F5)
let sessionIntroPlayed = false;

export function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if already played in this JS session
      if (sessionIntroPlayed) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    // Listen for manual trigger event (e.g. from settings or intro lab)
    const handleManualTrigger = () => {
      setShowIntro(true);
    };

    window.addEventListener("nxt_trigger_intro", handleManualTrigger);
    return () => {
      window.removeEventListener("nxt_trigger_intro", handleManualTrigger);
    };
  }, []);

  const handleComplete = () => {
    sessionIntroPlayed = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("nxt_intro_played", "true");
    }
    setShowIntro(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!showIntro) return null;

  return <NXTCleanIntro onComplete={handleComplete} />;
}

