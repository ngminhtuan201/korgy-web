import { Button } from "@/components/ui/button";
import { OrderingQuestion } from "@/features/sets/set-service";
import { cn } from "@/lib/utils";
import { Reorder } from "motion/react";
import { GripVertical } from "lucide-react";
import React, { useState, useEffect } from "react";
import { QuestionPlayerLayout } from "../../shared/question-player-layout";
import Image from "next/image";

interface Props {
  question: OrderingQuestion;
  isPreview: boolean;
  className?: string;
}

export const OrderingPlayer: React.FC<Props> = ({
  question,
  className,
  isPreview,
}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Shuffle items for the player
    const shuffled = [...question.items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [question.items]);

  return (
    <QuestionPlayerLayout
      question={question}
      className={className}
      isPreview={isPreview}
    >
      <div className="w-full mx-auto px-4 space-y-4">
        <p className="text-center text-muted-foreground mb-4">
          Drag and drop items to put them in the correct order.
        </p>

        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="space-y-3"
        >
          {items.map((item, index) => (
            <Reorder.Item
              key={item.text}
              value={item}
              className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
            >
              <GripVertical className="h-6 w-6 text-zinc-400 shrink-0" />

              {item.imageUrl && (
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 border">
                  <Image
                    src={item.imageUrl}
                    alt={item.text}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex-1 text-xl font-medium">{item.text}</div>
              <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-sm">
                {index + 1}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Submit
          </Button>
        </div>
      </div>
    </QuestionPlayerLayout>
  );
};
