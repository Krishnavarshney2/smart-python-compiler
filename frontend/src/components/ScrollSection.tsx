import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const ScrollSection = ({ id, children, className = "" }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <section
      id={id}
      className={`h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden relative ${className}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.95,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection;
