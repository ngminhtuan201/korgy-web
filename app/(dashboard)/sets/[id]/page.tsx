"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Globe,
  Lock,
  Play,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { setService, Set } from "@/features/sets/set-service";

export default function SetDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [set, setSet] = useState<Set | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const data = await setService.getSet(id);
        setSet(data);
      } catch (err) {
        console.error("Failed to fetch set:", err);
        setError("Failed to load set");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSet();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this set?")) return;

    try {
      await setService.deleteSet(id);
      window.location.href = "/sets";
    } catch (err) {
      console.error("Failed to delete set:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !set) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-semibold">Set not found</h3>
        <p className="text-sm text-muted-foreground">
          {error || "The set you're looking for doesn't exist"}
        </p>
        <Button variant={"outline"} className="mt-4" asChild size={"lg"}>
          <Link href="/sets">Back to Sets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" asChild>
          <Link href="/sets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Playsets
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/sets/${id}/edit`}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant={"secondary"}>
            <Play className="mr-1 h-4 w-4" fill="currentColor" />
            Play
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{set.name}</h1>
            {set.description && (
              <p className="mt-2 text-muted-foreground">{set.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={"outline"}>
              {set.isPublic ? (
                <>
                  <Globe className="mr-1 h-3 w-3" />
                  Public
                </>
              ) : (
                <>
                  <Lock /> Private
                </>
              )}
            </Badge>
            <Badge variant="outline">{set.questions.length} questions</Badge>
          </div>
        </div>
      </div>

      {set.questions.length > 0 ? (
        <div className="rounded-lg border">
          <div className="border-b p-4">
            <h2 className="font-semibold">Questions</h2>
          </div>
          <div className="divide-y">
            {set.questions.map((question: unknown, index: number) => (
              <div key={index} className="flex items-center gap-4 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                  {index + 1}
                </span>
                <span className="flex-1">
                  {(question as { question?: string }).question || "Question"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">
            No questions yet. Add some questions to get started.
          </p>
          <Button variant={"outline"} className="mt-4" asChild>
            <Link href={`/sets/${id}/edit`}>
              <Plus />
              Add Questions
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
