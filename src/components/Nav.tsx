"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const FOR_LINKS = [
  { label: "Product Design", href: "/for/product-design", num: "01" },
  { label: "Commercial Property", href: "/for/commercial-properties", num: "02" },
  { label: "Food & Hospitality", href: "/for/food", num: "03" },
];

export default function Nav() {
  const pathname = usePathname();
  const ctaHref = pathname === "/" ? "#contact" : "/for/commercial-properties#contact";
  const [forOpen, setForOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setForOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="fixed top-5 left-6 right-6 z-50 flex justify-center pointer-events-none"
      style={{ animation: "nav-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
    >
      <style>{`
        @keyframes nav-in { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes drop-in { from { opacity:0; transform:translateX(-50%) scale(0.95) translateY(-4px) } to { opacity:1; transform:translateX(-50%) scale(1) translateY(0) } }
        @keyframes item-in { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:translateX(0) } }
      `}</style>

      <nav
        className="pointer-events-auto flex items-center justify-between w-full max-w-2xl rounded-full px-8 py-2.5 backdrop-blur-lg"
        style={{ background: "rgba(13,13,13,0.88)" }}
      >
        {/* Logo */}
        <a
          href="/"
          className="text-[#f5f3ef] no-underline leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            fontFamily: "var(--heading-font)",
            fontWeight: "var(--heading-weight)" as React.CSSProperties["fontWeight"],
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          Not Another Studio
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/"
            className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.01em] no-underline transition-colors"
            style={{ color: pathname === "/" ? "#f0c93a" : "rgba(255,255,255,0.6)" }}
          >
            Home
          </a>

          {/* For dropdown */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setForOpen(!forOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.01em] transition-colors cursor-pointer"
              style={{ color: pathname.startsWith("/for") ? "#f0c93a" : "rgba(255,255,255,0.6)", background: "transparent", border: "none" }}
            >
              For
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: forOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {forOpen && (
              <div
                className="absolute top-full left-1/2 mt-3 rounded-2xl py-3 px-1 backdrop-blur-xl"
                style={{
                  transform: "translateX(-50%)",
                  background: "rgba(13,13,13,0.96)",
                  minWidth: 240,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
                  animation: "drop-in 0.25s cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                {FOR_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 px-4 py-2.5 mx-1 rounded-xl no-underline transition-all"
                      style={{
                        animation: `item-in 0.3s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.06}s both`,
                        background: isActive ? "rgba(240,201,58,0.1)" : "transparent",
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span
                        className="font-bold"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          color: isActive ? "#f0c93a" : "rgba(255,255,255,0.2)",
                          fontFamily: "var(--heading-font)",
                          transition: "color 0.2s",
                        }}
                      >
                        {link.num}
                      </span>
                      <span
                        className="text-[13px] font-medium tracking-[0.01em]"
                        style={{ color: isActive ? "#f0c93a" : "rgba(255,255,255,0.75)", transition: "color 0.2s" }}
                      >
                        {link.label}
                      </span>
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        className="ml-auto"
                        style={{
                          opacity: isActive ? 0.6 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(-4px)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <path d="M4.5 3L7.5 6L4.5 9" stroke={isActive ? "#f0c93a" : "currentColor"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          className="inline-flex items-center rounded-full px-5 py-2 font-bold text-[11px] lg:text-[12px] tracking-[0.02em] no-underline transition-all hover:scale-105 hover:brightness-110"
          style={{ background: "#f0c93a", color: "#0d0d0d" }}
        >
          Work with us
        </a>
      </nav>
    </header>
  );
}
