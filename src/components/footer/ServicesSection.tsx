// components/Footer/ServicesSection.tsx
import { FaCode, FaPalette, FaMobile, FaLightbulb, FaTachometerAlt } from 'react-icons/fa';

interface ServicesSectionProps {
  isVisible: boolean;
  hoveredService: string | null;
  setHoveredService: (service: string | null) => void;
}

const services = [
  { name: 'UI/UX Design', icon: FaPalette },
  { name: 'Frontend Development', icon: FaCode },
  { name: 'Responsive Web Design', icon: FaMobile },
  { name: 'Interactive Prototypes', icon: FaLightbulb },
  { name: 'Performance Optimization', icon: FaTachometerAlt }
];

function ServicesSection({ isVisible, hoveredService, setHoveredService }: ServicesSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-lg font-bold text-[#d4af37] flex items-center gap-2">
        <FaCode className="text-sm" />
        Services
      </div>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={service.name}
            className="group flex items-center gap-3 text-[#ffffea]/70 hover:text-[#ffffea] transition-all duration-300 cursor-default transform hover:translate-x-1"
            style={{ 
              transitionDelay: `${index * 50}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
            }}
            onMouseEnter={() => setHoveredService(service.name)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <service.icon className={`text-[#d4af37] text-sm transform transition-all duration-300 ${
              hoveredService === service.name ? 'scale-125 rotate-12' : 'scale-100'
            }`} />
            <span className="text-sm">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;