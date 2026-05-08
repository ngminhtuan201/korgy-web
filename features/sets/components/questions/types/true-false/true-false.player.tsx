import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";
import { TrueFalseQuestion } from "./true-false.schema";
import Image from "next/image";

interface Props {
  question: TrueFalseQuestion;
  isPreview: boolean;
  className?: string;
}

export const TrueFalsePlayer: React.FC<Props> = ({
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-5xl mx-auto">
        {/* True Option */}
        <Button
          variant="outline"
          className={cn(
            "h-auto min-h-[160px] md:min-h-[240px] text-2xl md:text-4xl font-black flex flex-col gap-6 border-4 border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all duration-500 group rounded-[2.5rem] overflow-hidden relative p-8",
          )}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-8 w-full justify-center">
            <div className="bg-emerald-500/10 p-5 rounded-full group-hover:scale-110 transition-transform shadow-inner">
              <Check className="h-10 w-10 md:h-16 md:w-16 text-emerald-600 dark:text-emerald-400" />
            </div>
            {question.trueOption.imageUrl && (
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-500/20">
                <Image
                  src={question.trueOption.imageUrl}
                  alt="True"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
          <span className="tracking-tight">{question.trueOption.title || "True"}</span>
        </Button>

        {/* False Option */}
        <Button
          variant="outline"
          className={cn(
            "h-auto min-h-[160px] md:min-h-[240px] text-2xl md:text-4xl font-black flex flex-col gap-6 border-4 border-rose-500/20 hover:border-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-all duration-500 group rounded-[2.5rem] overflow-hidden relative p-8",
          )}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500 opacity-20 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-8 w-full justify-center">
            <div className="bg-rose-500/10 p-5 rounded-full group-hover:scale-110 transition-transform shadow-inner">
              <X className="h-10 w-10 md:h-16 md:w-16 text-rose-600 dark:text-rose-400" />
            </div>
            {question.falseOption.imageUrl && (
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-rose-500/20">
                <Image
                  src={question.falseOption.imageUrl}
                  alt="False"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
          <span className="tracking-tight">{question.falseOption.title || "False"}</span>
        </Button>
      </div>
    </QuestionPlayerLayout>
  );
};
