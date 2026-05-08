import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { questionRegistry } from "./questions/core/question-registry";

interface QuestionsOutlinePanelProps {
  questions?: any[];
  onAddQuestion?: (type: string) => void;
  onSelectQuestion?: (index: number) => void;
  activeQuestionIndex?: number;
}

export function QuestionsOutlinePanel({
  questions = [],
  onAddQuestion,
  onSelectQuestion,
  activeQuestionIndex,
}: QuestionsOutlinePanelProps) {
  const renderDropdownContent = () => (
    <DropdownMenuContent align="end">
      {Object.keys(questionRegistry).map((key) => (
        <DropdownMenuItem key={key} onClick={() => onAddQuestion?.(key)}>
          {key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Outline</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add group</span>
          </Button>
        </div>

        {questions.length === 0 ? (
          /* Empty state */
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4 text-sm">
              No question yet. Add your first question to get started.
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 px-4">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Question
                </Button>
              </DropdownMenuTrigger>
              {renderDropdownContent()}
            </DropdownMenu>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
              {questions.map((q, index) => (
                <div
                  key={q.id || index}
                  onClick={() => onSelectQuestion?.(index)}
                  className={`p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                    activeQuestionIndex === index
                      ? "border-primary bg-primary/5"
                      : "bg-background hover:bg-accent"
                  }`}
                >
                  <div className="font-medium flex items-center gap-2">
                    <span className="text-muted-foreground">{index + 1}.</span>
                    <span className="truncate">
                      {q.question || q.title || "Untitled Question"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {q.type.replace("_", " ")}
                  </div>
                </div>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Question
                </Button>
              </DropdownMenuTrigger>
              {renderDropdownContent()}
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
