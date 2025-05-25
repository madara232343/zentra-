import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f111a]/80 backdrop-blur-sm border-b border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <img src="/zentra-logo.svg" alt="Zentra Logo" className="h-10 w-10" />
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3f7] to-purple-500">
            Zentra
          </span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-slate-200 hover:text-white hover:bg-slate-800"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-[#4fc3f7] to-purple-500 hover:opacity-90 transition-opacity"
            onClick={() => setSignupOpen(true)}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0f111a] border-b border-slate-800 md:hidden">
            <div className="flex flex-col p-4 gap-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-200 hover:text-white hover:bg-slate-800"
                onClick={() => {
                  setLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                variant="default"
                className="w-full justify-start bg-gradient-to-r from-[#4fc3f7] to-purple-500 hover:opacity-90 transition-opacity"
                onClick={() => {
                  setSignupOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </header>
  );
}
