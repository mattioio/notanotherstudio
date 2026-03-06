"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const industryImages: Record<string, string[]> = {
  "product-design":        ["/images/product-design/banner1.jpeg", "/images/product-design/banner2.jpeg", "/images/product-design/banner3.jpeg", "/images/product-design/banner4.jpeg"],
  "commercial-properties": ["/images/commercial-property/banner1.jpeg", "/images/commercial-property/banner2.jpeg", "/images/commercial-property/banner3.jpeg", "/images/commercial-property/banner4.jpeg"],
  "food":                  ["/images/food/banner1.jpeg", "/images/food/banner2.jpeg", "/images/food/banner3.jpeg", "/images/food/banner4.jpeg"],
};

const industries = [
  { num: "01", label: "Product Design",      slug: "product-design"        },
  { num: "02", label: "Commercial Property", slug: "commercial-properties" },
  { num: "03", label: "Food & Hospitality",  slug: "food"                  },
];

const FW: CSSProperties = { width: "100vw", marginLeft: "calc(-50vw + 50%)" };
const FS = "clamp(44px, 6.5vw, 92px)";
const DARK_BASE: CSSProperties = { ...FW, background: "#0d0d0d", minHeight: 680, marginTop: "-5rem" };

// Heading font CSS vars — set globally by FontToggle, applied here via var()
const H_STYLE: CSSProperties = {
  fontFamily:    "var(--heading-font)",
  fontWeight:    "var(--heading-weight)" as CSSProperties["fontWeight"],
  letterSpacing: "var(--heading-tracking)",
};

// ════════════════════════════════════════════════════════════════════════════
// HERO — CONSTELLATION
// ════════════════════════════════════════════════════════════════════════════
function HeroConstellation({ textStyle = 1 }: { textStyle?: number }) {
  const cvRef  = useRef<HTMLCanvasElement>(null);
  const cntRef = useRef<HTMLDivElement>(null);
  const mouse  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = cvRef.current, container = cntRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    let W = container.offsetWidth, H = container.offsetHeight;
    canvas.width = W; canvas.height = H;

    const N = 62;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: 1.2 + Math.random() * 1.8,
    }));

    const LINK = 130;
    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        const dx = n.x - mouse.current.x, dy = n.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110 && d > 0) { n.vx += dx / d * 0.6 * (1 - d / 110); n.vy += dy / d * 0.6 * (1 - d / 110); }
        n.vx *= 0.975; n.vy *= 0.975;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 1.8) { n.vx *= 1.8 / spd; n.vy *= 1.8 / spd; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; } if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; } if (n.y > H) { n.y = H; n.vy *= -1; }
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * 0.3})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const dx = n.x - mouse.current.x, dy = n.y - mouse.current.y;
        const near = Math.sqrt(dx * dx + dy * dy) < 70;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "#f0c93a" : "rgba(255,255,255,0.65)";
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };
    window.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    const onResize = () => { W = container.offsetWidth; H = container.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const shellW = (): CSSProperties => ({
    position: "absolute", inset: "-0.12em -0.14em",
    overflow: "hidden", pointerEvents: "none",
  });

  const bg = (anim: string, extra?: Partial<CSSProperties>): CSSProperties => ({
    position: "absolute", inset: "7px",
    background: "#f0c93a",
    filter: "url(#nas-rough)",
    willChange: "transform",
    animation: anim.replace("forwards", "both"),
    ...extra,
  });

  return (
    <div ref={cntRef} className="relative overflow-hidden select-none" style={DARK_BASE}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="nas-rough" x="-8%" y="-30%" width="116%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <style>{`
        @keyframes nas-up    { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        @keyframes nas-slide { from { transform:translateX(-108%) } to { transform:translateX(0) } }
      `}</style>
      <canvas ref={cvRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 5,
        background: "radial-gradient(ellipse 75% 80% at 50% 50%, transparent 30%, #0d0d0d 80%)",
      }} />
      {/* key forces remount + animation replay on font switch */}
      <div key={textStyle} className="relative flex flex-col items-center justify-center gap-8 px-10" style={{ minHeight: 680, zIndex: 10 }}>
        <div className="text-center" style={{ ...H_STYLE, fontSize: FS, lineHeight: "var(--heading-lh)" }}>
          {([["Better", "thinking."], ["Clearer", "design."]] as const).map(([adj, noun], li) => {
            const adjD = 0.1 + li * 0.44;
            const hlD  = 0.32 + li * 0.44;
            return (
              <div key={noun}>
                <span style={{
                  color: "white", display: "inline-block", marginRight: "0.28em",
                  animation: `nas-up 0.5s cubic-bezier(0.22,1,0.36,1) ${adjD}s both`,
                }}>{adj}</span>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span aria-hidden style={shellW()}><span style={bg(
                    `nas-slide 0.55s cubic-bezier(0.22,1,0.36,1) ${hlD}s both`
                  )} /></span>
                  <span style={{ position: "relative", zIndex: 1, color: "#0d0d0d" }}>{noun}</span>
                </span>
              </div>
            );
          })}
        </div>
        <p className="syne text-center" style={{
          fontSize: "clamp(13px, 1.1vw, 16px)",
          color: "rgba(255,255,255,0.45)",
          maxWidth: 420,
          lineHeight: 1.65,
          letterSpacing: "0.01em",
          animation: "nas-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s both",
        }}>
          Design is more than visuals. We help organisations understand the problem before solving it.
        </p>
      </div>
    </div>
  );
}

// ── Mobile card ───────────────────────────────────────────────────────────────

function MobileIndustryCard({ ind }: { ind: typeof industries[0] }) {
  const images = industryImages[ind.slug];
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setImgIdx(p => (p + 1) % images.length), 3000);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <a href={`/for/${ind.slug}`} className="block no-underline group">
      <div className="relative w-full overflow-hidden" style={{ height: "56vw", maxHeight: 280 }}>
        {images.map((src, i) => (
          <div key={src} className="absolute inset-0" style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === imgIdx ? 1 : 0, transition: "opacity 0.7s ease" }} />
        ))}
        <div className="absolute bottom-3 left-4 flex gap-1.5">
          {images.map((_, i) => <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === imgIdx ? 20 : 6, height: 6, backgroundColor: i === imgIdx ? "#f0c93a" : "rgba(255,255,255,0.5)" }} />)}
        </div>
      </div>
      <div className="flex items-baseline gap-4 py-5 border-b border-black/10">
        <span className="syne font-bold text-[#cccccc] flex-shrink-0" style={{ fontSize: 13 }}>{ind.num}</span>
        <span className="leading-none flex-1" style={{ ...H_STYLE, fontSize: "clamp(24px,6vw,36px)", color: "#0d0d0d" }}>{ind.label}</span>
        <span className="syne font-bold text-[#f0c93a] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: 22 }}>→</span>
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [hovered,   setHovered]   = useState<string | null>(null);
  const [mouse,     setMouse]     = useState({ x: 0.5, y: 0.5 });
  const [textStyle, setTextStyle] = useState(1);
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef    = useRef<number | null>(null);
  const cardRef   = useRef<HTMLDivElement | null>(null);

  // Sync textStyle with FontToggle (for hero animation replay via key)
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nas-font") ?? "1", 10);
    if (saved !== 1) setTextStyle(saved);
    const handler = (e: Event) => setTextStyle((e as CustomEvent<number>).detail);
    window.addEventListener("fontchange", handler);
    return () => window.removeEventListener("fontchange", handler);
  }, []);

  const mouseImgIdx  = Math.min(3, Math.floor(mouse.x * 4));
  const activeImages = hovered ? industryImages[hovered] : null;
  const anyHovered   = hovered !== null;

  useEffect(() => {
    const animate = () => {
      smoothRef.current.x += (mouse.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouse.y - smoothRef.current.y) * 0.1;
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${smoothRef.current.x * window.innerWidth + 60}px,${smoothRef.current.y * window.innerHeight - 120}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mouse]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      onMouseMove={e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}>

      <div className="relative z-10 w-full max-w-3xl mb-16 md:mb-20">
        <HeroConstellation textStyle={textStyle} />
      </div>

      {/* Desktop industry list */}
      <div className="relative z-10 w-full max-w-2xl hidden md:block">
        <p className="syne font-bold tracking-[0.14em] uppercase mb-5" style={{ fontSize: 11, color: "#aaaaaa" }}>
          Pick your industry
        </p>
        {industries.map(ind => {
          const isH = hovered === ind.slug;
          return (
            <a key={ind.slug} href={`/for/${ind.slug}`}
              onMouseEnter={() => setHovered(ind.slug)} onMouseLeave={() => setHovered(null)}
              className="group flex items-baseline gap-10 py-5 border-b border-black/10 no-underline transition-all duration-200"
              style={{ opacity: anyHovered && !isH ? 0.22 : 1 }}>
              <span className="syne font-bold flex-shrink-0 leading-none transition-colors duration-200" style={{ fontSize: "clamp(12px,1.4vw,17px)", color: isH ? "#f0c93a" : "#cccccc", minWidth: "2.2rem" }}>{ind.num}</span>
              <span className="leading-none flex-1" style={{ ...H_STYLE, fontSize: "clamp(26px,3.8vw,50px)", color: "#0d0d0d" }}>{ind.label}</span>
              <span className="syne font-bold flex-shrink-0 transition-all duration-300" style={{ fontSize: "clamp(18px,2.2vw,30px)", color: "#f0c93a", opacity: isH ? 1 : 0, transform: isH ? "translateX(0)" : "translateX(-10px)" }}>→</span>
            </a>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="w-full max-w-2xl md:hidden flex flex-col gap-8">
        {industries.map(ind => <MobileIndustryCard key={ind.slug} ind={ind} />)}
      </div>

      {/* Floating image card */}
      <div ref={cardRef} className="fixed top-0 left-0 pointer-events-none overflow-hidden hidden md:block"
        style={{ width: 340, height: 240, opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease", zIndex: 40 }}>
        {activeImages?.map((src, i) => (
          <div key={src} className="absolute inset-0" style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: `${mouse.x * 100}% ${mouse.y * 100}%`, opacity: i === mouseImgIdx ? 1 : 0, transition: "opacity 0.15s ease" }} />
        ))}
        {hovered && (
          <div className="absolute bottom-0 inset-x-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
            <span className="syne text-[11px] text-white tracking-[0.14em] uppercase">{industries.find(i => i.slug === hovered)?.label}</span>
          </div>
        )}
      </div>

    </div>
  );
}
