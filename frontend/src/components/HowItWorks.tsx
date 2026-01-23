import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, AlertTriangle, Wand2, ChevronRight, Activity } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Code2,
    number: "01",
    title: "Write Code",
    description: "Start typing Python in our intelligent editor with syntax highlighting.",
    color: "primary",
  },
  {
    icon: AlertTriangle,
    number: "02",
    title: "Error Detected",
    description: "AI instantly identifies bugs, logical errors, and edge cases.",
    color: "warning",
  },
  {
    icon: Wand2,
    number: "03",
    title: "AI Auto-Fix",
    description: "Get smart suggestions and apply fixes with a single click.",
    color: "success",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden flex items-center py-0">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 tech-grid opacity-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />
      <motion.div 
        className="absolute inset-0 scanlines opacity-[0.02]"
      />
      <motion.div 
        className="orb-cyan w-[500px] h-[500px] right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [80, -80]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
        }}
      />
      <motion.div 
        className="orb-purple w-[400px] h-[400px] -left-1/4 top-1/3"
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
      />
      
      {/* Section transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
      
      {/* Animated vertical data streams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{ left: `${12 + i * 16}%`, height: '250px' }}
            initial={{ top: '-250px', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-card/50 backdrop-blur-sm mb-6"
          >
            <Activity className="h-4 w-4 text-secondary" />
            <span className="text-sm font-mono text-secondary tracking-wider">PROCESS.FLOW</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Three Steps to{" "}
            <span className="text-gradient-cyan">Perfect Code</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Our AI-powered workflow makes debugging effortless
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line with animation */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/60 via-secondary/60 to-green-500/60 -translate-y-1/2 origin-left" 
          />
          
          {/* Animated pulse on connection line */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-green-500 -translate-y-1/2 opacity-20 blur-sm"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 80, scale: 0.85, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                <div className="feature-card rounded-2xl border border-border bg-card p-8 text-center">
                  {/* Step Number */}
                  <motion.span 
                    initial={{ opacity: 0, y: -30, scale: 0.5 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-muted text-xs font-mono text-muted-foreground border border-border"
                  >
                    {step.number}
                  </motion.span>

                  {/* Icon with enhanced animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.2 + 0.4,
                      type: "spring",
                      stiffness: 120
                    }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`inline-flex p-5 rounded-2xl mb-6 ${
                      step.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : step.color === "warning"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>

                  {/* Content */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    className="text-xl font-semibold mb-3"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Animated Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0, x: -10 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.7, type: "spring" }}
                    className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10"
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
