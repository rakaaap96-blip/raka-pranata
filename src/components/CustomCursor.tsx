import { useCustomCursor } from '../hooks/useCustomCursor';

function CustomCursor() {
  const { dotRef, ringRef, glowRef, isPointer, isMobile } = useCustomCursor();

  // Jangan render apa-apa jika di mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Solid Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-5 h-5 bg-[#d4af37] rounded-full pointer-events-none z-9999 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Pulsing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-16 h-16 border border-[#d4af37] rounded-full pointer-events-none z-9998 will-change-transform"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
          scale: isPointer ? 1.2 : 1,
          opacity: isPointer ? 0.6 : 0.3,
          transition: 'scale 0.5s ease-out, opacity 0.5s ease-out',
        }}
      />

      {/* Subtle Glow Effect on Hover */}
      {isPointer && (
        <div
          ref={glowRef}
          className="fixed top-0 left-0 w-24 h-24 bg-[#d4af37] rounded-full pointer-events-none z-9997 animate-pulse will-change-transform"
          style={{
            transform: 'translate3d(-300px, -300px, 0)',
            opacity: 0.1,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;