import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MatchingQuestion } from "@/features/sets/set-service";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import React from "react";
import { QuestionTitleInput } from "../../core/question-title-input";

const MAX_PAIRS = 6;

interface Props {
  question: MatchingQuestion;
  onChange: (value: MatchingQuestion) => void;
}

interface PairProps {
  pair: Pair;
  onUpdateText: (text: string) => void;
}

export const MatchingEditor: React.FC<Props> = ({ question, onChange }) => {
  const pairs = question.pairs || [];

  const updateItemText = (
    index: number,
    side: "left" | "right",
    text: string,
  ) => {
    const newPairs = [...pairs];
    newPairs[index] = {
      ...newPairs[index],
      [side]: { ...newPairs[index][side], text },
    };
    onChange({ ...question, pairs: newPairs });
  };

  const addPair = () => {
    if (pairs.length >= MAX_PAIRS) return;
    onChange({
      ...question,
      pairs: [
        ...pairs,
        {
          left: { text: "" },
          right: { text: "" },
        },
      ],
    });
  };

  const removePair = (index: number) => {
    if (pairs.length <= 1) return;
    const newPairs = pairs.filter((_, i) => i !== index);
    onChange({ ...question, pairs: newPairs });
  };

  return (
    <div className="space-y-4">
      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      <div className="space-y-3">
        {pairs.map((pair, index) => (
          <div
            key={index}
            className="group relative flex items-center gap-2 p-3 bg-card border rounded-lg transition-colors"
          >
            <div className="grid grid-cols-2 flex-1">
              <div className="flex items-center gap-2 border-r border-dashed pr-2">
                <Input
                  value={pair.left.text}
                  onChange={(e) =>
                    updateItemText(index, "left", e.target.value)
                  }
                  placeholder="Enter left text here"
                  className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 font-medium"
                />
                <Button size="sm" variant="outline">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  Image
                </Button>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <Input
                  value={pair.right.text}
                  onChange={(e) =>
                    updateItemText(index, "right", e.target.value)
                  }
                  placeholder="Enter right text here"
                  className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 font-medium"
                />
                <Button size="sm" variant="outline">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  Image
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePair(index)}
              disabled={pairs.length <= 2}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={addPair}
        variant="outline"
        className="w-full border-dashed py-6"
        disabled={pairs.length >= MAX_PAIRS}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add pair
      </Button>
    </div>
  );
};

function Pair() {}
