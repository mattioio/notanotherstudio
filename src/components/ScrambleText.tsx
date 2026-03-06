"use client";

import { useState, useRef, useCallback, useEffect, type CSSProperties } from "react";

// Flat geometric circle glyphs only — no emoji, no 3D renders
const CIRCLES = [
  "●", "○", "◉", "◎", "⊙", "⊚", "⊕", "⊗",
  "⬤", "◐", "◑", "◔", "◕", "⦿", "⊘", "⊖",
];

function pickCircle() {
  return CIRCLES[Math.floor(Math.random() * CIRCLES.length)];
}

/**
 * ScrambleText — renders text normally, but "o" and "O" characters
 * cycle through flat circle-shaped glyphs on hover and revert on leave.
 * All other characters render as plain text with no effect.
 */
export default function ScrambleText({
  text,
  className,
  style,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}) {
  const original = useRef(text);
  const [display, setDisplay] = useState(() => [...text]);
  const timers = useRef<Map<number, ReturnType<typeof setInterval>>>(new Map());

  useEffect(() => {
    original.current = text;
    setDisplay([...text]);
  }, [text]);

  const startLetter = useCallback((i: number) => {
    const ch = original.current[i];
    if (ch !== "o" && ch !== "O") return;

    const existing = timers.current.get(i);
    if (existing) clearInterval(existing);

    // Immediately show a glyph
    setDisplay((prev) => {
      const next = [...prev];
      next[i] = pickCircle();
      return next;
    });

    const timer = setInterval(() => {
      setDisplay((prev) => {
        const next = [...prev];
        next[i] = pickCircle();
        return next;
      });
    }, 100 + Math.random() * 180);
    timers.current.set(i, timer);
  }, []);

  const stopLetter = useCallback((i: number) => {
    const timer = timers.current.get(i);
    if (timer) {
      clearInterval(timer);
      timers.current.delete(i);
    }
    // Revert back to the original letter
    setDisplay((prev) => {
      const next = [...prev];
      next[i] = original.current[i];
      return next;
    });
  }, []);

  // Cleanup on unmount
  useEffect(
    () => () => {
      timers.current.forEach((t) => clearInterval(t));
      timers.current.clear();
    },
    [],
  );

  return (
    <Tag className={className} style={{ ...style, cursor: "default" }}>
      {display.map((ch, i) => {
        const isO = original.current[i] === "o" || original.current[i] === "O";
        if (!isO) return ch === " " ? " " : ch;
        return (
          <span
            key={i}
            onMouseEnter={() => startLetter(i)}
            onMouseLeave={() => stopLetter(i)}
            style={{ cursor: "pointer" }}
          >
            {ch}
          </span>
        );
      })}
    </Tag>
  );
}
