import { lazy, Suspense } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import BackgroundWrapper from './layout/BackgroundWrapper';
import CustomCursor from './components/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary';

const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const About = lazy(() => import('./sections/About'));
const Testimonials = lazy(() => import('./sections/Testimonial'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

const SectionLoader = () => (
  <div className="skeleton-loader h-[300px] w-full rounded-xl" />
);

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <CustomCursor />
      <Navbar />

      <BackgroundWrapper>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </BackgroundWrapper>
    </div>
  );
}