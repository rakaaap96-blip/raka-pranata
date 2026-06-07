import { useState, useEffect, useRef } from 'react';
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiChat,
  HiMail,
} from 'react-icons/hi';

/* ============================================
   MAGNETIC LINK COMPONENT
   ============================================ */
interface MagneticLinkProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  delay: number;
  onMeasure?: (rect: DOMRect) => void;
  linkRef?: React.RefObject<HTMLButtonElement | null>;
}

function MagneticLink({ 
  children, 
  isActive, 
  onClick, 
  delay, 
  onMeasure,
  linkRef 
}: MagneticLinkProps) {
  const localRef = useRef<HTMLButtonElement>(null);
  const ref = linkRef || localRef;
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnet({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => setMagnet({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setRipples(prev => [...prev, { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top, 
        id: Date.now() 
      }]);
      setTimeout(() => setRipples(prev => prev.slice(1)), 700);
    }
    onClick();
  };

  useEffect(() => {
    if (ref.current && onMeasure) {
      onMeasure(ref.current.getBoundingClientRect());
    }
  }, [isActive, onMeasure, ref]);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-5 py-3 rounded-xl flex items-center gap-2.5 font-medium text-sm transition-colors duration-300 z-10 overflow-hidden ${
        isActive ? 'text-[#1a1a1a]' : 'text-[#ffffea]/70 hover:text-[#ffffea]'
      }`}
      style={{
        transform: `translate(${magnet.x}px, ${magnet.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), color 0.3s',
        animation: `nav-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms both`,
      }}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 animate-ripple-nav pointer-events-none"
          style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}
      
      {isActive && (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-holo-shift" />
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
        </div>
      )}
      
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </button>
  );
}

/* ============================================
   MOBILE DOCK ITEM
   ============================================ */
interface DockItemProps {
  item: { name: string; href: string; icon: React.ComponentType<{ className?: string }> };
  isActive: boolean;
  onClick: () => void;
  index: number;
}

function DockItem({ item, isActive, onClick, index }: DockItemProps) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-2xl transition-all duration-500 ${
        isActive ? 'bg-[#d4af37]/10 -translate-y-2' : 'hover:-translate-y-1'
      }`}
      style={{
        animation: `dock-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms both`,
      }}
    >
      {isActive && (
        <div className="absolute -bottom-1 w-10 h-1 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse" />
      )}
      
      <div className="relative transition-all duration-300">
        <Icon
          className={`w-6 h-6 transition-all duration-300 ${
            isActive
              ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
              : 'text-[#ffffea]/60'
          }`}
        />
      </div>

      <span
        className={`text-[10px] font-medium overflow-hidden transition-all duration-500 ${
          isActive
            ? 'max-h-6 opacity-100 mt-1 text-[#d4af37]'
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {item.name}
      </span>
    </button>
  );
}

/* ============================================
   MAIN NAVBAR - FIXED STICKY (TIDAK HILANG)
   ============================================ */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [activePill, setActivePill] = useState({ left: 0, width: 0, height: 0, top: 0 });
  const [navReady, setNavReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Ref untuk throttle scroll
  const tickingRef = useRef(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: HiHome },
    { name: 'Projects', href: '#projects', icon: HiBriefcase },
    { name: 'About', href: '#about', icon: HiUser },
    { name: 'Testimonials', href: '#testimonials', icon: HiChat },
    { name: 'Contact', href: '#contact', icon: HiMail },
  ];

  // SCROLL EFFECT - hanya untuk background, progress bar, dan active section
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        
        // Ubah background saat scroll melebihi 50px
        setIsScrolled(currentY > 50);
        
        // Progress scroll (0-100)
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const totalScrollable = docHeight - winHeight;
        const rawProgress = totalScrollable > 0 ? (currentY / totalScrollable) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, rawProgress)));
        
        // Deteksi section aktif berdasarkan posisi scroll
        const sections = ['home', 'projects', 'about', 'testimonials', 'contact'];
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
        
        tickingRef.current = false;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set nilai awal
    setTimeout(() => setNavReady(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // ✅ Tidak ada logika hide-on-scroll

  // Measure active pill position + container width
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href.replace('#', '') === activeSection);
    const activeBtn = linksRef.current[activeIndex];
    const menuContainer = menuRef.current;
    
    if (activeBtn && menuContainer) {
      const menuRect = menuContainer.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      
      setContainerWidth(menuRect.width);
      setActivePill({
        left: btnRect.left - menuRect.left,
        width: btnRect.width,
        height: btnRect.height,
        top: btnRect.top - menuRect.top,
      });
    }
  }, [activeSection, navItems, navReady]);

  // Spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clamp pill position biar tidak keluar container
  const clampedLeft = Math.max(6, Math.min(activePill.left, containerWidth - activePill.width - 6));
  const clampedWidth = Math.min(activePill.width, containerWidth - clampedLeft - 6);

  return (
    <>
      {/* DESKTOP + TABLET NAVBAR - STICKY (tidak pernah hilang) */}
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setSpotlight({ x: 50, y: 50 });
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 translate-y-0 ${
          navReady ? 'opacity-100' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Glassmorphism background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1a1a1a]/80 backdrop-blur-2xl border-b border-[#d4af37]/10 shadow-2xl shadow-[#d4af37]/5'
            : 'bg-transparent'
        }`}>
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
          />
        </div>

        {/* Spotlight overlay */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{ 
            opacity: isHovered ? 0.4 : 0,
            background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.15), transparent 40%)`,
          }}
        />

        <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-1">
              <button
                className="flex items-center gap-3 group relative"
                onClick={() => scrollToSection('#home')}
              >
                <div className="relative">
                  <img
                    src="/IMGG/logo.svg"
                    alt="Raka Logo"
                    className="w-10 h-10 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl border-2 border-[#d4af37] transition-all duration-1000 hidden sm:block ${
                      isHovered ? 'opacity-60 scale-150 animate-ping' : 'opacity-0 scale-100'
                    }`}
                  />
                  <div className={`absolute -inset-2 rounded-xl bg-[#d4af37]/20 blur-xl transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>

                <div className={`hidden sm:block transition-all duration-700 ${
                  isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  <div className="flex gap-1 relative">
                    <span className="font-black text-xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-holo-shift bg-size-[200%_auto]">
                      RAKA
                    </span>
                    <span className="font-black text-xl text-[#ffffea]">
                      PRANATA
                    </span>
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent animate-shimmer-sweep pointer-events-none" />
                  </div>
                  <div className={`h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-700 ease-spring ${
                    isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`} />
                </div>
              </button>
            </div>

            {/* Desktop Menu - dengan overflow clip untuk pill */}
            <div 
              ref={menuRef}
              className="hidden md:flex items-center gap-1 relative p-1.5 rounded-2xl bg-[#0f0f0f]/50 border border-[#d4af37]/10 overflow-clip"
            >
              {/* Morphing Active Pill - clamped */}
              <div 
                className="absolute rounded-xl bg-linear-to-r from-[#d4af37] to-[#f4d03f] shadow-lg shadow-[#d4af37]/20 transition-all duration-500 pointer-events-none z-0"
                style={{
                  left: clampedLeft,
                  top: activePill.top,
                  width: clampedWidth,
                  height: activePill.height,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
              </div>

              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                const linkRefObj = { current: linksRef.current[index] };

                return (
                  <MagneticLink
                    key={item.name}
                    isActive={isActive}
                    onClick={() => scrollToSection(item.href)}
                    delay={index * 100}
                    linkRef={linkRefObj as React.RefObject<HTMLButtonElement | null>}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-[#1a1a1a]' : ''}`} />
                    <span>{item.name}</span>
                  </MagneticLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* SMOOTH CONTINUOUS PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]">
          <div className="absolute inset-0 bg-[#d4af37]/5" />
          <div
            className="h-full relative transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-holo-shift bg-size-[200%_100%]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-6 bg-linear-to-r from-[#d4af37] to-transparent blur-xl opacity-50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ffffea] rounded-full shadow-[0_0_12px_rgba(255,255,234,0.8)] animate-pulse" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
          </div>
        </div>
      </nav>

      {/* MOBILE FLOATING DOCK - SELALU TERLIHAT (tanpa hide) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 transition-all duration-700 translate-y-0 opacity-100">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#d4af37]/10 rounded-4xl blur-2xl animate-pulse-slow" />
          <div className="relative bg-[#1a1a1a]/90 backdrop-blur-2xl rounded-4xl border border-[#d4af37]/20 shadow-2xl shadow-black/50 p-2 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none rounded-4xl"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />
            <div className="flex justify-around items-end relative z-10">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <DockItem
                    key={item.name}
                    item={item}
                    isActive={isActive}
                    onClick={() => scrollToSection(item.href)}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;