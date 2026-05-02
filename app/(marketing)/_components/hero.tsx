"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-10 md:py-20">
      {/* Background decoration - subtle bubble pattern */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-secondary/5 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center rounded-full border bg-card px-3 py-1 text-sm"
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-tertiary"></span>
            <span className="text-muted-foreground">
              For teachers & students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 font-[family-name:var(--font-sans)] text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl lg:text-7xl"
          >
            Create AI-powered interactive quizzes{" "}
            <span className="text-tertiary">with Korgy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 text-lg text-muted-foreground md:text-xl"
          >
            A gamified platform for teachers to create multiple-choice questions
            instantly with AI. Host live games and track student progress in
            real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-2 sm:flex-row"
          >
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-xl">
              Start Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-xl"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 rounded-2xl bg-card/50 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="text-center">
              <div className="font-[family-name:var(--font-sans)] text-2xl font-bold text-primary md:text-3xl">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-sans)] text-2xl font-bold text-primary md:text-3xl">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Teachers</div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-sans)] text-2xl font-bold text-primary md:text-3xl">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">
                Quizzes Created
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
