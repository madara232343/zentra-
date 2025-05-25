import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { MonitorPlay, Heart, Shirt, BarChart4 } from "lucide-react";

interface SectorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  angle: number;
  isSelected: boolean;
  onClick: () => void;
}

const Sector = ({
  icon,
  title,
  description,
  color,
  angle,
  isSelected,
  onClick,
}: SectorProps) => {
  const controls = useAnimation();
  const descriptionControls = useAnimation();

  useEffect(() => {
    if (isSelected) {
      controls.start({
        scale: 1.1,
        opacity: 1,
        transition: { duration: 0.3 },
      });
      descriptionControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay: 0.1 },
      });
    } else {
      controls.start({
        scale: 1,
        opacity: 0.7,
        transition: { duration: 0.3 },
      });
      descriptionControls.start({
        opacity: 0,
        y: 10,
        transition: { duration: 0.2 },
      });
    }
  }, [isSelected, controls, descriptionControls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        transformOrigin: "center",
        rotate: `${angle}deg`,
        translateX: isSelected
          ? 0
          : `${Math.cos((angle * Math.PI) / 180) * 120}px`,
        translateY: isSelected
          ? 0
          : `${Math.sin((angle * Math.PI) / 180) * 120}px`,
      }}
      onClick={onClick}
      whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
    >
      <div
        className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
          isSelected
            ? `border-2 bg-${color}/10 border-${color}/40 shadow-lg shadow-${color}/20`
            : `border bg-[#161a2b]/40 border-[#8a7fff]/20`
        }`}
        style={{
          width: isSelected ? "240px" : "80px",
          height: isSelected ? "240px" : "80px",
          rotate: `${-angle}deg`, // Counter-rotate to keep icon upright
        }}
      >
        <div
          className={`rounded-full p-3 ${
            isSelected ? `bg-${color}/20` : "bg-[#161a2b]"
          }`}
        >
          {icon}
        </div>
        <h3
          className={`mt-2 font-semibold text-white ${isSelected ? "text-lg" : "text-xs"}`}
        >
          {title}
        </h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={descriptionControls}
          className="mt-3 text-[#e0e6ff]/80 text-center"
        >
          {isSelected && description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export function SectorWheel() {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

  const sectors = [
    {
      icon: <MonitorPlay className="h-8 w-8 text-purple-500" />,
      title: "Entertainment",
      description:
        "Personalized content recommendations and interactive experiences powered by advanced AI algorithms.",
      color: "purple-500",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-500" />,
      title: "Healthcare",
      description:
        "Intelligent health monitoring and personalized wellness plans to optimize your physical wellbeing.",
      color: "green-500",
    },
    {
      icon: <Shirt className="h-8 w-8 text-pink-500" />,
      title: "Fashion",
      description:
        "AI-curated style recommendations and virtual try-ons to elevate your fashion choices.",
      color: "pink-500",
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-blue-500" />,
      title: "Finance",
      description:
        "Smart investment strategies and automated financial planning for a secure financial future.",
      color: "blue-500",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || selectedSector !== null) return;

    isDragging.current = true;
    startX.current = e.clientX;
    currentRotation.current = rotation;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    const newRotation = currentRotation.current + deltaX * 0.5;
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleSectorClick = (index: number) => {
    if (selectedSector === index) {
      setSelectedSector(null);
    } else {
      setSelectedSector(index);
      // Rotate wheel to center the selected sector
      const angle = (360 / sectors.length) * index;
      setRotation(-angle);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white text-center">
        Explore <span className="text-[#4fc3f7]">AI-Powered</span> Sectors
      </h2>

      <div
        ref={containerRef}
        className="relative h-[400px] w-[400px] cursor-grab active:cursor-grabbing mx-auto"
        onMouseDown={handleMouseDown}
        style={{ perspective: "1000px" }}
      >
        {/* Circular guide */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border border-[#8a7fff]/10 pointer-events-none"></div>

        {/* Center orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#8a7fff] z-10 flex items-center justify-center shadow-lg shadow-[#4fc3f7]/20"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 10px rgba(79, 195, 247, 0.3)",
              "0 0 20px rgba(79, 195, 247, 0.4)",
              "0 0 10px rgba(79, 195, 247, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="text-2xl font-bold text-white"
            animate={{
              rotate: 360,
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Z
          </motion.div>
        </motion.div>

        {/* Sectors */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {sectors.map((sector, index) => {
            const angle = (360 / sectors.length) * index;
            return (
              <Sector
                key={index}
                icon={sector.icon}
                title={sector.title}
                description={sector.description}
                color={sector.color}
                angle={angle}
                isSelected={selectedSector === index}
                onClick={() => handleSectorClick(index)}
              />
            );
          })}
        </motion.div>

        {/* Instructions */}
        {selectedSector === null && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[#e0e6ff]/60 text-sm text-center w-full">
            <p>Drag to rotate or click on a sector to explore</p>
          </div>
        )}
      </div>

      {/* Mobile version - simpler view for small screens */}
      <div className="md:hidden mt-8">
        <div className="grid grid-cols-2 gap-4">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedSector === index
                  ? `bg-[#161a2b]/60 border-[#4fc3f7]/40`
                  : `bg-[#161a2b]/40 border-[#8a7fff]/20`
              }`}
              onClick={() => handleSectorClick(index)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`rounded-full p-3 ${
                    selectedSector === index
                      ? `bg-${sector.color}/20`
                      : "bg-[#161a2b]"
                  }`}
                >
                  {sector.icon}
                </div>
                <h3 className="mt-2 font-semibold text-white">
                  {sector.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedSector !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 p-4 rounded-xl bg-[#161a2b]/40 border border-[#8a7fff]/20"
            >
              <p className="text-[#e0e6ff]/80">
                {sectors[selectedSector].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
