import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Stop pulsing animation after a few pulses
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 bg-[#161a2b] rounded-lg shadow-lg border border-slate-800 overflow-hidden mb-2"
          >
            <div className="bg-gradient-to-r from-[#4fc3f7] to-purple-500 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">How can we help?</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <p className="text-slate-300 mb-3 text-sm">
                Have questions about Zentra? Our team is ready to assist you!
              </p>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start a conversation
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Visit help center
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-[#4fc3f7] to-purple-500 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <HelpCircle className="h-6 w-6 text-white" />
          )}
        </Button>

        {isPulsing && !isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#4fc3f7]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
