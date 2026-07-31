"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisitorSession } from "@/lib/firebase/firestore";

function getOrGenerateId(key: string, prefix: string, storage: Storage): string {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

function detectDevice(): "Mobile" | "Desktop" | "Tablet" {
  if (typeof window === "undefined" || !navigator) return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

function detectBrowser(): string {
  if (typeof window === "undefined" || !navigator) return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
  return "أخرى";
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Avoid tracking inside admin panel pages
    if (pathname && pathname.startsWith("/admin")) return;

    if (typeof window === "undefined") return;

    const visitorId = getOrGenerateId("nxt_visitor_id", "v", localStorage);
    const sessionId = getOrGenerateId("nxt_session_id", "s", sessionStorage);
    const device = detectDevice();
    const browser = detectBrowser();

    const isNewPage = lastPathRef.current !== pathname;
    lastPathRef.current = pathname;

    // Track immediately on mount / route change
    trackVisitorSession({
      sessionId,
      visitorId,
      currentPage: pathname || "/",
      device,
      browser,
      isNewPageView: isNewPage,
    });

    // Send periodic heartbeat every 30s to keep session alive as "Active Now"
    const interval = setInterval(() => {
      trackVisitorSession({
        sessionId,
        visitorId,
        currentPage: window.location.pathname || "/",
        device,
        browser,
        isNewPageView: false,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
