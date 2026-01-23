import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Sparkles, BrainCircuit, Rocket } from "lucide-react";
import { useRef } from "react";

const ComingSoon = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const tags = ["Code Explanations", "Refactoring", "Documentation", "Best Practices"];

  return (
    <section ref={sectionRef} id="roadmap" className="h-screen relative overflow-hidden flex items-center py-0">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 tech-grid opacity-15"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />
      <motion.div 
        className="absolute inset-0 hex-pattern opacity-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
      />
      <motion.div 
        className="orb-purple w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])
        }}
      />
      <motion.div 
        className="orb-cyan w-[400px] h-[400px] right-0 top-0 translate-x-1/2 -translate-y-1/2"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
      
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Section label */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-card/50 backdrop-blur-sm">
              <Rocket className="h-4 w-4 text-secondary" />
              <span className="text-sm font-mono text-secondary tracking-wider">ROADMAP.PHASE_2</span>
            </div>
          </motion.div>
          
          {/* Card container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Animated glow */}
            <motion.div 
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Card */}
            <div className="relative border-gradient rounded-3xl overflow-hidden">
              <div className="p-8 md:p-12 lg:p-16 bg-card/90 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Icon Group */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Concentric rings */}
                    {[1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute rounded-full border border-primary/20"
                        style={{
                          width: `${80 + ring * 30}px`,
                          height: `${80 + ring * 30}px`,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 8 + ring * 2, 
                          repeat: Infinity,
                          delay: ring * 0.3,
                          ease: "linear"
                        }}
                      />
                    ))}
                    
                    <motion.div 
                      className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 border border-primary/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MessageSquare className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 p-2 rounded-xl bg-secondary/20 border border-secondary/30"
                    >
                      <Sparkles className="h-4 w-4 text-secondary" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-2 -left-2 p-2 rounded-xl bg-primary/20 border border-primary/30"
                    >
                      <BrainCircuit className="h-4 w-4 text-primary" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center lg:text-left flex-1">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                      </span>
                      <span className="text-sm font-medium text-secondary">Coming in Phase 2</span>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-3xl md:text-4xl font-bold mb-4"
                    >
                      Context-Aware{" "}
                      <span className="text-gradient-purple">Chat Copilot</span>
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-muted-foreground text-lg leading-relaxed max-w-xl"
                    >
                      Ask questions about your code, get explanations, and receive
                      guided refactoring suggestions — all powered by AI that
                      understands your entire project context.
                    </motion.p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                      {tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default ComingSoon;
