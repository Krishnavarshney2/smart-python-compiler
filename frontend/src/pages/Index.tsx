import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import DotNavigation from "@/components/DotNavigation";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const sections = [
  { id: "hero", label: "Home" },
  { id: "intro", label: "Introduction" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "roadmap", label: "Roadmap" },
  { id: "footer", label: "Contact" },
];

// Wrapper component for scroll-triggered animations
const AnimatedSection = ({ 
  id, 
  children, 
  className = "" 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      id={id}
      className={`min-h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden relative ${className}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: isInView ? 1 : 0.3,
          scale: isInView ? 1 : 0.96,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation hook
  useKeyboardNavigation({
    sections,
    activeSection,
    containerRef: containerRef as React.RefObject<HTMLElement>,
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - windowHeight / 3 &&
            scrollPosition < offsetTop + offsetHeight - windowHeight / 3
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dot navigation click
  const handleDotClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      {/* Dot Navigation */}
      <DotNavigation 
        sections={sections} 
        activeSection={activeSection} 
        onDotClick={handleDotClick}
      />
      
      {/* Scroll Snap Container */}
      <main
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatedSection id="hero">
          <HeroSection />
        </AnimatedSection>
        
        <AnimatedSection id="intro">
          <IntroSection />
        </AnimatedSection>
        
        <AnimatedSection id="features">
          <FeaturesSection />
        </AnimatedSection>
        
        <AnimatedSection id="how-it-works">
          <HowItWorks />
        </AnimatedSection>
        
        <AnimatedSection id="roadmap">
          <ComingSoon />
        </AnimatedSection>
        
        <AnimatedSection id="footer" className="min-h-[50vh]">
          <Footer />
        </AnimatedSection>
      </main>
      
      <ScrollToTop />
    </motion.div>
  );
};

export default Index;
