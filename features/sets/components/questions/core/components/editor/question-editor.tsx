import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Question } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  MessageCircleQuestionMark,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { questionRegistry } from "../../question-registry";

interface QuestionEditorProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

export function QuestionEditor({ questions, onChange }: QuestionEditorProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [collapsedIndices, setCollapsedIndices] = useState<number[]>([]);

  const addQuestion = (type: string) => {
    const plugin = questionRegistry[type];
    if (!plugin) return;

    const newQuestion = plugin.default;
    onChange([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, newValue: any) => {
    const updated = [...questions];
    updated[index] = newValue;
    onChange(updated);
  };

  const removeQuestion = (index: number) => {
    onChange(questions.filter((_, i) => i !== index));
    setCollapsedIndices((prev) => prev.filter((i) => i !== index));
  };

  const addExplanation = (index: number) => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      explanation: { text: "Question explanation", duration: 3 },
    };
    onChange(updated);
  };

  const removeExplanation = (index: number) => {
    const updated = [...questions];
    delete updated[index].explanation;
    onChange(updated);
  };

  const duplicateQuestion = (index: number) => {
    const updated = [...questions];
    const duplicated = JSON.parse(JSON.stringify(questions[index]));
    updated.splice(index + 1, 0, duplicated);
    onChange(updated);
  };

  const previewQuestion = (index: number) => {
    setPreviewIndex(index);
  };

  const toggleCollapse = (index: number) => {
    setCollapsedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const collapseAll = () => {
    setCollapsedIndices(questions.map((_, i) => i));
  };

  const expandAll = () => {
    setCollapsedIndices([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold">
            Questions{" "}
            <span className="text-muted-foreground ml-1 font-normal">
              ({questions.length})
            </span>
          </h3>
          {questions.length > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground"
                onClick={collapseAll}
              >
                Collapse all
                <ChevronUp />
              </Button>
              <div className="w-px h-3 bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground"
                onClick={expandAll}
              >
                Expand all
                <ChevronDown />
              </Button>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Plus className="h-5 w-5 mr-2" />
              Add Question
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.keys(questionRegistry).map((key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => addQuestion(key)}
                className="capitalize"
              >
                {key.replace("_", " ")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-xl bg-muted/10">
            <div className="p-4 rounded-full bg-muted/20 w-fit mx-auto mb-4">
              <MessageCircleQuestionMark className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-[280px] mx-auto">
              This playset has no questions yet. Click below to add your first
              question.
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Question
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {Object.keys(questionRegistry).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => addQuestion(key)}
                    className="capitalize text-base py-3"
                  >
                    {key.replace("_", " ")}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, index) => {
              const plugin = questionRegistry[q.type];
              if (!plugin) return null;
              const Editor = plugin.Editor;
              const isCollapsed = collapsedIndices.includes(index);

              return (
                <div
                  key={index}
                  className={cn(
                    "relative border rounded-xl bg-card shadow-sm hover:shadow-md transition-all group/card",
                    isCollapsed ? "p-3" : "p-6",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between",
                      isCollapsed ? "" : "mb-6",
                    )}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => toggleCollapse(index)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-bold text-sm flex-none">
                        {index + 1}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-widest mb-0.5">
                          {q.type.replace("_", " ")}
                        </span>
                        {isCollapsed && (
                          <span className="text-sm font-medium truncate max-w-md">
                            {q.title || (
                              <span className="italic text-muted-foreground">
                                No title
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 group-hover/card:opacity-100 transition-opacity">
                      {!isCollapsed && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9"
                                onClick={() => previewQuestion(index)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview question</TooltipContent>
                          </Tooltip>

                          <div className="w-px h-4 bg-border mx-1" />

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => addExplanation(index)}
                                disabled={!!q.explanation}
                              >
                                <MessageCircleQuestionMark className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Add explanation</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => duplicateQuestion(index)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Duplicate</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeQuestion(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>

                          <div className="w-px h-4 bg-border mx-1" />
                        </>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground"
                        onClick={() => toggleCollapse(index)}
                      >
                        {isCollapsed ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronUp className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <>
                      <div className="relative">
                        <Editor
                          question={q}
                          onChange={(val) => updateQuestion(index, val)}
                        />
                      </div>

                      {/* Common Explanation Editor */}
                      {q?.explanation && (
                        <div className="mt-8 pt-6 border-t space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-semibold flex items-center gap-2">
                                <MessageCircleQuestionMark className="h-4 w-4 text-primary" />
                                Explanation
                              </Label>
                              <div className="flex items-center gap-2 ml-4 bg-muted/50 rounded-lg px-2 py-1">
                                <Input
                                  type="number"
                                  className="w-12 h-7 text-xs border-none bg-transparent focus-visible:ring-0 p-0 text-center font-bold"
                                  value={q.explanation?.duration}
                                  onChange={(e) =>
                                    updateQuestion(index, {
                                      ...q,
                                      explanation: {
                                        ...q.explanation,
                                        duration: Number(e.target.value),
                                      },
                                    })
                                  }
                                  min={0}
                                  max={60}
                                />
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                  sec
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeExplanation(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Explain why this answer is correct..."
                            value={q.explanation?.text || ""}
                            onChange={(e) =>
                              updateQuestion(index, {
                                ...q,
                                explanation: {
                                  ...q.explanation,
                                  text: e.target.value,
                                },
                              })
                            }
                            className="min-h-[80px] bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={previewIndex !== null}
        onOpenChange={(open) => !open && setPreviewIndex(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-none sm:max-w-none w-screen h-screen p-0 m-0 border-none rounded-none bg-zinc-50 dark:bg-zinc-950 overflow-hidden fixed inset-0 translate-x-0 translate-y-0 top-0 left-0 z-[100] !animate-none"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Question Preview</DialogTitle>
          </DialogHeader>
          <div className="absolute top-6 right-6 z-50">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-2xl h-12 w-12 hover:scale-110 transition-transform bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800"
              onClick={() => setPreviewIndex(null)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          {previewIndex !== null && (
            <div className="w-full h-full">
              {(() => {
                const q = questions[previewIndex];
                const plugin = questionRegistry[q.type];
                if (!plugin) return null;
                const Player = plugin.Player;
                return <Player question={q} isPreview={true} />;
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
