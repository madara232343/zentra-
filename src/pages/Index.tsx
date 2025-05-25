import { Helmet } from "react-helmet-async";
import { Header } from "@/components/zentra/Header";
import { HeroSection } from "@/components/zentra/HeroSection";
import { FeaturesSection } from "@/components/zentra/FeaturesSection";
import { AboutSection } from "@/components/zentra/AboutSection";
import { Footer } from "@/components/zentra/Footer";
import { HelpButton } from "@/components/zentra/HelpButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Zentra – AI Powering Smarter Living</title>
        <meta
          name="description"
          content="Zentra – AI platform for entertainment, healthcare, fashion, and finance."
        />
        <meta name="theme-color" content="#0f111a" />
      </Helmet>

      <div className="min-h-screen bg-[#0f111a] text-white">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
        </main>
        <Footer />
        <HelpButton />
      </div>
    </>
  );
};

export default Index;
