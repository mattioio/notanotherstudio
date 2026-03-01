"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/images/banner1.jpeg", alt: "Not Another Studio — project work" },
  { src: "/images/banner2.jpeg", alt: "Not Another Studio — project work" },
  { src: "/images/banner3.jpeg", alt: "Not Another Studio — project work" },
  { src: "/images/banner4.jpeg", alt: "Not Another Studio — project work" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-7 right-7 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "48px" : "8px",
              height: "6px",
              background: i === current ? "#f0c93a" : "rgba(255,255,255,0.7)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              transition: "width 0.35s ease, background 0.35s ease",
              borderRadius: "3px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
