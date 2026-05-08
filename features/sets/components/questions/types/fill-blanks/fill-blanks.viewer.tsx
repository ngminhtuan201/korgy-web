import { FillBlanksQuestion } from "@/features/sets/set-service";
import React from "react";

interface Props {
  question: FillBlanksQuestion;
}

export const FillBlanksViewer: React.FC<Props> = ({ question }) => {
  const parts = question.parts || [];

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">{question.title}</h3>
      <div className="flex flex-wrap gap-1 items-baseline p-4 bg-muted/30 rounded-lg">
        {parts.map((part, index) => (
          part.type === "text" ? (
            <span key={index}>{part.content}</span>
          ) : (
            <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary font-bold rounded border border-primary/20">
              {part.content}
            </span>
          )
        ))}
      </div>
    </div>
  );
};
