"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  num: string;
  title: string;
  body: string;
}

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress from 0 (top of timeline enters bottom of viewport)
      // to 1 (bottom of timeline reaches center of viewport)
      const start = vh;
      const end = vh * 0.3;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end + rect.height)));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stepProgress = (i: number) => {
    const stepStart = i / steps.length;
    const stepEnd = (i + 0.5) / steps.length;
    return Math.max(0, Math.min(1, (progress - stepStart) / (stepEnd - stepStart)));
  };

  return (
    <div ref={containerRef} className="flex flex-col relative">
      {/* Base timeline line (grey) */}
      <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-black/8 rounded-full" />

      {/* Filled timeline line (gold, grows with scroll) */}
      <div
        className="absolute left-[9px] top-3 w-[2px] bg-[#f0c93a] rounded-full origin-top"
        style={{
          height: `calc(100% - 24px)`,
          transform: `scaleY(${progress})`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {steps.map(({ num, title, body }, i) => {
        const sp = stepProgress(i);
        const active = sp > 0.3;

        return (
          <div
            key={num}
            className="relative grid gap-5 py-6 pl-11"
            style={{ gridTemplateColumns: "1fr" }}
          >
            {/* Timeline dot — centered on the 2px line at left-[10px] */}
            <div
              className="absolute top-[27px] w-[20px] h-[20px] rounded-full border-[3px] z-10"
              style={{
                left: "0px",
                background: active ? "#f0c93a" : "#e0ddd6",
                borderColor: "#f0ede6",
                transform: active ? "scale(1.2)" : "scale(1)",
                transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />

            <div
              style={{
                opacity: active ? 1 : 0.4,
                transform: active ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b6b6b] mb-1.5">{num}</div>
              <div className="syne font-bold text-[22px] tracking-[-0.02em] mb-1.5">{title}</div>
              <p className="text-sm text-[#6b6b6b] leading-[1.6] font-light">{body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
