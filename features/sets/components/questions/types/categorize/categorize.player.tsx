import { CategorizeQuestion } from "@/features/sets/set-service";
import React from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";
import { cn } from "@/lib/utils";

interface Props {
  question: CategorizeQuestion;
  isPreview: boolean;
  className?: string;
  onAnswer?: (answer: any) => void;
}

export const CategorizePlayer: React.FC<Props> = ({ 
  question,
  isPreview,
  className
}) => {
  return (
    <QuestionPlayerLayout
      question={question}
      isPreview={isPreview}
      className={className}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {question.categories.map((category, index) => (
          <div 
            key={index} 
            className="min-h-[250px] border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] flex flex-col items-center p-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm relative group transition-all hover:border-primary/30"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-lg shadow-lg">
              {category.title}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {/* Items would be dropped here in a real player */}
            </div>
            
            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 mt-auto uppercase tracking-widest">
              Drop items here
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg italic">
          Categorize Player coming soon with Drag & Drop support.
        </p>
      </div>
    </QuestionPlayerLayout>
  );
};
