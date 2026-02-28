"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "rotate(-6deg) scale(0.85)",
    opacity: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // How far through the viewport (0 = just entered bottom, 1 = left top)
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));

      // Entry: scale up + rotate into place
      const scale = 0.85 + progress * 0.15;
      const opacity = Math.min(1, progress * 2);

      // Scroll-driven tilt: base -6deg, oscillates slightly with scroll
      const scrollY = window.scrollY;
      const tilt = -6 + Math.sin(scrollY * 0.003) * 3;

      setStyle({
        transform: `rotate(${tilt}deg) scale(${scale})`,
        opacity,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 w-[200px] h-[200px] bg-[#0d0d0d] flex flex-col items-center justify-center text-center text-white"
      style={{
        ...style,
        transition: "opacity 0.4s ease",
        willChange: "transform",
      }}
    >
      <span className="syne text-[48px] leading-none text-[#f0c93a]">2–6</span>
      <span className="text-[11px] font-bold tracking-[0.1em] uppercase mt-1">Weeks to launch</span>
    </div>
  );
}
