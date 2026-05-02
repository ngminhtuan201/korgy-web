"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Check icon inline
const CheckIcon = () => (
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
    className="w-4 h-4 text-tertiary"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const plans = [
  {
    name: "Free",
    description: "For individual teachers",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 students per game",
      "10 AI-generated questions per quiz",
      "Basic analytics",
      "Standard support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro 🚀",
    description: "For serious educators",
    price: "$9",
    period: "per month",
    features: [
      "Up to 50 students per game",
      "Unlimited AI-generated questions",
      "Advanced analytics & exports",
      "Priority support",
      "Custom branding",
      "Question bank",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team 👥",
    description: "For schools & organizations",
    price: "$49",
    period: "per month",
    features: [
      "Unlimited students",
      "Team management",
      "School-wide analytics",
      "24/7 Dedicated support",
      "API access",
      "SSO integration",
      "Custom features",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="pricing" className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-sans)] text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`relative border-2 ${
                  plan.popular
                    ? "border-tertiary bg-card"
                    : "border-border bg-card/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-tertiary px-4 py-2 text-sm font-medium text-tertiary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-sans)] text-xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="font-[family-name:var(--font-sans)] text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckIcon />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
