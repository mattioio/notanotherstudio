"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const FOR_LINKS = [
  { label: "Product Design", href: "/for/product-design", num: "01" },
  { label: "Commercial Property", href: "/for/commercial-properties", num: "02" },
  { label: "Food & Hospitality", href: "/for/food-hospitality", num: "03" },
];

export default function Nav() {
  const pathname = usePathname();
  const ctaHref = "#contact";
  const [forOpen, setForOpen] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Clear intro animation after it finishes so inline styles can take over
  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Detect dark backgrounds behind the nav
  useEffect(() => {
    let raf = 0;
    const check = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const navY = rect.top + rect.height / 2;
      const x = window.innerWidth / 2;
      const els = document.elementsFromPoint(x, navY);
      let dark = false;
      for (const el of els) {
        if (el.closest("header") || el.tagName === "HTML") continue;
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
            dark = lum < 0.3;
          }
          break;
        }
      }
      setOnDark(dark);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setForOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide nav after scrolling past hero on /for/ pages, or when footer/contact is reached
  useEffect(() => {
    // Reset visibility on route change so nav is always visible at top of new page
    if (headerRef.current) {
      headerRef.current.style.transform = "translateY(0)";
    }

    const NAV_TOP = 20; // matches top-5

    const onScroll = () => {
      let hide = false;
      let slide = 0;

      // On /for/ pages: scroll-sync slide up when hero bottom passes nav
      if (pathname.startsWith("/for")) {
        const hero = document.getElementById("home");
        if (hero) {
          const bottom = hero.getBoundingClientRect().bottom;
          const navH = headerRef.current?.offsetHeight ?? 48;
          const threshold = NAV_TOP + navH;
          slide = Math.max(0, Math.min(threshold, threshold - bottom));
          if (slide >= threshold) hide = true;
        }
      }

      // On /for/ pages: hide when contact section is on screen
      if (pathname.startsWith("/for")) {
        const contact = document.getElementById("contact");
        if (contact) {
          const top = contact.getBoundingClientRect().top;
          if (top < window.innerHeight * 0.5) hide = true;
        }
      }

      // Direct DOM write for scroll-sync (bypasses React re-render lag)
      const el = headerRef.current;
      if (el) {
        if (hide) {
          el.style.transform = "translateY(-120%)";
          el.style.opacity = "0";
          el.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease";
        } else if (slide > 0) {
          el.style.transform = `translateY(-${slide}px)`;
          el.style.opacity = "1";
          el.style.transition = "opacity 0.3s ease"; // no transform transition during scroll-sync
        } else {
          el.style.transform = "translateY(0)";
          el.style.opacity = "1";
          el.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease";
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Delay initial check to let the new page DOM settle
    const t = setTimeout(onScroll, 100);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className="fixed top-5 left-6 right-6 z-50 flex flex-col items-center pointer-events-none"
      style={{
        animation: animDone ? undefined : "nav-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both",
      }}
    >
      <style>{`
        @keyframes nav-in { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes drop-in { from { opacity:0; transform:translateX(-50%) scale(0.95) translateY(-4px) } to { opacity:1; transform:translateX(-50%) scale(1) translateY(0) } }
        @keyframes item-in { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:translateX(0) } }
      `}</style>

      <nav
        className="pointer-events-auto flex items-center justify-between w-full max-w-2xl rounded-full px-4 md:px-8 py-2.5 backdrop-blur-lg"
        style={{
          background: onDark ? "rgba(255,255,255,0.85)" : "rgba(13,13,13,0.88)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Left group: hamburger + logo */}
        <div className="flex items-center gap-2">
          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 cursor-pointer -ml-1"
            style={{ background: "transparent", border: "none", color: onDark ? "#0d0d0d" : "#f5f3ef" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "currentColor",
                  transform: mobileOpen ? "translateY(7.25px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "currentColor",
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "translateX(-8px)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "currentColor",
                  transform: mobileOpen ? "translateY(-7.25px) rotate(-45deg)" : "none",
                  width: mobileOpen ? "100%" : "70%",
                }}
              />
            </div>
          </button>

          {/* Logo */}
          <a
            href="/"
            className="no-underline leading-none whitespace-nowrap transition-colors duration-400"
            style={{
              color: onDark ? "#0d0d0d" : "#f5f3ef",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontFamily: "var(--heading-font)",
              fontWeight: "var(--heading-weight)" as React.CSSProperties["fontWeight"],
              letterSpacing: "var(--heading-tracking)",
            }}
          >
            <span className="hidden md:inline">Not Another Studio</span>
            <span className="md:hidden">N/A Studio</span>
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/"
            className="px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.01em] no-underline transition-colors duration-400"
            style={{ color: pathname === "/" ? (onDark ? "#0d0d0d" : "#f0c93a") : onDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}
          >
            Home
          </a>

          {/* For dropdown */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setForOpen(!forOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium tracking-[0.01em] transition-colors duration-400 cursor-pointer"
              style={{ color: pathname.startsWith("/for") ? (onDark ? "#0d0d0d" : "#f0c93a") : onDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)", background: "transparent", border: "none" }}
            >
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: forOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {forOpen && (
              <div
                className="absolute top-full left-1/2 mt-5 rounded-2xl py-3 px-1 backdrop-blur-xl flex flex-col gap-1"
                style={{
                  transform: "translateX(-50%)",
                  background: onDark ? "rgba(255,255,255,0.92)" : "rgba(13,13,13,0.96)",
                  minWidth: 240,
                  border: onDark ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: onDark ? "0 12px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03) inset" : "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
                  animation: "drop-in 0.25s cubic-bezier(0.22,1,0.36,1) both",
                  transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
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
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = onDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span
                        className="font-bold"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          color: isActive ? "#f0c93a" : onDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                          fontFamily: "var(--heading-font)",
                          transition: "color 0.2s",
                        }}
                      >
                        {link.num}
                      </span>
                      <span
                        className="text-[13px] font-medium tracking-[0.01em]"
                        style={{ color: isActive ? "#f0c93a" : onDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.75)", transition: "color 0.2s" }}
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
                        <path d="M4.5 3L7.5 6L4.5 9" stroke={isActive ? (onDark ? "#0d0d0d" : "#f0c93a") : "currentColor"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
          onClick={(e) => {
            const el = document.getElementById("contact");
            if (el) { e.preventDefault(); el.scrollIntoView(); }
          }}
          className="inline-flex items-center rounded-full px-5 py-2 font-bold text-[11px] lg:text-[12px] tracking-[0.02em] no-underline transition-all duration-400 hover:scale-105 hover:brightness-110"
          style={{ background: onDark ? "#0d0d0d" : "#f0c93a", color: onDark ? "#f5f3ef" : "#0d0d0d" }}
        >
          Work with us
        </a>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden pointer-events-auto w-full max-w-2xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          maxHeight: mobileOpen ? 300 : 0,
          opacity: mobileOpen ? 1 : 0,
          marginTop: mobileOpen ? 8 : 0,
        }}
      >
        <div
          className="rounded-3xl px-6 py-5 backdrop-blur-lg"
          style={{
            background: onDark ? "rgba(255,255,255,0.85)" : "rgba(13,13,13,0.88)",
            border: onDark ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <a
            href="/"
            className="block py-2.5 text-[14px] font-medium tracking-[0.01em] no-underline transition-colors"
            style={{
              color: pathname === "/"
                ? (onDark ? "#0d0d0d" : "#f0c93a")
                : (onDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)"),
            }}
          >
            Home
          </a>
          <p
            className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1 mt-4"
            style={{ color: onDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)" }}
          >
            Services
          </p>
          {FOR_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="block py-2.5 text-[14px] font-medium tracking-[0.01em] no-underline transition-colors"
                style={{
                  color: isActive
                    ? (onDark ? "#0d0d0d" : "#f0c93a")
                    : (onDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)"),
                  animation: mobileOpen ? `item-in 0.3s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.06}s both` : "none",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
