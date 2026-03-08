"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const sectionLinks = [
  { key: "services", label: "What we do" },
  { key: "work",     label: "Our Work" },
  { key: "packages", label: "Packages" },
  { key: "process",  label: "Process"  },
];

// Sticky offset: 20px (top-5) + bar height + buffer
const OFFSET = 20 + 48 + 16;

const NAV_H = 48;

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [slideUp, setSlideUp] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Refs for measuring pill positions
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const pillRef = useRef<HTMLDivElement>(null);

  const setLinkRef = useCallback((key: string, el: HTMLAnchorElement | null) => {
    if (el) linkRefs.current.set(key, el);
    else linkRefs.current.delete(key);
  }, []);

  // Sliding pill position update
  useEffect(() => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;

    const activeLink = linkRefs.current.get(activeSection);
    if (!activeLink) {
      pill.style.opacity = "0";
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    pill.style.opacity = "1";
    pill.style.left = `${linkRect.left - navRect.left}px`;
    pill.style.width = `${linkRect.width}px`;
    pill.style.height = `${linkRect.height}px`;
  }, [activeSection]);

  useEffect(() => {
    const sectionEls = sectionLinks
      .map(({ key }) => document.getElementById(key))
      .filter(Boolean) as HTMLElement[];

    const check = () => {
      let current = "";
      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= OFFSET) {
          current = el.id;
        }
      }
      setActiveSection(current);

      // Scroll the nav off with the bottom edge of the Process section
      const processEl = document.getElementById("process");
      if (processEl) {
        const bottom = processEl.getBoundingClientRect().bottom;
        setSlideUp(Math.max(0, Math.min(NAV_H, NAV_H - bottom)));
      }

      // Hide when the packages tab bar physically reaches this nav
      // (i.e. it's stuck at the top), but reappear for the Process section
      const pkgTabBar = document.querySelector("[data-packages-tabbar]");
      if (pkgTabBar) {
        const rect = pkgTabBar.getBoundingClientRect();
        setHidden(rect.top <= 60 && rect.bottom > 0 && current !== "process");
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      {/* Spacer — breathing room from marquee above (doesn't affect sticky position) */}
      <div className="pt-8" aria-hidden="true" />

      <div
        className="sticky top-5 z-30 flex justify-center pb-4"
        style={{
          transform: `translateY(-${slideUp}px)`,
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
      >
        <nav
          ref={navRef}
          className="relative inline-flex items-center gap-0.5 md:gap-1 bg-white/70 backdrop-blur-xl rounded-full px-1 md:px-1.5 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.10)] border border-white/50"
        >
          {/* Sliding pill indicator */}
          <div
            ref={pillRef}
            className="absolute rounded-full bg-[#0d0d0d]"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              transition: "left 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {sectionLinks.map(({ key, label }) => (
            <a
              key={key}
              ref={(el) => setLinkRef(key, el)}
              href={`#${key}`}
              className={`relative z-10 px-3 md:px-5 py-1.5 md:py-2 text-[11px] md:text-[13px] font-medium no-underline rounded-full transition-colors duration-300 ${
                activeSection === key
                  ? "text-white"
                  : "text-[#555] hover:text-[#0d0d0d]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
