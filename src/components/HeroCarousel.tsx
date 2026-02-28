"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    src: "https://res.cloudinary.com/dg9wgfyu8/image/upload/v1765641946/markets/markets/market_main_1765641946405_IMG_4909.jpeg.jpg",
    alt: "Market Place Hounslow",
  },
  {
    src: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=900&h=1100&fit=crop",
    alt: "Placeholder project",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1100&fit=crop",
    alt: "Placeholder project",
  },
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

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "#f0c93a" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
