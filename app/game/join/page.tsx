"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sessionService } from "@/features/sessions/session-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowRight, User, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function JoinGamePage() {
  const router = useRouter();
  const [step, setStep] = useState<"code" | "nickname">("code");
  const [joinCode, setJoinCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode || joinCode.length < 4) {
      toast.error("Please enter a valid game code.");
      return;
    }

    setIsLoading(true);
    try {
      const sessionData = await sessionService.getSessionByCode(
        joinCode.toUpperCase(),
      );
      setSession(sessionData);
      setStep("nickname");
    } catch (err: any) {
      console.error("Failed to verify code:", err);
      toast.error(err.message || "Invalid game code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || nickname.trim().length < 2) {
      toast.error("Nickname must be at least 2 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await sessionService.joinSession(session.id, {
        nickname,
      });
      toast.success(`Welcome, ${nickname}!`);

      // Redirect to the game session page (player view)
      router.push(`/game/session/${session.id}`);
    } catch (err: any) {
      console.error("Failed to join session:", err);
      toast.error(err.message || "Failed to join session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-primary/90 to-secondary flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 size-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 size-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
              <div className="size-16 bg-primary text-primary-foreground rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 transition-transform">
                <Gamepad2 className="size-8" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">
                {step === "code" ? "Enter Code" : "Almost Ready!"}
              </h1>
              <p className="text-muted-foreground font-medium">
                {step === "code"
                  ? "Join the fun with your game code"
                  : `Joining "${session?.set?.name}"`}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === "code" ? (
                <motion.form
                  key="code-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyCode}
                  className="space-y-6"
                >
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="000000"
                      value={joinCode}
                      onChange={(e) =>
                        setJoinCode(e.target.value.toUpperCase())
                      }
                      className="h-20 text-center text-4xl font-black tracking-[0.2em] rounded-3xl border-2 border-muted bg-muted/30 focus-visible:ring-primary focus-visible:border-primary transition-all uppercase"
                      maxLength={8}
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-16 text-xl font-black uppercase tracking-widest rounded-2xl bg-secondary hover:bg-secondary/90 shadow-xl hover:shadow-secondary/20 transition-all hover:scale-[1.02] cursor-pointer"
                    disabled={isLoading || joinCode.length < 4}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ) : (
                      "Join Game"
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="nickname-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleJoinSession}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="size-6" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Your Nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="h-16 pl-16 text-xl font-bold rounded-2xl border-2 border-muted bg-muted/30 focus-visible:ring-primary focus-visible:border-primary transition-all"
                      maxLength={20}
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-16 text-xl font-black uppercase tracking-widest rounded-2xl bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] cursor-pointer"
                    disabled={isLoading || nickname.length < 2}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ) : (
                      <div className="flex items-center">
                        Let&apos;s Go! <ArrowRight className="ml-2 size-6" />
                      </div>
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep("code")}
                    className="w-full text-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Use a different code
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer info */}
      <div className="absolute bottom-8 text-white/60 text-sm font-medium">
        Powered by{" "}
        <span className="text-white font-bold tracking-tighter uppercase">
          Korgy
        </span>
      </div>
    </div>
  );
}
