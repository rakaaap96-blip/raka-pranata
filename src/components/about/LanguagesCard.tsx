import { useState, useRef, useEffect } from 'react';
import { IoLanguage } from 'react-icons/io5';

/* ============================================
   LANGUAGE BADGE (FIXED: hapus conditional render sparkle)
   ============================================ */
interface LanguageBadgeProps {
  name: string;
  color: string;
  index: number;
  categoryIndex: number;
}

function LanguageBadge({ name, color, index, categoryIndex }: LanguageBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), (categoryIndex * 200) + (index * 100));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (badgeRef.current) observer.observe(badgeRef.current);
    return () => observer.disconnect();
  }, [index, categoryIndex]);

  return (
    <div
      ref={badgeRef}
      className={`relative group/badge cursor-default transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
      }`}
    >
      <div className={`absolute -inset-1 rounded-xl ${color.replace('bg-', 'bg-').replace('/20', '/30').replace('/15', '/25').replace('/10', '/20').replace('/5', '/15')} opacity-0 blur-lg transition-all duration-500 group-hover/badge:opacity-60`} />

      <div className={`relative flex items-center px-5 py-3 ${color} text-[#ffffea] rounded-xl border font-medium transition-all duration-500 overflow-hidden group-hover/badge:scale-105 group-hover/badge:-translate-y-1 group-hover/badge:shadow-lg group-hover/badge:shadow-[#d4af37]/20`}>
        
        <div className="absolute inset-0 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
        </div>

        <span className="relative z-10 group-hover/badge:text-[#d4af37] transition-colors duration-300">
          {name}
        </span>

        {/* Sparkle dot – dihapus total, tidak ada conditional render lagi */}
      </div>
    </div>
  );
}

/* ============================================
   LANGUAGE CATEGORY CARD (tidak berubah, partikel sudah fixed)
   ============================================ */
interface LanguageCategoryProps {
  category: {
    level: string;
    languages: Array<{ name: string }>;
    color: string;
  };
  index: number;
}

function LanguageCategory({ category, index }: LanguageCategoryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
    setMagnet({ 
      x: (e.clientX - rect.left - rect.width / 2) * 0.05, 
      y: (e.clientY - rect.top - rect.height / 2) * 0.05 
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMagnet({ x: 0, y: 0 });
  };

  const pulseIntensity = {
    'Native': 'animate-pulse-fast',
    'Fluent': 'animate-pulse',
    'Conversational': 'animate-pulse-slow',
    'Basic': 'animate-pulse-slower'
  }[category.level] || 'animate-pulse';

  return (
    <div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Partikel orbit – selalu render */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-[#d4af37] transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              top: '20%',
              left: '50%',
              transitionDelay: `${i * 0.1}s`,
              ...(isHovered && {
                animation: `particle-orbit ${3 + i * 0.5}s linear infinite`,
                '--orbit-radius': `${40 + i * 15}px`,
                '--orbit-duration': `${3 + i * 0.5}s`,
              }),
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Glow aura dan card lainnya tetap sama */}
      <div className={`absolute -inset-2 rounded-3xl bg-linear-to-r ${category.color.includes('d4af37') ? 'from-[#d4af37]/20' : 'from-[#d4af37]/10'} to-transparent opacity-0 blur-2xl transition-all duration-700 ${isHovered ? 'opacity-100' : ''}`} />

      <div 
        className={`relative h-full bg-[#1a1a1a]/70 backdrop-blur-md rounded-2xl p-6 border border-[#d4af37]/10 overflow-hidden transition-all duration-500 ${isHovered ? 'border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/10' : ''}`}
        style={{
          transform: `translate(${magnet.x}px, ${magnet.y}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, border 0.5s, box-shadow 0.5s',
        }}
      >
        {/* Animated top border */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${category.color.replace('bg-', 'from-').replace('/20', '').replace('/15', '').replace('/10', '').replace('/5', '')} to-[#f4d03f] opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

        {/* Holographic border */}
        <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-holo-shift p-px">
            <div className="w-full h-full rounded-2xl bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Level Header */}
        <div className="relative mb-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${category.color} border transition-all duration-500 ${isHovered ? 'scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : ''}`}>
            <div className={`w-2 h-2 rounded-full bg-[#d4af37] ${pulseIntensity}`} />
            <span className="font-bold text-[#d4af37] text-sm tracking-wider uppercase">
              {category.level}
            </span>
          </div>
          
          <div className="mt-4 mx-auto w-12 h-px bg-linear-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        </div>

        {/* Languages List */}
        <div className="space-y-3 relative z-10">
          {category.languages.map((lang, i) => (
            <LanguageBadge 
              key={lang.name} 
              name={lang.name} 
              color={category.color} 
              index={i} 
              categoryIndex={index}
            />
          ))}
        </div>

        {/* Bottom glow */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#d4af37]/10 rounded-full blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
}

/* ============================================
   MAIN LANGUAGES CARD (tidak berubah)
   ============================================ */
interface LanguageCategoryType {
  level: string;
  languages: Array<{ name: string }>;
  color: string;
}

function LanguagesCard() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const languageCategories: LanguageCategoryType[] = [
    { 
      level: "Native", 
      languages: [
        { name: 'Indonesian' },
        { name: 'Sundanese' }
      ], 
      color: "bg-[#d4af37]/20 border-[#d4af37]/40" 
    },
    { 
      level: "Fluent", 
      languages: [
        { name: 'Javanese' },
        { name: 'English' }
      ], 
      color: "bg-[#d4af37]/15 border-[#d4af37]/30" 
    },
    { 
      level: "Conversational", 
      languages: [
        { name: 'Tagalog' },
        { name: 'Japanese' }
      ], 
      color: "bg-[#d4af37]/10 border-[#d4af37]/20" 
    },
    { 
      level: "Basic", 
      languages: [
        { name: 'Spanish' },
        { name: 'Russian' }
      ], 
      color: "bg-[#d4af37]/5 border-[#d4af37]/10" 
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative group perspective-1200"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight({ x: 50, y: 50 })}
    >
      <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative bg-[#1a1a1a]/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-[#d4af37]/15 overflow-hidden transition-all duration-700 group-hover:border-[#d4af37]/30 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/10">
        
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        <div className="relative flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="w-14 h-14 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-[#d4af37]/30">
              <IoLanguage className="w-7 h-7 text-[#1a1a1a]" />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-[#d4af37] opacity-0 group-hover:opacity-60 scale-125 animate-ping" />
          </div>
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
              Language Skills
            </h3>
            <div className="h-1 w-0 group-hover:w-24 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-700 mt-2" />
          </div>

          <div className="hidden sm:flex items-end gap-1 ml-auto h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-linear-to-t from-[#d4af37] to-[#f4d03f] rounded-full animate-sound-wave"
                style={{ 
                  height: '20%',
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.8 + i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {languageCategories.map((category, index) => (
            <LanguageCategory 
              key={category.level} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

        <div className="mt-10 mx-auto w-full max-w-md h-px bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </div>
    </div>
  );
}

export default LanguagesCard;