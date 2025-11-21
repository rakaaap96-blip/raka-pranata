import React from 'react';
import { useCustomCursor } from '../hooks/useCustomCursor';

const CustomCursor: React.FC = () => {
  const { position, isPointer, isMobile } = useCustomCursor();

  // Jangan render apa-apa jika di mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Solid Dot */}
      <div
        className="fixed top-0 left-0 w-5 h-5 bg-[#d4af37] rounded-full pointer-events-none z-9999 transition-all duration-150 ease-out shadow-lg"
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
          scale: isPointer ? 1.3 : 1,
        }}
      />
      
      {/* Pulsing Ring */}
      <div
        className="fixed top-0 left-0 w-16 h-16 border border-[#d4af37] rounded-full pointer-events-none z-9998 transition-all duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 32}px, ${position.y - 32}px)`,
          scale: isPointer ? 1.2 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
      />
      
      {/* Subtle Glow Effect on Hover */}
      {isPointer && (
        <div
          className="fixed top-0 left-0 w-24 h-24 bg-[#d4af37] rounded-full pointer-events-none z-9997 transition-all duration-300 ease-out animate-pulse"
          style={{
            transform: `translate(${position.x - 48}px, ${position.y - 48}px)`,
            opacity: 0.1,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;