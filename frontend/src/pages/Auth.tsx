import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Eye,Loader2, EyeOff, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NeuralBackground from "@/components/NeuralBackground";
import { toast } from "sonner";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (activeTab === "signup" && !formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    return true;
  };

  // Debug Version: इसे पेस्ट करें
// Final Clean Version: No Alerts, Only Toasts ✨
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Validation Check (Alert hata diya, Toast lagaya)
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const endpoint = activeTab === "signup" 
      ? "http://localhost:8000/api/auth/signup" 
      : "http://localhost:8000/api/auth/login";

    const payload = activeTab === "signup"
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Something went wrong");
    }

    // 2. Success Handling (Popup hata diya)
    if (activeTab === "signup") {
      toast.success("Account created successfully!", {
        description: "Please log in with your new account.",
      });
      setActiveTab("login");
      setFormData({ username: "", email: "", password: "" });
    } else {
      toast.success("Logged in successfully!", {
        description: "Welcome back to NeuroCode!",
      });
      navigate("/dashboard");
    }

  } catch (error: any) {
    console.error("Error:", error);
    // 3. Error Handling (Popup hata diya)
    toast.error("Login Failed", {
      description: error.message || "Could not connect to server.",
    });
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Neural Network Background */}
      <NeuralBackground />

      {/* Gradient Orbs */}
      <div className="orb-cyan w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2" />
      <div className="orb-purple w-[500px] h-[500px] bottom-20 -right-40" />
      <div className="orb-pink w-[400px] h-[400px] bottom-40 -left-20" />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="relative glass-strong rounded-2xl p-8 border-gradient">
            {/* Inner glow highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {activeTab === "login" ? "Welcome Back" : "Get Started"}
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                {activeTab === "login" 
                  ? "Sign in to continue coding with AI" 
                  : "Create your account and start building"}
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="relative flex bg-muted/30 rounded-xl p-1 mb-8">
              <motion.div
                layoutId="activeTab"
                className="absolute inset-y-1 rounded-lg bg-primary/20 border border-primary/30"
                style={{
                  left: activeTab === "login" ? "4px" : "50%",
                  width: "calc(50% - 4px)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                onClick={() => setActiveTab("login")}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeTab === "login" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  activeTab === "signup" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {activeTab === "signup" && (
                  <motion.div
                    key="username"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="pl-10 bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--cyan)/0.15)] transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--cyan)/0.15)] transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 focus:shadow-[0_0_20px_hsl(var(--cyan)/0.15)] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {activeTab === "login" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-right"
                >
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Forgot Password?
                  </button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="glow"
                  className="w-full py-6 text-base font-semibold relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {activeTab === "login" ? "Log In" : "Create Account"}
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 bg-card/80 text-muted-foreground">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="text-[#4285F4]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="text-[#34A853]"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="text-[#FBBC05]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="text-[#EA4335]"
                  />
                </svg>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">GitHub</span>
              </motion.button>
            </div>

            {/* Bottom text */}
            <p className="text-center text-xs text-muted-foreground mt-8">
              By continuing, you agree to our{" "}
              <button className="text-primary hover:underline">Terms of Service</button>
              {" "}and{" "}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
