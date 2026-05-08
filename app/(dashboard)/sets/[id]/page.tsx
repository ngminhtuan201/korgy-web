"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditSetDialog } from "@/features/sets/components/dialogs/edit-set-dialog";
import { QuestionEditor } from "@/features/sets/components/questions";
import { Question, Set, setService } from "@/features/sets/set-service";
import { ArrowLeft, Check, Globe, Lock, Save, SquarePen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SetDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [set, setSet] = useState<Set | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const data = await setService.getSet(id);
        setSet(data);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Failed to fetch set:", err);
        setError("Failed to load set");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSet();
  }, [id]);

  const handleSaveSet = async () => {
    if (!set) return;

    setIsSaving(true);
    try {
      await setService.updateSet(set.id, { questions });
      toast.success("Playset saved successfully!", {
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
      router.refresh();
    } catch (err) {
      console.error("Failed to save set:", err);
      toast.error("Failed to save playset");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !set) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold">Playset not found</h3>
        <p className="text-muted-foreground max-w-xs mx-auto mt-2">
          {error || "The set you're looking for doesn't exist or is private."}
        </p>
        <Button variant={"outline"} className="mt-8" asChild size={"lg"}>
          <Link href="/sets">Back to Playsets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="-ml-2">
            <Link href="/sets">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Playsets
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-sm overflow-hidden relative">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold tracking-tight">
                  {set.name}
                </h1>
                {set.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {set.description}
                  </p>
                )}
              </div>
              <EditSetDialog
                set={set}
                onSave={(data) => setSet({ ...set, ...data })}
              >
                <Button variant="outline">
                  <SquarePen className="mr-2 h-5 w-5" /> Edit
                </Button>
              </EditSetDialog>
            </div>
            {/* 
            <Badge variant={"secondary"} className="py-3">
              {set.isPublic ? (
                <>
                  <Globe />
                  Public
                </>
              ) : (
                <>
                  <Lock /> Private
                </>
              )}
            </Badge> */}
          </div>
        </div>

        <QuestionEditor questions={questions} onChange={setQuestions} />
      </div>

      {/* Sticky Footer */}
      <div className="w-full border-t py-4 mt-8 sticky bottom-0 left-0 right-0 bg-background">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-sm text-muted-foreground">
              Last saved at: {new Date(set.updatedAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="flex-1 sm:flex-none"
            >
              <Link href="/sets">Cancel</Link>
            </Button>
            <Button
              size="lg"
              onClick={handleSaveSet}
              disabled={isSaving}
              className="flex-1 sm:flex-none"
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-1 h-5 w-5" /> Save Playset
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
