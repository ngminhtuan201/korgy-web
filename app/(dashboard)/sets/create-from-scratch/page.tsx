"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  List,
  ImageIcon,
  Type,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setService,
  CreateSetDto,
  QuestionType,
} from "@/features/sets/set-service";

interface QuestionTypeOption {
  value: QuestionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const questionTypes: QuestionTypeOption[] = [
  {
    value: QuestionType.MULTIPLE_CHOICE,
    label: "Multiple Choice",
    icon: CheckCircle2,
  },
  { value: "true-false", label: "True / False", icon: XCircle },
  { value: "matching", label: "Matching", icon: List },
  { value: "hotspot", label: "Hotspot", icon: ImageIcon },
  { value: "fill-blank", label: "Fill in the blank", icon: Type },
];

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  answer: string;
  options?: string[];
}

export default function CreateSetPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", type: "multiple-choice", question: "", answer: "" },
  ]);

  const addQuestion = (type: QuestionType = "multiple-choice") => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), type, question: "", answer: "" },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (
    id: string,
    field: keyof Question,
    value: string | QuestionType,
  ) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a set name");
      return;
    }

    setIsLoading(true);

    try {
      const dto: CreateSetDto = {
        name: name.trim(),
        description: description.trim() || undefined,
        isPublic,
      };

      const newSet = await setService.createSet(dto);
      router.push(`/sets/${newSet.id}`);
    } catch (error) {
      console.error("Failed to create set:", error);
      alert("Failed to create set. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost"  asChild>
          <Link href="/sets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Playsets
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Create new Playset</h2>
        <p className="text-muted-foreground">Create a new interactive quizzes playset</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="h-48 w-full flex flex-col cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50 group">
              <Upload className="size-7 text-muted-foreground mb-2 group-hover:scale-110" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Click to upload thumbnail
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>
          {/* Left column - Set info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter playset name (required)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isPublic"
                checked={isPublic}
                onCheckedChange={setIsPublic}
                className="bg-secondary"
              />
              <Label htmlFor="isPublic" className="font-normal">
                Make this set public
              </Label>
            </div>
          </div>

          {/* Right column - Thumbnail placeholder */}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus className="mr-1 h-5 w-5" />
              Add Question
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle>Question {index + 1}</CardTitle>
                  <CardAction>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="Enter question title"
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "question",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Answer</Label>
                      <Input
                        placeholder="Enter answer"
                        value={question.answer}
                        onChange={(e) =>
                          updateQuestion(question.id, "answer", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild type="button" size="lg">
            <Link href="/sets">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? "Creating..." : "Create Set"}
          </Button>
        </div>
      </form>
    </div>
  );
}
