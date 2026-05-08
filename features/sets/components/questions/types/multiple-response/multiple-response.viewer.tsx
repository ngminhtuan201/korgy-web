import React from "react";
import { QuestionCardLayout } from "../../shared/question-card-layout";
import { MultipleResponseQuestion } from "@/features/sets/set-service";

interface Props {
  question: MultipleResponseQuestion;
}

export const MultipleResponseViewer: React.FC<Props> = ({ question }) => {
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
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border ${
                    isCorrect
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isCorrect && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
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
              {question.explanation.text}
            </span>
          </div>
        )}
      </div>
    </QuestionCardLayout>
  );
};
