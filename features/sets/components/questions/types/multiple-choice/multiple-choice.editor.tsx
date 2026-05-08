import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionImageUpload } from "../../core/question-image-upload";
import React from "react";
import { MultipleChoiceQuestion } from "@/features/sets/set-service";

interface Props {
  question: MultipleChoiceQuestion;
  onChange: (value: MultipleChoiceQuestion) => void;
}

export const MultipleChoiceEditor: React.FC<Props> = ({
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

  const handleOptionCorrectChange = (index: number) => {
    const newOptions = options.map((o, i) =>
      i === index ? { ...o, isCorrect: true } : { ...o, isCorrect: false },
    );
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <Input
        placeholder="Question Title"
        value={question.title || ""}
        onChange={(e) => onChange({ ...question, title: e.target.value })}
        className="text-center text-lg py-6 font-medium"
      />

      {/* Image Upload */}
      <QuestionImageUpload
        value={question?.imageUrl}
        onChange={(url) => onChange({ ...question, imageUrl: url })}
      />

      {/* Options */}
      <div className="space-y-3">
        <RadioGroup
          value={options.findIndex((o) => o.isCorrect).toString()}
          onValueChange={(index) => {
            const newOptions = options.map((o, i) => ({
              ...o,
              isCorrect: i === parseInt(index),
            }));
            onChange({ ...question, options: newOptions });
          }}
          className="grid grid-cols-2 gap-2"
        >
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
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Input
                value={option.text}
                onChange={(e) => handleOptionTextChange(index, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Option ${index + 1}`}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-medium"
              />
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

function Option() {}
