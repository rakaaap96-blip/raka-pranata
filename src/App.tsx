import { lazy, Suspense } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import BackgroundWrapper from './layout/BackgroundWrapper';
import CustomCursor from './components/CustomCursor';

// Komponen yang di-lazy (dimuat belakangan)
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const About = lazy(() => import('./sections/About'));
const Testimonials = lazy(() => import('./sections/Testimonial'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));
const AIChatBot = lazy(() => import('./components/chat/AiChatBot'));

// Komponen fallback saat loading (skeleton)
const SectionLoader = () => (
  <div className="skeleton-loader" style={{ height: '300px', width: '100%', borderRadius: '12px' }} />
);

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>
      <BackgroundWrapper>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </BackgroundWrapper>
    </div>
  );
}