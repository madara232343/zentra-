import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MonitorPlay, Heart, Shirt, BarChart4 } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  delay: number;
}

function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay }}
      className="bg-[#161a2b] p-6 rounded-xl border border-slate-800 hover:border-[#4fc3f7]/50 transition-colors"
    >
      <div className="rounded-full bg-gradient-to-br from-[#4fc3f7]/20 to-purple-500/20 p-3 w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      title: "Entertainment",
      description:
        "Personalized content recommendations and interactive experiences powered by advanced AI algorithms.",
      icon: <MonitorPlay className="h-8 w-8 text-[#4fc3f7]" />,
    },
    {
      title: "Healthcare",
      description:
        "Intelligent health monitoring and personalized wellness plans to optimize your physical wellbeing.",
      icon: <Heart className="h-8 w-8 text-[#4fc3f7]" />,
    },
    {
      title: "Fashion",
      description:
        "AI-curated style recommendations and virtual try-ons to elevate your fashion choices.",
      icon: <Shirt className="h-8 w-8 text-[#4fc3f7]" />,
    },
    {
      title: "Finance",
      description:
        "Smart investment strategies and automated financial planning for a secure financial future.",
      icon: <BarChart4 className="h-8 w-8 text-[#4fc3f7]" />,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0f111a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            AI-Powered <span className="text-[#4fc3f7]">Solutions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Explore how Zentra's advanced AI technology can transform various
            aspects of your daily life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.2 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
