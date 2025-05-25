import { Home, Layers, DollarSign, Info, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function NavMenu() {
  const navItems = [
    { name: "Home", icon: <Home className="h-4 w-4" />, href: "#home" },
    {
      name: "Features",
      icon: <Layers className="h-4 w-4" />,
      href: "#features",
    },
    {
      name: "Pricing",
      icon: <DollarSign className="h-4 w-4" />,
      href: "#pricing",
    },
    { name: "About", icon: <Info className="h-4 w-4" />, href: "#about" },
    { name: "Contact", icon: <Mail className="h-4 w-4" />, href: "#contact" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          className="nav-link text-[#e0e6ff] hover:text-[#4fc3f7] transition-colors flex items-center gap-1.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
        >
          {item.icon}
          {item.name}
        </motion.a>
      ))}
    </nav>
  );
}
