import { useState, useEffect, useRef, useCallback } from 'react';
import { revealSection } from '../lib/reveal';

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

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [navReady, setNavReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Only write state when the value actually changes. The previous version
        // called setScrollProgress on every frame, so the whole Navbar
        // re-rendered ~60x/second for the entire duration of a scroll.
        setIsScrolled((prev) => (prev === currentY > 50 ? prev : currentY > 50));

        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const totalScrollable = docHeight - winHeight;
        const rawProgress = totalScrollable > 0 ? (currentY / totalScrollable) * 100 : 0;
        const progress = Math.min(100, Math.max(0, rawProgress));
        setScrollProgress((prev) => (Math.abs(prev - progress) < 0.1 ? prev : progress));

        // All reads happen before any write, so this does not thrash layout.
        const current = SECTION_IDS.find((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection((prev) => (prev === current ? prev : current));

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    setTimeout(() => setNavReady(true), 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll while the mobile sheet is open, and close on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    const id = sectionId.replace('#', '');

    // Sections are viewport-gated, so a nav click has to force the target to
    // mount before scrolling - otherwise the scroll lands on an empty
    // placeholder and the section would only fill in once it intersected.
    revealSection(id);

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // Wait a frame so the freshly mounted content is in the layout first.
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        navReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      aria-label="Main navigation"
    >
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-[#000000] border-b border-[#d4af37]/15' : 'bg-transparent'
      }`} />

      <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 group min-h-11 min-w-11"
            aria-label="Raka Pranata - back to top"
          >
            <img
              src="/IMGG/logo.svg"
              alt=""
              width="36"
              height="36"
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
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`inline-flex items-center min-h-11 px-3 text-xs tracking-[0.2em] font-mono font-semibold transition-colors duration-300 ${
                      isActive
                        ? 'text-[#d4af37]'
                        : 'text-[#ffffea]/60 hover:text-[#ffffea]'
                    }`}
                  >
                    {isActive ? '[' : ''}{item.label}{isActive ? ']' : ''}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile trigger - replaces the five truncated 24px labels */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-[#d4af37] cyber-panel"
          >
            <span className="relative block w-5 h-4" aria-hidden="true">
              <span className={`absolute left-0 top-0 w-5 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] w-5 h-0.5 bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-[14px] w-5 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <div
        id="mobile-nav-menu"
        hidden={!isMenuOpen}
        className="md:hidden border-b border-[#d4af37]/15 bg-[#000000]"
      >
        <ul className="list-none m-0 p-0 max-w-8xl mx-auto px-4 sm:px-8 py-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.name} className="border-b border-[#d4af37]/10 last:border-b-0">
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`flex items-center min-h-13 py-3 text-sm tracking-[0.2em] font-mono font-semibold transition-colors ${
                    isActive ? 'text-[#d4af37]' : 'text-[#ffffea]/70'
                  }`}
                >
                  <span className="w-6 text-[#d4af37]/50" aria-hidden="true">
                    {isActive ? '▸' : '·'}
                  </span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px" aria-hidden="true">
        <div className="absolute inset-0 bg-[#d4af37]/10" />
        <div
          className="h-full bg-[#d4af37] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
