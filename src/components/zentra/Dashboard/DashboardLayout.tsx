import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Lightbulb,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { ProfileSummary } from "./ProfileSummary";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { SubscriptionWidget } from "./SubscriptionWidget";
import { AISettings } from "./AISettings";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: <Home size={20} />, path: "dashboard" },
    { name: "Profile", icon: <User size={20} />, path: "profile" },
    { name: "AI Insights", icon: <Lightbulb size={20} />, path: "insights" },
    {
      name: "Subscriptions",
      icon: <CreditCard size={20} />,
      path: "subscriptions",
    },
    { name: "Settings", icon: <Settings size={20} />, path: "settings" },
    { name: "Help", icon: <HelpCircle size={20} />, path: "help" },
  ];

  // Render loading skeleton UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f111a] p-4 md:p-8">
        <div className="flex h-full w-full gap-4">
          {/* Sidebar skeleton */}
          <div className="hidden md:block w-[250px] bg-[#161a2b]/50 rounded-xl animate-pulse">
            <div className="p-4">
              <div className="h-8 bg-[#8a7fff]/20 rounded-md mb-8"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-[#8a7fff]/20"></div>
                    <div className="h-4 w-24 bg-[#8a7fff]/20 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="flex-1 bg-[#161a2b]/30 rounded-xl overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="h-8 w-48 bg-[#8a7fff]/20 rounded-md mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="h-40 bg-[#8a7fff]/20 rounded-xl"></div>
                <div className="h-40 bg-[#8a7fff]/20 rounded-xl"></div>
              </div>
              <div className="h-64 bg-[#8a7fff]/20 rounded-xl mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-32 bg-[#8a7fff]/20 rounded-xl"></div>
                <div className="h-32 bg-[#8a7fff]/20 rounded-xl"></div>
                <div className="h-32 bg-[#8a7fff]/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f111a] p-4 md:p-8">
      <div className="flex h-full w-full gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed bottom-4 left-4 z-30 bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] rounded-full p-3 shadow-lg"
          >
            <Menu className="text-white" size={24} />
          </button>
        )}

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {(isSidebarOpen || !isMobile) && (
            <motion.div
              initial={{
                x: isMobile ? "-100%" : 0,
                opacity: isMobile ? 0 : 1,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: isMobile ? "-100%" : 0,
                opacity: isMobile ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${
                isMobile
                  ? "fixed inset-y-0 left-0 z-20 w-64 bg-[#0f111a] shadow-xl"
                  : "w-[250px]"
              } bg-[#161a2b]/50 backdrop-blur-sm rounded-xl border border-[#8a7fff]/10 overflow-hidden`}
            >
              {/* Sidebar header with toggle button */}
              <div className="flex items-center justify-between p-4 border-b border-[#8a7fff]/10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] flex items-center justify-center">
                    <span className="text-white font-bold">Z</span>
                  </div>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white font-semibold"
                    >
                      Zentra Dashboard
                    </motion.span>
                  )}
                </div>
                {!isMobile && (
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-[#e0e6ff]/70 hover:text-[#4fc3f7] transition-colors"
                  >
                    {isSidebarOpen ? (
                      <ChevronLeft size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                )}
              </div>

              {/* Navigation items */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => {
                          setActiveTab(item.path);
                          if (isMobile) setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          activeTab === item.path
                            ? "bg-[#4fc3f7]/10 text-[#4fc3f7]"
                            : "text-[#e0e6ff]/70 hover:bg-[#161a2b] hover:text-[#e0e6ff]"
                        }`}
                      >
                        <span
                          className={
                            activeTab === item.path
                              ? "text-[#4fc3f7]"
                              : "text-[#e0e6ff]/70"
                          }
                        >
                          {item.icon}
                        </span>
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <motion.div
          className="flex-1 bg-[#161a2b]/30 backdrop-blur-sm rounded-xl border border-[#8a7fff]/10 overflow-hidden"
          layout
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "dashboard" && (
                  <div className="space-y-6">
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Profile Summary */}
                      <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-4 h-full">
                        <ProfileSummary />
                      </div>

                      {/* AI Insights Panel */}
                      <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-4 h-full">
                        <AIInsightsPanel />
                      </div>
                    </div>

                    {/* Subscription Widget */}
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-4 mb-6">
                      <SubscriptionWidget />
                    </div>

                    {/* AI Settings */}
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-4">
                      <AISettings />
                    </div>
                  </div>
                )}

                {activeTab === "profile" && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                      Profile
                    </h1>
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-6">
                      <ProfileSummary expanded={true} />
                    </div>
                  </div>
                )}

                {activeTab === "insights" && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                      AI Insights
                    </h1>
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-6">
                      <AIInsightsPanel expanded={true} />
                    </div>
                  </div>
                )}

                {activeTab === "subscriptions" && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                      Subscription Management
                    </h1>
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-6">
                      <SubscriptionWidget expanded={true} />
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                      Settings
                    </h1>
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-6">
                      <AISettings expanded={true} />
                    </div>
                  </div>
                )}

                {activeTab === "help" && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                      Help Center
                    </h1>
                    <div className="bg-[#161a2b]/50 rounded-xl border border-[#8a7fff]/10 p-6">
                      <h2 className="text-xl font-semibold text-white mb-4">
                        How can we help you?
                      </h2>
                      <p className="text-[#e0e6ff]/70 mb-6">
                        Browse through our help articles or contact our support
                        team for assistance.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#161a2b] rounded-lg p-4 border border-[#8a7fff]/10 hover:border-[#4fc3f7]/30 transition-colors cursor-pointer">
                          <h3 className="text-[#e0e6ff] font-medium mb-2">
                            Getting Started Guide
                          </h3>
                          <p className="text-[#e0e6ff]/70 text-sm">
                            Learn the basics of using Zentra AI platform
                          </p>
                        </div>
                        <div className="bg-[#161a2b] rounded-lg p-4 border border-[#8a7fff]/10 hover:border-[#4fc3f7]/30 transition-colors cursor-pointer">
                          <h3 className="text-[#e0e6ff] font-medium mb-2">
                            Frequently Asked Questions
                          </h3>
                          <p className="text-[#e0e6ff]/70 text-sm">
                            Quick answers to common questions
                          </p>
                        </div>
                        <div className="bg-[#161a2b] rounded-lg p-4 border border-[#8a7fff]/10 hover:border-[#4fc3f7]/30 transition-colors cursor-pointer">
                          <h3 className="text-[#e0e6ff] font-medium mb-2">
                            Contact Support
                          </h3>
                          <p className="text-[#e0e6ff]/70 text-sm">
                            Get in touch with our customer support team
                          </p>
                        </div>
                        <div className="bg-[#161a2b] rounded-lg p-4 border border-[#8a7fff]/10 hover:border-[#4fc3f7]/30 transition-colors cursor-pointer">
                          <h3 className="text-[#e0e6ff] font-medium mb-2">
                            API Documentation
                          </h3>
                          <p className="text-[#e0e6ff]/70 text-sm">
                            Technical documentation for developers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
