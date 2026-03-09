"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HeroPanel({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    // Mobile: card is static, no animation needed
    if (window.innerWidth < 768) return;

    // Desktop: slide-in from left on load, then hand off to parent for scroll-out
    const onEnd = () => {
      el.classList.remove("hero-panel-enter");
      el.style.transform = "translateX(0)";
      el.style.opacity = "1";
    };
    el.addEventListener("animationend", onEnd, { once: true });

    return () => {
      el.removeEventListener("animationend", onEnd);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="w-full md:w-auto md:max-w-[540px] px-5 py-5 md:px-10 md:py-12 rounded-t-2xl md:rounded-2xl hero-panel-enter"
      style={{
        background: "rgba(245, 243, 239, 0.55)",
        backdropFilter: "blur(40px) saturate(1.4)",
        WebkitBackdropFilter: "blur(40px) saturate(1.4)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.12)",
      }}
    >
      {children}
    </div>
  );
}
