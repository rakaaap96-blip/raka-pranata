import { useState } from 'react';
import type { Project } from '../../types/project';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { 
  SiTypescript, 
  SiJavascript, 
  SiReact, 
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFigma,
  SiAdobexd,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiVercel,
  SiVite,
  SiAdobeillustrator
} from 'react-icons/si';

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Mapping technology names to icons
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase();
  
  if (techLower.includes('type')) return SiTypescript;
  if (techLower.includes('tailwind')) return SiTailwindcss; // Pakai SiTailwindcss
  if (techLower.includes('vite')) return SiVite;
  if (techLower.includes('java')) return SiJavascript;
  if (techLower.includes('react')) return SiReact;
  if (techLower.includes('next')) return SiNextdotjs;
  if (techLower.includes('node')) return SiNodedotjs;
  if (techLower.includes('python')) return SiPython;
  if (techLower.includes('html')) return SiHtml5;
  if (techLower.includes('css')) return SiCss3;
  if (techLower.includes('adobe illustrator')) return SiAdobeillustrator;
  if (techLower.includes('figma')) return SiFigma;
  if (techLower.includes('adobe') || techLower.includes('xd')) return SiAdobexd;
  if (techLower.includes('git')) return SiGit;
  if (techLower.includes('mongo')) return SiMongodb;
  if (techLower.includes('postgres')) return SiPostgresql;
  if (techLower.includes('firebase')) return SiFirebase;
  if (techLower.includes('vercel')) return SiVercel;
  
  return HiSparkles; // default icon
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#d4af37]/20 transition-all duration-700 transform hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gray-800 transition-opacity duration-500 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`} />
        
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110 rotate-1' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-80' : 'opacity-40'
        }`} />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-bold transform -rotate-6 shadow-lg flex items-center gap-1">
            <FaStar className="w-3 h-3" />
            Featured
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-[#1a1a1a]/90 text-[#d4af37] px-3 py-1 rounded-full text-sm font-medium border border-[#d4af37]/30 backdrop-blur-sm flex items-center gap-1">
          <HiSparkles className="w-3 h-3" />
          {project.category}
        </div>
        
        {/* Hover Actions - Only Live Demo */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] text-center py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#ffffea] mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-[#ffffea]/70 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Technologies with Icons */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => {
            const IconComponent = getTechIcon(tech);
            return (
              <span
                key={techIndex}
                className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs rounded-full border border-[#d4af37]/20 transition-all duration-300 hover:bg-[#d4af37] hover:text-[#1a1a1a] hover:scale-105 cursor-default flex items-center gap-1"
              >
                <IconComponent className="w-3 h-3" />
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;