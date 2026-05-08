"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LeaderboardEntry,
  Session,
  sessionService,
} from "@/features/sessions/session-service";
import { connectSocket, disconnectSocket, socket } from "@/lib/socket";
import { Check, Copy, LogOut, Play, Settings2, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SessionLobbyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchPlayers = async () => {
    if (!id) return;

    try {
      const data = await sessionService.getLeaderboard(id);
      setPlayers(data);
    } catch (err) {
      console.error("Failed to fetch players:", err);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchSession = async () => {
      try {
        const data = await sessionService.getSession(id);
        setSession(data);
        await fetchPlayers();
      } catch (err) {
        console.error("Failed to fetch session:", err);
        toast.error("Failed to load session details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Socket setup
    connectSocket();

    socket.emit("session:join-room", { sessionId: id });

    socket.on("session:player-joined", () => {
      fetchPlayers();
      toast.info("A new player joined!");
    });

    socket.on("session:started", () => {
      router.push(`/sessions/${id}/play`);
    });

    return () => {
      socket.off("session:player-joined");
      socket.off("session:started");
      disconnectSocket();
    };
  }, [id, router]);

  const copyJoinCode = () => {
    if (!session) return;
    navigator.clipboard.writeText(session.joinCode);
    setCopied(true);
    toast.success("Join code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = async () => {
    if (!id) return;
    setIsStarting(true);
    try {
      await sessionService.startSession(id);
      socket.emit("session:start", { sessionId: id });
      router.push(`/sessions/${id}/play`);
    } catch (err: any) {
      console.error("Failed to start session:", err);
      toast.error(err.message || "Failed to start the game.");
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-8 animate-pulse">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold text-destructive">
          Session not found
        </h2>
        <Button onClick={() => router.push("/host")}>Back to Host</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border rounded-3xl p-6 shadow-xs">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {session.set.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <Badge variant="outline" className="capitalize">
                {session.game.replace("-", " ")}
              </Badge>
              <span>•</span>
              <span className="text-sm">
                {session.set.questions.length} questions
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/host")}
              size="lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Exit
            </Button>
            <Button
              size="lg"
              variant={"secondary"}
              onClick={handleStartGame}
              disabled={isStarting}
            >
              {isStarting ? (
                <Play className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Play className="mr-2 h-5 w-5 fill-current" />
              )}
              Start Game
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area: Join Code & Players */}
          <div className="lg:col-span-2 space-y-8">
            {/* Join Code Card */}
            <Card className="bg-secondary text-secondary-foreground border-none overflow-hidden">
              <CardContent className="p-12 text-center space-y-6">
                <p className="text-xl font-medium opacity-90 uppercase tracking-[0.2em]">
                  Join with this code
                </p>
                <div className="relative inline-block group">
                  <h2 className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-2xl">
                    {session.joinCode}
                  </h2>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -right-16 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={copyJoinCode}
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="pt-4 flex flex-col items-center gap-2">
                  <p className="text-lg opacity-80">
                    Go to{" "}
                    <span className="font-bold underline">
                      korgy.com/game/join
                    </span>
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-none px-4 py-1"
                  >
                    Wait for players to join...
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Players Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  Players
                  <Badge
                    variant="secondary"
                    className="rounded-full h-7 min-w-7 flex items-center justify-center font-bold"
                  >
                    {players.length}
                  </Badge>
                </h3>
              </div>

              {players.length === 0 ? (
                <div className="bg-muted/30 border-2 border-dashed rounded-[2rem] py-24 text-center">
                  <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-muted-foreground">
                    Waiting for players to join...
                  </h4>
                  <p className="text-muted-foreground mt-2">
                    Share the code above to start the fun!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {players.map((player) => (
                    <div
                      key={player.playerId}
                      className="bg-card border rounded-2xl p-4 text-center transition-shadow animate-in zoom-in-50 duration-300"
                    >
                      <div className="size-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                        {player.nickname.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold truncate">{player.nickname}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Session Details */}
          <div className="space-y-6">
            <Card className="shadow-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Session Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Play mode</span>
                    <span className="font-semibold capitalize">
                      {session.playMode}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Shuffle questions
                    </span>
                    <span className="font-semibold">
                      {session.shuffleQuestions ? "On" : "Off"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">End condition</span>
                    <span className="font-semibold capitalize">
                      {session.endCondition}
                    </span>
                  </div>
                  {session.duration > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{session.duration}s</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Require student accounts
                    </span>
                    <span className="font-semibold">
                      {session.loginRequired ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
