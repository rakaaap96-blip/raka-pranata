import type { Testimonial } from '../../data/testimonial-data'
import { FaStar, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-[#d4af37] fill-current' : 'text-[#ffffea]/30'
        } transition-colors duration-300`}
      />
    ));
  };

  return (
    <div 
      className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20 transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:bg-[#1a1a1a]/70 flex flex-col h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Quote Icon & Stars */}
      <div className="flex justify-between items-start mb-4">
        <FaQuoteLeft className="w-6 h-6 text-[#d4af37]/40 group-hover:text-[#d4af37]/60 transition-colors duration-300" />
        <div className="flex gap-1">
          {renderStars(testimonial.rating)}
        </div>
      </div>

      {/* Testimonial Text - Flexible height */}
      <div className="flex-1 mb-6">
        <p className="text-[#ffffea]/80 leading-relaxed text-lg group-hover:text-[#ffffea] transition-colors duration-300">
          {testimonial.text}
        </p>
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <span className="text-sm text-[#d4af37] font-medium bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20 flex items-center gap-2 w-fit">
          <HiBuildingOffice2 className="w-3 h-3" />
          {testimonial.project}
        </span>
      </div>

      {/* Client Info - Always at the bottom */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#d4af37]/10">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]/40 group-hover:border-[#d4af37] transition-colors duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#d4af37] rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
            <FaCheck className="w-2 h-2 text-[#1a1a1a]" />
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
            {testimonial.name}
          </div>
          <p className="text-[#ffffea]/70 text-sm">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;