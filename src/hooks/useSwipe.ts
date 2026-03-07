import { useRef, useCallback } from "react";

/**
 * Lightweight swipe/drag detection for carousels.
 * Returns touch + mouse event handlers to spread onto a container element.
 * Calls onNext (swipe left) or onPrev (swipe right) when the gesture
 * exceeds the threshold.
 */
export function useSwipe(
  onNext: () => void,
  onPrev: () => void,
  threshold = 40,
) {
  const startX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > threshold) {
        dx < 0 ? onNext() : onPrev();
      }
    },
    [onNext, onPrev, threshold],
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > threshold) {
        dx < 0 ? onNext() : onPrev();
      }
    },
    [onNext, onPrev, threshold],
  );

  const onMouseLeave = useCallback(() => {
    dragging.current = false;
  }, []);

  return { onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onMouseLeave };
}
