import { useState, useEffect, useCallback, useRef } from 'react';
import { useIsLite } from '../lib/device';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [onclick], label, summary, [tabindex]:not([tabindex="-1"])';

export const useCustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const isDisabled = useIsLite();
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
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(renderCursor);
  }, [renderCursor]);

  const updateCursorType = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const next =
      !!target &&
      typeof target.closest === 'function' &&
      target.closest(INTERACTIVE_SELECTOR) !== null;
    // mouseover fires on every element the pointer enters, so without this
    // guard the cursor re-rendered dozens of times per second while moving.
    setIsPointer((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    if (isDisabled) return;
    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', updateCursorType, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDisabled, updatePosition, updateCursorType]);

  return { dotRef, ringRef, glowRef, isPointer, isDisabled };
};
