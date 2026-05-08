import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import React from "react";
import { QuestionCardLayout } from "../../shared/question-card-layout";
import { MultipleChoiceQuestion } from "./multiple-choice.schema";

interface Props {
  question: MultipleChoiceQuestion;
}

export const MultipleChoiceViewer: React.FC<Props> = ({ question }) => {
  const options = question.options || [];

  return (
    <QuestionCardLayout title={question.title || "Untitled Question"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => {
            const isCorrect = option.isCorrect;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-md border ${
                  isCorrect
                    ? "border-green-500 bg-green-50 text-green-900"
                    : "border-border bg-background"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={isCorrect ? "font-medium" : ""}>
                  {option.text || "Empty option"}
                </span>
                {isCorrect && (
                  <Badge
                    variant="outline"
                    className="ml-auto border-green-500 text-green-700 bg-green-100"
                  >
                    Correct
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {question.explanation?.text && (
          <div className="text-sm pt-2">
            <span className="font-medium text-muted-foreground">
              Explanation:{" "}
            </span>
            <span className="text-muted-foreground">
              {question.explanation?.text}
            </span>
          </div>
        )}
      </div>
    </QuestionCardLayout>
  );
};
