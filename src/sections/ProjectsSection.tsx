import { useRef, useState, useEffect } from 'react';
import { projects } from '../data/projects';
import useFilter from '../hooks/useFilter';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import { 
  FaFigma, 
  FaReact, 
  FaHtml5, 
  FaJs, 
  FaSearch,
} from 'react-icons/fa';
import { 
  SiAdobeillustrator, 
  SiCoreldraw, 
  SiTypescript, 
  SiTailwindcss,
} from 'react-icons/si';
import { 
  GiArtificialIntelligence 
} from 'react-icons/gi';
import { 
  RiToolsFill,
} from 'react-icons/ri';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/* ============================================
   SKILL CARD (TANPA PARTIKEL, TANPA CONDITIONAL RENDER)
   ============================================ */
interface SkillCardProps {
  skill: {
    name: string;
    level: number;
    color: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = skill.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-default shrink-0 w-44 sm:w-48 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow background (always there, opacity controlled by group-hover) */}
      <div 
        className={`absolute -inset-1 rounded-2xl bg-linear-to-r ${skill.color} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-40`}
      />

      <div className="relative bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-5 border border-[#d4af37]/10 overflow-hidden transition-all duration-500 group-hover:border-[#d4af37]/40 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/10">
        {/* Top border line */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shimmer sweep (always there, opacity controlled) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-shimmer-sweep" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,234,0.08)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r={radius} fill="none" stroke="url(#gradient)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isVisible ? strokeDashoffset : circumference}
                className="transition-all duration-1500 ease-out"
                style={{ transitionDelay: `${index * 120 + 300}ms` }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#f4d03f" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative transition-all duration-500 group-hover:scale-110">
                <IconComponent 
                  className={`w-7 h-7 text-[#d4af37] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]`}
                  aria-hidden={true} 
                />
                {/* Efek glow icon – selalu ada, opacity diatur */}
                <div className="absolute inset-0 blur-lg bg-[#d4af37]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-[#ffffea] font-bold text-sm group-hover:text-[#d4af37] transition-colors duration-300">
              {skill.name}
            </h4>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-black bg-linear-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent">
                {skill.level}
              </span>
              <span className="text-[#d4af37]/60 text-xs font-medium">%</span>
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i < Math.floor(skill.level / 10)
                    ? 'bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.5)]'
                    : 'bg-[#ffffea]/10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100 + i * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   INFINITE MARQUEE SKILLS ROW (tanpa perubahan)
   ============================================ */
interface MarqueeSkillsProps {
  skills: Array<{
    name: string;
    level: number;
    color: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  }>;
  direction?: 'left' | 'right';
  speed?: number;
}

function MarqueeSkills({ skills, direction = 'left', speed = 30 }: MarqueeSkillsProps) {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];
  
  return (
    <div className="relative overflow-hidden group/marquee py-4">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div 
        className={`flex gap-4 sm:gap-6 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index % skills.length} />
        ))}
      </div>
    </div>
  );
}

/* ============================================
   SECTION HEADER
   ============================================ */
function SectionHeader({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`text-center mb-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 animate-float-subtle">
        <RiToolsFill className="w-4 h-4 text-[#d4af37]" />
        <span className="text-[#d4af37] text-sm font-medium tracking-wider uppercase">Portfolio</span>
      </div>
      
      <h2 
        id="projects-heading"
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 relative"
      >
        <span className="bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x bg-size-[200%_auto]">
          My Projects
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent rounded-full opacity-60" />
      </h2>
      
      <p className="text-lg sm:text-xl text-[#ffffea]/60 max-w-2xl mx-auto leading-relaxed">
        Projects with a frontend focus that highlight current development techniques, seamless interactions, and clean design.
      </p>
    </div>
  );
}

function ProjectsSection() {
  const { filter, setFilter, searchTerm, setSearchTerm, filteredProjects } = useFilter(projects);
  const { ref, isVisible } = useScrollAnimation();
  const projectsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const DEFAULT_VISIBLE = isDesktop ? 6 : 3;
  
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE);
  const totalFiltered = filteredProjects.length;

  useEffect(() => {
    setVisibleCount(prev => {
      if (prev === totalFiltered) return prev;
      return DEFAULT_VISIBLE;
    });
  }, [isDesktop, DEFAULT_VISIBLE, totalFiltered]);

  useEffect(() => {
    setVisibleCount(DEFAULT_VISIBLE);
  }, [filter, searchTerm, DEFAULT_VISIBLE]);

  const showAll = () => {
    setVisibleCount(totalFiltered);
  };

  const showLess = () => {
    setVisibleCount(DEFAULT_VISIBLE);
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skills = [
    { name: "Figma", level: 90, color: "from-purple-500 to-pink-500", icon: FaFigma },
    { name: "Adobe Illustrator", level: 85, color: "from-cyan-500 to-blue-500", icon: SiAdobeillustrator },
    { name: "Corel Draw", level: 90, color: "from-orange-400 to-red-500", icon: SiCoreldraw },
    { name: "React.js", level: 85, color: "from-purple-500 to-pink-500", icon: FaReact },
    { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-600", icon: SiTypescript },
    { name: "TailwindCSS", level: 95, color: "from-teal-400 to-cyan-500", icon: SiTailwindcss },
    { name: "HTML/CSS", level: 95, color: "from-orange-400 to-red-500", icon: FaHtml5 },
    { name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-500", icon: FaJs },
    { name: "AI", level: 95, color: "from-teal-400 to-cyan-500", icon: GiArtificialIntelligence }
  ];

  return (
    <section
      id='projects'
      ref={projectsRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f4d03f]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div ref={ref}>
          <SectionHeader isVisible={isVisible} />
        </div>

        {/* SKILLS - INFINITE MARQUEE */}
        <div className="mb-16 relative" aria-labelledby="tech-stack-heading">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-[#d4af37]/50" />
            <h3 id="tech-stack-heading" className="text-xl sm:text-2xl font-bold text-[#d4af37] flex items-center gap-3">
              <RiToolsFill className="w-6 h-6 animate-spin-slow" aria-hidden="true" />
              Tech Stack
            </h3>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-[#d4af37]/50" />
          </div>

          <MarqueeSkills skills={skills} direction="left" speed={35} />
          <div className="mt-2">
            <MarqueeSkills skills={[...skills].reverse()} direction="right" speed={40} />
          </div>
        </div>

        <div ref={filterRef}>
          <ProjectFilter
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {totalFiltered > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
              {filteredProjects.slice(0, visibleCount).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            
            {totalFiltered > DEFAULT_VISIBLE && (
              <div className="text-center mt-8 sm:mt-10">
                {visibleCount < totalFiltered ? (
                  <button
                    onClick={showAll}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-xl font-bold text-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/30 overflow-hidden"
                    aria-label="Show all projects"
                  >
                    <span className="relative z-10">Show More</span>
                    <span className="relative z-10 bg-[#1a1a1a]/20 px-2 py-0.5 rounded-md text-sm">{totalFiltered - visibleCount}</span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#f4d03f] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ) : (
                  <button
                    onClick={showLess}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] border border-[#d4af37]/50 rounded-xl font-bold text-[#d4af37] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/20 overflow-hidden"
                    aria-label="Show fewer projects"
                  >
                    <span className="relative z-10">Show Less</span>
                    <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div 
            className="text-center py-16 sm:py-20 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 mt-8 sm:mt-10"
            role="status" aria-live="polite"
          >
            <FaSearch className="text-4xl sm:text-6xl mb-4 mx-auto text-[#d4af37]/50 animate-bounce-slow" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#ffffea] mb-2">No projects found</h3>
            <p className="text-[#ffffea]/70 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;