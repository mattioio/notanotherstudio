"use client";

import { useState, useEffect } from "react";

export interface BgTheme {
  label: string;
  bg: string;
  text: string;
  blurb: string;
  highlight: string;
  highlightText: string;
  vignette: string;
  showConstellation: boolean;
  dotColor: string;
  dotActive: string;
  lineRGB: string;
  lineMaxAlpha: number;
  pattern: "none" | "grain" | "grid" | "dots" | "noise" | "scanlines" | "crosshatch";
  patternColor: string;
}

export const BG_THEMES: BgTheme[] = [
  /* 1  Dark Space — current default */
  {
    label: "Dark Space",
    bg: "#0d0d0d",
    text: "white",
    blurb: "rgba(255,255,255,0.40)",
    highlight: "#f0c93a",
    highlightText: "#0d0d0d",
    vignette: "#0d0d0d",
    showConstellation: true,
    dotColor: "rgba(255,255,255,0.65)",
    dotActive: "#f0c93a",
    lineRGB: "255,255,255",
    lineMaxAlpha: 0.3,
    pattern: "none",
    patternColor: "",
  },
  /* 2  Darkroom — red safelight */
  {
    label: "Darkroom",
    bg: "#1a0505",
    text: "#ff9999",
    blurb: "rgba(255,150,150,0.40)",
    highlight: "#cc2233",
    highlightText: "#ffffff",
    vignette: "#1a0505",
    showConstellation: true,
    dotColor: "rgba(204,34,51,0.4)",
    dotActive: "#cc2233",
    lineRGB: "204,34,51",
    lineMaxAlpha: 0.2,
    pattern: "none",
    patternColor: "",
  },
  /* 3  Chalkboard — dark green, chalk dust */
  {
    label: "Chalkboard",
    bg: "#1a2e1a",
    text: "#e8e8d8",
    blurb: "rgba(232,232,216,0.45)",
    highlight: "#ffffff",
    highlightText: "#1a2e1a",
    vignette: "#1a2e1a",
    showConstellation: false,
    dotColor: "",
    dotActive: "",
    lineRGB: "",
    lineMaxAlpha: 0,
    pattern: "grain",
    patternColor: "rgba(255,255,255,0.03)",
  },
  /* 4  Holo — holographic rainbow */
  {
    label: "Holo",
    bg: "linear-gradient(135deg, #ff6b6b 0%, #ffd93d 20%, #6bff6b 40%, #6bc5ff 60%, #c56bff 80%, #ff6bab 100%)",
    text: "#0d0d0d",
    blurb: "rgba(13,13,13,0.50)",
    highlight: "#0d0d0d",
    highlightText: "#ffffff",
    vignette: "transparent",
    showConstellation: false,
    dotColor: "",
    dotActive: "",
    lineRGB: "",
    lineMaxAlpha: 0,
    pattern: "none",
    patternColor: "",
  },
  /* 5  Blueprint Grid */
  {
    label: "Grid",
    bg: "#0d1b2a",
    text: "#c8d6e5",
    blurb: "rgba(200,214,229,0.40)",
    highlight: "#f0c93a",
    highlightText: "#0d0d0d",
    vignette: "#0d1b2a",
    showConstellation: false,
    dotColor: "",
    dotActive: "",
    lineRGB: "",
    lineMaxAlpha: 0,
    pattern: "grid",
    patternColor: "rgba(200,214,229,0.06)",
  },
  /* 6  Newsprint — aged paper, halftone */
  {
    label: "Newsprint",
    bg: "#f0e8d0",
    text: "#1a1a1a",
    blurb: "rgba(26,26,26,0.50)",
    highlight: "#cc0000",
    highlightText: "#ffffff",
    vignette: "#f0e8d0",
    showConstellation: false,
    dotColor: "",
    dotActive: "",
    lineRGB: "",
    lineMaxAlpha: 0,
    pattern: "dots",
    patternColor: "rgba(0,0,0,0.08)",
  },
  /* 7  Blacklight — UV fluorescent */
  {
    label: "Blacklight",
    bg: "#0a0014",
    text: "#e0b0ff",
    blurb: "rgba(224,176,255,0.40)",
    highlight: "#ff00ff",
    highlightText: "#0a0014",
    vignette: "#0a0014",
    showConstellation: true,
    dotColor: "rgba(255,0,255,0.4)",
    dotActive: "#ff00ff",
    lineRGB: "255,0,255",
    lineMaxAlpha: 0.2,
    pattern: "none",
    patternColor: "",
  },
  /* 8  Dusk Gradient */
  {
    label: "Dusk",
    bg: "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0d0d0d 100%)",
    text: "white",
    blurb: "rgba(255,255,255,0.40)",
    highlight: "#c77dff",
    highlightText: "#0d0d0d",
    vignette: "#1a0a2e",
    showConstellation: true,
    dotColor: "rgba(199,125,255,0.45)",
    dotActive: "#c77dff",
    lineRGB: "199,125,255",
    lineMaxAlpha: 0.2,
    pattern: "none",
    patternColor: "",
  },
  /* 9  Noir — film noir B&W */
  {
    label: "Noir",
    bg: "#0a0a0a",
    text: "#ffffff",
    blurb: "rgba(255,255,255,0.35)",
    highlight: "#ffffff",
    highlightText: "#0a0a0a",
    vignette: "#0a0a0a",
    showConstellation: true,
    dotColor: "rgba(255,255,255,0.7)",
    dotActive: "#ffffff",
    lineRGB: "255,255,255",
    lineMaxAlpha: 0.35,
    pattern: "none",
    patternColor: "",
  },
  /* 10 Riso — risograph print */
  {
    label: "Riso",
    bg: "#ff6b6b",
    text: "#ffffff",
    blurb: "rgba(255,255,255,0.60)",
    highlight: "#2424ff",
    highlightText: "#ffffff",
    vignette: "#ff6b6b",
    showConstellation: false,
    dotColor: "",
    dotActive: "",
    lineRGB: "",
    lineMaxAlpha: 0,
    pattern: "grain",
    patternColor: "rgba(0,0,0,0.05)",
  },
];

export default function BackgroundToggle() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nas-bg") ?? "1", 10);
    setActive(saved);
    window.dispatchEvent(new CustomEvent("bgchange", { detail: saved }));
  }, []);

  const handleClick = (n: number) => {
    setActive(n);
    localStorage.setItem("nas-bg", String(n));
    window.dispatchEvent(new CustomEvent("bgchange", { detail: n }));
  };

  return (
    <div
      className="fixed right-5 top-1/2 z-50 hidden md:flex flex-col gap-1.5"
      style={{ transform: "translateY(-50%)" }}
    >
      {BG_THEMES.map((theme, i) => {
        const n = i + 1;
        const isActive = active === n;
        return (
          <button
            key={n}
            onClick={() => handleClick(n)}
            title={theme.label}
            style={{
              width: 34,
              height: 34,
              background: isActive ? "#f0c93a" : "rgba(0,0,0,0.55)",
              border: `1px solid ${isActive ? "#f0c93a" : "rgba(255,255,255,0.18)"}`,
              color: isActive ? "#0d0d0d" : "rgba(255,255,255,0.4)",
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
