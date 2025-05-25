import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, Info } from "lucide-react";

interface SubscriptionWidgetProps {
  expanded?: boolean;
}

export function SubscriptionWidget({
  expanded = false,
}: SubscriptionWidgetProps) {
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  // Current plan info
  const currentPlan = {
    name: "Zentra Plus",
    price: "$39/month",
    nextBilling: "June 15, 2023",
    daysLeft: 15,
    features: [
      "Advanced AI recommendations",
      "Unlimited queries",
      "Entertainment module",
      "Healthcare module",
      "Fashion module",
      "Priority support",
      "Basic API access",
    ],
  };

  // Calculate progress percentage
  const progressPercentage = 50; // Assuming we're halfway through the billing period

  return (
    <div className={expanded ? "p-2" : ""}>
      <h2 className="text-lg font-semibold text-white mb-4">Subscription</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[#4fc3f7] font-semibold text-xl">
                  {currentPlan.name}
                </h3>
                <span className="text-xs bg-[#4fc3f7]/20 text-[#4fc3f7] px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-[#e0e6ff]/70 mt-1">{currentPlan.price}</p>
            </div>
            <div className="text-right">
              <p className="text-[#e0e6ff]/70 text-sm">Next billing</p>
              <p className="text-[#e0e6ff]">{currentPlan.nextBilling}</p>
            </div>
          </div>

          {/* Progress ring */}
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#161a2b"
                  strokeWidth="8"
                />

                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{
                    strokeDashoffset:
                      251.2 - (251.2 * progressPercentage) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient
                    id="progressGradient"
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

              {/* Text in the center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-white">
                  {currentPlan.daysLeft}
                </span>
                <span className="text-xs text-[#e0e6ff]/70">days left</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[#e0e6ff] mb-2">Billing period progress</p>
              <div className="flex justify-between text-sm text-[#e0e6ff]/70 mb-1">
                <span>Today</span>
                <span>{currentPlan.nextBilling}</span>
              </div>
              <div className="h-2 bg-[#161a2b] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Upgrade button */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="w-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white zentra-button">
              Upgrade to Zentra Elite
            </Button>
          </motion.div>

          {/* Plan details toggle */}
          <button
            className="w-full mt-4 flex items-center justify-center gap-1 text-[#e0e6ff]/70 hover:text-[#e0e6ff] transition-colors"
            onClick={() => setShowPlanDetails(!showPlanDetails)}
          >
            {showPlanDetails ? (
              <>
                <span>Hide plan details</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show plan details</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Plan features */}
          <AnimatedAccordion isOpen={showPlanDetails}>
            <div className="mt-4 bg-[#161a2b] rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">
                Your Plan Features
              </h4>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-[#e0e6ff]/80"
                  >
                    <Check className="h-4 w-4 text-[#4fc3f7]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedAccordion>
        </div>

        {/* Additional subscription info when expanded */}
        {expanded && (
          <div className="flex-1 space-y-6">
            <div className="bg-[#161a2b] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Payment Method</h3>
              <div className="flex items-center gap-3 p-3 bg-[#0f111a] rounded-lg border border-[#8a7fff]/10">
                <div className="h-8 w-12 bg-[#0f111a] border border-[#8a7fff]/20 rounded flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-xs">VISA</span>
                </div>
                <div>
                  <p className="text-[#e0e6ff]">•••• 4242</p>
                  <p className="text-[#e0e6ff]/60 text-xs">Expires 04/25</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-[#4fc3f7]/20 text-[#4fc3f7] px-2 py-0.5 rounded-full">
                    Default
                  </span>
                </div>
              </div>
              <button className="text-[#4fc3f7] text-sm mt-3 hover:underline">
                Manage payment methods
              </button>
            </div>

            <div className="bg-[#161a2b] rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">Billing History</h3>
                <button className="text-[#4fc3f7] text-sm hover:underline">
                  View all
                </button>
              </div>

              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 bg-[#0f111a] rounded-lg border border-[#8a7fff]/10"
                  >
                    <div>
                      <p className="text-[#e0e6ff]">Zentra Plus</p>
                      <p className="text-[#e0e6ff]/60 text-xs">
                        {new Date(
                          new Date().setMonth(new Date().getMonth() - index),
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#e0e6ff]">$39.00</p>
                      <p className="text-green-400 text-xs">Paid</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#161a2b] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <span>Plan Comparison</span>
                <Info className="h-4 w-4 text-[#e0e6ff]/50" />
              </h3>

              <div className="overflow-x-auto pb-2">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr>
                      <th className="text-left text-[#e0e6ff]/70 pb-2">
                        Feature
                      </th>
                      <th className="text-center text-[#e0e6ff]/70 pb-2">
                        Core
                      </th>
                      <th className="text-center text-[#e0e6ff]/70 pb-2">
                        <span className="text-[#4fc3f7]">Plus</span>
                      </th>
                      <th className="text-center text-[#e0e6ff]/70 pb-2">
                        Elite
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="py-2 text-[#e0e6ff]/80">Price</td>
                      <td className="py-2 text-center text-[#e0e6ff]">$9/mo</td>
                      <td className="py-2 text-center text-[#4fc3f7] font-medium">
                        $39/mo
                      </td>
                      <td className="py-2 text-center text-[#e0e6ff]">
                        $149/mo
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#e0e6ff]/80">
                        AI recommendations
                      </td>
                      <td className="py-2 text-center text-[#e0e6ff]">Basic</td>
                      <td className="py-2 text-center text-[#4fc3f7] font-medium">
                        Advanced
                      </td>
                      <td className="py-2 text-center text-[#e0e6ff]">
                        Enterprise
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#e0e6ff]/80">Queries</td>
                      <td className="py-2 text-center text-[#e0e6ff]">
                        100/day
                      </td>
                      <td className="py-2 text-center text-[#4fc3f7] font-medium">
                        Unlimited
                      </td>
                      <td className="py-2 text-center text-[#e0e6ff]">
                        Unlimited
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#e0e6ff]/80">API access</td>
                      <td className="py-2 text-center text-[#e0e6ff]">—</td>
                      <td className="py-2 text-center text-[#4fc3f7] font-medium">
                        Basic
                      </td>
                      <td className="py-2 text-center text-[#e0e6ff]">Full</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Animated accordion component
function AnimatedAccordion({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
