"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Infinite carousel hook with cloned edge slides for seamless looping.
 * Returns extended slide array, current position, animation state, and controls.
 */
export function useInfiniteCarousel<T>(slides: T[], autoAdvanceMs = 4000) {
  const extended = [slides[slides.length - 1], ...slides, slides[0]];
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Real index (0-based) for indicators
  const realIndex = ((pos - 1) % slides.length + slides.length) % slides.length;

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (autoAdvanceMs > 0) {
      timerRef.current = setInterval(() => {
        setAnimate(true);
        setPos((p) => p + 1);
      }, autoAdvanceMs);
    }
  }, [autoAdvanceMs]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // After transition to a clone, snap instantly to the real slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onEnd = () => {
      if (pos === 0) {
        setAnimate(false);
        setPos(slides.length);
      } else if (pos === extended.length - 1) {
        setAnimate(false);
        setPos(1);
      }
    };
    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
  }, [pos, slides.length, extended.length]);

  // Re-enable animation after snap
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [animate]);

  const goTo = useCallback(
    (realIdx: number) => {
      setAnimate(true);
      setPos(realIdx + 1);
      resetTimer();
    },
    [resetTimer],
  );

  const next = useCallback(() => {
    setAnimate(true);
    setPos((p) => p + 1);
    resetTimer();
  }, [resetTimer]);

  const prev = useCallback(() => {
    setAnimate(true);
    setPos((p) => p - 1);
    resetTimer();
  }, [resetTimer]);

  return {
    extended,
    pos,
    realIndex,
    animate,
    trackRef,
    goTo,
    next,
    prev,
    resetTimer,
  };
}
