"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sessionService,
  Session,
  SessionStatus,
  SessionGame,
} from "@/features/sessions/session-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  History,
  ChevronRight,
  Calendar,
  Users,
  Trophy,
  Gamepad2,
  Clock,
  MoreVertical,
  Plus,
  CirclePlay,
  List,
  ChartColumn,
  Trash2,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await sessionService.getSessions({ pageSize: 50 });
        setSessions(data.items);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case SessionStatus.WAITING:
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          >
            Waiting
          </Badge>
        );
      case SessionStatus.ACTIVE:
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
            Active
          </Badge>
        );
      case SessionStatus.FINISHED:
        return (
          <Badge
            variant="outline"
            className="text-muted-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          >
            Finished
          </Badge>
        );
      default:
        return null;
    }
  };

  const getGameIcon = (game: SessionGame) => {
    switch (game) {
      case SessionGame.QUIZ:
        return <Trophy className="size-8" />;
      case SessionGame.WHACK_A_BUG:
        return <Gamepad2 className="size-8" />;
      case SessionGame.CHICKEN_TOSS:
        return <CirclePlay className="size-8" />;
      default:
        return <Gamepad2 className="size-8" />;
    }
  };

  const handleRowClick = (session: Session) => {
    if (session.status === SessionStatus.FINISHED) {
      router.push(`/sessions/${session.id}/results`);
    } else {
      router.push(`/sessions/${session.id}/lobby`);
    }
  };

  const filteredSessions = sessions.filter(
    (session) =>
      session.set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.joinCode.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Session History
          </h1>
          <p className="text-muted-foreground">
            Review your past performances and manage active game lobbies.
          </p>
        </div>

        <div className="relative w-full sm:w-72 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search playset or join code..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-[2rem]" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="rounded-[3rem] border-2 border-dashed bg-muted/20 py-16 text-center border-muted-foreground/20">
          <CardContent className="space-y-6">
            <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <History className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No sessions found</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                You haven&apos;t hosted any games yet. Choose a playset and
                start your first session!
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => router.push("/sets")}
              variant="outline"
            >
              <List className="mr-2 h-5 w-5" />
              Browse Playsets
            </Button>
          </CardContent>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="rounded-[3rem] border-2 border-dashed bg-muted/20 py-16 text-center border-muted-foreground/20">
          <CardContent className="space-y-4">
            <div className="size-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                We couldn&apos;t find any sessions matching &quot;{searchQuery}
                &quot;
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSearchQuery("")}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              Clear search
            </Button>
          </CardContent>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => handleRowClick(session)}
              className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 bg-card border border-muted/60 rounded-[2rem] p-6 transition-all hover:shadow-xl hover:border-primary/30 cursor-pointer active:scale-[0.99]"
            >
              {/* Game Icon/Thumbnail */}
              <div
                className={cn(
                  "size-16 rounded-[1.25rem] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 shadow-sm",
                  session.status === SessionStatus.ACTIVE
                    ? "bg-secondary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {getGameIcon(session.game)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold text-xl truncate tracking-tight">
                    {session.set.name}
                  </h3>
                  {getStatusBadge(session.status)}
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(session.createdAt), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4" />
                    <span className="capitalize">
                      {session.game.replace("-", " ")}
                    </span>
                  </div>
                  {session.duration > 0 && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {session.duration}s
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-10 px-4 w-full md:w-auto justify-between md:justify-end">
                {/* Join Code for Waiting/Active */}
                {(session.status === SessionStatus.WAITING ||
                  session.status === SessionStatus.ACTIVE) && (
                  <div className="text-center bg-muted/40 px-4 py-2 rounded-2xl border border-muted-foreground/10">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">
                      Join Code
                    </p>
                    <p className="text-2xl font-black text-primary tracking-tighter leading-none">
                      {session.joinCode}
                    </p>
                  </div>
                )}

                {/* Player count placeholder */}
                <div className="text-center">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">
                    Players
                  </p>
                  <div className="flex items-center justify-center gap-1.5 font-black text-lg">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>--</span>
                  </div>
                </div>

                {/* Action Arrow */}
                <div className="hidden md:flex items-center justify-center size-10 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </div>

              {/* Options Dropdown */}
              <div className="absolute top-4 right-4 md:static">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-muted"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/sessions/${session.id}/results`)
                      }
                    >
                      <ChartColumn className="h-5 w-5 mr-2" />
                      Report
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-5 w-5 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
