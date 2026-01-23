import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NeuralBackground from "./NeuralBackground";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Subtle Gradient Orbs */}
      <div className="orb-cyan w-[800px] h-[800px] top-0 left-1/4 -translate-x-1/2 -translate-y-1/3" />
      <div className="orb-purple w-[600px] h-[600px] bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
      
      {/* Radial fade at edges */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Minimal Hero - Just Name & Headline */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-foreground">Neuro</span>
              <span className="text-gradient-cyan">Code</span>
            </span>
          </motion.div>

          {/* Main Headline with staggered entrance animation */}
          <motion.h1 
            key="hero-headline-v2"
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              Write Python.
            </motion.span>
            <motion.span
              className="block text-shimmer text-glow-cyan"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              Break It.
            </motion.span>
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              Let AI Fix It.
            </motion.span>
          </motion.h1>
        </div>
      </div>

      {/* Scroll Indicator - Positioned at section level, outside content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            filter: [
              "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
              "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))",
              "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-primary/80"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-light">Scroll to explore</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
