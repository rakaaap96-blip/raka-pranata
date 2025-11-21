// components/Footer/Footer.tsx
import { useState, useEffect, useRef } from 'react';
import FooterMainContent from '../components/footer/FooterMainContent';
import FooterCTASection from '../components/footer/FooterCTASection';
import FooterBottomBar from '../components/footer/FooterBottomBar';
import AnimatedBackground from '../components/footer/AnimatedBackground';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black border-t border-[#d4af37]/20 overflow-hidden"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className={`py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          <FooterMainContent isVisible={isVisible} />
          
          <FooterCTASection />
        </div>

        <FooterBottomBar isVisible={isVisible} />
      </div>
    </footer>
  );
}

export default Footer;