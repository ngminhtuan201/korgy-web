import { Button } from "@/components/ui/button";
import { MultipleChoiceQuestion } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";

interface Props {
  question: MultipleChoiceQuestion;
  isPreview: boolean;
  className?: string;
}

export const MultipleChoicePlayer: React.FC<Props> = ({
  question,
  className,
  isPreview,
}) => {
  return (
    <QuestionPlayerLayout
      question={question}
      className={className}
      isPreview={isPreview}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "h-auto min-h-[80px] p-4 flex items-center justify-start gap-4 text-left text-lg font-medium border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 rounded-2xl group",
            )}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {String.fromCharCode(65 + index)}
            </div>
            <div className="flex-1 flex items-center gap-4">
              {option.imageUrl && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
        ))}
      </div>
    </QuestionPlayerLayout>
  );
};
