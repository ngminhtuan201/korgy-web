"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateSetDialog } from "@/features/sets/components/dialogs/create-set-dialog";
import { SetCard } from "@/features/sets/components/set-card";
import { Set, setService } from "@/features/sets/set-service";
import { Plus, Search, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
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
          <CreateSetDialog>
            <Button size={"lg"} variant={"secondary"}>
              <Plus className="h-5 w-5 mr-1" />
              Create
            </Button>
          </CreateSetDialog>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full flex items-center justify-end"
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Search sets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </motion.div>
        ) : filteredSets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-3xl bg-muted/30"
          >
            <div className="rounded-full bg-muted p-6 mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No sets found</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              {searchQuery
                ? "We couldn't find any sets matching your search. Try a different keyword."
                : "Your collection is empty. Start by creating your very first playset!"}
            </p>
            {!searchQuery && (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" asChild size="lg">
                  <Link href="/sets/import">
                    <Upload className="h-5 w-5 mr-1" />
                    Import
                  </Link>
                </Button>
                <CreateSetDialog>
                  <Button size={"lg"} variant={"secondary"}>
                    <Plus className="h-5 w-5 mr-1" />
                    Create
                  </Button>
                </CreateSetDialog>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSets.map((set) => (
              <motion.div key={set.id} variants={itemVariants}>
                <SetCard
                  set={set}
                  onClick={() => handleClick(set.id)}
                  onEdit={() => handleClick(set.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
