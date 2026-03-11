"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useSwipe } from "@/hooks/useSwipe";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";

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
  const { extended, pos, realIndex, animate, trackRef, goTo, next, prev } =
    useInfiniteCarousel(images);
  const swipe = useSwipe(next, prev);

  const innerRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });

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

  const dragPct = (swipe.dragOffset / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100;
  const translatePct = ((-pos * 100) + dragPct) / extended.length;

  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      style={{ cursor: swipe.dragOffset ? "grabbing" : "grab" }}
      {...swipe.handlers}
    >
      <div
        ref={innerRef}
        className="absolute"
        style={{ inset: "-3%", width: "106%", height: "106%", willChange: "transform" }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${extended.length * 100}%`,
            transform: `translateX(${translatePct}%)`,
            transition: !animate || swipe.dragOffset ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {extended.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full"
              style={{ width: `${100 / extended.length}%`, flexShrink: 0 }}
            >
              <Image src={src} alt="Not Another Studio — project work" fill sizes="100vw" className="object-cover" draggable={false} priority={i <= 1} />
            </div>
          ))}
        </div>
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
              width: i === realIndex ? "28px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === realIndex ? "#f0c93a" : "rgba(255,255,255,0.5)",
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
