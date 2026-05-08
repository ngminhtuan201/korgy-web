import { Input } from "@/components/ui/input";
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionTitleInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Enter question title here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-center text-lg py-6 font-medium placeholder:italic"
    />
  );
};
