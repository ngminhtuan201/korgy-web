import React from "react";
import { QuestionCardLayout } from "../../shared/question-card-layout";
import { OrderingQuestion } from "@/features/sets/set-service";
import Image from "next/image";

interface Props {
  question: OrderingQuestion;
}

export const OrderingViewer: React.FC<Props> = ({ question }) => {
  const items = question.items || [];

  return (
    <QuestionCardLayout title={question.title || "Untitled Question"}>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          Correct Order:
        </p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
            >
              <div className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {index + 1}
              </div>

              {item.imageUrl && (
                <div className="relative h-12 w-12 rounded-md overflow-hidden shrink-0 border">
                  <Image
                    src={item.imageUrl}
                    alt={item.text}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <span className="font-medium">{item.text}</span>
            </div>
          ))}
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
