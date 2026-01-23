import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Search,
  Plus,
  FileCode,
  MoreVertical,
  Grid3X3,
  List,
  Trash2,
  Pencil,
  FolderOpen,
  Ghost,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NeuralBackground from "@/components/NeuralBackground";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string;
  codePreview: string;
  language: string;
  size: string;
  editedAt: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");

  // Sample projects data
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "neural_network.py",
      description: "Deep learning model for image classification",
      codePreview: "import tensorflow as tf\nmodel = tf.keras.Sequential()",
      language: "Python",
      size: "4.2kb",
      editedAt: "2 hours ago",
    },
    {
      id: "2",
      name: "data_processor.py",
      description: "ETL pipeline for data transformation",
      codePreview: "import pandas as pd\ndf = pd.read_csv('data.csv')",
      language: "Python",
      size: "2.8kb",
      editedAt: "5 hours ago",
    },
    {
      id: "3",
      name: "api_handler.py",
      description: "REST API endpoints with FastAPI",
      codePreview: "from fastapi import FastAPI\napp = FastAPI()",
      language: "Python",
      size: "3.1kb",
      editedAt: "1 day ago",
    },
    {
      id: "4",
      name: "main.py",
      description: "Application entry point",
      codePreview: "def main():\n    print('Hello NeuroCode')",
      language: "Python",
      size: "1.2kb",
      editedAt: "2 days ago",
    },
    {
      id: "5",
      name: "utils.py",
      description: "Utility functions and helpers",
      codePreview: "def format_data(data):\n    return json.dumps(data)",
      language: "Python",
      size: "0.8kb",
      editedAt: "3 days ago",
    },
    {
      id: "6",
      name: "test_suite.py",
      description: "Unit tests for core modules",
      codePreview: "import pytest\ndef test_main():\n    assert True",
      language: "Python",
      size: "2.1kb",
      editedAt: "1 week ago",
    },
  ]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") {
        const sizeA = parseFloat(a.size);
        const sizeB = parseFloat(b.size);
        return sizeB - sizeA;
      }
      // Default: date (newest first based on editedAt string)
      return 0;
    });

    return result;
  }, [projects, searchQuery, sortBy]);

  const handleProjectClick = (projectId: string) => {
    navigate("/editor");
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <NeuralBackground />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-[200] border-b border-white/5 bg-black/40 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Left: Back button + Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link
                to="/dashboard"
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(0,212,170,0.4)]">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground font-mono">
                  My Project Library
                </h1>
              </div>
            </motion.div>

            {/* Right: Profile Icon */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-cyan-400/30 flex items-center justify-center border border-primary/40 hover:border-primary/60 transition-colors cursor-pointer">
                <User className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-2xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-lg opacity-0 focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Controls Right */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all font-mono">
                      Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 rounded-xl border border-white/10 bg-popover/95 p-1.5 backdrop-blur-xl z-[300]"
                  >
                    <DropdownMenuItem
                      onClick={() => setSortBy("date")}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                        sortBy === "date" ? "text-cyan-400 bg-cyan-500/10" : ""
                      }`}
                    >
                      Date
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("name")}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                        sortBy === "name" ? "text-cyan-400 bg-cyan-500/10" : ""
                      }`}
                    >
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("size")}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                        sortBy === "size" ? "text-cyan-400 bg-cyan-500/10" : ""
                      }`}
                    >
                      Size
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Toggle */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* New Project Button */}
                <button
                  onClick={() => navigate("/editor")}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-[length:200%_100%] text-white font-semibold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:bg-right transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  <Plus className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">New Project</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                /* Empty State */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Ghost className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {searchQuery
                      ? "Try a different search term"
                      : "Create your first project to get started"}
                  </p>
                  <button
                    onClick={() => navigate("/editor")}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Create your first project
                  </button>
                </motion.div>
              ) : viewMode === "grid" ? (
                /* Grid View */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleProjectClick(project.id)}
                      className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/50 cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,170,0.15)] hover:-translate-y-1"
                    >
                      {/* Top shine line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Icon */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <FileCode className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300" />
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="font-mono font-bold text-foreground text-sm mb-1.5 truncate group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Code Preview */}
                      <div className="bg-black/40 rounded-lg p-2.5 mb-4 border border-white/5">
                        <pre className="text-[10px] text-emerald-400/70 font-mono line-clamp-2 overflow-hidden">
                          {project.codePreview}
                        </pre>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                          {project.language}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground text-[10px] font-mono">
                          {project.size}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground text-[10px] font-mono">
                          {project.editedAt}
                        </span>
                      </div>

                      {/* Actions Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-36 rounded-xl border border-white/10 bg-popover/95 p-1.5 backdrop-blur-xl z-[300]"
                        >
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-400 flex items-center gap-2 focus:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* List View */
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleProjectClick(project.id)}
                      className="group relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/50 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.1)]"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileCode className="w-6 h-6 text-cyan-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono font-bold text-foreground text-sm mb-0.5 truncate group-hover:text-cyan-300 transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-muted-foreground text-xs truncate">
                          {project.description}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="hidden md:flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                          {project.language}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground text-[10px] font-mono">
                          {project.size}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground text-[10px] font-mono">
                          {project.editedAt}
                        </span>
                      </div>

                      {/* Actions Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-36 rounded-xl border border-white/10 bg-popover/95 p-1.5 backdrop-blur-xl z-[300]"
                        >
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-400 flex items-center gap-2 focus:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
