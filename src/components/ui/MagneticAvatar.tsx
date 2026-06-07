import { useState, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';

interface MagneticAvatarProps {
  image: string;
  name: string;
  isHovered: boolean;
}

export function MagneticAvatar({ image, name, isHovered }: MagneticAvatarProps) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnet({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setMagnet({ x: 0, y: 0 });

  return (
    <div
      ref={avatarRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* PARTIKEL ORBIT – selalu dirender, visibilitas diatur dengan CSS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-[#d4af37] transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              top: '50%',
              left: '50%',
              transitionDelay: `${i * 0.1}s`,
              ...(isHovered && {
                animation: `orbit-avatar ${2 + i * 0.3}s linear infinite`,
                '--orbit-r': `${28 + i * 3}px`,
                '--orbit-dur': `${2 + i * 0.3}s`,
              }),
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Glow di belakang avatar */}
      <div
        className={`absolute -inset-2 rounded-full bg-[#d4af37]/20 blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Avatar dengan efek magnetik */}
      <div
        className="relative transition-transform duration-200"
        style={{ transform: `translate(${magnet.x}px, ${magnet.y}px)` }}
      >
        <img
          src={image}
          alt={name}
          className={`w-10 h-10 rounded-full object-cover border-2 transition-all duration-500 ${
            isHovered
              ? 'border-[#d4af37] scale-110 shadow-lg shadow-[#d4af37]/30'
              : 'border-[#d4af37]/40'
          }`}
        />
        {/* Centang verified */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#d4af37] rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
          <FaCheck className="w-2 h-2 text-[#1a1a1a]" />
        </div>
      </div>
    </div>
  );
}