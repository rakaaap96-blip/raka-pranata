import { useState, useEffect } from 'react';
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiChat,
  HiMail,
} from 'react-icons/hi';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);

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

      const sections = [
        'home',
        'projects',
        'about',
        'testimonials',
        'contact',
      ];

      const current = sections.find((section) => {
        const element =
          document.getElementById(section);

        if (element) {
          const rect =
            element.getBoundingClientRect();

          return (
            rect.top <= 120 &&
            rect.bottom >= 120
          );
        }

        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  const scrollToSection = (
    sectionId: string
  ) => {
    const element =
      document.getElementById(
        sectionId.replace('#', '')
      );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const calculateProgressWidth = () => {
    const sections = [
      'home',
      'projects',
      'about',
      'testimonials',
      'contact',
    ];

    const currentIndex =
      sections.indexOf(activeSection);

    if (currentIndex === -1) {
      return 0;
    }

    return (
      ((currentIndex + 1) /
        sections.length) *
      100
    );
  };

  return (
    <>
      {/* DESKTOP + TABLET NAVBAR */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1a1a1a]/95 backdrop-blur-lg shadow-xl shadow-[#d4af37]/5'
            : 'bg-transparent'
        } py-3 sm:py-4`}
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }
      >
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 lg:px-16">

          <div className="flex items-center justify-between">

            {/* Logo */}

            <div className="flex-1">
              <button
                className="flex items-center gap-3 group"
                onClick={() =>
                  scrollToSection(
                    '#home'
                  )
                }
              >
                <div className="relative">

                  <img
                    src="/IMGG/logo.svg"
                    alt="Raka Logo"
                    className="w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  />

                  <div
                    className={`absolute inset-0 rounded-xl border-2 border-[#d4af37] transition-all duration-1000 hidden sm:block ${
                      isHovered
                        ? 'opacity-60 scale-125 animate-ping'
                        : 'opacity-0'
                    }`}
                  />

                </div>

                <div
                  className={`hidden sm:block transition-all duration-500 ${
                    isScrolled
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <div className="flex gap-1">

                    <span className="font-black text-xl bg-linear-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent">
                      RAKA
                    </span>

                    <span className="font-black text-xl text-[#ffffea]">
                      PRANATA
                    </span>

                  </div>

                  <div
                    className={`h-[2px] bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500 ${
                      isHovered
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0'
                    }`}
                  />

                </div>

              </button>
            </div>

            {/* Desktop Menu */}

            <div className="hidden md:flex items-center gap-3">

              {navItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const isActive =
                    activeSection ===
                    item.href.replace(
                      '#',
                      ''
                    );

                  return (
                    <button
                      key={
                        item.name
                      }
                      onClick={() =>
                        scrollToSection(
                          item.href
                        )
                      }
                      className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#d4af37]/10 text-[#d4af37]'
                          : 'text-[#ffffea]/70 hover:text-[#d4af37]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />

                      <span>
                        {
                          item.name
                        }
                      </span>
                    </button>
                  );
                }
              )}

            </div>

          </div>
        </div>

        {/* Progress Bar */}

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a]/30">

          <div
            className="h-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500"
            style={{
              width: `${calculateProgressWidth()}%`,
            }}
          />

        </div>

      </nav>

      {/* MOBILE BOTTOM NAVBAR */}

      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">

        <div className="bg-[#1a1a1a]/95 backdrop-blur-xl rounded-3xl border border-[#d4af37]/10 shadow-2xl shadow-black/40 p-2">

          <div className="flex justify-around items-end">

            {navItems.map(
              (item) => {
                const Icon =
                  item.icon;

                const isActive =
                  activeSection ===
                  item.href.replace(
                    '#',
                    ''
                  );

                return (
                  <button
                    key={
                      item.name
                    }
                    onClick={() =>
                      scrollToSection(
                        item.href
                      )
                    }
                    className={`relative flex flex-col items-center justify-center min-w-[52px] py-2 px-3 rounded-2xl transition-all duration-500 ${
                      isActive
                        ? 'bg-[#d4af37]/10'
                        : ''
                    }`}
                  >
                    {/* Active indicator */}

                    <div
                      className={`absolute top-0 h-[3px] rounded-full bg-[#d4af37] transition-all duration-500 ${
                        isActive
                          ? 'w-8 opacity-100'
                          : 'w-0 opacity-0'
                      }`}
                    />

                    {/* Icon */}

                    <Icon
                      className={`w-5 h-5 transition-all duration-500 ${
                        isActive
                          ? 'text-[#d4af37] scale-110'
                          : 'text-[#ffffea]/60'
                      }`}
                    />

                    {/* Label muncul di bawah icon saat aktif */}

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
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Navbar;