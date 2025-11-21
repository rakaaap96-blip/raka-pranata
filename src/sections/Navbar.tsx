import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiHome, HiUser, HiBriefcase, HiChat, HiMail } from 'react-icons/hi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '#home', icon: HiHome },
    { name: 'Projects', href: '#projects', icon: HiBriefcase },
    { name: 'About', href: '#about', icon: HiUser },
    { name: 'Testimonials', href: '#testimonials', icon: HiChat },
    { name: 'Contact', href: '#contact', icon: HiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'projects', 'about', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isOpen && 
          !menuRef.current?.contains(target) && 
          !menuButtonRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMenuToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleMenuItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  // Calculate progress bar width
  const calculateProgressWidth = () => {
    const sections = ['home', 'projects', 'about', 'testimonials', 'contact'];
    const currentIndex = sections.indexOf(activeSection);
    
    if (currentIndex === -1) return 0;
    
    return ((currentIndex + 1) / sections.length) * 100;
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'bg-[#1a1a1a]/95 shadow-xl shadow-[#d4af37]/5 backdrop-blur-lg' 
            : 'bg-transparent'
        } py-3 sm:py-4`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo Section - Left */}
            <div className="flex-1">
              <button 
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer w-fit" 
                onClick={() => scrollToSection('home')}
                aria-label="Go to homepage"
              >
                <div className="relative">
                  <img 
                    src="/IMGG/logo.svg" 
                    alt="Raka Pranata Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    width="40"
                    height="40"
                  />
                  <div className={`hidden sm:block absolute inset-0 rounded-lg sm:rounded-xl border-2 border-[#d4af37] transition-all duration-1000 ${
                    isHovered ? 'opacity-60 scale-125 animate-ping' : 'opacity-0 scale-100'
                  }`} aria-hidden="true" />
                </div>
                <div className={`hidden sm:block transition-all duration-500 ${
                  isScrolled 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-4'
                }`}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-black bg-linear-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                      RAKA
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#ffffea] transition-all duration-300 group-hover:scale-105">
                      PRANATA
                    </span>
                  </div>
                  <div className={`h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500 ${
                    isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`} aria-hidden="true" />
                </div>
              </button>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 relative mx-auto">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 xl:px-5 xl:py-3 rounded-xl font-semibold transition-all duration-300 group/nav-item flex items-center gap-2 xl:gap-3 z-10 ${
                      isActive
                        ? 'text-[#d4af37] bg-[#d4af37]/10 shadow-lg shadow-[#d4af37]/10 transform scale-105'
                        : 'text-[#ffffea]/70 hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {/* Background effect */}
                    <div className={`absolute inset-0 rounded-xl bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 ${
                      isActive ? 'opacity-20 scale-100' : 'opacity-0 scale-95 group-hover/nav-item:opacity-10 group-hover/nav-item:scale-100'
                    }`} aria-hidden="true" />
                    
                    <IconComponent className={`w-4 h-4 xl:w-5 xl:h-5 relative z-10 transition-all duration-300 ${
                      isActive ? 'scale-125' : 'group-hover/nav-item:scale-110 group-hover/nav-item:rotate-12'
                    }`} aria-hidden="true" />
                    
                    <span className="relative z-10 font-medium text-sm xl:text-base">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tablet Navigation - Center */}
            <div className="hidden md:flex lg:hidden items-center space-x-2 mx-auto">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative p-2 rounded-lg transition-all duration-300 group/nav-item ${
                      isActive
                        ? 'text-[#d4af37] bg-[#d4af37]/10 shadow-lg shadow-[#d4af37]/10'
                        : 'text-[#ffffea]/70 hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover/nav-item:scale-110 group-hover/nav-item:rotate-12" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button - Right */}
            <div className="md:hidden flex-1 flex justify-end">
              <button
                ref={menuButtonRef}
                onClick={handleMenuToggle}
                className="relative w-10 h-10 bg-[#1a1a1a]/50 rounded-lg flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 group/menu active:scale-95"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                <div className={`absolute inset-0 rounded-lg bg-[#d4af37] transition-all duration-300 ${
                  isOpen ? 'opacity-20 scale-100' : 'opacity-0 scale-95 group-hover/menu:opacity-10 group-hover/menu:scale-100'
                }`} aria-hidden="true" />
                
                {isOpen ? 
                  <FaTimes className="w-4 h-4 relative z-10 transition-transform duration-300 rotate-180 scale-110" aria-hidden="true" /> : 
                  <FaBars className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/menu:scale-110 group-hover/menu:rotate-12" aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar indicator */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a1a]/50 overflow-hidden"
          role="progressbar"
          aria-valuenow={calculateProgressWidth()}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        >
          <div 
            className="h-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500"
            style={{ 
              width: `${calculateProgressWidth()}%` 
            }}
            aria-hidden="true"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#1a1a1a]/98 backdrop-blur-xl transition-all duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        
        {/* Menu Content */}
        <div className={`absolute top-16 left-4 right-4 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl p-4 transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'
        }`}>
          {/* Hidden heading for screen readers */}
          <h2 className="sr-only">Mobile Navigation Menu</h2>
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuItemClick(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-300 group/mobile-item relative overflow-hidden active:scale-95 ${
                    isActive
                      ? 'bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] transform scale-105'
                      : 'text-[#ffffea] hover:bg-[#d4af37]/10 hover:text-[#d4af37]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {/* Shimmer effect */}
                  <div className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                    isActive ? 'translate-x-full' : '-translate-x-full group-hover/mobile-item:translate-x-full'
                  }`} aria-hidden="true" />
                  
                  <IconComponent className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                    isActive ? 'scale-110 rotate-12' : 'group-hover/mobile-item:scale-110 group-hover/mobile-item:rotate-12'
                  }`} aria-hidden="true" />
                  
                  <span className="font-semibold text-base relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Close hint */}
          <div className="mt-4 pt-3 border-t border-[#d4af37]/10">
            <p className="text-center text-[#ffffea]/50 text-xs" aria-hidden="true">
              Tap anywhere outside to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;