"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-tertiary px-6 py-16 md:px-16 md:py-20"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute right-0 top-0 h-full w-1/2 bg-white/5 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-[family-name:var(--font-sans)] text-3xl font-bold tracking-tight text-tertiary-foreground md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-tertiary-foreground/80">
              Join thousands of teachers using Korgy to create more engaging
              lessons.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center"
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base px-8"
              >
                Try for Free
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-base px-8 text-tertiary-foreground hover:bg-tertiary-foreground/10"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
