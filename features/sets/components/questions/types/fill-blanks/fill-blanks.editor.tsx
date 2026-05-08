import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FillBlanksQuestion } from "@/features/sets/set-service";
import { Plus, Trash2, Type } from "lucide-react";
import React from "react";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: FillBlanksQuestion;
  onChange: (value: FillBlanksQuestion) => void;
}

export const FillBlanksEditor: React.FC<Props> = ({ question, onChange }) => {
  const parts = question.parts || [];

  const updatePart = (index: number, content: string) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], content };
    onChange({ ...question, parts: newParts });
  };

  const addPart = (type: "text" | "blank") => {
    onChange({
      ...question,
      parts: [...parts, { type, content: "" }],
    });
  };

  const removePart = (index: number) => {
    const newParts = parts.filter((_, i) => i !== index);
    onChange({ ...question, parts: newParts });
  };

  return (
    <div className="space-y-6">
      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      <div className="space-y-4 bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-y-4 gap-x-2 items-center">
          {parts.map((part, index) => (
            <div key={index} className="flex items-center gap-1 group relative">
              {part.type === "text" ? (
                <Input
                  value={part.content}
                  onChange={(e) => updatePart(index, e.target.value)}
                  placeholder="Type text..."
                  className="min-w-[80px] w-auto h-10 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 text-lg"
                  style={{ width: `${Math.max(part.content.length, 5) + 2}ch` }}
                />
              ) : (
                <div className="relative">
                  <Input
                    value={part.content}
                    onChange={(e) => updatePart(index, e.target.value)}
                    placeholder="Correct answer"
                    className="min-w-[120px] h-10 bg-primary/10 border-primary/30 font-bold text-primary placeholder:text-primary/40 text-center text-lg"
                    style={{ width: `${Math.max(part.content.length, 10) + 4}ch` }}
                  />
                  <div className="absolute -top-5 left-0 right-0 text-[10px] uppercase tracking-wider font-bold text-primary/60 text-center">
                    Blank
                  </div>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 rounded-full shadow-lg"
                onClick={() => removePart(index)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2 ml-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPart("text")}
              className="h-10 rounded-full border-dashed"
            >
              <Type className="h-4 w-4 mr-1" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPart("blank")}
              className="h-10 rounded-full border-dashed bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Blank
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-dashed">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">?</span>
            How to use: Create your sentence by adding <strong>Text</strong> segments and <strong>Blank</strong> segments.
          </p>
        </div>
      </div>
    </div>
  );
};
