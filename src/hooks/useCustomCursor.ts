import { useState, useEffect, useCallback, useRef } from 'react';

function getIsMobile() {
  return typeof window !== 'undefined' &&
    (window.innerWidth <= 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0);
}

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [onclick], label';

export const useCustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile] = useState(getIsMobile);
  const isMobileRef = useRef(isMobile);
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const renderCursor = useCallback(() => {
    const { x, y } = lastPosRef.current;
    dotRef.current?.style.setProperty('transform', `translate3d(${x - 10}px, ${y - 10}px, 0)`);
    ringRef.current?.style.setProperty('transform', `translate3d(${x - 32}px, ${y - 32}px, 0)`);
    glowRef.current?.style.setProperty('transform', `translate3d(${x - 48}px, ${y - 48}px, 0)`);
    rafRef.current = 0;
  }, []);

  const updatePosition = useCallback((e: MouseEvent) => {
    if (isMobileRef.current) return;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(renderCursor);
  }, [renderCursor]);

  const updateCursorType = useCallback((e: MouseEvent) => {
    if (isMobileRef.current) return;
    const target = e.target as HTMLElement;
    if (!target || !target.closest) {
      setIsPointer(false);
      return;
    }
    setIsPointer(target.closest(INTERACTIVE_SELECTOR) !== null);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', updatePosition, { passive: true });
      window.addEventListener('mouseover', updateCursorType, { passive: true });
    }
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, updatePosition, updateCursorType]);

  return { dotRef, ringRef, glowRef, isPointer, isMobile };
};