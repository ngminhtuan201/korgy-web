import { CategorizeQuestion } from "@/features/sets/set-service";
import React from "react";

interface Props {
  question: CategorizeQuestion;
}

export const CategorizeViewer: React.FC<Props> = ({ question }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">{question.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.categories.map((category, catIndex) => (
          <div key={catIndex} className="border rounded-xl p-4 bg-muted/30">
            <h4 className="font-bold text-primary mb-3 border-b pb-2">{category.title}</h4>
            <ul className="space-y-1">
              {category.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm bg-card p-2 rounded border shadow-sm flex items-center gap-2"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.text || ""}
                      className="h-8 w-8 rounded object-cover flex-none"
                    />
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
