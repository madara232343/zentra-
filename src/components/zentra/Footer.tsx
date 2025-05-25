import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Use Cases", href: "#" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" },
        { name: "Legal", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0c0e17] border-t border-[#8a7fff]/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <img
                src="/zentra-logo.svg"
                alt="Zentra Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]">
                Zentra
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#e0e6ff]/70 mb-6 max-w-md"
            >
              Zentra is revolutionizing daily life with AI-driven solutions
              across entertainment, healthcare, fashion, and finance. Our
              mission is to make advanced artificial intelligence accessible to
              everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-[#e0e6ff] font-medium mb-3">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-[#161a2b]/60 border-[#8a7fff]/20 text-[#e0e6ff] form-input"
                />
                <Button className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] zentra-button">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Navigation links */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-[#e0e6ff] font-medium text-lg mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom footer with social links and copyright */}
        <div className="pt-8 border-t border-[#8a7fff]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-[#e0e6ff]/70 text-sm order-2 md:order-1 mt-4 md:mt-0"
            >
              © {currentYear} Zentra | Developed with passion by Crimson
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 order-1 md:order-2"
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
