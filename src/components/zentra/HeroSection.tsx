import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "./ParticlesBackground";
import { SignupModal } from "./SignupModal";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typeSpeed = useRef(150);
  const words = ["Entertainment", "Healthcare", "Fashion", "Finance"];

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const type = () => {
      if (isDeleting) {
        // Deleting text
        setTypedText(currentWord.substring(0, typedText.length - 1));
        typeSpeed.current = 50;

        if (typedText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
          typeSpeed.current = 200; // Pause before typing next word
        }
      } else {
        // Typing text
        setTypedText(currentWord.substring(0, typedText.length + 1));

        if (typedText.length === currentWord.length) {
          // Pause at end of word
          typeSpeed.current = 2000;
          setIsDeleting(true);
        } else {
          typeSpeed.current = 150;
        }
      }
    };

    const timer = setTimeout(type, typeSpeed.current);
    return () => clearTimeout(timer);
  }, [typedText, currentWordIndex, isDeleting, words]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0f111a]"
    >
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-20 mt-16 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Zentra –{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]">
              AI for{" "}
              <span className="relative">
                {typedText}
                <span className="typed-cursor">|</span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#e0e6ff] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-driven solutions revolutionizing multiple industries with
            cutting-edge technology. Experience the future of intelligent
            automation today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-full text-lg zentra-button"
              onClick={() => setSignupOpen(true)}
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-[#8a7fff] text-[#e0e6ff] hover:bg-[#161a2b] hover:text-white rounded-full px-8 py-6 text-lg zentra-button bg-[#8585ff]"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </section>
  );
}
