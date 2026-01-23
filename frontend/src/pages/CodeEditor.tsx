import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Save, 
  Trash2, 
  Settings, 
  FileCode, 
  FolderOpen, 
  ChevronRight,
  Send,
  Bot,
  Terminal,
  Sparkles,
  ArrowLeft,
  Loader2,
  MoreVertical,
  Plus,
  X,
  PanelLeftClose,
  PanelRightClose,
  PanelLeft,
  PanelRight
} from "lucide-react";
import { Link } from "react-router-dom";
import NeuralBackground from "@/components/NeuralBackground";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown'; // ✅ Import Sahi hai

const CodeEditor = () => {
  const [code, setCode] = useState(`# Welcome to NeuroCode IDE
# Start coding in Python!

def greet(name):
    """A simple greeting function"""
    return f"Hello, {name}! Welcome to NeuroCode."

def calculate_fibonacci(n):
    """Calculate fibonacci sequence"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Main execution
if __name__ == "__main__":
    print(greet("Developer"))
    
    # Calculate first 10 fibonacci numbers
    for i in range(10):
        print(f"Fib({i}) = {calculate_fibonacci(i)}")`);

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  
  // --- VISIBILITY STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(true);

  // --- RESIZE STATE ---
  const [terminalHeight, setTerminalHeight] = useState(256); 
  const [isDragging, setIsDragging] = useState(false);
  
  const [aiMessages, setAiMessages] = useState<{role: "user" | "assistant", content: string}[]>([
    { role: "assistant", content: "Hello! I'm your AI coding assistant. Ask me anything about your Python code!" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [activeFile, setActiveFile] = useState("main.py");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const files = [
    { name: "main.py", icon: FileCode },
    { name: "utils.py", icon: FileCode },
    { name: "config.py", icon: FileCode },
  ];

  // --- RESIZE LOGIC ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newHeight = window.innerHeight - e.clientY;
      const maxHeight = window.innerHeight - 64 - 150; 
      
      if (newHeight > 40 && newHeight < maxHeight) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto'; 
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none'; 
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- RUN CODE FUNCTION ---
  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Initializing Neural Execution Environment..."); 

    try {
      const response = await fetch("http://localhost:8000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, language: "python" }),
      });

      const data = await response.json();

      if (data.error) {
        setOutput(`Error:\n${data.error}`);
        toast.error("Execution Failed");
      } else {
        setOutput(data.output || "Program executed successfully (No output).");
        toast.success("Code Ran Successfully!");
      }

    } catch (error) {
      console.error("Execution error:", error);
      setOutput("Error: Could not connect to the Backend server.\nIs it running on port 8000?");
      toast.error("Connection Failed");
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    toast.info("Editor Cleared");
  };

  const handleSave = () => {
    toast.success("File Saved Successfully");
  };

  // --- AI FUNCTION ---
  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    
    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setAiInput("");

    setAiMessages(prev => [...prev, { role: "assistant", content: "Analyzing neural pathways..." }]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: userMsg, 
            code: code, 
            language: "python" 
        }),
      });

      const data = await response.json();

      setAiMessages(prev => {
        const newHistory = [...prev];
        newHistory.pop(); 
        return [...newHistory, { role: "assistant", content: data.response }];
      });

    } catch (error) {
      console.error("AI Error:", error);
      setAiMessages(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return [...newHistory, { role: "assistant", content: "Error: Could not connect to AI Brain." }];
      });
    }
  };

  const getLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, i) => i + 1);
  };

  return (
    <div className="h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col font-sans">
      <NeuralBackground />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      {/* --- HEADER --- */}
      <header className="relative z-20 h-16 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-6">
           {!isSidebarOpen && (
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
               title="Show Sidebar"
             >
               <PanelLeft className="w-5 h-5" />
             </button>
           )}

           <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
           </Link>
           
           <div className="h-6 w-px bg-white/10" />
           
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                 <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                NeuroCode <span className="font-light">IDE</span>
              </span>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              disabled={isRunning}
              className={`
                group relative px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2
                ${isRunning ? 'bg-cyan-900/50 text-cyan-400 cursor-not-allowed' : 'bg-[#00D4AA] text-black shadow-[0_0_20px_rgba(0,212,170,0.4)] hover:shadow-[0_0_30px_rgba(0,212,170,0.6)]'}
                transition-all duration-300
              `}
           >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
           </motion.button>

           <button onClick={handleSave} className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white text-sm font-medium transition-all flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save</span>
           </button>
           <button onClick={handleClear} className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 text-sm font-medium transition-all flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
           </button>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-gray-300">{activeFile}</span>
           </div>

           {!isAiOpen && (
             <button 
               onClick={() => setIsAiOpen(true)}
               className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors ml-2"
               title="Show AI Assistant"
             >
               <PanelRight className="w-5 h-5" />
             </button>
           )}
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* 1. SIDEBAR */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.aside
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: 256, opacity: 1 }}
               exit={{ width: 0, opacity: 0 }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden flex-shrink-0"
            >
               <div className="p-4 w-64">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                       <FolderOpen className="w-4 h-4" />
                       <span>my-project</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                      <PanelLeftClose className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                     <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 px-2">Files</div>
                     {files.map(file => (
                        <button key={file.name} onClick={() => setActiveFile(file.name)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${activeFile === file.name ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"}`}>
                           <file.icon className="w-4 h-4" />
                           <span>{file.name}</span>
                        </button>
                     ))}
                     <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all mt-4">
                        <Plus className="w-4 h-4" />
                        <span>New File</span>
                     </button>
                  </div>
               </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* 2. CENTER COLUMN */}
        <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 flex flex-col relative min-w-0 min-h-[150px] bg-[#0c0c0e]">
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-[#0a0a0a] flex-shrink-0">
                    <span className="text-gray-500">my-project</span>
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span className="text-gray-200">{activeFile}</span>
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <div className="w-12 py-4 text-right pr-3 text-gray-600 font-mono text-sm select-none bg-[#0a0a0a] border-r border-white/5">
                        {getLineNumbers().map(n => <div key={n} className="leading-6">{n}</div>)}
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-transparent p-4 text-gray-200 font-mono text-sm leading-6 resize-none outline-none selection:bg-cyan-500/30"
                        spellCheck={false}
                    />
                </div>
            </main>

            <div 
              className="h-1 w-full bg-white/5 hover:bg-cyan-500/50 cursor-row-resize transition-colors z-20 flex-shrink-0"
              onMouseDown={() => setIsDragging(true)}
            />

            <div 
              style={{ height: terminalHeight }} 
              className="bg-[#0a0a0a] border-t border-white/10 flex flex-col flex-shrink-0"
            >
                <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/5 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-gray-300">Terminal / Output</span>
                    </div>
                    <button onClick={() => setOutput("")} className="text-xs text-gray-500 hover:text-white transition-colors">
                        Clear Console
                    </button>
                </div>
                <div className="flex-1 p-4 overflow-auto font-mono text-xs">
                    {output ? (
                         <pre className={`whitespace-pre-wrap ${output.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}>
                            {output}
                         </pre>
                    ) : (
                        <div className="text-gray-600 italic">
                            {isRunning ? "Running code..." : "Ready to execute. Click 'Run Code' to start."}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* 3. RIGHT PANEL (AI CHAT - NOW WITH MARKDOWN ✅) */}
        <AnimatePresence initial={false}>
          {isAiOpen && (
            <motion.aside
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: 384, opacity: 1 }}
               exit={{ width: 0, opacity: 0 }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="flex flex-col border-l border-white/5 bg-black/10 backdrop-blur-sm overflow-hidden flex-shrink-0"
            >
               <div className="w-96 flex flex-col h-full">
                 <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-black/20 flex-shrink-0">
                     <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-100">AI Assistant</span>
                     </div>
                     <button onClick={() => setIsAiOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                       <PanelRightClose className="w-4 h-4" />
                     </button>
                 </div>
                 
                 <div className="flex-1 flex flex-col overflow-hidden p-4 relative">
                      <div className="flex-1 overflow-auto space-y-4 mb-4 scrollbar-hide">
                         {aiMessages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-white'}`}>
                                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <span className="text-xs font-bold">U</span>}
                               </div>
                               <div className={`p-3 rounded-xl text-sm max-w-[80%] overflow-hidden ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-purple-500/10 text-purple-200 border border-purple-500/20'}`}>
                                  
                                  {/* 👇 MARKDOWN RENDERER ADDED HERE 👇 */}
                                  <ReactMarkdown 
                                      components={{
                                        code({node, inline, className, children, ...props}: any) {
                                          return !inline ? (
                                            <div className="bg-black/50 p-2 rounded-md my-2 border border-white/10 overflow-x-auto">
                                              <code className={className} {...props}>{children}</code>
                                            </div>
                                          ) : (
                                            <code className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>
                                          )
                                        }
                                      }}
                                  >
                                      {msg.content}
                                  </ReactMarkdown>

                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="relative mt-auto flex-shrink-0">
                         <input 
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                            placeholder="Ask about your code..."
                            className="w-full bg-black/30 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors text-white"
                         />
                         <button onClick={handleAiSend} className="absolute right-2 top-2 p-1.5 rounded-md text-purple-400 hover:bg-purple-500/20 transition-colors">
                            <Send className="w-4 h-4" />
                         </button>
                      </div>
                 </div>
               </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CodeEditor;