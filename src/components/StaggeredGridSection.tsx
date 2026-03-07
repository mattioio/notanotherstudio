"use client";

import { useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const IMAGES = Array.from({ length: 6 }, (_, i) =>
  `/images/home/home-design-carousel-${i + 1}.jpg`
);

// ── Helpers ──────────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ── Component ────────────────────────────────────────────────────────────────

export default function StaggeredGridSection() {
  const secRef = useRef<HTMLElement>(null);

  const items = useRef<(HTMLElement | null)[]>([]);
  const wraps = useRef<(HTMLDivElement | null)[]>([]);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    let raf = 0;

    const tick = () => {
      const vh = window.innerHeight;

      // ── Grid items: 3-D scroll transforms ──────────────────────────
      for (let i = 0; i < 6; i++) {
        const el = items.current[i];
        const w = wraps.current[i];
        const im = imgs.current[i];
        if (!el || !w) continue;

        const r = el.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
        const L = i % 2 === 0;
        const s = L ? 1 : -1;

        if (p <= 0.5) {
          // Entering from below
          const t = p * 2;
          const e = 1 - (1 - t) ** 3; // ease-out cubic

          w.style.transform =
            `translateY(${lerp(80, 0, e)}%) ` +
            `translateZ(${lerp(200, 0, e)}px) ` +
            `rotateX(${lerp(60, 0, e)}deg) ` +
            `rotateZ(${lerp(s * 4, 0, e)}deg) ` +
            `skewX(${lerp(-s * 14, 0, e)}deg)`;
          w.style.filter =
            `blur(${lerp(5, 0, e)}px) brightness(${lerp(35, 100, e)}%)`;
          w.style.opacity = `${clamp(e * 1.4, 0, 1)}`;
          if (im) im.style.transform = `scaleY(${lerp(1.5, 1, e)})`;
        } else {
          // Leaving toward top
          const t = (p - 0.5) * 2;
          const e = t * t; // ease-in quad

          w.style.transform =
            `translateX(${lerp(0, -s * 12, e)}%) ` +
            `translateZ(${lerp(0, 150, e)}px) ` +
            `rotateX(${lerp(0, -35, e)}deg) ` +
            `rotateZ(${lerp(0, -s * 1, e)}deg) ` +
            `skewX(${lerp(0, s * 6, e)}deg)`;
          w.style.filter =
            `blur(${lerp(0, 3, e)}px) brightness(${lerp(100, 25, e)}%)`;
          w.style.opacity = `${clamp(1 - e * 1.1, 0, 1)}`;
          if (im) im.style.transform = `scaleY(${lerp(1, 1.5, e)})`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={secRef}
      className="relative"
      style={{
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff, var(--nas-white, #f5f3ef))",
        overflow: "clip",
      }}
    >
      <style>{`
        .stagger-grid figure:nth-child(even) { margin-top: 0; }
        @media (min-width: 640px) { .stagger-grid figure:nth-child(even) { margin-top: 22%; } }
      `}</style>
      {/* ── Image grid ── */}
      <div
        className="stagger-grid relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7 px-5 md:px-10"
        style={{ maxWidth: 680, paddingBottom: "16vh", animation: "nas-fade-in 0.8s ease 1s both" }}
      >
        {IMAGES.map((src, i) => (
          <figure
            key={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="relative m-0"
            style={{
              perspective: 800,
            }}
          >
            <div
              ref={(el) => {
                wraps.current[i] = el;
              }}
              className="relative overflow-hidden"
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 6,
                transformStyle: "preserve-3d",
                willChange: "transform, filter, opacity",
              }}
            >
              <div
                ref={(el) => {
                  imgs.current[i] = el;
                }}
                className="absolute will-change-transform"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  inset: 0,
                  top: "-20%",
                  height: "140%",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>
          </figure>
        ))}
      </div>

    </section>
  );
}
