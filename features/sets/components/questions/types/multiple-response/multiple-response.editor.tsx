import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleResponseQuestion } from "@/features/sets/set-service";
import React from "react";
import { QuestionImageUpload } from "../../core/question-image-upload";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: MultipleResponseQuestion;
  onChange: (value: MultipleResponseQuestion) => void;
}

export const MultipleResponseEditor: React.FC<Props> = ({
  question,
  onChange,
}) => {
  const options =
    question.options && question.options.length > 0
      ? question.options
      : [
          { text: "Option 1", isCorrect: false },
          { text: "Option 2", isCorrect: false },
          { text: "Option 3", isCorrect: false },
          { text: "Option 4", isCorrect: false },
        ];

  const handleOptionTextChange = (index: number, text: string) => {
    const newOptions = options.map((o, i) =>
      i === index ? { ...o, text } : o,
    );
    onChange({ ...question, options: newOptions });
  };

  const handleOptionCorrectChange = (index: number, checked: boolean) => {
    const newOptions = options.map((o, i) =>
      i === index ? { ...o, isCorrect: checked } : o,
    );
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      {/* Image Upload */}
      <QuestionImageUpload
        value={question?.imageUrl}
        onChange={(url) => onChange({ ...question, imageUrl: url })}
      />

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {options.map((option, index) => (
          <Label
            key={index}
            htmlFor={`option-${index}`}
            className={`relative flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
              option.isCorrect
                ? "bg-[#9AD872] text-white"
                : "bg-background hover:bg-muted"
            }`}
          >
            <Checkbox
              id={`option-${index}`}
              checked={option.isCorrect}
              onCheckedChange={(checked) =>
                handleOptionCorrectChange(index, checked as boolean)
              }
            />
            <Input
              value={option.text}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={`Option ${index + 1}`}
              className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-medium"
            />
          </Label>
        ))}
      </div>
    </div>
  );
};

function Option() {}
