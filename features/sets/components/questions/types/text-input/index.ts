import { QuestionPlugin } from "../../core/types";
import { QuestionType } from "@/features/sets/set-service";
import { TextInputEditor } from "./text-input.editor";
import { TextInputPlayer } from "./text-input.player";
import { textInputSchema } from "./text-input.schema";
import { TextInputViewer } from "./text-input.viewer";
import { TextInputQuestion } from "@/features/sets/set-service";

export const textInputPlugin: QuestionPlugin<TextInputQuestion> = {
  type: QuestionType.TEXT_INPUT,
  schema: textInputSchema,
  Editor: TextInputEditor,
  Viewer: TextInputViewer,
  Player: TextInputPlayer,
  default: {
    type: QuestionType.TEXT_INPUT,
    title: "Enter the correct answer",
    points: 10,
    timeLimit: 30,
    correctAnswers: [""],
  },
};

export * from "./text-input.editor";
export * from "./text-input.player";
export * from "./text-input.schema";
export * from "./text-input.viewer";
