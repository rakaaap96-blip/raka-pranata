import { lazy, Suspense } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import BackgroundWrapper from './layout/BackgroundWrapper';
import CustomCursor from './components/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary';
import LazySection from './components/LazySection';

const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const About = lazy(() => import('./sections/About'));
const Testimonials = lazy(() => import('./sections/Testimonial'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

const SectionLoader = () => (
  <div className="skeleton-loader h-[300px] w-full rounded-xl" aria-hidden="true" />
);

function Gate({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <LazySection id={id}>
        <Suspense fallback={<SectionLoader />}>{children}</Suspense>
      </LazySection>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="vhs-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />

      <BackgroundWrapper>
        {/* Hero is the LCP - it stays eager so the id resolves immediately. */}
        <Hero />
        <Gate id="projects"><ProjectsSection /></Gate>
        <Gate id="about"><About /></Gate>
        <Gate id="testimonials"><Testimonials /></Gate>
        <Gate id="contact"><Contact /></Gate>
        <Gate id="site-footer"><Footer /></Gate>
      </BackgroundWrapper>
    </div>
  );
}
