import { Button } from "@/components/ui/button";
import { MatchingQuestion } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";

interface Props {
  question: MatchingQuestion;
  isPreview: boolean;
  className?: string;
}

export const MatchingPlayer: React.FC<Props> = ({
  question,
  className,
  isPreview,
}) => {
  const [leftItems, setLeftItems] = useState<any[]>([]);
  const [rightItems, setRightItems] = useState<any[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [connections, setConnections] = useState<Record<number, number>>({});

  useEffect(() => {
    // Shuffle right items to make it a challenge
    setLeftItems(question.pairs.map((p, i) => ({ ...p.left, originalIndex: i })));
    setRightItems(
      question.pairs
        .map((p, i) => ({ ...p.right, originalIndex: i }))
        .sort(() => Math.random() - 0.5)
    );
  }, [question.pairs]);

  const handleLeftClick = (index: number) => {
    setSelectedLeft(selectedLeft === index ? null : index);
  };

  const handleRightClick = (rightOriginalIndex: number) => {
    if (selectedLeft === null) return;

    // Check if this left item was already connected to something else
    const newConnections = { ...connections };
    
    // Find if any other left item was connected to this right item and clear it
    Object.keys(newConnections).forEach((key) => {
      if (newConnections[Number(key)] === rightOriginalIndex) {
        delete newConnections[Number(key)];
      }
    });

    newConnections[selectedLeft] = rightOriginalIndex;
    setConnections(newConnections);
    setSelectedLeft(null);
  };

  return (
    <QuestionPlayerLayout
      question={question}
      className={className}
      isPreview={isPreview}
    >
      <div className="w-full px-4 grid grid-cols-2 gap-12 relative">
        <div className="space-y-4">
          {leftItems.map((item) => {
            const isSelected = selectedLeft === item.originalIndex;
            const isConnected = connections[item.originalIndex] !== undefined;
            return (
              <Button
                key={`left-${item.originalIndex}`}
                variant="outline"
                onClick={() => handleLeftClick(item.originalIndex)}
                className={cn(
                  "w-full h-auto py-6 text-xl rounded-2xl border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : isConnected
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "bg-white dark:bg-zinc-900"
                )}
              >
                {item.text}
              </Button>
            );
          })}
        </div>

        <div className="space-y-4">
          {rightItems.map((item) => {
            const isConnectedTo = Object.keys(connections).find(
              (key) => connections[Number(key)] === item.originalIndex
            );
            const isSelectedRight = isConnectedTo !== undefined;
            
            return (
              <Button
                key={`right-${item.originalIndex}`}
                variant="outline"
                onClick={() => handleRightClick(item.originalIndex)}
                className={cn(
                  "w-full h-auto py-6 text-xl rounded-2xl border-2 transition-all",
                  isSelectedRight
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "bg-white dark:bg-zinc-900",
                  selectedLeft !== null && !isSelectedRight && "hover:border-primary/50 animate-pulse"
                )}
              >
                {item.text}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-muted-foreground animate-bounce">
          {Object.keys(connections).length} of {question.pairs.length} pairs connected
        </p>
        <Button
          size="lg"
          disabled={Object.keys(connections).length < question.pairs.length}
          className="px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Check Answers
        </Button>
      </div>
    </QuestionPlayerLayout>
  );
};
