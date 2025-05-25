import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Plus,
  Settings,
  X,
  MessageSquare,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardWidget {
  id: string;
  title: string;
  type: string;
  content: React.ReactNode;
  size: "small" | "medium" | "large";
  hasNotification?: boolean;
}

export function DynamicDashboard() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);

  // Simulated widget data
  useEffect(() => {
    // Simulate API call to fetch personalized widgets
    setTimeout(() => {
      setWidgets([
        {
          id: "widget-1",
          title: "AI Fashion Recommendations",
          type: "fashion",
          content: <FashionWidget />,
          size: "medium",
          hasNotification: true,
        },
        {
          id: "widget-2",
          title: "Health Insights",
          type: "health",
          content: <HealthWidget />,
          size: "medium",
        },
        {
          id: "widget-3",
          title: "Financial Overview",
          type: "finance",
          content: <FinanceWidget />,
          size: "large",
        },
        {
          id: "widget-4",
          title: "Entertainment Picks",
          type: "entertainment",
          content: <EntertainmentWidget />,
          size: "medium",
          hasNotification: true,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const addWidget = (type: string) => {
    const newWidgetTypes: Record<string, DashboardWidget> = {
      fashion: {
        id: `widget-fashion-${Date.now()}`,
        title: "AI Fashion Recommendations",
        type: "fashion",
        content: <FashionWidget />,
        size: "medium",
      },
      health: {
        id: `widget-health-${Date.now()}`,
        title: "Health Insights",
        type: "health",
        content: <HealthWidget />,
        size: "medium",
      },
      finance: {
        id: `widget-finance-${Date.now()}`,
        title: "Financial Overview",
        type: "finance",
        content: <FinanceWidget />,
        size: "large",
      },
      entertainment: {
        id: `widget-entertainment-${Date.now()}`,
        title: "Entertainment Picks",
        type: "entertainment",
        content: <EntertainmentWidget />,
        size: "medium",
      },
    };

    setWidgets([...widgets, newWidgetTypes[type]]);
    setShowWidgetMenu(false);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="loader mb-4"></div>
          <p className="text-[#e0e6ff]/70">Personalizing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#0f111a]/50 backdrop-blur-md rounded-xl border border-[#8a7fff]/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your AI Dashboard</h2>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#161a2b] border-[#8a7fff]/20 text-[#e0e6ff]"
            onClick={() => setShowWidgetMenu(!showWidgetMenu)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>

          <AnimatePresence>
            {showWidgetMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-[#161a2b] border border-[#8a7fff]/20 rounded-lg shadow-lg z-10"
              >
                <div className="p-2">
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#8a7fff]/10 text-[#e0e6ff] flex items-center"
                    onClick={() => addWidget("fashion")}
                  >
                    <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500"
                      >
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                      </svg>
                    </span>
                    Fashion
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#8a7fff]/10 text-[#e0e6ff] flex items-center"
                    onClick={() => addWidget("health")}
                  >
                    <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </span>
                    Health
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#8a7fff]/10 text-[#e0e6ff] flex items-center"
                    onClick={() => addWidget("finance")}
                  >
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </span>
                    Finance
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#8a7fff]/10 text-[#e0e6ff] flex items-center"
                    onClick={() => addWidget("entertainment")}
                  >
                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-500"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect
                          x="1"
                          y="5"
                          width="15"
                          height="14"
                          rx="2"
                          ry="2"
                        />
                      </svg>
                    </span>
                    Entertainment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {widgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`
                        ${widget.size === "small" ? "col-span-1" : widget.size === "medium" ? "col-span-1 md:col-span-1" : "col-span-1 md:col-span-2"}
                        bg-[#161a2b] rounded-xl border border-[#8a7fff]/20 overflow-hidden transition-all duration-300 
                        ${snapshot.isDragging ? "shadow-lg scale-[1.02] z-10" : ""}
                      `}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <h3
                              {...provided.dragHandleProps}
                              className="text-lg font-semibold text-[#e0e6ff] cursor-move flex items-center"
                            >
                              {widget.title}
                              {widget.hasNotification && (
                                <span className="ml-2 h-2 w-2 rounded-full bg-[#4fc3f7] animate-pulse"></span>
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-[#e0e6ff]/50 hover:text-[#e0e6ff] transition-colors">
                              <Settings className="h-4 w-4" />
                            </button>
                            <button
                              className="text-[#e0e6ff]/50 hover:text-[#e0e6ff] transition-colors"
                              onClick={() => removeWidget(widget.id)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="min-h-[150px]">{widget.content}</div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

// Placeholder Widget Components
function FashionWidget() {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="relative min-w-[100px] h-[120px] rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/10 flex items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#161a2b]/80 backdrop-blur-sm">
              <button className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2">
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-40">👕</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/20 text-sm">
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4fc3f7] animate-pulse"></span>
          </div>
          <p className="text-[#e0e6ff]/90">
            New suggestion: Based on your style preferences, check out these
            minimalist options for summer.
          </p>
        </div>
      </div>
    </div>
  );
}

function HealthWidget() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          <span className="text-[#e0e6ff]/90">Activity Score</span>
        </div>
        <div className="text-xl font-semibold text-[#e0e6ff]">
          87<span className="text-green-500 text-sm">↑</span>
        </div>
      </div>
      <div className="h-2 bg-[#161a2b] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-[#4fc3f7] w-[87%] rounded-full"></div>
      </div>
      <div className="flex justify-between text-xs text-[#e0e6ff]/60">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-[#e0e6ff]/60" />
          <span className="text-[#e0e6ff]/60">Last updated:</span>
        </div>
        <span className="text-[#e0e6ff]/90">2 hours ago</span>
      </div>
    </div>
  );
}

function FinanceWidget() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-[#e0e6ff]/90 font-medium">Portfolio Value</h4>
        <span className="text-xl font-semibold text-[#e0e6ff]">$12,480.65</span>
      </div>
      <div className="h-[120px] w-full bg-[#161a2b]/70 rounded-lg overflow-hidden relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C40,40 80,100 120,70 C160,40 200,60 240,50 C280,40 320,80 360,60 L360,120 L0,120 Z"
            fill="url(#financeGradient)"
            fillOpacity="0.2"
          />
          <path
            d="M0,60 C40,40 80,100 120,70 C160,40 200,60 240,50 C280,40 320,80 360,60"
            stroke="url(#financeGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="financeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4fc3f7" />
              <stop offset="100%" stopColor="#8a7fff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-3 right-3 bg-[#161a2b]/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-green-400">
          +5.4%
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1 bg-[#161a2b]/70 rounded-lg p-3 text-center">
          <div className="text-[#e0e6ff]/60 text-xs">Stocks</div>
          <div className="text-[#e0e6ff] font-medium">$8,245.30</div>
        </div>
        <div className="flex-1 bg-[#161a2b]/70 rounded-lg p-3 text-center">
          <div className="text-[#e0e6ff]/60 text-xs">Crypto</div>
          <div className="text-[#e0e6ff] font-medium">$4,235.35</div>
        </div>
      </div>
    </div>
  );
}

function EntertainmentWidget() {
  return (
    <div className="space-y-3">
      <div className="relative w-full h-[120px] rounded-lg bg-gradient-to-br from-purple-500/20 to-[#4fc3f7]/10 overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🎬</span>
        </div>
        <div className="absolute inset-0 bg-[#161a2b]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 transition-colors text-white rounded-full h-10 w-10 flex items-center justify-center">
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
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-[#161a2b]/80 backdrop-blur-sm p-2 text-[#e0e6ff] text-sm">
          <p className="truncate">AI-Recommended: "The Future of Us"</p>
        </div>
      </div>
      <div className="text-sm text-[#e0e6ff]/80">
        <p>
          Based on your recent interests in sci-fi and technology documentaries.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-[#4fc3f7]" />
          <span className="text-[#e0e6ff]/60 text-xs">
            Trending in your area
          </span>
        </div>
        <button className="text-[#4fc3f7] text-sm flex items-center gap-1 hover:underline">
          View more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
