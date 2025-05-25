import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: Array<{ name: string; included: boolean; tooltip?: string }>;
  highlight?: boolean;
  index: number;
}

function PricingTier({
  name,
  price,
  description,
  features,
  highlight = false,
  index,
}: PricingTierProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.2 * index }}
      className={`relative rounded-xl border ${
        highlight
          ? "border-[#4fc3f7] shadow-lg shadow-[#4fc3f7]/10"
          : "border-[#8a7fff]/20"
      } bg-[#161a2b]/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4fc3f7]/10`}
    >
      {highlight && (
        <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-medium bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white">
          Most Popular
        </div>
      )}

      <div className={`p-6 ${highlight ? "pt-10" : ""}`}>
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-[#e0e6ff]/70 mb-6 h-12">{description}</p>

        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Custom" && (
            <span className="text-[#e0e6ff]/70 ml-2">/month</span>
          )}
        </div>

        <Button
          className={`w-full mb-6 ${
            highlight
              ? "bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] text-white"
              : "bg-[#161a2b] border border-[#8a7fff]/20 text-[#e0e6ff]"
          } zentra-button`}
        >
          Get Started
        </Button>

        <div className="space-y-3">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <div
                className={`mt-1 mr-3 rounded-full p-1 ${
                  feature.included
                    ? "text-[#4fc3f7] bg-[#4fc3f7]/10"
                    : "text-[#e0e6ff]/30 bg-[#e0e6ff]/5"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center">
                <span
                  className={
                    feature.included
                      ? "text-[#e0e6ff]"
                      : "text-[#e0e6ff]/50 line-through"
                  }
                >
                  {feature.name}
                </span>
                {feature.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1.5 text-[#e0e6ff]/50 hover:text-[#e0e6ff]/80">
                          <HelpCircle className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const tiers = [
    {
      name: "Zentra Core",
      price: "$9",
      description: "Essential AI tools for personal use and small projects.",
      features: [
        {
          name: "Basic AI recommendations",
          included: true,
          tooltip: "AI-powered suggestions based on your usage patterns",
        },
        { name: "Up to 100 queries per day", included: true },
        { name: "Entertainment module", included: true },
        { name: "Standard support", included: true },
        { name: "Healthcare module", included: false },
        { name: "Fashion module", included: false },
        { name: "Finance module", included: false },
        { name: "API access", included: false },
      ],
    },
    {
      name: "Zentra Plus",
      price: "$39",
      description: "Advanced AI capabilities for professionals and businesses.",
      features: [
        {
          name: "Advanced AI recommendations",
          included: true,
          tooltip:
            "Enhanced AI algorithms with personalized insights and pattern recognition",
        },
        { name: "Unlimited queries", included: true },
        { name: "Entertainment module", included: true },
        { name: "Healthcare module", included: true },
        { name: "Fashion module", included: true },
        { name: "Priority support", included: true },
        { name: "Finance module", included: false },
        {
          name: "Basic API access",
          included: true,
          tooltip: "Limited API access for basic integrations",
        },
      ],
      highlight: true,
    },
    {
      name: "Zentra Elite",
      price: "$149",
      description:
        "Complete AI ecosystem for enterprises and large-scale applications.",
      features: [
        {
          name: "Enterprise AI capabilities",
          included: true,
          tooltip:
            "Full suite of AI technologies with custom algorithms and advanced processing",
        },
        { name: "Unlimited queries", included: true },
        { name: "All modules included", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integrations", included: true },
        {
          name: "Full API access",
          included: true,
          tooltip: "Complete API access with higher rate limits",
        },
        { name: "White-labeling options", included: true },
        {
          name: "Custom module development",
          included: true,
          tooltip: "Development of custom AI modules for your specific needs",
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "How does the billing cycle work?",
      answer:
        "All plans are billed monthly or annually with a 20% discount for annual billing. You can upgrade, downgrade, or cancel your subscription at any time.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes, you can switch between plans at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. Cryptocurrency payments are coming soon.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial of Zentra Plus so you can experience our advanced features before committing.",
    },
  ];

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 bg-[#0f111a] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4fc3f7] rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8a7fff] rounded-full filter blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple, Transparent <span className="text-[#4fc3f7]">Pricing</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] mx-auto mb-6 rounded-full"></div>
          <p className="text-[#e0e6ff]/80 text-lg">
            Choose the plan that works best for your needs. All plans include
            core AI features with different levels of capabilities and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              highlight={tier.highlight}
              index={index}
            />
          ))}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#161a2b]/40 backdrop-blur-sm border border-[#8a7fff]/20 rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-[#e0e6ff]/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
