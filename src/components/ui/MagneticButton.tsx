import { useState, useRef, forwardRef, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
  target?: '_blank' | '_self';
  rel?: string;
  magnetStrength?: number;
  tiltStrength?: number;
  particleCount?: number;
  ripple?: boolean;
  delay?: number;
  isVisible?: boolean;
  showEq?: boolean;
  icon?: ReactNode;
}

const MagneticButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, MagneticButtonProps>(
  (
    {
      children,
      onClick,
      href,
      variant = 'primary',
      className = '',
      disabled = false,
      target = '_self',
      rel,
      magnetStrength = 0.3,
      tiltStrength = 10,
      particleCount = 8,
      ripple = true,
      delay = 0,
      isVisible = true,
      showEq = false,
      icon,
    },
    ref
  ) => {
    const [magnet, setMagnet] = useState({ x: 0, y: 0 });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [particlesActive, setParticlesActive] = useState(false);
    const [ripplesList, setRipplesList] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const setRefs = (element: HTMLButtonElement | HTMLAnchorElement | null) => {
      elementRef.current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) ref.current = element;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = elementRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -tiltStrength, y: x * tiltStrength });
      setMagnet({ x: x * magnetStrength * 20, y: y * magnetStrength * 20 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (particleCount > 0) {
        setParticlesActive(true);
        setTimeout(() => setParticlesActive(false), 600);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setMagnet({ x: 0, y: 0 });
    };

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      if (ripple) {
        const rect = elementRef.current?.getBoundingClientRect();
        if (rect) {
          const id = Date.now();
          setRipplesList((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
          setTimeout(() => setRipplesList((prev) => prev.filter((r) => r.id !== id)), 700);
        }
      }
      onClick?.(e);
    };

    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';

    const baseClasses = `relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`;

    const variantClasses = isPrimary
      ? 'bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] shadow-lg'
      : isSecondary
      ? 'bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10'
      : 'bg-[#1a1a1a]/80 border border-[#d4af37]/20 text-[#ffffea] hover:border-[#d4af37]/40';

    const Tag = href ? 'a' : 'button';
    const linkProps = href
      ? { href, target, rel: rel || (target === '_blank' ? 'noopener noreferrer' : undefined) }
      : {};

    // Generate particle positions once (stabil)
    const particlePositions = useRef(
      Array.from({ length: particleCount }, (_, i) => {
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
        const dx = Math.cos(angle) * (30 + Math.random() * 20);
        const dy = Math.sin(angle) * (30 + Math.random() * 20);
        return { dx, dy, delay: i * 30 };
      })
    ).current;

    return (
      <Tag
        {...linkProps}
        ref={setRefs}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseClasses} ${variantClasses}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        }}
      >
        {/* Particles – selalu dirender, hanya opacity/scale yang berubah */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {particlePositions.map((p, idx) => (
            <div
              key={idx}
              className={`absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] transition-all duration-500 ${
                particlesActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transform: particlesActive ? `translate(${p.dx}px, ${p.dy}px)` : 'translate(-50%, -50%)',
                transitionDelay: `${p.delay}ms`,
              }}
            />
          ))}
        </div>

        {/* Ripples */}
        {ripplesList.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 animate-ripple-expand pointer-events-none"
            style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
          />
        ))}

        {/* Glow background */}
        <div
          className={`absolute -inset-2 rounded-2xl bg-linear-to-r ${
            isPrimary ? 'from-[#d4af37]/30' : 'from-[#d4af37]/20'
          } to-transparent opacity-0 blur-xl transition-all duration-500 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />

        {/* Inner content */}
        <div
          className="relative flex items-center justify-center gap-2 w-full"
          style={{
            transform: `translate(${magnet.x}px, ${magnet.y}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div
            className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${
              isHovered ? 'opacity-100' : ''
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
          </div>

          {isSecondary && isHovered && (
            <div className="absolute inset-0 rounded-xl p-0.5 pointer-events-none">
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-holo-shift" />
              <div className="w-full h-full rounded-xl bg-[#1a1a1a]" />
            </div>
          )}

          {showEq && (
            <div
              className={`absolute left-2 top-1/2 -translate-y-1/2 flex items-end gap-0.5 h-3 transition-opacity duration-300 ${
                isHovered ? 'opacity-40' : 'opacity-0'
              }`}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-[#d4af37] rounded-full animate-eq-mini"
                  style={{
                    height: `${40 + Math.random() * 60}%`,
                    animationDelay: `${i * 60}ms`,
                    animationPlayState: isHovered ? 'running' : 'paused',
                  }}
                />
              ))}
            </div>
          )}

          <span className="relative z-10 flex items-center gap-2">
            {icon && (
              <span className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                {icon}
              </span>
            )}
            {children}
          </span>
        </div>
      </Tag>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
export default MagneticButton;