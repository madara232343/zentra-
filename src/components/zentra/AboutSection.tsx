import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Cpu, CircuitBoard } from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Circuit pattern animation
  const circuitVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 0.2,
      pathLength: 1,
      transition: {
        pathLength: {
          delay: i * 0.1,
          type: "spring",
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: i * 0.1, duration: 0.3 },
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "#111428" }}
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,500 C200,300 800,200 1000,500 C800,800 200,700 0,500 Z"
            stroke="#4fc3f7"
            strokeWidth="2"
            fill="none"
            custom={0}
            variants={circuitVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.path
            d="M0,300 C300,100 700,300 1000,200"
            stroke="#9c27b0"
            strokeWidth="2"
            fill="none"
            custom={1}
            variants={circuitVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.path
            d="M0,700 C300,900 700,600 1000,800"
            stroke="#4fc3f7"
            strokeWidth="2"
            fill="none"
            custom={2}
            variants={circuitVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.path
            d="M300,0 C200,300 400,700 300,1000"
            stroke="#9c27b0"
            strokeWidth="2"
            fill="none"
            custom={3}
            variants={circuitVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <motion.path
            d="M700,0 C800,300 600,700 700,1000"
            stroke="#4fc3f7"
            strokeWidth="2"
            fill="none"
            custom={4}
            variants={circuitVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About Zentra
            </h2>
            <p className="text-slate-300 mb-6 text-lg">
              Zentra is developed by a sole passionate developer, Crimson,
              aiming to revolutionize daily life with AI. Our mission is to make
              cutting-edge artificial intelligence accessible and practical for
              everyone.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Cpu className="h-6 w-6 text-[#4fc3f7] mt-1" />
                <div>
                  <h3 className="text-white font-medium">
                    Innovative AI Solutions
                  </h3>
                  <p className="text-slate-400">
                    Building next-generation algorithms for real-world problems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Code className="h-6 w-6 text-[#4fc3f7] mt-1" />
                <div>
                  <h3 className="text-white font-medium">
                    Developer-First Approach
                  </h3>
                  <p className="text-slate-400">
                    Created with passion by developers, for everyone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CircuitBoard className="h-6 w-6 text-[#4fc3f7] mt-1" />
                <div>
                  <h3 className="text-white font-medium">Tech-Driven Future</h3>
                  <p className="text-slate-400">
                    Pioneering the integration of AI into everyday life.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[#0f111a] to-[#1a1f35] p-8 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4fc3f7] to-purple-500 animate-pulse blur-xl opacity-30"></div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-[#4fc3f7] to-purple-500 animate-pulse blur-md opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                    C
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#4fc3f7] to-purple-500 rounded-full blur-xl opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
