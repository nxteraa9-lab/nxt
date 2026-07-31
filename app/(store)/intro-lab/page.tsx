"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NXTLuxuryIntro } from "@/components/intros/NXTLuxuryIntro";

export default function IntroLabPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-8 font-sans">
      {playing && (
        <NXTLuxuryIntro
          onComplete={() => setPlaying(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-6 max-w-sm border border-white/10 bg-black/60 p-8 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.08)]"
      >
        <div className="flex flex-col items-center justify-center gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="NXT" className="h-10 invert drop-shadow-[0_0_15px_white]" />
          <span className="text-3xl font-black tracking-[0.3em] text-white">NXT ERA</span>
          <span className="text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase">THE FUTURE OF LUXURY FASHION</span>
        </div>

        <p className="text-zinc-400 text-xs leading-relaxed">
          معاينة الانترو السينمائي الفاخر لبراند NXT (مؤثرات بصريّة، جزيئات ضوئيّة، إضاءة ليزر وصوتية)
        </p>

        <button
          onClick={() => setPlaying(true)}
          className="inline-flex items-center justify-center gap-2 bg-white text-black font-extrabold text-sm px-8 py-3.5 rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer w-full"
        >
          <Play size={16} fill="black" />
          معاينة انترو NXT الآن
        </button>

        <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10">
          <button
            onClick={() => { sessionStorage.removeItem("nxt-intro-seen"); window.location.href = "/"; }}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            إعادة تعيين وتشغيل بالموقع
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs transition-colors"
          >
            <ArrowLeft size={13} />
            العودة للمتجر
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
