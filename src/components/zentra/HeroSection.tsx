import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "./ParticlesBackground";
import { SignupModal } from "./SignupModal";

export function HeroSection() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0f111a]">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-20 mt-16 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Zentra –{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3f7] to-purple-500">
              AI Powering Smarter Living
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-driven solutions for entertainment, healthcare, fashion, and
            finance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#4fc3f7] to-purple-500 hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-full text-lg"
              onClick={() => setSignupOpen(true)}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />

      <style jsx global>{`
        .glow-text {
          text-shadow:
            0 0 20px rgba(79, 195, 247, 0.3),
            0 0 40px rgba(156, 39, 176, 0.2);
        }
      `}</style>
    </section>
  );
}
