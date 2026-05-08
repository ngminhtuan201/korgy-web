import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Lock, Pencil, Play, Star, Trash } from "lucide-react";
import Link from "next/link";
import { Set } from "../set-service";

interface Props {
  set: Set;
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function SetCard({ set, onEdit, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:border hover:border-secondary/50 cursor-pointer h-full flex flex-col">
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle className="line-clamp-2 text-lg flex items-center justify-between">
                <Link
                  href={`/sets/${set.id}`}
                  className="hover:text-primary transition-colors group-hover:text-secondary"
                >
                  {set.name}
                </Link>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        className={cn(
                          "group-hover:visible",
                          set.isFavorite ? "visible" : "invisible",
                        )}
                        variant={"ghost"}
                        size="icon"
                      >
                        <Star
                          className="size-5 transition-colors"
                          fill={set.isFavorite ? "#ffd250" : "none"}
                          color={set.isFavorite ? "#ffd250" : "currentColor"}
                        />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>Add to favorite</TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                {set?.description || (
                  <i className="opacity-50">No description provided</i>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-3 py-1"
            >
              {set.isPublic ? (
                <>
                  <Globe className="h-3.5 w-3.5" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Private
                </>
              )}
            </Badge>
            {set.thumbnailUrl && (
              <Badge variant="outline" className="px-3 py-1">
                Image
              </Badge>
            )}
            <Badge variant="outline" className="px-3 py-1">
              {set.questions.length} questions
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span>Questions</span>
              <span className="font-medium text-foreground">
                {set.questions.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last modified</span>
              <span className="font-medium text-foreground">1 hour ago</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t bg-muted/5">
          <div className="w-full space-y-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="w-full py-6 text-lg font-semibold bg-[#3d348b] hover:bg-[#4d449b] text-white transition-all"
              >
                <Link href={`/host?setId=${set.id}`}>
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Host
                </Link>
              </Button>
            </motion.div>
            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(set.id);
                }}
                size={"lg"}
                variant={"outline"}
                className="flex-1 h-10"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <DeleteSetDialog set={set} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function DeleteSetDialog({ set }: { set: Set }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="flex-1 h-10" variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Delete &quot;{set.name}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This action cannot be undone. This will permanently delete your
            playset and all its questions from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2">
          <AlertDialogCancel className="rounded-xl h-11">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            className="rounded-xl h-11"
          >
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
