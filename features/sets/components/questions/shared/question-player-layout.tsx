import { Question } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  question: Question;
  className?: string;
  children: React.ReactNode; // Player của mỗi loại câu hỏi
  isPreview: boolean;
}

export const QuestionPlayerLayout: React.FC<Props> = ({
  question,
  children,
  className,
  isPreview,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-screen flex flex-col items-center justify-center gap-12 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900",
        className,
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      {/* Progress / Info bar (Optional, can be expanded later) */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm font-bold text-primary">
            PREVIEW MODE
          </div>
        </div>
      </div>

      {/* Question Main Stage */}
      <div className="w-full max-w-5xl space-y-10 text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* Question Title */}
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1] drop-shadow-sm px-4">
          {question.title || "Untitled Question"}
        </h2>

        {/* Question Image (If available) */}
        {(question as any).imageUrl && (
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white dark:border-zinc-900 shadow-2xl bg-white dark:bg-zinc-900">
              <img
                src={(question as any).imageUrl}
                alt={question.title}
                className="w-full h-auto max-h-[40vh] object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Divider / Accent */}
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-lg shadow-primary/20" />
      </div>

      {/* Answer Options / Interactivity Stage */}
      <div className="w-full max-w-6xl z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 ease-out px-4">
        {children}
      </div>
    </div>
  );
};
