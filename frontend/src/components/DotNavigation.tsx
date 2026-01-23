import { motion } from "framer-motion";

interface DotNavigationProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onDotClick: (sectionId: string) => void;
}

const DotNavigation = ({ sections, activeSection, onDotClick }: DotNavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onDotClick(section.id)}
          className="group relative flex items-center"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-8 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-medium text-foreground whitespace-nowrap"
          >
            {section.label}
          </motion.span>
          
          {/* Dot */}
          <div className="relative">
            {/* Active ring */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 -m-1.5 rounded-full border-2 border-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Dot itself */}
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-100"
                  : "bg-muted-foreground/40 scale-75 group-hover:scale-100 group-hover:bg-muted-foreground"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </button>
      ))}
    </motion.nav>
  );
};

export default DotNavigation;
