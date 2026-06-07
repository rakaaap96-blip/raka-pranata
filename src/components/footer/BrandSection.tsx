import { useState, useEffect, useRef, useCallback } from 'react';
import { FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';

interface BrandSectionProps {
  isVisible: boolean;
}

/* ============================================
   PARTICLE BURST ON COPY (FIXED: always render, toggle with CSS)
   ============================================ */
function CopyParticles({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const dx = Math.cos(angle) * 40;
        const dy = Math.sin(angle) * 40;
        return (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] transition-all duration-500 ${
              active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: '50%',
              top: '50%',
              transform: active ? `translate(${dx}px, ${dy}px)` : 'translate(-50%, -50%)',
              transitionDelay: `${i * 30}ms`,
              ...(active && { animation: 'particleFadeOut 0.6s ease-out forwards' }),
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================
   LIVE CLOCK WITH ORBIT (unchanged)
   ============================================ */
function LiveClock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => (s + 1) % 60), 1000);
    return () => clearInterval(interval);
  }, []);

  const orbitProgress = (seconds / 60) * 360;

  return (
    <div className="relative">
      <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-300 group-hover:scale-110 relative">
        <FaClock className="text-[#d4af37] group-hover:text-[#1a1a1a] text-lg transition-colors duration-300" />
        <div className="absolute inset-0 rounded-full border border-[#d4af37]/20" />
        <div 
          className="absolute inset-0 rounded-full border-2 border-t-[#d4af37] border-r-transparent border-b-transparent border-l-transparent transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${orbitProgress}deg)` }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
      </div>
    </div>
  );
}

/* ============================================
   TYPING TEXT EFFECT (unchanged)
   ============================================ */
function TypingText({ text, isVisible, delay }: { text: string; isVisible: boolean; delay: number }) {
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
    setDisplayed('');
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
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

/* ============================================
   MAGNETIC EMAIL CARD (only changed to use new CopyParticles)
   ============================================ */
function MagneticEmail({ 
  emailCopied, 
  onCopy, 
  isVisible 
}: { 
  emailCopied: boolean; 
  onCopy: () => void; 
  isVisible: boolean 
}) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
    setMagnet({ x: x * 8, y: y * 8 });
  };

  const handleClick = () => {
    onCopy();
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 800);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        setMagnet({ x: 0, y: 0 });
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms',
      }}
    >
      <CopyParticles active={showParticles} />

      <div
        className={`relative flex items-center gap-4 p-4 bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered ? 'border-[#d4af37]/60 shadow-2xl shadow-[#d4af37]/20 scale-105' : 'border-[#d4af37]/15 hover:border-[#d4af37]/40'
        }`}
        style={{
          transform: `translate(${magnet.x}px, ${magnet.y}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border 0.3s, box-shadow 0.3s',
        }}
        onClick={handleClick}
      >
        {/* Shimmer */}
        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-shimmer-sweep" />
        </div>

        {/* Icon */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
            emailCopied ? 'bg-green-500/20' : 'bg-[#d4af37]/10 group-hover:bg-[#d4af37]'
          } ${isHovered ? 'scale-110' : ''}`}>
            {emailCopied ? (
              <FaCheck className="text-green-400 text-lg" />
            ) : (
              <FaEnvelope className="text-[#d4af37] text-lg" />
            )}
          </div>
          {isHovered && !emailCopied && (
            <div className="absolute -inset-1 bg-[#d4af37]/20 rounded-full blur-md animate-pulse" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="text-[#ffffea] font-medium text-sm">Email Me</div>
          <div className={`text-xs transition-colors duration-300 ${
            emailCopied ? 'text-green-400' : 'text-[#ffffea]/70'
          }`}>
            {emailCopied ? 'Copied to clipboard! 🎉' : 'rakaaa.p96@gmail.com'}
          </div>
        </div>

        {/* Copy indicator */}
        <div className={`shrink-0 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          <div className="px-2 py-1 bg-[#d4af37]/10 rounded-lg text-[10px] text-[#d4af37] border border-[#d4af37]/20">
            Click to copy
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN BRAND SECTION (unchanged)
   ============================================ */
function BrandSection({ isVisible }: BrandSectionProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('rakaaa.p96@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
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
      className="lg:col-span-2 space-y-6 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 transition-opacity duration-1000 pointer-events-none" style={{ opacity: isHovered ? 0.3 : 0 }} />

      {/* Spotlight */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden -m-4"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.1), transparent 40%)`,
        }}
      />

      {/* Brand Header */}
      <div 
        className="group relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms',
        }}
      >
        <h3 className="text-2xl font-black text-[#ffffea] mb-3 relative">
          <span className="bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x bg-size-[200%_auto]">
            Raka Pranata
          </span>
          <div className="absolute -bottom-1 left-0 h-1 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-transparent rounded-full transition-all duration-700 group-hover:w-full w-0" />
        </h3>
        <p className="text-[#ffffea]/70 leading-relaxed text-sm group-hover:text-[#ffffea]/90 transition-colors duration-300 mb-6">
          <TypingText 
            text="Creating digital experiences that blend beautiful design with flawless functionality. Let's build the future together, one pixel at a time." 
            isVisible={isVisible} 
            delay={400} 
          />
        </p>
      </div>

      {/* Live Time & Email */}
      <div className="space-y-4 relative z-10">
        <MagneticEmail 
          emailCopied={emailCopied} 
          onCopy={copyEmail} 
          isVisible={isVisible} 
        />

        <div 
          className="flex items-center gap-4 group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms',
          }}
        >
          <LiveClock />
          <div>
            <div className="text-[#ffffea] font-medium text-sm">Current Time</div>
            <div className="text-[#d4af37] text-xs font-mono tracking-wider">{currentTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSection;