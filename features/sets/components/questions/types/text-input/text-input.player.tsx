import { TextInputQuestion } from "@/features/sets/set-service";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";

interface Props {
  question: TextInputQuestion;
  isPreview: boolean;
  className?: string;
  onAnswer?: (answer: any) => void;
}

export const TextInputPlayer: React.FC<Props> = ({ 
  question,
  isPreview,
  className
}) => {
  const [value, setValue] = useState("");

  return (
    <QuestionPlayerLayout
      question={question}
      isPreview={isPreview}
      className={className}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="relative group">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your answer here..."
            className="h-20 text-3xl text-center bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 rounded-3xl focus-visible:ring-primary/20 transition-all shadow-xl px-8"
          />
        </div>
        <p className="text-center text-muted-foreground text-lg font-medium animate-pulse">
          Press Enter to submit
        </p>
      </div>
    </QuestionPlayerLayout>
  );
};
