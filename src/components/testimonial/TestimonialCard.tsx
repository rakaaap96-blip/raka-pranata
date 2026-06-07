import { useState, useRef, useEffect } from 'react';
import type { Testimonial } from '../../data/testimonial-data';
import { FaStar, FaQuoteLeft, FaArrowLeft } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import MagneticButton from '../ui/MagneticButton';
import { MagneticAvatar } from '../ui/MagneticAvatar';

/* ============================================
   STAR WITH BURST ANIMATION
   ============================================ */
function StarBurst({ filled, delay }: { filled: boolean; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 bg-[#d4af37]/30 rounded-full blur-md transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${filled ? 'animate-star-pop' : ''}`}
      />
      <FaStar
        className={`w-3.5 h-3.5 transition-all duration-500 ${
          filled ? 'text-[#d4af37] fill-current drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]' : 'text-[#ffffea]/30'
        } ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{ transitionDelay: `${delay}ms` }}
      />
    </div>
  );
}

/* ============================================
   EQUALIZER BAR
   ============================================ */
function EqBar({ delay }: { delay: number }) {
  const [height] = useState(() => `${20 + Math.random() * 80}%`);
  const [duration] = useState(() => `${400 + Math.random() * 400}ms`);

  return (
    <div
      className="w-0.5 bg-linear-to-t from-[#d4af37] to-[#f4d03f] rounded-full animate-eq-testi"
      style={{
        height,
        animationDelay: `${delay}ms`,
        animationDuration: duration,
      }}
    />
  );
}

/* ============================================
   3D FLIP CARD BACKFACE (with back button)
   ============================================ */
interface CardBackProps {
  testimonial: Testimonial;
  onFlipBack: () => void;
}

function CardBack({ testimonial, onFlipBack }: CardBackProps) {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-5 border border-[#d4af37]/30 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
      <HiBuildingOffice2 className="w-10 h-10 text-[#d4af37] mb-3" />
      <h4 className="text-[#d4af37] font-bold text-lg mb-1">{testimonial.project}</h4>
      <p className="text-[#ffffea]/80 text-sm mb-4">Completed with excellence</p>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {['Design', 'Code', 'Deploy'].map((tag) => (
          <span key={tag} className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full border border-[#d4af37]/20">
            {tag}
          </span>
        ))}
      </div>
      <MagneticButton
        onClick={onFlipBack}
        variant="secondary"
        magnetStrength={0.2}
        particleCount={4}
        ripple={true}
        className="text-sm px-4 py-2"
        aria-label="Back to testimonial"
      >
        <FaArrowLeft className="w-3 h-3" />
        Back to Testimonial
      </MagneticButton>
    </div>
  );
}

/* ============================================
   MAIN TESTIMONIAL CARD (improved UX)
   ============================================ */
interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSpotlight({ x: 50, y: 50 });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarBurst key={i} filled={i < rating} delay={index * 150 + i * 100 + 300} />
    ));
  };

  return (
    <div
      ref={cardRef}
      className="relative perspective-1200 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow background on hover */}
      <div
        className={`absolute -inset-2 rounded-3xl bg-linear-to-r from-[#d4af37]/20 to-transparent opacity-0 blur-2xl transition-all duration-700 ${
          isHovered && !isFlipped ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative h-full transition-all duration-700 preserve-3d ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.6s, 0.7s',
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1), ease-out',
          transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
        }}
      >
        {/* FRONT FACE */}
        <div
          className={`group relative rounded-2xl p-5 overflow-hidden transition-all duration-500 flex flex-col h-full ${
            isHovered && !isFlipped
              ? 'bg-[#fefcf5] border-[#d4af37]/60 shadow-2xl shadow-[#d4af37]/20'
              : 'bg-[#1a1a1a]/70 backdrop-blur-xl border border-[#d4af37]/15'
          }`}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.12), transparent 50%)`,
            }}
          />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Quote & Stars */}
          <div className="relative flex justify-between items-start mb-3 z-10">
            <FaQuoteLeft
              className={`w-5 h-5 transition-all duration-500 ${
                isHovered && !isFlipped
                  ? 'text-[#d4af37] drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]'
                  : 'text-[#d4af37]/50'
              }`}
            />
            <div className="flex gap-0.5">{renderStars(testimonial.rating)}</div>
          </div>

          {/* EQ bars */}
          <div className="flex justify-end gap-0.5 h-3 mb-1 opacity-40">
            {[...Array(5)].map((_, i) => (
              <EqBar key={i} delay={i * 100} />
            ))}
          </div>

          {/* Testimonial Text */}
          <div className="flex-1 mb-4 z-10">
            <p
              className={`leading-relaxed text-sm transition-all duration-300 ${
                isHovered && !isFlipped ? 'text-[#1a1a1a] font-medium' : 'text-[#ffffea]/80'
              }`}
            >
              {testimonial.text}
            </p>
          </div>

          {/* Flip Button (Project) - Improved UX */}
          <div className="mb-3 z-10">
            <button
              onClick={handleFlip}
              className={`group/flip text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit transition-all duration-300 ${
                isHovered && !isFlipped
                  ? 'bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37]/40 shadow-md hover:bg-[#d4af37] hover:text-[#1a1a1a] hover:border-[#d4af37]'
                  : 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 hover:bg-[#d4af37] hover:text-[#1a1a1a] hover:border-[#d4af37]'
              }`}
              aria-label={`View project details for ${testimonial.project}`}
            >
              <HiBuildingOffice2 className="w-3 h-3 transition-transform group-hover/flip:rotate-12" />
              <span className="truncate max-w-[150px]">{testimonial.project}</span>
              <span className="text-[10px] opacity-0 group-hover/flip:opacity-100 transition-opacity">
                (flip)
              </span>
            </button>
          </div>

          {/* Client Info */}
          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#d4af37]/15 z-10">
            <MagneticAvatar
              image={testimonial.image}
              name={testimonial.name}
              isHovered={isHovered && !isFlipped}
            />
            <div className="flex-1 min-w-0">
              <div
                className={`font-bold text-sm truncate transition-all duration-300 ${
                  isHovered && !isFlipped ? 'text-[#d4af37]' : 'text-[#ffffea]'
                }`}
              >
                {testimonial.name}
              </div>
              <p
                className={`text-[11px] truncate transition-all duration-300 ${
                  isHovered && !isFlipped ? 'text-[#1a1a1a]/70' : 'text-[#ffffea]/60'
                }`}
              >
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <CardBack testimonial={testimonial} onFlipBack={handleFlip} />
      </div>
    </div>
  );
}

export default TestimonialCard;