"use client";

import { useState, useEffect } from "react";

export const FONTS = [
  { n: 1,  label: "Syne",             family: "var(--font-syne)",             weight: "700", tracking: "-0.04em", lh: "0.94" },
  { n: 2,  label: "Space Grotesk",    family: "var(--font-space-grotesk)",    weight: "700", tracking: "-0.03em", lh: "0.94" },
  { n: 3,  label: "Instrument Serif", family: "var(--font-instrument-serif)", weight: "700", tracking: "0em",     lh: "1.0"  },
  { n: 4,  label: "Unbounded",        family: "var(--font-unbounded)",        weight: "800", tracking: "-0.03em", lh: "0.92" },
  { n: 5,  label: "Bricolage",        family: "var(--font-bricolage)",        weight: "800", tracking: "-0.02em", lh: "0.94" },
  { n: 6,  label: "Bebas Neue",       family: "var(--font-bebas-neue)",       weight: "400", tracking: "0.02em",  lh: "0.9"  },
  { n: 7,  label: "Fraunces",         family: "var(--font-fraunces)",         weight: "900", tracking: "-0.02em", lh: "0.94" },
  { n: 8,  label: "DM Serif",         family: "var(--font-dm-serif)",         weight: "400", tracking: "0em",     lh: "1.0"  },
  { n: 9,  label: "Playfair",         family: "var(--font-playfair)",         weight: "700", tracking: "-0.01em", lh: "0.94" },
  { n: 10, label: "Big Shoulders",    family: "var(--font-big-shoulders)",    weight: "900", tracking: "0.02em",  lh: "0.9"  },
] as const;

export function applyFont(n: number) {
  const f = FONTS[n - 1];
  document.body.style.setProperty("--heading-font",     f.family);
  document.body.style.setProperty("--heading-weight",   f.weight);
  document.body.style.setProperty("--heading-tracking", f.tracking);
  document.body.style.setProperty("--heading-lh",       f.lh);
  window.dispatchEvent(new CustomEvent("fontchange", { detail: n }));
}

export default function FontToggle() {
  const [active, setActive] = useState(4);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nas-font") ?? "4", 10);
    setActive(saved);
    applyFont(saved);
  }, []);

  const handleClick = (n: number) => {
    setActive(n);
    localStorage.setItem("nas-font", String(n));
    applyFont(n);
  };

  return (
    <div
      className="fixed right-5 top-1/2 z-50 hidden md:flex flex-col gap-1.5"
      style={{ transform: "translateY(-50%)" }}
    >
      {FONTS.map(({ n, label }) => {
        const isActive = active === n;
        return (
          <button
            key={n}
            onClick={() => handleClick(n)}
            title={label}
            style={{
              width: 34, height: 34,
              background:    isActive ? "#f0c93a" : "rgba(0,0,0,0.55)",
              border:        `1px solid ${isActive ? "#f0c93a" : "rgba(255,255,255,0.18)"}`,
              color:         isActive ? "#0d0d0d" : "rgba(255,255,255,0.4)",
              fontSize:      11, fontFamily: "inherit", fontWeight: "bold",
              cursor:        "pointer", display: "flex",
              alignItems:    "center", justifyContent: "center",
              transition:    "all 0.15s ease", backdropFilter: "blur(6px)",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
