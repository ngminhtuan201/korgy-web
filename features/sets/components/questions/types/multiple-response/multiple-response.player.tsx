import { Button } from "@/components/ui/button";
import { MultipleResponseQuestion } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";
import Image from "next/image";

interface Props {
  question: MultipleResponseQuestion;
  isPreview: boolean;
  className?: string;
}

export const MultipleResponsePlayer: React.FC<Props> = ({
  question,
  className,
  isPreview,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const toggleOption = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  return (
    <QuestionPlayerLayout
      question={question}
      className={className}
      isPreview={isPreview}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
        {question.options.map((option, index) => {
          const isSelected = selectedIndices.includes(index);
          return (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={() => toggleOption(index)}
              className={cn(
                "h-auto py-4 px-6 text-xl justify-start gap-4 border-2 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-2xl min-h-[80px]",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-primary/50",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  isSelected
                    ? "border-primary-foreground bg-primary-foreground text-primary"
                    : "border-zinc-300 dark:border-zinc-700 bg-transparent",
                )}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex items-center gap-4 text-left">
                {option.imageUrl && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={option.imageUrl}
                      alt={option.text}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <span className="flex-1">{option.text}</span>
              </div>
            </Button>
          );
        })}
      </div>

      {selectedIndices.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Submit
          </Button>
        </div>
      )}
    </QuestionPlayerLayout>
  );
};
