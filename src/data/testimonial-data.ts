export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Lau",
    role: "Product Manager",
    company: "TechStart Inc.",
    image: "/IMGG/EmilyLau.webp",
    text: "Raka transformed our user interface with his exceptional design skills and attention to detail. His ability to understand user needs and translate them into beautiful, functional designs is remarkable.",
    rating: 5,
    project: "E-Commerce Platform Redesign"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Head Designer",
    company: "Digital Solutions",
    image: "/IMGG/MarcusRodriguez.webp",
    text: "Sobrang game-changer makatrabaho si Raka. Dahil sa linis ng code niya at mga clever na solusyon, napa-aga namin ang delivery ng project. Frontend expert talaga siya.",
    rating: 5,
    project: "Healthcare Dashboard"
  },
  {
    id: 3,
    name: "Siti Nurlina",
    role: "Director",
    company: "Construction Agency",
    image: "/IMGG/SitiNurlina.webp",
    text: "Perpaduan antara design thinking dan keahlian teknis Raka itu langka. Ia tidak hanya membuat antarmuka yang memukau, tetapi juga memahami implikasi teknis di balik setiap keputusan desain.",
    rating: 5,
    project: "Safety First Dashboard"
  },

];