import { FillBlanksQuestion } from "@/features/sets/set-service";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";

interface Props {
  question: FillBlanksQuestion;
  isPreview: boolean;
  className?: string;
  onAnswer?: (answer: any) => void;
}

export const FillBlanksPlayer: React.FC<Props> = ({ 
  question,
  isPreview,
  className
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const parts = question.parts || [];

  return (
    <QuestionPlayerLayout
      question={question}
      isPreview={isPreview}
      className={className}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-y-6 gap-x-3 items-baseline justify-center leading-relaxed bg-white/50 dark:bg-zinc-900/50 p-12 rounded-[3rem] border-2 border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-xl">
          {parts.map((part, index) => (
            part.type === "text" ? (
              <span key={index} className="text-3xl font-medium text-zinc-800 dark:text-zinc-200">{part.content}</span>
            ) : (
              <Input
                key={index}
                value={answers[index] || ""}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                className="inline-block w-48 h-14 text-2xl text-center border-b-4 border-t-0 border-x-0 rounded-none focus-visible:ring-0 px-4 bg-primary/5 border-primary/30 focus:border-primary transition-colors"
                placeholder="..."
              />
            )
          ))}
        </div>
        
        <p className="text-center text-zinc-500 dark:text-zinc-400 mt-8 text-lg font-medium animate-pulse">
          Fill in the blanks to complete the sentence.
        </p>
      </div>
    </QuestionPlayerLayout>
  );
};
