import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Sparkles, Zap, Brain, Code2, Terminal } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Sparkles,
    title: "Auto-Heal",
    description: "AI analyzes stack traces and suggests fixes instantly — learn while you code.",
    gradient: "from-primary/20 to-secondary/20",
    iconColor: "text-primary",
    glowColor: "var(--primary)",
  },
  {
    icon: Shield,
    title: "Smart Compilation",
    description: "Run Python securely in isolated sandboxes with zero setup.",
    gradient: "from-secondary/10 to-pink-500/10",
    iconColor: "text-secondary",
    glowColor: "var(--secondary)",
  },
  {
    icon: Zap,
    title: "Optimization",
    description: "Get suggestions to reduce time complexity.",
    gradient: "from-yellow-500/10 to-orange-500/10",
    iconColor: "text-yellow-400",
    glowColor: "45 93% 47%",
  },
  {
    icon: Brain,
    title: "Context-Aware",
    description: "AI understands your entire codebase, not just single lines of code.",
    gradient: "from-pink-500/10 to-secondary/10",
    iconColor: "text-pink-400",
    glowColor: "var(--pink)",
  },
  {
    icon: Code2,
    title: "Real-time Feedback",
    description: "See errors and suggestions as you type, no waiting.",
    gradient: "from-primary/10 to-cyan-400/10",
    iconColor: "text-cyan-400",
    glowColor: "var(--cyan)",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="features" className="h-screen relative overflow-hidden flex items-center py-0">
      {/* Realistic Mesh Gradient Background */}
      <div className="mesh-gradient" />
      
      {/* Aurora effect layer */}
      <motion.div 
        className="aurora-bg"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
        }}
      />
      
      {/* Grain texture for realism */}
      <div className="grain-overlay" />
      
      {/* Subtle grid overlay */}
      <motion.div 
        className="absolute inset-0 bg-grid-sm opacity-[0.03]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
      />
      
      {/* Floating organic orbs */}
      <motion.div 
        className="orb-purple w-[700px] h-[700px] -left-[20%] top-[20%]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [80, -80]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9])
        }}
        animate={{ 
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="orb-cyan w-[500px] h-[500px] right-[5%] top-[60%]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [40, -60]) }}
        animate={{ 
          x: [0, -15, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="orb-pink w-[400px] h-[400px] left-[60%] top-[10%]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [30, -40]) }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Section transitions */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
      
      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-4"
          >
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-primary tracking-wider">CORE.FEATURES</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Built for{" "}
            <span className="text-gradient-purple">Modern Developers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to write, debug, and optimize Python code with
            the power of AI.
          </motion.p>
        </motion.div>

        {/* Bento Grid - Top Row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                boxShadow: `0 0 20px hsl(${feature.glowColor} / 0.3), 0 0 40px hsl(${feature.glowColor} / 0.15), 0 10px 30px hsl(${feature.glowColor} / 0.1)`,
                transition: { duration: 0.2 }
              }}
              className="feature-card rounded-2xl border border-border bg-card p-5 lg:p-6 cursor-pointer active:scale-[0.97] transition-transform"
            >
              {/* Gradient background on hover */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0`}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid - Bottom Row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {features.slice(3, 5).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: (index + 3) * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                boxShadow: `0 0 20px hsl(${feature.glowColor} / 0.3), 0 0 40px hsl(${feature.glowColor} / 0.15), 0 10px 30px hsl(${feature.glowColor} / 0.1)`,
                transition: { duration: 0.2 }
              }}
              className="feature-card rounded-2xl border border-border bg-card p-5 lg:p-6 cursor-pointer active:scale-[0.97] transition-transform"
            >
              {/* Gradient background on hover */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0`}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index + 3) * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
