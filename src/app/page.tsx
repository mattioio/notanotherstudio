"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import ScrambleText from "@/components/ScrambleText";
import StaggeredGridSection from "@/components/StaggeredGridSection";
import { useSwipe } from "@/hooks/useSwipe";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";

// ── Data ─────────────────────────────────────────────────────────────────────

const industryImages: Record<string, string[]> = {
  "product-design":        ["/images/product-design/banner1.jpg", "/images/product-design/banner2.jpg", "/images/product-design/banner3.jpg", "/images/product-design/banner4.jpg"],
  "commercial-properties": ["/images/commercial-property/banner1.jpg", "/images/commercial-property/banner2.jpg", "/images/commercial-property/banner3.jpg", "/images/commercial-property/banner4.jpg"],
  "food-hospitality":      ["/images/food/banner1.jpg", "/images/food/banner2.jpg", "/images/food/banner3.jpg"],
};

const industries = [
  { num: "01", label: "Product Design",      slug: "product-design"        },
  { num: "02", label: "Commercial Property", slug: "commercial-properties" },
  { num: "03", label: "Food & Hospitality",  slug: "food-hospitality"      },
];

const FS_CENTERED = "clamp(36px, 14vw, 76px)";

const H_STYLE: CSSProperties = {
  fontFamily:    "var(--heading-font)",
  fontWeight:    "var(--heading-weight)" as CSSProperties["fontWeight"],
  letterSpacing: "var(--heading-tracking)",
};

const HERO_IMGS = [
  "/images/home/home-hero01.jpg",
  "/images/home/home-hero02.jpg",
  "/images/home/home-hero03.jpg",
  "/images/home/home-hero04.jpg",
];

// ── Theme #1 (Dark Space) — locked ──────────────────────────────────────────
const DARK = {
  bg: "#0d0d0d",
  text: "white",
  blurb: "rgba(255,255,255,0.40)",
  highlight: "#f0c93a",
  highlightText: "#0d0d0d",
  vignette: "#0d0d0d",
  dotColor: "rgba(255,255,255,0.65)",
  dotActive: "#f0c93a",
  lineRGB: "255,255,255",
  lineMaxAlpha: 0.3,
};

// ════════════════════════════════════════════════════════════════════════════
// HERO — Centered title + scroll-to-fullscreen image carousel
// ════════════════════════════════════════════════════════════════════════════

function HeroCentered() {
  const shellW = (): CSSProperties => ({
    position: "absolute", inset: "-0.12em -0.14em",
    overflow: "hidden", pointerEvents: "none",
  });
  const bgHL = (anim: string): CSSProperties => ({
    position: "absolute", inset: "7px",
    background: DARK.highlight,
    filter: "url(#nas-rough)",
    willChange: "transform",
    animation: anim.replace("forwards", "both"),
  });

  return (
    <div style={{ width: "100%", marginTop: "-5rem" }}>
      {/* White text area */}
      <div style={{
        background: "#ffffff",
        minHeight: "78vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "160px 24px 60px",
      }}>
        <div style={{ ...H_STYLE, fontSize: FS_CENTERED, lineHeight: "var(--heading-lh)", textAlign: "center" }}>
          {([["Better", "thinking."], ["Clearer", "design."]] as const).map(([adj, noun], li) => {
            const adjD  = 0.1 + li * 0.8;
            const nounD = adjD + 0.4;
            const hlD   = nounD + 0.05;
            return (
              <div key={noun}>
                <span style={{
                  color: "#0d0d0d", display: "inline-block", marginRight: "0.28em",
                  animation: `nas-up 0.5s cubic-bezier(0.22,1,0.36,1) ${adjD}s both`,
                }}><ScrambleText text={adj} /></span>
                <span style={{ position: "relative", display: "inline-block", animation: `nas-up 0.5s cubic-bezier(0.22,1,0.36,1) ${nounD}s both` }}>
                  <span aria-hidden style={shellW()}><span style={bgHL(
                    `nas-slide 0.55s cubic-bezier(0.22,1,0.36,1) ${hlD}s both`
                  )} /></span>
                  <span style={{ position: "relative", zIndex: 1, color: DARK.highlightText }}><ScrambleText text={noun} /></span>
                </span>
              </div>
            );
          })}
        </div>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "rgba(0,0,0,0.45)",
          textAlign: "center",
          maxWidth: 520,
          lineHeight: 1.5,
          marginTop: "3rem",
          animation: "nas-up 0.5s cubic-bezier(0.22,1,0.36,1) 2s both",
        }}>
          Design is more than visuals — We help organisations understand the problem before solving it
        </p>

      </div>

    </div>
  );
}

// ── 3D Industry Carousel (scroll-driven) ─────────────────────────────────────

function IndustryCarousel3D({ ind, images, idx }: { ind: typeof industries[0]; images: string[]; idx: number }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const perspRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const fsRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef(false);
  const exitStartRef = useRef(0);

  const R = 420;
  const angleStep = 360 / images.length;
  const startOffset = idx * 15;

  // Timings (seconds)
  const SPIN_DUR = 0.7;
  const SPIN_DEGS = 540; // 1.5 rotations
  const EXPAND_START = 0.55;
  const EXPAND_DUR = 0.5;
  const NAV_AT = 1100; // ms

  // Reset exit animation when returning via bfcache (mobile back button)
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        exitRef.current = false;
        exitStartRef.current = 0;
        const fs = fsRef.current;
        if (fs) {
          fs.style.opacity = "0";
          fs.style.transform = "scale(0.1)";
        }
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const el = carouselRef.current;
    const persp = perspRef.current;
    const title = titleRef.current;
    const fs = fsRef.current;
    if (!scene || !el || !persp || !title || !fs) return;
    let raf: number;

    const tick = () => {
      const rect = scene.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
      const baseAngle = startOffset + progress * -180;

      const fadeInTitle = Math.min(1, progress / 0.15);
      const fadeInImages = Math.max(0, Math.min(1, (progress - 0.3) / 0.25));
      const fadeOut = Math.min(1, (1 - progress) / 0.15);

      if (exitRef.current) {
        const elapsed = (performance.now() - exitStartRef.current) / 1000;

        // ── Phase 1: Spin 1.5 rotations with deceleration ──
        const spinT = Math.min(1, elapsed / SPIN_DUR);
        const spinEase = 1 - Math.pow(1 - spinT, 3); // easeOutCubic
        const extraRot = spinEase * SPIN_DEGS;

        el.style.transform = `translateZ(${-R}px) rotateY(${baseAngle - extraRot}deg)`;

        // Title fades out fast
        title.style.opacity = `${Math.max(0, 1 - spinT * 3)}`;

        // Carousel fades out as expand takes over
        if (elapsed > EXPAND_START) {
          const fadeT = (elapsed - EXPAND_START) / EXPAND_DUR;
          persp.style.opacity = `${Math.max(0, 1 - fadeT * 1.5)}`;
        }

        // ── Phase 2: Image expands from carousel centre to fullscreen ──
        if (elapsed > EXPAND_START) {
          const expandT = Math.min(1, (elapsed - EXPAND_START) / EXPAND_DUR);
          const expandEase = 1 - Math.pow(1 - expandT, 3); // easeOutCubic

          // Position overlay to cover viewport
          const sceneRect = scene.getBoundingClientRect();
          const vpW = window.innerWidth;
          const vpH = window.innerHeight;
          fs.style.left = `${-sceneRect.left}px`;
          fs.style.top = `${-sceneRect.top}px`;
          fs.style.width = `${vpW}px`;
          fs.style.height = `${vpH}px`;

          // Scale origin = carousel centre relative to the overlay
          const cx = sceneRect.left + sceneRect.width / 2;
          const cy = sceneRect.top + sceneRect.height / 2;
          fs.style.transformOrigin = `${cx}px ${cy}px`;

          fs.style.opacity = `${Math.min(1, expandEase * 1.8)}`;
          fs.style.transform = `scale(${0.1 + expandEase * 0.9})`;
        }
      } else {
        title.style.opacity = `${Math.min(fadeInTitle, fadeOut)}`;
        persp.style.opacity = `${Math.min(fadeInImages, fadeOut)}`;
        el.style.transform = `translateZ(${-R}px) rotateY(${baseAngle}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startOffset]);

  const handleClick = () => {
    if (exitRef.current) return;
    exitRef.current = true;
    exitStartRef.current = performance.now();
    setTimeout(() => { window.location.href = `/for/${ind.slug}`; }, NAV_AT);
  };

  return (
    <div
      ref={sceneRef}
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-center relative min-h-[380px] lg:min-h-[75vh]"
    >
      {/* 3D scene — behind text */}
      <div ref={perspRef} style={{ perspective: 1000, width: "clamp(260px, 40vw, 440px)", aspectRatio: "2 / 1.5", opacity: 0 }}>
        <div
          ref={carouselRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `translateZ(${-R}px) rotateY(${startOffset}deg)`,
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0"
              style={{ transform: `rotateY(${i * angleStep}deg) translateZ(${R}px)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={ind.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Title — overlaid on top of carousel */}
      <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 2, opacity: 0 }}>
        <h2 style={{ ...H_STYLE, fontSize: "clamp(28px, 5.5vw, 72px)", color: "#ffffff", lineHeight: 1.1, textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
          <ScrambleText text={ind.label} />
        </h2>
      </div>

      {/* Fullscreen image — expands from carousel centre to cover viewport on click */}
      <div
        ref={fsRef}
        className="absolute pointer-events-none"
        style={{ zIndex: 10, opacity: 0, transform: "scale(0.1)", willChange: "transform, opacity" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt={ind.label} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

// ── Scroll-to-fullscreen image carousel ──────────────────────────────────────

function ScrollCarousel() {
  const imgRef = useRef<HTMLDivElement>(null);
  const mobileImgRef = useRef<HTMLDivElement>(null);

  const { extended, pos, realIndex, animate, trackRef, goTo, next, prev } =
    useInfiniteCarousel(HERO_IMGS);
  const swipe = useSwipe(next, prev);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const risen = viewH - rect.top;
      const raw = risen / (viewH * 0.6);
      const progress = Math.max(0, Math.min(1, raw));
      const t = progress * progress * (3 - 2 * progress);

      const fadeRaw = Math.min(1, raw / 0.4);
      const fadeT = fadeRaw * fadeRaw * (3 - 2 * fadeRaw);
      el.style.opacity = `${fadeT}`;
      el.style.transform = `translateY(${(1 - fadeT) * 40}px)`;

      const w = 50 + 50 * t;
      el.style.width = `${w}vw`;
      el.style.borderRadius = `${32 * (1 - t)}px`;

      const shadowOpacity = 0.12 * (1 - t);
      el.style.boxShadow = shadowOpacity > 0.01
        ? `0 8px 40px rgba(0,0,0,${shadowOpacity})`
        : "none";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile: scroll-based fade-in via IntersectionObserver
  useEffect(() => {
    const el = mobileImgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dragPct = (swipe.dragOffset / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100;
  const translatePct = ((-pos * 100) + dragPct) / extended.length;

  /* Shared pagination dots */
  const dots = (
    <div
      className="absolute bottom-6 right-6 flex items-center gap-[6px] z-10 rounded-full px-2.5 py-2"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
    >
      {HERO_IMGS.map((_, i) => (
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
  );

  return (
    <div>
      {/* Scroll-to-fullscreen image (desktop only) */}
      <div className="hidden md:flex" style={{
        background: "#0d0d0d",
        justifyContent: "center",
        paddingBottom: 0,
      }}>
        <div
          ref={imgRef}
          className="overflow-hidden relative"
          style={{
            width: "50vw",
            aspectRatio: "16 / 9",
            borderRadius: "32px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            opacity: 0,
            transform: "translateY(40px)",
            cursor: swipe.dragOffset ? "grabbing" : "grab",
          }}
          {...swipe.handlers}
        >
          <div
            ref={trackRef}
            className="flex h-full"
            style={{
              width: `${extended.length * 100}%`,
              transform: `translateX(${translatePct}%)`,
              transition: !animate || swipe.dragOffset ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {extended.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${i}`}
                src={src}
                alt="Our work"
                className="h-full object-cover"
                loading={i <= 1 ? "eager" : "lazy"}
                draggable={false}
                style={{ width: `${100 / extended.length}%`, flexShrink: 0 }}
              />
            ))}
          </div>
          {dots}
        </div>
      </div>

      {/* Mobile — simple full-width image */}
      <div ref={mobileImgRef} className="md:hidden" style={{
        background: "#0d0d0d",
        opacity: 0,
        transform: "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div
          className="mx-4 overflow-hidden relative"
          style={{ borderRadius: 16, aspectRatio: "16/9", cursor: swipe.dragOffset ? "grabbing" : "grab" }}
          {...swipe.handlers}
        >
          <div
            className="flex h-full"
            style={{
              width: `${extended.length * 100}%`,
              transform: `translateX(${translatePct}%)`,
              transition: !animate || swipe.dragOffset ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {extended.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${i}`}
                src={src}
                alt="Our work"
                className="h-full object-cover"
                loading={i <= 1 ? "eager" : "lazy"}
                draggable={false}
                style={{ width: `${100 / extended.length}%`, flexShrink: 0 }}
              />
            ))}
          </div>
          {dots}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const specRef = useRef<HTMLHeadingElement>(null);
  const headWrapRef = useRef<HTMLDivElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const darkInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = specRef.current;
    const hw = headWrapRef.current;
    const wrap = darkWrapRef.current;
    const inner = darkInnerRef.current;
    if (!el || !wrap || !inner) return;
    let raf: number;
    const tick = () => {
      const vh = window.innerHeight;

      // "We specialise in" heading fade
      const hRect = el.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, (vh - hRect.top) / (vh * 0.3)));
      el.style.opacity = `${t}`;
      el.style.transform = `translateY(${(1 - t) * 28}px)`;

      // Dark section mask: starts tight & rounded, expands to full bleed
      const wRect = wrap.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh - wRect.top) / (vh * 0.5)));
      const maxPad = Math.min(200, (window.innerWidth - 40) / 2);
      const pad = (1 - p) * maxPad;
      const rad = (1 - p) * 40;
      wrap.style.padding = `0 ${pad}px`;
      inner.style.borderRadius = `${rad}px ${rad}px 0 0`;
      // Counteract padding so heading stays centred in the viewport
      if (hw) {
        hw.style.marginLeft = `-${pad}px`;
        hw.style.marginRight = `-${pad}px`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20">

      {/* Keyframes for homepage animations */}
      <style>{`
        @keyframes nas-up      { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        @keyframes nas-slide   { from { transform:translateX(-108%) } to { transform:translateX(0) } }
        @keyframes nas-fade-in { from { opacity:0 } to { opacity:1 } }
      `}</style>

      {/* Hero — Mode 3 */}
      <HeroCentered />

      <StaggeredGridSection />

      {/* 3D Industry Carousels — vertically stacked, scroll-driven */}
      <div ref={darkWrapRef} className="relative z-10 w-full">
      <div ref={darkInnerRef} className="w-full" style={{ background: "#0d0d0d" }}>
        <div ref={headWrapRef} style={{ padding: "clamp(48px, 12vw, 160px) 0 0", textAlign: "center" }}>
          <h2 ref={specRef} style={{ ...H_STYLE, fontSize: "clamp(24px, 4.5vw, 60px)", color: "#ffffff", lineHeight: 1.1, opacity: 0, whiteSpace: "nowrap" }}>
            We specialise in
          </h2>
        </div>
        <div style={{ overflowX: "clip", overflowY: "visible", paddingBottom: "clamp(80px, 12vw, 180px)" }}>
          {industries.map((ind, idx) => (
            <IndustryCarousel3D key={ind.slug} ind={ind} images={industryImages[ind.slug]} idx={idx} />
          ))}
        </div>
      </div>
      </div>

      {/* Scroll-to-fullscreen carousel — before footer */}
      <ScrollCarousel />

    </div>
  );
}
