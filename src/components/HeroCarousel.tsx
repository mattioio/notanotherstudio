"use client";

import { useState, useEffect, useRef } from "react";

interface HeroCarouselProps {
  images?: string[];
}

const defaultImages = [
  "/images/commercial-property/banner1.jpeg",
  "/images/commercial-property/banner2.jpeg",
  "/images/commercial-property/banner3.jpeg",
  "/images/commercial-property/banner4.jpeg",
];

export default function HeroCarousel({ images = defaultImages }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });

  // Auto-advance slides
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  // Window parallax effect
  useEffect(() => {
    let raf: number;
    const tick = () => {
      smooth.current.x += (mouseNorm.current.x - smooth.current.x) * 0.04;
      smooth.current.y += (mouseNorm.current.y - smooth.current.y) * 0.04;
      const mx = smooth.current.x - 0.5;
      const my = smooth.current.y - 0.5;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mx * -24}px, ${my * -18}px)`;
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
    <div className="absolute inset-0 overflow-hidden">
      {/* Oversized inner container for Window panning */}
      <div
        ref={innerRef}
        className="absolute"
        style={{
          inset: "-7.5%",
          width: "115%",
          height: "115%",
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
      <div className="absolute bottom-7 right-7 flex items-center gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "48px" : "8px",
              height: "10px",
              background: i === current ? "#f0c93a" : "rgba(255,255,255,0.7)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              transition: "width 0.35s ease, background 0.35s ease",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
