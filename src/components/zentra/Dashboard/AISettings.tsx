import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  BellRing,
  BellOff,
  Globe,
  ChevronRight,
} from "lucide-react";

interface AISettingsProps {
  expanded?: boolean;
}

export function AISettings({ expanded = false }: AISettingsProps) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("english");
  const [previewContent, setPreviewContent] = useState(
    "This is a preview of your AI assistant's voice and appearance.",
  );

  // Languages
  const languages = [
    { id: "english", name: "English (US)" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
    { id: "japanese", name: "Japanese" },
  ];

  return (
    <div className={expanded ? "p-2" : ""}>
      <h2 className="text-lg font-semibold text-white mb-4">AI Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Voice setting */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {voiceEnabled ? (
                  <Volume2 className="h-5 w-5 text-[#4fc3f7]" />
                ) : (
                  <VolumeX className="h-5 w-5 text-[#e0e6ff]/70" />
                )}
                <h3 className="text-white font-medium">AI Voice</h3>
              </div>

              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="toggle-voice"
                  className="opacity-0 w-0 h-0"
                  checked={voiceEnabled}
                  onChange={() => setVoiceEnabled(!voiceEnabled)}
                />
                <label
                  htmlFor="toggle-voice"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    voiceEnabled
                      ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                      : "bg-[#161a2b]"
                  }`}
                >
                  <motion.span
                    className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full"
                    animate={{ translateX: voiceEnabled ? "1.5rem" : "0rem" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  ></motion.span>

                  {/* Glow effect when toggled on */}
                  <AnimatePresence>
                    {voiceEnabled && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white opacity-20"
                      ></motion.span>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </div>

            <div className="bg-[#161a2b] rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#e0e6ff]/80 text-sm">Voice Volume</span>
                <span className="text-[#e0e6ff] text-sm">80%</span>
              </div>
              <div className="h-1 bg-[#0f111a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Theme setting */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {darkModeEnabled ? (
                  <Moon className="h-5 w-5 text-[#4fc3f7]" />
                ) : (
                  <Sun className="h-5 w-5 text-[#e0e6ff]/70" />
                )}
                <h3 className="text-white font-medium">Theme Mode</h3>
              </div>

              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="toggle-theme"
                  className="opacity-0 w-0 h-0"
                  checked={darkModeEnabled}
                  onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                />
                <label
                  htmlFor="toggle-theme"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    darkModeEnabled
                      ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                      : "bg-[#161a2b]"
                  }`}
                >
                  <motion.span
                    className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full"
                    animate={{
                      translateX: darkModeEnabled ? "1.5rem" : "0rem",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  ></motion.span>

                  <AnimatePresence>
                    {darkModeEnabled && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white opacity-20"
                      ></motion.span>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  !darkModeEnabled
                    ? "bg-white border-2 border-[#4fc3f7]"
                    : "bg-[#161a2b] border border-[#8a7fff]/20 hover:border-[#8a7fff]/40"
                }`}
                onClick={() => setDarkModeEnabled(false)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={
                      darkModeEnabled ? "text-[#e0e6ff]" : "text-gray-800"
                    }
                  >
                    Light
                  </span>
                  <Sun
                    className={
                      darkModeEnabled
                        ? "h-4 w-4 text-[#e0e6ff]/60"
                        : "h-4 w-4 text-yellow-500"
                    }
                  />
                </div>
                <div className="h-8 rounded bg-gray-100 border border-gray-200"></div>
              </div>

              <div
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  darkModeEnabled
                    ? "bg-[#0f111a] border-2 border-[#4fc3f7]"
                    : "bg-gray-800 border border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setDarkModeEnabled(true)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#e0e6ff]">Dark</span>
                  <Moon className="h-4 w-4 text-[#4fc3f7]" />
                </div>
                <div className="h-8 rounded bg-[#161a2b] border border-[#8a7fff]/20"></div>
              </div>
            </div>
          </div>

          {/* Notifications setting */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {notificationsEnabled ? (
                  <BellRing className="h-5 w-5 text-[#4fc3f7]" />
                ) : (
                  <BellOff className="h-5 w-5 text-[#e0e6ff]/70" />
                )}
                <h3 className="text-white font-medium">Notifications</h3>
              </div>

              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="toggle-notifications"
                  className="opacity-0 w-0 h-0"
                  checked={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                />
                <label
                  htmlFor="toggle-notifications"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationsEnabled
                      ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                      : "bg-[#161a2b]"
                  }`}
                >
                  <motion.span
                    className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full"
                    animate={{
                      translateX: notificationsEnabled ? "1.5rem" : "0rem",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  ></motion.span>

                  <AnimatePresence>
                    {notificationsEnabled && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white opacity-20"
                      ></motion.span>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </div>

            {notificationsEnabled && (
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#161a2b] rounded-lg">
                  <span className="text-[#e0e6ff]/80 text-sm">AI Insights</span>
                  <div className="h-4 w-4 rounded bg-[#4fc3f7]"></div>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#161a2b] rounded-lg">
                  <span className="text-[#e0e6ff]/80 text-sm">
                    Feature Updates
                  </span>
                  <div className="h-4 w-4 rounded bg-[#4fc3f7]"></div>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#161a2b] rounded-lg">
                  <span className="text-[#e0e6ff]/80 text-sm">Marketing</span>
                  <div className="h-4 w-4 rounded border border-[#8a7fff]/20"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Language setting */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-[#4fc3f7]" />
              <h3 className="text-white font-medium">Language</h3>
            </div>

            <div className="bg-[#161a2b] rounded-lg p-3">
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    className={`w-full flex justify-between items-center p-2 rounded-lg transition-colors ${
                      language === lang.id
                        ? "bg-[#4fc3f7]/10 text-[#4fc3f7]"
                        : "hover:bg-[#0f111a] text-[#e0e6ff]/80"
                    }`}
                    onClick={() => setLanguage(lang.id)}
                  >
                    <span>{lang.name}</span>
                    {language === lang.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-4 w-4 rounded-full bg-[#4fc3f7]"
                      ></motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview pane */}
          <div>
            <h3 className="text-white font-medium mb-3">Live Preview</h3>
            <motion.div
              animate={{
                backgroundColor: darkModeEnabled
                  ? "rgba(15, 17, 26, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-lg border border-[#8a7fff]/20"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>

                <div>
                  <motion.p
                    animate={{
                      color: darkModeEnabled ? "#e0e6ff" : "#0f111a",
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-2"
                  >
                    {previewContent}
                  </motion.p>

                  {voiceEnabled && (
                    <div className="flex items-center gap-1">
                      <Volume2 className="h-4 w-4 text-[#4fc3f7]" />
                      <div className="flex gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-1 w-1 bg-[#4fc3f7] rounded-full"
                            animate={{
                              height: ["4px", "8px", "4px"],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          ></motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional settings when expanded */}
      {expanded && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161a2b] rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">
              Accessibility Options
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">Larger text</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-large-text"
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="toggle-large-text"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#e0e6ff]/70 w-4 h-4 rounded-full transition-transform duration-300"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">Reduced motion</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-reduced-motion"
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="toggle-reduced-motion"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#e0e6ff]/70 w-4 h-4 rounded-full transition-transform duration-300"></span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#e0e6ff]/80">High contrast</span>
                <div className="relative inline-block w-10 h-5">
                  <input
                    type="checkbox"
                    id="toggle-high-contrast"
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="toggle-high-contrast"
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-[#161a2b] border border-[#8a7fff]/20"
                  >
                    <span className="absolute top-0.5 left-0.5 bg-[#e0e6ff]/70 w-4 h-4 rounded-full transition-transform duration-300"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161a2b] rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Advanced Settings</h3>
            <div className="space-y-2">
              <button className="w-full flex justify-between items-center p-3 bg-[#0f111a] rounded-lg text-[#e0e6ff]/80 hover:text-[#e0e6ff] transition-colors">
                <span>Data Usage & Privacy</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-[#0f111a] rounded-lg text-[#e0e6ff]/80 hover:text-[#e0e6ff] transition-colors">
                <span>AI Personalization</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-[#0f111a] rounded-lg text-[#e0e6ff]/80 hover:text-[#e0e6ff] transition-colors">
                <span>Keyboard Shortcuts</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
