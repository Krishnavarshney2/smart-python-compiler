import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal, Menu, X, ArrowUpRight, User } from "lucide-react";
import { useState, useCallback } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      setMobileOpen(false);
    }
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Subtle gradient background that blends with page */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent pointer-events-none" />
      
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8 relative">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 backdrop-blur-md border border-border/40 group-hover:border-primary/50 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Terminal className="h-5 w-5 text-foreground relative z-10" />
          </motion.div>
        </a>

        {/* Center Navigation - Desktop with glass pill container */}
        <motion.div 
          className="hidden md:flex items-center gap-0.5 bg-muted/30 backdrop-blur-xl rounded-full px-1.5 py-1.5 border border-border/20 relative shadow-lg shadow-background/50"
          style={{
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-muted/50 rounded-full border border-border/30"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
          
          {/* Protection button inside pill */}
          <a
            href="#protection"
            onClick={(e) => handleSmoothScroll(e, "#protection")}
            onMouseEnter={() => setHoveredIndex(navLinks.length)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center gap-1 px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
          >
            {hoveredIndex === navLinks.length && (
              <motion.div
                layoutId="navbar-pill"
                className="absolute inset-0 bg-muted/50 rounded-full border border-border/30"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              Protection
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </a>
          
          {/* Shield icon with glow on hover */}
          <motion.div 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/40 border border-border/30 ml-1 group/shield"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className="w-4 h-4 text-muted-foreground group-hover/shield:text-primary transition-colors duration-200" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="/auth"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 ease-out px-3 py-2 rounded-full hover:bg-muted/30 border border-transparent hover:border-border/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="h-4 w-4" />
            <span>Create Account</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200 ease-out active:scale-[0.98] active:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#protection"
              onClick={(e) => handleSmoothScroll(e, "#protection")}
              className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200 ease-out flex items-center gap-2"
            >
              Protection <ArrowUpRight className="h-3 w-3" />
            </a>
            <a href="/auth" className="flex gap-2 mt-2 pt-2 border-t border-border/50">
              <Button variant="outline" size="sm" className="flex-1 transition-all duration-200 ease-out">
                <User className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
