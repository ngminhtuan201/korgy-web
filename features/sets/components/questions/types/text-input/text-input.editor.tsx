import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextInputQuestion } from "@/features/sets/set-service";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { QuestionImageUpload } from "../../core/question-image-upload";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: TextInputQuestion;
  onChange: (value: TextInputQuestion) => void;
}

export const TextInputEditor: React.FC<Props> = ({ question, onChange }) => {
  const answers = question.correctAnswers || [];

  const addAnswer = () => {
    onChange({
      ...question,
      correctAnswers: [...answers, ""],
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onChange({ ...question, correctAnswers: newAnswers });
  };

  const removeAnswer = (index: number) => {
    if (answers.length <= 1) return;
    const newAnswers = answers.filter((_, i) => i !== index);
    onChange({ ...question, correctAnswers: newAnswers });
  };

  return (
    <div className="space-y-6">
      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      <QuestionImageUpload
        value={question.imageUrl}
        onChange={(url) => onChange({ ...question, imageUrl: url })}
        className="max-w-md mx-auto aspect-video"
      />

      <div className="space-y-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Correct Answers
          </label>
          <span className="text-xs text-muted-foreground italic">
            Users can type any of these
          </span>
        </div>

        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs">
                {index + 1}
              </div>
              <Input
                value={answer}
                onChange={(e) => updateAnswer(index, e.target.value)}
                placeholder="Enter a correct answer..."
                className="flex-1 bg-card border-2 focus-visible:ring-primary/20"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAnswer(index)}
                disabled={answers.length <= 1}
                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addAnswer}
            className="w-full border-dashed py-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add alternative correct answer
          </Button>
        </div>
      </div>
    </div>
  );
};
