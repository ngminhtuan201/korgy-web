import { HotspotsQuestion } from "@/features/sets/set-service";
import React from "react";
import { QuestionImageUpload } from "../../core/question-image-upload";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: HotspotsQuestion;
  onChange: (value: HotspotsQuestion) => void;
}

export const HotspotsEditor: React.FC<Props> = ({ question, onChange }) => {
  return (
    <div className="space-y-4">
      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      <QuestionImageUpload
        value={question.imageUrl}
        onChange={(url) =>
          onChange({ ...question, imageUrl: url, hotspots: [] })
        }
        className="aspect-video"
      />

      {/* <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground italic">
          {question.imageUrl
            ? "Click on the image to mark correct areas (Hotspots)."
            : "Upload an image to start setting hotspots."}
        </p>
        <p className="text-xs text-muted-foreground/60">
          Note: Hotspot marking feature will be implemented in the next step.
        </p>
      </div> */}
    </div>
  );
};

function Hotspot() {}
