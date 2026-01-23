import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Sparkles, Circle } from "lucide-react";

const CodeWindow = () => {
  const [stage, setStage] = useState<"buggy" | "fixing" | "fixed">("buggy");

  useEffect(() => {
    const cycle = () => {
      setStage("buggy");
      setTimeout(() => setStage("fixing"), 2500);
      setTimeout(() => setStage("fixed"), 4000);
    };
    
    cycle();
    const interval = setInterval(cycle, 7000);
    return () => clearInterval(interval);
  }, []);

  const buggyCode = [
    { text: "def calculate_average(numbers):", type: "normal" },
    { text: "    total = 0", type: "normal" },
    { text: "    for num in numbers:", type: "normal" },
    { text: "        total += num", type: "normal" },
    { text: "    return total / len(numbers)", type: "error", comment: "# ZeroDivisionError" },
    { text: "", type: "normal" },
    { text: "result = calculate_average([])", type: "normal" },
    { text: "print(result)", type: "normal" },
  ];

  const fixedCode = [
    { text: "def calculate_average(numbers):", type: "normal" },
    { text: "    if not numbers:", type: "success" },
    { text: "        return 0", type: "success", comment: "# ✓ Handle empty list" },
    { text: "    total = sum(numbers)", type: "success" },
    { text: "    return total / len(numbers)", type: "normal" },
    { text: "", type: "normal" },
    { text: "result = calculate_average([])", type: "normal" },
    { text: "print(result)", type: "normal", comment: "# Output: 0" },
  ];

  const currentCode = stage === "fixed" ? fixedCode : buggyCode;

  return (
    <div className="relative">
      {/* Glow effects */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-50 blur-xl" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />
      
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="relative code-window rounded-2xl overflow-hidden shadow-2xl">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Circle className="w-3 h-3 fill-red-500/80 text-red-500/80" />
                <Circle className="w-3 h-3 fill-yellow-500/80 text-yellow-500/80" />
                <Circle className="w-3 h-3 fill-green-500/80 text-green-500/80" />
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground font-mono">main.py</span>
            </div>
            
            {/* Status Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  stage === "buggy"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : stage === "fixing"
                    ? "bg-secondary/10 text-secondary border border-secondary/20"
                    : "bg-green-500/10 text-green-400 border border-green-500/20"
                }`}
              >
                {stage === "buggy" && (
                  <>
                    <AlertCircle className="h-3.5 w-3.5" />
                    Error Detected
                  </>
                )}
                {stage === "fixing" && (
                  <>
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    AI Analyzing...
                  </>
                )}
                {stage === "fixed" && (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Fixed!
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code Content */}
          <div className="p-5 font-mono text-sm leading-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentCode.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-muted-foreground/40 select-none text-right pr-4">
                      {i + 1}
                    </span>
                    <span
                      className={
                        line.type === "error"
                          ? "text-red-400"
                          : line.type === "success"
                          ? "text-green-400"
                          : "text-foreground/80"
                      }
                    >
                      {line.text}
                      {line.comment && (
                        <span className={`ml-2 ${line.type === "error" ? "text-red-400/60" : "text-muted-foreground/60"}`}>
                          {line.comment}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI Fix Overlay */}
          {stage === "fixing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-6 -right-6 p-3 rounded-xl glass border border-primary/20 glow-cyan-sm"
      >
        <Sparkles className="h-5 w-5 text-primary" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 p-3 rounded-xl glass border border-secondary/20"
      >
        <CheckCircle2 className="h-5 w-5 text-secondary" />
      </motion.div>
    </div>
  );
};

export default CodeWindow;
