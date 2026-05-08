import React from "react";

export type QuestionPlugin<T = any> = {
  type: string;
  Editor: React.FC<{
    question: T;
    onChange: (value: T) => void;
  }>;
  Viewer: React.FC<{ question: T }>;
  Player: React.FC<{ question: T }>;
  schema: any;
  default: T;
};
