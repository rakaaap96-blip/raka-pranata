import { useRef, useState, useEffect, useMemo } from 'react';
import { projects } from '../data/projects';
import useFilter from '../hooks/useFilter';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import useMediaQuery from '../hooks/useMediaQuery';
import { useIsLite } from '../lib/device';
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

/* ============================================
   SKILL CARD
   One shared IntersectionObserver per marquee (see MarqueeSkills) instead of
   one per card, a single level bar instead of 10 dots, and no per-card blur —
   at 4 clones x 2 marquees those add up to 72 SVGs and 720 divs.
   ============================================ */
interface SkillCardProps {
  skill: {
    name: string;
    level: number;
    color: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  };
  index: number;
  isVisible: boolean;
}

function SkillCard({ skill, index, isVisible }: SkillCardProps) {
  const IconComponent = skill.icon;

  return (
    <div
      className="group cursor-default shrink-0 w-[9.5rem] sm:w-52 transition-[opacity,transform] duration-700 ease-out"
      style={{
        transitionDelay: `${Math.min(index, 8) * 80}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.94)',
      }}
    >
      <div className="relative cyber-card rounded-lg p-5 overflow-hidden transition-colors duration-300 group-hover:border-[#d4af37]/40">
        <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,234,0.08)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="36"
                fill="none"
                stroke="#d4af37"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 36}
                strokeDashoffset={isVisible ? 2 * Math.PI * 36 * (1 - skill.level / 100) : 2 * Math.PI * 36}
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37] transition-transform duration-300 group-hover:scale-110"
                aria-hidden={true}
              />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-[#ffffea] font-bold text-sm group-hover:text-[#d4af37] transition-colors duration-300">
              {skill.name}
            </h4>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-black text-[#d4af37]">{skill.level}</span>
              <span className="text-[#d4af37]/80 text-xs font-medium">%</span>
            </div>
          </div>

          {/* single segmented-look level bar (was 10 rounded dots) */}
          <div className="w-full h-1.5 rounded-full bg-[#ffffea]/10 overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${skill.color} rounded-full transition-[width] duration-1000 ease-out`}
              style={{ width: isVisible ? `${skill.level}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   INFINITE MARQUEE SKILLS ROW
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
  const isLite = useIsLite();
  const trackRef = useRef<HTMLDivElement>(null);

  // The -50% translate needs exactly two copies to loop seamlessly; a third
  // just hides the seam. Lite devices get two, everyone else gets three.
  const cloneCount = isLite ? 2 : 3;
  const marqueeSkills = useMemo(
    () => Array.from({ length: cloneCount }, () => skills).flat(),
    [skills, cloneCount],
  );

  // One observer for the whole row instead of one per card.
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '100px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden group/marquee py-4">
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-linear-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-linear-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className={`flex gap-4 sm:gap-6 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {marqueeSkills.map((skill, index) => (
          <SkillCard
            key={`${skill.name}-${index}`}
            skill={skill}
            index={index % skills.length}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

/* Hoisted to module scope: a new array identity on every render would defeat
   MarqueeSkills' useMemo and re-render all ~50 cards on each parent update. */
const SKILLS = [
  { name: "Figma", level: 90, color: "from-purple-500 to-pink-500", icon: FaFigma },
  { name: "Adobe Illustrator", level: 85, color: "from-cyan-500 to-blue-500", icon: SiAdobeillustrator },
  { name: "Corel Draw", level: 90, color: "from-orange-400 to-red-500", icon: SiCoreldraw },
  { name: "React.js", level: 85, color: "from-purple-500 to-pink-500", icon: FaReact },
  { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-600", icon: SiTypescript },
  { name: "TailwindCSS", level: 95, color: "from-teal-400 to-cyan-500", icon: SiTailwindcss },
  { name: "HTML/CSS", level: 95, color: "from-orange-400 to-red-500", icon: FaHtml5 },
  { name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-500", icon: FaJs },
  { name: "AI", level: 95, color: "from-teal-400 to-cyan-500", icon: GiArtificialIntelligence },
];

const SKILLS_REVERSED = [...SKILLS].reverse();

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
      <div className="terminal-section-label mb-2">[02] // PORTFOLIO</div>
      <div className="data-flow w-full max-w-48 mx-auto h-px mb-4" />
      <div className="cyber-line w-24 mx-auto mb-6" />
      
      <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 cyber-chip animate-float-subtle">
        <RiToolsFill className="w-4 h-4 text-[#d4af37]" />
        <span className="system-header text-sm font-medium tracking-[0.2em] uppercase">Portfolio</span>
      </div>
      
      <h2 
        id="projects-heading"
        className="text-fluid-2xl font-black leading-tight tracking-wide transition-transform duration-700 hover:scale-[1.03] cursor-default mb-6 relative"
      >
        <span className="lightning-text" data-text="My Projects">
          My Projects
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent rounded-full opacity-60" />
      </h2>
      
      <p className="text-fluid-md text-[#ffffea]/70 max-w-2xl mx-auto leading-relaxed">
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
  const isLite = useIsLite();
  const DEFAULT_VISIBLE = isDesktop ? 6 : 3;
  
  const [showAllCount, setShowAllCount] = useState<number | null>(null);
  const totalFiltered = filteredProjects.length;
  const visibleCount = showAllCount ?? Math.min(DEFAULT_VISIBLE, totalFiltered);

  const showAll = () => {
    setShowAllCount(totalFiltered);
  };

  const showLess = () => {
    setShowAllCount(null);
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id='projects'
      ref={projectsRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16 section-pad cyber-grid-section cyber-section"
      aria-labelledby="projects-heading"
    >
      {/* blur(120px) on a 384px box is one of the most expensive paints on the
          page, and at 5% opacity it is almost invisible — so lite devices drop it. */}
      {!isLite && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f4d03f]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </>
      )}

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div ref={ref}>
          <SectionHeader isVisible={isVisible} />
        </div>

        {/* SKILLS - INFINITE MARQUEE */}
        <div className="mb-10 sm:mb-16 relative" aria-labelledby="tech-stack-heading">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="cyber-line flex-1 max-w-24" />
            <h3 id="tech-stack-heading" className="text-fluid-lg font-black leading-tight tracking-wide transition-transform duration-700 hover:scale-[1.03] cursor-default flex items-center gap-2 sm:gap-3">
              <RiToolsFill className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow text-[#d4af37] shrink-0" aria-hidden="true" />
              <span className="lightning-text" data-text="Tech Stack">Tech Stack</span>
            </h3>
            <div className="cyber-line flex-1 max-w-24" />
          </div>

          <MarqueeSkills skills={SKILLS} direction="left" speed={35} />
          <div className="mt-2">
            <MarqueeSkills skills={SKILLS_REVERSED} direction="right" speed={40} />
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
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] cyber-button-cut font-bold text-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/30 overflow-hidden"
                  >
                    <span className="relative z-10">Show More</span>
                    <span className="relative z-10 bg-[#1a1a1a]/20 px-2 py-0.5 rounded-md text-sm">{totalFiltered - visibleCount}</span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#f4d03f] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ) : (
                  <button
                    onClick={showLess}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] border border-[#d4af37]/50 cyber-button-cut font-bold text-[#d4af37] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/20 overflow-hidden"
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
            className="text-center py-16 sm:py-20 cyber-panel cyber-frame mt-8 sm:mt-10"
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
