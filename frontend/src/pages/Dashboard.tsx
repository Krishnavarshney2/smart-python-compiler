import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  FolderOpen, 
  Bot, 
  Clock, 
  LogOut, 
  Settings, 
  User, 
  Sparkles,
  ChevronDown,
  FileCode
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NeuralBackground from "@/components/NeuralBackground";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const userName = "Traveler";

  const recentActivity = [
    { name: "main.py", time: "2 hours ago" },
    { name: "neural_net.py", time: "5 hours ago" },
    { name: "data_processor.py", time: "1 day ago" },
  ];

  const cards = [
    {
      id: 1,
      icon: Terminal,
      title: "Smart Python IDE",
      description: "Write, run, and fix Python code with AI assistance.",
      buttonText: "Launch Editor",
      buttonStyle: "primary" as const,
      glowColor: "emerald",
      comingSoon: false,
    },
    {
      id: 2,
      icon: FolderOpen,
      title: "My Projects",
      description: "Access your saved code snippets and history.",
      buttonText: "View Library",
      buttonStyle: "outline" as const,
      glowColor: "blue",
      comingSoon: false,
    },
    {
      id: 3,
      icon: Bot,
      title: "NeuroChat Agent",
      description: "Brainstorm logic and architecture with AI.",
      buttonText: "Chat Now",       // 👇 TEXT CHANGED
      buttonStyle: "primary" as const, // 👇 STYLE CHANGED
      glowColor: "purple",
      comingSoon: false,            // 👇 ENABLED (False)
    },
  ];

  const getGlowStyles = (color: string) => {
    const glows = {
      emerald: {
        iconBg: "from-emerald-400 via-green-500 to-teal-400",
        iconShadow: "shadow-[0_0_40px_rgba(16,185,129,0.6)]",
        borderHover: "group-hover:border-emerald-400/60",
        cardGlow: "group-hover:shadow-[0_0_60px_rgba(16,185,129,0.25),0_0_100px_rgba(16,185,129,0.1)]",
        accentColor: "emerald",
        bgGradient: "from-emerald-500/10 via-transparent to-transparent",
        pulseColor: "bg-emerald-500",
      },
      blue: {
        iconBg: "from-blue-400 via-cyan-500 to-sky-400",
        iconShadow: "shadow-[0_0_40px_rgba(59,130,246,0.6)]",
        borderHover: "group-hover:border-blue-400/60",
        cardGlow: "group-hover:shadow-[0_0_60px_rgba(59,130,246,0.25),0_0_100px_rgba(59,130,246,0.1)]",
        accentColor: "blue",
        bgGradient: "from-blue-500/10 via-transparent to-transparent",
        pulseColor: "bg-blue-500",
      },
      purple: {
        iconBg: "from-purple-400 via-violet-500 to-fuchsia-400",
        iconShadow: "shadow-[0_0_40px_rgba(168,85,247,0.6)]",
        borderHover: "group-hover:border-purple-400/60",
        cardGlow: "group-hover:shadow-[0_0_60px_rgba(168,85,247,0.25),0_0_100px_rgba(168,85,247,0.1)]",
        accentColor: "purple",
        bgGradient: "from-purple-500/10 via-transparent to-transparent",
        pulseColor: "bg-purple-500",
      },
    };
    return glows[color as keyof typeof glows];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <NeuralBackground />
      
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' 
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-[200] isolate border-b border-white/5 bg-black/30 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Left: Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,170,0.3)]">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="font-mono text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  NeuroCode
                </span>
              </Link>
            </motion.div>

            {/* Center: Greeting */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hidden md:block"
            >
              <p className="text-lg text-muted-foreground">
                Welcome back, <span className="text-gradient-cyan font-semibold">{userName}</span>
              </p>
            </motion.div>

            {/* Right: User Profile Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-[100]"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-cyan-400/30 flex items-center justify-center border border-primary/40">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-48 rounded-xl border border-white/10 bg-popover/95 p-2 shadow-2xl backdrop-blur-xl z-[300]"
                >
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-white/5">
                    <Link to="#" className="flex w-full items-center gap-3 text-sm text-foreground">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-white/10" />

                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 focus:bg-red-500/10">
                    <Link to="/" className="flex w-full items-center gap-3 text-sm text-red-400">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Mobile Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden text-center mb-10"
          >
            <p className="text-xl text-muted-foreground">
              Welcome back, <span className="text-gradient-cyan font-semibold">{userName}</span>
            </p>
          </motion.div>

          {/* Action Cards Grid */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cards.map((card, index) => {
              const glow = getGlowStyles(card.glowColor);
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + index * 0.12, type: "spring", stiffness: 80, damping: 15 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" } 
                  }}
                  className={`
                    group relative p-8 rounded-3xl overflow-hidden
                    bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                    backdrop-blur-2xl
                    border border-white/[0.08]
                    transition-all duration-500
                    flex flex-col h-full
                    ${glow.borderHover}
                    ${glow.cardGlow}
                  `}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${glow.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Top shine line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Glass reflection */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.08] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Corner accent */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${glow.pulseColor} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500`} />

                  {/* Icon container with enhanced glow */}
                  <div className="relative mb-7">
                    {/* Icon glow ring */}
                    <div className={`absolute inset-0 w-18 h-18 rounded-2xl bg-gradient-to-br ${glow.iconBg} blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300`} />
                    
                    <div className={`
                      relative w-18 h-18 rounded-2xl
                      bg-gradient-to-br ${glow.iconBg}
                      flex items-center justify-center
                      ${glow.iconShadow}
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                    style={{ width: '72px', height: '72px' }}
                    >
                      {/* Inner glass effect */}
                      <div className="absolute inset-0.5 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
                      <card.icon className="w-9 h-9 text-white relative z-10 drop-shadow-lg" />
                    </div>
                  </div>

                  {/* Title with hover effect */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                    {card.title}
                    {card.comingSoon && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 font-mono uppercase tracking-wider backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      >
                        Coming Soon
                      </motion.span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Spacer */}
                  <div className="mt-8" />

                  {/* Enhanced Button - 👇 YAHAN HAI LOGIC 👇 */}
                  <button
                    disabled={card.comingSoon}
                    onClick={() => {
                        if (card.id === 1) {
                          navigate("/editor");
                        } else if (card.id === 2) {
                          navigate("/projects");
                        } else if (card.id === 3) {  // <-- Yeh naya logic hai
                          navigate("/neurochat");
                        }
                      }}
                    className={`
                      relative w-full py-4 px-6 rounded-xl font-semibold text-sm
                      transition-all duration-300 active:scale-[0.97]
                      overflow-hidden
                      ${card.buttonStyle === 'primary' 
                        ? 'bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 bg-[length:200%_100%] text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:bg-right' 
                        : card.buttonStyle === 'outline'
                        ? 'bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-400/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/60 hover:text-blue-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                        : 'bg-purple-500/10 text-purple-300 border border-purple-500/30 cursor-not-allowed'
                      }
                    `}
                  >
                    {/* Button shimmer effect */}
                    {card.buttonStyle === 'primary' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    )}
                    <span className="relative z-10">{card.buttonText}</span>
                  </button>

                  {/* Bottom border glow */}
                  <div className={`absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent ${card.glowColor === 'emerald' ? 'via-emerald-500/50' : card.glowColor === 'blue' ? 'via-blue-500/50' : 'via-purple-500/50'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              );
            })}
          </div>

          {/* Recent Activity Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-5xl"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              </div>
              
              <div className="space-y-2">
                {recentActivity.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FileCode className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last edited: {file.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;