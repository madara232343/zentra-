import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  angle: number;
  angleSpeed: number;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight * 0.9; // 90vh for hero section

        canvas.width = width;
        canvas.height = height;

        setDimensions({ width, height });

        // Regenerate particles when resizing
        generateParticles();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        mouseMoved.current = true;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const generateParticles = () => {
    if (!canvasRef.current) return;

    const newParticles: Particle[] = [];
    const { width, height } = canvasRef.current;
    const particleCount = Math.min(Math.max(width, height) / 10, 120);

    const colors = ["#4fc3f7", "#8a7fff", "#a855f7"];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    particles.current = newParticles;
  };

  useEffect(() => {
    if (dimensions.width === 0 || !canvasRef.current) return;

    generateParticles();

    const animate = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Clear canvas with slight opacity to create trail effect
      ctx.fillStyle = "rgba(15, 17, 26, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.current.forEach((particle, index) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();

        // Draw glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3,
        );
        gradient.addColorStop(0, `${particle.color}30`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with lines
        for (let j = index + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `${particle.color}${Math.floor(
              (1 - distance / 100) * 30,
            )
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Move particles with slight influence from mouse
        if (mouseMoved.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / 200) * 0.2;

            particle.x += Math.cos(angle) * force;
            particle.y += Math.sin(angle) * force;
          }
        }

        // Update particle position
        particle.angle += particle.angleSpeed;
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y +=
          Math.sin(particle.angle) * particle.speed - particle.speed * 0.5;

        // Reset particles that go off screen
        if (
          particle.x < -particle.size * 5 ||
          particle.x > canvas.width + particle.size * 5 ||
          particle.y < -particle.size * 5 ||
          particle.y > canvas.height + particle.size * 5
        ) {
          if (Math.random() > 0.5) {
            // Respawn from sides
            particle.x =
              Math.random() > 0.5
                ? -particle.size
                : canvas.width + particle.size;
            particle.y = Math.random() * canvas.height;
          } else {
            // Respawn from top/bottom
            particle.x = Math.random() * canvas.width;
            particle.y =
              Math.random() > 0.5
                ? -particle.size
                : canvas.height + particle.size;
          }
          particle.angle = Math.random() * Math.PI * 2;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
    </motion.div>
  );
}
