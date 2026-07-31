"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface NXTLuxuryIntroProps {
  onComplete: () => void;
}

// Sub-bass sound synthesizer for deep luxury impact
function playLuxurySubBassHit(freq = 38, duration = 3.2) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      95,
      ctx.currentTime + duration * 0.6
    );

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

export function NXTLuxuryIntro({ onComplete }: NXTLuxuryIntroProps) {
  const [phase, setPhase] = useState<"ignite" | "reveal" | "tagline" | "exit">(
    "ignite"
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas Particle & Golden/Chrome Ray System
  useEffect(() => {
    playLuxurySubBassHit();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Floating Particles
    const particleCount = Math.min(Math.floor(width / 10), 85);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.7 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.04 + 0.01,
      isGold: Math.random() > 0.4,
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Radial Gold Ambient Glow
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.65);
      gradient.addColorStop(0, "rgba(217, 119, 6, 0.12)");
      gradient.addColorStop(0.35, "rgba(245, 158, 11, 0.04)");
      gradient.addColorStop(1, "rgba(3, 3, 3, 0.98)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotating Geometry Rays
      angle += 0.0025;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.025)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 8) * width,
          Math.sin((i * Math.PI) / 8) * width
        );
        ctx.stroke();
      }
      ctx.restore();

      // Render Floating Dust Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * 0.002) * p.pulse;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) p.x = Math.random() * width;

        const color = p.isGold
          ? `rgba(245, 158, 11, ${Math.max(0.15, Math.min(0.85, p.opacity))})`
          : `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.8, p.opacity))})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = p.isGold
          ? "rgba(245, 158, 11, 0.6)"
          : "rgba(255, 255, 255, 0.4)";
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Timeline Sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1100);
    const t2 = setTimeout(() => setPhase("tagline"), 2600);
    const t3 = setTimeout(() => setPhase("exit"), 4600);
    const t4 = setTimeout(() => {
      onCompleteRef.current();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkip = () => {
    setPhase("exit");
    setTimeout(() => {
      onCompleteRef.current();
    }, 350);
  };

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="nxt-luxury-intro"
          className="fixed inset-0 z-[99999] bg-[#030303] text-white overflow-hidden select-none flex items-center justify-center font-sans"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Canvas Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,3,3,0.92)_100%)] pointer-events-none z-1" />

          {/* Decorative Ambient Lines */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-12 pointer-events-none opacity-25 z-2">
            <div className="w-40 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
            <div className="w-40 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
          </div>

          {/* ── CENTRAL BRAND EXPERIENCE ── */}
          <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 max-w-2xl mx-auto">
            {/* Logo Crest Seal */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_60px_rgba(245,158,11,0.25)]">
                {/* Rotating Golden Rim */}
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-dashed border-amber-400/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Main NXT Brand Logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="NXT"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/intro.png";
                  }}
                  className="w-16 h-16 sm:w-22 sm:h-22 object-contain invert drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]"
                />
              </div>
            </motion.div>

            {/* NXT Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
              animate={{
                opacity: phase !== "ignite" ? 1 : 0.4,
                y: phase !== "ignite" ? 0 : 15,
                filter: phase !== "ignite" ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                NXT ERA
              </h1>

              {/* Sub-brand tag */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{
                  opacity: phase === "reveal" || phase === "tagline" ? 1 : 0,
                  letterSpacing:
                    phase === "reveal" || phase === "tagline"
                      ? "0.45em"
                      : "0.2em",
                }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase pt-1"
              >
                NXT LUXURY FASHION
              </motion.div>
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: phase === "tagline" ? 1 : 0,
                y: phase === "tagline" ? 0 : 10,
              }}
              transition={{ duration: 0.8 }}
              className="mt-6 flex items-center justify-center gap-3 text-zinc-400 text-xs sm:text-sm"
            >
              <span className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
              <span className="font-semibold tracking-[0.3em] uppercase text-zinc-300">
                THE FUTURE OF HIGH-END FASHION
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
            </motion.div>
          </div>

          {/* Top Brand Tag */}
          <div className="absolute top-8 left-8 z-20 flex items-center gap-2 text-amber-400/80 text-[11px] font-mono tracking-widest uppercase">
            <Sparkles size={13} className="text-amber-400 animate-spin" />
            <span>NXT • OFFICIAL EXPERIENCE</span>
          </div>

          {/* Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 text-white text-xs font-bold tracking-wider backdrop-blur-xl transition-all active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <span>تخطي</span>
            <ArrowRight size={14} />
          </button>

          {/* Bottom Golden Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 via-white to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.2, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
