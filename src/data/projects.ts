import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: "Reconstella Company Profile",
    description: "Cleanest construction company profile",
    image: "/IMGG/reconstella.webp",
    technologies: ["Figma", "React", "TypeScript", 'vite', 'vercel', 'git'],
    category: "Company Profile",
    liveUrl: "https://reconstella.vercel.app/",
    featured: true
  },
  {
    id: 2,
    title: "NutriNest",
    description: "Modern, clean, minimalist interface design",
    image: "/IMGG/UIdesign.webp",
    technologies: ["Figma", "Adobe Illustrator", "Prototyping"],
    category: "UI Design",
    liveUrl: "https://www.figma.com/proto/UyFCrBWUuZEJF4WzF832AQ/NutriNest-FIx?node-id=1-8449&p=f&t=VLNxdBOPUGgRWkvQ-0&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A3551&hide-ui=1",
    featured: true
  },
  {
    id: 3,
    title: "Artisan Craft",
    description: "Interactive, Intuitive, Animative, Responsive landing page",
    image: "/IMGG/ArtisanCraftHero.webp",
    technologies: ["React", "TypeScript", "TailwindCSS", "vite", 'vercel', 'git'],
    category: "Landing Page",
    liveUrl: "https://artisan-tan.vercel.app/",
    featured: false
  },
  {
    id: 4,
    title: "Bogor Nexus",
    description: "Futuristic, responsive, and intuitive dashboard ",
    image: "/IMGG/BogorNexus.webp",
    technologies: ["React", "TailwindCSS", "TypeScript", "Vite", "Framer Motion", "lucide", 'git', 'vercel'],
    category: "Dashboard",
    liveUrl: "https://bogor-nexus.vercel.app/",
    featured: false
  }
];

export const categories = ["All", "Company Profile", "UI Design", "Landing Page", "Dashboard"];