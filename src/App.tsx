import ProjectsSection from './sections/ProjectsSection';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import BackgroundWrapper from './layout/BackgroundWrapper';
import Testimonials from './sections/Testimonial';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AIChatBot from './components/chat/AiChatBot';
import CustomCursor from './components/CustomCursor';


export default function App() {
  return (
    <div className=" bg-[#050505] text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <AIChatBot />
      <BackgroundWrapper>
        <Hero />
        <ProjectsSection />
        <About/>
        <Testimonials/>
        <Contact />
        <Footer />
      </BackgroundWrapper>
      
    </div>
  );
}
