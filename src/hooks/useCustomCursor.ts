import { useState, useEffect, useCallback } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if device is mobile
  const checkIsMobile = useCallback(() => {
    return (
      typeof window !== 'undefined' &&
      (window.innerWidth <= 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    );
  }, []);

  const updateCursorType = useCallback((e: MouseEvent) => {
    if (isMobile) return;
    
    const target = e.target as HTMLElement;
    
    if (!target) {
      setIsPointer(false);
      return;
    }

    // Check if element or its parents are interactive
    const isInteractiveElement = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.onclick !== null ||
      target.hasAttribute('onclick') ||
      target.closest('button') !== null ||
      target.closest('a') !== null ||
      target.closest('[role="button"]') !== null ||
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.style.cursor === 'pointer';

    setIsPointer(isInteractiveElement);
  }, [isMobile]);

  const updatePosition = useCallback((e: MouseEvent) => {
    if (isMobile) return;
    setPosition({ x: e.clientX, y: e.clientY });
  }, [isMobile]);

  useEffect(() => {
    // Check if mobile on initial load
    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    // Only add event listeners if not mobile
    if (!isMobile) {
      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('mousemove', updateCursorType);
    }

    // Add resize listener for mobile detection
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', updateCursorType);
      window.removeEventListener('resize', handleResize);
    };
  }, [updatePosition, updateCursorType, isMobile, checkIsMobile]);

  return { position, isPointer, isMobile };
};