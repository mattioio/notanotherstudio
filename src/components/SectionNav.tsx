"use client";

import { useState, useEffect } from "react";

const sectionLinks = [
  { key: "services", label: "Services" },
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
        <nav className="inline-flex items-center gap-0.5 md:gap-1 bg-white/70 backdrop-blur-xl rounded-full px-1 md:px-1.5 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.10)] border border-white/50">
          {sectionLinks.map(({ key, label }) => (
            <a
              key={key}
              href={`#${key}`}
              className={`px-3 md:px-5 py-1.5 md:py-2 text-[11px] md:text-[13px] font-medium no-underline rounded-full transition-all duration-200 ${
                activeSection === key
                  ? "bg-[#0d0d0d] text-white"
                  : "text-[#555] hover:text-[#0d0d0d] hover:bg-black/5"
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
