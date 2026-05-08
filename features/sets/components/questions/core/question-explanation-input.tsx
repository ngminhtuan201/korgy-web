import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export const QuestionExplanationInput: React.FC<Props> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter question explanation here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
