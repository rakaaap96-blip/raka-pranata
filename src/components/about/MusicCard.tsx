import { useState, useRef, useEffect, useMemo } from 'react';
import { FaGuitar, FaMusic, FaMicrophone, FaLightbulb, FaHeart } from 'react-icons/fa';
import { GiGuitarBassHead } from 'react-icons/gi';
import { BsSoundwave } from 'react-icons/bs';

// ============================================
// FLOATING MUSICAL NOTE (tidak bermasalah, tetap)
// ============================================
function FloatingNote({ delay, left, symbol, duration }: { delay: number; left: string; symbol: string; duration: number }) {
  return (
    <div
      className="absolute text-[#d4af37]/20 text-2xl pointer-events-none select-none"
      style={{
        left,
        bottom: '-10%',
        animation: `floatNote ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {symbol}
    </div>
  );
}

// ============================================
// EQUALIZER BAR
// ============================================
function EqBar({ delay, height }: { delay: number; height: string }) {
  return (
    <div
      className="w-1 bg-linear-to-t from-[#d4af37] to-[#f4d03f] rounded-full"
      style={{
        height,
        animation: `eqPulse 0.8s ease-in-out infinite alternate`,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

// ============================================
// GUITAR STRING (FIXED: selalu render, blur diatur opacity)
// ============================================
function GuitarString({ index, isHovered }: { index: number; isHovered: boolean }) {
  return (
    <div className="relative h-px flex-1">
      {/* String utama */}
      <div
        className={`absolute inset-0 bg-linear-to-r from-transparent via-[#d4af37]/40 to-transparent transition-all duration-300 ${
          isHovered ? 'animate-string-vibrate' : ''
        }`}
        style={{
          animationDelay: `${index * 50}ms`,
          animationDuration: `${0.3 + index * 0.1}s`,
        }}
      />
      {/* String blur (glow) – selalu ada, hanya opasitas diatur */}
      <div
        className={`absolute inset-0 bg-linear-to-r from-transparent via-[#f4d03f]/60 to-transparent transition-opacity duration-300 blur-sm ${
          isHovered ? 'opacity-100 animate-string-vibrate' : 'opacity-0'
        }`}
        style={{ animationDelay: `${index * 50}ms` }}
      />
    </div>
  );
}

// ============================================
// MAGNETIC SKILL TAG (FIXED: partikel selalu dirender)
// ============================================
interface MagneticTagProps {
  skill: { name: string; icon: React.ComponentType<{ className?: string }> };
  index: number;
}

function MagneticTag({ skill, index }: MagneticTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tagRef = useRef<HTMLSpanElement>(null);
  const IconComponent = skill.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (tagRef.current) observer.observe(tagRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = tagRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnet({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagnet({ x: 0, y: 0 });
  };

  return (
    <span
      ref={tagRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4af37]/10 text-[#d4af37] text-sm rounded-full border border-[#d4af37]/20 font-medium cursor-default overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
      } ${isHovered ? 'scale-110 bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-[#d4af37]/30 border-[#d4af37]' : ''}`}
      style={{
        transform: `translate(${magnet.x}px, ${magnet.y}px) scale(${isHovered ? 1.1 : 1})`,
        transitionProperty: isHovered ? 'transform' : 'transform, opacity, background, color',
        transitionDuration: isHovered ? '0.15s' : '0.4s, 0.6s, 0.3s, 0.3s',
        transitionTimingFunction: isHovered ? 'ease-out' : 'cubic-bezier(0.34, 1.56, 0.64, 1), ease-out, ease-out, ease-out',
      }}
    >
      {/* Ripple effect – selalu ada, visibilitas dengan opacity+scale */}
      <div
        className={`absolute inset-0 rounded-full bg-white/20 transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } animate-ripple`}
      />

      <IconComponent className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
      <span className="relative z-10">{skill.name}</span>

      {/* Ping dot – selalu ada */}
      <span
        className={`absolute -top-1 -right-1 w-2 h-2 bg-[#f4d03f] rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isHovered ? 'animate-ping' : ''}`}
      />
    </span>
  );
}

// ============================================
// VINYL DISC (tidak bermasalah)
// ============================================
function VinylDisc({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`relative w-16 h-16 transition-all duration-700 ${isHovered ? 'scale-110' : ''}`}>
      <div
        className={`absolute inset-0 rounded-full bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-2 border-[#d4af37]/30 transition-all duration-500 ${
          isHovered ? 'animate-spin-slow' : ''
        }`}
      >
        <div className="absolute inset-1 rounded-full border border-[#d4af37]/10" />
        <div className="absolute inset-2 rounded-full border border-[#d4af37]/10" />
        <div className="absolute inset-3 rounded-full border border-[#d4af37]/10" />
        <div className="absolute inset-4 rounded-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] flex items-center justify-center">
          <FaMusic className="w-5 h-5 text-[#1a1a1a]" />
        </div>
      </div>
      <div className={`absolute -inset-2 rounded-full bg-[#d4af37]/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}

// ============================================
// MAIN MUSIC CARD (tidak ada perubahan besar)
// ============================================
function MusicCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Guitar', icon: FaGuitar },
    { name: 'Songwriting', icon: FaMusic },
    { name: 'Singing', icon: FaMicrophone },
    { name: 'Inspiration', icon: FaLightbulb },
    { name: 'Instrumental', icon: GiGuitarBassHead },
    { name: 'Soothing', icon: BsSoundwave },
    { name: 'Serenading', icon: FaHeart },
  ];

  const notes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];
  const floatingNotes = useMemo(
    () =>
      notes.map((note, i) => ({
        note,
        delay: i * 1.5,
        left: `${10 + i * 12}%`,
        duration: 6 + (i % 4),
      })),
    [notes]
  );

  const eqBars = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        delay: i * 50,
        height: `${20 + (i % 80)}%`,
      })),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      className="relative group h-full"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        {floatingNotes.map((item, i) => (
          <FloatingNote key={i} delay={item.delay} left={item.left} symbol={item.note} duration={item.duration} />
        ))}
      </div>
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.08), transparent 40%)`,
        }}
      />
      <div
        className={`relative bg-[#1a1a1a]/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-[#d4af37]/15 overflow-hidden transition-all duration-700 group-hover:border-[#d4af37]/30 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/10 h-full flex flex-col ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transitionProperty: 'transform, border, box-shadow, opacity',
          transitionDuration: '0.1s, 0.5s, 0.5s, 0.8s',
          transitionTimingFunction: 'ease-out, ease-out, ease-out, ease-out',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-center gap-1 px-8 opacity-30 pointer-events-none overflow-hidden">
          {eqBars.map((bar, i) => (
            <EqBar key={i} delay={bar.delay} height={bar.height} />
          ))}
        </div>
        <div className="absolute top-20 left-8 right-8 flex gap-3 pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <GuitarString key={i} index={i} isHovered={isHovered} />
          ))}
        </div>
        <div className="relative flex items-center gap-4 mb-8 mt-4 shrink-0">
          <VinylDisc isHovered={isHovered} />
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-black text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
              Music & Creativity
            </h3>
            <div className="h-1 w-0 group-hover:w-32 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-700 mt-2" />
          </div>
          <div className={`relative transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
            <FaMusic className="w-8 h-8 text-[#d4af37]/40" />
            <div
              className={`absolute inset-0 blur-lg bg-[#d4af37]/30 rounded-full transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p
            className={`relative text-[#ffffea]/70 leading-relaxed mb-8 text-lg transition-all duration-500 ${
              isHovered ? 'text-[#ffffea]/90' : ''
            }`}
          >
            When I'm not coding, you'll probably find me with my guitar, lost in a world of chords and lyrics.
            Music's like my second language — it's where logic meets emotion, and where I get to turn feelings into
            sound. Whether it's late-night jam sessions or scribbling song ideas in a notebook, that's my kind of
            therapy.
          </p>
          <div className="flex flex-wrap gap-3 relative z-10">
            {skills.map((skill, index) => (
              <MagneticTag key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
        <div className="mt-10 mx-auto w-full max-w-md h-px bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent shrink-0" />
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#d4af37]/10 rounded-full blur-3xl transition-opacity duration-700 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

export default MusicCard;