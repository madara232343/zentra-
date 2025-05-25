import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Shirt,
  Heart,
  BarChart4,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface AIInsight {
  id: string;
  type: "fashion" | "health" | "finance" | "entertainment";
  title: string;
  content: string;
  isNew: boolean;
}

interface AIInsightsPanelProps {
  expanded?: boolean;
}

export function AIInsightsPanel({ expanded = false }: AIInsightsPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [insights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "fashion",
      title: "Style Recommendation",
      content:
        "Based on your recent preferences, minimalist outfits with neutral colors would complement your wardrobe this season.",
      isNew: true,
    },
    {
      id: "2",
      type: "health",
      title: "Wellness Tip",
      content:
        "Your sleep patterns suggest increasing evening activity. Consider a 20-minute walk after dinner to improve sleep quality.",
      isNew: true,
    },
    {
      id: "3",
      type: "finance",
      title: "Budget Insight",
      content:
        "Your spending in entertainment has increased 15% this month. Consider setting a monthly entertainment budget.",
      isNew: false,
    },
    {
      id: "4",
      type: "entertainment",
      title: "Content Suggestion",
      content:
        "Based on your viewing history, you might enjoy 'The Future Interface', a new documentary about AI and human interaction.",
      isNew: false,
    },
  ]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= insights.length ? 0 : prevIndex + 1,
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? insights.length - 1 : prevIndex - 1,
    );
  };

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "fashion":
        return <Shirt className="h-5 w-5 text-pink-400" />;
      case "health":
        return <Heart className="h-5 w-5 text-green-400" />;
      case "finance":
        return <BarChart4 className="h-5 w-5 text-blue-400" />;
      case "entertainment":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        );
    }
  };

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "fashion":
        return "from-pink-500/20 to-pink-500/5";
      case "health":
        return "from-green-500/20 to-green-500/5";
      case "finance":
        return "from-blue-500/20 to-blue-500/5";
      case "entertainment":
        return "from-purple-500/20 to-purple-500/5";
    }
  };

  return (
    <div className={expanded ? "p-2" : ""}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
        <div className="flex gap-1">
          <button
            onClick={goToPrev}
            className="p-1 rounded-full hover:bg-[#161a2b] text-[#e0e6ff]/70 hover:text-[#e0e6ff] transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="p-1 rounded-full hover:bg-[#161a2b] text-[#e0e6ff]/70 hover:text-[#e0e6ff] transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-gradient-to-br ${getInsightColor(insights[currentIndex].type)} p-4 rounded-xl`}
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#161a2b] rounded-full p-2 mt-1">
                {getInsightIcon(insights[currentIndex].type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium">
                    {insights[currentIndex].title}
                  </h3>
                  {insights[currentIndex].isNew && (
                    <div className="relative">
                      <span className="text-xs bg-[#4fc3f7] text-white px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                      <motion.span
                        className="absolute inset-0 rounded-full bg-[#4fc3f7]"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      ></motion.span>
                    </div>
                  )}
                </div>
                <p className="text-[#e0e6ff]/80 text-sm mb-4">
                  {insights[currentIndex].content}
                </p>

                <div className="flex gap-3">
                  <button className="flex items-center gap-1 text-xs text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Useful
                  </button>
                  <button className="flex items-center gap-1 text-xs text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors">
                    <ThumbsDown className="h-3.5 w-3.5" />
                    Not useful
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-1.5 mt-4">
        {insights.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index
                ? "w-6 bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                : "w-1.5 bg-[#161a2b]"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* Additional insights when expanded */}
      {expanded && (
        <div className="mt-8 space-y-4">
          <h3 className="text-white font-medium">All Insights</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br ${getInsightColor(insight.type)} p-4 rounded-xl`}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#161a2b] rounded-full p-2 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">
                        {insight.title}
                      </h4>
                      {insight.isNew && (
                        <span className="text-xs bg-[#4fc3f7] text-white px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-[#e0e6ff]/80 text-sm">
                      {insight.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#161a2b] rounded-xl p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#4fc3f7]" />
              Insight Preferences
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">Fashion insights</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-fashion"
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label
                    htmlFor="toggle-fashion"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#4fc3f7] w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-5"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">Health insights</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-health"
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label
                    htmlFor="toggle-health"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#4fc3f7] w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-5"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">Finance insights</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-finance"
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label
                    htmlFor="toggle-finance"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#4fc3f7] w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-5"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">
                  Entertainment insights
                </span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-entertainment"
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label
                    htmlFor="toggle-entertainment"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#4fc3f7] w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-5"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
