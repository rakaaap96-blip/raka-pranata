import React, { useState, useRef, useEffect } from 'react';
import { FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import { GiSpiderWeb } from 'react-icons/gi';

// ============================================
// NEURAL NETWORK NODE
// ============================================
interface NodeProps {
  x: number;
  y: number;
  delay: number;
  isHovered: boolean;
}

function NeuralNode({ x, y, delay, isHovered }: NodeProps) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full bg-[#d4af37]/30 transition-all duration-700"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transitionDelay: `${delay}ms`,
        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
        boxShadow: isHovered ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
      }}
    />
  );
}

// ============================================
// MORPHING BLOB
// ============================================
interface MorphingBlobProps {
  isHovered: boolean;
}

function MorphingBlob({ isHovered }: MorphingBlobProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 transition-all duration-1000 ${isHovered ? 'opacity-30' : 'opacity-10'}`}>
      <div className="absolute inset-0 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-full blur-3xl animate-morph-blob" />
      <div className="absolute inset-8 bg-linear-to-r from-[#f4d03f] via-[#d4af37] to-[#f4d03f] rounded-full blur-2xl animate-morph-blob-reverse" />
    </div>
  );
}

// ============================================
// TYPING TEXT EFFECT
// ============================================
interface TypingTextProps {
  text: string;
  isVisible: boolean;
  delay: number;
}

function TypingText({ text, isVisible, delay }: TypingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className="relative">
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-[#d4af37] ml-0.5 animate-blink" />
      )}
    </span>
  );
}

// ============================================
// PHILOSOPHY ITEM — 3D FLIP CARD
// ============================================
interface PhilosophyItemProps {
  item: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index: number;
  isVisible: boolean;
}

function PhilosophyItem({ item, index, isVisible }: PhilosophyItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = item.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMagnet({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagnet({ x: 0, y: 0 });
  };

  const ringRadius = 22;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - 0.85 * ringCircumference;

  return (
    <div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute -inset-3 rounded-2xl bg-linear-to-r from-[#d4af37]/20 to-transparent opacity-0 blur-2xl transition-all duration-700 ${isHovered ? 'opacity-100' : ''}`} />
      <div
        className={`relative h-full bg-[#1a1a1a]/70 backdrop-blur-md rounded-2xl p-6 border border-[#d4af37]/10 overflow-hidden ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${isHovered ? 'border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/10 scale-[1.02]' : ''}`}
        style={{
          transform: `translate(${magnet.x}px, ${magnet.y}px) rotateX(${isHovered ? magnet.y * -0.5 : 0}deg) rotateY(${isHovered ? magnet.x * 0.5 : 0}deg)`,
          transformStyle: 'preserve-3d',
          transitionProperty: isHovered ? 'transform' : 'transform, opacity, border, box-shadow',
          transitionDuration: isHovered ? '0.1s' : '0.5s, 0.8s, 0.5s, 0.5s',
          transitionTimingFunction: isHovered ? 'ease-out' : 'ease-out, ease-out, ease-out, ease-out',
          transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
        }}
      >
        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-shimmer-sweep" />
        </div>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
              <IconComponent className="w-6 h-6 text-[#1a1a1a]" />
            </div>
            <svg className="absolute -inset-1 w-16 h-16 -rotate-90 pointer-events-none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={ringRadius} fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="2" />
              <circle
                cx="32"
                cy="32"
                r={ringRadius}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={isVisible ? ringOffset : ringCircumference}
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 150 + 400}ms` }}
              />
            </svg>
            <div className={`absolute inset-0 rounded-full bg-[#d4af37]/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-lg mb-2 transition-colors duration-300 ${isHovered ? 'text-[#d4af37]' : 'text-[#ffffea]'}`}>
              {item.title}
            </h4>
            <p className="text-[#ffffea]/60 text-sm leading-relaxed">
              <TypingText text={item.description} isVisible={isVisible} delay={index * 150 + 600} />
            </p>
          </div>
        </div>
        <div className={`mt-4 h-px bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/30 to-[#d4af37]/0 transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
}

// ============================================
// MAIN PHILOSOPHY CARD (FIXED: connecting lines selalu render)
// ============================================
function PhilosophyCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const philosophies = [
    {
      title: 'User-Centered Design',
      description: 'Every pixel should serve a purpose and create meaningful experiences',
      icon: FaPaintBrush,
    },
    {
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that other developers love to work with',
      icon: FaCode,
    },
    {
      title: 'Continuous Learning',
      description: 'The tech landscape evolves fast, and so do I',
      icon: FaRocket,
    },
  ];

  const nodes = [
    { x: 10, y: 20 }, { x: 25, y: 15 }, { x: 40, y: 25 },
    { x: 60, y: 10 }, { x: 75, y: 30 }, { x: 90, y: 20 },
    { x: 15, y: 50 }, { x: 35, y: 45 }, { x: 55, y: 55 },
    { x: 70, y: 60 }, { x: 85, y: 50 }, { x: 20, y: 80 },
    { x: 45, y: 75 }, { x: 65, y: 85 }, { x: 80, y: 70 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
      className="relative group perspective-1200 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      <MorphingBlob isHovered={isHovered} />
      
      {/* Neural nodes + connecting lines – selalu render, tanpa conditional {isHovered && ...} */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        {nodes.map((node, i) => (
          <NeuralNode key={i} x={node.x} y={node.y} delay={i * 100} isHovered={isHovered} />
        ))}
        
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((target, j) => {
            const dist = Math.sqrt((target.x - node.x) ** 2 + (target.y - node.y) ** 2);
            if (dist < 35) {
              const length = Math.sqrt((target.x - node.x) ** 2 + (target.y - node.y) ** 2);
              const angle = Math.atan2(target.y - node.y, target.x - node.x) * (180 / Math.PI);
              return (
                <div
                  key={`${i}-${j}`}
                  className="absolute h-px bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 transition-all duration-1000"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: `${length}%`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '0 50%',
                    opacity: isHovered ? 0.6 : 0,
                  }}
                />
              );
            }
            return null;
          })
        )}
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
      >
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative flex items-center gap-4 mb-10 shrink-0">
          <div className="relative">
            <div className="w-14 h-14 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-[#d4af37]/30">
              <GiSpiderWeb className="w-7 h-7 text-[#1a1a1a]" />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-[#d4af37] opacity-0 group-hover:opacity-60 scale-125 animate-ping" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
              Design Philosophy
            </h3>
            <div className="h-1 w-0 group-hover:w-40 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-700 mt-2" />
          </div>
          <div className="hidden sm:block ml-auto relative">
            <div
              className={`w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 border-[#d4af37]/50' : ''}`}
            >
              <GiSpiderWeb className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-[#d4af37]' : 'text-[#d4af37]/30'}`} />
            </div>
          </div>
        </div>
        <div className="space-y-5 relative z-10 flex-1">
          {philosophies.map((item, index) => (
            <PhilosophyItem key={item.title} item={item} index={index} isVisible={isVisible} />
          ))}
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

export default PhilosophyCard;