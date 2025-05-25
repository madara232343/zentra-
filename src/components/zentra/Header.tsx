import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Layers, DollarSign, Info, Mail } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: "Home", icon: <Home className="h-4 w-4" /> },
    { name: "Features", icon: <Layers className="h-4 w-4" /> },
    { name: "Pricing", icon: <DollarSign className="h-4 w-4" /> },
    { name: "About", icon: <Info className="h-4 w-4" /> },
    { name: "Contact", icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-800 transition-all duration-300 ${
        scrolled
          ? "navbar navbar-scrolled"
          : "navbar bg-[#0f111a]/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <img src="/zentra-logo.svg" alt="Zentra Logo" className="h-10 w-10" />
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] glow-text">
            Zentra
          </span>
        </motion.div>

        {/* Desktop navigation links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center space-x-8"
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className="nav-link text-[#e0e6ff] hover:text-[#4fc3f7] transition-colors flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {item.icon}
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-[#e0e6ff]"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop action buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <Button
            variant="ghost"
            className="text-[#e0e6ff] hover:text-white hover:bg-[#161a2b] zentra-button"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white zentra-button"
            onClick={() => setSignupOpen(true)}
          >
            Sign Up
          </Button>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-[#0f111a]/95 backdrop-blur-md border-b border-slate-800 md:hidden"
            >
              <motion.div className="flex flex-col p-4 gap-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={`#${item.name.toLowerCase()}`}
                    className="flex items-center gap-2 py-2 px-3 text-[#e0e6ff] hover:text-[#4fc3f7] hover:bg-[#161a2b]/50 rounded transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </motion.a>
                ))}
                <div className="border-t border-slate-800 my-2"></div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[#e0e6ff] hover:text-white hover:bg-[#161a2b]/50"
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="w-full justify-start bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white"
                  onClick={() => {
                    setSignupOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </header>
  );
}
