import { Badge } from "@/components/ui/badge";
import React from "react";
import { QuestionCardLayout } from "../../shared/question-card-layout";
import { TrueFalseQuestion } from "./true-false.schema";

interface Props {
  question: TrueFalseQuestion;
}

export const TrueFalseViewer: React.FC<Props> = ({ question }) => {
  return (
    <QuestionCardLayout title={question.title || "Untitled Question"}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Answer:
          </span>
          <Badge variant={question.answer ? "default" : "secondary"}>
            {question.answer
              ? question.trueOption.title || "True"
              : question.falseOption.title || "False"}
          </Badge>
        </div>

        {question.explanation && (
          <div className="text-sm">
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
