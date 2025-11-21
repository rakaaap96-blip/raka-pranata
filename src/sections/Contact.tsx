import { useRef, useEffect, useState } from 'react';
import ContactHeader from '../components/contact/ContactHeader';
import ContactForm from '../components/contact/ContactForm';
import ContactRobot from '../components/contact/ContactRobot';

function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="contact-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#f4d03f]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <ContactHeader isVisible={isVisible} />
        </div>

        {/* Content Sections - Horizontal Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Contact Form Section - Kiri */}
          <ContactForm isVisible={isVisible} />

          {/* Contact Robot Section - Kanan */}
          <div 
            className="hidden lg:flex items-center justify-center lg:justify-end"
            aria-label="Decorative robot illustration"
          >
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <ContactRobot />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;