"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    title: "Input lesson content",
    description:
      "Paste text, video URL, or upload PDF. You can also enter topics directly.",
  },
  {
    step: "02",
    title: "AI generates questions",
    description:
      "In seconds, AI creates 10-20 high-quality multiple-choice questions. You can edit them.",
  },
  {
    step: "03",
    title: "Host a game",
    description:
      "Share your screen and let students join with a 6-digit code. No signup required!",
  },
  {
    step: "04",
    title: "View results",
    description:
      "Track the live leaderboard. See detailed analysis after the game ends.",
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-sans)] text-3xl font-bold tracking-tight text-primary md:text-4xl">
            How Korgy Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            4 simple steps to create educational games in minutes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {steps.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="relative border-2 border-border/50 pt-6">
                <div className="absolute -left-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-tertiary text-[family-name:var(--font-sans)] text-lg font-bold text-tertiary-foreground">
                  {item.step}
                </div>
                <CardHeader className="pl-12">
                  <CardTitle className="font-[family-name:var(--font-sans)] text-xl">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="px-8 py-6 text-xl">
            Try Today - It&apos;s Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
