import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionImageUpload } from "../../core/question-image-upload";
import React from "react";
import { TrueFalseQuestion } from "./true-false.schema";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: TrueFalseQuestion;
  onChange: (value: TrueFalseQuestion) => void;
}

export const TrueFalseEditor: React.FC<Props> = ({ question, onChange }) => {
  return (
    <div className="space-y-4">
      <QuestionTitleInput
        value={question.title}
        onChange={(title) => onChange({ ...question, title })}
      />

      <QuestionImageUpload
        value={question.imageUrl}
        onChange={(url) => onChange({ ...question, imageUrl: url })}
      />

      {/* True / False Buttons */}
      <RadioGroup
        value={question.answer ? "true" : "false"}
        onValueChange={(val) =>
          onChange({ ...question, answer: val === "true" })
        }
        className="flex gap-2"
      >
        <div className="flex-1 space-y-2">
          <Label
            htmlFor="true-option"
            className="relative flex items-center justify-center rounded-md border p-3 cursor-pointer transition-colors bg-[#9AD872]"
          >
            <div className="absolute left-4">
              <RadioGroupItem value="true" id="true-option" />
            </div>
            <input
              type="text"
              value={question.trueOption.title}
              onChange={(e) =>
                onChange({
                  ...question,
                  trueOption: { ...question.trueOption, title: e.target.value },
                })
              }
              onClick={(e) => e.stopPropagation()}
              className={`text-center text-xl font-semibold tracking-wider outline-none w-full placeholder:text-muted text-white`}
              placeholder="TRUE"
            />
          </Label>
        </div>

        <div className="flex-1 space-y-2">
          <Label
            htmlFor="false-option"
            className={`relative flex items-center justify-center rounded-md border p-3 cursor-pointer transition-colors bg-[#E03F4F]`}
          >
            <div className="absolute left-4">
              <RadioGroupItem value="false" id="false-option" />
            </div>
            <input
              type="text"
              value={question.falseOption.title}
              onChange={(e) =>
                onChange({
                  ...question,
                  falseOption: {
                    ...question.falseOption,
                    title: e.target.value,
                  },
                })
              }
              onClick={(e) => e.stopPropagation()}
              className={`text-center text-xl font-semibold tracking-wider outline-none w-full placeholder:text-muted text-white`}
              placeholder="FALSE"
            />
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
