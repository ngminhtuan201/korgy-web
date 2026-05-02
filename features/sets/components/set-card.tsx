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
import { Globe, Lock, Pencil, Play, Star, Trash } from "lucide-react";
import Link from "next/link";
import { Set } from "../set-service";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SetCardProps {
  set: Set;
  onClick?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function SetCard({ set, onEdit, onClick }: SetCardProps) {
  return (
    <Card
      onClick={() => onClick}
      className="group relative overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
    >
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
                <TooltipTrigger>
                  <Button
                    className={cn("group-hover:visible", set.isFavorite ? "visible" : "invisible")}
                    variant={"ghost"}
                    size="icon"
                  >
                    <Star className="size-5" fill={set.isFavorite ? "#ffd250" : "#ffd250"} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add to favorite</TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {set?.description || <i>No description</i>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="flex items-center gap-1 hidden">
          {set.isPublic ? (
            <>
              <Globe className="h-3 w-3" />
              Public
            </>
          ) : (
            <>
              <Lock />
              Private
            </>
          )}
        </Badge>

        {set.thumbnailUrl && <Badge variant="outline">Has Thumbnail</Badge>}
        <p>Total questions: {set.questions.length}</p>
        <p>Last edited: a hour ago</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex-col">
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="w-full py-6 text-xl"
          >
            <Link href={`/sets/${set.id}`}>
              <Play className="mr-1 h-4 w-4" fill="currentColor" />
              Host
            </Link>
          </Button>
          <div className="flex items-center mt-2 gap-1">
            <Button
              onClick={() => onEdit}
              size={"lg"}
              variant={"outline"}
              className="flex-1"
            >
              <Pencil />
              Edit
            </Button>
            <DeleteSetDialog set={set} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function DeleteSetDialog({ set }: { set: Set }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="flex-1" variant="destructive">
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{set.name}&quot; playset?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            playset from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
