import React from "react";
import { QuestionCardLayout } from "../../shared/question-card-layout";
import { MatchingQuestion } from "@/features/sets/set-service";

interface Props {
  question: MatchingQuestion;
}

export const MatchingViewer: React.FC<Props> = ({ question }) => {
  const pairs = question.pairs || [];

  return (
    <QuestionCardLayout title={question.title || "Untitled Question"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8 relative">
          {/* Connector line could go here if we want to be fancy */}
          <div className="space-y-2">
            {pairs.map((pair, index) => (
              <div
                key={`left-${index}`}
                className="p-3 border rounded-lg bg-muted/30 text-center font-medium"
              >
                {pair.left.text}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {pairs.map((pair, index) => (
              <div
                key={`right-${index}`}
                className="p-3 border rounded-lg bg-primary/10 border-primary/20 text-center font-medium"
              >
                {pair.right.text}
              </div>
            ))}
          </div>
        </div>

        {question.explanation?.text && (
          <div className="text-sm pt-4 border-t mt-4">
            <span className="font-medium text-muted-foreground">
              Explanation:{" "}
            </span>
            <span className="text-muted-foreground">
              {question.explanation.text}
            </span>
          </div>
        )}
      </div>
    </QuestionCardLayout>
  );
};
