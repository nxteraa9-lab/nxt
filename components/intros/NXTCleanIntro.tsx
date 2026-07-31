"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NXTCleanIntroProps {
  onComplete: () => void;
}

export function NXTCleanIntro({ onComplete }: NXTCleanIntroProps) {
  const [show, setShow] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Fast Lights Canvas Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Light Sparkles
    const sparks = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: -Math.random() * 1.5 - 0.5,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    let beamPos = width + 200;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial Center Light Glow
      const cx = width / 2;
      const cy = height / 2;
      const radGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, width * 0.45);
      radGlow.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      radGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
      radGlow.addColorStop(1, "rgba(0, 0, 0, 0.98)");
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, width, height);

      // Sweeping Volumetric Light Beam (Right to Left)
      beamPos -= (width / 50);
      if (beamPos < -300) beamPos = width + 200;

      const beamGrad = ctx.createLinearGradient(beamPos, 0, beamPos + 180, height);
      beamGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      beamGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
      beamGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);

      // Light Sparkle Particles
      sparks.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = s.r * 8;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    // Faster Snappy Duration: ~1.9 seconds total
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        onCompleteRef.current();
      }, 350);
    }, 1900);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShow(false);
    setTimeout(() => {
      onCompleteRef.current();
    }, 200);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="nxt-fast-light-intro"
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-black text-white flex items-center justify-center overflow-hidden select-none cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.35, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Light Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-1" />

          {/* Main Container */}
          <div className="relative flex items-center justify-center px-8 py-12 overflow-hidden z-10">
            {/* Fast Entry: Right to Left with Snappy Easing */}
            <motion.div
              initial={{ x: 200, opacity: 0, scale: 0.9, filter: "blur(16px)" }}
              animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1], // Ultra fast snappy spring
              }}
              className="relative flex items-center justify-center"
            >
              {/* Pulsing Light Glow behind NXT */}
              <div className="absolute -inset-10 bg-white/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

              {/* Main Typography: ONLY "NXT" */}
              <h1 className="relative text-7xl sm:text-9xl md:text-[14rem] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] z-10 pl-[0.25em]">
                NXT
              </h1>

              {/* High-Speed Light Beam Sweep over the letters (Right to Left) */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-l from-transparent via-white to-transparent mix-blend-overlay opacity-100"
                initial={{ x: "140%" }}
                animate={{ x: "-140%" }}
                transition={{
                  duration: 1.2,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />

              {/* Intense Neon White Laser Flare */}
              <motion.div
                className="absolute top-[-20%] bottom-[-20%] w-[6px] bg-white shadow-[0_0_35px_15px_rgba(255,255,255,1)] z-30"
                initial={{ x: 300, opacity: 0 }}
                animate={{
                  x: [-300, 300],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
            </motion.div>
          </div>

          {/* Bottom Fast Progress Light Beam */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-950">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_white]"
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
