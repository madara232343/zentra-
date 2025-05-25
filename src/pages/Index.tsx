import { useEffect } from "react";
import { Header } from "@/components/zentra/Header";
import { HeroSection } from "@/components/zentra/HeroSection";
import { FeaturesSection } from "@/components/zentra/FeaturesSection";
import { AboutSection } from "@/components/zentra/AboutSection";
import { PricingSection } from "@/components/zentra/PricingSection";
import { ContactSection } from "@/components/zentra/ContactSection";
import { Footer } from "@/components/zentra/Footer";
import { SectorWheel } from "@/components/zentra/Dashboard/SectorWheel";
import { DynamicDashboard } from "@/components/zentra/Dashboard/DynamicDashboard";
import { AIChatWidget } from "@/components/zentra/Dashboard/AIChatWidget";
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
      <Header />

      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-20">
          <SectorWheel />
        </div>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Your <span className="text-[#4fc3f7]">Personalized</span> Dashboard
          </h2>
          <DynamicDashboard />
        </div>
        <FeaturesSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
        <AIChatWidget />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
