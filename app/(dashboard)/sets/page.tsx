"use client";

import { Plus, Search, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SetCard } from "@/features/sets/components/set-card";
import { Set, setService } from "@/features/sets/set-service";

export default function SetsPage() {
  const router = useRouter();
  const [sets, setSets] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const data = await setService.getSets();
        setSets(data);
      } catch (error) {
        console.error("Failed to fetch sets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSets();
  }, []);

  const filteredSets = sets.filter(
    (set) =>
      set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    try {
      await setService.deleteSet(id);
      setSets(sets.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete set:", error);
    }
  };

  const handleClick = async (id: string) => {
    router.push(`/sets/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-sans)] text-2xl font-semibold text-primary">
            My Playsets
          </h2>
          <p className="text-muted-foreground">
            Manage, host, and play your interactive quizzes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild size="lg">
            <Link href="/sets/import">
              <Upload className="h-5 w-5 mr-1" />
              Import
            </Link>
          </Button>
          <Button asChild size={"lg"} variant={"secondary"}>
            <Link href="/sets/create-from-scratch">
              <Plus className="h-5 w-5 mr-1" />
              Create from scratch
            </Link>
          </Button>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredSets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No sets found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query"
              : "Get started by creating your first set"}
          </p>
          {!searchQuery && (
            <Button className="mt-4" asChild size="lg" variant={"secondary"}>
              <Link href="/sets/create-from-scratch">
                <Plus className="mr-1 h-5 w-5" />
                Create Set
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSets.map((set) => (
            <SetCard
              key={set.id}
              set={set}
              onClick={() => handleClick(set.id)}
              onEdit={() => handleClick(set.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

