"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSwipe } from "@/hooks/useSwipe";

interface HeroCarouselProps {
  images?: string[];
}

const defaultImages = [
  "/images/commercial-property/banner1.jpg",
  "/images/commercial-property/banner2.jpg",
  "/images/commercial-property/banner3.jpg",
  "/images/commercial-property/banner4.jpg",
];

export default function HeroCarousel({ images = defaultImages }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
  }, [images.length]);

  // Auto-advance slides
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i);
      resetTimer();
    },
    [resetTimer],
  );

  const next = useCallback(() => {
    setCurrent((prev) => { const n = (prev + 1) % images.length; return n; });
    resetTimer();
  }, [images.length, resetTimer]);

  const prev = useCallback(() => {
    setCurrent((prev) => { const n = (prev - 1 + images.length) % images.length; return n; });
    resetTimer();
  }, [images.length, resetTimer]);

  const swipe = useSwipe(next, prev);

  // Window parallax effect
  useEffect(() => {
    let raf: number;
    const tick = () => {
      smooth.current.x += (mouseNorm.current.x - smooth.current.x) * 0.04;
      smooth.current.y += (mouseNorm.current.y - smooth.current.y) * 0.04;
      const mx = smooth.current.x - 0.5;
      const my = smooth.current.y - 0.5;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mx * -10}px, ${my * -8}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouseNorm.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" {...swipe}>
      {/* Oversized inner container for Window panning */}
      <div
        ref={innerRef}
        className="absolute"
        style={{
          inset: "-3%",
          width: "106%",
          height: "106%",
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{ opacity: i === current ? 1 : 0, transition: "opacity 0.8s ease" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Not Another Studio — project work" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-12 md:bottom-6 right-6 flex items-center gap-[6px] z-10 rounded-full px-2.5 py-2"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#f0c93a" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
