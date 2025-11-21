// components/Footer/AnimatedBackground.tsx
function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-gradient-x" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#f4d03f]/3 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#d4af37]/3 rounded-full blur-xl animate-pulse delay-500" />
    </div>
  );
}

export default AnimatedBackground;