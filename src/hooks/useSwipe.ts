import { useRef, useCallback, useState } from "react";

/**
 * Swipe/drag detection for carousels.
 * Returns touch + mouse event handlers to spread onto a container element.
 * `dragOffset` gives the live pixel offset during a drag for slide-along effect.
 */
export function useSwipe(
  onNext: () => void,
  onPrev: () => void,
  threshold = 40,
) {
  const startX = useRef(0);
  const dragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    setDragOffset(e.touches[0].clientX - startX.current);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.changedTouches[0].clientX - startX.current;
      setDragOffset(0);
      if (Math.abs(dx) > threshold) {
        dx < 0 ? onNext() : onPrev();
      }
    },
    [onNext, onPrev, threshold],
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    e.preventDefault(); // prevent text selection during drag
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setDragOffset(e.clientX - startX.current);
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - startX.current;
      setDragOffset(0);
      if (Math.abs(dx) > threshold) {
        dx < 0 ? onNext() : onPrev();
      }
    },
    [onNext, onPrev, threshold],
  );

  const onMouseLeave = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      setDragOffset(0);
    }
  }, []);

  const handlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };

  return { handlers, dragOffset };
}
