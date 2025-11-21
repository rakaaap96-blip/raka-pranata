// components/Footer/FooterMainContent.tsx
import { useState } from 'react';
import BrandSection from './BrandSection';
import ServicesSection from './ServicesSection';
import SocialSection from './SocialSection';

interface FooterMainContentProps {
  isVisible: boolean;
}

function FooterMainContent({ isVisible }: FooterMainContentProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
      {/* Brand & Description */}
      <BrandSection isVisible={isVisible} />
      
      {/* Services */}
      <ServicesSection 
        isVisible={isVisible}
        hoveredService={hoveredService}
        setHoveredService={setHoveredService}
      />
      
      {/* Social Links */}
      <SocialSection 
        isVisible={isVisible}
        hoveredSocial={hoveredSocial}
        setHoveredSocial={setHoveredSocial}
      />
    </div>
  );
}

export default FooterMainContent;