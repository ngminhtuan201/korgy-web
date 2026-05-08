"use client";

import { useState } from "react";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenerateSetPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      topic: formData.get("topic"),
      difficulty: formData.get("difficulty"),
      language: formData.get("language"),
      questionCount: Number(formData.get("questionCount")),
    };

    console.log("Generate Set Data:", data);

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-fit -ml-3 text-muted-foreground"
        >
          <Link href="/sets">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sets
          </Link>
        </Button>
        <div>
          <h2 className="font-[family-name:var(--font-sans)] text-2xl font-semibold text-primary flex items-center gap-2">
            Generate Playset
          </h2>
          <p className="text-muted-foreground mt-1">
            Let our AI create a complete set of questions based on your topic.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Set Configuration</CardTitle>
          <CardDescription>
            Provide the details below to generate your set.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., World War II, React Basics, Space Exploration..."
                required
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Be as specific as you want to get better results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select name="difficulty" defaultValue="medium" required>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionCount">Question Count</Label>
                <Input
                  id="questionCount"
                  name="questionCount"
                  type="number"
                  min={1}
                  max={50}
                  defaultValue={10}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select name="language" defaultValue="English" required>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardFooter className="justify-end gap-2 border-t pt-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/sets">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Playset</>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
