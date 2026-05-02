"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Brain,
  ChartColumn,
  Gamepad2,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Question Generator",
    description:
      "Simply input lesson content, and AI automatically generates high-quality questions in seconds.",
  },
  {
    icon: Users,
    title: "Student Management",
    description:
      "Track each student's progress. View scores and quiz history for personalized learning.",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description:
      "Turn quizzes into exciting games. Students join with a code and compete in real-time.",
  },
  {
    icon: Brain,
    title: "Interactive Questions",
    description:
      "Create various question types: multiple choice, drag-and-drop, matching, fill-in-the-blank...",
  },
  {
    icon: ChartColumn,
    title: "Detailed Analytics",
    description:
      "View real-time result analysis. Easily export Excel/PDF reports.",
  },
  {
    icon: Shield,
    title: "Kid-Safe Design",
    description:
      "COPPA compliant. No inappropriate content. Data is securely protected.",
  },
];

export function Features() {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-sans)] text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create interactive and effective learning
            experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-2 border-transparent transition-all hover:border-tertiary/30">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                    <feature.icon />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-sans)] text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
