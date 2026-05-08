import { HotspotsQuestion } from "@/features/sets/set-service";
import React from "react";

interface Props {
  question: HotspotsQuestion;
}

export const HotspotsViewer: React.FC<Props> = ({ question }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{question.title}</h3>
      {question.imageUrl && (
        <div className="relative aspect-video border rounded-lg overflow-hidden">
          <img
            src={question.imageUrl}
            alt="Hotspots"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        {question.hotspots?.length || 0} hotspot(s) defined.
      </div>
    </div>
  );
};
