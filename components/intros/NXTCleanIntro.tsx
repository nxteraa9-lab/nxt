"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NXTCleanIntroProps {
  onComplete: () => void;
}

export function NXTCleanIntro({ onComplete }: NXTCleanIntroProps) {
  const [show, setShow] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Total duration: ~2.8 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        onCompleteRef.current();
      }, 500); // Allow exit animation
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShow(false);
    setTimeout(() => {
      onCompleteRef.current();
    }, 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="nxt-clean-intro"
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-black text-white flex items-center justify-center overflow-hidden select-none cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Main Container */}
          <div className="relative flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Sliding Container: Right to Left (من اليمين إلى الشمال) */}
            <motion.div
              initial={{ x: 180, opacity: 0, filter: "blur(12px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1], // Smooth spring physics ease
              }}
              className="flex flex-col items-center text-center space-y-3"
            >
              {/* Brand Name NXT ERA in Crisp Pure White */}
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.2em] text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                NXT ERA
              </h1>

              {/* Sub-text in Subtle Crisp White */}
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 0.85, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base font-extrabold tracking-[0.45em] text-zinc-300 uppercase"
              >
                THE FUTURE OF FASHION
              </motion.span>
            </motion.div>
          </div>

          {/* Minimal Bottom Line Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900">
            <motion.div
              className="h-full bg-white shadow-[0_0_10px_white]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
