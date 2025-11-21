import { useState } from 'react';
import TestimonialsHeader from '../components/testimonial/TestimonialHeader';
import TestimonialCard from '../components/testimonial/TestimonialCard';
import { testimonials } from '../data/testimonial-data';

function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, testimonials.length));
  };

  const showLess = () => {
    setVisibleCount(3);
  };

  const visibleTestimonials = testimonials.slice(0, visibleCount);

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <TestimonialsHeader />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Load More / Show Less Buttons */}
        {testimonials.length > 3 && (
          <div className="text-center">
            {visibleCount < testimonials.length ? (
              <button
                onClick={showMore}
                className="group relative px-8 py-3 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/30"
                aria-expanded={visibleCount < testimonials.length}
                aria-controls="testimonials-list"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true" />
                <span className="relative z-10 text-[#1a1a1a] font-bold text-lg tracking-wide">
                  Load More Testimonials ({testimonials.length - visibleCount} more)
                </span>
              </button>
            ) : (
              <button
                onClick={showLess}
                className="group relative px-8 py-3 border-2 border-[#d4af37] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-[#d4af37]/10"
                aria-expanded={true}
                aria-controls="testimonials-list"
              >
                <span className="relative z-10 text-[#d4af37] font-bold text-lg tracking-wide">
                  Show Less
                </span>
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 text-center">
          {[
            { number: testimonials.length, label: 'Happy Clients' },
            { number: "100%", label: 'Satisfaction Rate' },
            { number: "5", label: 'Average Rating' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20 transform hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-[#d4af37]/20"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-3xl font-bold text-[#d4af37] mb-2">
                {stat.number}
              </div>
              <div className="text-[#ffffea]/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;