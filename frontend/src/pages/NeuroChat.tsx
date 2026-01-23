import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Plus, 
  Wrench, 
  Send, 
  Bot, 
  User,
  Menu, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  ChevronRight,
  PenSquare,
  PanelLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NeuralBackground from "@/components/NeuralBackground";
import ReactMarkdown from 'react-markdown'; 

interface Message {
  id: number;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

const NeuroChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 1. INITIAL STATE EMPTY: No default messages
  const [messages, setMessages] = useState<Message[]>([]);

  const recentChats = [
    "Production-Level AI Coding Platform",
    "Neural Network Architecture",
    "Python Data Processing",
    "API Integration Guide",
    "Database Optimization"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // --- REAL AI LOGIC ---
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: userMessage.content, 
            code: "", 
            language: "python" 
        }),
      });

      const data = await response.json();

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: data.response || "Error: No response from brain.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: "⚠️ Connection Error: Is the backend running?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- REUSABLE INPUT COMPONENT (To use in both Center and Bottom) ---
  const ChatInputArea = () => (
    <div className="bg-white/5 backdrop-blur-xl px-4 py-4 rounded-3xl border border-white/10 w-full max-w-3xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <Plus className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress} 
            placeholder="Message NeuroChat..."
            autoFocus
            className="w-full h-11 bg-transparent border-none text-white placeholder:text-gray-500 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className={`flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-300 ${
            inputValue.trim()
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-white/10 text-gray-500 hover:bg-white/20"
          }`}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      <NeuralBackground />
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      {/* --- SIDEBAR --- */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-20 flex-shrink-0"
          >
             <div className="p-4 pt-6">
               <Button 
                 variant="ghost" 
                 className="w-full justify-between px-3 border border-white/10 hover:bg-white/5 text-white transition-all h-10 rounded-lg"
                 onClick={() => setMessages([])} 
               >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Bot className="w-3 h-3" />
                    </span>
                    New chat
                  </span>
                  <PenSquare className="w-4 h-4 text-gray-400" />
               </Button>
             </div>

             <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/5">
                <div className="px-2 text-[10px] font-medium text-gray-500 py-2">Recent</div>
                {recentChats.map((chat, i) => (
                   <Button 
                      key={i} 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-auto py-2 px-3 rounded-lg overflow-hidden text-gray-300 hover:text-white hover:bg-white/5 font-normal"
                   >
                      <span className="truncate text-sm">{chat}</span>
                   </Button>
                ))}
             </div>

             <div className="p-3 border-t border-white/10">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-3">
                   <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                       KV
                   </div>
                   <span className="text-sm font-medium">Krishna Varshney</span>
                </Button>
             </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full relative z-10 min-w-0">
        
        {/* Header (Minimal) */}
        <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-transparent">
          <div className="flex items-center gap-2">
            {!isSidebarOpen && (
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                <PanelLeft className="w-5 h-5" />
                </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="text-gray-400 font-medium text-sm flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
                NeuroChat <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </header>

        {/* --- CONDITIONAL RENDERING --- */}
        {messages.length === 0 ? (
          // --- STATE A: EMPTY (CENTERED) ---
          <div className="flex-1 flex flex-col items-center justify-center p-4 pb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl flex flex-col items-center gap-10"
            >
               {/* Logo */}
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                   <Bot className="w-8 h-8 text-white" />
               </div>
               
               {/* Heading */}
               <h2 className="text-2xl font-semibold text-white">Where should we begin?</h2>

               {/* Input Area (Centered) */}
               <div className="w-full">
                  <ChatInputArea />
               </div>

               {/* Optional Suggestions (Chips) */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                  {['Plan a trip', 'Design a DB', 'Debug Python', 'Write a poem'].map((text, i) => (
                      <button 
                        key={i}
                        onClick={() => setInputValue(text)}
                        className="p-3 text-left rounded-xl border border-white/5 hover:bg-white/5 transition-all text-xs text-gray-400 hover:text-gray-200"
                      >
                         {text}
                      </button>
                  ))}
               </div>
            </motion.div>
          </div>
        ) : (
          // --- STATE B: ACTIVE (BOTTOM INPUT) ---
          <>
            <div className="flex-1 overflow-y-auto px-4 lg:px-64 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-teal-400" />
                      </div>
                    )}

                    <div className={`max-w-[85%] ${message.type === "user" ? "bg-white/5 rounded-2xl px-5 py-3" : "pt-1"}`}>
                      {message.type === "user" ? (
                          <p className="text-white text-sm">{message.content}</p>
                      ) : (
                          <div className="text-gray-200 text-sm leading-7 prose prose-invert max-w-none">
                            <ReactMarkdown 
                                components={{
                                code({node, inline, className, children, ...props}: any) {
                                    return !inline ? (
                                    <div className="bg-black/50 p-3 rounded-md my-2 border border-white/10 overflow-x-auto">
                                        <code className={className} {...props}>{children}</code>
                                    </div>
                                    ) : (
                                    <code className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>
                                    )
                                }
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                          </div>
                      )}
                    </div>

                    {message.type === "user" && (
                       <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-purple-400" />
                       </div>
                    )}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="bg-transparent pt-2 flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Bottom) */}
            <div className="p-4 pb-6">
                <ChatInputArea />
                <p className="text-center text-[10px] text-gray-600 mt-2">
                    NeuroCode can make mistakes. Consider checking important information.
                </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NeuroChat;