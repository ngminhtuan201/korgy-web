"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Set, setService } from "@/features/sets/set-service";
import {
  sessionService,
  SessionGame,
  SessionEndCondition,
  SessionPlayMode,
} from "@/features/sessions/session-service";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Play,
  Settings2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const GAMES = [
  {
    id: SessionGame.WHACK_A_BUG,
    name: "Whack-a-Bug",
    description: "Test your reflexes by whacking pesky bugs!",
    image: "/game-dap-gian.png",
    color: "from-orange-500 to-red-600",
  },
  {
    id: SessionGame.CHICKEN_TOSS,
    name: "Chicken Toss",
    description: "Aim carefully and toss the chickens at your targets!",
    image: "/game-nem-ga.png",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: SessionGame.QUIZ,
    name: "Quiz Game",
    description: "Test your knowledge with our quiz game!",
    image: "/game-quiz.png",
    color: "from-green-500 to-teal-600",
  },
];

function HostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId");
  const [set, setSet] = useState<Set | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHosting, setIsHosting] = useState(false);
  const [selectedGame, setSelectedGame] = useState<SessionGame | null>(null);
  const [settings, setSettings] = useState({
    shuffleQuestions: true,
    loginRequired: false,
    allowLateJoining: true,
    playMode: SessionPlayMode.SOLO,
    endCondition: SessionEndCondition.TIME,
    duration: 300,
  });

  useEffect(() => {
    if (!setId) return;
    const fetchSet = async () => {
      try {
        const data = await setService.getSet(setId);
        setSet(data);
      } catch (err) {
        console.error("Failed to fetch set:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSet();
  }, [setId]);

  const handleStartHosting = async () => {
    if (!setId || !selectedGame) return;

    setIsHosting(true);
    try {
      const session = await sessionService.createSession({
        setId,
        game: selectedGame,
        shuffleQuestions: settings.shuffleQuestions,
        loginRequired: settings.loginRequired,
        allowLateJoining: settings.allowLateJoining,
        playMode: settings.playMode,
        endCondition: settings.endCondition,
        duration: settings.duration,
      });

      toast.success("Session created successfully!");
      router.push(`/sessions/${session.id}/lobby`);
    } catch (err: any) {
      console.error("Failed to start hosting:", err);
      toast.error(err.message || "Failed to start hosting. Please try again.");
    } finally {
      setIsHosting(false);
    }
  };

  if (!setId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold">Invalid Set ID</h2>
        <Button asChild>
          <Link href="/sets">Back to Playsets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-transparent px-0 text-muted-foreground hover:text-primary"
        >
          <Link href={`/sets/${setId}`}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Playset
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Set Info Header */}
          <section>
            {isLoading ? (
              <div className="bg-card border rounded-3xl p-8 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : set ? (
              <div className="bg-linear-to-br from-card to-muted/30 border rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h1 className="text-4xl font-semibold tracking-tight">
                        {set.name}
                      </h1>
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {set?.description?.trim() || (
                          <i>No description provided</i>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="secondary">
                        {set.questions.length} questions
                      </Badge>
                      <Badge variant="outline">Ready to Host</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-3xl">
                <h3 className="text-lg font-semibold">Set not found</h3>
                <Button className="mt-4" asChild>
                  <Link href="/sets">View All Sets</Link>
                </Button>
              </div>
            )}
          </section>

          {/* Game Selection Grid */}
          <section className="space-y-4">
            <div className="flex items-end justify-between px-1">
              <h2 className="text-2xl font-semibold">Choose a Game Mode</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GAMES.map((game) => (
                <Card
                  key={game.id}
                  className={cn(
                    "group relative overflow-hidden cursor-pointer transition-all duration-500 border-2 rounded-3xl p-0",
                    selectedGame === game.id
                      ? "border-4 border-secondary shadow-lg"
                      : "border-transparent hover:border-secondary/30 hover:shadow-xl hover:scale-[1.01]",
                  )}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover transition-transform duration-700"
                      unoptimized
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500",
                        selectedGame === game.id
                          ? "opacity-90"
                          : "opacity-60 group-hover:opacity-80",
                      )}
                    />

                    {/* Selection Indicator */}
                    {selectedGame === game.id && (
                      <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground p-2 rounded-full shadow-lg z-20 animate-in zoom-in-50 duration-300">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    )}

                    {/* Text Content Overlay */}
                    <div className="absolute inset-0 p-4 hidden group-hover:flex flex-col justify-end text-white z-10">
                      <div className="transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-lg font-black uppercase tracking-wider mb-1 drop-shadow-md">
                          {game.name}
                        </h3>
                        <p className="text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 line-clamp-2 text-white/90">
                          {game.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle Color Glow on Hover */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
                        game.color,
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Session Control */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings2 className="h-5 w-5 text-primary" />
                Session Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                  <Label
                    htmlFor="shuffle-questions"
                    className="flex flex-col gap-1 cursor-pointer"
                  >
                    Shuffle questions
                  </Label>
                  <Switch
                    id="shuffle-questions"
                    checked={settings.shuffleQuestions}
                    onCheckedChange={(val) =>
                      setSettings({ ...settings, shuffleQuestions: val })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                  <Label
                    htmlFor="login-required"
                    className="flex flex-col gap-1 cursor-pointer"
                  >
                    Require student accounts
                  </Label>
                  <Switch
                    id="login-required"
                    checked={settings.loginRequired}
                    onCheckedChange={(val) =>
                      setSettings({ ...settings, loginRequired: val })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                  <Label
                    htmlFor="late-joining"
                    className="flex flex-col gap-1 cursor-pointer"
                  >
                    Allow late joining
                  </Label>
                  <Switch
                    id="late-joining"
                    checked={settings.allowLateJoining}
                    onCheckedChange={(val) =>
                      setSettings({ ...settings, allowLateJoining: val })
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground ml-1">
                    Play Mode
                  </Label>
                  <Select
                    value={settings.playMode}
                    onValueChange={(val) =>
                      setSettings({ ...settings, playMode: val })
                    }
                  >
                    <SelectTrigger className="w-full bg-muted/50 rounded-xl border-none h-11 focus:ring-1 ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SessionPlayMode.SOLO}>Solo</SelectItem>
                      <SelectItem value={SessionPlayMode.TEAM}>Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground ml-1">
                    End Condition
                  </Label>
                  <Select
                    value={settings.endCondition}
                    onValueChange={(val) =>
                      setSettings({ ...settings, endCondition: val })
                    }
                  >
                    <SelectTrigger className="w-full bg-muted/50 rounded-xl border-none h-11 focus:ring-1 ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SessionEndCondition.TIME}>
                        Time Limit
                      </SelectItem>
                      <SelectItem value={SessionEndCondition.GOAL}>
                        Goal Reached
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.endCondition === SessionEndCondition.TIME && (
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground ml-1">
                      Duration (seconds)
                    </Label>
                    <Input
                      type="number"
                      value={settings.duration}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          duration: Number(e.target.value),
                        })
                      }
                      className="w-full bg-muted/50 rounded-xl border-none h-11 focus-visible:ring-1 ring-primary/20"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                className={cn(
                  "w-full h-16 text-xl font-black uppercase tracking-widest rounded-2xl transition-all duration-300",
                  selectedGame
                    ? "bg-secondary hover:bg-secondary/90 hover:scale-[1.02]"
                    : "",
                )}
                disabled={!selectedGame || isLoading || isHosting}
                onClick={handleStartHosting}
              >
                {isHosting ? (
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                ) : (
                  <Play className="mr-3 h-6 w-6 fill-current" />
                )}
                {isHosting ? "Creating Session..." : "Start Hosting"}
              </Button>
            </CardFooter>
          </Card>
          {/* 
          <Card className="rounded-3xl border-2 border-dashed bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Users className="h-4 w-4" />
                Lobby Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center animate-pulse">
                  <Users className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="text-xs text-muted-foreground max-w-[180px] font-medium">
                  Players will be able to join using a Game Code after you start
                  the session.
                </p>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

export default function HostPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 space-y-8 animate-pulse">
          <Skeleton className="h-10 w-32" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-48 w-full rounded-3xl" />
              <div className="grid grid-cols-2 gap-6">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-64 w-full rounded-3xl" />
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      }
    >
      <HostContent />
    </Suspense>
  );
}
