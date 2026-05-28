import { useRef, useCallback, type TouchEvent } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) onSwipeLeft?.();
      else onSwipeRight?.();
    }
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
