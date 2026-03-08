"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";


// ── Compass needle canvas (footer background) ─────────────────────────────
export function FooterCompass() {
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

// ── Homepage footer — contact form + minimal bottom bar ───────────────────

function HomeFooter() {
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
            Stop settling for{" "}
            <span className="text-[#f0c93a]">good enough.</span>
          </h2>
          <p className="text-white/50 text-base font-light leading-[1.7]">
            Tell us about your project and we&apos;ll come back to you within one working day.
          </p>
        </div>

        <ContactForm />
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
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
        <a href="/" className="text-white no-underline leading-none" style={{
          fontSize: "1.25rem",
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

// ── Root export ────────────────────────────────────────────────────────────

export default function Footer() {
  const pathname = usePathname();
  return pathname === "/" ? <HomeFooter /> : <StandardFooter />;
}
