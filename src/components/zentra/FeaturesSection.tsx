import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MonitorPlay, Heart, Shirt, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  delay: number;
  index: number;
}

function FeatureCard({
  title,
  description,
  icon,
  delay,
  index,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Alternate animation direction based on index
  const xInitial = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInitial, y: 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: xInitial, y: 30 }
      }
      transition={{ duration: 0.7, delay }}
      className="feature-card bg-[#161a2b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#8a7fff]/20 hover:border-[#4fc3f7]/50"
    >
      <div className="rounded-full bg-gradient-to-br from-[#4fc3f7]/20 to-[#8a7fff]/20 p-3 w-16 h-16 flex items-center justify-center mb-5 float-animation">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 gradient-text">
        {title}
      </h3>
      <p className="text-[#e0e6ff]/80 mb-5">{description}</p>
      <Button
        variant="ghost"
        size="sm"
        className="text-[#4fc3f7] hover:text-white hover:bg-[#4fc3f7]/20 -ml-2.5 zentra-button"
      >
        Try Now →
      </Button>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const features = [
    {
      title: "Entertainment",
      description:
        "Personalized content recommendations and interactive experiences powered by advanced AI algorithms that learn your preferences.",
      icon: <MonitorPlay className="h-8 w-8 text-[#4fc3f7]" />,
    },
    {
      title: "Healthcare",
      description:
        "Intelligent health monitoring and personalized wellness plans to optimize your physical wellbeing with real-time insights.",
      icon: <Heart className="h-8 w-8 text-[#8a7fff]" />,
    },
    {
      title: "Fashion",
      description:
        "AI-curated style recommendations and virtual try-ons to elevate your fashion choices with personalized insights.",
      icon: <Shirt className="h-8 w-8 text-[#4fc3f7]" />,
    },
    {
      title: "Finance",
      description:
        "Smart investment strategies and automated financial planning for a secure financial future built on predictive analytics.",
      icon: <BarChart4 className="h-8 w-8 text-[#8a7fff]" />,
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 bg-[#0f111a] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4fc3f7] rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8a7fff] rounded-full filter blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            AI-Powered <span className="text-[#4fc3f7]">Solutions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] mx-auto mb-6 rounded-full"></div>
          <p className="text-[#e0e6ff]/80 text-lg">
            Explore how Zentra's advanced AI technology can transform various
            aspects of your daily life with intelligent solutions tailored to
            your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.2 * index}
              index={index}
            />
          ))}
        </div>

        {/* Video or animation placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto rounded-xl overflow-hidden border border-[#8a7fff]/20 aspect-ratio"
        >
          <div className="aspect-ratio-content bg-gradient-to-br from-[#161a2b] to-[#1a1f35] flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] flex items-center justify-center mb-4 pulse-animation">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3L19 12L5 21V3Z" fill="white" />
                </svg>
              </div>
              <p className="text-[#e0e6ff]">Interactive Demo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
