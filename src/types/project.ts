export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  /** Intrinsic size of `image`, so the browser reserves the box before it loads. */
  imageWidth: number;
  imageHeight: number;
  technologies: string[];
  category: string;
  liveUrl?: string;
  featured: boolean;
}