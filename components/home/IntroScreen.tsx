"use client";

import { useState } from "react";
import { EtmamCleanIntro } from "@/components/intros/EtmamCleanIntro";

export function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const [showIntro, setShowIntro] = useState(true);

  const handleComplete = () => {
    setShowIntro(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!showIntro) return null;

  return <EtmamCleanIntro onComplete={handleComplete} />;
}
