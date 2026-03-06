"use client";

import { useState, useEffect } from "react";

const LABELS = ["Dark", "Centered Morph", "Centered Rounded"];

export default function HeroToggle() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nas-hero") ?? "1", 10);
    setActive(saved);
    window.dispatchEvent(new CustomEvent("herochange", { detail: saved }));
  }, []);

  const handleClick = (n: number) => {
    setActive(n);
    localStorage.setItem("nas-hero", String(n));
    window.dispatchEvent(new CustomEvent("herochange", { detail: n }));
  };

  return (
    <div
      className="fixed right-5 top-1/2 z-50 hidden md:flex flex-col gap-1.5"
      style={{ transform: "translateY(-50%)" }}
    >
      {[1, 2, 3].map((n) => {
        const isActive = active === n;
        return (
          <button
            key={n}
            onClick={() => handleClick(n)}
            title={LABELS[n - 1]}
            style={{
              width: 34,
              height: 34,
              borderRadius: 4,
              background: isActive ? "#f0c93a" : "rgba(30,30,30,0.75)",
              border: `1px solid ${isActive ? "#f0c93a" : "rgba(255,255,255,0.15)"}`,
              color: isActive ? "#0d0d0d" : "rgba(255,255,255,0.7)",
              fontSize: 11,
              fontFamily: "inherit",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
              backdropFilter: "blur(6px)",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
