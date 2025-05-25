import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ChevronDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Zentra AI. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I understand what you're looking for. Let me analyze that for you.",
        "Based on your preferences, I'd recommend exploring our entertainment section for similar content.",
        "That's an interesting question! According to my analysis, there are several approaches we could take.",
        "I've processed your request and found some relevant information in our database.",
        "I can help with that! Let me generate some personalized recommendations for you.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          className={`h-14 w-14 rounded-full shadow-lg ${
            isOpen
              ? "bg-[#161a2b] hover:bg-[#161a2b]/80"
              : "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-[#e0e6ff]" />
          ) : (
            <MessageSquare className="h-6 w-6 text-white" />
          )}
        </Button>

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
        )}
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${
              isExpanded
                ? "bottom-0 right-0 left-0 top-0 md:left-auto md:top-20 md:right-6"
                : "bottom-24 right-6"
            } z-40 bg-[#0f111a] border border-[#8a7fff]/20 rounded-xl shadow-xl overflow-hidden transition-all duration-300 flex flex-col`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            style={{
              width: isExpanded ? "100%" : "350px",
              height: isExpanded ? "100%" : "500px",
              maxWidth: isExpanded ? "100%" : "90vw",
              maxHeight: isExpanded ? "100%" : "70vh",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-white font-medium">Zentra AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
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
                    >
                      <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                      <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#161a2b]/40">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-[#4fc3f7] text-white"
                        : "bg-[#161a2b] border border-[#8a7fff]/20 text-[#e0e6ff]"
                    }`}
                  >
                    {message.text}
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-[#e0e6ff]/50"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#161a2b] border border-[#8a7fff]/20 p-3 rounded-lg max-w-[80%]"
                  >
                    <div className="flex gap-1 items-center">
                      <div
                        className="h-2 w-2 bg-[#4fc3f7] rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-[#4fc3f7] rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-[#4fc3f7] rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </motion.div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-[#161a2b]/80 border-t border-[#8a7fff]/20">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="bg-[#161a2b] border-[#8a7fff]/20 text-[#e0e6ff]"
                />
                <Button
                  className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-[#e0e6ff]/50 text-center">
                Zentra AI can assist with entertainment, healthcare, fashion,
                and finance queries
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
