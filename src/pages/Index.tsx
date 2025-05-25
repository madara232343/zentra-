import { useEffect } from "react";
import { Header } from "@/components/zentra/Header";
import { HeroSection } from "@/components/zentra/HeroSection";
import { FeaturesSection } from "@/components/zentra/FeaturesSection";
import { AboutSection } from "@/components/zentra/AboutSection";
import { Footer } from "@/components/zentra/Footer";
import { HelpButton } from "@/components/zentra/HelpButton";
import { ScrollProgress } from "@/components/zentra/ScrollProgress";
import "../styles/globals.css";

const Index = () => {
  // Add page title and meta info
  useEffect(() => {
    document.title = "Zentra – AI Powering Smarter Living";

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Zentra – AI platform for entertainment, healthcare, fashion, and finance.",
    );

    // Add theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.setAttribute("name", "theme-color");
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute("content", "#0f111a");
  }, []);

  return (
    <div className="min-h-screen bg-[#0f111a] text-[#e0e6ff]">
      <ScrollProgress />
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        {/* Additional sections would go here */}
      </main>

      <Footer />
      <HelpButton />
    </div>
  );
};

export default Index;
