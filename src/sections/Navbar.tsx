import { useState, useEffect, useRef } from 'react';

interface NavItem {
  name: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', label: 'HOME', href: '#home' },
  { name: 'Projects', label: 'PROJECTS', href: '#projects' },
  { name: 'About', label: 'ABOUT', href: '#about' },
  { name: 'Testimonials', label: 'TESTIMONIALS', href: '#testimonials' },
  { name: 'Contact', label: 'CONTACT', href: '#contact' },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [navReady, setNavReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setIsScrolled(currentY > 50);
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const totalScrollable = docHeight - winHeight;
        const rawProgress = totalScrollable > 0 ? (currentY / totalScrollable) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, rawProgress)));
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
    handleScroll();
    setTimeout(() => setNavReady(true), 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        navReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled ? 'bg-[#000000] border-b border-[#d4af37]/15' : 'bg-transparent'
      }`} />

      <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-2 group"
          >
            <img
              src="/IMGG/logo.svg"
              alt="Raka Logo"
              className="w-8 h-8 sm:w-9 sm:h-9"
            />
            <div className="hidden sm:flex gap-0.5">
              <span className="font-black text-base tracking-[0.15em] text-[#d4af37]">
                RAKA
              </span>
              <span className="font-black text-base tracking-[0.15em] text-[#ffffea]">
                PRANATA
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-xs tracking-[0.2em] font-mono font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-[#d4af37]'
                      : 'text-[#ffffea]/50 hover:text-[#ffffea]/80'
                  }`}
                >
                  {isActive ? '[' : ''}{item.label}{isActive ? ']' : ''}
                </button>
              );
            })}
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-2 py-1.5 text-[10px] tracking-[0.15em] font-mono font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-[#d4af37]'
                      : 'text-[#ffffea]/50 hover:text-[#ffffea]/80'
                  }`}
                >
                  [{item.label.slice(0, 3)}]
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-[#d4af37]/10" />
        <div className="h-full bg-[#d4af37] transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>
    </nav>
  );
}

export default Navbar;
