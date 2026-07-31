"use client";

import { useState, useEffect } from "react";
import { NXTLuxuryIntro } from "@/components/intros/NXTLuxuryIntro";

export function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has already been seen in this session
    const seen = sessionStorage.getItem("nxt-intro-seen");
    if (!seen) {
      setShowIntro(true);
    } else if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const handleComplete = () => {
    sessionStorage.setItem("nxt-intro-seen", "true");
    setShowIntro(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!showIntro) return null;

  return <NXTLuxuryIntro onComplete={handleComplete} />;
}
