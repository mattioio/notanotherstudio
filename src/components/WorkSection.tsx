"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSwipe } from "@/hooks/useSwipe";

export type Project = {
  num: string;
  client: string;
  location: string;
  services: string[];
  images: string[];
};

function EyeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 22 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        color: active ? "#f0c93a" : "rgba(255,255,255,0.2)",
        transform: active ? "scale(1.15)" : "scale(1)",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <path d="M1 7.5C4.5 1.5 17.5 1.5 21 7.5C17.5 13.5 4.5 13.5 1 7.5Z" />
      <circle cx="11" cy="7.5" r="2.8" />
    </svg>
  );
}

interface WorkSectionProps {
  projects: Project[];
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const [active, setActive] = useState(0);
  // pos = position in extended array (1 = first real slide)
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mouseNorm = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const imgs = projects[active].images;
  // Clone-based extended array: [lastClone, ...real, firstClone]
  const extended = imgs.length > 1
    ? [imgs[imgs.length - 1], ...imgs, imgs[0]]
    : imgs;
  const isInfinite = imgs.length > 1;

  // Real index (0-based) for indicators
  const realIndex = isInfinite
    ? ((pos - 1) % imgs.length + imgs.length) % imgs.length
    : 0;

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (imgs.length <= 1) return;
    timerRef.current = setInterval(() => {
      setAnimate(true);
      setPos((p) => p + 1);
    }, 3500);
  }, [imgs.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // After transition to a clone, snap instantly to the real slide
  useEffect(() => {
    if (!isInfinite) return;
    const onEnd = () => {
      if (pos === 0) {
        setAnimate(false);
        setPos(imgs.length);
      } else if (pos === extended.length - 1) {
        setAnimate(false);
        setPos(1);
      }
    };
    const track = trackRef.current;
    const mTrack = mobileTrackRef.current;
    track?.addEventListener("transitionend", onEnd);
    mTrack?.addEventListener("transitionend", onEnd);
    return () => {
      track?.removeEventListener("transitionend", onEnd);
      mTrack?.removeEventListener("transitionend", onEnd);
    };
  }, [pos, imgs.length, extended.length, isInfinite]);

  // Re-enable animation after snap
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [animate]);

  const nextImg = useCallback(() => {
    setAnimate(true);
    setPos((p) => p + 1);
    resetTimer();
  }, [resetTimer]);

  const prevImg = useCallback(() => {
    setAnimate(true);
    setPos((p) => p - 1);
    resetTimer();
  }, [resetTimer]);

  const goTo = useCallback((realIdx: number) => {
    setAnimate(true);
    setPos(realIdx + 1);
    resetTimer();
  }, [resetTimer]);

  const swipe = useSwipe(nextImg, prevImg);

  // Window parallax effect for desktop image panel
  useEffect(() => {
    let raf: number;
    const tick = () => {
      smooth.current.x += (mouseNorm.current.x - smooth.current.x) * 0.04;
      smooth.current.y += (mouseNorm.current.y - smooth.current.y) * 0.04;
      const mx = smooth.current.x - 0.5;
      const my = smooth.current.y - 0.5;
      if (windowRef.current) {
        windowRef.current.style.transform = `translate(${mx * -24}px, ${my * -18}px)`;
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

  const handleMouseEnter = (i: number) => {
    if (i !== active) {
      setAnimate(false);
      setPos(1);
      setActive(i);
    }
  };

  const dragPctMobile = (swipe.dragOffset / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100;
  const dragPctDesktop = (swipe.dragOffset / (typeof window !== "undefined" ? window.innerWidth * 0.52 : 1)) * 100;

  const mobilePct = isInfinite
    ? ((-pos * 100) + dragPctMobile) / extended.length
    : 0;
  const desktopPct = isInfinite
    ? ((-pos * 100) + dragPctDesktop) / extended.length
    : 0;

  return (
    <section id="work" className="relative bg-[#0d0d0d] text-white">
      {/* Grunge texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      {/* ── Header ── */}
      <div className="relative z-10 px-6 md:px-12 pt-24 pb-12 flex items-end justify-between gap-6 flex-wrap border-b border-white/10">
        <h2
          className="syne leading-[1.0] tracking-[-0.03em] fade-up"
          style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
        >
          Work that wins<br />business
        </h2>
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-sm tracking-[0.05em] uppercase no-underline hover:bg-white transition-colors fade-up flex-shrink-0"
        >
          Start a project →
        </a>
      </div>

      {/* ── Body: list left + sticky image right ── */}
      <div className="relative z-10 flex flex-col lg:flex-row">

        {/* Left: project list */}
        <div className="lg:w-[48%] flex flex-col">
          {projects.map(({ num, client, location, services, images }, i) => {
            const projExtended = images.length > 1
              ? [images[images.length - 1], ...images, images[0]]
              : images;

            return (
              <div
                key={num}
                className="group relative border-b border-white/10 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(i)}
              >
                {/* Active indicator bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
                  style={{ background: active === i ? "#f0c93a" : "transparent" }}
                />

                <div className="px-6 md:px-12 py-8 flex items-center gap-6 md:gap-10">
                  {/* Number */}
                  <span
                    className="syne flex-shrink-0 transition-all duration-300 leading-none"
                    style={{
                      fontSize: active === i ? "clamp(32px, 3vw, 48px)" : "clamp(13px, 1.2vw, 16px)",
                      color: active === i ? "#f0c93a" : "rgba(255,255,255,0.25)",
                      minWidth: "48px",
                    }}
                  >
                    {num}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="syne tracking-[-0.02em] leading-tight transition-colors duration-300"
                      style={{
                        fontSize: "clamp(18px, 1.8vw, 26px)",
                        color: active === i ? "#ffffff" : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {client}
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {services.length > 0 ? (
                        services.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 transition-all duration-300"
                            style={{
                              background: active === i ? "rgba(240,201,58,0.15)" : "rgba(255,255,255,0.06)",
                              color: active === i ? "#f0c93a" : "rgba(255,255,255,0.3)",
                            }}
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-white/30 font-medium tracking-wide">
                          {location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Eye icon or CTA button */}
                  {services.length > 0 ? (
                    <EyeIcon active={active === i} />
                  ) : (
                    <a
                      href="#contact"
                      className="flex-shrink-0 text-[11px] font-bold tracking-[0.1em] uppercase no-underline px-4 py-2.5 border transition-all duration-200 whitespace-nowrap"
                      style={{
                        borderColor: active === i ? "#f0c93a" : "rgba(240,201,58,0.35)",
                        color: active === i ? "#f0c93a" : "rgba(240,201,58,0.6)",
                      }}
                    >
                      Get in touch →
                    </a>
                  )}
                </div>

                {/* Mobile: expandable image */}
                <div
                  className="lg:hidden relative overflow-hidden"
                  style={{
                    height: active === i ? "calc((100vw - 48px) * 4 / 5)" : "0",
                    transition: "height 0.4s ease",
                  }}
                  {...(active === i ? swipe.handlers : {})}
                >
                  <div
                    ref={active === i ? mobileTrackRef : undefined}
                    className="flex h-full"
                    style={{
                      width: `${projExtended.length * 100}%`,
                      transform: active === i
                        ? `translateX(${mobilePct}%)`
                        : "translateX(0)",
                      transition: !animate || swipe.dragOffset ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {projExtended.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="relative h-full"
                        style={{ width: `${100 / projExtended.length}%`, flexShrink: 0 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={client} className="w-full h-full object-cover" draggable={false} />
                      </div>
                    ))}
                  </div>
                  {/* Mobile carousel indicators */}
                  {images.length > 1 && (
                    <div
                      className="absolute bottom-4 right-4 flex items-center gap-[6px] z-10 rounded-full px-2.5 py-2"
                      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
                    >
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: active === i && idx === realIndex ? "28px" : "6px",
                            height: "6px",
                            borderRadius: "3px",
                            background: active === i && idx === realIndex ? "#f0c93a" : "rgba(255,255,255,0.5)",
                            flexShrink: 0,
                            transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: sticky image panel — sized to 5:4 images */}
        <div
          className="hidden lg:block lg:w-[52%] sticky top-[72px]"
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "5 / 4" }} {...swipe.handlers}>
            {/* Oversized inner container for Window panning */}
            <div
              ref={windowRef}
              className="absolute"
              style={{
                inset: "-3%",
                width: "106%",
                height: "106%",
                willChange: "transform",
              }}
            >
              {/* Active project images — sliding track */}
              {projects.map(({ client, images }, i) => {
                const isActive = active === i;
                const projExtended = images.length > 1
                  ? [images[images.length - 1], ...images, images[0]]
                  : images;

                return (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div
                      ref={isActive ? trackRef : undefined}
                      className="flex h-full"
                      style={{
                        width: `${projExtended.length * 100}%`,
                        transform: isActive
                          ? `translateX(${desktopPct}%)`
                          : `translateX(${-100 / projExtended.length}%)`,
                        transition: !animate || swipe.dragOffset ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      {projExtended.map((src, idx) => (
                        <div
                          key={`${src}-${idx}`}
                          className="relative h-full"
                          style={{ width: `${100 / projExtended.length}%`, flexShrink: 0 }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={client} className="w-full h-full object-cover" draggable={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel indicators — only when active project has multiple images */}
            {projects[active].images.length > 1 && (
              <div
                className="absolute bottom-6 right-6 flex items-center gap-[6px] z-10 rounded-full px-2.5 py-2"
                style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
              >
                {projects[active].images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Image ${idx + 1}`}
                    style={{
                      width: idx === realIndex ? "28px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: idx === realIndex ? "#f0c93a" : "rgba(255,255,255,0.5)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                      transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
