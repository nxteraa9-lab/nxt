"use client";

import { useState } from "react";
import { NXTCleanIntro } from "@/components/intros/NXTCleanIntro";

export function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const [showIntro, setShowIntro] = useState(true);

  const handleComplete = () => {
    setShowIntro(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!showIntro) return null;

  return <NXTCleanIntro onComplete={handleComplete} />;
}
