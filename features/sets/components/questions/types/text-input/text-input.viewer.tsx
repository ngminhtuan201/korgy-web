import { TextInputQuestion } from "@/features/sets/set-service";
import React from "react";

interface Props {
  question: TextInputQuestion;
}

export const TextInputViewer: React.FC<Props> = ({ question }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{question.title}</h3>
      {question.imageUrl && (
        <div className="relative max-w-sm aspect-video rounded-lg overflow-hidden border">
          <img
            src={question.imageUrl}
            alt="Question"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Accepted Answers:
        </p>
        <div className="flex flex-wrap gap-2">
          {question.correctAnswers.map((answer, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full border border-primary/20 text-sm"
            >
              {answer}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
