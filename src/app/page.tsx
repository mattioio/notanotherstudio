"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import ScrambleText from "@/components/ScrambleText";
import StaggeredGridSection from "@/components/StaggeredGridSection";

// ── Data ─────────────────────────────────────────────────────────────────────

const industryImages: Record<string, string[]> = {
  "product-design":        ["/images/product-design/banner1.jpg", "/images/product-design/banner2.jpg", "/images/product-design/banner3.jpg", "/images/product-design/banner4.jpg"],
  "commercial-properties": ["/images/commercial-property/banner1.jpeg", "/images/commercial-property/banner2.jpeg", "/images/commercial-property/banner3.jpeg", "/images/commercial-property/banner4.jpeg"],
  "food-hospitality":      ["/images/food/banner1.jpg", "/images/food/banner2.jpg", "/images/food/banner3.jpg"],
};

const industries = [
  { num: "01", label: "Product Design",      slug: "product-design"        },
  { num: "02", label: "Commercial Property", slug: "commercial-properties" },
  { num: "03", label: "Food & Hospitality",  slug: "food-hospitality"      },
];

const FW: CSSProperties = { width: "100vw", marginLeft: "calc(-50vw + 50%)" };
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
    <div style={{ ...FW, marginTop: "-5rem" }}>
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
  const exitRef = useRef(false);
  const extraRotRef = useRef(0);
  const extraSpeedRef = useRef(0);

  const R = 420;
  const angleStep = 360 / images.length;
  // Each carousel starts showing face 0 when entering viewport,
  // with slight stagger so they don't all look identical
  const startOffset = idx * 15;

  useEffect(() => {
    const scene = sceneRef.current;
    const el = carouselRef.current;
    const persp = perspRef.current;
    const title = titleRef.current;
    if (!scene || !el || !persp || !title) return;
    let raf: number;

    const tick = () => {
      const rect = scene.getBoundingClientRect();
      const viewH = window.innerHeight;
      // 0 = scene top at viewport bottom, 1 = scene bottom at viewport top
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
      const baseAngle = startOffset + progress * -180;

      // Title fades in first (0–15% of progress)
      const fadeInTitle = Math.min(1, progress / 0.15);
      // Images fade in much later (30–55% of progress), giving time to read the title
      const fadeInImages = Math.max(0, Math.min(1, (progress - 0.3) / 0.25));
      // Both fade out as carousel exits viewport (last 15% of progress)
      const fadeOut = Math.min(1, (1 - progress) / 0.15);

      title.style.opacity = `${Math.min(fadeInTitle, fadeOut)}`;
      persp.style.opacity = `${Math.min(fadeInImages, fadeOut)}`;

      if (exitRef.current) {
        extraSpeedRef.current = Math.min(extraSpeedRef.current + 0.5, 16);
        extraRotRef.current += extraSpeedRef.current;
      }

      el.style.transform = `translateZ(${-R}px) rotateY(${baseAngle + extraRotRef.current}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startOffset]);

  const handleClick = () => {
    if (exitRef.current) return;
    exitRef.current = true;
    setTimeout(() => { window.location.href = `/for/${ind.slug}`; }, 700);
  };

  return (
    <div
      ref={sceneRef}
      onClick={handleClick}
      className="cursor-pointer"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* 3D scene — behind text */}
      <div ref={perspRef} style={{ perspective: 1000, width: "clamp(220px, 34vw, 440px)", aspectRatio: "2 / 1.5", opacity: 0 }}>
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
        <h2 style={{ ...H_STYLE, fontSize: "clamp(36px, 5.5vw, 72px)", color: "#ffffff", lineHeight: 1.1, textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
          <ScrambleText text={ind.label} />
        </h2>
      </div>
    </div>
  );
}

// ── Scroll-to-fullscreen image carousel ──────────────────────────────────────

function ScrollCarousel() {
  const imgRef = useRef<HTMLDivElement>(null);
  const mobileImgRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState(0);

  // Autoplay image carousel — 1s per image
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % HERO_IMGS.length);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

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

  return (
    <div style={FW}>
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
          }}
        >
          {HERO_IMGS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="Our work"
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                opacity: activeImg === i ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile — simple full-width image */}
      <div ref={mobileImgRef} className="md:hidden" style={{
        background: "#0d0d0d",
        opacity: 0,
        transform: "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div className="mx-4 overflow-hidden relative" style={{ borderRadius: 16, aspectRatio: "16/9" }}>
          {HERO_IMGS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="Our work"
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                opacity: activeImg === i ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const specRef = useRef<HTMLHeadingElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const darkInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = specRef.current;
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
      const pad = (1 - p) * 200;
      const rad = (1 - p) * 40;
      wrap.style.padding = `0 ${pad}px`;
      inner.style.borderRadius = `${rad}px ${rad}px 0 0`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20">

      {/* Shared SVG filter + keyframes */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="nas-rough" x="-8%" y="-30%" width="116%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <style>{`
        @keyframes nas-up      { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        @keyframes nas-slide   { from { transform:translateX(-108%) } to { transform:translateX(0) } }
        @keyframes nas-fade-in { from { opacity:0 } to { opacity:1 } }
      `}</style>

      {/* Hero — Mode 3 */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        <HeroCentered />
      </div>

      <StaggeredGridSection />

      {/* 3D Industry Carousels — vertically stacked, scroll-driven */}
      <div ref={darkWrapRef} className="relative z-10 w-full" style={FW}>
      <div ref={darkInnerRef} className="w-full" style={{ background: "#0d0d0d", overflow: "hidden" }}>
        <div style={{ padding: "clamp(80px, 12vw, 160px) 24px 0" }}>
          <h2 ref={specRef} className="text-center" style={{ ...H_STYLE, fontSize: "clamp(32px, 4.5vw, 60px)", color: "#ffffff", lineHeight: 1.1, opacity: 0 }}>
            We specialise in
          </h2>
        </div>
        {industries.map((ind, idx) => (
          <IndustryCarousel3D key={ind.slug} ind={ind} images={industryImages[ind.slug]} idx={idx} />
        ))}
      </div>
      </div>

      {/* Scroll-to-fullscreen carousel — before footer */}
      <ScrollCarousel />

    </div>
  );
}
