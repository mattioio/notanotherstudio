"use client";

import { useState, useEffect } from "react";

const sectionLinks = [
  { key: "services", label: "Services" },
  { key: "work",     label: "Our Work" },
  { key: "packages", label: "Packages" },
  { key: "process",  label: "Process"  },
];

// Height of this sticky bar (48px) + a small buffer
const OFFSET = 48 + 16;

const NAV_H = 48;

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [slideUp, setSlideUp] = useState(0);

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
        // When bottom drops below NAV_H, start sliding the nav upward
        setSlideUp(Math.max(0, Math.min(NAV_H, NAV_H - bottom)));
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      className="sticky top-0 z-30 bg-white border-b border-black/10"
      style={{ transform: `translateY(-${slideUp}px)` }}
    >
      <div className="flex items-center justify-center h-12 gap-0">
        {sectionLinks.map(({ key, label }) => (
          <a
            key={key}
            href={`#${key}`}
            className={`relative h-full flex items-center px-5 text-[13px] font-medium no-underline transition-colors duration-150 ${
              activeSection === key
                ? "text-[#0d0d0d]"
                : "text-[#aaaaaa] hover:text-[#0d0d0d]"
            }`}
          >
            {label}
            {activeSection === key && (
              <span className="absolute inset-x-0 bottom-0 h-[4px] bg-[#f0c93a]" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
