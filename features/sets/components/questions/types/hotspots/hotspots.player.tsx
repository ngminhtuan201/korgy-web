import { HotspotsQuestion } from "@/features/sets/set-service";
import React from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";

interface Props {
  question: HotspotsQuestion;
  isPreview: boolean;
  className?: string;
  onAnswer?: (answer: any) => void;
}

export const HotspotsPlayer: React.FC<Props> = ({ 
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
      <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl mx-auto">
        <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400 italic">
          Click on the correct areas on the image.
        </p>
        
        {/* Note: In Hotspots, the image is already handled by QuestionPlayerLayout if we pass it correctly, 
            but for Hotspots the image IS the question. 
            So we might want to keep the image here or let the layout handle it.
            Currently, layout handles (question as any).imageUrl.
        */}
        
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-[2.5rem] shadow-2xl border-4 border-zinc-200 dark:border-zinc-800">
           <p className="p-8 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest animate-pulse">
             Hotspots Interaction Layer coming soon...
           </p>
        </div>
      </div>
    </QuestionPlayerLayout>
  );
};
