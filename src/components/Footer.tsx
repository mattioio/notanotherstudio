"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ScrambleText from "@/components/ScrambleText";

// ── Compass needle canvas (footer background) ─────────────────────────────
function FooterCompass() {
  const cvRef  = useRef<HTMLCanvasElement>(null);
  const cntRef = useRef<HTMLDivElement>(null);
  const mouse  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = cvRef.current, container = cntRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    let W = container.offsetWidth, H = container.offsetHeight;
    canvas.width = W; canvas.height = H;

    const COLS = 30, ROWS = 9;
    const needles = Array.from({ length: COLS * ROWS }, (_, idx) => {
      const col = idx % COLS, row = (idx / COLS) | 0;
      return {
        x: ((col + 0.5) / COLS) * W,
        y: ((row + 0.5) / ROWS) * H,
        angle: Math.atan2(
          ((row + 0.5) / ROWS) * H - H / 2,
          ((col + 0.5) / COLS) * W - W / 2
        ), // start pointing outward
      };
    });

    const reposition = () => {
      needles.forEach((n, idx) => {
        const col = idx % COLS, row = (idx / COLS) | 0;
        n.x = ((col + 0.5) / COLS) * W;
        n.y = ((row + 0.5) / ROWS) * H;
      });
    };

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y;
      const hasMouse = mx > -900;

      // Build vignette gradient (recreated each tick so it stays in sync with W/H)
      const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.sqrt((W / 2) ** 2 + (H / 2) ** 2));
      vignette.addColorStop(0,    "rgba(13,13,13,0)");
      vignette.addColorStop(0.32, "rgba(13,13,13,0)");
      vignette.addColorStop(0.72, "rgba(13,13,13,0.97)");
      vignette.addColorStop(1,    "rgba(13,13,13,1)");

      needles.forEach(n => {
        const dx = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const target = hasMouse
          ? Math.atan2(dy, dx)
          : Math.atan2(n.y - H / 2, n.x - W / 2);

        let diff = target - n.angle;
        while (diff > Math.PI)  diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        n.angle += diff * (hasMouse ? (dist < 300 ? 0.07 : 0.022) : 0.01);

        const proximity = hasMouse ? Math.max(0, 1 - dist / 380) : 0;
        const alpha = 0.12 + proximity * 0.65;
        const near  = hasMouse && dist < 90;
        const close = hasMouse && dist < 210;
        const LEN = 11;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);

        // Tail
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-LEN * 0.55, 0);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.28})`;
        ctx.lineWidth = 0.7; ctx.stroke();

        // Head
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(LEN, 0);
        ctx.strokeStyle = near
          ? `rgba(240,201,58,${Math.min(alpha * 1.7, 1)})`
          : close ? `rgba(255,255,255,${alpha})` : `rgba(255,255,255,${alpha * 0.6})`;
        ctx.lineWidth = near ? 1.4 : 0.85;
        ctx.stroke();

        // Tip dot
        ctx.beginPath(); ctx.arc(LEN, 0, near ? 2 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = near ? "#f0c93a" : `rgba(255,255,255,${alpha * 0.75})`;
        ctx.fill();

        ctx.restore();
      });

      // Paint vignette over needles
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

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
    const onResize = () => {
      W = container.offsetWidth; H = container.offsetHeight;
      canvas.width = W; canvas.height = H;
      reposition();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={cntRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <canvas ref={cvRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

const chips = [
  { label: "Web Package",   value: "Web Package"   },
  { label: "Print Package", value: "Print Package" },
  { label: "Brand Package", value: "Brand Package" },
  { label: "Not sure yet",  value: "Not sure yet"  },
];

const sectionLinks = [
  { label: "Services",   href: "/for/commercial-properties#services" },
  { label: "Our Work",   href: "/for/commercial-properties#work"     },
  { label: "Packages",   href: "/for/commercial-properties#packages" },
  { label: "Process",    href: "/for/commercial-properties#process"  },
  { label: "Contact us", href: "/for/commercial-properties#contact"  },
];

// ── Homepage footer — contact form + minimal bottom bar ───────────────────

function HomeFooter() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleChip(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem("name")    as HTMLInputElement).value,
      company:   (form.elements.namedItem("company") as HTMLInputElement).value,
      email:     (form.elements.namedItem("email")   as HTMLInputElement).value,
      interests: selected,
      message:   (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) setSubmitted(true);
    else setError("Something went wrong. Please email us directly.");
  }

  return (
    <footer id="contact" className="relative bg-[#0d0d0d] text-white">
      {/* Compass needle canvas */}
      <FooterCompass />

      {/* Grunge texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 2,
        }}
      />

      {/* Contact form section */}
      <div className="relative z-10 px-6 md:px-12 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
        {/* Left — copy */}
        <div>
          <h2
            className="leading-[1.0] mb-5"
            style={{
              fontSize:      "clamp(40px, 5vw, 64px)",
              fontFamily:    "var(--heading-font)",
              fontWeight:    "var(--heading-weight)" as React.CSSProperties["fontWeight"],
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            <ScrambleText text="Stop settling for " />
            <span className="text-[#f0c93a]"><ScrambleText text="good enough." /></span>
          </h2>
          <p className="text-white/50 text-base font-light leading-[1.7]">
            Tell us about your project and we&apos;ll come back to you within one working day.
          </p>
        </div>

        {/* Right — form or success */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="text-[#f0c93a] syne text-5xl mb-4">✓</div>
            <h3 className="syne text-2xl mb-3">Sent. We&apos;ll be in touch.</h3>
            <p className="text-white/50 text-sm font-light max-w-sm">
              We aim to respond within one working day. Check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">Your name</label>
                <input type="text" name="name" placeholder="Jane Smith" required
                  className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">Company</label>
                <input type="text" name="company" placeholder="Your company"
                  className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">Email address</label>
              <input type="email" name="email" placeholder="you@company.co.uk" required
                className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">I&apos;m interested in</label>
              <div className="flex flex-wrap gap-2">
                {chips.map(({ label, value }) => {
                  const isSelected = selected.includes(value);
                  return (
                    <button key={value} type="button" onClick={() => toggleChip(value)}
                      className={`px-4 py-2 text-[13px] font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#f0c93a] border-[#f0c93a] text-[#0d0d0d] font-bold"
                          : "bg-transparent border-white/18 text-white/60 hover:border-white/50 hover:text-white"
                      }`}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">Tell us about your project</label>
              <textarea name="message" placeholder="Briefly describe your business and what you need..." rows={4}
                className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors resize-y placeholder:text-white/20" />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="self-start px-10 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-[14px] tracking-[0.05em] uppercase border-none cursor-pointer hover:-translate-y-0.5 hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? "Sending..." : "Send enquiry →"}
            </button>
          </form>
        )}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-6 md:px-12 py-6 border-t border-white/8 flex items-center justify-between gap-4">
        <a href="/" className="text-white no-underline leading-none" style={{
          fontSize: "1.125rem",
          fontFamily:    "var(--heading-font)",
          fontWeight:    "var(--heading-weight)" as React.CSSProperties["fontWeight"],
          letterSpacing: "var(--heading-tracking)",
        }}>
          Not Another Studio
        </a>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Not Another Studio LTD
        </p>
      </div>
    </footer>
  );
}

// ── Standard footer (all other pages) ─────────────────────────────────────

function StandardFooter() {
  return (
    <footer className="relative bg-[#0d0d0d] text-white px-6 md:px-12 pt-10 pb-8 border-t border-white/8">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 pb-6 border-b border-white/8">
        <a href="/" className="text-white no-underline leading-none" style={{
          fontSize: "1.25rem",
          fontFamily:    "var(--heading-font)",
          fontWeight:    "var(--heading-weight)" as React.CSSProperties["fontWeight"],
          letterSpacing: "var(--heading-tracking)",
        }}>
          Not Another Studio
        </a>
        <nav className="flex flex-wrap gap-7">
          {sectionLinks.map(({ label, href }) => (
            <a key={href} href={href}
              className="text-[13px] text-white/50 hover:text-white transition-colors no-underline">
              {label}
            </a>
          ))}
        </nav>
      </div>
      <p className="relative z-10 text-xs text-white/30 mt-5">
        &copy; {new Date().getFullYear()} Not Another Studio LTD
      </p>
    </footer>
  );
}

// ── Root export ────────────────────────────────────────────────────────────

export default function Footer() {
  const pathname = usePathname();
  return pathname === "/" ? <HomeFooter /> : <StandardFooter />;
}
