import { useState, useRef } from 'react';
import MagneticButton from '../ui/MagneticButton';
import { categories } from '../../data/projects';

interface ProjectFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

function ProjectFilter({ filter, setFilter, searchTerm, setSearchTerm }: ProjectFilterProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [typingIntensity, setTypingIntensity] = useState(0);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTypingIntensity(1);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setTypingIntensity(0), 300);
  };

  return (
    <div className="relative mb-8 sm:mb-12 lg:mb-16">
      {/* Main Container */}
      <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-[#d4af37]/15 backdrop-blur-xl bg-[#1a1a1a]/60 overflow-hidden">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full lg:w-80 lg:shrink-0 group">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>

            {/* Animated border glow */}
            <div
              className={`absolute -inset-px rounded-xl sm:rounded-2xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] opacity-0 blur-sm transition-opacity duration-500 bg-[size:200%_100%] ${
                isFocused ? 'opacity-60 animate-spin-slow' : ''
              }`}
            />

            <div className="relative bg-[#0f0f0f] rounded-xl sm:rounded-2xl border border-[#d4af37]/20 overflow-hidden">
              {/* Typing Wave */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 flex items-end gap-0.5 px-3 opacity-0 transition-opacity duration-200"
                style={{ opacity: typingIntensity > 0 ? 0.5 : 0 }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-linear-to-t from-[#d4af37] to-[#f4d03f] rounded-full animate-wave-bar"
                    style={{
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 40}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isFocused ? 'text-[#d4af37] scale-110' : 'text-[#d4af37]/40'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                id="project-search"
                autoComplete="off"
                placeholder="Search projects or tech..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === 'Escape' && setSearchTerm('')}
                className="w-full pl-9 sm:pl-12 pr-9 sm:pr-10 py-3 sm:py-3.5 bg-transparent text-[#ffffea] placeholder-[#ffffea]/30 focus:outline-none text-sm"
              />

              {/* Clear button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-[#d4af37]/50 hover:text-[#d4af37] transition-all duration-200 hover:rotate-90 touch-manipulation"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="relative flex flex-wrap gap-1.5 sm:gap-2 justify-center items-center p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#0f0f0f]/50 border border-[#d4af37]/10">
            {categories.map((category, idx) => {
              const isActive = filter === category;
              return (
                <MagneticButton
                  key={category}
                  variant={isActive ? 'primary' : 'ghost'}
                  onClick={() => setFilter(category)}
                  delay={idx * 80}
                  magnetStrength={0.3}
                  particleCount={0}
                  ripple={false}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold min-h-10 transition-all duration-300 ${
                    isActive
                      ? 'text-[#1a1a1a] bg-linear-to-r from-[#d4af37] to-[#f4d03f] shadow-md shadow-[#d4af37]/20'
                      : 'text-[#ffffea]/70 hover:text-[#ffffea] hover:bg-[#d4af37]/10'
                  }`}
                >
                  {category}
                </MagneticButton>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectFilter;